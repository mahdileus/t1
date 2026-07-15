"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapterPlugin from "./MyUploadAdapterPlugin";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor),
  {
    ssr: false,
    loading: () => (
      <div className="editor-loading">
        در حال بارگذاری ویرایشگر...
      </div>
    ),
  }
);

export default function CKEditorWrapper({
  value = "",
  onChange,
  placeholder = "متن خود را اینجا بنویسید...",
  minHeight = 360,
}) {
  const editorConfig = useMemo(
    () => ({
      language: "fa",
      placeholder,
      extraPlugins: [MyUploadAdapterPlugin],

      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "|",
          "imageUpload",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
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
            title: "تیتر اصلی",
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
            title: "زیرتیتر",
            class: "ck-heading_heading3",
          },
        ],
      },

      image: {
        resizeUnit: "%",
        toolbar: [
          "imageTextAlternative",
          "toggleImageCaption",
          "|",
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
        ],
      },

      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },

      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          openInNewTab: {
            mode: "manual",
            label: "باز شدن در تب جدید",
            attributes: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        },
      },

      mediaEmbed: {
        previewsInData: true,
      },
    }),
    [placeholder]
  );

  return (
    <div
      className="editor-wrapper"
      style={{ "--editor-min-height": `${minHeight}px` }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={editorConfig}
        onReady={(editor) => {
          const editableElement = editor.ui.view.editable.element;

          if (editableElement) {
            editableElement.setAttribute("dir", "rtl");
            editableElement.setAttribute("lang", "fa");
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (typeof onChange === "function") {
            onChange(data);
          }
        }}
      />
    </div>
  );
}
