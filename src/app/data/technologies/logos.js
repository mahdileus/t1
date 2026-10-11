/* =========================================================
   Logo specs (سه‌بعدی، داده‌محور)

   همه لوگوها در یک بوم 100×100 طراحی شده‌اند (مرکز = 50,50).
   هر لایه یکی از این نوع‌هاست:

   { type: "path",   d, depth?, z?, color, bevel? }   ← شکل SVG که اکسترود می‌شود
   { type: "tube",   d, radius?, z?, color, glow? }   ← خط SVG که به لوله نئونی تبدیل می‌شود
   { type: "ring",   radius, tube?, scale?, rotation?, z?, color }
   { type: "sphere", radius, position?, color }

   color می‌تواند "primary" | "secondary" | "dark" یا یک hex باشد.

   نکته: این‌ها نسخه ساده‌شده و ساخت خودمان هستند. اگر لوگوی رسمی
   را می‌خواهید، فقط مقدار d را با path رسمی SVG عوض کنید.
========================================================= */

const circle = (cx, cy, r) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 Z`;

/* ---------------- Android ---------------- */
export const androidLogo = {
  depth: 12,
  layers: [
    { type: "path", color: "primary", d: "M31 24 L24 11 L28 9 L36 22 Z" },
    { type: "path", color: "primary", d: "M69 24 L76 11 L72 9 L64 22 Z" },
    {
      type: "path",
      color: "primary",
      d: "M20 44 C20 30 32 20 50 20 C68 20 80 30 80 44 Z",
    },
    { type: "path", color: "dark", depth: 3, z: 12, d: circle(38, 34, 3.2) },
    { type: "path", color: "dark", depth: 3, z: 12, d: circle(62, 34, 3.2) },
    {
      type: "path",
      color: "primary",
      d: "M20 48 H80 V72 C80 76 77 79 73 79 H27 C23 79 20 76 20 72 Z",
    },
    { type: "path", color: "secondary", d: "M9 51 a3.5 3.5 0 0 1 7 0 V70 a3.5 3.5 0 0 1 -7 0 Z" },
    { type: "path", color: "secondary", d: "M84 51 a3.5 3.5 0 0 1 7 0 V70 a3.5 3.5 0 0 1 -7 0 Z" },
    { type: "path", color: "secondary", d: "M31 76 H39 V88.5 a4 4 0 0 1 -8 0 Z" },
    { type: "path", color: "secondary", d: "M61 76 H69 V88.5 a4 4 0 0 1 -8 0 Z" },
  ],
};

/* ---------------- React (اتم) ---------------- */
export const reactLogo = {
  depth: 8,
  layers: [
    { type: "ring", radius: 38, tube: 2.6, scale: [1, 0.4, 1], rotation: [0, 0, 0], color: "primary" },
    { type: "ring", radius: 38, tube: 2.6, scale: [1, 0.4, 1], rotation: [0, 0, Math.PI / 3], color: "primary" },
    { type: "ring", radius: 38, tube: 2.6, scale: [1, 0.4, 1], rotation: [0, 0, (Math.PI * 2) / 3], color: "primary" },
    { type: "sphere", radius: 7.5, position: [50, 50, 4], color: "secondary" },
  ],
};

/* ---------------- Next.js ---------------- */
export const nextLogo = {
  depth: 10,
  layers: [
    { type: "path", color: "dark", d: circle(50, 50, 44) },
    { type: "ring", radius: 44, tube: 1.8, position: [50, 50, 5], color: "primary" },
    {
      type: "path",
      color: "primary",
      depth: 4,
      z: 10,
      d: "M33 30 H40 L63 60 V30 H69 V70 H62.5 L39.5 40 V70 H33 Z",
    },
  ],
};

/* ---------------- Laravel ---------------- */
export const laravelLogo = {
  depth: 14,
  layers: [
    { type: "path", color: "primary", d: "M30 14 L50 14 L50 66 L80 66 L80 86 L30 86 Z" },
    { type: "path", color: "secondary", depth: 6, z: 14, d: "M68 22 L80 34 L68 46 L56 34 Z" },
  ],
};

/* ---------------- PHP ---------------- */
export const phpLogo = {
  depth: 10,
  layers: [
    { type: "path", color: "primary", d: "M4 50 a46 28 0 1 0 92 0 a46 28 0 1 0 -92 0 Z" },
    {
      type: "tube",
      radius: 2.6,
      z: 10,
      color: "dark",
      d: [
        "M22 64 V38 H29 C38 38 38 54 29 54 H22",
        "M44 28 V54 M44 44 C44 39 48 38 52 38 C57 38 59 41 59 46 V54",
        "M66 64 V38 H73 C82 38 82 54 73 54 H66",
      ].join(" "),
    },
  ],
};

/* ---------------- Node.js ---------------- */
export const nodeLogo = {
  depth: 10,
  layers: [
    { type: "path", color: "primary", d: "M50 6 L88.1 28 L88.1 72 L50 94 L11.9 72 L11.9 28 Z" },
    {
      type: "tube",
      radius: 2.4,
      z: 10,
      color: "dark",
      d: [
        "M42 36 V56 C42 63 33 63 31 56",
        "M69 41 C69 36 55 35 55 43 C55 51 70 50 70 58 C70 66 55 65 55 60",
      ].join(" "),
    },
  ],
};
