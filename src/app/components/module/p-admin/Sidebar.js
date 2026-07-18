"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    label: "داشبورد",
    href: "/p-admin",
    icon: HiOutlineSquares2X2,
  },
  {
    label: "نمونه کار",
    href: "/p-admin/portfolio",
    icon: HiOutlineBriefcase,
  },
  {
    label: "مقالات",
    href: "/p-admin/articles",
    icon: HiOutlineDocumentText,
  },
  {
    label: "دسته‌بندی",
    href: "/p-admin/articles/categories",
    icon: HiOutlineFolder,
  },
];

export default function Sidebar() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/p-admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-l border-slate-100 bg-white px-3 py-4 font-yekan-bakh shadow-[0_20px_60px_rgba(15,23,42,0.035)] md:w-64 md:px-4">
      <Link
        href="/"
        className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
        aria-label="بازگشت به صفحه اصلی"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="32"
          viewBox="0 0 52.25 59.312"
          aria-hidden="true"
        >
          <g transform="translate(-742.691 -73.077)">
            <path
              d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
              transform="translate(-2975)"
              fill="#173372"
            />
            <path
              d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
              transform="translate(-3207.251 -96.367)"
              fill="#ff9436"
            />
          </g>
        </svg>
      </Link>

      <div className="mt-5 hidden text-center md:block">
        <p className="text-sm font-semibold text-slate-800">مدیریت تیوان</p>
        <p className="mt-1 text-[11px] font-medium text-slate-400">
          Admin Workspace
        </p>
      </div>

      <nav
        className="mt-9 flex flex-1 flex-col gap-1.5"
        aria-label="منوی مدیریت"
      >
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

    </aside>
  );
}
