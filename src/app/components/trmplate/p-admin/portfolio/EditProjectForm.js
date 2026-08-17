"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert";
import dynamic from "next/dynamic";

const CKEditorComponent = dynamic(
  () => import("../../../module/ckeditor/CKEditorWrapper"),
  { ssr: false }
);

const projectTypes = [
  { value: "website", label: "وب‌سایت" },
  { value: "shop", label: "فروشگاه" },
  { value: "web-app", label: "وب اپلیکیشن" },
  { value: "cms", label: "سیستم مدیریت محتوا" },
  { value: "seo", label: "سئو" },
  { value: "portfolio", label: "نمونه‌کار" },
  { value: "custom", label: "سفارشی" },
];

const statuses = [
  { value: "published", label: "منتشر شده" },
  { value: "draft", label: "پیش‌نویس" },
  { value: "archived", label: "آرشیو شده" },
];

function toEnglishSlug(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseList(value) {
  return value
    .split(/[,،\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function EditProjectForm({ project, projectId }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projectInfo, setProjectInfo] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    link: project?.link || "",

    clientName: project?.clientName || "",
    brandName: project?.brandName || "",

    category: project?.category || "",
    industry: project?.industry || "",
    projectType: project?.projectType || "website",

    shortDescription: project?.shortDescription || "",
    longDescription: project?.longDescription || "",

    technologies: Array.isArray(project?.technologies)
      ? project.technologies.join(", ")
      : project?.technologies || "",

    tags: Array.isArray(project?.tags)
      ? project.tags.join(", ")
      : project?.tags || "",

    features: Array.isArray(project?.features)
      ? project.features.join(", ")
      : project?.features || "",

    challenge: project?.challenge || "",
    solution: project?.solution || "",

    seoTitle: project?.seoTitle || "",
    seoDescription: project?.seoDescription || "",
    seoKeywords: Array.isArray(project?.seoKeywords)
      ? project.seoKeywords.join(", ")
      : project?.seoKeywords || "",

    canonicalUrl: project?.canonicalUrl || "",
    ogTitle: project?.ogTitle || "",
    ogDescription: project?.ogDescription || "",
    imageAlt: project?.imageAlt || "",

    status: project?.status || "published",
    isFeatured: !!project?.isFeatured,
    sortOrder: String(project?.sortOrder ?? 0),

    // فایل‌های جدید انتخاب‌شده
    thumbnailFile: null,
    mainPictureFile: null,
    galleryFiles: [],

    // تصاویر قدیمی روی سرور
    currentThumbnail: project?.thumbnail || "",
    currentMainPicture: project?.mainPicture || "",
    currentGallery: Array.isArray(project?.gallery) ? project.gallery : [],

    // سیگنال‌های حذف تصاویر قدیمی
    removeThumbnail: false,
    removeMainPicture: false,
    removedGallery: [],
  });

  // لایو پریویو برای فایل‌های جدید
  const [previews, setPreviews] = useState({
    thumbnail: null,
    mainPicture: null,
    gallery: [],
  });

  const seoPreviewTitle = useMemo(() => {
    return projectInfo.seoTitle || projectInfo.title || "عنوان سئو پروژه";
  }, [projectInfo.seoTitle, projectInfo.title]);

  const seoPreviewDescription = useMemo(() => {
    return (
      projectInfo.seoDescription ||
      projectInfo.shortDescription ||
      "توضیحات سئو پروژه"
    );
  }, [projectInfo.seoDescription, projectInfo.shortDescription]);

  // تصویر نمایشی بندانگشتی: اول فایل جدید، بعد تصویر قدیمی سرور
  const displayThumbnail = previews.thumbnail || projectInfo.currentThumbnail;
  const displayMainPicture = previews.mainPicture || projectInfo.currentMainPicture;

  // پاکسازی URL های موقت هنگام خروج از کامپوننت
  useEffect(() => {
    return () => {
      if (previews.thumbnail) URL.revokeObjectURL(previews.thumbnail);
      if (previews.mainPicture) URL.revokeObjectURL(previews.mainPicture);
      previews.gallery.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const inputClass =
    "w-full min-h-[48px] rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  const textareaClass =
    "w-full min-h-[110px] rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProjectInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSlugBlur = () => {
    setProjectInfo((prev) => ({
      ...prev,
      slug: toEnglishSlug(prev.slug),
    }));
  };

  // --- تصویر بندانگشتی ---
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (previews.thumbnail) URL.revokeObjectURL(previews.thumbnail);

    setProjectInfo((prev) => ({ ...prev, thumbnailFile: file }));
    setPreviews((prev) => ({
      ...prev,
      thumbnail: URL.createObjectURL(file),
    }));
  };

  const removeThumbnail = () => {
    // اگر فایل جدیدی انتخاب شده، فقط آن را حذف کن و به تصویر قدیمی برگرد
    if (previews.thumbnail) {
      URL.revokeObjectURL(previews.thumbnail);
      setPreviews((prev) => ({ ...prev, thumbnail: null }));
      setProjectInfo((prev) => ({ ...prev, thumbnailFile: null }));
      return;
    }

    // در غیر این صورت، تصویر قدیمی سرور را برای حذف علامت بزن
    setProjectInfo((prev) => ({
      ...prev,
      currentThumbnail: "",
      removeThumbnail: true,
    }));
  };

  // --- تصویر اصلی ---
  const handleMainPictureChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (previews.mainPicture) URL.revokeObjectURL(previews.mainPicture);

    setProjectInfo((prev) => ({ ...prev, mainPictureFile: file }));
    setPreviews((prev) => ({
      ...prev,
      mainPicture: URL.createObjectURL(file),
    }));
  };

  const removeMainPicture = () => {
    if (previews.mainPicture) {
      URL.revokeObjectURL(previews.mainPicture);
      setPreviews((prev) => ({ ...prev, mainPicture: null }));
      setProjectInfo((prev) => ({ ...prev, mainPictureFile: null }));
      return;
    }

    setProjectInfo((prev) => ({
      ...prev,
      currentMainPicture: "",
      removeMainPicture: true,
    }));
  };

  // --- گالری ---
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newUrls = files.map((file) => URL.createObjectURL(file));

    // افزودن به فایل‌های قبلی، نه جایگزینی
    setProjectInfo((prev) => ({
      ...prev,
      galleryFiles: [...prev.galleryFiles, ...files],
    }));
    setPreviews((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...newUrls],
    }));
  };

  // حذف تصویر قدیمی گالری (روی سرور)
  const removeGalleryItem = (index) => {
    setProjectInfo((prev) => {
      const removed = prev.currentGallery[index];

      return {
        ...prev,
        currentGallery: prev.currentGallery.filter((_, i) => i !== index),
        removedGallery: [...prev.removedGallery, removed],
      };
    });
  };

  // حذف فایل جدید گالری (انتخاب‌شده در همین فرم)
  const removeNewGalleryItem = (index) => {
    URL.revokeObjectURL(previews.gallery[index]);

    setPreviews((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    setProjectInfo((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!projectInfo.title.trim()) return "عنوان پروژه الزامی است";
    if (!projectInfo.slug.trim()) return "اسلاگ انگلیسی پروژه الزامی است";
    if (!projectInfo.link.trim()) return "لینک پروژه الزامی است";
    if (!projectInfo.clientName.trim()) return "نام کارفرما الزامی است";
    if (!projectInfo.category.trim()) return "دسته‌بندی الزامی است";
    if (!projectInfo.industry.trim()) return "حوزه فعالیت الزامی است";
    if (!projectInfo.shortDescription.trim()) return "توضیح کوتاه الزامی است";
    if (!projectInfo.longDescription.trim()) return "محتوای کامل الزامی است";
    if (!parseList(projectInfo.technologies).length) return "حداقل یک تکنولوژی وارد کنید";
    if (!parseList(projectInfo.tags).length) return "حداقل یک تگ وارد کنید";
    if (!projectInfo.seoTitle.trim()) return "عنوان سئو الزامی است";
    if (!projectInfo.seoDescription.trim()) return "توضیحات سئو الزامی است";
    if (!projectInfo.imageAlt.trim()) return "متن جایگزین تصویر الزامی است";
    return "";
  };

  const buildFormData = () => {
    const fd = new FormData();

    fd.append("title", projectInfo.title.trim());
    fd.append("slug", toEnglishSlug(projectInfo.slug));
    fd.append("link", projectInfo.link.trim());

    fd.append("clientName", projectInfo.clientName.trim());
    fd.append("brandName", projectInfo.brandName.trim());

    fd.append("category", projectInfo.category.trim());
    fd.append("industry", projectInfo.industry.trim());
    fd.append("projectType", projectInfo.projectType);

    fd.append("shortDescription", projectInfo.shortDescription.trim());
    fd.append("longDescription", projectInfo.longDescription);

    fd.append(
      "technologies",
      JSON.stringify(parseList(projectInfo.technologies))
    );
    fd.append("tags", JSON.stringify(parseList(projectInfo.tags)));
    fd.append(
      "features",
      JSON.stringify(parseList(projectInfo.features))
    );

    fd.append("challenge", projectInfo.challenge.trim());
    fd.append("solution", projectInfo.solution.trim());

    fd.append("seoTitle", projectInfo.seoTitle.trim());
    fd.append("seoDescription", projectInfo.seoDescription.trim());
    fd.append(
      "seoKeywords",
      JSON.stringify(parseList(projectInfo.seoKeywords))
    );

    fd.append("canonicalUrl", projectInfo.canonicalUrl.trim());
    fd.append("ogTitle", projectInfo.ogTitle.trim());
    fd.append("ogDescription", projectInfo.ogDescription.trim());
    fd.append("imageAlt", projectInfo.imageAlt.trim());

    fd.append("status", projectInfo.status);
    fd.append("isFeatured", String(projectInfo.isFeatured));
    fd.append("sortOrder", projectInfo.sortOrder || "0");

    // فایل‌های جدید
    if (projectInfo.thumbnailFile instanceof File) {
      fd.append("thumbnail", projectInfo.thumbnailFile);
    }

    if (projectInfo.mainPictureFile instanceof File) {
      fd.append("mainPicture", projectInfo.mainPictureFile);
    }

    if (projectInfo.galleryFiles.length) {
      projectInfo.galleryFiles.forEach((file) => {
        fd.append("gallery", file);
      });
    }

    // سیگنال‌های حذف تصاویر قدیمی
    if (projectInfo.removeThumbnail) {
      fd.append("removeThumbnail", "true");
    }
    if (projectInfo.removeMainPicture) {
      fd.append("removeMainPicture", "true");
    }
    if (projectInfo.removedGallery.length) {
      fd.append("removedGallery", JSON.stringify(projectInfo.removedGallery));
    }

    // گالری قدیمی باقی‌مانده
    fd.append(
      "existingGallery",
      JSON.stringify(projectInfo.currentGallery)
    );

    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      return Swal({
        title: "اطلاعات ناقص است",
        text: errorMessage,
        icon: "warning",
        buttons: "فهمیدم",
      });
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/project/${projectId}`, {
        method: "PUT",
        body: buildFormData(),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return Swal({
          title: "خطا در ویرایش پروژه",
          text: data?.message || "ویرایش پروژه انجام نشد",
          icon: "error",
          buttons: "فهمیدم",
        });
      }

      Swal({
        title: "پروژه با موفقیت ویرایش شد",
        icon: "success",
        buttons: "باشه",
      }).then(() => {
        router.replace("/p-admin/portfolio");
        router.refresh();
      });
    } catch (error) {
      Swal({
        title: "خطا در اتصال",
        text: "در ارسال اطلاعات ویرایش مشکلی پیش آمد",
        icon: "error",
        buttons: "فهمیدم",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-5xl gap-6 text-right"
      >
        <div className="flex flex-col gap-2 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-bold text-primary">ویرایش پروژه</h1>
          <p className="text-sm text-gray-500">
            اطلاعات پروژه و داده‌های سئو را به‌روزرسانی کنید.
          </p>
        </div>

        {/* اطلاعات اصلی */}
        <div className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-primary">اطلاعات اصلی</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>عنوان پروژه</label>
              <input
                name="title"
                className={inputClass}
                value={projectInfo.title}
                onChange={handleChange}
                placeholder="عنوان پروژه"
              />
            </div>

            <div>
              <label className={labelClass}>اسلاگ انگلیسی</label>
              <input
                name="slug"
                dir="ltr"
                className={inputClass}
                value={projectInfo.slug}
                onChange={handleChange}
                onBlur={handleSlugBlur}
                placeholder="technonar-web-design"
              />
            </div>

            <div>
              <label className={labelClass}>لینک پروژه</label>
              <input
                name="link"
                dir="ltr"
                className={inputClass}
                value={projectInfo.link}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className={labelClass}>دسته‌بندی</label>
              <input
                name="category"
                className={inputClass}
                value={projectInfo.category}
                onChange={handleChange}
                placeholder="طراحی سایت فروشگاهی"
              />
            </div>

            <div>
              <label className={labelClass}>نام کارفرما</label>
              <input
                name="clientName"
                className={inputClass}
                value={projectInfo.clientName}
                onChange={handleChange}
                placeholder="تکنونار"
              />
            </div>

            <div>
              <label className={labelClass}>نام برند</label>
              <input
                name="brandName"
                className={inputClass}
                value={projectInfo.brandName}
                onChange={handleChange}
                placeholder="تکنونار"
              />
            </div>

            <div>
              <label className={labelClass}>حوزه فعالیت</label>
              <input
                name="industry"
                className={inputClass}
                value={projectInfo.industry}
                onChange={handleChange}
                placeholder="قطعات کامپیوتر"
              />
            </div>

            <div>
              <label className={labelClass}>نوع پروژه</label>
              <select
                name="projectType"
                className={inputClass}
                value={projectInfo.projectType}
                onChange={handleChange}
              >
                {projectTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>توضیح کوتاه</label>
            <textarea
              name="shortDescription"
              className={textareaClass}
              value={projectInfo.shortDescription}
              onChange={handleChange}
              placeholder="توضیح کوتاه پروژه"
            />
          </div>
        </div>

        {/* محتوا */}
        <div className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-primary">محتوا و جزئیات</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>تکنولوژی‌ها</label>
              <textarea
                name="technologies"
                className={textareaClass}
                value={projectInfo.technologies}
                onChange={handleChange}
                placeholder="Laravel, PHP, MySQL"
              />
            </div>

            <div>
              <label className={labelClass}>تگ‌ها</label>
              <textarea
                name="tags"
                className={textareaClass}
                value={projectInfo.tags}
                onChange={handleChange}
                placeholder="تکنونار، طراحی سایت، تیوان"
              />
            </div>

            <div>
              <label className={labelClass}>ویژگی‌ها</label>
              <textarea
                name="features"
                className={textareaClass}
                value={projectInfo.features}
                onChange={handleChange}
                placeholder="پنل مدیریت، ریسپانسیو، سئو"
              />
            </div>

            <div>
              <label className={labelClass}>ترتیب نمایش</label>
              <input
                type="number"
                name="sortOrder"
                className={inputClass}
                value={projectInfo.sortOrder}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>چالش پروژه</label>
            <textarea
              name="challenge"
              className={textareaClass}
              value={projectInfo.challenge}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelClass}>راهکار اجرا شده</label>
            <textarea
              name="solution"
              className={textareaClass}
              value={projectInfo.solution}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelClass}>محتوای کامل پروژه</label>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <CKEditorComponent
                value={projectInfo.longDescription}
                onChange={(data) =>
                  setProjectInfo((prev) => ({
                    ...prev,
                    longDescription: data,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* سئو */}
        <div className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-primary">سئو</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>عنوان سئو</label>
              <input
                name="seoTitle"
                className={inputClass}
                value={projectInfo.seoTitle}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClass}>Canonical URL</label>
              <input
                name="canonicalUrl"
                dir="ltr"
                className={inputClass}
                value={projectInfo.canonicalUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>توضیحات سئو</label>
            <textarea
              name="seoDescription"
              className={textareaClass}
              value={projectInfo.seoDescription}
              onChange={handleChange}
            />
            <span className="text-xs text-gray-400">
              {projectInfo.seoDescription.length}/160 کاراکتر
            </span>
          </div>

          <div>
            <label className={labelClass}>کلمات کلیدی سئو</label>
            <textarea
              name="seoKeywords"
              className={textareaClass}
              value={projectInfo.seoKeywords}
              onChange={handleChange}
              placeholder="تکنونار، طراحی سایت تکنونار، نمونه کار"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>OG Title</label>
              <input
                name="ogTitle"
                className={inputClass}
                value={projectInfo.ogTitle}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClass}>OG Description</label>
              <input
                name="ogDescription"
                className={inputClass}
                value={projectInfo.ogDescription}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-1 text-sm font-semibold text-blue-700">
              {seoPreviewTitle}
            </p>
            <p className="mb-1 text-xs text-green-700" dir="ltr">
              https://t1w.ir/portfolios/{projectInfo.slug || "project-slug"}
            </p>
            <p className="line-clamp-2 text-sm text-gray-600">
              {seoPreviewDescription}
            </p>
          </div>
        </div>

        {/* تصاویر */}
        <div className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-primary">تصاویر</h2>

          <div>
            <label className={labelClass}>متن جایگزین تصویر</label>
            <input
              name="imageAlt"
              className={inputClass}
              value={projectInfo.imageAlt}
              onChange={handleChange}
              placeholder="نمونه کار طراحی سایت تکنونار توسط شرکت تیوان"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* بندانگشتی */}
            <div className="grid gap-2">
              <span className={labelClass}>تصویر بندانگشتی</span>

              {displayThumbnail ? (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={displayThumbnail}
                    alt={projectInfo.imageAlt || projectInfo.title}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute inset-0 grid place-items-center bg-black/50 text-2xl text-white opacity-0 transition group-hover:opacity-100"
                    title="حذف تصویر"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-primary hover:bg-primary/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs text-gray-500">انتخاب تصویر بندانگشتی</span>
                </label>
              )}

              {displayThumbnail && (
                <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 p-3 text-xs text-gray-600 transition hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  🖼️ انتخاب تصویر جدید (جایگزین)
                </label>
              )}
            </div>

            {/* تصویر اصلی */}
            <div className="grid gap-2">
              <span className={labelClass}>تصویر اصلی</span>

              {displayMainPicture ? (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={displayMainPicture}
                    alt={projectInfo.imageAlt || projectInfo.title}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeMainPicture}
                    className="absolute inset-0 grid place-items-center bg-black/50 text-2xl text-white opacity-0 transition group-hover:opacity-100"
                    title="حذف تصویر"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-primary hover:bg-primary/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainPictureChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs text-gray-500">انتخاب تصویر اصلی</span>
                </label>
              )}

              {displayMainPicture && (
                <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 p-3 text-xs text-gray-600 transition hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainPictureChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  🖼️ انتخاب تصویر جدید (جایگزین)
                </label>
              )}
            </div>
          </div>

          {/* گالری */}
          <div className="grid gap-2">
            <span className={labelClass}>گالری تصاویر</span>

            {/* تصاویر قدیمی سرور */}
            {projectInfo.currentGallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {projectInfo.currentGallery.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={item}
                      alt={`${projectInfo.title}-${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="absolute inset-0 grid place-items-center bg-black/50 text-xl text-white opacity-0 transition group-hover:opacity-100"
                      title="حذف تصویر"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* فایل‌های جدید گالری */}
            {previews.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {previews.gallery.map((url, index) => (
                  <div
                    key={`new-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`${projectInfo.title}-جدید-${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewGalleryItem(index)}
                      className="absolute inset-0 grid place-items-center bg-black/50 text-xl text-white opacity-0 transition group-hover:opacity-100"
                      title="حذف تصویر"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* افزودن تصویر جدید */}
            <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-600 transition hover:border-primary hover:bg-primary/5">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              ＋ افزودن تصویر به گالری
            </label>
          </div>

          <p className="text-xs text-gray-400">
            💡 برای حذف هر تصویر، نشانگر موس را روی عکس ببرید و روی ✕ کلیک کنید.
          </p>
        </div>

        {/* انتشار */}
        <div className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-primary">انتشار</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>وضعیت</label>
              <select
                name="status"
                className={inputClass}
                value={projectInfo.status}
                onChange={handleChange}
              >
                {statuses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
              <input
                type="checkbox"
                name="isFeatured"
                checked={projectInfo.isFeatured}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span className="text-sm font-medium text-gray-700">پروژه ویژه</span>
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 border-t border-gray-100 bg-white/95 py-4 backdrop-blur">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3 text-base font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </section>
  );
}
