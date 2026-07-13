import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ArticleCategory from "@/models/ArticleCategory";

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

function parsePositiveInt(value, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 1) return fallback;
  return Math.floor(num);
}

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const page = parsePositiveInt(searchParams.get("page"), 1);
    const limit = Math.min(parsePositiveInt(searchParams.get("limit"), 10), 50);
    const skip = (page - 1) * limit;

    const search = String(searchParams.get("search") || "").trim();
    const categorySlug = String(searchParams.get("category") || "").trim();
    const tag = String(searchParams.get("tag") || "").trim();

    const query = {
      status: "published",
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    if (categorySlug) {
      const category = await ArticleCategory.findOne({
        slug: categorySlug,
        isActive: true,
      })
        .select("_id")
        .lean();

      if (!category) {
        return successResponse({
          success: true,
          data: [],
          pagination: {
            total: 0,
            page,
            limit,
            pages: 0,
          },
        });
      }

      query.category = category._id;
    }

    const [articles, total] = await Promise.all([
      ArticleModel.find(query)
        .select(
          "_id title slug excerpt cover readingTime authorName tags publishedAt createdAt viewCount metaTitle metaDescription"
        )
        .populate("category", "_id title slug")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      ArticleModel.countDocuments(query),
    ]);

    return successResponse({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
