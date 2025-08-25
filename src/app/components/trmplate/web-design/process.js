import { HiOutlineSquaresPlus } from "react-icons/hi2"

export default function Process() {

    const Seoprocess = [
        {
            title: "نیازسنجی و مشاوره",
            desc: "در اولین قدم، تیم تیوان با شما جلسه مشاوره برگزار می‌کند تا نیازها، اهداف و نوع وبسایت موردنظر شما را بررسی کند. این مرحله پایه‌گذار کل پروژه است.",
            num: "1"
        },
        {
            title: "طراحی ظاهر سایت",
            desc: "پس از تحلیل نیازها، ساختار صفحات و طراحی اولیه رابط کاربری (UI/UX) انجام می‌شود تا نمای کلی سایت مشخص گردد. در این مرحله شما می‌توانید طرح پیشنهادی را مشاهده و تأیید کنید.",
            num: "2"
        },
        {
            title: "توسعه و برنامه‌نویسی",
            desc: "بعد از تأیید طرح، تیم فنی تیوان شروع به پیاده‌سازی سایت روی وردپرس می‌کند. تمام امکانات موردنیاز مانند فروشگاه، پنل کاربری یا سیستم آموزشی در این مرحله اضافه می‌شوند.",
            num: "3"
        },
        {
            title: "بهینه‌سازی و تست",
            desc: "سایت از نظر سرعت، امنیت و سئو داخلی بهینه‌سازی می‌شود. همچنین تست‌های فنی و کاربری انجام می‌گیرد تا همه چیز بدون خطا آماده بهره‌برداری باشد.",
            num: "4"
        },
        {
            title: "راه‌اندازی و پشتیبانی",
            desc: "در آخر، سایت روی دامنه و هاست اصلی شما راه‌اندازی می‌شود. علاوه بر این، تیم تیوان آموزش کار با پنل سایت را ارائه می‌دهد و با پشتیبانی حرفه‌ای در کنار شما خواهد بود.",
            num: "5"
        },

    ]
    return (
        <>
            {/* web design process */}
            <div className="container py-40 md:py-28 font-yekan-bakh">
                <div className="flex flex-col gap-8 items-center justify-center">
                    <h2 className="text-center text-4xl font-bold text-primary w-full md:w-[40%]">
                        مراحل طراحی وبسایت اختصاصی
                    </h2>
                    <h4 className="text-lg justify-last-center w-full md:w-[40%]"> با طی کردن مراحل طراحی سایت در تیوان، شما در نهایت صاحب یک وبسایت حرفه‌ای، سریع و سئو شده خواهید شد که مطابق با نیازهای کسب‌وکار شما ساخته شده است. این سایت نه تنها اعتبار برندتان را افزایش می‌دهد، بلکه به شما کمک می‌کند مشتریان بیشتری جذب کنید و فروش خود را چندین برابر کنید. موفقیت در فضای آنلاین بدون داشتن وبسایت استاندارد امکان‌پذیر نیست و تیوان این مسیر را برای شما هموار می‌کند.</h4>
                </div>

                <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-around gap-4 md:gap-0 items-center w-full mt-10">

                    {/* عنوان سمت راست */}
                    <div className="flex items-center justify-center gap-4 text-center lg:text-right w-full lg:w-[20%]">
                        <HiOutlineSquaresPlus className="text-third text-3xl" />
                        <h4 className="font-yekan-bakh text-2xl md:text-3xl font-medium leading-relaxed">
                            <span className="text-secondery">پروسه طراحی </span><br />
                            وب سایت اختصاصی
                        </h4>
                    </div>

                    {/* مراحل */}
                    <div className="w-full lg:w-[80%]">
                        <div className="flex flex-wrap justify-center gap-6 bg-gray-100 py-8 px-6 md:px-10 rounded-3xl">
                            {Seoprocess.map((item, index) => (
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
                <div className="flex items-center justify-center">
                    <h4 className="text-lg my-10 text-center w-full md:w-[40%]">
                        نتیجه نهایی طراحی سایت در تیوان فقط یک سایت زیبا نیست، بلکه یک ابزار قدرتمند بازاریابی آنلاین است. سایتی که تمام اصول سئو، تجربه کاربری و امنیت در آن رعایت شده تا بتوانید در نتایج گوگل بدرخشید و از رقبای خود پیشی بگیرید. با پشتیبانی مداوم تیم ما، مسیر رشد و موفقیت شما در فضای دیجیتال پایدار خواهد بود.


                    </h4>
                </div>
            </div>
        </>
    )
}