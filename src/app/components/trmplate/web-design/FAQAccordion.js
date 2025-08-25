"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";

const faqs = [
    {
        question: "تفاوت طراحی سایت اختصاصی با استفاده از قالب آماده چیست؟",
        answer: "طراحی وبسایت اختصاصی یعنی همه چیز از پایه متناسب با برند و نیاز شما ساخته می‌شود، در حالی که قالب‌های آماده محدودیت دارند و معمولا شبیه به صدها سایت دیگر هستند. سایت اختصاصی منحصر به فرد است و انعطاف بالاتری دارد.",
    },
    {
        question: "چرا طراحی سایت اختصاصی برای سئو بهتر است؟",
        answer: "وبسایت اختصاصی از ابتدا با استانداردهای سئو داخلی طراحی می‌شود. این یعنی کدها سبک‌ترند، سرعت سایت بالاتر است و ساختار صفحات برای موتورهای جستجو بهینه می‌شود. در نتیجه شانس شما برای کسب رتبه بهتر در گوگل افزایش پیدا می‌کند.",
    },
    {
        question: "طراحی سایت اختصاصی چه مدت زمان می‌برد؟",
        answer: "مدت زمان بستگی به امکانات و نوع سایت دارد، اما معمولا بین ۳ تا ۶ هفته طول می‌کشد. چون همه بخش‌ها از صفر طراحی و برنامه‌نویسی می‌شوند، کیفیت و نتیجه کار بسیار بالاتر از قالب‌های آماده خواهد بود.",
    },
    {
        question: "آیا امکان توسعه و اضافه کردن امکانات جدید در سایت اختصاصی وجود دارد؟",
        answer: "بله. یکی از بزرگ‌ترین مزایای طراحی سایت اختصاصی همین است که شما می‌توانید در آینده امکانات جدید مثل فروشگاه آنلاین، سیستم آموزشی یا بخش وبلاگ را به راحتی اضافه کنید.",
    },
    {
        question: "آیا سایت اختصاصی امنیت بیشتری نسبت به قالب آماده دارد؟",
        answer: "بله. در طراحی اختصاصی، کدنویسی بر اساس نیاز شما و با رعایت اصول امنیتی انجام می‌شود. در حالی که قالب‌های آماده معمولا توسط هزاران نفر استفاده می‌شوند و به همین دلیل آسیب‌پذیری بیشتری دارند.",
    },
    {
        question: "آیا طراحی وبسایت اختصاصی هزینه بیشتری نسبت به قالب آماده دارد؟",
        answer: "در ابتدا ممکن است هزینه طراحی سایت اختصاصی کمی بیشتر باشد، اما این هزینه یک سرمایه‌گذاری بلندمدت است. شما یک سایت منحصر به فرد، امن و مقیاس‌پذیر دارید که ارزش آن چندین برابر بیشتر از یک قالب آماده است.",
    },
    {
        question: "آیا بعد از طراحی سایت اختصاصی نیاز به پشتیبانی دارم؟",
        answer: "بله. هر وبسایتی برای به‌روز شدن، رفع مشکلات احتمالی و بهینه‌سازی سئو نیاز به پشتیبانی دارد. تیم تیوان بعد از طراحی، خدمات پشتیبانی و آموزش مدیریت سایت را به شما ارائه می‌دهد.",
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
