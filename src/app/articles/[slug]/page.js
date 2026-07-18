// /app/articles/[slug]/page.jsx

export const revalidate = 3600;

import Footer from "@/app/components/module/footer/Footer";
import Navbar from "@/app/components/module/navbar/Navbar";
import ArticleHeader from "@/app/components/trmplate/article/ArticleHeader";
import Shape from "@/app/components/trmplate/index/shape/Shape";
import ViewTracker from "@/app/components/trmplate/analytics/ViewTracker";

import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import { notFound } from "next/navigation";

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function getAbsoluteUrl(url = "") {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const siteUrl = getSiteUrl();

  if (url.startsWith("/")) {
    return `${siteUrl}${url}`;
  }

  return `${siteUrl}/${url}`;
}

function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function serializeMongoDoc(doc) {
  return JSON.parse(JSON.stringify(doc));
}

function parseSeoSchema(schema) {
  if (!schema) return null;

  if (typeof schema === "object") {
    return schema;
  }

  if (typeof schema === "string") {
    try {
      return JSON.parse(schema);
    } catch {
      return null;
    }
  }

  return null;
}

function buildArticleJsonLd(article) {
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const customSchema = parseSeoSchema(article.seoSchema);

  if (customSchema && Object.keys(customSchema).length > 0) {
    return customSchema;
  }

  const imageUrl = getAbsoluteUrl(article.ogImage || article.cover);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.schemaType || "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.metaTitle || article.title,
    name: article.title,
    description: article.metaDescription || article.excerpt,
    url: articleUrl,
    inLanguage: article.language || "fa",
    datePublished: article.publishedAt || article.createdAt,
    dateModified:
      article.contentUpdatedAt ||
      article.updatedAt ||
      article.publishedAt ||
      article.createdAt,
    author: {
      "@type": "Person",
      name: article.authorName || article.author?.name || "Tivan",
      url: article.authorSlug
        ? `${siteUrl}/authors/${article.authorSlug}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "Tivan",
      url: siteUrl,
    },
  };

  if (imageUrl) {
    jsonLd.image = [imageUrl];
  }

  if (article.category?.title) {
    jsonLd.articleSection = article.category.title;
  }

  if (Array.isArray(article.tags) && article.tags.length > 0) {
    jsonLd.keywords = article.tags.join(", ");
  }

  if (article.wordCount) {
    jsonLd.wordCount = Number(article.wordCount);
  }

  if (article.coverCaption) {
    jsonLd.caption = article.coverCaption;
  }

  return jsonLd;
}

function buildFaqJsonLd(faqs = []) {
  const validFaqs = Array.isArray(faqs)
    ? faqs.filter((faq) => faq?.question && faq?.answer)
    : [];

  if (validFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  await connectToDB();

  const article = await ArticleModel.findOne({
    slug,
    status: "published",
  })
    .select(
      [
        "title",
        "slug",
        "excerpt",

        "metaTitle",
        "metaDescription",
        "focusKeyword",
        "secondaryKeywords",
        "canonicalUrl",

        "noIndex",
        "noFollow",
        "noArchive",
        "noSnippet",
        "maxSnippet",
        "maxImagePreview",
        "maxVideoPreview",

        "cover",
        "coverAlt",

        "ogTitle",
        "ogDescription",
        "ogImage",
        "ogImageAlt",
        "ogType",

        "twitterTitle",
        "twitterDescription",
        "twitterImage",
        "twitterImageAlt",
        "twitterCard",

        "publishedAt",
        "contentUpdatedAt",
        "updatedAt",
        "language",
      ].join(" ")
    )
    .lean();

  if (!article) {
    return {
      title: "مقاله یافت نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt || "";

  const ogTitle = article.ogTitle || title;
  const ogDescription = article.ogDescription || description;
  const ogImage = getAbsoluteUrl(article.ogImage || article.cover);

  const twitterTitle = article.twitterTitle || ogTitle;
  const twitterDescription = article.twitterDescription || ogDescription;
  const twitterImage = getAbsoluteUrl(
    article.twitterImage || article.ogImage || article.cover
  );

  const maxSnippet = article.noSnippet
    ? 0
    : article.maxSnippet === 0 || article.maxSnippet
      ? Number(article.maxSnippet)
      : -1;

  return {
    title,
    description,

    keywords: [
      article.focusKeyword,
      ...(Array.isArray(article.secondaryKeywords)
        ? article.secondaryKeywords
        : []),
    ].filter(Boolean),

    alternates: {
      canonical: article.canonicalUrl || articleUrl,
    },

    robots: {
      index: !article.noIndex,
      follow: !article.noFollow,
      nocache: Boolean(article.noArchive),
      googleBot: {
        index: !article.noIndex,
        follow: !article.noFollow,
        nocache: Boolean(article.noArchive),
        "max-snippet": maxSnippet,
        "max-image-preview": article.maxImagePreview || "large",
        "max-video-preview":
          article.maxVideoPreview === 0 || article.maxVideoPreview
            ? Number(article.maxVideoPreview)
            : -1,
      },
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: articleUrl,
      siteName: "Tivan",
      type: article.ogType || "article",
      locale: article.language === "en" ? "en_US" : "fa_IR",
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      modifiedTime:
        article.contentUpdatedAt || article.updatedAt
          ? new Date(article.contentUpdatedAt || article.updatedAt).toISOString()
          : undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: article.ogImageAlt || article.coverAlt || article.title,
            },
          ]
        : [],
    },

    twitter: {
      card: article.twitterCard || "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : [],
    },
  };
}

const ArticlePage = async ({ params }) => {
  const { slug } = await params;

  await connectToDB();

  const article = await ArticleModel.findOne({
    slug,
    status: "published",
  })
    .populate("category", "title slug")
    .populate("relatedArticles", "title slug cover coverAlt excerpt publishedAt readingTime")
    .populate("pillarArticle", "title slug cover coverAlt excerpt")
    .lean();

  if (!article) notFound();

  const latestArticles = await ArticleModel.find({
    _id: { $ne: article._id },
    status: "published",
  })
    .select("title slug cover coverAlt publishedAt readingTime excerpt")
    .sort({ publishedAt: -1 })
    .limit(4)
    .lean();

  const articleJsonLd = buildArticleJsonLd(article);
  const faqJsonLd = buildFaqJsonLd(article.faqs);

  const serializedArticle = serializeMongoDoc(article);
  const serializedLatestArticles = serializeMongoDoc(latestArticles);

  return (
    <div className="min-h-screen font-yekan-bakh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(articleJsonLd),
        }}
      />

      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(faqJsonLd),
          }}
        />
      ) : null}

      <Shape />

      <Navbar />

      <main className="py-10">
        <ArticleHeader
          article={serializedArticle}
          articles={serializedLatestArticles}
        />
      </main>

      <Footer />

      <ViewTracker
        targetType="ARTICLE"
        targetId={article._id.toString()}
        path={`/articles/${article.slug}`}
        title={article.title}
      />
    </div>
  );
};

export default ArticlePage;
