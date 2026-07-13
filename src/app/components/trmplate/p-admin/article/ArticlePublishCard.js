"use client";

export default function ArticlePublishCard({
  pageTitle,
  formData,
  onChange,
  isSubmitting,
  isEdit,
}) {
  return (
    <section className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">انتشار</h2>
        <p className="mt-1 text-sm text-slate-500">
          وضعیت و زمان انتشار مقاله را مشخص کنید.
        </p>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs text-slate-400">عنوان مقاله</p>
        <p className="mt-1 line-clamp-2 font-semibold text-slate-800">
          {pageTitle}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            وضعیت
          </label>
          <select
            value={formData.status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو شده</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            تاریخ انتشار
          </label>
          <input
            type="datetime-local"
            value={formData.publishedAt}
            onChange={(e) => onChange("publishedAt", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
          <p className="mt-1 text-xs text-slate-400">
            اگر وضعیت روی "منتشر شده" باشد، در صورت خالی بودن، API می‌تواند تاریخ را خودکار ثبت کند.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "در حال ذخیره..."
            : isEdit
            ? "بروزرسانی مقاله"
            : "ثبت مقاله"}
        </button>
      </div>
    </section>
  );
}
