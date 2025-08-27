import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project"
import { writeFile } from "fs/promises";
import path from "path";
import slugify from "slugify";

export async function POST(req) {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const link = formData.get("link");
    const slug = slugify(formData.get("slug"), { lower: true, strict: true });
    const category = formData.get("category");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const tags = formData.get("tags");
    const img = formData.get("img");
    const mainPicture = formData.get("mainPicture");


    const DOMAIN = process.env.DOMAIN || "http://localhost:3000";

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = `${Date.now()}-${img.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);

    const bufferPicture = Buffer.from(await mainPicture.arrayBuffer());
    const filenpictureame = `${Date.now()}-${mainPicture.name}`;
    const filepicturePath = path.join(process.cwd(), "public", "uploads", filenpictureame);
    await writeFile(filepicturePath, bufferPicture);

    const project = await ProjectModel.create({
      title,
      slug,
      link,
      category,
      shortDescription,
      longDescription,
      tags,
      thumbnail: `${DOMAIN}/uploads/${filename}`,
      mainPicture: `${DOMAIN}/uploads/${filename}`,
    });

    return Response.json({ message: "پروژه با موفقیت ایجاد شد", project }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "خطای داخلی سرور", error: err }, { status: 500 });
  }
}

export async function GET() {
  await connectToDB();
  const projects = await ProjectModel.find({}, "-__v")
  return Response.json(projects);
}
