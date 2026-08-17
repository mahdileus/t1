"use client";

import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiSearch,
  FiSliders,
  FiTag,
  FiX,
} from "react-icons/fi";

const sortOptions = [
  { label: "همه پروژه‌ها", value: "" },
  { label: "جدیدترین پروژه‌ها", value: "newest" },
  { label: "قدیمی‌ترین پروژه‌ها", value: "oldest" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PortfolioFilters({
  tags = [],
  categories = [],
  searchQuery = "",
  selectedTag = "",
  selectedCategory = "",
  sort = "",
  onSearch,
  onSelectTag,
  onSelectCategory,
  onSort,
}) {
  const [searchText, setSearchText] = useState(searchQuery);

  useEffect(() => {
    setSearchText(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const normalizedValue = searchText.trim();

      if (normalizedValue !== searchQuery) {
        onSearch(normalizedValue);
      }
    }, 350);

    return () => clearTimeout(delay);
  }, [searchText, searchQuery, onSearch]);

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedTag) ||
    Boolean(selectedCategory) ||
    Boolean(sort);

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  const clearCategory = () => {
    onSelectCategory("");
  };

  const clearTag = () => {
    onSelectTag("");
  };

  return (
    <div
      dir="rtl"
      className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/65 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-6 lg:p-7"
    >
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-950/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b1f3a] text-orange-400 shadow-[0_10px_25px_rgba(11,31,58,0.22)]">
              <FiSliders className="text-xl" />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-[#0b1f3a] sm:text-lg">
                جستجو و فیلتر نمونه‌کارها
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                پروژه موردنظر خود را سریع‌تر پیدا کنید
              </p>
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/80 px-3 py-1.5 font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
                >
                  جستجو: {searchQuery}
                  <FiX className="text-sm" />
                </button>
              ) : null}

              {selectedCategory ? (
                <button
                  type="button"
                  onClick={clearCategory}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 font-medium text-[#0b1f3a] transition hover:border-blue-300 hover:bg-blue-100"
                >
                  دسته: {selectedCategory}
                  <FiX className="text-sm" />
                </button>
              ) : null}

              {selectedTag ? (
                <button
                  type="button"
                  onClick={clearTag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 font-medium text-[#0b1f3a] transition hover:border-blue-300 hover:bg-blue-100"
                >
                  #{selectedTag}
                  <FiX className="text-sm" />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Search and sort */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_250px]">
          {/* Search */}
          <div className="group relative">
            <FiSearch className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400 transition-colors group-focus-within:text-orange-500" />

            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="جستجوی نام پروژه..."
              aria-label="جستجوی نمونه‌کار"
              className="h-14 w-full rounded-2xl border border-slate-200/90 bg-white/70 px-12 text-sm text-[#0b1f3a] outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-400 focus:bg-white/90 focus:ring-4 focus:ring-orange-500/10"
            />

            {searchText ? (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="پاک کردن جستجو"
                className="absolute left-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-orange-100 hover:text-orange-600"
              >
                <FiX />
              </button>
            ) : null}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(event) => onSort(event.target.value)}
              aria-label="مرتب‌سازی نمونه‌کارها"
              className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200/90 bg-white/70 px-4 pl-11 text-sm text-[#0b1f3a] outline-none transition-all hover:border-slate-300 focus:border-orange-400 focus:bg-white/90 focus:ring-4 focus:ring-orange-500/10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <FiChevronDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 ? (
          <div className="mt-6 border-t border-slate-200/70 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <FiSliders className="text-sm" />
              </span>

              <span className="text-xs font-bold text-[#0b1f3a]">
                دسته‌بندی پروژه‌ها
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelectCategory("")}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200",
                  selectedCategory === ""
                    ? "border-[#0b1f3a] bg-[#0b1f3a] text-white shadow-[0_8px_18px_rgba(11,31,58,0.18)]"
                    : "border-slate-200 bg-white/60 text-slate-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                )}
              >
                همه
              </button>

              {categories.map((category, index) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    type="button"
                    key={`category-${category}-${index}`}
                    onClick={() =>
                      onSelectCategory(isActive ? "" : category)
                    }
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200",
                      isActive
                        ? "border-orange-500 bg-orange-500 text-white shadow-[0_8px_18px_rgba(249,115,22,0.22)]"
                        : "border-slate-200 bg-white/60 text-slate-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Tags */}
        {tags.length > 0 ? (
          <div className="mt-6 border-t border-slate-200/70 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#0b1f3a]">
                <FiTag className="text-sm" />
              </span>

              <span className="text-xs font-bold text-[#0b1f3a]">
                فیلتر بر اساس برچسب
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                const isActive = selectedTag === tag;

                return (
                  <button
                    type="button"
                    key={`tag-${tag}-${index}`}
                    onClick={() => onSelectTag(isActive ? "" : tag)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-xs transition-all duration-200",
                      isActive
                        ? "border-[#0b1f3a] bg-[#0b1f3a] font-bold text-white shadow-[0_8px_18px_rgba(11,31,58,0.18)]"
                        : "border-slate-200 bg-white/60 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-[#0b1f3a]"
                    )}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
