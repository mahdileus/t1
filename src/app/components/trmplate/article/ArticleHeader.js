"use client";

import RichTextContent from "@/app/components/module/ckeditor/RichTextContent";
import { FaTags } from "react-icons/fa6";
import { CiCalendar, CiUser, CiFolderOn, CiClock2 } from "react-icons/ci";

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

export default function ArticleHeader({ article }) {
  if (!article) return null;

  const shamsiDate = formatPersianDate(article.publishedAt || article.createdAt);

  return (
    <section className="relative w-full overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/2 top-0 h-72 w-72 translate-x-1/2 rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute left-10 top-40 h-40 w-40 rounded-full bg-orange-50 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* top hero */}
        <div className="mx-auto max-w-3xl pt-4 text-center md:pt-10">
          {article.category?.title ? (
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-orange-400 shadow-sm backdrop-blur-sm">
                <CiFolderOn className="text-base" />
                <span>{article.category.title}</span>
              </span>
            </div>
          ) : null}

          <h1 className="text-3xl font-extrabold leading-[2.6rem] tracking-tight text-primary md:text-6xl md:leading-[5rem]">
            {article.title}
          </h1>

          {article.excerpt ? (
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-slate-500 md:text-lg md:leading-9">
              {article.excerpt}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <CiUser className="text-lg text-orange-400" />
              <span>{article.authorName || "نویسنده"}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <CiCalendar className="text-lg text-orange-400" />
              <span>{shamsiDate}</span>
            </div>

            {article.readingTime ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                <CiClock2 className="text-lg text-orange-400" />
                <span>{article.readingTime} دقیقه مطالعه</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* cover */}
        {article.cover ? (
          <div className="relative mx-auto mt-12 max-w-5xl">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-orange-100/40 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              <img
                src={article.cover}
                alt={article.title}
                className="h-auto max-h-[620px] w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* content */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div
            className="
      article-content
      text-right
      text-justify
      text-[15px]
      leading-9
      text-slate-600
      md:text-[17px]
      md:leading-10
    "
          >
            <RichTextContent
              html={article.content}
              className="text-justify"
            />
          </div>
        </div>


        {/* footer */}
        <div className="mx-auto mt-16 max-w-3xl border-t border-slate-200/80 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
                <FaTags className="text-orange-400" />
                <span>برچسب‌ها</span>
              </div>

              {article.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-orange-200/80 bg-orange-50/80 px-3.5 py-1.5 text-xs font-medium text-orange-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-slate-400">برچسبی ثبت نشده است</span>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
