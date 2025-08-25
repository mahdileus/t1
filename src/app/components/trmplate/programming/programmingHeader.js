"use client"

import GlassIconGrid from "./GlassIconGrid";



export default function ProgrammingHeader() {


    return (
        <>
            <section className=" mt-36 font-yekan-bakh">
                {/* about us section */}
                <div className="container flex flex-col-reverse md:flex-row justify-between items-center gap-28">
                    <div className="w-full md:w-1/2 text-justify">
                        <h1 className="text-4xl font-bold text-center md:text-right text-primary"> خدمات برنامه‌نویسی و توسعه وب اختصاصی</h1>
                        <h4 className="text-base mt-4">در دنیای دیجیتال امروز، داشتن یک وبسایت یا اپلیکیشن اختصاصی و حرفه‌ای، کلید موفقیت هر کسب‌وکاری است. شرکت تیوان با تمرکز بر طراحی و توسعه وبسایت اختصاصی، خدمات برنامه‌نویسی حرفه‌ای را ارائه می‌دهد که از قالب‌های آماده استفاده نمی‌کنند و کاملاً مطابق نیازهای شما سفارشی‌سازی می‌شوند. تیم ما با بهره‌گیری از فریم‌ورک‌ها و زبان‌های پیشرفته مانند Next.js، PHP، Laravel و MERN Stack، وبسایت‌ها و اپلیکیشن‌هایی سریع، امن و ریسپانسیو تولید می‌کند که تجربه کاربری (UX) عالی و طراحی منحصر به فرد دارند.
                            <br />
                            خدمات برنامه‌نویسی شرکت تیوان شامل طراحی رابط کاربری اختصاصی، توسعه بک‌اند قدرتمند، بهینه‌سازی برای سئو و مقیاس‌پذیری پروژه‌ها است. ما وبسایت‌هایی خلق می‌کنیم که نه تنها از نظر ظاهری جذاب هستند، بلکه با رعایت استانداردهای فنی و سئو، امکان رشد و دیده شدن در موتورهای جستجو را برای کسب‌وکار شما فراهم می‌کنند. با انتخاب تیوان، شما صاحب یک راهکار دیجیتال حرفه‌ای، امن و قابل توسعه خواهید شد که آماده جذب مشتریان جدید و افزایش فروش کسب‌وکارتان است.</h4>


                    </div>
                    <div className="bg-white/80 backdrop:blur-3xl rounded-4xl flex items-center justify-center shadow-md p-5 w-full md:w-1/2">
                        <GlassIconGrid />
                    </div>

                </div>

            </section>

        </>
    );
}
