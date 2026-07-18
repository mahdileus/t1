// app/p-admin/articles/[id]/edit/page.js

import mongoose from "mongoose";
import { notFound } from "next/navigation";

import ArticleForm from "@/app/components/trmplate/p-admin/article/ArticleForm";
import connectToDB from "@/configs/db";
import Article from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }) {
  await connectToDB();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const [article, categories] = await Promise.all([
    Article.findById(id)
      .populate("category", "_id title slug parent level")
      .populate("author", "_id name slug avatar")
      .lean(),

    ArticleCategory.find({ isActive: true })
      .select("_id title slug parent level sortOrder")
      .sort({ level: 1, sortOrder: 1, title: 1 })
      .lean(),
  ]);

  if (!article) return notFound();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          ویرایش مقاله
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          اطلاعات مقاله، تصویر، تنظیمات سئو و وضعیت انتشار را بروزرسانی کنید.
        </p>
      </div>

      <ArticleForm
        mode="edit"
        article={JSON.parse(JSON.stringify(article))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
