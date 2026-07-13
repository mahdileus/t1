"use client";

export default function ArticleBasicInfoCard({ formData, categories, onChange }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">اطلاعات اصلی مقاله</h2>
        <p className="mt-1 text-sm text-slate-500">
          عنوان، اسلاگ، نویسنده و دسته‌بندی را تنظیم کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            عنوان مقاله
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="مثلاً راهنمای کامل انتخاب محصول"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            اسلاگ
          </label>
          <input
            type="text"
            dir="ltr"
            value={formData.slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="guide-to-choose-product"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
          <p className="mt-1 text-xs text-slate-400">
            اگر خالی بماند، از روی عنوان ساخته می‌شود.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            نام نویسنده
          </label>
          <input
            type="text"
            value={formData.authorName}
            onChange={(e) => onChange("authorName", e.target.value)}
            placeholder="مثلاً تیم تحریریه"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            دسته‌بندی
          </label>
          <select
            value={formData.category}
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

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            خلاصه مقاله
          </label>
          <textarea
            rows={4}
            value={formData.excerpt}
            onChange={(e) => onChange("excerpt", e.target.value)}
            placeholder="خلاصه‌ای کوتاه و جذاب از مقاله..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 resize-none"
          />
        </div>
      </div>
    </section>
  );
}
