import { NextResponse } from "next/server";
import mongoose, { isValidObjectId } from "mongoose";
import slugify from "slugify";

import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";
import { authAdmin } from "@/app/utils/auth-server";
import { uploadImage } from "@/app/utils/uploadFile";


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

function normalizeSlug(value, fallback = "") {
  return slugify(String(value || fallback || ""), {
    lower: true,
    strict: true,
    trim: true,
  });
}

function safeJsonParse(value, fallback) {
  try {
    if (!value) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeStringArray(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function normalizeStatus(status) {
  const allowed = ["draft", "published", "archived"];
  return allowed.includes(status) ? status : "draft";
}

function buildCanonicalUrl(slug) {
  return `/articles/${slug}`;
}

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

    const existingArticle = await ArticleModel.findById(id).select("_id status publishedAt cover").lean();
    if (!existingArticle) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    const formData = await req.formData();

    const title = normalizeString(formData.get("title"));
    const rawSlug = normalizeString(formData.get("slug")) || title;
    const slug = normalizeSlug(rawSlug, title);

    const category = normalizeString(formData.get("category"));
    const authorName = normalizeString(formData.get("authorName"));
    const excerpt = normalizeString(formData.get("excerpt"));
    const content = normalizeString(formData.get("content"));

    const readingTime = Number(formData.get("readingTime"));
    const status = normalizeStatus(normalizeString(formData.get("status")));

    const tags = normalizeStringArray(safeJsonParse(formData.get("tags"), []));
    const metaKeywords = normalizeStringArray(
      safeJsonParse(formData.get("metaKeywords"), tags)
    );

    const metaTitle = normalizeString(formData.get("metaTitle")) || title;
    const metaDescription =
      normalizeString(formData.get("metaDescription")) || excerpt;

    const canonicalUrl =
      normalizeString(formData.get("canonicalUrl")) || buildCanonicalUrl(slug);

    const seoSchema = safeJsonParse(formData.get("seoSchema"), {});
    const viewCountRaw = formData.get("viewCount");
    const viewCount =
      viewCountRaw === null || viewCountRaw === ""
        ? 0
        : Number(viewCountRaw);

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
      .select("_id title isActive")
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

    if (!Array.isArray(tags)) {
      return errorResponse("فرمت تگ‌ها نامعتبر است", 400);
    }

    if (!Array.isArray(metaKeywords)) {
      return errorResponse("فرمت کلمات کلیدی نامعتبر است", 400);
    }

    if (
      typeof seoSchema !== "object" ||
      Array.isArray(seoSchema) ||
      seoSchema === null
    ) {
      return errorResponse("ساختار seoSchema نامعتبر است", 400);
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

    // بررسی ارسال فایل جدید و معتبر بودن آن
    if (coverFile instanceof File && coverFile.size > 0) {
      const uploadedCover = await uploadImage(coverFile, "uploads/articles");

      if (!uploadedCover) {
        return errorResponse("آپلود تصویر شاخص با خطا مواجه شد", 500);
      }

      coverUrl = uploadedCover;
    }


    let publishedAt = existingArticle.publishedAt || null;

    if (status === "published" && !existingArticle.publishedAt) {
      publishedAt = new Date();
    }

    if (status !== "published") {
      publishedAt = null;
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        category,
        authorName,
        excerpt,
        content,
        readingTime,
        cover: coverUrl,
        tags,
        status,
        publishedAt,
        viewCount,
        metaTitle,
        metaDescription,
        metaKeywords,
        canonicalUrl,
        seoSchema,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "_id title slug");

    return successResponse({
      success: true,
      message: "مقاله با موفقیت بروزرسانی شد",
      data: updatedArticle,
    });
  } catch (error) {
    console.error("PUT /api/admin/articles/[id] error:", error);

    // مدیریت خطاهای اختصاصی پرتاب شده از تابع آپلود
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

    return errorResponse("خطای داخلی سرور", 500);
  }

}

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

    const article = await ArticleModel.findById(id).select("_id").lean();

    if (!article) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    await ArticleModel.findByIdAndDelete(id);

    return successResponse({
      success: true,
      message: "مقاله با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("DELETE /api/admin/articles/[id] error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
