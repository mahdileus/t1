"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

import ArticleBasicInfoCard from "./ArticleBasicInfoCard";
import ArticleContentCard from "./ArticleContentCard";
import ArticleCoverCard from "./ArticleCoverCard";
import ArticleMetaCard from "./ArticleMetaCard";
import ArticleSeoCard from "./ArticleSeoCard";
import ArticlePublishCard from "./ArticlePublishCard";

function pad(value) {
  return String(value).padStart(2, "0");
}

function toDatetimeLocal(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function stringifyJson(value, fallback = "") {
  if (!value) return fallback;

  if (typeof value === "string") return value;

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return fallback;
  }
}

function normalizeObjectIdValue(value) {
  if (!value) return "";

  if (typeof value === "object") {
    return value?._id || "";
  }

  return value;
}

function normalizeObjectIdArray(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item) return "";

      if (typeof item === "object") {
        return item?._id || "";
      }

      return item;
    })
    .filter(Boolean);
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeInitialData(article) {
  const noIndex = Boolean(article?.noIndex);

  const isFeatured =
    typeof article?.isFeatured === "boolean"
      ? article.isFeatured
      : Boolean(article?.featured);

  return {
    // Basic
    title: article?.title || "",
    slug: article?.slug || "",
    category: normalizeObjectIdValue(article?.category),
    tags: normalizeStringArray(article?.tags),

    // Author
    author: normalizeObjectIdValue(article?.author),
    authorName: article?.authorName || article?.author?.name || "",
    authorSlug: article?.authorSlug || article?.author?.slug || "",

    // Content
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    contentType: article?.contentType || "html",
    readingTime: article?.readingTime ?? "",
    wordCount: article?.wordCount ?? "",

    // Cover
    cover: article?.cover || "",
    coverAlt: article?.coverAlt || "",
    coverTitle: article?.coverTitle || "",
    coverCaption: article?.coverCaption || "",
    coverWidth: article?.coverWidth ?? "",
    coverHeight: article?.coverHeight ?? "",

    // Publish / Meta
    status: article?.status || "draft",

    // Main canonical field
    isFeatured,

    // Alias for components that use featured
    featured: isFeatured,

    publishedAt: toDatetimeLocal(article?.publishedAt),
    scheduledAt: toDatetimeLocal(article?.scheduledAt),
    contentUpdatedAt: toDatetimeLocal(article?.contentUpdatedAt),
    lastReviewedAt: toDatetimeLocal(article?.lastReviewedAt),

    visibility: article?.visibility || "public",

    // Optional display flags
    showToc:
      typeof article?.showToc === "boolean" ? article.showToc : true,
    showAuthorBox:
      typeof article?.showAuthorBox === "boolean"
        ? article.showAuthorBox
        : true,
    allowComments:
      typeof article?.allowComments === "boolean"
        ? article.allowComments
        : true,

    // Counters
    viewCount: article?.viewCount ?? 0,
    commentCount: article?.commentCount ?? 0,

    // SEO Basic
    metaTitle: article?.metaTitle || "",
    metaDescription: article?.metaDescription || "",
    focusKeyword: article?.focusKeyword || "",
    secondaryKeywords: normalizeStringArray(article?.secondaryKeywords),
    searchIntent: article?.searchIntent || "",
    canonicalUrl: article?.canonicalUrl || "",

    // Robots
    noIndex,
    noFollow: Boolean(article?.noFollow),
    noArchive: Boolean(article?.noArchive),
    noSnippet: Boolean(article?.noSnippet),

    // Alias for summary components
    robotsIndex: !noIndex,

    maxSnippet:
      article?.maxSnippet === 0 || article?.maxSnippet
        ? article.maxSnippet
        : -1,
    maxImagePreview: article?.maxImagePreview || "large",
    maxVideoPreview:
      article?.maxVideoPreview === 0 || article?.maxVideoPreview
        ? article.maxVideoPreview
        : -1,

    // Open Graph
    ogTitle: article?.ogTitle || "",
    ogDescription: article?.ogDescription || "",
    ogImage: article?.ogImage || "",
    ogImageAlt: article?.ogImageAlt || "",
    ogType: article?.ogType || "article",

    // Twitter
    twitterTitle: article?.twitterTitle || "",
    twitterDescription: article?.twitterDescription || "",
    twitterImage: article?.twitterImage || "",
    twitterImageAlt: article?.twitterImageAlt || "",
    twitterCard: article?.twitterCard || "summary_large_image",

    // Sitemap
    includeInSitemap:
      typeof article?.includeInSitemap === "boolean"
        ? article.includeInSitemap
        : true,
    sitemapPriority:
      article?.sitemapPriority === 0 || article?.sitemapPriority
        ? article.sitemapPriority
        : 0.7,
    sitemapChangefreq: article?.sitemapChangefreq || "weekly",

    // Schema
    schemaType: article?.schemaType || "BlogPosting",
    seoSchema: stringifyJson(article?.seoSchema, "{}"),

    // FAQ
    faqs: Array.isArray(article?.faqs) ? article.faqs : [],

    // Topic cluster
    relatedArticles: normalizeObjectIdArray(article?.relatedArticles),
    pillarArticle: normalizeObjectIdValue(article?.pillarArticle),
    topicCluster: article?.topicCluster || "",

    // Content metrics
    headingCount: article?.headingCount ?? 0,
    imageCount: article?.imageCount ?? 0,
    internalLinkCount: article?.internalLinkCount ?? 0,
    externalLinkCount: article?.externalLinkCount ?? 0,
    seoScore: article?.seoScore ?? 0,
    readabilityScore: article?.readabilityScore ?? 0,

    // Locale
    language: article?.language || "fa",
    alternateUrls: Array.isArray(article?.alternateUrls)
      ? article.alternateUrls
      : [],
  };
}

function normalizeSeoSchemaForSubmit(value) {
  if (!value || !String(value).trim()) {
    return {};
  }

  if (typeof value === "object") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function appendValue(body, key, value) {
  if (value === null || value === undefined) {
    body.append(key, "");
    return;
  }

  body.append(key, String(value));
}

function appendJson(body, key, value, fallback = []) {
  body.append(key, JSON.stringify(value ?? fallback));
}

export default function ArticleForm({
  mode = "create",
  article = null,
  categories = [],
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState(() => normalizeInitialData(article));

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(article?.cover || "");

  const [ogImageFile, setOgImageFile] = useState(null);
  const [twitterImageFile, setTwitterImageFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageTitle = useMemo(() => {
    return formData.title?.trim() || "بدون عنوان";
  }, [formData.title]);

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      // Keep isFeatured and featured synced.
      if (field === "isFeatured") {
        next.featured = Boolean(value);
      }

      if (field === "featured") {
        next.isFeatured = Boolean(value);
      }

      // Keep noIndex and robotsIndex synced.
      if (field === "noIndex") {
        next.robotsIndex = !Boolean(value);
      }

      if (field === "robotsIndex") {
        next.noIndex = !Boolean(value);
      }

      return next;
    });
  };

  const validateForm = () => {
    const title = formData.title.trim();
    const authorName = formData.authorName.trim();
    const excerpt = formData.excerpt.trim();
    const content = formData.content.trim();
    const coverAlt = formData.coverAlt.trim();

    if (!title) {
      swal({
        title: "عنوان مقاله الزامی است",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (title.length > 200) {
      swal({
        title: "عنوان مقاله نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (!authorName) {
      swal({
        title: "نام نویسنده الزامی است",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (!formData.category) {
      swal({
        title: "دسته‌بندی مقاله را انتخاب کنید",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (!excerpt) {
      swal({
        title: "خلاصه مقاله الزامی است",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (excerpt.length > 500) {
      swal({
        title: "خلاصه مقاله نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (!content) {
      swal({
        title: "محتوای مقاله الزامی است",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (!coverAlt) {
      swal({
        title: "متن جایگزین تصویر شاخص الزامی است",
        text: "برای سئو و دسترسی‌پذیری، alt تصویر شاخص را وارد کنید.",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (formData.metaTitle && formData.metaTitle.trim().length > 70) {
      swal({
        title: "عنوان متای سئو نمی‌تواند بیشتر از ۷۰ کاراکتر باشد",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (
      formData.metaDescription &&
      formData.metaDescription.trim().length > 180
    ) {
      swal({
        title: "توضیحات متای سئو نمی‌تواند بیشتر از ۱۸۰ کاراکتر باشد",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (formData.status === "scheduled" && !formData.scheduledAt) {
      swal({
        title: "برای انتشار زمان‌بندی‌شده، تاریخ انتشار را وارد کنید",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    if (
      formData.sitemapPriority !== "" &&
      (Number(formData.sitemapPriority) < 0 ||
        Number(formData.sitemapPriority) > 1)
    ) {
      swal({
        title: "اولویت سایت‌مپ باید بین ۰ تا ۱ باشد",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    const parsedSeoSchema = normalizeSeoSchemaForSubmit(formData.seoSchema);

    if (parsedSeoSchema === null) {
      swal({
        title: "ساختار JSON اسکیمای سئو نامعتبر است",
        text: "لطفاً مقدار seoSchema را به صورت JSON معتبر وارد کنید.",
        icon: "warning",
        buttons: "باشه",
      });
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isEdit && !article?._id) {
      swal({
        title: "شناسه مقاله برای ویرایش معتبر نیست",
        icon: "error",
        buttons: "باشه",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new FormData();

      const parsedSeoSchema = normalizeSeoSchemaForSubmit(formData.seoSchema);

      if (parsedSeoSchema === null) {
        swal({
          title: "ساختار JSON اسکیمای سئو نامعتبر است",
          icon: "warning",
          buttons: "باشه",
        });
        setIsSubmitting(false);
        return;
      }

      // Basic
      appendValue(body, "title", formData.title);
      appendValue(body, "slug", formData.slug);
      appendValue(body, "category", formData.category);
      appendJson(body, "tags", formData.tags);

      // Author
      appendValue(body, "author", formData.author);
      appendValue(body, "authorName", formData.authorName);
      appendValue(body, "authorSlug", formData.authorSlug);

      // Content
      appendValue(body, "excerpt", formData.excerpt);
      appendValue(body, "content", formData.content);
      appendValue(body, "contentType", formData.contentType);
      appendValue(body, "readingTime", formData.readingTime);
      appendValue(body, "wordCount", formData.wordCount);

      // Cover
      appendValue(body, "coverAlt", formData.coverAlt);
      appendValue(body, "coverTitle", formData.coverTitle);
      appendValue(body, "coverCaption", formData.coverCaption);
      appendValue(body, "coverWidth", formData.coverWidth);
      appendValue(body, "coverHeight", formData.coverHeight);

      if (coverFile) {
        body.append("cover", coverFile);
      }

      // Publish / Meta
      appendValue(body, "status", formData.status);
      appendValue(body, "isFeatured", formData.isFeatured);
      appendValue(body, "featured", formData.isFeatured);
      appendValue(body, "publishedAt", formData.publishedAt);
      appendValue(body, "scheduledAt", formData.scheduledAt);
      appendValue(body, "contentUpdatedAt", formData.contentUpdatedAt);
      appendValue(body, "lastReviewedAt", formData.lastReviewedAt);
      appendValue(body, "visibility", formData.visibility);
      appendValue(body, "showToc", formData.showToc);
      appendValue(body, "showAuthorBox", formData.showAuthorBox);
      appendValue(body, "allowComments", formData.allowComments);

      // Counters
      appendValue(body, "viewCount", formData.viewCount);
      appendValue(body, "commentCount", formData.commentCount);

      // SEO Basic
      appendValue(body, "metaTitle", formData.metaTitle);
      appendValue(body, "metaDescription", formData.metaDescription);
      appendValue(body, "focusKeyword", formData.focusKeyword);
      appendJson(body, "secondaryKeywords", formData.secondaryKeywords);
      appendValue(body, "searchIntent", formData.searchIntent);
      appendValue(body, "canonicalUrl", formData.canonicalUrl);

      // Robots
      appendValue(body, "noIndex", formData.noIndex);
      appendValue(body, "noFollow", formData.noFollow);
      appendValue(body, "noArchive", formData.noArchive);
      appendValue(body, "noSnippet", formData.noSnippet);
      appendValue(body, "maxSnippet", formData.maxSnippet);
      appendValue(body, "maxImagePreview", formData.maxImagePreview);
      appendValue(body, "maxVideoPreview", formData.maxVideoPreview);

      // Open Graph
      appendValue(body, "ogTitle", formData.ogTitle);
      appendValue(body, "ogDescription", formData.ogDescription);
      appendValue(body, "ogImage", formData.ogImage);
      appendValue(body, "ogImageAlt", formData.ogImageAlt);
      appendValue(body, "ogType", formData.ogType);

      if (ogImageFile) {
        body.append("ogImageFile", ogImageFile);
      }

      // Twitter
      appendValue(body, "twitterTitle", formData.twitterTitle);
      appendValue(body, "twitterDescription", formData.twitterDescription);
      appendValue(body, "twitterImage", formData.twitterImage);
      appendValue(body, "twitterImageAlt", formData.twitterImageAlt);
      appendValue(body, "twitterCard", formData.twitterCard);

      if (twitterImageFile) {
        body.append("twitterImageFile", twitterImageFile);
      }

      // Sitemap
      appendValue(body, "includeInSitemap", formData.includeInSitemap);
      appendValue(body, "sitemapPriority", formData.sitemapPriority);
      appendValue(body, "sitemapChangefreq", formData.sitemapChangefreq);

      // Schema
      appendValue(body, "schemaType", formData.schemaType);
      body.append("seoSchema", JSON.stringify(parsedSeoSchema || {}));

      // FAQ
      appendJson(body, "faqs", formData.faqs);

      // Topic cluster
      appendJson(body, "relatedArticles", formData.relatedArticles);
      appendValue(body, "pillarArticle", formData.pillarArticle);
      appendValue(body, "topicCluster", formData.topicCluster);

      // Content metrics
      appendValue(body, "headingCount", formData.headingCount);
      appendValue(body, "imageCount", formData.imageCount);
      appendValue(body, "internalLinkCount", formData.internalLinkCount);
      appendValue(body, "externalLinkCount", formData.externalLinkCount);
      appendValue(body, "seoScore", formData.seoScore);
      appendValue(body, "readabilityScore", formData.readabilityScore);

      // Locale
      appendValue(body, "language", formData.language);
      appendJson(body, "alternateUrls", formData.alternateUrls);

      const url = isEdit
        ? `/api/admin/articles/${article._id}`
        : "/api/admin/articles";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body,
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        swal({
          title: data?.message || "خطا در ثبت مقاله",
          text: Array.isArray(data?.errors) ? data.errors.join("\n") : "",
          icon: "error",
          buttons: "باشه",
        });
        return;
      }

      await swal({
        title: isEdit
          ? "مقاله با موفقیت بروزرسانی شد"
          : "مقاله با موفقیت ایجاد شد",
        icon: "success",
        buttons: "باشه",
      });

      router.push("/p-admin/articles");
      router.refresh();
    } catch (error) {
      console.error("Article submit error:", error);

      swal({
        title: "خطای سرور",
        text: "در ثبت مقاله مشکلی رخ داد",
        icon: "error",
        buttons: "باشه",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="grid grid-cols-1 gap-6 xl:grid-cols-12"
    >
      <div className="space-y-6 xl:col-span-8">
        <ArticleBasicInfoCard
          formData={formData}
          categories={categories}
          onChange={updateField}
        />

        <ArticleContentCard formData={formData} onChange={updateField} />

        <ArticleSeoCard
          formData={formData}
          onChange={updateField}
          setOgImageFile={setOgImageFile}
          setTwitterImageFile={setTwitterImageFile}
        />
      </div>

      <div className="space-y-6 xl:col-span-4">
        <ArticleCoverCard
          formData={formData}
          onChange={updateField}
          coverPreview={coverPreview}
          setCoverPreview={setCoverPreview}
          setCoverFile={setCoverFile}
          currentImage={article?.cover || ""}
        />

        <ArticleMetaCard formData={formData} onChange={updateField} />

        <ArticlePublishCard
          pageTitle={pageTitle}
          formData={formData}
          isSubmitting={isSubmitting}
          isEdit={isEdit}
        />
      </div>
    </form>
  );
}
