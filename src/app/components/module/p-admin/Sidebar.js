"use client"
import { CiFileOn } from "react-icons/ci";
import { IoCodeWorking } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem";



export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();

  return (
    <aside className="w-20 md:w-64 bg-white p-4 flex flex-col items-center gap-4 border-l border-primary">
      <Link href="/" >
        <svg xmlns="http://www.w3.org/2000/svg" width="52.25" height="59.312" viewBox="0 0 52.25 59.312">
          <g id="logo" transform="translate(-742.691 -73.077)">
            <path id="Path_1894" data-name="Path 1894"
              d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
              transform="translate(-2975)" fill="#173372" />
            <path id="Path_1895" data-name="Path 1895"
              d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
              transform="translate(-3207.251 -96.367)" fill="#ff9436" />
          </g>
        </svg>
      </Link>

      <nav className="flex flex-col justify-between h-full w-full text-sm mt-12 text-cream">
        <div className="flex flex-col gap-4">

          <SidebarItem icon={<IoCodeWorking className="w-8 h-8" />} label="نمونه کار" href="/p-admin/portfolio" />
          <SidebarItem icon={<CiFileOn className="w-8 h-8" />} label="مقالات" href="/p-admin/posts" />

        </div>
      </nav>
    </aside>
  );
}
