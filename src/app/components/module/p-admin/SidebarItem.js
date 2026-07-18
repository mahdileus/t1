"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ icon: Icon, label, href }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/p-admin" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      title={label}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex h-11 items-center justify-center gap-3 rounded-2xl px-3 text-sm font-medium transition-all duration-200 md:justify-start ${
        isActive
          ? "bg-slate-50 text-primary ring-1 ring-slate-100"
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      <span
        className={`absolute right-2 h-1.5 w-1.5 rounded-full bg-secondery transition-all duration-200 ${
          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        aria-hidden="true"
      />

      <Icon
        className={`h-5 w-5 shrink-0 stroke-[1.7] transition-colors ${
          isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
        }`}
        aria-hidden="true"
      />

      <span className="hidden truncate md:block">{label}</span>
    </Link>
  );
}
