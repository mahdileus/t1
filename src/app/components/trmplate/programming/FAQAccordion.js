"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";

const faqs = [
    {
        question: "چرا باید وبسایت خود را با برنامه‌نویسی اختصاصی توسعه دهیم؟",
        answer: "طراحی وبسایت اختصاصی با برنامه‌نویسی وب امکان ایجاد سایت کاملاً سفارشی، امن و سریع را فراهم می‌کند. برخلاف قالب‌های آماده، وبسایت اختصاصی برای نیازهای کسب‌وکار شما بهینه‌سازی شده و قابلیت توسعه و افزودن امکانات پیشرفته را دارد. همچنین این نوع طراحی وبسایت برای سئو سایت و جذب ترافیک ارگانیک بسیار مناسب است.",
    },
    {
        question: "چه زبان‌ها و فریم‌ورک‌هایی برای توسعه وبسایت اختصاصی مناسب هستند؟",
        answer: "بسته به نوع پروژه و نیاز کسب‌وکار، زبان‌ها و فریم‌ورک‌هایی مانند Next.js، Laravel، PHP و MERN Stack کاربرد دارند. این تکنولوژی‌ها امکان طراحی وبسایت سریع، مدرن، ریسپانسیو و بهینه برای موتورهای جستجو را فراهم می‌کنند.",
    },
    {
        question: "آیا برنامه‌نویسی وب می‌تواند سرعت و عملکرد سایت را بهبود دهد؟",
        answer: "بله. توسعه وبسایت اختصاصی با استفاده از زبان‌ها و تکنولوژی‌های حرفه‌ای باعث می‌شود وبسایت شما سریع‌تر بارگذاری شود، عملکرد بالاتری داشته باشد و تجربه کاربری بهتری ارائه کند. این موضوع مستقیماً بر سئو سایت و رتبه‌بندی گوگل تاثیر می‌گذارد.",
    },
    {
        question: "کدام زبان برنامه‌نویسی برای کسب‌وکار فروشگاهی مناسب است؟",
        answer: "برای سایت‌های فروشگاهی، استفاده از Next.js یا PHP همراه با بانک اطلاعاتی پایدار توصیه می‌شود. این تکنولوژی‌ها قابلیت مدیریت محصولات، سبد خرید، پرداخت آنلاین و بهینه‌سازی سئو را دارند و تجربه کاربری بی‌نظیری ارائه می‌کنند.",
    },
    {
        question: "چگونه یک وبسایت اختصاصی می‌تواند سئو سایت را تقویت کند؟",
        answer: "وبسایت اختصاصی این امکان را می‌دهد که هر صفحه با بهترین روش‌های سئو بهینه‌سازی شود، سرعت بارگذاری بالا داشته باشد، ساختار لینک‌ها استاندارد باشد و محتوای مناسب با کلمات کلیدی کسب‌وکار تولید شود. این ویژگی‌ها باعث افزایش رتبه سایت در نتایج جستجوی گوگل می‌شوند.",
    },
    {
        question: "چه کسب‌وکارهایی بیشتر به طراحی وبسایت اختصاصی نیاز دارند؟",
        answer:"شرکت‌ها و استارتاپ‌هایی که نیاز به وبسایت حرفه‌ای، امن و با قابلیت توسعه دارند، مانند وبسایت‌های شرکتی، فروشگاهی، پلتفرم‌های آنلاین و اپلیکیشن‌های تحت وب، بیشترین بهره را از طراحی وبسایت اختصاصی می‌برند.",
    },
    {
        question: "هزینه و زمان توسعه وبسایت اختصاصی چقدر است؟",
        answer: "هزینه طراحی وبسایت اختصاصی نسبت به استفاده از قالب آماده بیشتر است، اما ارزش آن در طولانی‌مدت بسیار بالاست. زمان توسعه بسته به پیچیدگی پروژه متفاوت است، اما وبسایت اختصاصی تضمین می‌کند که تمامی نیازهای کسب‌وکار شما با بهترین کیفیت و استانداردهای سئو برطرف شوند.",
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <section className="w-full py-20 font-yekan-bakh">
            <div className=" max-w-6xl mx-auto px-4 md:px-8 space-y-10">
                <h2 className="text-3xl font-bold  text-primary text-center">
                    سوالات متداول
                </h2>

                <div className="flex flex-col md:flex-row md:justify-between items-center gap-10">
                    {/* آکاردئون */}
                    {/* آکاردئون */}
                    <div className="w-full md:max-w-[48%] order-2 md:order-1 space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-xl overflow-hidden shadow transition-all"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full px-4 py-3 flex justify-between items-center text-right text-primary text-base font-medium"
                                >
                                    {faq.question}
                                    {openIndex === index ? (
                                        <FaMinus className="text-secondery" />
                                    ) : (
                                        <FaPlus className="text-secondery" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-4 pb-4 text-sm text-gray-800 leading-loose">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* تصویر */}
                    <div className="bg-white/80 backdrop:blur-3xl rounded-4xl flex items-center justify-center shadow-md p-5 w-full md:w-1/2">
                        <Image className="select-none"
                            src={"/images/FAQ.png"}
                            width={500}
                            height={500}
                            alt="seo-image"

                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
