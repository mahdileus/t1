"use client";

import { FaQuoteRight } from "react-icons/fa";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "الهام رضایی",
    text: "همکاری با تیم تیوان واقعاً یکی از بهترین تجربه‌های کاری من بود. از طراحی رابط کاربری گرفته تا بهینه‌سازی برای موتورهای جستجو، همه چیز دقیق، منظم و حرفه‌ای انجام شد. تیمی با صبر، دانش فنی بالا و دلسوزی کامل برای رشد کسب‌وکار من.",
  },
  {
    name: "مجید صادقی",
    text: "ما پروژه طراحی فروشگاه آنلاینمون رو به تیوان سپردیم و واقعاً از نتیجه کار شگفت‌زده شدیم. استفاده از لاراول در بک‌اند و طراحی مدرن رابط کاربری باعث شد سایت خیلی سریع و کاربرپسند باشه. ممنون از تیم فوق‌العادتون!",
  },
  {
    name: "زهرا غلامی",
    text: "یکی از مهم‌ترین ویژگی‌های تیوان، پشتیبانی بی‌نظیرشه. حتی بعد از اتمام پروژه هم با حوصله پاسخگو بودن و تغییرات مورد نیاز رو انجام دادن. واقعاً حس اعتماد و امنیت به آدم می‌دن.",
  },
  {
    name: "علی کاظمی",
    text: "ما برای سئوی سایتمون با تیوان کار کردیم. توی کمتر از دو ماه، توی نتایج گوگل جهش فوق‌العاده‌ای داشتیم. علاوه بر سئو، راهنمایی‌های خوبی در زمینه بازاریابی دیجیتال هم به ما دادن. صد در صد پیشنهادشون می‌کنم.",
  },
  {
    name: "نرگس حیدری",
    text: "طراحی UI/UX که تیم تیوان برامون انجام داد واقعاً حرفه‌ای و کاربرمحور بود. باعث شد نرخ تبدیل کاربرانمون به طرز چشمگیری افزایش پیدا کنه. برخورد حرفه‌ای و احترام به زمان مشتری از نقاط قوتشونه.",
  },
  {
    name: "رضا عابدی",
    text: "تیوان برای ما یک وب‌سایت وردپرسی اختصاصی طراحی کرد که کاملاً با نیازهای ما هماهنگ بود. با اینکه پروژه زمان‌بر بود، ولی تیم همیشه با صبوری پاسخگو بود و هر اصلاحی رو سریع انجام می‌داد.",
  },
  {
    name: "شبنم تقوی",
    text: "ما طراحی سایت، سئو و شبکه‌های اجتماعی رو یکجا به تیوان سپردیم و واقعاً راضی بودیم. تیمی خلاق، مسئولیت‌پذیر و همیشه در حال یادگیری که هدفشون موفقیت مشتریه.",
  },
  {
    name: "پیمان نجفی",
    text: "برنامه‌نویسی بک‌اند با نود و فرانت‌اند با ری‌اکت توسط تیم تیوان برامون انجام شد. کیفیت کدنویسی بالا بود و مستندسازی دقیقی هم ارائه دادن. حس کار با یه تیم واقعاً متخصص رو بهمون دادن.",
  },
];

export default function CommentBox() {
  return (
    <div
      className="h-[290px] w-full overflow-hidden sm:h-[270px]"
      aria-label="نظرات مشتریان تیوان"
    >
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={16}
        loop
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.7,
        }}
        navigation={{
          nextEl: "#comments-slider-next",
          prevEl: "#comments-slider-prev",
        }}
        modules={[Mousewheel, Navigation]}
        className="h-full"
      >
        {testimonials.map(({ name, text }) => (
          <SwiperSlide key={name} className="h-full">
            <article className="flex h-full w-full flex-col justify-between rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <FaQuoteRight
                className="mb-3 text-2xl text-secondery"
                aria-hidden="true"
              />

              <blockquote className="flex-1">
                <p className="line-clamp-4 text-justify text-sm leading-8 text-gray-700 sm:text-base sm:leading-9">
                  {text}
                </p>
              </blockquote>

              <footer className="mt-4 border-t border-gray-100 pt-4">
                <cite className="text-sm font-bold not-italic text-primary sm:text-base">
                  {name}
                </cite>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
