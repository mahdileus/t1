import Footer from "@/app/components/module/footer/Footer";
import ArticlesArchiveFilters from "./ArticlesArchiveFilters";
import ArticlesArchiveGrid from "./ArticlesArchiveGrid";
import ArticlesArchivePagination from "./ArticlesArchivePagination";

export default function ArticlesArchivePage({
  articles,
  categories,
  total,
  page,
  pages,
  activeFilters,
}) {
  return (
    <div className="min-h-screen  font-yekan-bakh">

      <main className="pb-20 pt-10 md:pt-14">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* hero */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-400">
              آرشیو مقالات
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-[2.5rem] text-primary md:text-5xl md:leading-[4.5rem]">
              همه‌ی مقاله‌ها، آموزش‌ها و نوشته‌ها
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-500 md:text-base">
              اینجا می‌تونی همه مطالب منتشرشده رو مرور کنی، فیلترشون کنی و سریع
              به چیزی که دنبالش هستی برسی.
            </p>
          </div>

          {/* filters */}
          <div className="mt-10">
            <ArticlesArchiveFilters
              categories={categories}
              activeFilters={activeFilters}
            />
          </div>

          {/* top meta */}
          <div className="mt-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-[var(--color-secondery)]">{total}</span>{" "}
              مقاله پیدا شد
            </p>
          </div>

          {/* grid */}
          <div className="mt-8">
            <ArticlesArchiveGrid articles={articles} />
          </div>

          {/* pagination */}
          {pages > 1 ? (
            <div className="mt-12">
              <ArticlesArchivePagination currentPage={page} totalPages={pages} />
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
