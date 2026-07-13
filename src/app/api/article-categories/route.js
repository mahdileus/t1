import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
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

export async function GET() {
  try {
    await connectToDB();

    const categories = await ArticleCategory.find({ isActive: true })
      .select("_id title slug description parent level sortOrder")
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    return successResponse({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("GET /api/article-categories error:", error);
    return errorResponse("خطای داخلی سرور", 500);
  }
}
