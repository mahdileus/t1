"use client";
import { FaHtml5, FaJs, FaPhp, FaLaravel, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { TfiAndroid } from "react-icons/tfi";

const items = [
  { icon: FaHtml5, label: "HTML", color: "#e34c26" },
  { icon: SiTailwindcss, label: "TailwindCSS", color: "#38bdf8" },
  { icon: FaJs, label: "JavaScript", color: "#f7df1e" },
  { icon: FaPhp, label: "PHP", color: "#777bb4" },
  { icon: FaLaravel, label: "Laravel", color: "#ff2d20" },
  { icon: FaReact, label: "ReactJS", color: "#61dafb" },
  { icon: SiNextdotjs, label: "NextJS", color: "#000000" },
  { icon: FaNodeJs, label: "NodeJS", color: "#68a063" },
  { icon: TfiAndroid, label: "Android", color: "#3ddc84" },
];

export default function GlassIconGrid() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-4 max-w-[720px] w-full">
        {items.map(({ icon: Icon, label, color }, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg
                       flex flex-col items-center justify-center
                       transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl
                       group p-4"
            aria-label={label}
            title={label}
          >
            <Icon
              className="w-11 h-11 mb-2 transition-transform duration-200 group-hover:scale-110"
              style={{ color }}
            />
            <span className="text-sm text-slate-900">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
