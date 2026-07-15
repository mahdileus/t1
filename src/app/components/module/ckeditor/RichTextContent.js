"use client";

import DOMPurify from "dompurify";

export default function RichTextContent({ html, className = "" }) {
  if (!html) return null;

  const cleanHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "target",
      "rel",
      "allow",
      "allowfullscreen",
      "frameborder",
      "loading",
    ],
  });

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
