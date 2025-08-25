"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";

const faqs = [
    {
        question: "سئو چیست و چرا برای کسب‌وکار من مهم است",
        answer: "سئو یا بهینه‌سازی سایت برای موتورهای جستجو باعث افزایش دیده شدن سایت شما در گوگل و جذب مشتری هدفمند می‌شود.",
    },
    {
        question: "چقدر طول می‌کشد تا نتیجه سئو را ببینم؟",
        answer: "بسته به رقابت کلمات کلیدی، معمولاً بین ۳ تا ۶ ماه نتایج ملموس قابل مشاهده است.",
    },
    {
        question: "آیا سئو فقط برای سایت‌های فروشگاهی مفید است؟",
        answer: "نه، سئو برای هر نوع سایت، از جمله خدماتی، آموزشی و خبری، باعث افزایش بازدید و جذب مشتری می‌شود.",
    },
    {
        question: "کلمات کلیدی چگونه انتخاب می‌شوند؟",
        answer: "با تحلیل بازار و رقبا، کلمات کلیدی مرتبط با محصول یا خدمات شما انتخاب شده تا بیشترین بازده را داشته باشند.",
    },
    {
        question: "آیا محتوا تاثیر زیادی روی سئو دارد؟",
        answer: "بله، محتوای باکیفیت و مرتبط باعث افزایش رتبه سایت در گوگل و جلب اعتماد کاربران می‌شود.",
    },
    {
        question: "سئو تکنیکال چیست و چرا مهم است؟",
        answer: "سئو تکنیکال شامل سرعت سایت، ساختار لینک‌ها، نقشه سایت و موبایل فرندلی بودن است که موتورهای جستجو آن را بررسی می‌کنند.",
    },
    {
        question: "آیا لینک‌سازی هنوز موثر است؟",
        answer: "بله، لینک‌های با کیفیت و طبیعی از سایت‌های معتبر به بهبود رتبه سایت شما کمک می‌کنند.",
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
