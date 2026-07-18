"use client";

import { useEffect } from "react";
import ArticlePreviewImage from "./ArticlePreviewImage";

export default function ArticleCoverCard({
  formData,
  onChange,
  coverPreview,
  setCoverPreview,
  setCoverFile,
  currentImage,
}) {
  const changeHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);

    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (coverPreview && coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">تصویر کاور</h2>

        <p className="mt-1 text-sm text-slate-500">
          تصویر شاخص مقاله و اطلاعات سئوی تصویر را تنظیم کنید.
        </p>
      </div>

      <div className="space-y-4">
        <ArticlePreviewImage
          src={coverPreview || currentImage}
          alt={formData.coverAlt || "article-cover"}
        />

        {/* Cover Upload */}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            انتخاب تصویر
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={changeHandler}
            className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 file:ml-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
          />
        </label>

        {/* Current Cover URL */}
        {currentImage ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              مسیر فعلی تصویر
            </label>

            <input
              type="text"
              dir="ltr"
              value={currentImage}
              readOnly
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs text-slate-500 outline-none"
            />
          </div>
        ) : null}

        {/* Cover Alt */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Alt تصویر کاور
            <span className="mr-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.coverAlt || ""}
            onChange={(e) => onChange("coverAlt", e.target.value)}
            placeholder="توضیح دقیق تصویر برای سئو و دسترسی‌پذیری"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <p className="mt-1 text-xs text-slate-400">
            این فیلد برای SEO و Accessibility الزامی است.
          </p>
        </div>

        {/* Cover Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Title تصویر
          </label>

          <input
            type="text"
            value={formData.coverTitle || ""}
            onChange={(e) => onChange("coverTitle", e.target.value)}
            placeholder="عنوان اختیاری تصویر"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        {/* Cover Caption */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Caption تصویر
          </label>

          <textarea
            rows={3}
            value={formData.coverCaption || ""}
            onChange={(e) => onChange("coverCaption", e.target.value)}
            placeholder="متنی که می‌تواند زیر تصویر نمایش داده شود"
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              عرض تصویر
            </label>

            <input
              type="number"
              min="0"
              value={formData.coverWidth || ""}
              onChange={(e) => onChange("coverWidth", e.target.value)}
              placeholder="1200"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              ارتفاع تصویر
            </label>

            <input
              type="number"
              min="0"
              value={formData.coverHeight || ""}
              onChange={(e) => onChange("coverHeight", e.target.value)}
              placeholder="630"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-xs leading-6 text-orange-700">
          پیشنهاد: برای تصویر کاور مقاله معمولاً ابعاد 1200×630 یا نسبت نزدیک
          به 1.91:1 مناسب است تا برای Open Graph هم قابل استفاده باشد.
        </div>
      </div>
    </section>
  );
}
