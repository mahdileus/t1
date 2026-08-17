"use client";

import { useState } from "react";
import PortfolioFilters from "./PortfolioFilters";
import ProjectCard from "../../module/ProjectCard/ProjectCard";

/* ---------- normalizer ها ---------- */
const norm = (value) => (typeof value === "string" ? value.trim() : "");

function categoryLabel(category) {
  if (!category) return "";
  if (typeof category === "string") return category.trim();
  return (category?.title || category?.name || "").trim();
}

function projectTags(project) {
  return (project.tags || []).map(norm).filter(Boolean);
}

export default function Projects({
  projects = [],
  tags = [],
  categories = [],
}) {
  const [sortFilter, setSortFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const sortProjects = (list) => {
    switch (sortFilter) {
      case "newest":
        return [...list].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...list].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return list;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const searchOk = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const catOk = selectedCategory
      ? categoryLabel(project.category) === selectedCategory
      : true;

    const tagOk = selectedTag
      ? projectTags(project).includes(selectedTag)
      : true;

    return searchOk && catOk && tagOk;
  });

  const sortedProjects = sortProjects(filteredProjects);

  const hasActiveFilters = Boolean(
    searchQuery || selectedTag || selectedCategory || sortFilter
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
    setSelectedCategory("");
    setSortFilter("");
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 font-yekan-bakh sm:px-6 lg:px-8">
      {/* Filters */}
      <section
        className="mt-10"
        aria-label="جستجو، فیلتر و مرتب‌سازی نمونه‌کارها"
      >
        <PortfolioFilters
          tags={tags}
          categories={categories}
          searchQuery={searchQuery}
          selectedTag={selectedTag}
          selectedCategory={selectedCategory}
          sort={sortFilter}
          onSearch={setSearchQuery}
          onSelectTag={setSelectedTag}
          onSelectCategory={setSelectedCategory}
          onSort={setSortFilter}
        />
      </section>

      {/* Result information */}
      <section
        className="mt-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-slate-500">
          {hasActiveFilters ? "نتیجه فیلترها: " : ""}
          <strong className="font-bold text-[var(--color-secondery)]">
            {sortedProjects.length}
          </strong>{" "}
          پروژه پیدا شد
        </p>
      </section>

      {/* Grid */}
      {sortedProjects.length > 0 ? (
        <section
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"
          aria-label="فهرست نمونه‌کارها"
        >
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
            />
          ))}
        </section>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="text-sm text-slate-500">
            پروژه‌ای با این فیلترها پیدا نشد.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 text-sm font-bold text-[var(--color-secondery)] transition hover:opacity-80"
          >
            حذف همه فیلترها
          </button>
        </div>
      )}
    </section>
  );
}
