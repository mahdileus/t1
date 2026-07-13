import ProjectModel from "@/models/Project";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import { uploadImage } from "@/app/utils/uploadFile";

export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "شناسه پروژه نامعتبر است!" }, { status: 422 });
    }

    const formData = await req.formData();
    
    // دریافت مقادیر
    const updatedData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      link: formData.get("link"),
      category: formData.get("category"),
      longDescription: formData.get("longDescription"),
      shortDescription: formData.get("shortDescription"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    // دریافت فایل‌ها از FormData
    const thumbnail = formData.get("thumbnail");
    const mainPicture = formData.get("mainPicture");

    // آپلود فایل‌ها (فقط اگر فایلی ارسال شده باشد)
    // تابع uploadImage در صورت null بودن فایل، null برمی‌گرداند
    if (thumbnail instanceof File && thumbnail.size > 0) {
      updatedData.thumbnail = await uploadImage(thumbnail);
    }
    
    if (mainPicture instanceof File && mainPicture.size > 0) {
      updatedData.mainPicture = await uploadImage(mainPicture);
    }

    // بروزرسانی در دیتابیس
    const updatedProject = await ProjectModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProject) {
        return NextResponse.json({ message: "پروژه‌ای با این شناسه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "پروژه با موفقیت بروزرسانی شد", project: updatedProject }, { status: 200 });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "شناسه نامعتبر است!" }, { status: 422 });
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);
    
    if (!deletedProject) {
        return NextResponse.json({ message: "پروژه‌ای برای حذف پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "پروژه با موفقیت حذف شد" });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
