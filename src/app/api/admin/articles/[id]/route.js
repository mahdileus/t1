import { NextResponse } from "next/server";
import mongoose, { isValidObjectId } from "mongoose";

import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";
import { authAdmin } from "@/app/utils/auth-server";
import { uploadImage } from "@/app/utils/uploadFile";

export const dynamic = "force-dynamic";

function successResponse(payload = {}, status = 200) {
  return NextResponse.json(payload, { status });
}

function errorResponse(message, status = 500, extra = {}) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...extra,
    },
    { status }
  );
}

async function requireAdmin() {
  const admin = await authAdmin();
  return admin || null;
}

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizeLowerString(value) {
  return normalizeString(value).toLowerCase();
}

function normalizeSlug(value, fallback = "") {
  const source = normalizeString(value || fallback);

  return source
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/[^\p{L}\p{N}\-_]+/gu, "")
    .replace(/^-+|-+$/g, "");
}

function safeJsonParse(value, fallback) {
  try {
    if (value === null || value === undefined || value === "") return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeStringArray(input) {
  if (!Array.isArray(input)) return [];

  return [
    ...new Set(
      input
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    ),
  ];
}

function normalizeObjectIdArray(input) {
  if (!Array.isArray(input)) return [];

  return [
    ...new Set(
      input
        .map((item) => String(item || "").trim())
        .filter((item) => mongoose.Types.ObjectId.isValid(item))
    ),
  ];
}

function normalizeBoolean(value, defaultValue = false) {
  if (value === null || value === undefined || value === "") return defaultValue;

  if (typeof value === "boolean") return value;

  const normalized = String(value).toLowerCase().trim();

  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;

  return defaultValue;
}

function normalizeNumber(value, defaultValue = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : defaultValue;
}

function normalizeNullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeDate(value) {
  const raw = normalizeString(value);
  if (!raw) return null;

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFileLike(file) {
  return (
    file &&
    typeof file === "object" &&
    typeof file.size === "number" &&
    typeof file.arrayBuffer === "function"
  );
}

function hasValidFile(file) {
  return isFileLike(file) && file.size > 0;
}

function buildCanonicalUrl(slug) {
  return `/articles/${slug}`;
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateWordCount(content) {
  const text = stripHtml(content);
  if (!text) return 0;

  return text.split(/\s+/).filter(Boolean).length;
}

function calculateReadingTime(content) {
  const words = calculateWordCount(content);
  if (!words) return 1;

  return Math.max(Math.ceil(words / 200), 1);
}

function clampNumber(value, min, max, defaultValue) {
  const number = normalizeNumber(value, defaultValue);
  return Math.min(Math.max(number, min), max);
}

function normalizeStatus(status) {
  const allowed = ["draft", "review", "scheduled", "published", "archived"];
  return allowed.includes(status) ? status : "draft";
}

function normalizeContentType(value) {
  const allowed = ["html", "markdown", "json"];
  return allowed.includes(value) ? value : "html";
}

function normalizeSearchIntent(value) {
  const allowed = ["", "informational", "commercial", "transactional", "navigational"];
  return allowed.includes(value) ? value : "";
}

function normalizeMaxImagePreview(value) {
  const allowed = ["none", "standard", "large"];
  return allowed.includes(value) ? value : "large";
}

function normalizeOgType(value) {
  const allowed = ["article", "website"];
  return allowed.includes(value) ? value : "article";
}

function normalizeTwitterCard(value) {
  const allowed = ["summary", "summary_large_image"];
  return allowed.includes(value) ? value : "summary_large_image";
}

function normalizeSitemapChangefreq(value) {
  const allowed = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
  return allowed.includes(value) ? value : "weekly";
}

function normalizeSchemaType(value) {
  const allowed = ["Article", "BlogPosting", "NewsArticle"];
  return allowed.includes(value) ? value : "BlogPosting";
}

function normalizeFaqs(input) {
  if (!Array.isArray(input)) return [];

  return input
    .map((item, index) => ({
      question: normalizeString(item?.question).slice(0, 300),
      answer: normalizeString(item?.answer),
      isActive: normalizeBoolean(item?.isActive, true),
      order: normalizeNumber(item?.order, index),
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeAlternateUrls(input) {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => ({
      lang: normalizeLowerString(item?.lang),
      url: normalizeString(item?.url),
    }))
    .filter((item) => item.lang && item.url);
}

function normalizeObjectId(value) {
  const id = normalizeString(value);
  return mongoose.Types.ObjectId.isValid(id) ? id : null;
}

function validateLength(value, max, message) {
  if (normalizeString(value).length > max) {
    return message;
  }

  return null;
}

async function uploadOptionalImage(file, folder) {
  if (!hasValidFile(file)) return "";

  const url = await uploadImage(file, folder);
  return url || "";
}

// GET /api/admin/articles/[id]
export async function GET(req, { params }) {
  try {
    await connectToDB();

    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse("شناسه مقاله نامعتبر است", 422);
    }

    const article = await ArticleModel.findById(id)
      .populate("category", "_id title slug")
      .populate("author", "_id name slug avatar")
      .lean();

    if (!article) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    return successResponse({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("GET /api/admin/articles/[id] error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}

// PUT /api/admin/articles/[id]
export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse("شناسه مقاله نامعتبر است", 422);
    }

    const existingArticle = await ArticleModel.findById(id)
      .select(
        "_id slug oldSlugs status publishedAt contentUpdatedAt cover ogImage twitterImage content"
      )
      .lean();

    if (!existingArticle) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    const formData = await req.formData();

    const title = normalizeString(formData.get("title"));
    const rawSlug = normalizeString(formData.get("slug")) || title;
    const slug = normalizeSlug(rawSlug, title);

    const category = normalizeString(formData.get("category"));

    const author = normalizeObjectId(formData.get("author"));
    const authorName = normalizeString(formData.get("authorName"));
    const authorSlug = normalizeSlug(formData.get("authorSlug"), authorName);

    const excerpt = normalizeString(formData.get("excerpt"));
    const content = normalizeString(formData.get("content"));
    const contentType = normalizeContentType(normalizeString(formData.get("contentType")));

    const status = normalizeStatus(normalizeString(formData.get("status")));
    const isFeatured = normalizeBoolean(formData.get("isFeatured"), false);

    const tags = normalizeStringArray(safeJsonParse(formData.get("tags"), []));

    const focusKeyword = normalizeString(formData.get("focusKeyword"));
    const secondaryKeywords = normalizeStringArray(
      safeJsonParse(formData.get("secondaryKeywords"), [])
    );
    const searchIntent = normalizeSearchIntent(
      normalizeString(formData.get("searchIntent"))
    );

    const readingTimeInput = normalizeNumber(formData.get("readingTime"), 0);
    const readingTime =
      readingTimeInput >= 1 ? readingTimeInput : calculateReadingTime(content);

    const wordCountInput = normalizeNumber(formData.get("wordCount"), 0);
    const wordCount = wordCountInput > 0 ? wordCountInput : calculateWordCount(content);

    const viewCountRaw = formData.get("viewCount");
    const viewCount =
      viewCountRaw === null || viewCountRaw === ""
        ? 0
        : normalizeNumber(viewCountRaw, 0);

    const commentCountRaw = formData.get("commentCount");
    const commentCount =
      commentCountRaw === null || commentCountRaw === ""
        ? 0
        : normalizeNumber(commentCountRaw, 0);

    const metaTitle = normalizeString(formData.get("metaTitle")) || title;

    // مهم:
    // metaDescription کاملاً مستقل از excerpt است.
    // اگر در پنل خالی ارسال شود، خالی ذخیره می‌شود.
    const metaDescription = normalizeString(formData.get("metaDescription"));

    const canonicalUrl =
      normalizeString(formData.get("canonicalUrl")) || buildCanonicalUrl(slug);

    const noIndex = normalizeBoolean(formData.get("noIndex"), false);
    const noFollow = normalizeBoolean(formData.get("noFollow"), false);
    const noArchive = normalizeBoolean(formData.get("noArchive"), false);
    const noSnippet = normalizeBoolean(formData.get("noSnippet"), false);

    const maxSnippet = normalizeNumber(formData.get("maxSnippet"), -1);
    const maxImagePreview = normalizeMaxImagePreview(
      normalizeString(formData.get("maxImagePreview"))
    );
    const maxVideoPreview = normalizeNumber(formData.get("maxVideoPreview"), -1);

    const ogTitle = normalizeString(formData.get("ogTitle"));
    const ogDescription = normalizeString(formData.get("ogDescription"));
    const ogImageAlt = normalizeString(formData.get("ogImageAlt"));
    const ogType = normalizeOgType(normalizeString(formData.get("ogType")));

    const twitterTitle = normalizeString(formData.get("twitterTitle"));
    const twitterDescription = normalizeString(formData.get("twitterDescription"));
    const twitterImageAlt = normalizeString(formData.get("twitterImageAlt"));
    const twitterCard = normalizeTwitterCard(
      normalizeString(formData.get("twitterCard"))
    );

    const includeInSitemapRaw = normalizeBoolean(
      formData.get("includeInSitemap"),
      true
    );
    const includeInSitemap = noIndex ? false : includeInSitemapRaw;

    const sitemapPriority = clampNumber(
      formData.get("sitemapPriority"),
      0,
      1,
      0.7
    );

    const sitemapChangefreq = normalizeSitemapChangefreq(
      normalizeString(formData.get("sitemapChangefreq"))
    );

    const schemaType = normalizeSchemaType(normalizeString(formData.get("schemaType")));
    const seoSchema = safeJsonParse(formData.get("seoSchema"), {});

    const faqs = normalizeFaqs(safeJsonParse(formData.get("faqs"), []));
    const alternateUrls = normalizeAlternateUrls(
      safeJsonParse(formData.get("alternateUrls"), [])
    );

    const relatedArticles = normalizeObjectIdArray(
      safeJsonParse(formData.get("relatedArticles"), [])
    );
    const pillarArticle = normalizeObjectId(formData.get("pillarArticle"));

    const topicCluster = normalizeString(formData.get("topicCluster"));
    const language = normalizeLowerString(formData.get("language")) || "fa";

    const headingCount = Math.max(normalizeNumber(formData.get("headingCount"), 0), 0);
    const imageCount = Math.max(normalizeNumber(formData.get("imageCount"), 0), 0);
    const internalLinkCount = Math.max(
      normalizeNumber(formData.get("internalLinkCount"), 0),
      0
    );
    const externalLinkCount = Math.max(
      normalizeNumber(formData.get("externalLinkCount"), 0),
      0
    );

    const seoScore = clampNumber(formData.get("seoScore"), 0, 100, 0);
    const readabilityScore = clampNumber(
      formData.get("readabilityScore"),
      0,
      100,
      0
    );

    const scheduledAt = normalizeDate(formData.get("scheduledAt"));
    const manualContentUpdatedAt = normalizeDate(formData.get("contentUpdatedAt"));
    const lastReviewedAt = normalizeDate(formData.get("lastReviewedAt"));

    const coverAlt = normalizeString(formData.get("coverAlt"));
    const coverTitle = normalizeString(formData.get("coverTitle"));
    const coverCaption = normalizeString(formData.get("coverCaption"));
    const coverWidth = normalizeNullableNumber(formData.get("coverWidth"));
    const coverHeight = normalizeNullableNumber(formData.get("coverHeight"));

    if (!title) {
      return errorResponse("عنوان مقاله الزامی است", 400);
    }

    if (title.length > 200) {
      return errorResponse("عنوان مقاله نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد", 400);
    }

    if (!slug) {
      return errorResponse("اسلاگ معتبر نیست", 400);
    }

    if (!category) {
      return errorResponse("دسته‌بندی مقاله الزامی است", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return errorResponse("شناسه دسته‌بندی نامعتبر است", 400);
    }

    const categoryDoc = await ArticleCategory.findById(category)
      .select("_id title slug isActive")
      .lean();

    if (!categoryDoc) {
      return errorResponse("دسته‌بندی انتخاب‌شده پیدا نشد", 404);
    }

    if (categoryDoc.isActive === false) {
      return errorResponse("دسته‌بندی انتخاب‌شده غیرفعال است", 400);
    }

    if (!authorName) {
      return errorResponse("نام نویسنده الزامی است", 400);
    }

    if (authorName.length > 120) {
      return errorResponse("نام نویسنده نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد", 400);
    }

    if (!excerpt) {
      return errorResponse("خلاصه مقاله الزامی است", 400);
    }

    if (excerpt.length > 500) {
      return errorResponse("خلاصه مقاله نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد", 400);
    }

    if (!content) {
      return errorResponse("محتوای مقاله الزامی است", 400);
    }

    if (!Number.isFinite(readingTime) || readingTime < 1) {
      return errorResponse("زمان مطالعه نامعتبر است", 400);
    }

    if (!Number.isFinite(viewCount) || viewCount < 0) {
      return errorResponse("تعداد بازدید نامعتبر است", 400);
    }

    if (!Number.isFinite(commentCount) || commentCount < 0) {
      return errorResponse("تعداد دیدگاه نامعتبر است", 400);
    }

    if (!coverAlt) {
      return errorResponse("متن جایگزین تصویر شاخص الزامی است", 400);
    }

    const lengthError =
      validateLength(coverAlt, 200, "متن جایگزین تصویر شاخص نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد") ||
      validateLength(coverTitle, 200, "عنوان تصویر شاخص نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد") ||
      validateLength(coverCaption, 300, "کپشن تصویر شاخص نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد") ||
      validateLength(metaTitle, 70, "عنوان متای سئو نمی‌تواند بیشتر از ۷۰ کاراکتر باشد") ||
      validateLength(metaDescription, 180, "توضیحات متای سئو نمی‌تواند بیشتر از ۱۸۰ کاراکتر باشد") ||
      validateLength(focusKeyword, 120, "کلمه کلیدی اصلی نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد") ||
      validateLength(ogTitle, 100, "عنوان Open Graph نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد") ||
      validateLength(ogDescription, 220, "توضیحات Open Graph نمی‌تواند بیشتر از ۲۲۰ کاراکتر باشد") ||
      validateLength(ogImageAlt, 200, "متن جایگزین تصویر Open Graph نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد") ||
      validateLength(twitterTitle, 100, "عنوان Twitter نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد") ||
      validateLength(twitterDescription, 220, "توضیحات Twitter نمی‌تواند بیشتر از ۲۲۰ کاراکتر باشد") ||
      validateLength(twitterImageAlt, 200, "متن جایگزین تصویر Twitter نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد");

    if (lengthError) {
      return errorResponse(lengthError, 400);
    }

    if (!isPlainObject(seoSchema)) {
      return errorResponse("ساختار seoSchema نامعتبر است", 400);
    }

    if (status === "scheduled" && !scheduledAt) {
      return errorResponse("برای وضعیت زمان‌بندی‌شده، تاریخ scheduledAt الزامی است", 400);
    }

    const duplicateSlug = await ArticleModel.findOne({
      slug,
      _id: { $ne: id },
    })
      .select("_id")
      .lean();

    if (duplicateSlug) {
      return errorResponse("اسلاگ تکراری است", 409);
    }

    let coverUrl = existingArticle.cover;

    const coverFile = formData.get("cover");

    if (hasValidFile(coverFile)) {
      const uploadedCover = await uploadImage(coverFile, "uploads/articles");

      if (!uploadedCover) {
        return errorResponse("آپلود تصویر شاخص با خطا مواجه شد", 500);
      }

      coverUrl = uploadedCover;
    }

    const ogImageFile = formData.get("ogImageFile");
    const twitterImageFile = formData.get("twitterImageFile");

    const uploadedOgImage = await uploadOptionalImage(
      ogImageFile,
      "uploads/articles/og"
    );

    const uploadedTwitterImage = await uploadOptionalImage(
      twitterImageFile,
      "uploads/articles/twitter"
    );

    const ogImage =
      uploadedOgImage ||
      normalizeString(formData.get("ogImage")) ||
      existingArticle.ogImage ||
      "";

    const twitterImage =
      uploadedTwitterImage ||
      normalizeString(formData.get("twitterImage")) ||
      existingArticle.twitterImage ||
      "";

    let publishedAt = existingArticle.publishedAt || null;

    if (status === "published" && !existingArticle.publishedAt) {
      publishedAt = new Date();
    }

    if (status !== "published") {
      publishedAt = null;
    }

    const contentChanged = normalizeString(existingArticle.content) !== content;

    let contentUpdatedAt =
      manualContentUpdatedAt || existingArticle.contentUpdatedAt || null;

    if (status === "published" && contentChanged) {
      contentUpdatedAt = manualContentUpdatedAt || new Date();
    }

    if (status === "published" && !contentUpdatedAt) {
      contentUpdatedAt = publishedAt || new Date();
    }

    const updatePayload = {
      title,
      slug,

      excerpt,
      content,
      contentType,

      cover: coverUrl,
      coverAlt,
      coverTitle,
      coverCaption,
      coverWidth,
      coverHeight,

      category,

      tags,

      author,
      authorName,
      authorSlug,

      readingTime,
      wordCount,

      viewCount,
      commentCount,

      status,
      isFeatured,

      publishedAt,
      scheduledAt: status === "scheduled" ? scheduledAt : null,
      contentUpdatedAt,
      lastReviewedAt,

      metaTitle,
      metaDescription,

      focusKeyword,
      secondaryKeywords,
      searchIntent,

      canonicalUrl,

      noIndex,
      noFollow,
      noArchive,
      noSnippet,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,

      ogTitle,
      ogDescription,
      ogImage,
      ogImageAlt,
      ogType,

      twitterTitle,
      twitterDescription,
      twitterImage,
      twitterImageAlt,
      twitterCard,

      includeInSitemap,
      sitemapPriority,
      sitemapChangefreq,

      schemaType,
      seoSchema,

      faqs,

      relatedArticles,
      pillarArticle,
      topicCluster,

      headingCount,
      imageCount,
      internalLinkCount,
      externalLinkCount,
      seoScore,
      readabilityScore,

      language,
      alternateUrls,
    };

    const updateQuery = {
      $set: updatePayload,
    };

    if (existingArticle.slug && existingArticle.slug !== slug) {
      const oldSlugs = Array.isArray(existingArticle.oldSlugs)
        ? existingArticle.oldSlugs
        : [];

      const alreadyExists = oldSlugs.some((item) => item?.slug === existingArticle.slug);

      if (!alreadyExists) {
        updateQuery.$push = {
          oldSlugs: {
            slug: existingArticle.slug,
            changedAt: new Date(),
          },
        };
      }
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
      runValidators: true,
    })
      .populate("category", "_id title slug")
      .populate("author", "_id name slug avatar");

    return successResponse({
      success: true,
      message: "مقاله با موفقیت بروزرسانی شد",
      data: updatedArticle,
    });
  } catch (error) {
    console.error("PUT /api/admin/articles/[id] error:", error);

    if (
      error?.message === "فرمت تصویر مجاز نیست" ||
      error?.message === "حجم تصویر نباید بیشتر از ۵ مگابایت باشد"
    ) {
      return errorResponse(error.message, 400);
    }

    if (error?.code === 11000) {
      if (error?.keyPattern?.slug) {
        return errorResponse("اسلاگ تکراری است", 409);
      }

      return errorResponse("اطلاعات تکراری است", 409);
    }

    if (error?.name === "ValidationError") {
      return errorResponse("اطلاعات ارسالی معتبر نیست", 400, {
        errors: Object.values(error.errors || {}).map((item) => item.message),
      });
    }

    return errorResponse("خطای داخلی سرور", 500);
  }
}

// DELETE /api/admin/articles/[id]
export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return errorResponse("شناسه مقاله نامعتبر است", 422);
    }

    const { searchParams } = new URL(req.url);
    const hardDelete = normalizeBoolean(searchParams.get("hard"), false);

    const article = await ArticleModel.findById(id)
      .select("_id status slug")
      .lean();

    if (!article) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    if (hardDelete) {
      await ArticleModel.findByIdAndDelete(id);

      return successResponse({
        success: true,
        message: "مقاله با موفقیت به‌صورت کامل حذف شد",
      });
    }

    await ArticleModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "archived",
          noIndex: true,
          noFollow: false,
          includeInSitemap: false,
          isFeatured: false,
        },
      },
      {
        runValidators: true,
      }
    );

    return successResponse({
      success: true,
      message: "مقاله با موفقیت آرشیو و از ایندکس و سایت‌مپ خارج شد",
    });
  } catch (error) {
    console.error("DELETE /api/admin/articles/[id] error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
