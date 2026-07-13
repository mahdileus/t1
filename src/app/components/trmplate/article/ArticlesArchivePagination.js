"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ArticlesArchivePagination({
  currentPage,
  totalPages,
}) {
  const searchParams = useSearchParams();

  const createPageLink = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    return `/articles?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageLink(currentPage - 1)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-orange-200 hover:text-orange-400"
        >
          قبلی
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createPageLink(page)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition ${
            page === currentPage
              ? "border-orange-400 bg-orange-400 text-white"
              : "border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-400"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={createPageLink(currentPage + 1)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-orange-200 hover:text-orange-400"
        >
          بعدی
        </Link>
      )}
    </div>
  );
}
