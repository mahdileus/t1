"use client";

import { SiNextdotjs, SiLaravel, SiPhp, SiMongodb } from "react-icons/si";

const techs = [
    {
        name: "Next.js",
        icon: <SiNextdotjs className="w-16 h-16 text-gray-800" />,
        description: "بهترین گزینه برای سایت‌های سریع، مدرن و SEO محور.",
        businesses: ["شرکتی", "فروشگاهی", "پلتفرم آنلاین"],
        backDesc: `Next.js یکی از بهترین فریم‌ورک‌ها برای طراحی وبسایت اختصاصی و توسعه وب مدرن است. این تکنولوژی باعث افزایش سرعت سایت، بهینه‌سازی برای موتورهای جستجو و ارائه تجربه کاربری عالی می‌شود. سایت‌های شرکتی، فروشگاهی و پلتفرم‌های آنلاین با Next.js می‌توانند عملکرد بالایی داشته باشند و قابلیت توسعه آسان در آینده را نیز دارند.`,

    },
    {
        name: "Laravel",
        icon: <SiLaravel className="w-16 h-16 text-red-600" />,
        description: "مناسب برای وبسایت‌های بزرگ و اپلیکیشن‌های با بک‌اند پیچیده.",
        businesses: ["شرکتی", "سرویس‌های آنلاین", "پلتفرم‌های چندکاربره"],
        backDesc: `Laravel فریم‌ورکی قدرتمند برای برنامه‌نویسی وب و طراحی وبسایت اختصاصی است. این تکنولوژی برای وبسایت‌های بزرگ، سرویس‌های آنلاین و پلتفرم‌های چندکاربره ایده‌آل است. با Laravel می‌توان سایت‌های امن، سریع و قابل توسعه ایجاد کرد که برای کسب‌وکارهای آنلاین و اپلیکیشن‌های پیچیده مناسب است.`,
    },
    {
        name: "PHP",
        icon: <SiPhp className="w-16 h-16 text-blue-600" />,
        description: "راه‌حل انعطاف‌پذیر برای انواع وبسایت‌ها و فرم‌ها.",
        businesses: ["فروشگاهی", "خبری", "شرکتی"],
        backDesc: `PHP یک زبان برنامه‌نویسی انعطاف‌پذیر و محبوب برای طراحی وبسایت اختصاصی و توسعه سایت است. این تکنولوژی مناسب کسب‌وکارهای فروشگاهی، خبری و شرکتی است و با قابلیت سفارشی‌سازی بالا می‌توان امکانات مورد نیاز هر وبسایت را پیاده‌سازی کرد. همچنین می‌توان سایت‌ها را بهینه‌سازی و برای سئو آماده نمود.`,

    },
    {
        name: "MERN Stack",
        icon: <SiMongodb className="w-16 h-16 text-green-600" />,
        description: "ایده‌آل برای اپلیکیشن‌های وب مدرن و SPA.",
        businesses: ["پلتفرم آنلاین", "اپلیکیشن تحت وب", "استارتاپ‌ها"],
        backDesc: `MERN Stack شامل MongoDB، Express، React و Node.js است و برای توسعه اپلیکیشن‌های وب مدرن و SPA مناسب است. با این تکنولوژی می‌توان وبسایت‌های تعاملی، سریع و حرفه‌ای طراحی کرد که نیازهای کسب‌وکار آنلاین را به بهترین شکل پوشش می‌دهد. همچنین این تکنولوژی امکان طراحی وبسایت اختصاصی با قابلیت مقیاس‌پذیری بالا را فراهم می‌کند.`,

    },
];

export default function TechUseCases() {
    return (
        <div className="py-16 px-4 container font-yekan-bakh">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
                تکنولوژی‌ها و کاربرد هر زبان برای کسب‌وکارها
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {techs.map((tech, idx) => (
                    <div key={idx} className="group perspective">
                        <div className="relative w-full h-80 text-center transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                            {/* Front */}
                            <div className="absolute w-full h-full bg-white rounded-xl shadow-lg flex flex-col items-center justify-center backface-hidden p-6">
                                {tech.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2">{tech.name}</h3>
                                <p className="text-gray-600">{tech.description}</p>
                                <div className="flex flex-wrap justify-center gap-2 pt-4">
                                    {tech.businesses.map((biz, i) => (
                                        <span
                                            key={i}
                                            className="bg-[#fff3f0] text-secondery text-sm font-medium px-3 py-1 rounded-full"
                                        >
                                            {biz}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Back */}
                            <div className="absolute w-full h-full bg-primary text-white rounded-xl flex flex-col items-center justify-center rotate-y-180 backface-hidden p-6">
                                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                                <p className="text-sm">{tech.backDesc}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* CSS Tailwind اضافی برای flip */}
            <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
        </div>
    );
}
