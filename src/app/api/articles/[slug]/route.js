import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";

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

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { slug } = params;

    if (!slug || typeof slug !== "string") {
      return errorResponse("اسلاگ مقاله نامعتبر است", 400);
    }

    const article = await ArticleModel.findOne({
      slug,
      status: "published",
    })
      .select(
        "_id title slug excerpt content cover readingTime authorName tags publishedAt createdAt updatedAt viewCount metaTitle metaDescription metaKeywords canonicalUrl seoSchema"
      )
      .populate("category", "_id title slug")
      .lean();

    if (!article) {
      return errorResponse("مقاله موردنظر پیدا نشد", 404);
    }

    return successResponse({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
