import { HiOutlineSquaresPlus } from "react-icons/hi2";

export default function Process() {

    const process = [
        {
            title: "نیازسنجی دقیق",
            desc: "در این مرحله، تیم ما به بررسی عمیق نیازهای کسب‌وکار شما، مخاطبان هدف و بازار رقابتی می‌پردازد تا بهترین راهکارها و اولویت‌ها را مشخص کند. این تحلیل پایه و اساس موفقیت پروژه است.",
            num: "1"
        },
        {
            title: "مشاوره تخصصی ",
            desc: "با برگزاری جلسات مشاوره، اهداف پروژه، محدودیت‌ها و امکانات موجود به‌صورت دقیق مورد بحث قرار می‌گیرد. تیم تیوان با ارائه پیشنهادات کاربردی و استراتژی‌های موفق، مسیر اجرای پروژه را بهینه می‌کند.",
            num: "2"
        },
        {
            title: "طراحی و برنامه‌ریزی",
            desc: "طراحی رابط کاربری (UI) و تجربه کاربری (UX) بر اساس نیازها و استانداردهای روز انجام می‌شود. همچنین نقشه راه پروژه و انتخاب فناوری‌های مناسب مانند وردپرس، Next.js و React تعیین می‌گردد.",
            num: "3"
        },
        {
            title: "شروع توسعه و اجرا",
            desc: "توسعه پروژه با استفاده از بهترین زبان‌ها و فریمورک‌ها آغاز می‌شود. کدنویسی بهینه و پیاده‌سازی دقیق امکانات، تضمین کیفیت و امنیت پروژه را فراهم می‌کند.",
            num: "4"
        },
        {
            title: "بهینه‌سازی، پشتیبانی و افزایش فروش",
            desc: "پس از راه‌اندازی، خدمات بهینه‌سازی سئو، پشتیبانی فنی مستمر و استراتژی‌های افزایش فروش و تبلیغات دیجیتال ارائه می‌شود تا کسب‌وکار شما در بازارهای داخلی و بین‌المللی رشد کند.",
            num: "5"
        },

    ]

    return (
        <div className="container mt-40">
            <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-around gap-4 md:gap-0 items-center w-full">

                {/* عنوان سمت راست */}
                <div className="flex items-center justify-center gap-4 text-center lg:text-right w-full lg:w-[20%]">
                    <HiOutlineSquaresPlus className="text-third text-3xl" />
                    <h4 className="font-yekan-bakh text-2xl md:text-3xl font-medium leading-relaxed">
                        <span className="text-secondery">پروسه طراحــــی</span><br />
                        و اجرای پروژه
                    </h4>
                </div>

                {/* مراحل */}
                <div className="w-full lg:w-[80%]">
                    <div className="flex flex-wrap justify-center gap-6 bg-gray-100 py-8 px-6 md:px-4 rounded-3xl">
                        {process.map((item, index) => (
                            <div key={index} className="relative group w-full sm:w-auto">
                                {/* توضیح بالای هر آیتم */}
                                <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 bg-white text-primary text-sm p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 w-52 z-10 font-yekan-bakh text-justify">
                                    {item.desc}
                                </div>

                                {/* باکس مرحله */}
                                <div className="flex items-center justify-between gap-3 bg-white cursor-pointer py-4 px-3.5 rounded-full group-hover:shadow-md transition-all relative">
                                    <span className="bg-[#fff3f0] text-secondery w-14 h-14 flex items-center justify-center absolute right-0 rounded-full font-medium text-2xl">
                                        {item.num}
                                    </span>
                                    <h4 className="font-yekan-bakh pr-12">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>


    )
}