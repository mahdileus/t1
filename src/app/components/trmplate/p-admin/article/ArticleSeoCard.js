"use client";

import SeoKeywordInput from "./SeoKeywordInput";

export default function ArticleSeoCard({
  formData,
  onChange,
  setOgImageFile,
  setTwitterImageFile,
}) {
  const seoTitleLength = formData.metaTitle?.length || 0;
  const seoDescriptionLength = formData.metaDescription?.length || 0;

  const ogTitleLength = formData.ogTitle?.length || 0;
  const ogDescriptionLength = formData.ogDescription?.length || 0;

  const twitterTitleLength = formData.twitterTitle?.length || 0;
  const twitterDescriptionLength = formData.twitterDescription?.length || 0;

  const handleOgImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setOgImageFile) {
      setOgImageFile(file);
    }
  };

  const handleTwitterImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setTwitterImageFile) {
      setTwitterImageFile(file);
    }
  };

  return (
    <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-white to-amber-50 p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">تنظیمات سئو</h2>
          <p className="mt-1 text-sm text-slate-500">
            عنوان متا، توضیحات متا، کلمات کلیدی، ربات‌ها، شبکه‌های اجتماعی و
            اسکیما را تنظیم کنید.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-white px-3 py-2 text-xs text-amber-700">
          SEO
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic SEO */}
        <div className="space-y-5">
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-800">
              سئوی پایه
            </h3>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              عنوان متا
            </label>

            <input
              type="text"
              value={formData.metaTitle || ""}
              onChange={(e) => onChange("metaTitle", e.target.value)}
              placeholder="عنوان سئو برای گوگل"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div
              className={`mt-1 text-xs ${
                seoTitleLength > 70 ? "text-red-500" : "text-slate-400"
              }`}
            >
              تعداد کاراکتر: {seoTitleLength} / 70
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              توضیحات متا
            </label>

            <textarea
              rows={4}
              value={formData.metaDescription || ""}
              onChange={(e) => onChange("metaDescription", e.target.value)}
              placeholder="توضیح کوتاه برای نتایج جستجو"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div
              className={`mt-1 text-xs ${
                seoDescriptionLength > 180 ? "text-red-500" : "text-slate-400"
              }`}
            >
              تعداد کاراکتر: {seoDescriptionLength} / 180
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              کلمه کلیدی اصلی
            </label>

            <input
              type="text"
              value={formData.focusKeyword || ""}
              onChange={(e) => onChange("focusKeyword", e.target.value)}
              placeholder="مثلاً خرید مواد اولیه دارویی"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>

          <SeoKeywordInput
            keywords={formData.secondaryKeywords || []}
            onChange={(keywords) => onChange("secondaryKeywords", keywords)}
            label="کلمات کلیدی فرعی"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search Intent
            </label>

            <select
              value={formData.searchIntent || ""}
              onChange={(e) => onChange("searchIntent", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            >
              <option value="">انتخاب کنید</option>
              <option value="informational">Informational</option>
              <option value="commercial">Commercial</option>
              <option value="transactional">Transactional</option>
              <option value="navigational">Navigational</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Canonical URL
            </label>

            <input
              type="url"
              dir="ltr"
              value={formData.canonicalUrl || ""}
              onChange={(e) => onChange("canonicalUrl", e.target.value)}
              placeholder="https://example.com/articles/sample"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>
        </div>

        {/* Robots */}
        <div className="space-y-5 border-t border-amber-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800">
            تنظیمات Robots
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(formData.noIndex)}
                onChange={(e) => onChange("noIndex", e.target.checked)}
              />
              No Index
            </label>

            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(formData.noFollow)}
                onChange={(e) => onChange("noFollow", e.target.checked)}
              />
              No Follow
            </label>

            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(formData.noArchive)}
                onChange={(e) => onChange("noArchive", e.target.checked)}
              />
              No Archive
            </label>

            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(formData.noSnippet)}
                onChange={(e) => onChange("noSnippet", e.target.checked)}
              />
              No Snippet
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Max Snippet
              </label>
              <input
                type="number"
                value={formData.maxSnippet ?? -1}
                onChange={(e) => onChange("maxSnippet", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Max Image Preview
              </label>
              <select
                value={formData.maxImagePreview || "large"}
                onChange={(e) => onChange("maxImagePreview", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
              >
                <option value="none">none</option>
                <option value="standard">standard</option>
                <option value="large">large</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Max Video Preview
              </label>
              <input
                type="number"
                value={formData.maxVideoPreview ?? -1}
                onChange={(e) => onChange("maxVideoPreview", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Open Graph */}
        <div className="space-y-5 border-t border-amber-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800">
            Open Graph
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              OG Title
            </label>

            <input
              type="text"
              value={formData.ogTitle || ""}
              onChange={(e) => onChange("ogTitle", e.target.value)}
              placeholder="عنوان برای اشتراک‌گذاری"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div className="mt-1 text-xs text-slate-400">
              تعداد کاراکتر: {ogTitleLength}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              OG Description
            </label>

            <textarea
              rows={3}
              value={formData.ogDescription || ""}
              onChange={(e) => onChange("ogDescription", e.target.value)}
              placeholder="توضیح برای شبکه‌های اجتماعی"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div className="mt-1 text-xs text-slate-400">
              تعداد کاراکتر: {ogDescriptionLength}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              OG Image URL
            </label>

            <input
              type="url"
              dir="ltr"
              value={formData.ogImage || ""}
              onChange={(e) => onChange("ogImage", e.target.value)}
              placeholder="https://example.com/og-image.jpg"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              آپلود OG Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleOgImageChange}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 file:ml-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              OG Image Alt
            </label>

            <input
              type="text"
              value={formData.ogImageAlt || ""}
              onChange={(e) => onChange("ogImageAlt", e.target.value)}
              placeholder="توضیح تصویر برای Open Graph"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              OG Type
            </label>

            <select
              value={formData.ogType || "article"}
              onChange={(e) => onChange("ogType", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            >
              <option value="article">article</option>
              <option value="website">website</option>
            </select>
          </div>
        </div>

        {/* Twitter */}
        <div className="space-y-5 border-t border-amber-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800">
            Twitter Card
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Twitter Title
            </label>

            <input
              type="text"
              value={formData.twitterTitle || ""}
              onChange={(e) => onChange("twitterTitle", e.target.value)}
              placeholder="عنوان برای Twitter/X"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div className="mt-1 text-xs text-slate-400">
              تعداد کاراکتر: {twitterTitleLength}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Twitter Description
            </label>

            <textarea
              rows={3}
              value={formData.twitterDescription || ""}
              onChange={(e) => onChange("twitterDescription", e.target.value)}
              placeholder="توضیح برای Twitter/X"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />

            <div className="mt-1 text-xs text-slate-400">
              تعداد کاراکتر: {twitterDescriptionLength}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Twitter Image URL
            </label>

            <input
              type="url"
              dir="ltr"
              value={formData.twitterImage || ""}
              onChange={(e) => onChange("twitterImage", e.target.value)}
              placeholder="https://example.com/twitter-image.jpg"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              آپلود Twitter Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleTwitterImageChange}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 file:ml-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Twitter Image Alt
            </label>

            <input
              type="text"
              value={formData.twitterImageAlt || ""}
              onChange={(e) => onChange("twitterImageAlt", e.target.value)}
              placeholder="توضیح تصویر Twitter"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Twitter Card Type
            </label>

            <select
              value={formData.twitterCard || "summary_large_image"}
              onChange={(e) => onChange("twitterCard", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            >
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>
        </div>

        {/* Sitemap */}
        <div className="space-y-5 border-t border-amber-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800">
            Sitemap
          </h3>

          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(formData.includeInSitemap)}
              onChange={(e) => onChange("includeInSitemap", e.target.checked)}
            />
            نمایش در Sitemap
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={formData.sitemapPriority ?? 0.7}
                onChange={(e) => onChange("sitemapPriority", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Changefreq
              </label>

              <select
                value={formData.sitemapChangefreq || "weekly"}
                onChange={(e) => onChange("sitemapChangefreq", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
              >
                <option value="always">always</option>
                <option value="hourly">hourly</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
                <option value="never">never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schema */}
        <div className="space-y-5 border-t border-amber-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800">
            Schema
          </h3>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Schema Type
            </label>

            <select
              value={formData.schemaType || "BlogPosting"}
              onChange={(e) => onChange("schemaType", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400"
            >
              <option value="Article">Article</option>
              <option value="BlogPosting">BlogPosting</option>
              <option value="NewsArticle">NewsArticle</option>
              <option value="TechArticle">TechArticle</option>
              <option value="HowTo">HowTo</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              اسکیما JSON-LD
            </label>

            <textarea
              dir="ltr"
              rows={10}
              value={formData.seoSchema || "{}"}
              onChange={(e) => onChange("seoSchema", e.target.value)}
              placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Article"\n}`}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-sm text-green-300 outline-none transition focus:border-amber-400"
            />

            <p className="mt-2 text-xs text-slate-500">
              در این بخش می‌توانید اسکیما مقاله را به صورت JSON-LD وارد کنید.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
