import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectToDB from "@/configs/db";
import ArticleCategory from "@/models/ArticleCategory";
import { authAdmin } from "@/app/utils/auth-server";

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

function toPlain(doc) {
  if (!doc) return null;

  if (Array.isArray(doc)) {
    return doc.map((item) => {
      if (item?.toObject) return item.toObject();
      return item;
    });
  }

  if (doc?.toObject) return doc.toObject();

  return doc;
}

function buildTree(categories) {
  const map = new Map();
  const roots = [];

  categories.forEach((category) => {
    map.set(String(category._id), {
      ...category,
      children: [],
    });
  });

  categories.forEach((category) => {
    const id = String(category._id);
    const parentId = category.parent ? String(category.parent) : null;

    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(map.get(id));
    } else {
      roots.push(map.get(id));
    }
  });

  const sortRecursive = (nodes) => {
    nodes.sort((a, b) => {
      const sortA = Number(a.sortOrder) || 0;
      const sortB = Number(b.sortOrder) || 0;

      if (sortA !== sortB) {
        return sortA - sortB;
      }

      return String(a.title || "").localeCompare(String(b.title || ""), "fa");
    });

    nodes.forEach((node) => sortRecursive(node.children));
  };

  sortRecursive(roots);

  return roots;
}

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeParent(parent) {
  if (!parent) return null;
  if (parent === "null") return null;
  if (parent === "undefined") return null;

  return String(parent);
}

async function calcLevel(parentId) {
  if (!parentId) return 0;

  const parent = await ArticleCategory.findById(parentId).select(
    "_id level parent"
  );

  if (!parent) {
    throw new Error("PARENT_NOT_FOUND");
  }

  const level = (Number(parent.level) || 0) + 1;

  if (level > 2) {
    throw new Error("MAX_DEPTH_EXCEEDED");
  }

  return level;
}

async function requireAdmin() {
  const admin = await authAdmin();

  if (!admin) {
    return null;
  }

  return admin;
}

// GET /api/admin/article-categories
// query:
// tree=1
// isActive=true/false
export async function GET(req) {
  try {
    await connectToDB();

    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { searchParams } = new URL(req.url);

    const wantTree = searchParams.get("tree") === "1";
    const onlyActive = searchParams.get("isActive");

    const query = {};

    if (onlyActive === "true") {
      query.isActive = true;
    }

    if (onlyActive === "false") {
      query.isActive = false;
    }

    const categories = await ArticleCategory.find(query)
      .select("_id title slug parent isActive sortOrder level createdAt updatedAt")
      .sort({ sortOrder: 1, title: 1 })
      .lean();

    const data = wantTree ? buildTree(categories) : categories;

    return successResponse({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET /api/admin/article-categories error:", error);

    return errorResponse("خطای سرور، لطفاً دوباره تلاش کنید", 500);
  }
}

// POST /api/admin/article-categories
// body:
// {
//   title,
//   slug?,
//   parent?,
//   isActive?,
//   sortOrder?
// }
export async function POST(req) {
  try {
    await connectToDB();

    const admin = await requireAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    let body = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const title = String(body.title || "").trim();

    const rawSlug = body.slug ? String(body.slug).trim() : "";
    const slug = slugify(rawSlug || title);

    const parent = normalizeParent(body.parent);

    const isActive =
      typeof body.isActive === "boolean" ? body.isActive : true;

    const sortOrder = Number.isFinite(Number(body.sortOrder))
      ? Number(body.sortOrder)
      : 0;

    if (!title) {
      return errorResponse("عنوان دسته‌بندی الزامی است", 400);
    }

    if (title.length > 120) {
      return errorResponse("عنوان دسته‌بندی نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد", 400);
    }

    if (!slug) {
      return errorResponse("اسلاگ معتبر نیست", 400);
    }

    let parentId = null;

    if (parent) {
      if (!mongoose.Types.ObjectId.isValid(parent)) {
        return errorResponse("شناسه والد نامعتبر است", 400);
      }

      parentId = parent;
    }

    let level = 0;

    try {
      level = await calcLevel(parentId);
    } catch (error) {
      if (error.message === "PARENT_NOT_FOUND") {
        return errorResponse("دسته والد پیدا نشد", 404);
      }

      if (error.message === "MAX_DEPTH_EXCEEDED") {
        return errorResponse("حداکثر عمق دسته‌بندی ۳ سطح است", 400);
      }

      throw error;
    }

    const duplicateTitle = await ArticleCategory.findOne({
      title,
      parent: parentId,
    }).select("_id");

    if (duplicateTitle) {
      return errorResponse("در این سطح، دسته‌ای با این عنوان وجود دارد", 409);
    }

    const duplicateSlug = await ArticleCategory.findOne({
      slug,
    }).select("_id");

    if (duplicateSlug) {
      return errorResponse("اسلاگ تکراری است", 409);
    }

    const created = await ArticleCategory.create({
      title,
      slug,
      parent: parentId,
      isActive,
      sortOrder,
      level,
    });

    return successResponse(
      {
        success: true,
        message: "دسته‌بندی با موفقیت ساخته شد",
        data: toPlain(created),
      },
      201
    );
  } catch (error) {
    console.error("POST /api/admin/article-categories error:", error);

    if (error?.code === 11000) {
      if (error?.keyPattern?.slug) {
        return errorResponse("اسلاگ تکراری است", 409);
      }

      if (error?.keyPattern?.parent && error?.keyPattern?.title) {
        return errorResponse("در این سطح، دسته‌ای با این عنوان وجود دارد", 409);
      }

      return errorResponse("اطلاعات تکراری است", 409);
    }

    return errorResponse("خطای سرور، لطفاً دوباره تلاش کنید", 500);
  }
}
