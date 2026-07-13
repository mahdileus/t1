"use client";

import { useState } from "react";

export default function ArticleMetaCard({ formData, onChange }) {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (formData.tags.includes(value)) {
      setTagInput("");
      return;
    }

    onChange("tags", [...formData.tags, value]);
    setTagInput("");
  };

  const removeTag = (tag) => {
    onChange(
      "tags",
      formData.tags.filter((item) => item !== tag)
    );
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-800">مشخصات تکمیلی</h2>
        <p className="mt-1 text-sm text-slate-500">
          زمان مطالعه و تگ‌های مقاله را وارد کنید.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            زمان مطالعه
          </label>
          <input
            type="number"
            min="1"
            value={formData.readingTime}
            onChange={(e) => onChange("readingTime", e.target.value)}
            placeholder="مثلاً 5"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            تگ‌ها
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="مثلاً سئو"
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
            <button
              type="button"
              onClick={addTag}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              افزودن
            </button>
          </div>

          {formData.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-red-50 hover:text-red-600"
                >
                  {tag} ×
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
