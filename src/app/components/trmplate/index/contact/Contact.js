import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const socialLinks = [
  {
    href: "https://www.instagram.com/t1w.ir/",
    label: "اینستاگرام تیوان",
    icon: FaInstagram,
  },
  {
    href: "https://t.me/09125673763",
    label: "تلگرام تیوان",
    icon: FaTelegramPlane,
  },
  {
    href: "https://wa.me/989125673763",
    label: "واتساپ تیوان",
    icon: FaWhatsapp,
  },
];

export default function Contact() {
  return (
    <section className="container mt-16 font-yekan-bakh">
      <div className="grid items-center gap-8 rounded-[2rem] bg-gray-100 px-4 py-8 md:grid-cols-[1fr_0.9fr] md:px-8 lg:px-12 xl:py-10">
        <div className="order-2 md:order-1">
          <Image
            src="/images/man-laptop.png"
            alt="مشاوره طراحی سایت و دیجیتال مارکتینگ تیوان"
            width={640}
            height={520}
            className="mx-auto h-auto w-full max-w-[560px] object-contain"
          />
        </div>

        <div className="order-1 flex flex-col items-center gap-6 text-center md:order-2 md:items-start md:text-right">
          <p className="inline-flex border-y border-gray-300 px-4 py-2 text-sm font-medium text-third md:text-base">
            اولین قدم برای{" "}
            <span className="mx-1 rounded-full bg-[#ecfcfc] px-2 font-bold text-[#39d4df]">
              موفقیت آنلاین
            </span>
          </p>

          <h2 className="text-2xl font-extrabold leading-10 text-secondery md:text-4xl md:leading-[3.4rem]">
            تیوان،{" "}
            <span className="text-third">
              هرآنچه برای موفقیت دیجیتال نیاز دارید
            </span>
          </h2>

          <p className="text-justify text-sm leading-8 text-gray-700 md:text-base md:leading-9">
            تیم حرفه‌ای تیوان با تخصص جامع در طراحی وب‌سایت اختصاصی با وردپرس و
            فریمورک‌های مدرن مانند Next.js و React، برنامه‌نویسی با PHP،
            Laravel و Node.js و بهینه‌سازی پیشرفته سئو، صفر تا صد پروژه‌های
            دیجیتال شما را با کیفیت بالا و سرعت مناسب اجرا می‌کند. از طراحی رابط
            کاربری و تجربه کاربری تا توسعه اپلیکیشن‌های وب و موبایل، تولید محتوا
            و اجرای استراتژی‌های دیجیتال مارکتینگ، تیوان همراه شماست.
          </p>

          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="/web-design"
              className="group inline-flex items-center justify-center gap-8 rounded-full border-2 border-primary px-6 py-3 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="text-base font-bold">شروع کنید</span>
              <HiOutlineArrowLongLeft
                className="text-2xl transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <div className="flex flex-col items-center gap-3 sm:items-start">
              <p className="text-sm font-medium text-gray-700">
                راه‌های ارتباط با ما
              </p>

              <div className="flex items-center gap-3 text-third">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full bg-white transition-colors hover:bg-secondery/10 hover:text-secondery"
                  >
                    <Icon size={22} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
