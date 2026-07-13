// /app/articles/[slug]/page.jsx
export const revalidate = 3600; // یک ساعت برای کش مناسب است

import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ArticleHeader from "@/app/components/trmplate/article/ArticleHeader";
import Shape from "@/app/components/trmplate/index/shape/Shape";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectToDB();
  const article = await ArticleModel.findOne({ slug, status: "published" }).select("title excerpt seoTitle seoDescription cover").lean();

  if (!article) return { title: "مقاله یافت نشد" };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      images: [article.cover],
    },
  };
}

const ArticlePage = async ({ params }) => {
  const { slug } = await params;
  await connectToDB();


  // دریافت مقاله اصلی به همراه دسته بندی
  const article = await ArticleModel.findOne({ slug, status: "published" })
    .populate("category", "title slug")
    .lean();

  if (!article) notFound();

  // دریافت جدیدترین مقالات (به جز مقاله فعلی)
  const latestArticles = await ArticleModel.find({ _id: { $ne: article._id }, status: "published" })
    .select("title slug cover publishedAt readingTime")
    .sort({ publishedAt: -1 })
    .limit(4)
    .lean();


  // ساخت JSON-LD برای سئو گوگل
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": article.cover,
    "author": { "@type": "Person", "name": article.authorName },
    "datePublished": article.publishedAt || article.createdAt,
    "description": article.excerpt,
  };

  return (
    <div className="font-yekan-bakh  min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Shape/>

      <Navbar
      />

      <main className="py-10">
        <ArticleHeader
          article={JSON.parse(JSON.stringify(article))}
          articles={JSON.parse(JSON.stringify(latestArticles))}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
