import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

import { FaWhatsapp, FaInstagram, FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="container">
            <div className="bg-gray-100 flex flex-col md:flex-row items-center justify-center px-3 py-8 md:px-0 md:py-0 rounded-4xl 2xl:py-0 xl:py-8">

                <div className="md:w-[45%] w-full">
                    <img
                        src="/images/man-laptop.png"

                    />
                </div>
                <div className="flex flex-col w-full md:w-[30%] gap-6 md:gap-10 items-center">
                    <span className="inline-flex">
                        <h4 className=" text-third text-center font-yekan-bakh text-lg md:text-xl py-1 px-4 border-t border-b"> اولیـــــــن قــــدم بــــــــرای <span className="text-[#4fd9e2] font-bold bg-[#ecfcfc]">موفقیــــــت آنـــــــــلاین</span> </h4>
                    </span>
                    <h1 className=" text-secondery text-center md:text-right text-3xl md:text-4xl font-bold font-yekan-bakh">تیوان _<span className="text-third">هرآنچه برای موفقیت دیجیتال نیاز دارید</span> </h1>
                    <h4 className="font-yekan-bakh font-medium text-justify">تیم حرفه‌ای تیوان با تخصص جامع در طراحی وب‌سایت اختصاصی با وردپرس و فریمورک‌های مدرن مانند Next.js و React، برنامه‌نویسی با PHP، Laravel، Node.js و بهینه‌سازی‌های پیشرفته سئو (SEO)، صفر تا صد پروژه‌های دیجیتال شما را با کیفیت بالا و سرعت تحویل می‌دهد.
                        از طراحی رابط کاربری (UI) و تجربه کاربری (UX) تا توسعه اپلیکیشن‌های وب و موبایل، از تولید محتوا تا اجرای استراتژی‌های موفق دیجیتال مارکتینگ و تبلیغات هدفمند در گوگل و شبکه‌های اجتماعی، تیوان همراه شماست.
                        با استفاده از فناوری‌های به‌روز و تیمی متعهد، ما تضمین می‌کنیم کسب‌وکار شما در بازارهای ایران و بین‌المللی مانند کانادا و آلمان، رشد قابل توجهی در جذب مشتری، افزایش فروش و بهبود رتبه در موتورهای جستجو داشته باشد.


                    </h4>
                    <div className="flex items-center justify-between gap-8">
                        <Link href={"/web-design"} className="flex justify-between group items-center hover:bg-black hover:border-black hover:text-white transition-all py-2 px-6 border-2 rounded-full gap-10">
                            <p className="font-yekan-bakh text-lg ">شروع کنید</p>
                            <HiOutlineArrowLongLeft className="text-3xl group-hover:-translate-x-2 transition-all" />
                        </Link>
                        <div className="flex flex-col items-center justify-between gap-3">
                            <h4 className="font-yekan-bakh text-gray-800 font-medium">راه های ارتباط باما </h4>
                            <div className="flex items-center justify-center text-2xl text-third gap-4 cursor-pointer">
                                <FaInstagram className="hover:animate-bounce hover:transition-all" />
                                <FaTelegramPlane className="hover:animate-bounce hover:transition-all" />
                                <FaWhatsapp className="hover:animate-bounce hover:transition-all" />

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}