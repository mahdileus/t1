"use client";

import dynamic from "next/dynamic";

const CKEditor = dynamic(
  () => import("@/app/components/module/ckeditor/CKEditorWrapper"),
  { ssr: false }
);

export default function ArticleContentCard({ formData, onChange }) {
  const contentLength = formData.content?.length || 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">محتوای مقاله</h2>

        <p className="mt-1 text-sm text-slate-500">
          متن کامل مقاله، نوع محتوا و متریک‌های محتوایی را وارد کنید.
        </p>
      </div>

      <div className="space-y-5">
        {/* Content Type + Reading / Word Count */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              نوع محتوا
            </label>

            <select
              value={formData.contentType || "html"}
              onChange={(e) => onChange("contentType", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            >
              <option value="html">HTML</option>
              <option value="markdown">Markdown</option>
              <option value="plain">Plain Text</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              زمان مطالعه - دقیقه
            </label>

            <input
              type="number"
              min="0"
              value={formData.readingTime || ""}
              onChange={(e) => onChange("readingTime", e.target.value)}
              placeholder="مثلاً 6"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              تعداد کلمات
            </label>

            <input
              type="number"
              min="0"
              value={formData.wordCount || ""}
              onChange={(e) => onChange("wordCount", e.target.value)}
              placeholder="مثلاً 1200"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>
        </div>

        {/* Main Content */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            متن مقاله
            <span className="mr-1 text-red-500">*</span>
          </label>

          <div className="advanced-ckeditor rounded-2xl border border-slate-200">
            <CKEditor
              value={formData.content || ""}
              onChange={(value) => onChange("content", value)}
              placeholder="متن کامل مقاله را اینجا بنویسید..."
            />
          </div>

          <div className="mt-2 text-xs text-slate-400">
            تعداد کاراکتر محتوا: {contentLength}
          </div>
        </div>

        {/* Content Quality Metrics */}
        <div className="border-t border-slate-100 pt-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              متریک‌های ساختار محتوا
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              این مقادیر می‌توانند دستی وارد شوند یا بعداً با یک آنالایزر محتوا
              به‌صورت خودکار محاسبه شوند.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                تعداد Heading
              </label>

              <input
                type="number"
                min="0"
                value={formData.headingCount || ""}
                onChange={(e) => onChange("headingCount", e.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                تعداد تصاویر
              </label>

              <input
                type="number"
                min="0"
                value={formData.imageCount || ""}
                onChange={(e) => onChange("imageCount", e.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                لینک داخلی
              </label>

              <input
                type="number"
                min="0"
                value={formData.internalLinkCount || ""}
                onChange={(e) => onChange("internalLinkCount", e.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                لینک خارجی
              </label>

              <input
                type="number"
                min="0"
                value={formData.externalLinkCount || ""}
                onChange={(e) => onChange("externalLinkCount", e.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
