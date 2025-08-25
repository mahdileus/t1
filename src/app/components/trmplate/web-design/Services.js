import { FaShoppingBag } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { GiFactory } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
export default function Services() {
    const services = [
        {
            title: "طراحی سایت فروشگاهی",
            desc: "با طراحی سایت فروشگاهی توسط تیوان می‌توانید محصولات خود را به صورت آنلاین بفروشید، درگاه پرداخت امن داشته باشید و تجربه خرید راحتی برای مشتریان فراهم کنید. فروشگاه اینترنتی حرفه‌ای علاوه بر افزایش فروش، اعتبار برند شما را هم تقویت می‌کند.",
            icon: <FaShoppingBag size={35} />
        },
        {
            title: "طراحی سایت خبری",
            desc: "سایت‌های خبری نیازمند سرعت بالا، طراحی منظم و قابلیت انتشار محتوای سریع هستند. تیم تیوان وبسایت خبری شما را با ساختار بهینه، دسته‌بندی حرفه‌ای مطالب و سئو قوی طراحی می‌کند تا اخبار شما به بهترین شکل در نتایج گوگل دیده شود.",
            icon: <IoNewspaperSharp size={35} />
        },
        {
            title: "طراحی سایت شرکتی",
            desc: "یک سایت شرکتی حرفه‌ای معرف برند، خدمات و دستاوردهای شماست. ما در تیوان وبسایت شرکتی شما را با ظاهری مدرن، صفحات معرفی کامل و بخش تماس با ما طراحی می‌کنیم تا اعتماد مشتریان افزایش پیدا کند و برندتان متمایز شود.",
            icon: <GiFactory size={35} />
        },
        {
            title: "طراحی سایت آموزشی",
            desc: "اگر قصد فروش دوره یا ارائه آموزش آنلاین دارید، طراحی سایت آموزشی بهترین گزینه برای شماست. وبسایت‌های آموزشی تیوان مجهز به سیستم مدیریت دوره‌ها، پنل کاربری دانشجو و ابزارهای لازم برای آموزش آنلاین هستند تا تجربه‌ای کامل برای مدرس و دانشجو فراهم شود.",
            icon: <IoSchoolSharp size={35} />
        },
    ]
    return (
        <div className="mt-20  container font-yekan-bakh">
            <div className="flex flex-col gap-8 items-center justify-center">
                <h2 className="text-center text-4xl font-bold text-primary w-full md:w-[40%]">
                    خدمات طراحی سایت
                </h2>
                <h4 className="text-lg justify-last-center w-full md:w-[40%]">امروزه داشتن یک وبسایت حرفه‌ای نه تنها یک انتخاب بلکه یک ضرورت برای هر کسب‌وکاری است. وبسایت شما اولین نقطه تماس مشتری با برندتان است و طراحی درست آن می‌تواند باعث افزایش اعتماد، جذب مشتری و رشد فروش شود. شرکت تیوان با تخصص در زمینه طراحی وبسایت وردپرس، خدمات متنوعی را ارائه می‌دهد تا شما بتوانید یک سایت سریع، امن، ریسپانسیو و کاملاً سئو شده داشته باشید. </h4>
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-14 py-18 ">
                {
                    services.map((item, index) => {
                        return (
                            <div key={index} className="border hover:border-[#ffcda6] hover:-translate-y-12 transition-all border-gray-100 relative  px-8 pt-18 pb-8 rounded-4xl my-4 h-[350px]">
                                <span className="absolute -top-12 right-1/3 transition-all bg-[#fff3f0] p-8 rounded-full text-secondery">{item.icon}</span>
                                <h3 className=" font-yekan-bakh text-center font-medium text-lg mt-2 text-primary">{item.title}</h3>

                                <p className="text-gray-600 p-4 text-sm rounded-3xl bg-gray-100 mt-4 font-yekan-bakh text-justify">{item.desc}</p>

                            </div>

                        )
                    })
                }

            </div>
                <div className="flex items-center justify-center">
                    <h4 className="text-lg  text-center w-full md:w-[40%]">
                        ما در تیوان تنها یک سایت ساده طراحی نمی‌کنیم، بلکه بستری ایجاد می‌کنیم که باعث رشد آنلاین کسب‌وکار شما شود. فرقی ندارد فروشگاه اینترنتی دارید یا به دنبال وبسایت شرکتی هستید؛ تیم ما با تجربه و دانش روز در حوزه طراحی و توسعه وب، سایتی متناسب با نیاز شما پیاده‌سازی می‌کند.

                    </h4>
                </div>
        </div>
    )
}