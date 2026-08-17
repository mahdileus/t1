"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert";
import dynamic from "next/dynamic";

const CKEditorComponent = dynamic(
  () => import("../../../module/ckeditor/CKEditorWrapper"),
  { ssr: false }
);

const API_URL = "/api/project";

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

const initialForm = {
  title: "",
  slug: "",
  link: "",

  clientName: "",
  brandName: "",

  category: "",
  industry: "",
  projectType: "website",

  shortDescription: "",
  longDescription: "",

  technologies: "",
  tags: "",
  features: "",

  challenge: "",
  solution: "",

  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",

  imageAlt: "",

  status: "published",
  isFeatured: false,
  sortOrder: "0",

  thumbnail: null,
  mainPicture: null,
  gallery: [],
};

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

export default function AddProject() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // لایو پریویو: ذخیره URL موقت برای نمایش تصویر قبل از ارسال
  const [previews, setPreviews] = useState({
    thumbnail: null,
    mainPicture: null,
    gallery: [],
  });

  const seoPreviewTitle = useMemo(() => {
    return form.seoTitle || form.title || "عنوان سئو پروژه";
  }, [form.seoTitle, form.title]);

  const seoPreviewDescription = useMemo(() => {
    return form.seoDescription || form.shortDescription || "توضیحات سئو پروژه";
  }, [form.seoDescription, form.shortDescription]);

  // پاکسازی URL های موقت هنگام خروج از کامپوننت (جلوگیری از نشتی حافظه)
  useEffect(() => {
    return () => {
      if (previews.thumbnail) URL.revokeObjectURL(previews.thumbnail);
      if (previews.mainPicture) URL.revokeObjectURL(previews.mainPicture);
      previews.gallery.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      title: value,
      seoTitle: prev.seoTitle || value,
    }));
  };

  const handleSlugBlur = () => {
    setForm((prev) => ({
      ...prev,
      slug: toEnglishSlug(prev.slug),
    }));
  };

  // --- تصویر بندانگشتی ---
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    // حذف پریویو قبلی
    if (previews.thumbnail) URL.revokeObjectURL(previews.thumbnail);

    setForm((prev) => ({ ...prev, thumbnail: file }));
    setPreviews((prev) => ({
      ...prev,
      thumbnail: URL.createObjectURL(file),
    }));
  };

  const removeThumbnail = () => {
    if (previews.thumbnail) URL.revokeObjectURL(previews.thumbnail);
    setForm((prev) => ({ ...prev, thumbnail: null }));
    setPreviews((prev) => ({ ...prev, thumbnail: null }));
  };

  // --- تصویر اصلی ---
  const handleMainPictureChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    if (previews.mainPicture) URL.revokeObjectURL(previews.mainPicture);

    setForm((prev) => ({ ...prev, mainPicture: file }));
    setPreviews((prev) => ({
      ...prev,
      mainPicture: URL.createObjectURL(file),
    }));
  };

  const removeMainPicture = () => {
    if (previews.mainPicture) URL.revokeObjectURL(previews.mainPicture);
    setForm((prev) => ({ ...prev, mainPicture: null }));
    setPreviews((prev) => ({ ...prev, mainPicture: null }));
  };

  // --- گالری ---
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newUrls = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
    }));
    setPreviews((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...newUrls],
    }));
  };

  const removeGalleryImage = (index) => {
    URL.revokeObjectURL(previews.gallery[index]);

    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "عنوان پروژه الزامی است";
    if (!form.slug.trim()) return "اسلاگ انگلیسی پروژه الزامی است";
    if (!form.link.trim()) return "لینک پروژه الزامی است";
    if (!form.clientName.trim()) return "نام کارفرما الزامی است";
    if (!form.category.trim()) return "دسته‌بندی پروژه الزامی است";
    if (!form.industry.trim()) return "حوزه فعالیت پروژه الزامی است";
    if (!form.shortDescription.trim()) return "توضیح کوتاه پروژه الزامی است";
    if (!form.longDescription.trim()) return "محتوای کامل پروژه الزامی است";
    if (!parseList(form.technologies).length) return "حداقل یک تکنولوژی وارد کنید";
    if (!parseList(form.tags).length) return "حداقل یک تگ وارد کنید";
    if (!form.seoTitle.trim()) return "عنوان سئو الزامی است";
    if (!form.seoDescription.trim()) return "توضیحات سئو الزامی است";
    if (!form.imageAlt.trim()) return "متن جایگزین تصویر الزامی است";
    if (!form.thumbnail) return "تصویر بندانگشتی الزامی است";
    if (!form.mainPicture) return "تصویر اصلی پروژه الزامی است";

    return "";
  };

  const buildFormData = () => {
    const fd = new FormData();

    fd.append("title", form.title.trim());
    fd.append("slug", toEnglishSlug(form.slug));
    fd.append("link", form.link.trim());

    fd.append("clientName", form.clientName.trim());
    fd.append("brandName", form.brandName.trim());

    fd.append("category", form.category.trim());
    fd.append("industry", form.industry.trim());
    fd.append("projectType", form.projectType);

    fd.append("shortDescription", form.shortDescription.trim());
    fd.append("longDescription", form.longDescription);

    fd.append("technologies", JSON.stringify(parseList(form.technologies)));
    fd.append("tags", JSON.stringify(parseList(form.tags)));
    fd.append("features", JSON.stringify(parseList(form.features)));

    fd.append("challenge", form.challenge.trim());
    fd.append("solution", form.solution.trim());

    fd.append("seoTitle", form.seoTitle.trim());
    fd.append("seoDescription", form.seoDescription.trim());
    fd.append("seoKeywords", JSON.stringify(parseList(form.seoKeywords)));
    fd.append("canonicalUrl", form.canonicalUrl.trim());
    fd.append("ogTitle", form.ogTitle.trim());
    fd.append("ogDescription", form.ogDescription.trim());

    fd.append("imageAlt", form.imageAlt.trim());

    fd.append("status", form.status);
    fd.append("isFeatured", String(form.isFeatured));
    fd.append("sortOrder", form.sortOrder || "0");

    if (form.thumbnail) {
      fd.append("thumbnail", form.thumbnail);
    }

    if (form.mainPicture) {
      fd.append("mainPicture", form.mainPicture);
    }

    form.gallery.forEach((file) => {
      fd.append("gallery", file);
    });

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
      const res = await fetch(API_URL, {
        method: "POST",
        body: buildFormData(),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return Swal({
          title: "ثبت پروژه انجام نشد",
          text: data?.message || "خطایی در سمت سرور رخ داد",
          icon: "error",
          buttons: "فهمیدم",
        });
      }

      Swal({
        title: "پروژه با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        setForm(initialForm);
        setPreviews({ thumbnail: null, mainPicture: null, gallery: [] });
        router.push("/p-admin/portfolio");
        router.refresh();
      });
    } catch (error) {
      Swal({
        title: "خطا در اتصال",
        text: "در ارسال اطلاعات پروژه مشکلی پیش آمد",
        icon: "error",
        buttons: "فهمیدم",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full min-h-[48px] rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  const textareaClass =
    "w-full min-h-[96px] rounded-xl border border-slate-200 bg-white p-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 resize-y";

  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-5xl gap-6 text-right"
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-extrabold text-slate-900">افزودن پروژه جدید</h1>
          <p className="text-sm text-slate-500">
            اطلاعات پروژه، داده‌های سئو و تصاویر را کامل وارد کنید.
          </p>
        </div>

        {/* Card: Main Info */}
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">۱</span>
            <h2 className="text-base font-bold text-slate-900">اطلاعات اصلی</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>عنوان پروژه <span className="text-red-500">*</span></span>
              <input
                name="title"
                className={inputClass}
                placeholder="مثلاً طراحی سایت تکنونار"
                value={form.title}
                onChange={handleTitleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>اسلاگ انگلیسی <span className="text-red-500">*</span></span>
              <input
                name="slug"
                dir="ltr"
                className={inputClass}
                placeholder="technonar-web-design"
                value={form.slug}
                onChange={handleChange}
                onBlur={handleSlugBlur}
              />
              <span className="text-xs text-slate-400">فقط حروف انگلیسی، عدد و خط تیره</span>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>لینک پروژه <span className="text-red-500">*</span></span>
              <input
                name="link"
                dir="ltr"
                className={inputClass}
                placeholder="https://technonar.com"
                value={form.link}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>دسته‌بندی <span className="text-red-500">*</span></span>
              <input
                name="category"
                className={inputClass}
                placeholder="طراحی سایت فروشگاهی"
                value={form.category}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>نام کارفرما <span className="text-red-500">*</span></span>
              <input
                name="clientName"
                className={inputClass}
                placeholder="تکنونار"
                value={form.clientName}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>نام برند</span>
              <input
                name="brandName"
                className={inputClass}
                placeholder="تکنونار"
                value={form.brandName}
                onChange={handleChange}
              />
              <span className="text-xs text-slate-400">اگر با نام کارفرما متفاوت است</span>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>حوزه فعالیت <span className="text-red-500">*</span></span>
              <input
                name="industry"
                className={inputClass}
                placeholder="قطعات کامپیوتر و سخت‌افزار"
                value={form.industry}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>نوع پروژه</span>
              <select
                name="projectType"
                className={inputClass}
                value={form.projectType}
                onChange={handleChange}
              >
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>توضیح کوتاه <span className="text-red-500">*</span></span>
            <textarea
              name="shortDescription"
              className={textareaClass}
              placeholder="خلاصه‌ای کوتاه و خوانا برای نمایش در کارت‌ها و متای اولیه"
              value={form.shortDescription}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Card: Content */}
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">۲</span>
            <h2 className="text-base font-bold text-slate-900">محتوا و جزئیات پروژه</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>تکنولوژی‌ها <span className="text-red-500">*</span></span>
              <textarea
                name="technologies"
                className={textareaClass}
                placeholder="Laravel, PHP, MySQL, JavaScript"
                value={form.technologies}
                onChange={handleChange}
              />
              <span className="text-xs text-slate-400">با کاما یا اینتر جدا کنید</span>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>تگ‌ها <span className="text-red-500">*</span></span>
              <textarea
                name="tags"
                className={textareaClass}
                placeholder="تکنونار، طراحی سایت قطعات کامپیوتر، شرکت تیوان"
                value={form.tags}
                onChange={handleChange}
              />
              <span className="text-xs text-slate-400">با کاما یا اینتر جدا کنید</span>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>ویژگی‌ها</span>
              <textarea
                name="features"
                className={textareaClass}
                placeholder="طراحی واکنش‌گرا، پنل مدیریت، نمایش مشخصات فنی"
                value={form.features}
                onChange={handleChange}
              />
              <span className="text-xs text-slate-400">با کاما یا اینتر جدا کنید</span>
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>ترتیب نمایش</span>
              <input
                name="sortOrder"
                type="number"
                className={inputClass}
                value={form.sortOrder}
                onChange={handleChange}
              />
              <span className="text-xs text-slate-400">عدد کمتر = نمایش بالاتر</span>
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>چالش پروژه</span>
            <textarea
              name="challenge"
              className={textareaClass}
              placeholder="مشکل یا نیاز اصلی مشتری چه بود؟"
              value={form.challenge}
              onChange={handleChange}
            />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>راهکار اجرا شده</span>
            <textarea
              name="solution"
              className={textareaClass}
              placeholder="چطور این مشکل را حل کردید؟"
              value={form.solution}
              onChange={handleChange}
            />
          </label>

          <div className="grid gap-2">
            <span className={labelClass}>محتوای کامل پروژه <span className="text-red-500">*</span></span>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <CKEditorComponent
                value={form.longDescription}
                onChange={(data) =>
                  setForm((prev) => ({ ...prev, longDescription: data }))
                }
              />
            </div>
          </div>
        </div>

        {/* Card: SEO */}
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">۳</span>
            <h2 className="text-base font-bold text-slate-900">تنظیمات سئو</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>عنوان سئو <span className="text-red-500">*</span></span>
              <input
                name="seoTitle"
                className={inputClass}
                placeholder="طراحی سایت تکنونار | نمونه کار شرکت تیوان"
                value={form.seoTitle}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>Canonical URL</span>
              <input
                name="canonicalUrl"
                dir="ltr"
                className={inputClass}
                placeholder="https://t1w.ir/portfolio/technonar-web-design"
                value={form.canonicalUrl}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>توضیحات سئو <span className="text-red-500">*</span></span>
            <textarea
              name="seoDescription"
              className={textareaClass}
              placeholder="توضیح کوتاه، دقیق و قابل کلیک برای نتایج گوگل"
              value={form.seoDescription}
              onChange={handleChange}
            />
            <span className="text-xs text-slate-400">
              {form.seoDescription.length}/160 کاراکتر
            </span>
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>کلمات کلیدی سئو</span>
            <textarea
              name="seoKeywords"
              className={textareaClass}
              placeholder="تکنونار، طراحی سایت تکنونار، نمونه کار طراحی سایت"
              value={form.seoKeywords}
              onChange={handleChange}
            />
            <span className="text-xs text-slate-400">با کاما یا اینتر جدا کنید</span>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>OG Title</span>
              <input
                name="ogTitle"
                className={inputClass}
                placeholder="اگر خالی بماند از عنوان سئو استفاده می‌شود"
                value={form.ogTitle}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>OG Description</span>
              <input
                name="ogDescription"
                className={inputClass}
                placeholder="اگر خالی بماند از توضیحات سئو استفاده می‌شود"
                value={form.ogDescription}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* SEO Preview */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold text-slate-400">پیش‌نمایش نتیجه گوگل</p>
            <p className="mb-0.5 text-base font-medium text-blue-700">
              {seoPreviewTitle}
            </p>
            <p className="mb-1 text-xs text-green-700" dir="ltr">
              https://t1w.ir/portfolios/{form.slug || "project-slug"}
            </p>
            <p className="line-clamp-2 text-sm text-slate-600">
              {seoPreviewDescription}
            </p>
          </div>
        </div>

        {/* Card: Images */}
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">۴</span>
            <h2 className="text-base font-bold text-slate-900">تصاویر و مدیا</h2>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>متن جایگزین تصویر (Alt) <span className="text-red-500">*</span></span>
            <input
              name="imageAlt"
              className={inputClass}
              placeholder="نمونه کار طراحی سایت تکنونار توسط شرکت تیوان"
              value={form.imageAlt}
              onChange={handleChange}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Thumbnail */}
            <div className="grid gap-2">
              <span className={labelClass}>تصویر بندانگشتی <span className="text-red-500">*</span></span>

              {previews.thumbnail ? (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={previews.thumbnail}
                    alt="پیش‌نمایش تصویر بندانگشتی"
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
                <label className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-center transition hover:border-primary hover:bg-primary/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs text-slate-500">انتخاب تصویر بندانگشتی</span>
                </label>
              )}
            </div>

            {/* Main Picture */}
            <div className="grid gap-2">
              <span className={labelClass}>تصویر اصلی <span className="text-red-500">*</span></span>

              {previews.mainPicture ? (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={previews.mainPicture}
                    alt="پیش‌نمایش تصویر اصلی"
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
                <label className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-center transition hover:border-primary hover:bg-primary/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainPictureChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs text-slate-500">انتخاب تصویر اصلی</span>
                </label>
              )}
            </div>

            {/* Gallery */}
            <div className="grid gap-2">
              <span className={labelClass}>گالری تصاویر</span>

              {previews.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {previews.gallery.map((url, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
                    >
                      <img
                        src={url}
                        alt={`پیش‌نمایش تصویر گالری ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute inset-0 grid place-items-center bg-black/50 text-xl text-white opacity-0 transition group-hover:opacity-100"
                        title="حذف تصویر"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* دکمه افزودن تصویر بیشتر */}
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 text-center transition hover:border-primary hover:bg-primary/5">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="text-xl">＋</span>
                    <span className="text-[10px] text-slate-500">افزودن</span>
                  </label>
                </div>
              ) : (
                <label className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-4 text-center transition hover:border-primary hover:bg-primary/5">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span className="text-2xl">🖼️</span>
                  <span className="text-xs text-slate-500">انتخاب چند تصویر</span>
                </label>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-400">
            💡 برای حذف هر تصویر، نشانگر موس را روی عکس ببرید و روی ✕ کلیک کنید.
          </p>
        </div>

        {/* Card: Publish */}
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">۵</span>
            <h2 className="text-base font-bold text-slate-900">انتشار</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className={labelClass}>وضعیت</span>
              <select
                name="status"
                className={inputClass}
                value={form.status}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <input
                name="isFeatured"
                type="checkbox"
                checked={form.isFeatured}
                onChange={handleChange}
                className="h-5 w-5 accent-primary"
              />
              <span className="text-sm font-medium text-slate-700">
                نمایش به عنوان پروژه ویژه
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/p-admin/portfolio")}
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition hover:bg-secondery disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت پروژه"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
