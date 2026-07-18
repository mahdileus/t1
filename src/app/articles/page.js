export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ArticleCategoryModel from "@/models/ArticleCategory";
import ArticlesArchivePage from "../components/trmplate/article/ArticlesArchivePage";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";

const ARTICLES_PER_PAGE = 9;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir";

function normalizeSiteUrl(url = "") {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function getBaseUrl() {
  return normalizeSiteUrl(SITE_URL);
}

function cleanParam(value) {
  if (!value || typeof value !== "string") return "";
  return value.trim();
}

function getPageNumber(value) {
  const page = Number(value);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
}

function getSortOption(sort) {
  if (sort === "oldest") {
    return { publishedAt: 1, createdAt: 1 };
  }

  if (sort === "reading-asc") {
    return { readingTime: 1, publishedAt: -1, createdAt: -1 };
  }

  if (sort === "reading-desc") {
    return { readingTime: -1, publishedAt: -1, createdAt: -1 };
  }

  return { publishedAt: -1, createdAt: -1 };
}

function hasArchiveFilters({ search, category, tag, sort, page }) {
  return Boolean(
    search ||
      category ||
      tag ||
      sort !== "newest" ||
      Number(page) > 1
  );
}

function buildArchiveTitle({ search, categoryDoc, tag, page }) {
  if (search) {
    return `جستجوی "${search}" در مقالات`;
  }

  if (categoryDoc?.title) {
    return `مقالات ${categoryDoc.title}`;
  }

  if (tag) {
    return `مقالات با برچسب ${tag}`;
  }

  if (page > 1) {
    return `آرشیو مقالات - صفحه ${page}`;
  }

  return "آرشیو مقالات";
}

function buildArchiveDescription({ search, categoryDoc, tag }) {
  if (search) {
    return `نتایج جستجو برای "${search}" در آرشیو مقالات، آموزش‌ها و مطالب وبلاگ.`;
  }

  if (categoryDoc?.title) {
    return `جدیدترین مقالات، آموزش‌ها و مطالب منتشرشده در دسته ${categoryDoc.title}.`;
  }

  if (tag) {
    return `مقالات و آموزش‌های مرتبط با برچسب ${tag} را در این صفحه بخوانید.`;
  }

  return "همه مقالات، آموزش‌ها و مطالب وبلاگ را در آرشیو مقالات بخوانید.";
}

async function getArchiveContext(searchParams) {
  const params = await searchParams;

  const page = getPageNumber(params?.page);
  const search = cleanParam(params?.search);
  const category = cleanParam(params?.category);
  const tag = cleanParam(params?.tag);
  const sort = cleanParam(params?.sort) || "newest";

  let categoryDoc = null;

  if (category) {
    await connectToDB();

    categoryDoc = await ArticleCategoryModel.findOne({
      slug: category,
      isActive: true,
    })
      .select("_id title slug")
      .lean();
  }

  return {
    page,
    search,
    category,
    tag,
    sort,
    categoryDoc,
  };
}

export async function generateMetadata({ searchParams }) {
  const context = await getArchiveContext(searchParams);

  const { page, search, category, tag, sort, categoryDoc } = context;

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/articles`;

  const isFiltered = hasArchiveFilters({
    search,
    category,
    tag,
    sort,
    page,
  });

  const title = buildArchiveTitle({
    search,
    categoryDoc,
    tag,
    page,
  });

  const description = buildArchiveDescription({
    search,
    categoryDoc,
    tag,
  });

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: !isFiltered,
      follow: true,
      nocache: false,
      googleBot: {
        index: !isFiltered,
        follow: true,
        noimageindex: false,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "fa_IR",
      siteName: "Tivan",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function buildArticleFilter({ search, tag, categoryDoc, category }) {
  const filter = {
    status: "published",

    // اگر این فیلدها در مدل Article وجود دارند، بهتر است فعال باشند.
    // اگر بعضی از آن‌ها در مدل نیستند، می‌توانی حذفشان کنی.
    visibility: { $in: ["public", undefined, null] },
    noIndex: { $ne: true },
  };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  if (tag) {
    filter.tags = { $in: [tag] };
  }

  if (category) {
    if (categoryDoc?._id) {
      filter.category = categoryDoc._id;
    } else {
      filter.category = null;
    }
  }

  return filter;
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function buildBreadcrumbSchema(baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مقالات",
        item: `${baseUrl}/articles`,
      },
    ],
  };
}

function buildCollectionSchema({ baseUrl, articles }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "آرشیو مقالات",
    description: "آرشیو مقالات، آموزش‌ها و مطالب وبلاگ.",
    url: `${baseUrl}/articles`,
    inLanguage: "fa-IR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };
}

export default async function ArticlesPage({ searchParams }) {
  await connectToDB();

  const context = await getArchiveContext(searchParams);

  const {
    page,
    search,
    category,
    tag,
    sort,
    categoryDoc,
  } = context;

  const filter = buildArticleFilter({
    search,
    tag,
    categoryDoc,
    category,
  });

  const sortOption = getSortOption(sort);

  const total = await ArticleModel.countDocuments(filter);
  const pages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));

  if (page > pages && total > 0) {
    notFound();
  }

  const skip = (page - 1) * ARTICLES_PER_PAGE;

  const [articles, categories] = await Promise.all([
    ArticleModel.find(filter)
      .select(
        [
          "title",
          "slug",
          "excerpt",
          "cover",
          "coverAlt",
          "authorName",
          "authorSlug",
          "readingTime",
          "publishedAt",
          "createdAt",
          "contentUpdatedAt",
          "tags",
          "category",
        ].join(" ")
      )
      .populate({
        path: "category",
        select: "title slug",
      })
      .sort(sortOption)
      .skip(skip)
      .limit(ARTICLES_PER_PAGE)
      .lean(),

    ArticleCategoryModel.find({ isActive: true })
      .select("title slug parent")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  const serializedArticles = JSON.parse(JSON.stringify(articles));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  const baseUrl = getBaseUrl();

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl);

  const collectionSchema = buildCollectionSchema({
    baseUrl,
    articles: serializedArticles,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />

      <Shape />

      <Navbar />

      <ArticlesArchivePage
        articles={serializedArticles}
        categories={serializedCategories}
        total={total}
        page={page}
        pages={pages}
        activeFilters={{
          search,
          category,
          tag,
          sort,
        }}
      />
    </>
  );
}
