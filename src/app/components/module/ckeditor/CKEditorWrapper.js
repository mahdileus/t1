"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapterPlugin from "./MyUploadAdapterPlugin";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((m) => m.CKEditor),
  { ssr: false }
);

export default function CKEditorWrapper({ value, onChange }) {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  return (
    <div className="bg-white border rounded-md p-3 text-right">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          language: "fa",
          placeholder: "توضیحات کامل محصول را اینجا بنویسید...",
          extraPlugins: [MyUploadAdapterPlugin],

          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "highlight",
              "|",
              "alignment",
              "|",
              "link",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "imageUpload",
              "blockQuote",
              "insertTable",
              "mediaEmbed",
              "horizontalLine",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },

          heading: {
            options: [
              {
                model: "paragraph",
                title: "پاراگراف",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "تیتر بزرگ",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "تیتر",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "زیر تیتر",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "عنوان کوچک",
                class: "ck-heading_heading4",
              },
            ],
          },

          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "toggleImageCaption",
            ],
          },

          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableCellProperties",
              "tableProperties",
            ],
          },

          link: {
            addTargetToExternalLinks: true,
          },
        }}

        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
