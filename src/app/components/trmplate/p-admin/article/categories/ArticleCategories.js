"use client";

import { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import {
  CiCirclePlus,
  CiEdit,
  CiTrash,
  CiSearch,
  CiCircleCheck,
  CiCircleRemove,
  CiFolderOn,
  CiGrid41,
} from "react-icons/ci";

const endpoint = "/api/admin/article-categories";

const initialForm = {
  title: "",
  slug: "",
  description: "",
  parent: "",
  sortOrder: 0,
  isActive: true,
};

function slugifyFa(text = "") {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getParentId(item) {
  if (!item?.parent) return "";
  return String(item.parent?._id || item.parent);
}

function buildTree(items = []) {
  const byId = new Map(
    items.map((item) => [
      String(item._id),
      {
        ...item,
        children: [],
      },
    ])
  );

  const roots = [];

  for (const item of byId.values()) {
    const parentId = getParentId(item);

    if (parentId && byId.has(parentId)) {
      byId.get(parentId).children.push(item);
    } else {
      roots.push(item);
    }
  }

  const sortFn = (a, b) => {
    const orderA = Number(a.sortOrder || 0);
    const orderB = Number(b.sortOrder || 0);

    if (orderA !== orderB) return orderA - orderB;

    return String(a.title || "").localeCompare(String(b.title || ""), "fa");
  };

  const sortRecursive = (nodes) => {
    nodes.sort(sortFn);
    nodes.forEach((node) => sortRecursive(node.children));
  };

  sortRecursive(roots);

  return roots;
}

function flattenTree(nodes = [], depth = 0) {
  let result = [];

  for (const node of nodes) {
    result.push({
      ...node,
      __depth: depth,
    });

    if (node.children?.length) {
      result = result.concat(flattenTree(node.children, depth + 1));
    }
  }

  return result;
}

function countDescendants(node) {
  if (!node?.children?.length) return 0;

  let count = node.children.length;

  for (const child of node.children) {
    count += countDescendants(child);
  }

  return count;
}

function collectDescendantIds(node) {
  const ids = new Set();

  function walk(current) {
    if (!current?.children?.length) return;

    for (const child of current.children) {
      ids.add(String(child._id));
      walk(child);
    }
  }

  walk(node);

  return ids;
}

function extractList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.categories)) return data.categories;

  return [];
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  dir = "rtl",
  type = "text",
  maxLength,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        dir={dir}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="
          w-full rounded-xl
          border border-gray-200
          bg-white
          px-3 py-2.5
          text-sm text-gray-800
          placeholder:text-gray-400
          outline-none
          transition-all duration-300
          focus:border-[#ff9436]
          focus:ring-4 focus:ring-[#ff9436]/10
        "
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, maxLength }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="
          w-full resize-none rounded-xl
          border border-gray-200
          bg-white
          px-3 py-2.5
          text-sm text-gray-800
          placeholder:text-gray-400
          outline-none
          transition-all duration-300
          focus:border-[#ff9436]
          focus:ring-4 focus:ring-[#ff9436]/10
        "
      />
    </div>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full rounded-xl
          border border-gray-200
          bg-white
          px-3 py-2.5
          text-sm text-gray-800
          outline-none
          transition-all duration-300
          focus:border-[#ff9436]
          focus:ring-4 focus:ring-[#ff9436]/10
        "
      >
        {children}
      </select>
    </div>
  );
}

export default function ArticleCategoriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const tree = useMemo(() => buildTree(items), [items]);
  const flatTree = useMemo(() => flattenTree(tree), [tree]);

  const editingTreeItem = useMemo(() => {
    if (!editingItem?._id) return null;

    return flatTree.find(
      (item) => String(item._id) === String(editingItem._id)
    );
  }, [flatTree, editingItem]);

  const blockedParentIds = useMemo(() => {
    if (!editingTreeItem) return new Set();

    const ids = collectDescendantIds(editingTreeItem);
    ids.add(String(editingTreeItem._id));

    return ids;
  }, [editingTreeItem]);

  const parentOptions = useMemo(() => {
    return flatTree.filter((cat) => {
      const catId = String(cat._id);

      if (blockedParentIds.has(catId)) return false;

      /**
       * اگر حداکثر عمق مجاز در بک‌اند ۳ سطح است:
       * level 0 = دسته اصلی
       * level 1 = زیر دسته
       * level 2 = زیر زیر دسته
       *
       * پس برای والد شدن، فقط depthهای 0 و 1 مجازند.
       */
      if ((cat.__depth || 0) >= 2) return false;

      return true;
    });
  }, [flatTree, blockedParentIds]);

  const filteredTreeFlat = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return flatTree;

    return flatTree.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const slug = String(item?.slug || "").toLowerCase();
      const description = String(item?.description || "").toLowerCase();

      return (
        title.includes(query) ||
        slug.includes(query) ||
        description.includes(query)
      );
    });
  }, [flatTree, search]);

  const fetchItems = async () => {
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "خطا در دریافت دسته‌بندی‌ها");
      }

      setItems(extractList(data));
    } catch (error) {
      console.error("Fetch article categories error:", error);

      swal({
        title: error?.message || "خطا در دریافت دسته‌بندی‌های مقالات",
        icon: "error",
        buttons: "باشه",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, saving]);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm(initialForm);
    setOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);

    setForm({
      title: item?.title || "",
      slug: item?.slug || "",
      description: item?.description || "",
      parent: getParentId(item),
      sortOrder: item?.sortOrder ?? 0,
      isActive: item?.isActive ?? true,
    });

    setOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setOpen(false);
    setEditingItem(null);
    setForm(initialForm);
  };

  const validateForm = () => {
    const title = form.title.trim();
    const slug = (form.slug || slugifyFa(form.title)).trim();

    if (!title) {
      swal({
        title: "عنوان دسته‌بندی الزامی است",
        icon: "error",
        buttons: "باشه",
      });

      return false;
    }

    if (title.length > 120) {
      swal({
        title: "عنوان دسته‌بندی نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد",
        icon: "error",
        buttons: "باشه",
      });

      return false;
    }

    if (!slug) {
      swal({
        title: "اسلاگ دسته‌بندی معتبر نیست",
        icon: "error",
        buttons: "باشه",
      });

      return false;
    }

    if (form.parent && blockedParentIds.has(String(form.parent))) {
      swal({
        title: "دسته‌بندی والد انتخاب‌شده معتبر نیست",
        text: "نمی‌توانید خود دسته‌بندی یا زیرمجموعه‌های آن را به عنوان والد انتخاب کنید.",
        icon: "error",
        buttons: "باشه",
      });

      return false;
    }

    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const isEdit = Boolean(editingItem?._id);

    const payload = {
      title: form.title.trim(),
      slug: slugifyFa(form.slug || form.title),
      description: form.description.trim(),
      parent: form.parent || null,
      sortOrder: Number(form.sortOrder) || 0,
      isActive: Boolean(form.isActive),
    };

    setSaving(true);

    try {
      const url = isEdit ? `${endpoint}/${editingItem._id}` : endpoint;

      /**
       * اگر route بک‌اندت PATCH است، این خط را به PATCH تغییر بده.
       */
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        swal({
          title: data?.message || "خطا در ذخیره دسته‌بندی",
          icon: "error",
          buttons: "باشه",
        });

        return;
      }

      swal({
        title: isEdit
          ? "دسته‌بندی مقاله با موفقیت ویرایش شد"
          : "دسته‌بندی مقاله با موفقیت اضافه شد",
        icon: "success",
        buttons: "باشه",
      });

      closeModal();
      await fetchItems();
    } catch (error) {
      console.error("Save article category error:", error);

      swal({
        title: "خطای سرور",
        icon: "error",
        buttons: "باشه",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteHandler = async (item) => {
    const ok = await swal({
      title: `حذف "${item.title}"؟`,
      text: "اگر این دسته‌بندی زیرمجموعه یا مقاله داشته باشد، ممکن است قابل حذف نباشد.",
      icon: "warning",
      buttons: ["انصراف", "بله، حذف شود"],
      dangerMode: true,
    });

    if (!ok) return;

    try {
      const res = await fetch(`${endpoint}/${item._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        swal({
          title: data?.message || "خطا در حذف دسته‌بندی",
          icon: "error",
          buttons: "باشه",
        });

        return;
      }

      swal({
        title: "دسته‌بندی مقاله حذف شد",
        icon: "success",
        buttons: "باشه",
      });

      await fetchItems();
    } catch (error) {
      console.error("Delete article category error:", error);

      swal({
        title: "خطای سرور",
        icon: "error",
        buttons: "باشه",
      });
    }
  };

  return (
    <section className="w-full space-y-4" dir="rtl">
      {/* Header */}
      <div
        className="
          rounded-[1.75rem]
          border border-gray-100
          bg-white
          p-4 md:p-6
          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
        "
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div
              className="
                mb-2 inline-flex items-center gap-2
                rounded-full
                border border-[#ff9436]/20
                bg-[#ff9436]/10
                px-3 py-1
                text-xs font-medium text-[#ff9436]
              "
            >
              <CiGrid41 size={16} />
              مدیریت بلاگ
            </div>

            <h1 className="text-lg font-bold text-gray-800 md:text-xl">
              دسته‌بندی مقالات
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              ساختار دسته‌بندی‌های مقالات را مدیریت کنید.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="
              inline-flex items-center justify-center gap-1.5
              rounded-xl
              bg-[#ff9436]
              px-4 py-2.5
              text-sm font-bold text-white
              shadow-sm
              transition-all duration-300
              hover:bg-[#f58624]
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            <CiCirclePlus size={20} />
            <span>افزودن دسته‌بندی مقاله</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="
          rounded-[1.5rem]
          border border-gray-100
          bg-white
          p-4
          shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        "
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <CiSearch
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در عنوان، اسلاگ یا توضیحات"
              className="
                w-full rounded-xl
                border border-gray-200
                bg-gray-50
                py-2.5 pr-10 pl-3
                text-sm text-gray-800
                placeholder:text-gray-400
                outline-none
                transition-all duration-300
                focus:border-[#ff9436]
                focus:bg-white
                focus:ring-4 focus:ring-[#ff9436]/10
              "
            />
          </div>

          <div className="text-xs text-gray-500">
            تعداد کل:{" "}
            <span className="font-bold text-gray-800">{items.length}</span>
            <span className="mx-1 text-gray-300">|</span>
            نمایش:{" "}
            <span className="font-bold text-gray-800">
              {filteredTreeFlat.length}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop List */}
      <div
        className="
          hidden overflow-hidden
          rounded-[1.5rem]
          border border-gray-100
          bg-white
          shadow-[0_8px_25px_rgba(0,0,0,0.05)]
          md:block
        "
      >
        <div className="grid grid-cols-12 gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700">
          <div className="col-span-3">عنوان</div>
          <div className="col-span-3">اسلاگ</div>
          <div className="col-span-2">والد</div>
          <div className="col-span-1 text-center">ترتیب</div>
          <div className="col-span-1">وضعیت</div>
          <div className="col-span-2 text-left">عملیات</div>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">
            در حال دریافت اطلاعات...
          </div>
        ) : filteredTreeFlat.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            دسته‌بندی مقاله‌ای برای نمایش پیدا نشد.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTreeFlat.map((item) => {
              const depth = item.__depth || 0;
              const descendants = countDescendants(item);
              const parentTitle = item?.parent?.title || "دسته اصلی";

              return (
                <div
                  key={item._id}
                  className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm transition hover:bg-gray-50"
                >
                  <div className="col-span-3 min-w-0">
                    <div className="flex items-center gap-2">
                      <span style={{ marginRight: `${depth * 16}px` }} />

                      {depth > 0 ? (
                        <span className="text-gray-300">└</span>
                      ) : (
                        <CiFolderOn className="text-[#ff9436]" size={18} />
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-800">
                          {item.title}
                        </p>

                        {descendants > 0 ? (
                          <p className="text-xs text-gray-400">
                            {descendants} زیرمجموعه
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 truncate font-mono text-gray-600">
                    {item.slug}
                  </div>

                  <div className="col-span-2 truncate text-gray-500">
                    {depth === 0 ? "دسته اصلی" : parentTitle}
                  </div>

                  <div className="col-span-1 text-center text-gray-600">
                    {item.sortOrder ?? 0}
                  </div>

                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.isActive
                          ? "border border-green-200 bg-green-50 text-green-600"
                          : "border border-gray-200 bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isActive ? (
                        <CiCircleCheck size={15} />
                      ) : (
                        <CiCircleRemove size={15} />
                      )}

                      {item.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="
                          inline-flex items-center gap-1
                          rounded-lg
                          border border-[#ff9436]/25
                          bg-[#ff9436]/10
                          px-3 py-1.5
                          text-xs text-[#ff9436]
                          transition
                          hover:bg-[#ff9436]
                          hover:text-white
                        "
                      >
                        <CiEdit size={14} />
                        ویرایش
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteHandler(item)}
                        className="
                          inline-flex items-center gap-1
                          rounded-lg
                          border border-red-200
                          bg-red-50
                          px-3 py-1.5
                          text-xs text-red-600
                          transition
                          hover:bg-red-500
                          hover:text-white
                        "
                      >
                        <CiTrash size={14} />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          <div
            className="
              rounded-2xl border border-gray-100
              bg-white p-4 text-sm text-gray-500
              shadow-[0_8px_25px_rgba(0,0,0,0.05)]
            "
          >
            در حال دریافت اطلاعات...
          </div>
        ) : filteredTreeFlat.length === 0 ? (
          <div
            className="
              rounded-2xl border border-gray-100
              bg-white p-6 text-center text-gray-500
              shadow-[0_8px_25px_rgba(0,0,0,0.05)]
            "
          >
            دسته‌بندی مقاله‌ای برای نمایش پیدا نشد.
          </div>
        ) : (
          filteredTreeFlat.map((item) => {
            const depth = item.__depth || 0;
            const descendants = countDescendants(item);

            return (
              <div
                key={item._id}
                className="
                  rounded-2xl border border-gray-100
                  bg-white p-4
                  shadow-[0_8px_25px_rgba(0,0,0,0.05)]
                "
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span style={{ marginRight: `${depth * 12}px` }} />

                      {depth > 0 ? (
                        <span className="text-gray-300">└</span>
                      ) : (
                        <CiFolderOn className="text-[#ff9436]" size={18} />
                      )}

                      <p className="truncate text-base font-semibold text-gray-800">
                        {item.title}
                      </p>
                    </div>

                    <div className="mt-1 pr-1">
                      <p className="truncate font-mono text-xs text-gray-500">
                        {item.slug}
                      </p>

                      {item.description ? (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                          {item.description}
                        </p>
                      ) : null}

                      {descendants > 0 ? (
                        <p className="mt-1 text-xs text-gray-400">
                          {descendants} زیرمجموعه
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.isActive
                        ? "border border-green-200 bg-green-50 text-green-600"
                        : "border border-gray-200 bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.isActive ? "فعال" : "غیرفعال"}
                  </span>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
                    <p className="text-xs text-gray-500">ترتیب نمایش</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.sortOrder ?? 0}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
                    <p className="text-xs text-gray-500">سطح</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {depth + 1}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="
                      flex-1 rounded-xl
                      border border-[#ff9436]/25
                      bg-[#ff9436]/10
                      px-3 py-2
                      text-sm font-medium text-[#ff9436]
                      transition
                      hover:bg-[#ff9436]
                      hover:text-white
                    "
                  >
                    ویرایش
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteHandler(item)}
                    className="
                      flex-1 rounded-xl
                      border border-red-200
                      bg-red-50
                      px-3 py-2
                      text-sm font-medium text-red-600
                      transition
                      hover:bg-red-500
                      hover:text-white
                    "
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <div
              className="
                flex w-full max-w-2xl flex-col overflow-hidden
                rounded-[1.75rem]
                border border-gray-100
                bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              "
              style={{ maxHeight: "calc(100dvh - 16px)" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 border-b border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-gray-800 md:text-lg">
                      {editingItem
                        ? "ویرایش دسته‌بندی مقاله"
                        : "افزودن دسته‌بندی مقاله"}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      عنوان، اسلاگ، توضیحات، والد و ترتیب نمایش را تنظیم کنید.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="
                      rounded-lg
                      border border-gray-200
                      bg-white
                      px-3 py-1.5
                      text-sm text-gray-600
                      transition
                      hover:bg-gray-50
                      disabled:opacity-50
                    "
                  >
                    بستن
                  </button>
                </div>
              </div>

              <form
                onSubmit={submitHandler}
                className="flex-1 overflow-y-auto p-4"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                      label="عنوان دسته‌بندی"
                      value={form.title}
                      maxLength={120}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          title: event.target.value,
                          slug: previous.slug
                            ? previous.slug
                            : slugifyFa(event.target.value),
                        }))
                      }
                      placeholder="مثلاً آموزش سئو"
                    />

                    <InputField
                      label="اسلاگ"
                      dir="ltr"
                      value={form.slug}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          slug: slugifyFa(event.target.value),
                        }))
                      }
                      placeholder="seo-training"
                    />

                    <SelectField
                      label="دسته‌بندی والد"
                      value={form.parent}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          parent: event.target.value,
                        }))
                      }
                    >
                      <option value="">بدون والد، دسته اصلی</option>

                      {parentOptions.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {"— ".repeat(cat.__depth || 0)}
                          {cat.title}
                        </option>
                      ))}
                    </SelectField>

                    <InputField
                      label="ترتیب نمایش"
                      type="number"
                      dir="ltr"
                      value={String(form.sortOrder)}
                      onChange={(event) =>
                        setForm((previous) => ({
                          ...previous,
                          sortOrder: event.target.value,
                        }))
                      }
                      placeholder="0"
                    />
                  </div>

                  <TextareaField
                    label="توضیحات"
                    value={form.description}
                    maxLength={300}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        description: event.target.value,
                      }))
                    }
                    placeholder="توضیح کوتاه درباره این دسته‌بندی..."
                  />

                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(event) =>
                          setForm((previous) => ({
                            ...previous,
                            isActive: event.target.checked,
                          }))
                        }
                        className="
                          h-4 w-4 rounded
                          border-gray-300
                          text-[#ff9436]
                          focus:ring-[#ff9436]
                        "
                      />

                      <span className="text-sm font-medium text-gray-700">
                        این دسته‌بندی فعال باشد
                      </span>
                    </label>

                    <p className="mt-1 pr-6 text-xs text-gray-400">
                      دسته‌بندی‌های غیرفعال در بخش عمومی سایت نمایش داده نمی‌شوند.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="
                      w-full rounded-xl
                      border border-gray-300
                      bg-white
                      px-4 py-2.5
                      text-sm font-medium text-gray-700
                      transition
                      hover:bg-gray-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                    "
                  >
                    انصراف
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      w-full rounded-xl
                      bg-[#ff9436]
                      px-4 py-2.5
                      text-sm font-bold text-white
                      shadow-sm
                      transition-all duration-300
                      hover:bg-[#f58624]
                      hover:shadow-md
                      active:scale-[0.98]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                    "
                  >
                    {saving
                      ? "در حال ذخیره..."
                      : editingItem
                      ? "ذخیره تغییرات"
                      : "افزودن دسته‌بندی"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
