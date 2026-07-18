
import { HiOutlineSquaresPlus } from "react-icons/hi2";

const processSteps = [
    {
        title: "نیازسنجی و مشاوره",
        description:
            "در اولین قدم، تیم تیوان با شما جلسه مشاوره برگزار می‌کند تا نیازها، اهداف و نوع وبسایت موردنظر شما را بررسی کند. این مرحله پایه‌گذار کل پروژه است.",
        number: "1",
    },
    {
        title: "طراحی ظاهر سایت",
        description:
            "پس از تحلیل نیازها، ساختار صفحات و طراحی اولیه رابط کاربری (UI/UX) انجام می‌شود تا نمای کلی سایت مشخص گردد. در این مرحله شما می‌توانید طرح پیشنهادی را مشاهده و تأیید کنید.",
        number: "2",
    },
    {
        title: "توسعه و برنامه‌نویسی",
        description:
            "بعد از تأیید طرح، تیم فنی تیوان شروع به پیاده‌سازی سایت روی وردپرس می‌کند. تمام امکانات موردنیاز مانند فروشگاه، پنل کاربری یا سیستم آموزشی در این مرحله اضافه می‌شوند.",
        number: "3",
    },
    {
        title: "بهینه‌سازی و تست",
        description:
            "سایت از نظر سرعت، امنیت و سئو داخلی بهینه‌سازی می‌شود. همچنین تست‌های فنی و کاربری انجام می‌گیرد تا همه چیز بدون خطا آماده بهره‌برداری باشد.",
        number: "4",
    },
    {
        title: "راه‌اندازی و پشتیبانی",
        description:
            "در آخر، سایت روی دامنه و هاست اصلی شما راه‌اندازی می‌شود. علاوه بر این، تیم تیوان آموزش کار با پنل سایت را ارائه می‌دهد و با پشتیبانی حرفه‌ای در کنار شما خواهد بود.",
        number: "5",
    },
];

export default function Process() {
    return (
        <section className="py-16 font-yekan-bakh md:py-20">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                        فرایند اجرا
                    </span>

                    <h2 className="text-3xl font-extrabold leading-[1.7] text-primary md:text-4xl">
                        مراحل طراحی وبسایت اختصاصی
                    </h2>

                    <p className="mt-5 text-justify text-sm leading-8 text-gray-600 md:text-center md:text-base md:leading-9">
                        با طی کردن مراحل طراحی سایت در تیوان، شما در نهایت صاحب یک وبسایت
                        حرفه‌ای، سریع و سئو شده خواهید شد که مطابق با نیازهای کسب‌وکار شما
                        ساخته شده است. این سایت نه تنها اعتبار برندتان را افزایش می‌دهد،
                        بلکه به شما کمک می‌کند مشتریان بیشتری جذب کنید و فروش خود را چندین
                        برابر کنید. موفقیت در فضای آنلاین بدون داشتن وبسایت استاندارد
                        امکان‌پذیر نیست و تیوان این مسیر را برای شما هموار می‌کند.
                    </p>
                </div>

                <div className="mt-14 grid items-center gap-8 lg:grid-cols-[240px_1fr]">
                    <div className="flex items-center justify-center gap-4 text-center lg:justify-start lg:text-right">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-third/10 text-third">
                            <HiOutlineSquaresPlus className="size-7" aria-hidden="true" />
                        </span>

                        <h3 className="text-2xl font-extrabold leading-relaxed text-primary md:text-3xl">
                            <span className="text-secondery">پروسه طراحی</span>
                            <br />
                            وب سایت اختصاصی
                        </h3>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-wrap justify-center gap-6 bg-gray-100 py-8 px-6 md:px-10 rounded-3xl">
                            {processSteps.map(({ title, description, number }) => (
                                <div key={title} className="relative group w-full sm:w-auto">
                                    <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 bg-white text-primary text-sm p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 w-52 z-10 font-yekan-bakh text-justify">
                                        {description}
                                    </div>

                                    <div className="flex items-center justify-between gap-3 bg-white cursor-pointer py-4 px-3.5 rounded-full group-hover:shadow-md transition-all relative">
                                        <span className="bg-[#fff3f0] text-secondery w-14 h-14 flex items-center justify-center absolute right-0 rounded-full font-medium text-2xl">
                                            {number}
                                        </span>

                                        <h4 className="font-yekan-bakh pr-12">{title}</h4>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>


                </div>

                <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-primary/10 bg-primary/5 px-6 py-7 md:px-10">
                    <p className="text-justify text-sm leading-8 text-gray-700 md:text-center md:text-base md:leading-9">
                        نتیجه نهایی طراحی سایت در تیوان فقط یک سایت زیبا نیست، بلکه یک ابزار
                        قدرتمند بازاریابی آنلاین است. سایتی که تمام اصول سئو، تجربه کاربری و
                        امنیت در آن رعایت شده تا بتوانید در نتایج گوگل بدرخشید و از رقبای
                        خود پیشی بگیرید. با پشتیبانی مداوم تیم ما، مسیر رشد و موفقیت شما در
                        فضای دیجیتال پایدار خواهد بود.
                    </p>
                </div>
            </div>
        </section>
    );
}
