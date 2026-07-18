// app/p-admin/articles/create/page.js

import ArticleForm from "@/app/components/trmplate/p-admin/article/ArticleForm";
import connectToDB from "@/configs/db";
import ArticleCategory from "@/models/ArticleCategory";

export const dynamic = "force-dynamic";

export default async function CreateArticlePage() {
  await connectToDB();

  const categories = await ArticleCategory.find({ isActive: true })
    .select("_id title slug parent level sortOrder")
    .sort({ level: 1, sortOrder: 1, title: 1 })
    .lean();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          افزودن مقاله جدید
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          اطلاعات مقاله، تصویر، سئو و وضعیت انتشار را تنظیم کنید.
        </p>
      </div>

      <ArticleForm
        mode="create"
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
