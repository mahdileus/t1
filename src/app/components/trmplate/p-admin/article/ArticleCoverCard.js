"use client";

import ArticlePreviewImage from "./ArticlePreviewImage";

export default function ArticleCoverCard({
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

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">تصویر کاور</h2>
        <p className="mt-1 text-sm text-slate-500">
          تصویر شاخص مقاله را انتخاب کنید.
        </p>
      </div>

      <div className="space-y-4">
        <ArticlePreviewImage src={coverPreview || currentImage} alt="article-cover" />

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
      </div>
    </section>
  );
}
