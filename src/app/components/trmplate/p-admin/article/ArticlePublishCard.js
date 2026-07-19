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
          {pageTitle || formData?.title || "بدون عنوان"}
        </p>
      </div>
      <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs text-slate-400"> توضیح</p>

        <p className="mt-1 line-clamp-5 text-sm text-slate-800">
          { formData?.excerpt || "بدون توضیح"}
        </p>
      </div>

      <div className="space-y-4">

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
