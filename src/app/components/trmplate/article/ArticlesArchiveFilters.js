"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function ArticlesArchiveFilters({
  categories = [],
  activeFilters,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(activeFilters?.search || "");

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");
    router.push(`/articles?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter("search", search.trim());
  };

  const resetFilters = () => {
    router.push("/articles");
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* search */}
        <form
          onSubmit={handleSearchSubmit}
          className="md:col-span-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
        >
          <CiSearch className="text-2xl text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در عنوان، توضیحات یا تگ‌ها..."
            className="h-10 w-full bg-transparent text-sm text-[var(--color-secondery)] outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-orange-400 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500"
          >
            جستجو
          </button>
        </form>

        {/* category */}
        <div className="md:col-span-3">
          <select
            value={activeFilters?.category || ""}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-primary outline-none"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* sort */}
        <div className="md:col-span-3">
          <select
            value={activeFilters?.sort || "newest"}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-primary outline-none"
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
            <option value="reading-asc">کمترین زمان مطالعه</option>
            <option value="reading-desc">بیشترین زمان مطالعه</option>
          </select>
        </div>

        {/* reset */}
        <div className="md:col-span-1">
          <button
            onClick={resetFilters}
            className="h-14 w-full rounded-2xl bg-secondery px-4 cursor-pointer text-sm font-medium text-white  hover:text-orange-400 hover:bg-white hover:border hover:border-secondery transition-all "
          >
            پاک
          </button>
        </div>
      </div>
    </div>
  );
}
