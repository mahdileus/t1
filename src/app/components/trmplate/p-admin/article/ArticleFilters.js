"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ArticleFilters({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const submitHandler = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const resetHandler = () => {
    setSearch("");
    setStatus("");
    setCategory("");

    router.push("/p-admin/articles");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="grid grid-cols-1 gap-3 md:grid-cols-4"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          جستجو
        </label>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="عنوان، اسلاگ، خلاصه یا تگ"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          وضعیت
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="select-field "
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="draft">پیش‌نویس</option>
          <option value="published">منتشر شده</option>
          <option value="archived">آرشیو شده</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          دسته‌بندی
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="select-field"
        >
          <option value="">همه دسته‌بندی‌ها</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          اعمال فیلتر
        </button>

        <button
          type="button"
          onClick={resetHandler}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          حذف
        </button>
      </div>
    </form>
  );
}
