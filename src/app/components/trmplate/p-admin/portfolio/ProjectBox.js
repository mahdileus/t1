"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function ProjectBox({ project }) {
  const router = useRouter();

  const removeProject = async () => {
    const confirm = await swal({
      title: "آیا از حذف این پروژه مطمئن هستی؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      buttons: ["لغو", "حذف"],
      dangerMode: true,
    });

    if (!confirm) return;

    try {
      const res = await fetch(`/api/project/${project._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return swal({
          title: "خطا",
          text: data.message || "حذف پروژه انجام نشد",
          icon: "error",
          buttons: "فهمیدم",
        });
      }

      swal({
        title: "پروژه با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    } catch (error) {
      swal({
        title: "خطا",
        text: "مشکلی در حذف پروژه به وجود آمد",
        icon: "error",
        buttons: "فهمیدم",
      });
    }
  };

  const handleEditClick = () => {
    router.push(`/p-admin/portfolio/edit-project/${project._id}`);
  };

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 mb-4">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={project.thumbnail}
          alt={project.imageAlt || project.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between pr-4 w-full">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <Link
              href={`/portfolio/${project.slug}`}
              className="text-lg font-semibold text-primary hover:underline text-right block"
              target="_blank"
            >
              {project.title}
            </Link>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.status && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {project.status}
                </span>
              )}

              {project.isFeatured && (
                <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                  ویژه
                </span>
              )}

              {project.clientName && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                  {project.clientName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4">
            <button
              type="button"
              className="text-red-400 hover:text-red-500 text-2xl cursor-pointer"
              onClick={removeProject}
            >
              <MdDelete />
            </button>

            <button
              type="button"
              className="text-third hover:text-third/90 text-2xl cursor-pointer"
              onClick={handleEditClick}
            >
              <MdModeEdit />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2 text-right line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="text-left text-secondery font-bold">
            {project.category}
          </div>

          <div className="text-xs text-gray-500">
            /portfolio/{project.slug}
          </div>
        </div>
      </div>
    </div>
  );
}
