"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert";
import dynamic from "next/dynamic";

const CKEditorComponent = dynamic(() => import("../../../module/ckeditor/CKEditorWrapper"), { ssr: false });


export default function EditProjectForm({ project, projectId }) {
  const router = useRouter();

const [projectInfo, setProjectInfo] = useState({
  title: project.title || "",
  slug: project.slug || "",
  link: project.link || "",
  category: project.category || "",
  longDescription: project.longDescription || "",
  shortDescription: project.shortDescription || "",
  tags: Array.isArray(project.tags) ? project.tags.join(",") : (project.tags || ""),
  thumbnail: project.thumbnail || null,
  mainPicture: project.mainPicture || null,
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(projectInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.set("tags", JSON.stringify(projectInfo.tags.split(",")));

    const res = await fetch(`/api/project/${projectId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      Swal({
        title: "پروژه با موفقیت ویرایش شد",
        icon: "success",
        buttons: "باشه",
      }).then(() => {
        router.replace("/p-admin/portfolio");
      });
    } else {
      Swal({
        title: "خطا در ویرایش پروژه",
        icon: "error",
        buttons: "فهمیدم",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">ویرایش پروژه</h2>

      {/* اطلاعات پایه دوره */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" type="text" placeholder="عنوان پروژه" value={projectInfo.title} onChange={(e) => setProjectInfo({ ...projectInfo, title: e.target.value })} />
        <input className="input" type="text" placeholder="نامک پروژه" value={projectInfo.slug} onChange={(e) => setProjectInfo({ ...projectInfo, slug: e.target.value })} />
        <input className="input" type="text" placeholder="دسته‌بندی" value={projectInfo.category} onChange={(e) => setProjectInfo({ ...projectInfo, category: e.target.value })} />
        <input className="input" type="text" placeholder=" توضیح کوتاه" value={projectInfo.shortDescription} onChange={(e) => setProjectInfo({ ...projectInfo, shortDescription: e.target.value })} />
        <input className="input" type="text" placeholder="  لینک" value={projectInfo.link} onChange={(e) => setProjectInfo({ ...projectInfo, link: e.target.value })} />
      </div>
      <label className="font-medium text-primary">محتوای پروژه</label>
      <div className="overflow-x-auto">
        <CKEditorComponent
          value={projectInfo.longDescription}
          onChange={(data) => setProjectInfo((prev) => ({ ...prev, longDescription: data }))}
        />
      </div>

      <input className="input" type="text" placeholder="تگ‌ها (با , جدا کنید)" value={projectInfo.tags} onChange={(e) => setProjectInfo({ ...projectInfo, tags: e.target.value })} />

      {/* آپلود فایل‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">تصویر پوستر (اختیاری):</label>
          <input type="file" accept="image/*" onChange={(e) => setProjectInfo({ ...projectInfo, thumbnail: e.target.files[0] })} className="input" />
        </div>
        <div>
          <label className="block text-sm mb-1">تصویر شاخص (اختیاری):</label>
          <input type="file" accept="image/*" onChange={(e) => setProjectInfo({ ...projectInfo, mainPicture: e.target.files[0] })} className="input" />
        </div>
      </div>
      <div className="pt-6">
        <button type="submit" className="bg-primary hover:bg-primary/90 cursor-pointer text-white px-6 py-3 rounded-xl shadow">ذخیره تغییرات</button>
      </div>
    </form>
  );
}
