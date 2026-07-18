"use client";

export default function ArticleMetaCard({ formData, onChange }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          تنظیمات انتشار و نمایش
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          وضعیت انتشار، مقاله ویژه، تاریخ انتشار و تاریخ بروزرسانی محتوا را
          تنظیم کنید.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              وضعیت مقاله
              <span className="mr-1 text-red-500">*</span>
            </label>

            <select
              value={formData.status || "draft"}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            >
              <option value="draft">پیش‌نویس</option>
              <option value="published">منتشر شده</option>
              <option value="archived">آرشیو شده</option>
            </select>

            <p className="mt-1 text-xs text-slate-400">
              فقط مقالات منتشر شده در سایت عمومی نمایش داده می‌شوند.
            </p>
          </div>

          {/* Visibility */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              سطح نمایش
            </label>

            <select
              value={formData.visibility || "public"}
              onChange={(e) => onChange("visibility", e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            >
              <option value="public">عمومی</option>
              <option value="private">خصوصی</option>
              <option value="password">رمزدار</option>
            </select>
          </div>

          {/* Password */}
          {formData.visibility === "password" ? (
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                رمز عبور مقاله
              </label>

              <input
                type="text"
                value={formData.password || ""}
                onChange={(e) => onChange("password", e.target.value)}
                placeholder="رمز عبور برای مشاهده مقاله"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Featured */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => onChange("featured", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />

                <span>
                  <span className="block text-sm font-medium text-slate-800">
                    مقاله ویژه
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    برای نمایش در بخش‌های ویژه، اسلایدرها یا لیست‌های منتخب.
                  </span>
                </span>
              </label>
            </div>

            {/* Allow Comments */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(formData.allowComments)}
                  onChange={(e) => onChange("allowComments", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />

                <span>
                  <span className="block text-sm font-medium text-slate-800">
                    فعال بودن دیدگاه‌ها
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    اگر سیستم کامنت دارید، با این گزینه نمایش کامنت‌ها کنترل
                    می‌شود.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              تاریخ‌های محتوا
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              این تاریخ‌ها برای نمایش عمومی، Schema و freshness محتوایی کاربرد
              دارند.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Published At */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                تاریخ انتشار
              </label>

              <input
                type="datetime-local"
                value={formData.publishedAt || ""}
                onChange={(e) => onChange("publishedAt", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <p className="mt-1 text-xs text-slate-400">
                اگر خالی باشد، API می‌تواند هنگام انتشار مقداردهی کند.
              </p>
            </div>

            {/* Content Updated At */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                تاریخ بروزرسانی محتوایی
              </label>

              <input
                type="datetime-local"
                value={formData.contentUpdatedAt || ""}
                onChange={(e) => onChange("contentUpdatedAt", e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <p className="mt-1 text-xs text-slate-400">
                برای نمایش «آخرین بروزرسانی» و `dateModified` در Schema.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              اطلاعات نمایشی اختیاری
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Source Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                نام منبع
              </label>

              <input
                type="text"
                value={formData.sourceName || ""}
                onChange={(e) => onChange("sourceName", e.target.value)}
                placeholder="مثلاً Google Search Central"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            {/* Source URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                لینک منبع
              </label>

              <input
                type="url"
                dir="ltr"
                value={formData.sourceUrl || ""}
                onChange={(e) => onChange("sourceUrl", e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus:border-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
