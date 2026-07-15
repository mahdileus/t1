import { uploadImage } from "@/app/utils/uploadFile";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "فایلی دریافت نشد" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(file, "uploads/ckeditor");

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "خطا در آپلود تصویر" },
      { status: 400 }
    );
  }
}
