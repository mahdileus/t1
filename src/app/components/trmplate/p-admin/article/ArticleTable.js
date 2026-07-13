"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ArticleRow from "./ArticleRow";

export default function ArticleTable({ articles = [], pagination }) {
  const searchParams = useSearchParams();

  const currentPage = Number(pagination?.page || 1);
  const totalPages = Number(pagination?.pages || 1);
  const total = Number(pagination?.total || 0);

  function buildPageUrl(pageNumber) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    return `?${params.toString()}`;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr className="text-right">
              <th className="px-4 py-3 font-medium">تصویر</th>
              <th className="px-4 py-3 font-medium">عنوان</th>
              <th className="px-4 py-3 font-medium">دسته‌بندی</th>
              <th className="px-4 py-3 font-medium">نویسنده</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
              <th className="px-4 py-3 font-medium">تاریخ انتشار</th>
              <th className="px-4 py-3 font-medium text-center">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <ArticleRow key={article._id} article={article} />
            ))}

            {articles.length === 0 && (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500">
                  مقاله‌ای یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-4 py-4 text-sm text-slate-500 sm:flex-row">
          <span>
            صفحه {currentPage} از {totalPages}، کل مقالات: {total}
          </span>

          <div className="flex flex-wrap items-center gap-1">
            {currentPage > 1 ? (
              <Link
                href={buildPageUrl(currentPage - 1)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                قبلی
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-lg border border-slate-100 px-3 py-2 text-slate-300">
                قبلی
              </span>
            )}

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <Link
                  key={page}
                  href={buildPageUrl(page)}
                  className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg border transition ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {currentPage < totalPages ? (
              <Link
                href={buildPageUrl(currentPage + 1)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                بعدی
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-lg border border-slate-100 px-3 py-2 text-slate-300">
                بعدی
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
