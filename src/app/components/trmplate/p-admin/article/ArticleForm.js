"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

import ArticleBasicInfoCard from "./ArticleBasicInfoCard";
import ArticleContentCard from "./ArticleContentCard";
import ArticleCoverCard from "./ArticleCoverCard";
import ArticleMetaCard from "./ArticleMetaCard";
import ArticleSeoCard from "./ArticleSeoCard";
import ArticlePublishCard from "./ArticlePublishCard";

function normalizeInitialData(article) {
  return {
    title: article?.title || "",
    slug: article?.slug || "",
    authorName: article?.authorName || "",
    category: article?.category?._id || article?.category || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    readingTime: article?.readingTime || "",
    cover: article?.cover || "",
    tags: Array.isArray(article?.tags) ? article.tags : [],
    status: article?.status || "draft",
    publishedAt: article?.publishedAt
      ? new Date(article.publishedAt).toISOString().slice(0, 16)
      : "",
    metaData: {
      title: article?.metaData?.title || "",
      description: article?.metaData?.description || "",
      keywords: Array.isArray(article?.metaData?.keywords)
        ? article.metaData.keywords
        : [],
    },
    seoSchema: article?.seoSchema
      ? typeof article.seoSchema === "string"
        ? article.seoSchema
        : JSON.stringify(article.seoSchema, null, 2)
      : "",
  };
}

export default function ArticleForm({
  mode = "create",
  article = null,
  categories = [],
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState(normalizeInitialData(article));
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(article?.cover || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageTitle = useMemo(() => {
    return formData.title?.trim() || "بدون عنوان";
  }, [formData.title]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateMetaData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      metaData: {
        ...prev.metaData,
        [field]: value,
      },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      swal({ title: "عنوان مقاله الزامی است", icon: "warning", buttons: "باشه" });
      return;
    }

    if (!formData.authorName.trim()) {
      swal({ title: "نام نویسنده الزامی است", icon: "warning", buttons: "باشه" });
      return;
    }

    if (!formData.category) {
      swal({ title: "دسته‌بندی مقاله را انتخاب کنید", icon: "warning", buttons: "باشه" });
      return;
    }

    if (!formData.excerpt.trim()) {
      swal({ title: "خلاصه مقاله الزامی است", icon: "warning", buttons: "باشه" });
      return;
    }

    if (!formData.content.trim()) {
      swal({ title: "محتوای مقاله الزامی است", icon: "warning", buttons: "باشه" });
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new FormData();

      body.append("title", formData.title);
      body.append("slug", formData.slug);
      body.append("authorName", formData.authorName);
      body.append("category", formData.category);
      body.append("excerpt", formData.excerpt);
      body.append("content", formData.content);
      body.append("readingTime", String(formData.readingTime || ""));
      body.append("status", formData.status);
      body.append("publishedAt", formData.publishedAt || "");
      body.append("tags", JSON.stringify(formData.tags || []));
      body.append("metaData", JSON.stringify(formData.metaData || {}));
      body.append("seoSchema", formData.seoSchema || "");

      if (coverFile) {
        body.append("cover", coverFile);
      }

      const url = isEdit
        ? `/api/admin/articles/${article._id}`
        : `/api/admin/articles`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body,
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        swal({
          title: data?.message || "خطا در ثبت مقاله",
          icon: "error",
          buttons: "باشه",
        });
        return;
      }

      await swal({
        title: isEdit ? "مقاله با موفقیت بروزرسانی شد" : "مقاله با موفقیت ایجاد شد",
        icon: "success",
        buttons: "باشه",
      });

      router.push("/p-admin/articles");
      router.refresh();
    } catch (error) {
      console.error("Article submit error:", error);
      swal({
        title: "خطای سرور",
        text: "در ثبت مقاله مشکلی رخ داد",
        icon: "error",
        buttons: "باشه",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="space-y-6 xl:col-span-8">
        <ArticleBasicInfoCard
          formData={formData}
          categories={categories}
          onChange={updateField}
        />

        <ArticleContentCard
          formData={formData}
          onChange={updateField}
        />

        <ArticleSeoCard
          formData={formData}
          updateMetaData={updateMetaData}
          onChange={updateField}
        />
      </div>

      <div className="space-y-6 xl:col-span-4">
        <ArticleCoverCard
          coverPreview={coverPreview}
          setCoverPreview={setCoverPreview}
          setCoverFile={setCoverFile}
          currentImage={article?.cover || ""}
        />

        <ArticleMetaCard
          formData={formData}
          onChange={updateField}
        />

        <ArticlePublishCard
          pageTitle={pageTitle}
          formData={formData}
          onChange={updateField}
          isSubmitting={isSubmitting}
          isEdit={isEdit}
        />
      </div>
    </form>
  );
}
