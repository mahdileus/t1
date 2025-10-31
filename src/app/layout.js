import "./globals.css";

export const metadata = {
title: "آرین تجارت تیوان | طراحی سایت اختصاصی، برنامه‌نویسی و سئو حرفه‌ای",
description: "شرکت آرین تجارت تیوان ارائه‌دهنده خدمات طراحی سایت اختصاصی، برنامه‌نویسی حرفه‌ای، سئو و دیجیتال مارکتینگ در ایران و خارج از کشور.",
  keywords: [
    "تیوان",
    "طراحی سایت",
    "برنامه نویسی وب",
    "طراحی وبسایت وردپرس",
    "خدمات سئو",
    "افزایش رتبه گوگل",
    "دیجیتال مارکتینگ",
    "تبلیغات آنلاین",
    "Laravel",
    "Next.js",
    "React",
    "Node.js"
  ],
  openGraph: {
    title: "تیوان | طراحی سایت، سئو و دیجیتال مارکتینگ",
    description:
      "طراحی سایت اختصاصی، برنامه نویسی حرفه‌ای، خدمات سئو و دیجیتال مارکتینگ با تیوان. همراه کسب‌وکارها در ایران و خارج از کشور برای رشد فروش و برندینگ.",
    url: "https://t1w.ir",
    siteName: "t1w",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "تیوان | خدمات طراحی سایت و سئو",
    description:
      "طراحی وبسایت اختصاصی، سئو حرفه‌ای و تبلیغات دیجیتال با تیوان.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir='rtl'>
      <body>
        {children}
      </body>
    </html>
  );
}
