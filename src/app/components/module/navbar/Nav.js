"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    name: "Android",
    title: "توسعه اندروید",
    description: "Kotlin • Jetpack Compose",
    path: "/programming/android",
    icon: SiAndroid,
    color: "#3DDC84",
  },
  {
    name: "React",
    title: "توسعه React",
    description: "React • SPA • Web App",
    path: "/programming/react",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    title: "توسعه Next.js",
    description: "SSR • SEO • Full Stack",
    path: "/programming/next",
    icon: SiNextdotjs,
    color: "#111111",
  },
  {
    name: "Laravel",
    title: "توسعه Laravel",
    description: "Backend • API • Web App",
    path: "/programming/laravel",
    icon: SiLaravel,
    color: "#FF2D20",
  },
  {
    name: "PHP",
    title: "برنامه نویسی PHP",
    description: "Backend • API • Server",
    path: "/programming/php",
    icon: SiPhp,
    color: "#777BB4",
  },
  {
    name: "Node.js",
    title: "توسعه Node.js",
    description: "Backend • API • Realtime",
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
    name: "برنامه نویسی",
    path: "/programming",
    children: programmingLinks,
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

export default function Nav() {
  const pathName = usePathname();

  const isActive = (path) => {
    if (path === "/") return pathName === "/";
    return pathName === path || pathName.startsWith(`${path}/`);
  };

  return (
    <nav className="hidden items-center justify-around px-1.5 pt-4 font-yekan-bakh text-base text-primary lg:flex lg:text-lg">
      {links.map((link) => {
        const active = isActive(link.path);

        if (link.children) {
          return (
            <div key={link.path} className="group relative">
              <Link
                href={link.path}
                className={`
                  flex items-center gap-1.5
                  px-4 pb-4
                  font-medium
                  transition-all duration-300
                  hover:text-secondery
                  ${
                    active
                      ? "text-primary"
                      : ""
                  }
                `}
              >
                {link.name}

                <IoChevronDownOutline
                  className="
                    text-sm
                    transition-transform
                    duration-300
                    group-hover:rotate-180
                  "
                />
              </Link>

              {/* خط Active */}
              {active && (
                <span
                  className="
                    absolute
                    bottom-2
                    right-4
                    left-4
                    h-[2px]
                    rounded-full
                    bg-secondery
                  "
                />
              )}

              {/* Dropdown */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-1/2
                  top-full
                  z-[999]
                  w-[580px]
                  translate-x-1/2
                  translate-y-3
                  opacity-0
                  transition-all
                  duration-300

                  group-hover:pointer-events-auto
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              >
                {/* پل بین منو و Dropdown */}
                <div className="h-3" />

                <div
                  className="
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/60
                    bg-white/95
                    p-3
                    shadow-[0_25px_80px_rgba(23,51,114,0.18)]
                    backdrop-blur-2xl
                  "
                >


                  {/* Technologies */}
                  <div className="grid grid-cols-2 gap-2">
                    {link.children.map((item) => {
                      const Icon = item.icon;
                      const itemActive = isActive(item.path);

                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`
                            group/item
                            relative
                            flex
                            items-center
                            gap-3
                            overflow-hidden
                            rounded-[18px]
                            border
                            p-3
                            transition-all
                            duration-300

                            ${
                              itemActive
                                ? "border-secondery/30 bg-[#fff8f2]"
                                : "border-gray-100 bg-[#f8f9fc] hover:border-secondery/20 hover:bg-white"
                            }
                          `}
                        >
                          {/* hover glow */}
                          <span
                            className="
                              absolute
                              -left-8
                              -top-8
                              size-20
                              rounded-full
                              opacity-0
                              blur-2xl
                              transition-opacity
                              duration-300
                              group-hover/item:opacity-20
                            "
                            style={{
                              backgroundColor: item.color,
                            }}
                          />

                          {/* Icon */}
                          <div
                            className="
                              relative
                              flex
                              size-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-2xl
                              bg-white
                              shadow-sm
                              transition-transform
                              duration-300
                              group-hover/item:-translate-y-1
                              group-hover/item:scale-105
                            "
                          >
                            <Icon
                              size={23}
                              style={{
                                color: item.color,
                              }}
                            />
                          </div>

                          {/* Text */}
                          <div className="relative min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-primary">
                                {item.title}
                              </span>

                              <span
                                className="
                                  text-[9px]
                                  font-medium
                                  uppercase
                                  tracking-wide
                                  text-gray-400
                                "
                              >
                                {item.name}
                              </span>
                            </div>

                            <p className="mt-1 text-[10px] text-gray-400">
                              {item.description}
                            </p>
                          </div>

                          {/* Dot */}
                          <span
                            className="
                              mr-auto
                              size-1.5
                              shrink-0
                              rounded-full
                              opacity-50
                              transition
                              group-hover/item:scale-150
                              group-hover/item:opacity-100
                            "
                            style={{
                              backgroundColor: item.color,
                            }}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      justify-between
                      rounded-[18px]
                      bg-[#f8f9fc]
                      px-5
                      py-3
                    "
                  >
                    <p className="text-[10px] text-gray-400">
                      طراحی و توسعه راهکارهای اختصاصی برای کسب‌وکار شما
                    </p>

                    <span className="text-[10px] font-medium text-secondery">
                      Arian Tejarat Tivan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            href={link.path}
            key={link.path}
            className={`
              px-4
              pb-4
              font-medium
              transition-all
              duration-300
              hover:text-secondery
              ${
                active
                  ? "border-b-2 border-secondery text-primary"
                  : ""
              }
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}