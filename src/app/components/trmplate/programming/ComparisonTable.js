"use client";

import { useState } from "react";

const features = [
  {
    feature: "سرعت و عملکرد",
    wordpress: "ممکن است با پلاگین‌ها کند شود",
    custom: "بهینه و سریع، کاملاً سفارشی",
  },
  {
    feature: "امنیت",
    wordpress: "آسیب‌پذیر نسبت به هک شدن قالب‌ها",
    custom: "امنیت بالا و استانداردهای حرفه‌ای",
  },
  {
    feature: "سئو و بهینه‌سازی",
    wordpress: "نیاز به افزونه و تنظیمات دستی",
    custom: "بهینه‌شده از ابتدا برای موتورهای جستجو",
  },
  {
    feature: "انعطاف‌پذیری",
    wordpress: "محدود به قالب و پلاگین‌ها",
    custom: "طراحی کامل مطابق نیاز مشتری",
  },
  {
    feature: "قابلیت توسعه",
    wordpress: "محدود به چارچوب وردپرس",
    custom: "کاملاً قابل توسعه و ارتقا در آینده",
  },
  {
    feature: "هزینه",
    wordpress: "ارزان‌تر در کوتاه‌مدت",
    custom: "سرمایه‌گذاری طولانی‌مدت ولی ارزشمند",
  },
  {
    feature: "منحصر به فرد بودن",
    wordpress: "شباهت به صدها سایت دیگر",
    custom: "کاملاً اختصاصی و منحصر به فرد",
  },
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto py-20 px-4 font-yekan-bakh container">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        مقایسه طراحی وبسایت با وردپرس و برنامه‌نویسی اختصاصی
      </h2>
      <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-secondery text-white">
          <tr className="text-center">
            <th className="py-4 px-6">ویژگی</th>
            <th className="py-4 px-6 ">وردپرس</th>
            <th className="py-4 px-6 ">برنامه نویسی </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {features.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50 text-center" : "bg-white"
              } hover:bg-indigo-50 text-center transition-colors`}
            >
              <td className="py-4 px-6 font-medium">{item.feature}</td>
              <td className="py-4 px-6">{item.wordpress}</td>
              <td className="py-4 px-6 font-semibold">{item.custom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
