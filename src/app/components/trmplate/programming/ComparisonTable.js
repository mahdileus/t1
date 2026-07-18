const features = [
  {
    feature: "سرعت و عملکرد",
    wordpress: "ممکن است با پلاگین‌ها کند شود",
    custom: "بهینه، سریع و کاملاً سفارشی",
  },
  {
    feature: "امنیت",
    wordpress: "وابسته به قالب، افزونه‌ها و بروزرسانی‌ها",
    custom: "امنیت بالاتر با پیاده‌سازی استاندارد",
  },
  {
    feature: "سئو و بهینه‌سازی",
    wordpress: "نیازمند افزونه و تنظیمات دستی",
    custom: "بهینه‌شده از ابتدا برای موتورهای جستجو",
  },
  {
    feature: "انعطاف‌پذیری",
    wordpress: "محدود به قالب و پلاگین‌ها",
    custom: "طراحی کامل مطابق نیاز کسب‌وکار",
  },
  {
    feature: "قابلیت توسعه",
    wordpress: "محدود به ساختار وردپرس",
    custom: "قابل توسعه و ارتقا در آینده",
  },
  {
    feature: "هزینه",
    wordpress: "ارزان‌تر در شروع پروژه",
    custom: "سرمایه‌گذاری بلندمدت و ارزشمند",
  },
  {
    feature: "منحصر به فرد بودن",
    wordpress: "احتمال شباهت به سایت‌های دیگر",
    custom: "کاملاً اختصاصی و متفاوت",
  },
];

export default function ComparisonTable() {
  return (
    <section className="w-full py-16 font-yekan-bakh md:py-20">
      <div className="container">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            مقایسه
          </span>

          <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-[1.7] text-primary md:text-3xl">
            مقایسه طراحی وبسایت با وردپرس و برنامه‌نویسی اختصاصی
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg shadow-gray-200/70">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-right">
              <thead>
                <tr className="bg-secondery text-center text-white">
                  <th className="w-1/4 px-5 py-5 text-sm font-bold md:text-base">
                    ویژگی
                  </th>
                  <th className="w-1/3 px-5 py-5 text-sm font-bold md:text-base">
                    وردپرس
                  </th>
                  <th className="w-1/3 px-5 py-5 text-sm font-bold md:text-base">
                    برنامه‌نویسی اختصاصی
                  </th>
                </tr>
              </thead>

              <tbody>
                {features.map((item, index) => (
                  <tr
                    key={item.feature}
                    className={[
                      "border-b border-gray-100 text-center transition-colors last:border-b-0 hover:bg-primary/5",
                      index % 2 === 0 ? "bg-gray-50/80" : "bg-white",
                    ].join(" ")}
                  >
                    <td className="px-5 py-5 text-sm font-bold text-gray-800 md:text-base">
                      {item.feature}
                    </td>

                    <td className="px-5 py-5 text-sm leading-7 text-gray-600 md:text-base">
                      {item.wordpress}
                    </td>

                    <td className="px-5 py-5 text-sm font-semibold leading-7 text-primary md:text-base">
                      {item.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
