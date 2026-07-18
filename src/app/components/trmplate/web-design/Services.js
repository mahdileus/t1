import { FaShoppingBag } from "react-icons/fa";
import { IoNewspaperSharp, IoSchoolSharp } from "react-icons/io5";
import { GiFactory } from "react-icons/gi";

const services = [
  {
    title: "طراحی سایت فروشگاهی",
    description:
      "با طراحی سایت فروشگاهی توسط تیوان می‌توانید محصولات خود را به صورت آنلاین بفروشید، درگاه پرداخت امن داشته باشید و تجربه خرید راحتی برای مشتریان فراهم کنید. فروشگاه اینترنتی حرفه‌ای علاوه بر افزایش فروش، اعتبار برند شما را هم تقویت می‌کند.",
    Icon: FaShoppingBag,
  },
  {
    title: "طراحی سایت خبری",
    description:
      "سایت‌های خبری نیازمند سرعت بالا، طراحی منظم و قابلیت انتشار محتوای سریع هستند. تیم تیوان وبسایت خبری شما را با ساختار بهینه، دسته‌بندی حرفه‌ای مطالب و سئو قوی طراحی می‌کند تا اخبار شما به بهترین شکل در نتایج گوگل دیده شود.",
    Icon: IoNewspaperSharp,
  },
  {
    title: "طراحی سایت شرکتی",
    description:
      "یک سایت شرکتی حرفه‌ای معرف برند، خدمات و دستاوردهای شماست. ما در تیوان وبسایت شرکتی شما را با ظاهری مدرن، صفحات معرفی کامل و بخش تماس با ما طراحی می‌کنیم تا اعتماد مشتریان افزایش پیدا کند و برندتان متمایز شود.",
    Icon: GiFactory,
  },
  {
    title: "طراحی سایت آموزشی",
    description:
      "اگر قصد فروش دوره یا ارائه آموزش آنلاین دارید، طراحی سایت آموزشی بهترین گزینه برای شماست. وبسایت‌های آموزشی تیوان مجهز به سیستم مدیریت دوره‌ها، پنل کاربری دانشجو و ابزارهای لازم برای آموزش آنلاین هستند تا تجربه‌ای کامل برای مدرس و دانشجو فراهم شود.",
    Icon: IoSchoolSharp,
  },
];

export default function Services() {
  return (
    <section className="py-16 font-yekan-bakh md:py-20">
      <div className="container">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            خدمات ما
          </span>

          <h2 className="text-3xl font-extrabold leading-[1.7] text-primary md:text-4xl">
            خدمات طراحی سایت
          </h2>

          <p className="mt-5 text-justify text-sm leading-8 text-gray-600 md:text-center md:text-base md:leading-9">
            امروزه داشتن یک وبسایت حرفه‌ای نه تنها یک انتخاب، بلکه یک ضرورت برای
            هر کسب‌وکاری است. وبسایت شما اولین نقطه تماس مشتری با برندتان است و
            طراحی درست آن می‌تواند باعث افزایش اعتماد، جذب مشتری و رشد فروش
            شود. شرکت تیوان با تخصص در زمینه طراحی وبسایت وردپرس، خدمات متنوعی
            را ارائه می‌دهد تا بتوانید یک سایت سریع، امن، ریسپانسیو و کاملاً
            سئو شده داشته باشید.
          </p>
        </div>

        {/* Services */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="group relative flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white px-5 pb-6 pt-16 text-center shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-secondery/30 hover:shadow-xl hover:shadow-secondery/10 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="absolute -top-8 right-1/2 flex size-16 translate-x-1/2 items-center justify-center rounded-2xl bg-secondery/10 text-secondery shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-secondery group-hover:text-white motion-reduce:transform-none">
                <Icon className="size-7" aria-hidden="true" />
              </div>

              <h3 className="text-lg font-extrabold text-primary">
                {title}
              </h3>

              <p className="mt-4 flex-1 rounded-2xl bg-gray-50 p-4 text-justify text-sm leading-7 text-gray-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Closing content */}
        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-primary/10 bg-primary/5 px-6 py-7 md:px-10">
          <p className="text-justify text-sm leading-8 text-gray-700 md:text-center md:text-base md:leading-9">
            ما در تیوان تنها یک سایت ساده طراحی نمی‌کنیم، بلکه بستری ایجاد
            می‌کنیم که باعث رشد آنلاین کسب‌وکار شما شود. فرقی ندارد فروشگاه
            اینترنتی دارید یا به دنبال وبسایت شرکتی هستید؛ تیم ما با تجربه و
            دانش روز در حوزه طراحی و توسعه وب، سایتی متناسب با نیاز شما
            پیاده‌سازی می‌کند.
          </p>
        </div>
      </div>
    </section>
  );
}
