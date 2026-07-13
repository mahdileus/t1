
import ArticleFilters from "@/app/components/trmplate/p-admin/article/ArticleFilters";
import ArticleTable from "@/app/components/trmplate/p-admin/article/ArticleTable";
import connectToDB from "@/configs/db";
import Article from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({ searchParams }) {
  await connectToDB();

  // در نسخه‌های جدید Next.js ممکن است searchParams یک Promise باشد
  const sParams = await searchParams;

  const page = Math.max(Number(sParams?.page) || 1, 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const search = String(sParams?.search || "").trim();
  const status = String(sParams?.status || "").trim();
  const category = String(sParams?.category || "").trim();

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        slug: {
          $regex: search,
          $options: "i",
        },
      },
      {
        excerpt: {
          $regex: search,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const [total, articles, categories] = await Promise.all([
    Article.countDocuments(filter),

    Article.find(filter)
      .select("-content -seoSchema")
      .populate({
        path: "category",
        select: "title slug parent",
        populate: {
          path: "parent",
          select: "title slug",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    ArticleCategory.find({ isActive: true })
      .select("title slug parent level")
      .sort({ level: 1, sortOrder: 1, title: 1 })
      .lean(),
  ]);

  const pages = Math.ceil(total / limit) || 1;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت مقالات</h1>

          <p className="mt-1 text-sm text-slate-500">
            فهرست، جستجو، فیلتر و مدیریت مقالات سایت
          </p>
        </div>

        <a
          href="/p-admin/articles/create"
          className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-800"
        >
          مقاله جدید
        </a>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <Suspense fallback={<div>در حال بارگذاری فیلترها...</div>}>
          <ArticleFilters categories={JSON.parse(JSON.stringify(categories))} />
        </Suspense>
      </div>

      <ArticleTable
        articles={JSON.parse(JSON.stringify(articles))}
        pagination={{
          page,
          pages,
          total,
        }}
      />
    </div>
  );
}
