"use client";

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const selectClass =
  "h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-primary outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

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
  onReset,
}) {
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const categoryOptions = [...new Set(categories.filter(Boolean))];
  const tagOptions = [...new Set(tags.filter(Boolean))];

  if (selectedCategory && !categoryOptions.includes(selectedCategory)) {
    categoryOptions.push(selectedCategory);
  }
  if (selectedTag && !tagOptions.includes(selectedTag)) {
    tagOptions.push(selectedTag);
  }

  const showCategories = categoryOptions.length > 0;
  const showTags = tagOptions.length > 0;
  const searchSpan = showCategories && showTags
    ? "lg:col-span-5"
    : showCategories || showTags
      ? "lg:col-span-7"
      : "lg:col-span-9";

  function handleSearchSubmit(event) {
    event.preventDefault();
    onSearch(search.trim());
  }

  function resetFilters() {
    setSearch("");
    if (onReset) {
      onReset();
      return;
    }
    onSearch("");
    onSelectCategory("");
    onSelectTag("");
    onSort("");
  }

  return (
    <div dir="rtl" className="rounded-[28px] border border-slate-200 bg-white p-4 font-yekan-bakh shadow-sm md:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <form
          role="search"
          aria-label="جستجوی نمونه‌کارها"
          onSubmit={handleSearchSubmit}
          className={`flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-orange-400 sm:col-span-2 ${searchSpan}`}
        >
          <CiSearch aria-hidden="true" className="shrink-0 text-2xl text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="جستجوی پروژه"
            placeholder="جستجو در نمونه‌کارها..."
            className="h-10 w-full min-w-0 bg-transparent text-sm text-primary outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-orange-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            جستجو
          </button>
        </form>

        {showCategories && (
          <div className="min-w-0 lg:col-span-2">
            <select
              aria-label="دسته‌بندی پروژه"
              value={selectedCategory}
              onChange={(event) => onSelectCategory(event.target.value)}
              className={selectClass}
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}

        {showTags && (
          <div className="min-w-0 lg:col-span-2">
            <select
              aria-label="برچسب پروژه"
              value={selectedTag}
              onChange={(event) => onSelectTag(event.target.value)}
              className={selectClass}
            >
              <option value="">همه برچسب‌ها</option>
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}

        <div className="min-w-0 lg:col-span-2">
          <select
            aria-label="مرتب‌سازی پروژه‌ها"
            value={sort}
            onChange={(event) => onSort(event.target.value)}
            className={selectClass}
          >
            <option value="">ترتیب پیش‌فرض</option>
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>

        <div className="lg:col-span-1">
          <button
            type="button"
            onClick={resetFilters}
            aria-label="پاک کردن همه فیلترها"
            className="h-14 w-full cursor-pointer rounded-2xl border border-secondery bg-secondery px-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-secondery focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
          >
            پاک
          </button>
        </div>
      </div>
    </div>
  );
}
