import ArticleForm from "@/app/components/trmplate/p-admin/article/ArticleForm";
import connectToDB from "@/configs/db";
import Article from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }) {
  await connectToDB();

  const { id } = await params;

  const [article, categories] = await Promise.all([
    Article.findById(id).lean(),
    ArticleCategory.find({ isActive: true })
      .select("title slug parent level")
      .sort({ level: 1, sortOrder: 1, title: 1 })
      .lean(),
  ]);

  if (!article) return notFound();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">ویرایش مقاله</h1>
        <p className="mt-2 text-sm text-slate-500">
          اطلاعات مقاله را بروزرسانی کنید.
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
