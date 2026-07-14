import Link from "next/link";
import { CiCalendar, CiClock2 } from "react-icons/ci";

function formatPersianDate(date) {
  if (!date) return "تاریخ نامشخص";

  try {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "تاریخ نامشخص";
  }
}

export default function ArticlesArchiveCard({ article }) {
  const date = formatPersianDate(article.publishedAt || article.createdAt);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {article.cover ? (
          <img
            src={article.cover}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            بدون تصویر
          </div>
        )}

        {article.category?.title ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[var(--color-secondery)] backdrop-blur">
            {article.category.title}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <h2 className="line-clamp-2 text-lg font-bold leading-8 text-primary transition group-hover:text-orange-400">
          {article.title}
        </h2>

        {article.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
            {article.excerpt}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CiCalendar className="text-base text-orange-400" />
            <span>{date}</span>
          </div>

          {article.readingTime ? (
            <div className="flex items-center gap-1.5">
              <CiClock2 className="text-base text-orange-400" />
              <span>{article.readingTime} دقیقه</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
