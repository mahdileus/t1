"use client";

import {
  FaHtml5,
  FaJs,
  FaPhp,
  FaLaravel,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { TfiAndroid } from "react-icons/tfi";

const items = [
  { icon: FaHtml5, label: "HTML", color: "#e34c26" },
  { icon: SiTailwindcss, label: "TailwindCSS", color: "#38bdf8" },
  { icon: FaJs, label: "JavaScript", color: "#f7df1e" },
  { icon: FaPhp, label: "PHP", color: "#777bb4" },
  { icon: FaLaravel, label: "Laravel", color: "#ff2d20" },
  { icon: FaReact, label: "ReactJS", color: "#0ea5e9" },
  { icon: SiNextdotjs, label: "NextJS", color: "#111827" },
  { icon: FaNodeJs, label: "NodeJS", color: "#3c873a" },
  { icon: TfiAndroid, label: "Android", color: "#3ddc84" },
];

export default function GlassIconGrid() {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center md:min-h-[420px]">
      <div className="grid w-full max-w-[560px] grid-cols-3 gap-3 sm:gap-4">
        {items.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            aria-label={label}
            title={label}
            className="group flex aspect-square min-h-[92px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white/70 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-lg hover:shadow-primary/10 sm:min-h-[120px] sm:p-4"
          >
            <Icon
              className="mb-2 size-9 transition-transform duration-300 group-hover:scale-110 sm:size-11"
              style={{ color }}
            />

            <span className="max-w-full truncate text-center text-xs font-medium text-gray-700 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
