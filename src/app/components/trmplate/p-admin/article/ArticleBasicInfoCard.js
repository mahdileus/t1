"use client";

import SeoKeywordInput from "./SeoKeywordInput";

export default function ArticleBasicInfoCard({
  formData,
  categories = [],
  onChange,
}) {
  const titleLength = formData.title?.length || 0;
  const excerptLength = formData.excerpt?.length || 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          اطلاعات اصلی مقاله
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          عنوان، اسلاگ، نویسنده، دسته‌بندی، زبان و خلاصه مقاله را تنظیم کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            عنوان مقاله
            <span className="mr-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="مثلاً راهنمای کامل انتخاب محصول"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <div
            className={`mt-1 text-xs ${
              titleLength > 200 ? "text-red-500" : "text-slate-400"
            }`}
          >
            تعداد کاراکتر: {titleLength} / 200
          </div>
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            اسلاگ
          </label>

          <input
            type="text"
            dir="ltr"
            value={formData.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="guide-to-choose-product"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus:border-slate-400"
          />

          <p className="mt-1 text-xs text-slate-400">
            اگر خالی بماند، API می‌تواند از روی عنوان بسازد.
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            دسته‌بندی
            <span className="mr-1 text-red-500">*</span>
          </label>

          <select
            value={formData.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">انتخاب دسته‌بندی</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {`${"— ".repeat(cat.level || 0)}${cat.title}`}
              </option>
            ))}
          </select>
        </div>

        {/* Author Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            نام نویسنده
            <span className="mr-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.authorName || ""}
            onChange={(e) => onChange("authorName", e.target.value)}
            placeholder="مثلاً تیم تحریریه"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        {/* Author Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            اسلاگ نویسنده
          </label>

          <input
            type="text"
            dir="ltr"
            value={formData.authorSlug || ""}
            onChange={(e) => onChange("authorSlug", e.target.value)}
            placeholder="editorial-team"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus:border-slate-400"
          />

          <p className="mt-1 text-xs text-slate-400">
            برای ساخت author URL یا Schema کاربرد دارد.
          </p>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            زبان مقاله
          </label>

          <select
            value={formData.language || "fa"}
            onChange={(e) => onChange("language", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="fa">فارسی</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <SeoKeywordInput
            label="تگ‌های مقاله"
            keywords={formData.tags || []}
            onChange={(tags) => onChange("tags", tags)}
            placeholder="تگ را وارد کنید و Enter بزنید"
          />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            خلاصه مقاله
            <span className="mr-1 text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={formData.excerpt || ""}
            onChange={(e) => onChange("excerpt", e.target.value)}
            placeholder="خلاصه‌ای کوتاه و جذاب از مقاله..."
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <div
            className={`mt-1 text-xs ${
              excerptLength > 500 ? "text-red-500" : "text-slate-400"
            }`}
          >
            تعداد کاراکتر: {excerptLength} / 500
          </div>

          <p className="mt-1 text-xs text-slate-400">
            توجه: `excerpt` با `metaDescription` یکی نیست. توضیحات متا در بخش
            سئو تنظیم می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}
