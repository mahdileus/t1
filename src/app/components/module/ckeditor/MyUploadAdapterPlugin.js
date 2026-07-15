class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.controller = new AbortController();
  }

  async upload() {
    try {
      const file = await this.loader.file;

      if (!file) {
        throw new Error("فایلی برای آپلود انتخاب نشده است");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        signal: this.controller.signal,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "خطا در آپلود تصویر");
      }

      if (!result?.url) {
        throw new Error("آدرس تصویر از سرور دریافت نشد");
      }

      return {
        default: result.url,
      };
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("آپلود تصویر لغو شد");
      }

      throw new Error(error.message || "خطا در آپلود تصویر");
    }
  }

  abort() {
    this.controller.abort();
  }
}

export default function MyUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
