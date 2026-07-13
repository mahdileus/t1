import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectToDB from "@/configs/db";
import ArticleCategory from "@/models/ArticleCategory";
import { authAdmin } from "@/app/utils/auth-server";
// بعداً برای جلوگیری از حذف دسته استفاده‌شده:
// import Article from "@/models/Article";

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
  if (parent === "" || parent === null || parent === undefined) return null;
  if (parent === "null" || parent === "undefined") return null;
  return String(parent);
}

async function requireAdmin() {
  const admin = await authAdmin();
  return admin || null;
}

async function getDescendantIds(rootId) {
  const descendants = new Set();
  const queue = [String(rootId)];

  while (queue.length) {
    const currentId = queue.shift();

    const children = await ArticleCategory.find({ parent: currentId })
      .select("_id")
      .lean();

    for (const child of children) {
      const childId = String(child._id);

      if (!descendants.has(childId)) {
        descendants.add(childId);
        queue.push(childId);
      }
    }
  }

  return descendants;
}

async function calcLevel(parentId) {
  if (!parentId) return 0;

  const parent = await ArticleCategory.findById(parentId).select("_id level");

  if (!parent) {
    throw new Error("PARENT_NOT_FOUND");
  }

  const level = (Number(parent.level) || 0) + 1;

  if (level > 2) {
    throw new Error("MAX_DEPTH_EXCEEDED");
  }

  return level;
}

async function getSubtreeHeight(categoryId) {
  const children = await ArticleCategory.find({ parent: categoryId })
    .select("_id")
    .lean();

  if (!children.length) return 0;

  let maxHeight = 0;

  for (const child of children) {
    const childHeight = await getSubtreeHeight(child._id);
    if (childHeight > maxHeight) {
      maxHeight = childHeight;
    }
  }

  return maxHeight + 1;
}

async function updateChildrenLevels(parentId, parentLevel) {
  const children = await ArticleCategory.find({ parent: parentId })
    .select("_id")
    .lean();

  for (const child of children) {
    const childLevel = parentLevel + 1;

    await ArticleCategory.findByIdAndUpdate(child._id, {
      $set: { level: childLevel },
    });

    await updateChildrenLevels(child._id, childLevel);
  }
}

// PATCH /api/admin/article-categories/:id
export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const admin = await requireAdmin();
    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse("شناسه نامعتبر است", 400);
    }

    const category = await ArticleCategory.findById(id);

    if (!category) {
      return errorResponse("دسته‌بندی پیدا نشد", 404);
    }

    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const updateData = {};
    let parentChanged = false;

    // title
    if (body.title !== undefined) {
      const title = String(body.title || "").trim();

      if (!title) {
        return errorResponse("عنوان نمی‌تواند خالی باشد", 400);
      }

      if (title.length > 120) {
        return errorResponse("عنوان دسته‌بندی نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد", 400);
      }

      updateData.title = title;
    }

    // slug
    if (body.slug !== undefined) {
      const slug = slugify(body.slug);

      if (!slug) {
        return errorResponse("اسلاگ نامعتبر است", 400);
      }

      updateData.slug = slug;
    }

    // isActive
    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    // sortOrder
    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (!Number.isFinite(sortOrder)) {
        return errorResponse("ترتیب نامعتبر است", 400);
      }

      updateData.sortOrder = sortOrder;
    }

    // parent + level
    if (body.parent !== undefined) {
      let newParent = normalizeParent(body.parent);

      if (newParent && !mongoose.Types.ObjectId.isValid(newParent)) {
        return errorResponse("شناسه والد نامعتبر است", 400);
      }

      if (newParent && String(newParent) === String(category._id)) {
        return errorResponse("دسته نمی‌تواند والد خودش باشد", 400);
      }

      if (newParent) {
        const descendants = await getDescendantIds(category._id);

        if (descendants.has(String(newParent))) {
          return errorResponse("والد انتخاب‌شده نامعتبر است (ایجاد حلقه)", 400);
        }
      }

      let newLevel = 0;

      try {
        newLevel = await calcLevel(newParent);
      } catch (error) {
        if (error.message === "PARENT_NOT_FOUND") {
          return errorResponse("دسته والد پیدا نشد", 404);
        }

        if (error.message === "MAX_DEPTH_EXCEEDED") {
          return errorResponse("حداکثر عمق دسته‌بندی ۳ سطح است", 400);
        }

        throw error;
      }

      // قبل از ذخیره، مطمئن شو subtree بعد از جابه‌جایی از عمق مجاز رد نمی‌شود
      const subtreeHeight = await getSubtreeHeight(category._id);
      const deepestLevelAfterMove = newLevel + subtreeHeight;

      if (deepestLevelAfterMove > 2) {
        return errorResponse(
          "تغییر والد باعث عبور از حداکثر عمق مجاز می‌شود",
          400
        );
      }

      const currentParent = category.parent ? String(category.parent) : null;
      const nextParent = newParent ? String(newParent) : null;

      if (currentParent !== nextParent) {
        parentChanged = true;
      }

      updateData.parent = newParent;
      updateData.level = newLevel;
    }

    const nextTitle = updateData.title ?? category.title;
    const nextParent =
      updateData.parent !== undefined
        ? updateData.parent
        : category.parent ?? null;

    const duplicateTitle = await ArticleCategory.findOne({
      _id: { $ne: category._id },
      title: nextTitle,
      parent: nextParent,
    }).select("_id");

    if (duplicateTitle) {
      return errorResponse("در این سطح، دسته‌ای با این عنوان وجود دارد", 409);
    }

    if (updateData.slug) {
      const duplicateSlug = await ArticleCategory.findOne({
        _id: { $ne: category._id },
        slug: updateData.slug,
      }).select("_id");

      if (duplicateSlug) {
        return errorResponse("اسلاگ تکراری است", 409);
      }
    }

    const updated = await ArticleCategory.findByIdAndUpdate(
      category._id,
      { $set: updateData },
      { new: true }
    ).lean();

    if (parentChanged) {
      await updateChildrenLevels(updated._id, updated.level ?? 0);
    }

    return successResponse({
      success: true,
      message: "دسته‌بندی با موفقیت ویرایش شد",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/admin/article-categories/[id] error:", error);

    if (error?.code === 11000) {
      if (error?.keyPattern?.slug) {
        return errorResponse("اسلاگ تکراری است", 409);
      }

      return errorResponse("اطلاعات تکراری است", 409);
    }

    return errorResponse("خطای سرور، لطفاً دوباره تلاش کنید", 500);
  }
}

// DELETE /api/admin/article-categories/:id
export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const admin = await requireAdmin();
    if (!admin) {
      return errorResponse("دسترسی غیرمجاز است", 401);
    }

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse("شناسه نامعتبر است", 400);
    }

    const category = await ArticleCategory.findById(id).select("_id title");

    if (!category) {
      return errorResponse("دسته‌بندی پیدا نشد", 404);
    }

    const hasChildren = await ArticleCategory.exists({ parent: category._id });

    if (hasChildren) {
      return errorResponse("این دسته زیرمجموعه دارد و قابل حذف نیست", 400);
    }

    // بعداً وقتی مدل Article نهایی شد این بخش را فعال کن:
    // const usedInArticle = await Article.exists({ category: category._id });
    // if (usedInArticle) {
    //   return errorResponse("این دسته در مقالات استفاده شده و قابل حذف نیست", 400);
    // }

    await ArticleCategory.findByIdAndDelete(id);

    return successResponse({
      success: true,
      message: "دسته‌بندی با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("DELETE /api/admin/article-categories/[id] error:", error);

    return errorResponse("خطای سرور، لطفاً دوباره تلاش کنید", 500);
  }
}
