import { NextResponse } from "next/server";
import mongoose from "mongoose";
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

// POST /api/admin/articles
export async function POST(req) {
  try {
    await connectToDB();

    const admin = await requireAdmin();
    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
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
    const viewCount = Number(formData.get("viewCount")) || 0;

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

    if (typeof seoSchema !== "object" || Array.isArray(seoSchema) || seoSchema === null) {
      return errorResponse("ساختار seoSchema نامعتبر است", 400);
    }

    const duplicateSlug = await ArticleModel.findOne({ slug })
      .select("_id")
      .lean();

    if (duplicateSlug) {
      return errorResponse("اسلاگ تکراری است", 409);
    }

    const coverFile = formData.get("cover");

    if (!(coverFile instanceof File) || coverFile.size === 0) {
      return errorResponse(
        "تصویر شاخص مقاله نامعتبر است یا ارسال نشده",
        400
      );
    }

    const coverUrl = await uploadImage(
      coverFile,
      "uploads/articles"
    );

    if (!coverUrl) {
      return errorResponse("آپلود تصویر شاخص با خطا مواجه شد", 500);
    }

    const publishedAt =
      status === "published" ? new Date() : null;

    const article = await ArticleModel.create({
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
    });


    return successResponse(
      {
        success: true,
        message: "مقاله با موفقیت ایجاد شد",
        data: article,
      },
      201
    );
  } catch (error) {
    console.error("POST /api/admin/articles error:", error);

    if (error?.code === 11000) {
      if (error?.keyPattern?.slug) {
        return errorResponse("اسلاگ تکراری است", 409);
      }

      return errorResponse("اطلاعات تکراری است", 409);
    }

    return errorResponse("خطای داخلی سرور", 500);
  }
}


// GET /api/admin/articles
export async function GET(req) {
  try {
    await connectToDB();

    const admin = await requireAdmin();
    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const search = normalizeString(searchParams.get("search"));
    const status = normalizeString(searchParams.get("status"));
    const category = normalizeString(searchParams.get("category"));

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
      ];
    }

    if (["draft", "published", "archived"].includes(status)) {
      query.status = status;
    }

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return errorResponse("شناسه دسته‌بندی نامعتبر است", 400);
      }
      query.category = category;
    }

    const [articles, total] = await Promise.all([
      ArticleModel.find(query, "-__v -content")
        .populate("category", "_id title slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ArticleModel.countDocuments(query),
    ]);

    return successResponse({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/articles error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
