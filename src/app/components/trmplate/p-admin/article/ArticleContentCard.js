"use client";

import dynamic from "next/dynamic";

const CKEditor = dynamic(
  () => import("@/app/components/module/ckeditor/CKEditorWrapper"),
  { ssr: false }
);

export default function ArticleContentCard({ formData, onChange }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">محتوای مقاله</h2>
        <p className="mt-1 text-sm text-slate-500">
          متن کامل مقاله را وارد کنید.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          متن مقاله
        </label>

        <div className="advanced-ckeditor rounded-2xl border border-slate-200 ">
          <CKEditor
            value={formData.content || ""}
            onChange={(value) => onChange("content", value)}
            placeholder="متن کامل مقاله را اینجا بنویسید..."
          />
        </div>
      </div>

    </section>
  );
}
