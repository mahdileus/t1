import Image from "next/image";

export default function SeoHeader() {
  return (
    <section className="mt-32 w-full py-10 font-yekan-bakh md:mt-36 md:py-14">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-1 lg:order-1">
            <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              خدمات سئو
            </div>

            <h1 className="text-center text-3xl font-extrabold leading-[1.7] text-primary md:text-right md:text-4xl">
              سئو حرفه‌ای و اصولی برای افزایش رتبه سایت شما در گوگل
            </h1>

            <div className="mt-5 space-y-4 text-justify text-sm leading-8 text-gray-700 md:text-base md:leading-9">
              <p>
                سئو یا SEO (Search Engine Optimization) به معنای بهینه‌سازی
                وبسایت برای موتورهای جستجو است. در ساده‌ترین تعریف، سئو
                مجموعه‌ای از روش‌ها و تکنیک‌هاست که باعث می‌شود سایت شما در
                نتایج جستجوی گوگل و دیگر موتورهای جستجو جایگاه بهتری کسب کند.
              </p>

              <p>
                وقتی کاربری عبارتی مثل خرید کفش ورزشی یا طراحی سایت حرفه‌ای را
                در گوگل سرچ می‌کند، سایتی که به‌خوبی سئو شده باشد در نتایج اول
                نمایش داده می‌شود و همین موضوع می‌تواند باعث افزایش چشمگیر
                بازدید و فروش شود.
              </p>

              <p>
                اگر می‌خواهید وبسایتتان در نتایج جستجوی گوگل بیشتر دیده شود و
                مشتریان هدفمندتری جذب کنید، خدمات سئو تیوان با تحقیق کلمات
                کلیدی، بهبود ساختار سایت، تولید محتوای سئو شده و لینک‌سازی
                حرفه‌ای، مسیر رشد شما را هموار می‌کند.
              </p>
            </div>
          </div>

          <div className="order-2 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white/80 p-4 shadow-lg shadow-gray-200/70 backdrop-blur-3xl md:p-6">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/seo-2.png"
                  width={500}
                  height={500}
                  alt="سئو حرفه‌ای سایت"
                  className="h-auto max-w-full select-none object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
