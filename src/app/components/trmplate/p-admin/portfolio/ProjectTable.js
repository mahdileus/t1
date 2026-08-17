"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { MdDelete, MdModeEdit, MdOpenInNew } from "react-icons/md";

const statusStyles = {
  published: "bg-emerald-100 text-emerald-700",
  draft: "bg-gray-100 text-gray-600",
  archived: "bg-red-100 text-red-600",
};

const statusLabels = {
  published: "منتشر شده",
  draft: "پیش‌نویس",
  archived: "آرشیو شده",
};

export default function ProjectTable({ projects }) {
  const router = useRouter();

  const removeProject = async (project) => {
    const confirm = await swal({
      title: "آیا از حذف این پروژه مطمئن هستی؟",
      text: `«${project.title}» برای همیشه حذف می‌شود`,
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

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-right text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
              <th className="px-4 py-3 font-medium">پروژه</th>
              <th className="px-4 py-3 font-medium">کارفرما</th>
              <th className="px-4 py-3 font-medium">دسته‌بندی</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
              <th className="px-4 py-3 font-medium">ویژه</th>
              <th className="px-4 py-3 font-medium">ترتیب</th>
              <th className="px-4 py-3 font-medium text-left">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b border-gray-100 last:border-b-0 transition hover:bg-gray-50/60"
              >
                {/* پروژه + تصویر */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.imageAlt || project.title}
                        className="h-11 w-11 flex-shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-400">
                        🖼️
                      </div>
                    )}

                    <div className="min-w-0">
                      <Link
                        href={`/portfolios/${project.slug}`}
                        target="_blank"
                        className="block truncate font-semibold text-primary hover:underline"
                      >
                        {project.title}
                      </Link>
                      <span className="text-xs text-gray-400" dir="ltr">
                        /portfolios/{project.slug}
                      </span>
                    </div>
                  </div>
                </td>

                {/* کارفرما */}
                <td className="px-4 py-3 text-gray-700">
                  {project.clientName || "—"}
                </td>

                {/* دسته‌بندی */}
                <td className="px-4 py-3">
                  {project.category ? (
                    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                      {project.category}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>

                {/* وضعیت */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs ${
                      statusStyles[project.status] || statusStyles.draft
                    }`}
                  >
                    {statusLabels[project.status] || project.status}
                  </span>
                </td>

                {/* ویژه */}
                <td className="px-4 py-3">
                  {project.isFeatured ? (
                    <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                      ⭐ ویژه
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>

                {/* ترتیب */}
                <td className="px-4 py-3 text-gray-500">
                  {project.sortOrder ?? 0}
                </td>

                {/* عملیات */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/portfolios/${project.slug}`}
                      target="_blank"
                      title="مشاهده"
                      className="grid h-9 w-9 place-items-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-primary"
                    >
                      <MdOpenInNew className="text-lg" />
                    </Link>

                    <button
                      type="button"
                      title="ویرایش"
                      onClick={() =>
                        router.push(
                          `/p-admin/portfolio/edit-project/${project._id}`
                        )
                      }
                      className="grid h-9 w-9 place-items-center rounded-lg text-third transition hover:bg-third/10"
                    >
                      <MdModeEdit className="text-lg" />
                    </button>

                    <button
                      type="button"
                      title="حذف"
                      onClick={() => removeProject(project)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!projects.length && (
        <div className="py-14 text-center text-gray-400">
          هنوز نمونه‌کاری ثبت نشده است.
        </div>
      )}
    </div>
  );
}
