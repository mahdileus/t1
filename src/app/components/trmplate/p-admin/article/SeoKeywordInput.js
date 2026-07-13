"use client";

import { useState } from "react";

export default function SeoKeywordInput({ keywords = [], onChange }) {
  const [input, setInput] = useState("");

  const addKeyword = () => {
    const value = input.trim();
    if (!value) return;
    if (keywords.includes(value)) {
      setInput("");
      return;
    }

    onChange([...keywords, value]);
    setInput("");
  };

  const removeKeyword = (keyword) => {
    onChange(keywords.filter((item) => item !== keyword));
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        کلمات کلیدی سئو
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="مثلاً خرید کفش ورزشی"
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
        />
        <button
          type="button"
          onClick={addKeyword}
          className="rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          افزودن
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-700 hover:bg-red-50 hover:text-red-600"
            >
              {keyword} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
