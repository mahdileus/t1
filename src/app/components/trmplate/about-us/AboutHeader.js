import Link from "next/link";

export default function AboutHeader() {
  return (
    <section className="mt-32 py-10 font-yekan-bakh md:mt-36 md:py-14">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 text-justify lg:order-1">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              درباره تیوان
            </span>

            <h1 className="text-center text-3xl font-extrabold leading-[1.7] text-primary md:text-right md:text-4xl">
              شرکت آرین تجارت تیوان
            </h1>

            <div className="mt-5 space-y-4 text-sm leading-8 text-gray-700 md:text-base md:leading-9">
              <p>
                شرکت تیوان با تمرکز بر طراحی وب‌سایت اختصاصی، سئو و توسعه
                نرم‌افزارهای تحت وب، به کسب‌وکارها کمک می‌کند حضور دیجیتال
                حرفه‌ای‌تری بسازند و مسیر جذب مشتری آنلاین را هدفمندتر طی کنند.
              </p>

              <p>
                ما در پروژه‌های خود از فناوری‌هایی مانند Next.js، React،
                Node.js، Python، .NET، PHP و Laravel استفاده می‌کنیم تا
                وب‌سایت‌ها و اپلیکیشن‌هایی سریع، امن، مقیاس‌پذیر و بهینه برای
                موتورهای جستجو طراحی و پیاده‌سازی کنیم.
              </p>

              <p>
                خدمات تیوان شامل طراحی سایت شرکتی و فروشگاهی، توسعه سامانه‌های
                اختصاصی، سئو و بهینه‌سازی، تبلیغات گوگل و شبکه‌های اجتماعی،
                طراحی رابط کاربری و تجربه کاربری، تولید محتوا و مشاوره تخصصی
                دیجیتال مارکتینگ است.
              </p>

              <p>
                تیم تیوان علاوه بر اجرای پروژه‌های متعدد در ایران، تجربه همکاری
                با کسب‌وکارهایی در بازارهای بین‌المللی از جمله کانادا و آلمان را
                نیز دارد. هدف ما ارائه راهکارهایی است که به افزایش ترافیک،
                بهبود رتبه گوگل و رشد فروش پایدار کمک کند.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/portfolios"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                مشاهده نمونه‌کارها
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white px-6 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary/5"
              >
                تماس با تیوان
              </Link>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="flex w-full items-center justify-center rounded-3xl border border-gray-100 bg-white/80 p-10 shadow-lg shadow-gray-200/70 backdrop-blur-3xl md:p-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="350"
                height="350"
                viewBox="0 0 52.25 59.312"
                role="img"
                aria-label="لوگوی شرکت آرین تجارت تیوان"
                className="h-auto w-56 max-w-full md:w-72"
              >
                <g id="logo" transform="translate(-742.691 -73.077)">
                  <path
                    id="Path_1894"
                    data-name="Path 1894"
                    d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                    transform="translate(-2975)"
                    fill="#173372"
                  />
                  <path
                    id="Path_1895"
                    data-name="Path 1895"
                    d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                    transform="translate(-3207.251 -96.367)"
                    fill="#ff9436"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
