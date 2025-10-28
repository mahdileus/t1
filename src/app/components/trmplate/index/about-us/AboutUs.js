import { FaSquareCheck } from "react-icons/fa6";
export default function AboutUs() {
    return (
        <div className="container">
            <div className="bg-third relative w-full h-[420px]">
                <div className="bg-white rounded-3xl p-4 md:p-10 m-8 absolute mt-30 shadow-md md:mx-30">
                    <h4 className="font-arial text-3xl absolute -top-7 right-6 md:text-6xl font-extrabold text-secondery">T1</h4>
                    <span className=" font-yekan-bakh text-third text-2xl font-medium">
                        نمونه کارهای جدید <span className="text-black font-light text-xl">|</span>
                        <span className="text-gray-600 text-base px-2">بیش از صد آنلاین شاپ موفق همکار تیوان هستند</span>
                        <span className="bg-[#ecfcfc] p-1 text-sm rounded-full mx-4"><span className="text-[#39d4df] text-xl">10</span> سال تجربه</span>
                    </span>
                    <span className="inline-block font-yekan-bakh mt-6 text-justify text-sm md:text-base">
                        شرکت تیوان با تخصص در ارائه خدمات دیجیتال مارکتینگ، طراحی وب‌سایت اختصاصی و برنامه‌نویسی حرفه‌ای، به کسب‌وکارها کمک می‌کند تا در فضای آنلاین بدرخشند. ما با استفاده از جدیدترین فناوری‌های روز دنیا از جمله Next.js،Python,.net ,  React، Node.js، PHP، Laravel و  وب‌سایت‌ها و اپلیکیشن‌هایی سریع، امن، کاربرپسند و بهینه برای موتورهای جستجو طراحی و توسعه می‌دهیم. خدمات تیوان شامل طراحی سایت شرکتی و فروشگاهی، توسعه نرم‌افزارهای تحت وب، سئو و بهینه‌سازی، تبلیغات گوگل و شبکه‌های اجتماعی، طراحی رابط کاربری (UI) و تجربه کاربری (UX)، تولید محتوا و مشاوره تخصصی دیجیتال مارکتینگ است.
                        افتخار ما این است که در کنار اجرای پروژه‌های متعدد در ایران، در بازارهای بین‌المللی از جمله کانادا و آلمان نیز نمونه‌کارهای موفقی داشته‌ایم و همواره رضایت کامل مشتریان خود را جلب کرده‌ایم. تیم تیوان با تعهد، تخصص و خلاقیت، راهکارهایی ارائه می‌دهد که باعث افزایش ترافیک، بهبود رتبه گوگل و رشد فروش شما می‌شود. هدف ما این است که شریک دیجیتال قابل اعتماد شما باشیم و با استفاده از استراتژی‌های نوین، مسیر موفقیت آنلاین شما را هموار کنیم.

                    </span>

                    <div className="flex items-center justify-between mt-14 ">
                        <div className="md:flex items-center w-[10%] hidden">
                            <img src="/images/Repeat Grid 21.png" />
                        </div>
                        <div className="bg-[#f3f4ff] p-2  md:py-6 md:px-8 md:rounded-full rounded-3xl w-full md:w-[50%]">
                            <div className="flex items-center gap-2.5">
                                <FaSquareCheck className=" text-[#21bdbd] text-xl" />
                                <h3 className="font-yekan-bakh font-medium text-2xl text-third"> از کجا <span className="text-secondery">شروع</span> کنم؟ </h3>
                            </div>
                            <p className="font-yekan-bakh text-justify text-sm ">اگر به دنبال یک وب‌سایت اختصاصی، اپلیکیشن حرفه‌ای یا استراتژی مؤثر برای رشد آنلاین کسب‌وکار خود هستید، کافی است با ما تماس بگیرید یا فرم درخواست پروژه را تکمیل کنید. تیم تیوان پس از بررسی نیازهای شما، بهترین راهکار را پیشنهاد می‌دهد و در تمام مراحل طراحی، توسعه و بازاریابی همراهتان خواهد بود.

                            </p>

                        </div>
                        <div className="md:flex hidden items-center w-[15%]">
                            <img src="/images/check.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}