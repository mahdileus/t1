import {
  androidLogo,
  reactLogo,
  nextLogo,
  laravelLogo,
  phpLogo,
  nodeLogo,
} from "./logos";

/* =========================================================
   رنگ + لوگوی سه‌بعدی + برچسب‌های هر تکنولوژی

   در فایل دیتای هر تکنولوژی فقط یک خط لازم است:
       import { visuals } from "./motion";
       export const reactData = { slug: "react", name: "React", ...visuals.react, ... }
========================================================= */

export const visuals = {
  android: {
    theme: { primary: "#3DDC84", secondary: "#A8F5C8", rgb: "61, 220, 132" },
    motion: { labels: ["KOTLIN", "JETPACK"], logo: androidLogo },
  },

  react: {
    theme: { primary: "#61DAFB", secondary: "#B8F0FF", rgb: "97, 218, 251" },
    motion: { labels: ["HOOKS", "JSX"], logo: reactLogo },
  },

  next: {
    theme: { primary: "#FFFFFF", secondary: "#9CA3AF", rgb: "255, 255, 255" },
    motion: { labels: ["SSR", "APP ROUTER"], logo: nextLogo },
  },

  laravel: {
    theme: { primary: "#FF2D20", secondary: "#FF8A80", rgb: "255, 45, 32" },
    motion: { labels: ["ELOQUENT", "ARTISAN"], logo: laravelLogo },
  },

  php: {
    theme: { primary: "#777BB4", secondary: "#B4B7E0", rgb: "119, 123, 180" },
    motion: { labels: ["COMPOSER", "PHP 8"], logo: phpLogo },
  },

  node: {
    theme: { primary: "#5FA04E", secondary: "#A5D99A", rgb: "95, 160, 78" },
    motion: { labels: ["NPM", "EVENT LOOP"], logo: nodeLogo },
  },
};
