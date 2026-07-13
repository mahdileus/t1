"use client";

import Link from "next/link";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import {
  CiEdit,
  CiTrash,
  CiImageOn,
  CiCircleCheck,
  CiClock2,
  CiCircleRemove,
} from "react-icons/ci";

function getStatusLabel(status) {
  switch (status) {
    case "published":
      return "منتشر شده";
    case "draft":
      return "پیش‌نویس";
    case "archived":
      return "آرشیو شده";
    default:
      return "نامشخص";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "published":
      return "border-green-200 bg-green-50 text-green-600";
    case "draft":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";
    case "archived":
      return "border-slate-200 bg-slate-100 text-slate-500";
    default:
      return "border-slate-200 bg-slate-50 text-slate-500";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "published":
      return <CiCircleCheck size={16} />;
    case "draft":
      return <CiClock2 size={16} />;
    case "archived":
      return <CiCircleRemove size={16} />;
    default:
      return null;
  }
}

function formatDate(date) {
  if (!date) return "—";

  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  } catch {
    return "—";
  }
}

export default function ArticleRow({ article }) {
  const router = useRouter();

  const categoryTitle = article?.category?.title || "بدون دسته‌بندی";
  const parentCategoryTitle = article?.category?.parent?.title;

  const deleteHandler = async () => {
    const ok = await swal({
      title: `حذف مقاله "${article.title}"؟`,
      text: "بعد از حذف، امکان بازگردانی مقاله وجود ندارد.",
      icon: "warning",
      buttons: ["انصراف", "بله، حذف شود"],
      dangerMode: true,
    });

    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/articles/${article._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        swal({
          title: data?.message || "خطا در حذف مقاله",
          icon: "error",
          buttons: "باشه",
        });

        return;
      }

      swal({
        title: "مقاله با موفقیت حذف شد",
        icon: "success",
        buttons: "باشه",
      });

      router.refresh();
    } catch (error) {
      console.error("Delete article error:", error);

      swal({
        title: "خطای سرور",
        icon: "error",
        buttons: "باشه",
      });
    }
  };

  return (
    <tr className="text-right transition hover:bg-slate-50">
      <td className="px-4 py-3">
        {article?.cover ? (
          <img
            src={article.cover}
            alt={article.title || "cover"}
            className="h-12 w-16 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <CiImageOn size={24} />
          </div>
        )}
      </td>

      <td className="px-4 py-3">
        <div className="max-w-[260px]">
          <p className="line-clamp-1 font-semibold text-slate-800">
            {article.title}
          </p>

          <p dir="ltr" className="mt-1 truncate text-xs text-slate-400">
            {article.slug}
          </p>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="max-w-[180px]">
          <p className="truncate text-slate-700">{categoryTitle}</p>

          {parentCategoryTitle ? (
            <p className="mt-1 truncate text-xs text-slate-400">
              زیرمجموعه {parentCategoryTitle}
            </p>
          ) : null}
        </div>
      </td>

      <td className="px-4 py-3 text-slate-600">
        {article.authorName || "—"}
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClass(
            article.status
          )}`}
        >
          {getStatusIcon(article.status)}
          {getStatusLabel(article.status)}
        </span>
      </td>

      <td className="px-4 py-3 text-slate-600">
        {formatDate(article.publishedAt)}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/p-admin/articles/${article._id}/edit`}
            className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-600 transition hover:bg-blue-500 hover:text-white"
          >
            <CiEdit size={15} />
            ویرایش
          </Link>

          <button
            type="button"
            onClick={deleteHandler}
            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <CiTrash size={15} />
            حذف
          </button>
        </div>
      </td>
    </tr>
  );
}
