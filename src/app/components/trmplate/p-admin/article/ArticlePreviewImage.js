"use client";

export default function ArticlePreviewImage({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-56 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            className="text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 5.75C4 4.7835 4.7835 4 5.75 4H18.25C19.2165 4 20 4.7835 20 5.75V18.25C20 19.2165 19.2165 20 18.25 20H5.75C4.7835 20 4 19.2165 4 18.25V5.75Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M7 16L10.15 12.85C10.6198 12.3802 11.3802 12.3802 11.85 12.85L13 14L14.65 12.35C15.1198 11.8802 15.8802 11.8802 16.35 12.35L20 16"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 9C9.32843 9 10 8.32843 10 7.5C10 6.67157 9.32843 6 8.5 6C7.67157 6 7 6.67157 7 7.5C7 8.32843 7.67157 9 8.5 9Z"
              fill="currentColor"
            />
          </svg>

          <span className="text-sm">پیش‌نمایش تصویر مقاله</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <img
        src={src}
        alt={alt || "پیش‌نمایش تصویر مقاله"}
        className="h-56 w-full object-cover"
      />
    </div>
  );
}
