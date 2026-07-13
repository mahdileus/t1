"use client";

import SeoKeywordInput from "./SeoKeywordInput";

export default function ArticleSeoCard({ formData, updateMetaData, onChange }) {
  const seoTitleLength = formData.metaData.title.length;
  const seoDescriptionLength = formData.metaData.description.length;

  return (
    <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-white to-amber-50 p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">تنظیمات سئو</h2>
          <p className="mt-1 text-sm text-slate-500">
            عنوان و توضیحات متا، کلمات کلیدی و اسکیما را تنظیم کنید.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-white px-3 py-2 text-xs text-amber-700">
          SEO
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            عنوان متا
          </label>
          <input
            type="text"
            value={formData.metaData.title}
            onChange={(e) => updateMetaData("title", e.target.value)}
            placeholder="عنوان سئو برای گوگل"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
          />
          <div className="mt-1 text-xs text-slate-400">
            تعداد کاراکتر: {seoTitleLength} / 60
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            توضیحات متا
          </label>
          <textarea
            rows={4}
            value={formData.metaData.description}
            onChange={(e) => updateMetaData("description", e.target.value)}
            placeholder="توضیح کوتاه برای نتایج جستجو"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-none"
          />
          <div className="mt-1 text-xs text-slate-400">
            تعداد کاراکتر: {seoDescriptionLength} / 160
          </div>
        </div>

        <SeoKeywordInput
          keywords={formData.metaData.keywords}
          onChange={(keywords) => updateMetaData("keywords", keywords)}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            اسکیما JSON-LD
          </label>
          <textarea
            dir="ltr"
            rows={10}
            value={formData.seoSchema}
            onChange={(e) => onChange("seoSchema", e.target.value)}
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Article"\n}`}
            className="w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-sm text-green-300 outline-none transition focus:border-amber-400 resize-y font-mono"
          />
          <p className="mt-2 text-xs text-slate-500">
            در این بخش می‌توانید اسکیما مقاله را به صورت JSON-LD وارد کنید.
          </p>
        </div>
      </div>
    </section>
  );
}
