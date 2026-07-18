"use client";

import Link from "next/link";
import RichTextContent from "@/app/components/module/ckeditor/RichTextContent";

function CalendarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 2.75v3M17 2.75v3M3.75 9.25h16.5M5.75 4.75h12.5A2.25 2.25 0 0 1 20.5 7v11.25a2.25 2.25 0 0 1-2.25 2.25H5.75a2.25 2.25 0 0 1-2.25-2.25V7a2.25 2.25 0 0 1 2.25-2.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 12.25a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5ZM4.75 20.25a7.25 7.25 0 0 1 14.5 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FolderIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.75 7.25A2.25 2.25 0 0 1 6 5h4.1c.62 0 1.2.25 1.62.7l1.03 1.1c.42.45 1 .7 1.62.7H18A2.25 2.25 0 0 1 20.25 9.75v6.5A2.25 2.25 0 0 1 18 18.5H6a2.25 2.25 0 0 1-2.25-2.25v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5ZM12 7.25V12l3.25 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.75 4.75h6.55c.6 0 1.17.24 1.6.66l6.68 6.69a2.25 2.25 0 0 1 0 3.18l-4.3 4.3a2.25 2.25 0 0 1-3.18 0L5.41 12.9a2.25 2.25 0 0 1-.66-1.6V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.25 12a8.25 8.25 0 0 1-14.08 5.83M3.75 12A8.25 8.25 0 0 1 17.83 6.17M17.75 3.75v2.5h-2.5M6.25 20.25v-2.5h2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m5 12.5 4.25 4.25L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.75 6.75 9.5 12l5.25 5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function getAuthorName(article) {
  return article?.authorName || article?.author?.name || "نویسنده";
}

function getAuthorHref(article) {
  const slug = article?.authorSlug || article?.author?.slug;

  if (!slug) return "";

  return `/authors/${slug}`;
}

function getCategoryHref(article) {
  if (!article?.category?.slug) return "";

  return `/articles/category/${article.category.slug}`;
}

function normalizeRelatedArticles(article, articles) {
  if (Array.isArray(article?.relatedArticles) && article.relatedArticles.length > 0) {
    return article.relatedArticles;
  }

  if (Array.isArray(articles) && articles.length > 0) {
    return articles;
  }

  return [];
}

function FaqSection({ faqs = [] }) {
  const validFaqs = Array.isArray(faqs)
    ? faqs.filter((faq) => faq?.question && faq?.answer)
    : [];

  if (validFaqs.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <div className="mb-6">
        <span className="mb-3 inline-flex rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-500">
          سوالات متداول
        </span>

        <h2 className="text-2xl font-extrabold text-primary">
          پرسش‌های پرتکرار درباره این مقاله
        </h2>
      </div>

      <div className="space-y-4">
        {validFaqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 open:border-orange-200 open:bg-orange-50/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-700 md:text-base">
              <span>{faq.question}</span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-transform duration-200 group-open:rotate-180">
                <ArrowLeftIcon className="h-5 w-5 -rotate-90" />
              </span>
            </summary>

            <div className="mt-4 border-t border-slate-200/70 pt-4 text-sm leading-8 text-slate-600">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function RelatedArticlesSection({ articles = [] }) {
  const validArticles = Array.isArray(articles)
    ? articles.filter((item) => item?.slug && item?.title)
    : [];

  if (validArticles.length === 0) return null;

  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-500">
            مطالب پیشنهادی
          </span>

          <h2 className="text-2xl font-extrabold text-primary">
            مقالات مرتبط
          </h2>
        </div>

        <Link
          href="/articles"
          className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition-all duration-200 hover:border-orange-200 hover:text-orange-500 md:inline-flex"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {validArticles.slice(0, 4).map((item) => (
          <Link
            key={item._id || item.slug}
            href={`/articles/${item.slug}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            {item.cover ? (
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={item.cover}
                  alt={item.coverAlt || item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className="p-5">
              <h3 className="line-clamp-2 text-base font-extrabold leading-8 text-primary transition-colors duration-200 group-hover:text-orange-500">
                {item.title}
              </h3>

              {item.excerpt ? (
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                  {item.excerpt}
                </p>
              ) : null}

              <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                <span>{formatPersianDate(item.publishedAt || item.createdAt)}</span>

                {item.readingTime ? (
                  <span>{item.readingTime} دقیقه</span>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArticleInfoPill({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
      <span className="text-orange-400">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default function ArticleHeader({ article, articles = [] }) {
  if (!article) return null;

  const publishedDate = formatPersianDate(article.publishedAt || article.createdAt);
  const updatedDate = article.contentUpdatedAt
    ? formatPersianDate(article.contentUpdatedAt)
    : "";
  const reviewedDate = article.lastReviewedAt
    ? formatPersianDate(article.lastReviewedAt)
    : "";

  const authorName = getAuthorName(article);
  const authorHref = getAuthorHref(article);
  const categoryHref = getCategoryHref(article);

  const relatedArticles = normalizeRelatedArticles(article, articles);

  const shouldShowAuthorBox = article.showAuthorBox !== false;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/2 top-0 h-72 w-72 translate-x-1/2 rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute left-10 top-40 h-40 w-40 rounded-full bg-orange-50 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-4 text-center md:pt-10">
          {article.category?.title ? (
            <div className="mb-6 flex justify-center">
              {categoryHref ? (
                <Link
                  href={categoryHref}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-orange-400 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-50"
                >
                  <FolderIcon className="h-4 w-4" />
                  <span>{article.category.title}</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-orange-400 shadow-sm backdrop-blur-sm">
                  <FolderIcon className="h-4 w-4" />
                  <span>{article.category.title}</span>
                </span>
              )}
            </div>
          ) : null}

          {article.topicCluster ? (
            <div className="mb-4 flex justify-center">
              <span className="rounded-full bg-primary/5 px-4 py-2 text-xs font-bold text-primary">
                خوشه موضوعی: {article.topicCluster}
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
            <ArticleInfoPill icon={<UserIcon className="h-5 w-5" />}>
              {authorHref ? (
                <Link
                  href={authorHref}
                  className="transition-colors duration-200 hover:text-orange-500"
                >
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </ArticleInfoPill>

            <ArticleInfoPill icon={<CalendarIcon className="h-5 w-5" />}>
              انتشار: {publishedDate}
            </ArticleInfoPill>

            {article.readingTime ? (
              <ArticleInfoPill icon={<ClockIcon className="h-5 w-5" />}>
                {article.readingTime} دقیقه مطالعه
              </ArticleInfoPill>
            ) : null}

            {updatedDate ? (
              <ArticleInfoPill icon={<RefreshIcon className="h-5 w-5" />}>
                بروزرسانی: {updatedDate}
              </ArticleInfoPill>
            ) : null}

            {reviewedDate ? (
              <ArticleInfoPill icon={<CheckIcon className="h-5 w-5" />}>
                بازبینی: {reviewedDate}
              </ArticleInfoPill>
            ) : null}
          </div>
        </div>

        {article.cover ? (
          <div className="relative mx-auto mt-12 max-w-5xl">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-orange-100/40 to-transparent blur-2xl" />

            <figure className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              <img
                src={article.cover}
                alt={article.coverAlt || article.title}
                title={article.coverTitle || article.title}
                width={article.coverWidth || undefined}
                height={article.coverHeight || undefined}
                className="h-auto max-h-[620px] w-full object-cover"
                loading="eager"
              />

              {article.coverCaption ? (
                <figcaption className="border-t border-slate-100 bg-white px-5 py-4 text-center text-xs leading-6 text-slate-400">
                  {article.coverCaption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        ) : null}

        {article.pillarArticle?.slug ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-orange-200 bg-orange-50/60 p-5">
            <div className="text-xs font-bold text-orange-500">
              مقاله محوری این خوشه
            </div>

            <Link
              href={`/articles/${article.pillarArticle.slug}`}
              className="mt-2 inline-flex text-base font-extrabold leading-8 text-primary transition-colors duration-200 hover:text-orange-500"
            >
              {article.pillarArticle.title}
            </Link>
          </div>
        ) : null}

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
            <RichTextContent html={article.content} className="text-justify" />
          </div>
        </div>

        <FaqSection faqs={article.faqs} />

        <div className="mx-auto mt-16 max-w-3xl border-t border-slate-200/80 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
                <TagIcon className="h-5 w-5 text-orange-400" />
                <span>برچسب‌ها</span>
              </div>

              {article.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full border border-orange-200/80 bg-orange-50/80 px-3.5 py-1.5 text-xs font-medium text-orange-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-slate-400">
                  برچسبی ثبت نشده است
                </span>
              )}
            </div>
          </div>
        </div>

        {shouldShowAuthorBox ? (
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <UserIcon className="h-6 w-6" />
              </div>

              <div>
                <div className="text-xs font-medium text-slate-400">
                  نویسنده مقاله
                </div>

                {authorHref ? (
                  <Link
                    href={authorHref}
                    className="mt-1 inline-flex text-base font-extrabold text-primary transition-colors duration-200 hover:text-orange-500"
                  >
                    {authorName}
                  </Link>
                ) : (
                  <div className="mt-1 text-base font-extrabold text-primary">
                    {authorName}
                  </div>
                )}

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  این مقاله توسط تیم محتوای تیوان تهیه و برای دقت بیشتر از نظر
                  محتوایی و سئویی بررسی شده است.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <RelatedArticlesSection articles={relatedArticles} />
      </div>
    </section>
  );
}
