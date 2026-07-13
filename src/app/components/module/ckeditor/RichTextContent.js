"use client";

import DOMPurify from "dompurify";

export default function RichTextContent({ html, className = "" }) {
  if (!html) return null;

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
