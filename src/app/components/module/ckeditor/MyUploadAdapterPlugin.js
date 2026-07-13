class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.controller = new AbortController();
  }

  async upload() {
    const file = await this.loader.file;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      signal: this.controller.signal,
    });

    if (!response.ok) {
      throw new Error("خطا در آپلود تصویر");
    }

    const data = await response.json();

    if (!data?.url) {
      throw new Error("آدرس تصویر از سرور دریافت نشد");
    }

    return {
      default: data.url,
    };
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
