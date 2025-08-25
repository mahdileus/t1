"use client"

import Image from "next/image";


export default function SeoHeader() {


    return (
        <>
            <section className=" mt-36 font-yekan-bakh">
                {/* about us section */}
                <div className="container flex flex-col-reverse md:flex-row justify-between items-center gap-28">
                    <div className="w-full md:w-1/2 text-justify">
                        <h1 className="text-4xl font-bold text-center md:text-right text-primary"> سئو حرفه‌ای و اصولی برای افزایش رتبه سایت شما در گوگل</h1>
                        <h4 className="text-base mt-4">سئو یا SEO (Search Engine Optimization) به معنای بهینه‌سازی وبسایت برای موتورهای جستجو است. در ساده‌ترین تعریف، سئو مجموعه‌ای از روش‌ها و تکنیک‌هاست که باعث می‌شود سایت شما در نتایج جستجوی گوگل و دیگر موتورهای جستجو جایگاه بهتری کسب کند. وقتی کاربری عبارتی مثل خرید کفش ورزشی یا طراحی سایت حرفه‌ای را در گوگل سرچ می‌کند، سایتی که به‌خوبی سئو شده باشد در نتایج اول نمایش داده می‌شود و همین موضوع می‌تواند باعث افزایش چشمگیر بازدید و فروش شود.</h4>
                        <h4 className="text-base mt-3">اگر می‌خواهید وبسایتتان در نتایج جستجوی گوگل بیشتر دیده شود و مشتریان هدفمندتری جذب کنید، خدمات سئو تیوان بهترین انتخاب برای شماست. ما با بهینه‌سازی اصولی سایت، تحقیق کلمات کلیدی، بهبود سرعت و ساختار صفحات، تولید محتوای سئو شده و لینک‌سازی حرفه‌ای، شرایطی را فراهم می‌کنیم تا وبسایت شما در کلمات کلیدی مهم به رتبه‌های بالای گوگل برسد.
                            تجربه ما در پروژه‌های سئو وردپرس، فروشگاه‌های اینترنتی و وبسایت‌های شرکتی، هم در ایران و هم در خارج از کشور (کانادا و آلمان)، نشان داده که سئو حرفه‌ای می‌تواند مستقیماً به رشد فروش و افزایش اعتبار برند منجر شود.</h4><br />


                    </div>
                    <div className="bg-white/80 backdrop:blur-3xl rounded-4xl flex items-center justify-center shadow-md p-5 w-full md:w-1/2">
                        <Image className="select-none"
                            src={"/images/seo-2.png"}
                            width={500}
                            height={500}
                            alt="seo-image"

                        />

                    </div>

                </div>

            </section>

        </>
    );
}
