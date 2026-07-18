import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import {
  PiClock,
  PiInstagramLogo,
  PiPhone,
  PiTelegramLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

import ScrollTopButton from "@/app/components/module/footer/ScrollTopButton";

const quickLinks = [
  { title: "صفحه نخست", href: "/" },
  { title: "نمونه کارها", href: "/portfolios" },
  { title: "مقالات", href: "/posts" },
  { title: "درباره ما", href: "/about-us" },
];


export default function Footer({ posts = [] }) {
  return (
    <footer className="mt-24 overflow-hidden bg-gray-50 pb-10 pt-20 font-yekan-bakh">
      <div className="container flex flex-col items-start justify-between gap-8 border-b border-b-gray-200 pb-8 md:flex-row md:items-center">
        <div className="flex w-full flex-col items-center justify-center gap-5 text-center md:w-[38%] md:flex-row md:text-right">
          <div className="shrink-0" aria-label="لوگوی تیوان">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110.25"
              height="110.312"
              viewBox="0 0 52.25 59.312"
              role="img"
              aria-label="تیوان"
            >
              <g id="logo" transform="translate(-742.691 -73.077)">
                <path
                  id="Path_1894"
                  data-name="Path 1894"
                  d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                  transform="translate(-2975)"
                  fill="#173372"
                />
                <path
                  id="Path_1895"
                  data-name="Path 1895"
                  d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                  transform="translate(-3207.251 -96.367)"
                  fill="#ff9436"
                />
              </g>
            </svg>
          </div>

          <p className="text-justify text-xs font-semibold leading-7 text-primary">
            با پیشرفت روزافزون تکنولوژی و اهمیت حضور آنلاین برای کسب‌وکارها،
            طراحی سایت به یکی از ابزارهای اصلی فروش و تبلیغات تبدیل شده است.
            طراحی سایت تیوان با توجه به نیاز کسب‌وکارها، خدمات طراحی سایت آماده
            و اختصاصی ارائه می‌دهد و مدیریت سایت را به صورت کامل آموزش می‌دهد.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row md:w-auto">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-gradient-to-b from-[#26417b] to-white p-3.5">
              <FaWhatsapp
                size={28}
                className="text-white"
                aria-hidden="true"
              />
            </span>

            <div className="flex flex-col items-start justify-center text-right">
              <p className="text-lg font-medium text-primary">
                پشتیبانی واتساپ:
              </p>
              <a
                href="https://wa.me/989125673763"
                className="text-2xl font-bold text-primary transition-colors hover:text-secondery"
              >
                09125673763
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:border-r sm:border-r-gray-300 sm:pr-5">
            <span className="rounded-full bg-gradient-to-b from-[#26417b] to-white p-3.5">
              <BiPhoneCall
                size={28}
                className="text-white"
                aria-hidden="true"
              />
            </span>

            <div className="flex flex-col items-start justify-center text-right">
              <p className="text-lg font-medium text-primary">شماره تماس:</p>
              <a
                href="tel:02186097738"
                className="text-2xl font-bold text-primary transition-colors hover:text-secondery"
              >
                02186097738
              </a>
              <a
                href="tel:09125673763"
                className="text-2xl font-bold text-primary transition-colors hover:text-secondery"
              >
                09125673763
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-primary">آخرین مقالات</h3>

          <ul className="space-y-3 text-sm text-gray-600">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="line-clamp-1 transition-colors hover:text-secondery"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <nav className="space-y-4 text-center md:text-right" aria-label="دسترسی سریع">
          <h3 className="text-xl font-bold text-primary">دسترسی سریع</h3>
          <ul className="space-y-3 text-base text-gray-700">
            {quickLinks.map(({ title, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-secondery"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 text-center md:text-right">
          <h3 className="text-xl font-bold text-primary">تماس با ما</h3>

          <div className="space-y-3 text-base text-gray-700">
            <a
              href="tel:09125673763"
              className="inline-flex items-center justify-center gap-2 transition-colors hover:text-secondery md:justify-start"
            >
              <PiPhone size={24} className="text-third" aria-hidden="true" />
              09125673763
            </a>

            <p className="flex items-center justify-center gap-2 md:justify-start">
              <PiClock size={24} className="text-third" aria-hidden="true" />
              ساعت کاری از ۸ صبح تا ۱۰ شب
            </p>
          </div>

          <div className="mt-5 flex justify-center gap-4 text-third md:justify-start">
            <a
              href="https://www.instagram.com/t1w.ir/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام تیوان"
              className="transition-colors hover:text-[#3F72AF]"
            >
              <PiInstagramLogo size={24} aria-hidden="true" />
            </a>

            <a
              href="https://t.me/09125673763"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام تیوان"
              className="transition-colors hover:text-[#3F72AF]"
            >
              <PiTelegramLogo size={24} aria-hidden="true" />
            </a>

            <a
              href="#"
              aria-label="یوتیوب تیوان"
              className="transition-colors hover:text-[#3F72AF]"
            >
              <PiYoutubeLogo size={24} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container flex w-full items-center p-0">
        <div className="mt-8 flex w-full items-center justify-between rounded-r-full bg-secondery p-5 text-sm text-white md:text-base">
          <p>کلیه حقوق این سایت متعلق به تیوان است.</p>
          <p className="hidden md:inline-block">شرکت آرین تجارت تیوان</p>
        </div>

        <ScrollTopButton />
      </div>
    </footer>
  );
}
