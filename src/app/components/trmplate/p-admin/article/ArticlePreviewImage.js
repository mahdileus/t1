"use client";

import { CiImageOn } from "react-icons/ci";

export default function ArticlePreviewImage({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-56 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <CiImageOn size={42} />
          <span className="text-sm">پیش‌نمایش تصویر مقاله</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "preview"}
      className="h-56 w-full rounded-2xl object-cover"
    />
  );
}
