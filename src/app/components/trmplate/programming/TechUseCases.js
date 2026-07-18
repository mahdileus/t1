import { SiNextdotjs, SiLaravel, SiPhp, SiMongodb } from "react-icons/si";

const techs = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    iconColor: "text-gray-900",
    description: "بهترین گزینه برای سایت‌های سریع، مدرن و SEO محور.",
    businesses: ["شرکتی", "فروشگاهی", "پلتفرم آنلاین"],
    backDesc:
      "Next.js یکی از بهترین فریم‌ورک‌ها برای طراحی وبسایت اختصاصی و توسعه وب مدرن است. این تکنولوژی باعث افزایش سرعت سایت، بهینه‌سازی برای موتورهای جستجو و ارائه تجربه کاربری عالی می‌شود. سایت‌های شرکتی، فروشگاهی و پلتفرم‌های آنلاین با Next.js می‌توانند عملکرد بالایی داشته باشند و قابلیت توسعه آسان در آینده را نیز دارند.",
  },
  {
    name: "Laravel",
    Icon: SiLaravel,
    iconColor: "text-red-600",
    description: "مناسب برای وبسایت‌های بزرگ و اپلیکیشن‌های با بک‌اند پیچیده.",
    businesses: ["شرکتی", "سرویس‌های آنلاین", "پلتفرم‌های چندکاربره"],
    backDesc:
      "Laravel فریم‌ورکی قدرتمند برای برنامه‌نویسی وب و طراحی وبسایت اختصاصی است. این تکنولوژی برای وبسایت‌های بزرگ، سرویس‌های آنلاین و پلتفرم‌های چندکاربره ایده‌آل است. با Laravel می‌توان سایت‌های امن، سریع و قابل توسعه ایجاد کرد که برای کسب‌وکارهای آنلاین و اپلیکیشن‌های پیچیده مناسب است.",
  },
  {
    name: "PHP",
    Icon: SiPhp,
    iconColor: "text-blue-600",
    description: "راه‌حل انعطاف‌پذیر برای انواع وبسایت‌ها و فرم‌ها.",
    businesses: ["فروشگاهی", "خبری", "شرکتی"],
    backDesc:
      "PHP یک زبان برنامه‌نویسی انعطاف‌پذیر و محبوب برای طراحی وبسایت اختصاصی و توسعه سایت است. این تکنولوژی مناسب کسب‌وکارهای فروشگاهی، خبری و شرکتی است و با قابلیت سفارشی‌سازی بالا می‌توان امکانات مورد نیاز هر وبسایت را پیاده‌سازی کرد. همچنین می‌توان سایت‌ها را بهینه‌سازی و برای سئو آماده نمود.",
  },
  {
    name: "MERN Stack",
    Icon: SiMongodb,
    iconColor: "text-green-600",
    description: "ایده‌آل برای اپلیکیشن‌های وب مدرن و SPA.",
    businesses: ["پلتفرم آنلاین", "اپلیکیشن تحت وب", "استارتاپ‌ها"],
    backDesc:
      "MERN Stack شامل MongoDB، Express، React و Node.js است و برای توسعه اپلیکیشن‌های وب مدرن و SPA مناسب است. با این تکنولوژی می‌توان وبسایت‌های تعاملی، سریع و حرفه‌ای طراحی کرد که نیازهای کسب‌وکار آنلاین را به بهترین شکل پوشش می‌دهد. همچنین این تکنولوژی امکان طراحی وبسایت اختصاصی با قابلیت مقیاس‌پذیری بالا را فراهم می‌کند.",
  },
];

export default function TechUseCases() {
  return (
    <section className="w-full py-16 font-yekan-bakh md:py-20">
      <div className="container">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            تکنولوژی‌ها
          </span>

          <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-[1.7] text-primary md:text-3xl">
            تکنولوژی‌ها و کاربرد هر زبان برای کسب‌وکارها
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techs.map(({ name, Icon, iconColor, description, businesses, backDesc }) => (
            <div
              key={name}
              tabIndex={0}
              className="group h-[360px] outline-none [perspective:1200px] sm:h-[380px]"
            >
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-lg shadow-gray-200/60 [backface-visibility:hidden]">
                  <Icon className={`size-14 ${iconColor} md:size-16`} />

                  <h3 className="mt-5 text-lg font-extrabold text-gray-900">
                    {name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {description}
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {businesses.map((business) => (
                      <span
                        key={business}
                        className="rounded-full bg-secondery/10 px-3 py-1 text-xs font-semibold text-secondery"
                      >
                        {business}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 flex rotate-y-180 flex-col rounded-2xl bg-primary p-5 text-center text-white shadow-lg shadow-primary/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex min-h-full flex-col justify-center">
                    <h3 className="text-lg font-extrabold">{name}</h3>

                    <p className="mt-4 max-h-[260px] overflow-y-auto text-justify text-xs leading-7 text-white/90 sm:text-sm">
                      {backDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
