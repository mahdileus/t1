"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleFilters({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [language, setLanguage] = useState(searchParams.get("language") || "");
  const [contentType, setContentType] = useState(
    searchParams.get("contentType") || ""
  );
  const [featured, setFeatured] = useState(searchParams.get("featured") || "");
  const [indexable, setIndexable] = useState(searchParams.get("indexable") || "");
  const [deleted, setDeleted] = useState(searchParams.get("deleted") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "");
    setCategory(searchParams.get("category") || "");
    setLanguage(searchParams.get("language") || "");
    setContentType(searchParams.get("contentType") || "");
    setFeatured(searchParams.get("featured") || "");
    setIndexable(searchParams.get("indexable") || "");
    setDeleted(searchParams.get("deleted") || "");
  }, [searchParams]);

  const setOrDeleteParam = (params, key, value) => {
    const normalizedValue = String(value || "").trim();

    if (normalizedValue) {
      params.set(key, normalizedValue);
    } else {
      params.delete(key);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    setOrDeleteParam(params, "search", search);
    setOrDeleteParam(params, "status", status);
    setOrDeleteParam(params, "category", category);
    setOrDeleteParam(params, "language", language);
    setOrDeleteParam(params, "contentType", contentType);
    setOrDeleteParam(params, "featured", featured);
    setOrDeleteParam(params, "indexable", indexable);
    setOrDeleteParam(params, "deleted", deleted);

    params.set("page", "1");

    const queryString = params.toString();

    router.push(queryString ? `/p-admin/articles?${queryString}` : "/p-admin/articles");
  };

  const resetHandler = () => {
    setSearch("");
    setStatus("");
    setCategory("");
    setLanguage("");
    setContentType("");
    setFeatured("");
    setIndexable("");
    setDeleted("");

    router.push("/p-admin/articles");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            جستجو
          </label>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="عنوان، اسلاگ، خلاصه، توضیحات متا یا تگ"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            وضعیت
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو شده</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            دسته‌بندی
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه دسته‌بندی‌ها</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {`${"— ".repeat(cat.level || 0)}${cat.title}`}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            زبان
          </label>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه زبان‌ها</option>
            <option value="fa">فارسی</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Content Type */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            نوع محتوا
          </label>

          <select
            value={contentType}
            onChange={(event) => setContentType(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه نوع‌ها</option>
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
            <option value="plain">Plain Text</option>
          </select>
        </div>

        {/* Featured */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            مقاله ویژه
          </label>

          <select
            value={featured}
            onChange={(event) => setFeatured(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه</option>
            <option value="true">ویژه</option>
            <option value="false">غیر ویژه</option>
          </select>
        </div>

        {/* Indexable */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            وضعیت ایندکس
          </label>

          <select
            value={indexable}
            onChange={(event) => setIndexable(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">همه</option>
            <option value="true">Index</option>
            <option value="false">Noindex</option>
          </select>
        </div>

        {/* Deleted */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            حذف‌شده‌ها
          </label>

          <select
            value={deleted}
            onChange={(event) => setDeleted(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">بدون فیلتر</option>
            <option value="false">فقط فعال‌ها</option>
            <option value="true">فقط حذف‌شده‌ها</option>
            <option value="all">همه موارد</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          اعمال فیلتر
        </button>

        <button
          type="button"
          onClick={resetHandler}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          حذف فیلترها
        </button>
      </div>
    </form>
  );
}
