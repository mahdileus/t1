// app/api/analytics/view/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import ViewEvent from "@/models/ViewEvent";
import connectToDB from "@/configs/db";

function hashValue(value = "") {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();

    const targetType = body.targetType;
    const targetId = body.targetId || null;
    const path = body.path;
    const title = body.title || "";

    if (!targetType || !path) {
      return NextResponse.json(
        { message: "اطلاعات بازدید ناقص است" },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0] || "unknown";
    const userAgent = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";

    await ViewEvent.create({
      targetType,
      targetId,
      path,
      title,
      referrer,
      userAgent,
      ipHash: hashValue(ip),
    });

    return NextResponse.json({ message: "بازدید ثبت شد" });
  } catch (error) {
    console.error("View tracking error:", error);

    return NextResponse.json(
      { message: "خطا در ثبت بازدید" },
      { status: 500 }
    );
  }
}
