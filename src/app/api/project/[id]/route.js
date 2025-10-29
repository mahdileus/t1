
import ProjectModel from "@/models/Project"
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import connectToDB from "@/configs/db";

export async function PUT(req, { params }) {
  await connectToDB();

  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "شناسه پروژه نامعتبر است!" }, { status: 422 });
  }

  const formData = await req.formData();

const updatedData = {
  title: formData.get("title"),
  slug: formData.get("slug"),
  link: formData.get("link"),
  category: formData.get("category"),
  longDescription: formData.get("longDescription"),
  shortDescription: formData.get("shortDescription"),
  tags: JSON.parse(formData.get("tags") || "[]"),
};


  // ذخیره فایل‌ها در صورت ارسال فایل جدید
  const thumbnail = formData.get("thumbnail");
  const mainPicture = formData.get("mainPicture");

const uploadsPath = path.join(process.cwd(), "public", "uploads");

const saveFile = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadsPath, fileName);
  await writeFile(filePath, buffer);

  const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
  return `/${relativePath.replace(/\\/g, "/")}`;  // برای ویندوز: \ → /
};

  if (thumbnail && thumbnail.size > 0) {
    updatedData.thumbnail = await saveFile(thumbnail);
  }
  if (mainPicture && mainPicture.size > 0) {
    updatedData.mainPicture = await saveFile(mainPicture);
  }


  await ProjectModel.findByIdAndUpdate(id, updatedData);

  return NextResponse.json({ message: "پروژه با موفقیت بروزرسانی شد" }, { status: 200 });
}
export async function DELETE(req, { params }) {
  await connectToDB();

  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NextResponse.json(
      { message: "article ID is not valid !!" },
      { status: 422 }
    );
  }

  try {
    await ProjectModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "article Removed Successfully :))" });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error !!" },
      { status: 500 }
    );
  }
}