"use client";

import GlassIconGrid from "./GlassIconGrid";

export default function ProgrammingHeader() {
  return (
    <section className="mt-32 w-full py-10 font-yekan-bakh md:mt-36 md:py-14">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              توسعه اختصاصی
            </div>

            <h1 className="text-center text-3xl font-extrabold leading-[1.7] text-primary md:text-right md:text-4xl">
              خدمات برنامه‌نویسی و توسعه وب اختصاصی
            </h1>

            <div className="mt-5 space-y-4 text-justify text-sm leading-8 text-gray-700 md:text-base md:leading-9">
              <p>
                در دنیای دیجیتال امروز، داشتن یک وبسایت یا اپلیکیشن اختصاصی و
                حرفه‌ای، کلید موفقیت هر کسب‌وکاری است. شرکت تیوان با تمرکز بر
                طراحی و توسعه وبسایت اختصاصی، خدمات برنامه‌نویسی حرفه‌ای را
                ارائه می‌دهد که از قالب‌های آماده استفاده نمی‌کنند و کاملاً
                مطابق نیازهای شما سفارشی‌سازی می‌شوند.
              </p>

              <p>
                تیم ما با بهره‌گیری از فریم‌ورک‌ها و زبان‌های پیشرفته مانند
                Next.js، PHP، Laravel و MERN Stack، وبسایت‌ها و اپلیکیشن‌هایی
                سریع، امن و ریسپانسیو تولید می‌کند که تجربه کاربری عالی و طراحی
                منحصر به فرد دارند.
              </p>

              <p>
                خدمات برنامه‌نویسی شرکت تیوان شامل طراحی رابط کاربری اختصاصی،
                توسعه بک‌اند قدرتمند، بهینه‌سازی برای سئو و مقیاس‌پذیری
                پروژه‌ها است. با انتخاب تیوان، شما صاحب یک راهکار دیجیتال
                حرفه‌ای، امن و قابل توسعه خواهید شد.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white/80 p-4 shadow-lg shadow-gray-200/70 backdrop-blur-3xl md:p-6">
              <GlassIconGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
