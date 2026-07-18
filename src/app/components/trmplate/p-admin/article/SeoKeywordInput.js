"use client";

import { useState } from "react";

export default function SeoKeywordInput({
  label = "کلمات کلیدی",
  placeholder = "کلمه را وارد کنید و Enter بزنید",
  helpText = "",
  keywords = [],
  onChange,
  maxItems,
}) {
  const [input, setInput] = useState("");

  const safeKeywords = Array.isArray(keywords) ? keywords : [];

  const addKeyword = () => {
    const value = input.trim();

    if (!value) return;

    const exists = safeKeywords.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      setInput("");
      return;
    }

    if (maxItems && safeKeywords.length >= maxItems) {
      setInput("");
      return;
    }

    onChange([...safeKeywords, value]);
    setInput("");
  };

  const removeKeyword = (keyword) => {
    onChange(safeKeywords.filter((item) => item !== keyword));
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addKeyword();
    }

    if (event.key === "," || event.key === "،") {
      event.preventDefault();
      addKeyword();
    }
  };

  const canAdd = !maxItems || safeKeywords.length < maxItems;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>

        {maxItems ? (
          <span
            className={`text-xs ${
              safeKeywords.length >= maxItems
                ? "text-red-500"
                : "text-slate-400"
            }`}
          >
            {safeKeywords.length} / {maxItems}
          </span>
        ) : null}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keyDownHandler}
          placeholder={placeholder}
          disabled={!canAdd}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        />

        <button
          type="button"
          onClick={addKeyword}
          disabled={!canAdd}
          className="rounded-2xl border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300"
        >
          افزودن
        </button>
      </div>

      {helpText ? (
        <p className="mt-1.5 text-xs leading-5 text-slate-400">{helpText}</p>
      ) : null}

      {safeKeywords.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {safeKeywords.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
              title="حذف"
            >
              {keyword} ×
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
