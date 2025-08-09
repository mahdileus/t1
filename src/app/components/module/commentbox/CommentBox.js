"use client";

import { FaQuoteRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Mousewheel, Navigation } from 'swiper/modules';


const testimonials = [
    {
        name: "الهام رضایی ",
        text: "همکاری با تیم تیوان واقعاً یکی از بهترین تجربه‌های کاری من بود. از طراحی رابط کاربری گرفته تا بهینه‌سازی برای موتورهای جستجو، همه چیز دقیق، منظم و حرفه‌ای انجام شد. تیمی با صبر، دانش فنی بالا و دلسوزی کامل برای رشد کسب‌وکار من.",
    },
    {
        name: "مجید صادقی ",
        text: "ما پروژه طراحی فروشگاه آنلاینمون رو به تیوان سپردیم و واقعاً از نتیجه کار شگفت‌زده شدیم. استفاده از لاراول در بک‌اند و طراحی مدرن رابط کاربری باعث شد سایت خیلی سریع و کاربرپسند باشه. ممنون از تیم فوق‌العادتون!",
    },
    {
        name: " زهرا غلامی",
        text: "یکی از مهم‌ترین ویژگی‌های تیوان، پشتیبانی بی‌نظیرشه. حتی بعد از اتمام پروژه هم با حوصله پاسخگو بودن و تغییرات مورد نیاز رو انجام دادن. واقعاً حس اعتماد و امنیت به آدم می‌دن.",
    },
    {
        name: " علی کاظمی",
        text: "ما برای سئوی سایتمون با تیوان کار کردیم. توی کمتر از دو ماه، توی نتایج گوگل جهش فوق‌العاده‌ای داشتیم. علاوه بر سئو، راهنمایی‌های خوبی در زمینه بازاریابی دیجیتال هم به ما دادن. صد در صد پیشنهادشون می‌کنم.",
    },
    {
        name: "نرگس حیدری ",
        text: "طراحی UI/UX که تیم تیوان برامون انجام داد واقعاً حرفه‌ای و کاربرمحور بود. باعث شد نرخ تبدیل کاربرانمون به طرز چشمگیری افزایش پیدا کنه. برخورد حرفه‌ای و احترام به زمان مشتری از نقاط قوتشونه.",
    },
    {
        name: " رضا عابدی",
        text: "تیوان برای ما یک وب‌سایت وردپرسی اختصاصی طراحی کرد که کاملاً با نیازهای ما هماهنگ بود. با اینکه پروژه زمان‌بر بود، ولی تیم همیشه با صبوری پاسخگو بود و هر اصلاحی رو سریع انجام می‌داد.",
    },
    {
        name: " شبنم تقوی ",
        text: "ما طراحی سایت، سئو و شبکه‌های اجتماعی رو یکجا به تیوان سپردیم و واقعاً راضی بودیم. تیمی خلاق، مسئولیت‌پذیر و همیشه در حال یادگیری که هدفشون موفقیت مشتریه.",
    },
    {
        name: "  پیمان نجفی",
        text: "برنامه‌نویسی بک‌اند با نود و فرانت‌اند با ری‌اکت توسط تیم تیوان برامون انجام شد. کیفیت کدنویسی بالا بود و مستندسازی دقیقی هم ارائه دادن. حس کار با یه تیم واقعاً متخصص رو بهمون دادن.",
    },

];


export default function CommentBox() {
    return (
        <section className="w-full overflow-hidden h-[250px]">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                loop
                mousewheel={true}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                modules={[Mousewheel, Navigation]}
                className="h-full px-4"
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide key={index} className="flex h-full py-4 font-yekan-bakh" >
                        <div className="bg-white border border-gray-200 rounded-xl p-9  flex flex-col justify-between w-full h-full">
                            <FaQuoteRight className="text-secondery text-xl mb-2" />
                            <p className="text-base text-gray-800 leading-relaxed line-clamp-3">
                                {item.text}
                            </p>
                            <span className="text-base font-bold text-primary mt-4">
                                {item.name}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>

    );
}
