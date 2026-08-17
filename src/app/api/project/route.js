import { uploadImage } from "@/app/utils/uploadFile";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";
import slugify from "slugify";
import { NextResponse } from "next/server";

function getString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parseArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => getString(item))
      .filter(Boolean);
  }

  const stringValue = getString(value);

  if (!stringValue) return [];

  try {
    const parsedValue = JSON.parse(stringValue);

    if (Array.isArray(parsedValue)) {
      return [
        ...new Set(
          parsedValue
            .map((item) => getString(item))
            .filter(Boolean)
        ),
      ];
    }
  } catch {
    // در صورت JSON نبودن، به‌عنوان رشته معمولی پردازش می‌شود
  }

  return [
    ...new Set(
      stringValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  ];
}

function parseBoolean(value, defaultValue = false) {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  return (
    value === true ||
    value === "true" ||
    value === "1" ||
    value === 1
  );
}

function parseNumber(value, defaultValue = 0) {
  const number = Number(value);

  return Number.isFinite(number) ? number : defaultValue;
}

function parseDate(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function createSlug(value) {
  return slugify(getString(value), {
    lower: true,
    strict: true,
    trim: true,
  });
}

function getUploadErrorStatus(error) {
  const uploadErrors = [
    "فرمت تصویر مجاز نیست",
    "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
  ];

  return uploadErrors.includes(error.message) ? 400 : 500;
}

export async function POST(req) {
  let uploadedImages = [];

  try {
    const formData = await req.formData();

    const title = getString(formData.get("title"));
    const slugInput = getString(formData.get("slug"));
    const slug = createSlug(slugInput || title);

    const link = getString(formData.get("link"));
    const clientName = getString(formData.get("clientName"));
    const brandName = getString(formData.get("brandName"));
    const category = getString(formData.get("category"));
    const industry = getString(formData.get("industry"));
    const projectType = getString(formData.get("projectType")) || "website";

    const shortDescription = getString(
      formData.get("shortDescription")
    );

    const longDescription = getString(
      formData.get("longDescription")
    );

    const seoTitle = getString(formData.get("seoTitle"));
    const seoDescription = getString(
      formData.get("seoDescription")
    );

    const imageAlt = getString(formData.get("imageAlt"));

    const technologies = parseArray(formData.get("technologies"));
    const tags = parseArray(formData.get("tags"));
    const features = parseArray(formData.get("features"));
    const seoKeywords = parseArray(formData.get("seoKeywords"));

    const allowedProjectTypes = [
      "website",
      "shop",
      "web-app",
      "cms",
      "seo",
      "portfolio",
      "custom",
    ];

    const allowedStatuses = [
      "draft",
      "published",
      "archived",
    ];

    const status =
      getString(formData.get("status")) || "published";

    if (!title) {
      return NextResponse.json(
        { message: "عنوان پروژه الزامی است" },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          message:
            "اسلاگ معتبر الزامی است. برای سئو بهتر، اسلاگ را انگلیسی وارد کنید؛ مثلا technonar-web-design",
        },
        { status: 400 }
      );
    }

    if (!link) {
      return NextResponse.json(
        { message: "لینک پروژه الزامی است" },
        { status: 400 }
      );
    }

    if (!category || !industry) {
      return NextResponse.json(
        { message: "دسته‌بندی و حوزه فعالیت الزامی هستند" },
        { status: 400 }
      );
    }

    if (!shortDescription || !longDescription) {
      return NextResponse.json(
        { message: "توضیحات کوتاه و کامل پروژه الزامی هستند" },
        { status: 400 }
      );
    }

    if (!clientName) {
      return NextResponse.json(
        { message: "نام کارفرما یا برند پروژه الزامی است" },
        { status: 400 }
      );
    }

    if (!technologies.length) {
      return NextResponse.json(
        { message: "حداقل یک تکنولوژی برای پروژه وارد کنید" },
        { status: 400 }
      );
    }

    if (!tags.length) {
      return NextResponse.json(
        { message: "حداقل یک تگ برای پروژه وارد کنید" },
        { status: 400 }
      );
    }

    if (!allowedProjectTypes.includes(projectType)) {
      return NextResponse.json(
        { message: "نوع پروژه نامعتبر است" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "وضعیت پروژه نامعتبر است" },
        { status: 400 }
      );
    }

    if (!seoTitle || !seoDescription) {
      return NextResponse.json(
        {
          message:
            "برای ایندکس بهتر، عنوان سئو و توضیحات سئو الزامی هستند",
        },
        { status: 400 }
      );
    }

    const duplicatedProject = await ProjectModel.findOne({
      slug,
    }).lean();

    if (duplicatedProject) {
      return NextResponse.json(
        {
          message:
            "این اسلاگ قبلاً استفاده شده است. یک اسلاگ متفاوت وارد کنید",
        },
        { status: 409 }
      );
    }

    const thumbnailFile =
      formData.get("thumbnail") || formData.get("img");

    const mainPictureFile = formData.get("mainPicture");

    if (
      !(thumbnailFile instanceof File) ||
      thumbnailFile.size === 0
    ) {
      return NextResponse.json(
        { message: "تصویر بندانگشتی پروژه الزامی است" },
        { status: 400 }
      );
    }

    if (
      !(mainPictureFile instanceof File) ||
      mainPictureFile.size === 0
    ) {
      return NextResponse.json(
        { message: "تصویر اصلی پروژه الزامی است" },
        { status: 400 }
      );
    }

    await connectToDB();

    const [thumbnailPath, mainPicturePath] = await Promise.all([
      uploadImage(
        thumbnailFile,
        "uploads/projects/thumbnails"
      ),
      uploadImage(
        mainPictureFile,
        "uploads/projects/main"
      ),
    ]);

    uploadedImages.push(thumbnailPath, mainPicturePath);

    const galleryFiles = formData.getAll("gallery");
    const galleryPaths = [];

    for (const file of galleryFiles) {
      if (file instanceof File && file.size > 0) {
        const galleryPath = await uploadImage(
          file,
          "uploads/projects/gallery"
        );

        if (galleryPath) {
          galleryPaths.push(galleryPath);
          uploadedImages.push(galleryPath);
        }
      }
    }

    const canonicalUrl = getString(
      formData.get("canonicalUrl")
    );

    const publishedAtInput = formData.get("publishedAt");
    const customPublishedAt = parseDate(publishedAtInput);

    const projectData = {
      title,
      slug,
      link,

      clientName,
      brandName,

      category,
      industry,
      projectType,

      technologies,
      tags,
      features,
      seoKeywords,

      shortDescription,
      longDescription,

      challenge: getString(formData.get("challenge")),
      solution: getString(formData.get("solution")),

      seoTitle,
      seoDescription,

      canonicalUrl,
      ogTitle:
        getString(formData.get("ogTitle")) || seoTitle,
      ogDescription:
        getString(formData.get("ogDescription")) ||
        seoDescription,

      thumbnail: thumbnailPath,
      mainPicture: mainPicturePath,
      gallery: galleryPaths,

      imageAlt:
        imageAlt ||
        `نمونه کار طراحی سایت ${title} توسط شرکت تیوان`,

      status,
      isFeatured: parseBoolean(
        formData.get("isFeatured"),
        false
      ),

      sortOrder: parseNumber(
        formData.get("sortOrder"),
        0
      ),

      publishedAt:
        status === "published"
          ? customPublishedAt || new Date()
          : null,
    };

    const project = await ProjectModel.create(projectData);

    return NextResponse.json(
      {
        message: "پروژه با موفقیت ایجاد شد",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "اسلاگ پروژه تکراری است" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message:
          getUploadErrorStatus(error) === 400
            ? error.message
            : "خطای داخلی سرور",
      },
      { status: getUploadErrorStatus(error) }
    );
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const category = getString(searchParams.get("category"));
    const tag = getString(searchParams.get("tag"));
    const technology = getString(searchParams.get("technology"));
    const featured = searchParams.get("featured");

    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "12", 10), 1), 50);

    const filter = {
      status: "published",
      publishedAt: { $lte: new Date() }, // ← فیلتر تاریخ آینده
    };

    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (technology) filter.technologies = technology;
    if (featured === "true") filter.isFeatured = true;

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      ProjectModel.find(filter, "-__v")
        .sort({
          isFeatured: -1,
          sortOrder: 1,
          publishedAt: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      ProjectModel.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}

