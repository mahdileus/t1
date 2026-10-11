"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import {
  SiAndroid,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
} from "react-icons/si";

const programmingLinks = [
  {
    name: "اندروید",
    path: "/programming/android",
    icon: SiAndroid,
    color: "#3DDC84",
  },
  {
    name: "React",
    path: "/programming/react",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    path: "/programming/next",
    icon: SiNextdotjs,
    color: "#111111",
  },
  {
    name: "Laravel",
    path: "/programming/laravel",
    icon: SiLaravel,
    color: "#FF2D20",
  },
  {
    name: "PHP",
    path: "/programming/php",
    icon: SiPhp,
    color: "#777BB4",
  },
  {
    name: "Node.js",
    path: "/programming/node",
    icon: SiNodedotjs,
    color: "#5FA04E",
  },
];

const links = [
  {
    name: "صفحه اصلی",
    path: "/",
  },
  {
    name: "سئو",
    path: "/seo",
  },
  {
    name: "طراحی وبسایت",
    path: "/web-design",
  },
  {
    name: "نمونه کار ها",
    path: "/portfolios",
  },
  {
    name: "مقالات",
    path: "/articles",
  },
  {
    name: "درباره ما",
    path: "/about-us",
  },
  {
    name: "تماس باما",
    path: "/contact-us",
  },
];

export default function MobileNav({ onClick }) {
  const pathName = usePathname();

  const [programmingOpen, setProgrammingOpen] = useState(
    pathName.startsWith("/programming")
  );

  const handleLinkClick = () => {
    onClick?.();
  };

  return (
    <nav
      className="
        flex
        flex-col
        items-start
        gap-y-2
        pt-4
        font-yekan-bakh
        text-base
        text-primary
      "
    >
      {/* صفحه اصلی / سئو / طراحی سایت */}
      {links.slice(0, 3).map((link) => (
        <Link
          href={link.path}
          key={link.path}
          onClick={handleLinkClick}
          className={`
            w-full
            rounded-xl
            px-3
            py-2.5
            font-medium
            transition-all
            ${
              pathName === link.path
                ? "bg-white text-secondery shadow-sm"
                : "hover:bg-white/70 hover:text-secondery"
            }
          `}
        >
          {link.name}
        </Link>
      ))}

      {/* Programming */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setProgrammingOpen((prev) => !prev)}
          className={`
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            px-3
            py-2.5
            font-medium
            transition-all
            ${
              pathName.startsWith("/programming")
                ? "bg-white text-secondery shadow-sm"
                : "hover:bg-white/70 hover:text-secondery"
            }
          `}
        >
          <span>برنامه نویسی</span>

          <IoChevronDownOutline
            className={`
              transition-transform
              duration-300
              ${programmingOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        <div
          className={`
            grid
            overflow-hidden
            transition-all
            duration-300
            ${
              programmingOpen
                ? "mt-2 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="min-h-0">
            <div
              className="
                mr-3
                grid
                grid-cols-2
                gap-2
                border-r
                border-primary/10
                pr-3
              "
            >
              {programmingLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleLinkClick}
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-2.5
                      py-3
                      text-xs
                      transition-all
                      ${
                        pathName === item.path
                          ? "border-secondery/20 bg-white text-secondery"
                          : "border-white/50 bg-white/50 hover:bg-white"
                      }
                    `}
                  >
                    <span
                      className="
                        flex
                        size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                      "
                    >
                      <Icon
                        size={17}
                        style={{ color: item.color }}
                      />
                    </span>

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/programming"
              onClick={handleLinkClick}
              className="
                mr-6
                mt-3
                inline-flex
                text-xs
                font-medium
                text-secondery
              "
            >
              مشاهده همه خدمات برنامه نویسی ←
            </Link>
          </div>
        </div>
      </div>

      {/* بقیه منو */}
      {links.slice(3).map((link) => (
        <Link
          href={link.path}
          key={link.path}
          onClick={handleLinkClick}
          className={`
            w-full
            rounded-xl
            px-3
            py-2.5
            font-medium
            transition-all
            ${
              pathName === link.path
                ? "bg-white text-secondery shadow-sm"
                : "hover:bg-white/70 hover:text-secondery"
            }
          `}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}