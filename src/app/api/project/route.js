import { uploadImage } from "@/app/utils/uploadFile";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";
import slugify from "slugify";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const img = formData.get("img");
    const mainPicture = formData.get("mainPicture");

    const [thumbnailPath, mainPicturePath] = await Promise.all([
      uploadImage(img),
      uploadImage(mainPicture),
    ]);

    await connectToDB();

    const project = await ProjectModel.create({
      title: formData.get("title"),
      link: formData.get("link"),
      slug: slugify(String(formData.get("slug") || ""), {
        lower: true,
        strict: true,
      }),
      category: formData.get("category"),
      shortDescription: formData.get("shortDescription"),
      longDescription: formData.get("longDescription"),
      tags: formData.get("tags"),
      thumbnail: thumbnailPath,
      mainPicture: mainPicturePath,
    });

    return Response.json(
      {
        message: "پروژه با موفقیت ایجاد شد",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);

    const isUploadError = [
      "فرمت تصویر مجاز نیست",
      "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
    ].includes(error.message);

    return Response.json(
      {
        message: isUploadError ? error.message : "خطای داخلی سرور",
      },
      { status: isUploadError ? 400 : 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();

    const projects = await ProjectModel.find({}, "-__v").lean();

    return Response.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    return Response.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
