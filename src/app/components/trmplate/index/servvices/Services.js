import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

export default function Services() {
    const services = [
        {
            title: "طراحی وب‌سایت اختصاصی",
            desc:"طراحی سایت‌های کاملاً اختصاصی با وردپرس که کاملا حرفه‌ای سفارشی‌سازی شده‌اند. سایت‌های ما ریسپانسیو، بهینه برای موتورهای جستجو و با تجربه کاربری بالا هستند تا کسب‌وکار شما را به بهترین شکل آنلاین معرفی کنند.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="37.438" height="39.173"
                viewBox="0 0 37.438 39.173">
                <g id="shopping-cart-svgrepo-com" transform="translate(-1.25 -1.25)">
                    <path id="Path_2072" data-name="Path 2072"
                        d="M17.726,25.452A3.226,3.226,0,1,0,14.5,22.226,3.226,3.226,0,0,0,17.726,25.452Z"
                        transform="translate(11.176 14.971)" fill="#ff9436" />
                    <path id="Path_2073" data-name="Path 2073"
                        d="M9.726,25.452A3.226,3.226,0,1,0,6.5,22.226,3.226,3.226,0,0,0,9.726,25.452Z"
                        transform="translate(4.428 14.971)" fill="#ff9436" />
                    <path id="Path_2074" data-name="Path 2074"
                        d="M7.868,6.209,7.5,10.725a1.462,1.462,0,0,0,1.475,1.585H37.2a1.471,1.471,0,0,0,1.475-1.364A5.451,5.451,0,0,0,33.16,5.029H10.541A5.027,5.027,0,0,0,9.416,2.8,4.83,4.83,0,0,0,5.9,1.25H2.633a1.383,1.383,0,0,0,0,2.765H5.84A2.023,2.023,0,0,1,7.868,6.209Z"
                        fill="#ff9436" opacity="0.4" />
                    <path id="Path_2075" data-name="Path 2075"
                        d="M34.436,8.75H6.157A1.483,1.483,0,0,0,4.682,10.1l-.664,8.019a5.4,5.4,0,0,0,5.364,5.844h20.5a5.526,5.526,0,0,0,5.4-5.033l.608-8.609A1.442,1.442,0,0,0,34.436,8.75Z"
                        transform="translate(2.319 6.326)" fill="#ff9436" />
                </g>
            </svg>,
        },
        {
            title: " برنامه‌نویسی حرفه‌ای",
            desc: " توسعه برنامه‌های تحت وب و اپلیکیشن‌های مدرن با زبان‌های PHP، Laravel، React و Node.js. کدنویسی ما مقیاس‌پذیر، بهینه و مطابق با استانداردهای روز است تا پروژه شما پایدار، امن و قابل توسعه باقی بماند.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="30.439" height="40.585"
                viewBox="0 0 30.439 40.585">
                <g id="mouse-svgrepo-com" transform="translate(-4.5 -2)">
                    <path id="Path_2066" data-name="Path 2066"
                        d="M34.939,17.219V27.366a15.219,15.219,0,1,1-30.439,0V17.219A15.237,15.237,0,0,1,18.2,2.081a14.309,14.309,0,0,1,3.044,0A15.251,15.251,0,0,1,34.939,17.219Z"
                        transform="translate(0 0)" fill="#ff9436" opacity="0.4" />
                    <path id="Path_2067" data-name="Path 2067"
                        d="M17.729,13.161v4.059a3.8,3.8,0,1,1-7.61,0V13.161a3.824,3.824,0,0,1,2.293-3.49V2.081A12.525,12.525,0,0,1,13.934,2a12.525,12.525,0,0,1,1.522.081V9.671A3.806,3.806,0,0,1,17.729,13.161Z"
                        transform="translate(5.784 0)" fill="#ff9436" />
                </g>
            </svg>
        },
        {
            title: "سئو (SEO)",
            desc: "ارائه خدمات کامل سئو شامل تحلیل کلمات کلیدی، بهینه‌سازی ساختار سایت و محتوا، افزایش سرعت بارگذاری و بهبود رتبه در گوگل تا کسب‌وکار شما در نتایج جستجو بیشتر دیده شود و ترافیک هدفمند جذب کند.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <g id="code-circle-svgrepo-com" transform="translate(-2 -2)">
                    <path id="Path_2062" data-name="Path 2062"
                        d="M22,42A20,20,0,1,0,2,22,20,20,0,0,0,22,42Z" fill="#ff9436" opacity="0.4" />
                    <path id="Path_2063" data-name="Path 2063"
                        d="M10.884,20.522A1.521,1.521,0,0,1,9.8,20.071l-4.1-4.1a1.547,1.547,0,0,1,0-2.173L9.8,9.7a1.537,1.537,0,0,1,2.173,2.173L8.957,14.885,11.971,17.9a1.547,1.547,0,0,1,0,2.173A1.521,1.521,0,0,1,10.884,20.522Z"
                        transform="translate(3.218 7.115)" fill="#ff9436" />
                    <path id="Path_2064" data-name="Path 2064"
                        d="M16.784,20.522a1.521,1.521,0,0,1-1.087-.451,1.547,1.547,0,0,1,0-2.173l3.014-3.013L15.7,11.871A1.537,1.537,0,0,1,17.871,9.7l4.1,4.1a1.547,1.547,0,0,1,0,2.173l-4.1,4.1A1.521,1.521,0,0,1,16.784,20.522Z"
                        transform="translate(13.112 7.115)" fill="#ff9436" />
                    <path id="Path_2065" data-name="Path 2065"
                        d="M11.782,21.563a1.471,1.471,0,0,1-.594-.123,1.527,1.527,0,0,1-.8-2.03l4.1-9.574a1.511,1.511,0,0,1,2.009-.8,1.527,1.527,0,0,1,.8,2.03l-4.1,9.574A1.542,1.542,0,0,1,11.782,21.563Z"
                        transform="translate(8.168 6.752)" fill="#ff9436" />
                </g>
            </svg>
        },
        {
            title: "رشد فروش و تبلیغات دیجیتال",
            desc:"اجرای کمپین‌های تبلیغاتی حرفه‌ای در گوگل و شبکه‌های اجتماعی با هدف افزایش فروش و آگاهی برند. با تحلیل دقیق بازار و هدف‌گذاری هوشمند، بودجه تبلیغات شما به بهترین شکل مصرف شده و نتایج قابل اندازه‌گیری ارائه می‌شود.",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="39.004" height="39.004"
                viewBox="0 0 39.004 39.004">
                <g id="presention-chart-svgrepo-com" transform="translate(-1.25 -1.25)">
                    <path id="Path_2068" data-name="Path 2068"
                        d="M35.654,2V23.951c0,3.447-1.814,5.261-5.261,5.261H8.261C4.814,29.212,3,27.4,3,23.951V2Z"
                        transform="translate(1.425 0.611)" fill="#ff9436" opacity="0.4" />
                    <path id="Path_2069" data-name="Path 2069"
                        d="M38.893,3.971H2.611a1.361,1.361,0,0,1,0-2.721H38.893a1.361,1.361,0,0,1,0,2.721Z"
                        transform="translate(0 0)" fill="#ff9436" />
                    <path id="Path_2070" data-name="Path 2070"
                        d="M24.341,26.687a1.365,1.365,0,0,1-1.215.744,1.386,1.386,0,0,1-.6-.145l-6.658-3.32-6.658,3.32a1.386,1.386,0,0,1-.6.145A1.366,1.366,0,0,1,7.4,26.687a1.342,1.342,0,0,1,.617-1.832l6.495-3.247V17H17.23v4.608l6.495,3.247A1.342,1.342,0,0,1,24.341,26.687Z"
                        transform="translate(4.883 12.822)" fill="#ff9436" />
                    <path id="Path_2071" data-name="Path 2071"
                        d="M8.115,15.417a1.376,1.376,0,0,1-1.052-.49A1.359,1.359,0,0,1,7.245,13l5.715-4.771a2.28,2.28,0,0,1,1.832-.508,2.247,2.247,0,0,1,1.56,1.088l1.9,3.175,5.315-4.426a1.366,1.366,0,1,1,1.742,2.1L19.6,14.438a2.28,2.28,0,0,1-1.832.508,2.247,2.247,0,0,1-1.56-1.088l-1.9-3.175L8.986,15.109A1.418,1.418,0,0,1,8.115,15.417Z"
                        transform="translate(4.475 4.881)" fill="#ff9436" />
                </g>
            </svg>
        },
    ]
    return (
        <div className="mt-140 md:mt-80 container">
        {/* header */}
            <div className="container flex items-center gap-5" style={{padding:0}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="172.565"
                    height="8"
                    viewBox="0 0 172.565 8"
                    className=" hidden md:block"
                >
                    <g id="Group_5243" data-name="Group 5243" transform="translate(-1012.435 -3308)">
                        <path
                            id="Path_1898"
                            data-name="Path 1898"
                            d="M28.565,0H0"
                            transform="translate(1012.435 3312)"
                            fill="none"
                            stroke="#ff9436"
                            strokeWidth="8"
                        />
                        <path
                            id="Path_1906"
                            data-name="Path 1906"
                            d="M0,0H141"
                            transform="translate(1044 3312)"
                            fill="none"
                            stroke="#173372"
                            strokeWidth="8"
                        />
                    </g>
                </svg>
                {/* این کانتینر در وسط صفحه و همه چی داخلشه */}
                <div className="container mx-auto flex items-center justify-between z-10 py-4" style={{padding:0}}>
                    <span className=" font-yekan-bakh text-third text-2xl font-medium">
                        خدمات تیوان  <span className="text-black font-light text-xl hidden md:inline-block">|</span>
                        <span className="text-gray-600 text-base px-2 hidden md:inline-block">توضیحات کوتاه در رابطه با این بخش</span>
                    </span>

                    <Link
                        href="/"
                        className="flex group justify-between items-center py-2 px-2 hover:bg-gray-100 transition-all bg-[#f8f9fb] rounded-full gap-6"
                    >
                        <p className="font-yekan-bakh text-lg">شروع کنید</p>
                        <span className="w-8 h-8 relative bg-secondery rounded-full">
                            <HiOutlineArrowLongLeft
                                size={40}
                                className="absolute group-hover:-translate-x-2 transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                            />
                        </span>
                    </Link>
                </div>


            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-14 py-14 ">
                {
                    services.map((item, index) => {
                        return (
                            <div key={index} className="border hover:border-[#ffcda6] hover:-translate-y-12 transition-all border-gray-100 relative  px-8 pt-18 pb-8 rounded-4xl my-4 h-[350px]">
                                <span className="absolute -top-12 right-1/3 transition-all bg-[#fff3f0] p-8 rounded-full">{item.icon}</span>
                                <h3 className=" font-yekan-bakh text-center font-medium text-lg mt-2 text-primary">{item.title}</h3>

                                <p className="text-gray-600 p-4 text-sm rounded-3xl bg-gray-100 mt-4 font-yekan-bakh text-justify">{item.desc}</p>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}