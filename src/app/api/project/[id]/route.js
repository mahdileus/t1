import ProjectModel from "@/models/Project";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import { uploadImage } from "@/app/utils/uploadFile";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir"
).replace(/\/$/, "");

function parseArray(value) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }

    return [];
  } catch {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

// در ویرایش (PUT): اگر آرایه خالی فرستاده شد، مقدار قبلی حفظ شود
function parseArrayOrKeep(value, fallback) {
  const parsed = parseArray(value);
  return parsed.length ? parsed : fallback || [];
}

function parseBoolean(value) {
  return value === "true" || value === true || value === "1";
}

function parseDate(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function cleanString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function createSlug(value, fallback = "") {
  const source = cleanString(value) || cleanString(fallback);

  return slugify(source, {
    lower: true,
    strict: true,
    trim: true,
  });
}

// اعتبارسنجی canonical: فقط آدرس‌های هم‌دامنه مجازند
function sanitizeCanonical(value) {
  const canonical = cleanString(value);

  if (!canonical) return "";

  // اگر دامنه‌ی خارجی یا اشتباه بود، خالی برگردان تا صفحه از URL خودش استفاده کند
  if (!canonical.includes("t1w.ir")) {
    return "";
  }

  return canonical;
}

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "شناسه پروژه نامعتبر است!" },
        { status: 422 }
      );
    }

    const { searchParams } = new URL(req.url);
    const isAdminRequest = searchParams.get("admin") === process.env.ADMIN_API_KEY;

    // فیلتر عمومی: فقط پروژه‌های منتشرشده با تاریخ گذشته
    // (پنل ادمین با کلید معتبر می‌تواند پیش‌نویس‌ها را هم ببیند)
    const filter = { _id: id };

    if (!isAdminRequest) {
      filter.status = "published";
      filter.publishedAt = { $lte: new Date() };
    }

    const project = await ProjectModel.findOne(filter, "-__v").lean();

    if (!project) {
      return NextResponse.json(
        { message: "پروژه‌ای با این شناسه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Get project by id error:", error);

    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "شناسه پروژه نامعتبر است!" },
        { status: 422 }
      );
    }

    const currentProject = await ProjectModel.findById(id);

    if (!currentProject) {
      return NextResponse.json(
        { message: "پروژه‌ای با این شناسه یافت نشد" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const title = cleanString(formData.get("title")) || currentProject.title;
    const rawSlug = cleanString(formData.get("slug"));
    const finalSlug = createSlug(rawSlug, title);

    if (!title) {
      return NextResponse.json(
        { message: "عنوان پروژه الزامی است" },
        { status: 400 }
      );
    }

    if (!finalSlug) {
      return NextResponse.json(
        { message: "اسلاگ پروژه الزامی است" },
        { status: 400 }
      );
    }

    const duplicateSlug = await ProjectModel.findOne({
      slug: finalSlug,
      _id: { $ne: id },
    }).lean();

    if (duplicateSlug) {
      return NextResponse.json(
        { message: "این اسلاگ قبلا برای پروژه دیگری ثبت شده است" },
        { status: 409 }
      );
    }

    const status = cleanString(formData.get("status")) || currentProject.status || "draft";

    const allowedStatuses = ["draft", "published", "archived"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "وضعیت پروژه نامعتبر است" },
        { status: 400 }
      );
    }

    const projectType =
      cleanString(formData.get("projectType")) ||
      currentProject.projectType ||
      "website";

    const allowedProjectTypes = [
      "website",
      "shop",
      "web-app",
      "cms",
      "seo",
      "portfolio",
      "custom",
    ];

    if (!allowedProjectTypes.includes(projectType)) {
      return NextResponse.json(
        { message: "نوع پروژه نامعتبر است" },
        { status: 400 }
      );
    }

    // فیلدهای SEO: اگر خالی فرستاده شد، مقدار قبلی حفظ شود
    const seoTitle = cleanString(formData.get("seoTitle"));
    const seoDescription = cleanString(formData.get("seoDescription"));

    const updatedData = {
      title,
      slug: finalSlug,

      link: cleanString(formData.get("link")) || currentProject.link,

      clientName: cleanString(formData.get("clientName")) || currentProject.clientName,
      brandName: cleanString(formData.get("brandName")) || currentProject.brandName,

      category: cleanString(formData.get("category")) || currentProject.category,
      industry: cleanString(formData.get("industry")) || currentProject.industry,
      projectType,

      // آرایه‌ها: اگر خالی فرستاده شد، مقدار قبلی حفظ شود (جلوی پاک شدن ناخواسته)
      technologies: parseArrayOrKeep(formData.get("technologies"), currentProject.technologies),
      tags: parseArrayOrKeep(formData.get("tags"), currentProject.tags),
      features: parseArrayOrKeep(formData.get("features"), currentProject.features),
      seoKeywords: parseArrayOrKeep(formData.get("seoKeywords"), currentProject.seoKeywords),

      shortDescription: cleanString(formData.get("shortDescription")) || currentProject.shortDescription,
      longDescription: cleanString(formData.get("longDescription")) || currentProject.longDescription,

      challenge: cleanString(formData.get("challenge")) || currentProject.challenge,
      solution: cleanString(formData.get("solution")) || currentProject.solution,

      seoTitle: seoTitle || currentProject.seoTitle,
      seoDescription: seoDescription || currentProject.seoDescription,
      canonicalUrl: sanitizeCanonical(formData.get("canonicalUrl")) || currentProject.canonicalUrl || "",
      ogTitle: cleanString(formData.get("ogTitle")) || currentProject.ogTitle || "",
      ogDescription: cleanString(formData.get("ogDescription")) || currentProject.ogDescription || "",

      imageAlt: cleanString(formData.get("imageAlt")) || currentProject.imageAlt || "",

      status,
      isFeatured: formData.get("isFeatured") !== null
        ? parseBoolean(formData.get("isFeatured"))
        : currentProject.isFeatured,
      sortOrder: formData.get("sortOrder") !== null && formData.get("sortOrder") !== ""
        ? Number(formData.get("sortOrder"))
        : currentProject.sortOrder || 0,
    };

    const publishedAtInput = formData.get("publishedAt");

    if (publishedAtInput) {
      updatedData.publishedAt = parseDate(publishedAtInput);
    } else if (status === "published" && !currentProject.publishedAt) {
      updatedData.publishedAt = new Date();
    } else if (status !== "published") {
      updatedData.publishedAt = null;
    }

    const thumbnail = formData.get("thumbnail");
    const mainPicture = formData.get("mainPicture");

    if (thumbnail instanceof File && thumbnail.size > 0) {
      updatedData.thumbnail = await uploadImage(
        thumbnail,
        "uploads/projects/thumbnails"
      );
    }

    if (mainPicture instanceof File && mainPicture.size > 0) {
      updatedData.mainPicture = await uploadImage(
        mainPicture,
        "uploads/projects/main"
      );
    }

    const galleryFiles = formData.getAll("gallery");

    const uploadedGallery = [];

    for (const file of galleryFiles) {
      if (file instanceof File && file.size > 0) {
        const uploadedPath = await uploadImage(
          file,
          "uploads/projects/gallery"
        );

        if (uploadedPath) {
          uploadedGallery.push(uploadedPath);
        }
      }
    }

    const oldGallery = parseArray(formData.get("oldGallery"));

    if (uploadedGallery.length || oldGallery.length) {
      updatedData.gallery = [...oldGallery, ...uploadedGallery];
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    // تازه‌سازی کش صفحات مرتبط
    revalidatePath("/portfolios");
    revalidatePath(`/portfolios/${updatedProject.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json(
      {
        message: "پروژه با موفقیت بروزرسانی شد",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update project error:", error);

    const isUploadError = [
      "فرمت تصویر مجاز نیست",
      "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
    ].includes(error.message);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "اسلاگ پروژه تکراری است" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: isUploadError ? error.message : "خطای داخلی سرور",
      },
      { status: isUploadError ? 400 : 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است!" },
        { status: 422 }
      );
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "پروژه‌ای برای حذف پیدا نشد" },
        { status: 404 }
      );
    }

    // تازه‌سازی کش صفحات مرتبط
    revalidatePath("/portfolios");
    revalidatePath("/sitemap.xml");

    return NextResponse.json(
      { message: "پروژه با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete project error:", error);

    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
