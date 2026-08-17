"use client";

import DOMPurify from "isomorphic-dompurify";

export default function RichTextContent({ html, className = "" }) {
  if (!html || typeof html !== "string") return null;

  const cleanHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "target",
      "rel",
      "allow",
      "allowfullscreen",
      "frameborder",
      "loading",
      "referrerpolicy",
      "title",
    ],
  });

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
