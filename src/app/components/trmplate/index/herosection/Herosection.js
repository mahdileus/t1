import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { PiDotsNineThin } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";

export default function HeroSection() {
  return (
    <section aria-labelledby="home-title">
      <div className="container relative flex flex-col-reverse items-center justify-between pt-[60px] md:flex-row md:pt-40">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center gap-6 md:gap-10">
            <p className="border-y px-4 py-1 text-center font-yekan-bakh text-lg text-third md:text-xl">
              اولین قدم برای موفقیت آنلاین
            </p>

            <h1
              id="home-title"
              className="text-center font-yekan-bakh text-6xl font-bold text-third md:text-7xl"
            >
              طراحی حرفه‌ای
              <br />
              وب‌سایت
            </h1>

            <Link
              href="/web-design"
              className="group flex items-center justify-between gap-10 rounded-full border-2 px-6 py-2 transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondery focus-visible:ring-offset-4"
            >
              <span className="font-yekan-bakh text-lg">شروع کنید</span>
              <HiOutlineArrowLongLeft
                aria-hidden="true"
                className="text-3xl motion-safe:transition-transform motion-safe:group-hover:-translate-x-2"
              />
            </Link>

            <div className="flex items-center justify-between gap-5 pb-3 md:pb-0">
              <PiDotsNineThin aria-hidden="true" className="shrink-0 text-7xl text-third" />
              <p className="font-yekan-bakh font-medium text-gray-700">
                <span className="font-bold text-secondery">تیوان</span>
                {" "}| طراحی وب‌سایت اختصاصی و راهکارهای
                <br />
                دیجیتال مارکتینگ برای رشد کسب‌وکار شما
              </p>
            </div>
          </div>
        </div>

        <div className="w-full select-none md:w-1/2">
          {/* Assumed decorative; add actual file dimensions when available. */}
          <img
            src="/images/Group-237.png"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="block h-auto w-full"
          />
        </div>
      </div>

      <div className="container mx-auto mt-0 flex w-[95%] items-center justify-between gap-3 rounded-full bg-third px-3 py-2.5 md:-mt-9 md:w-[55%] md:px-6 md:py-5">
        <div className="flex items-center justify-between gap-3 font-yekan-bakh text-white md:gap-5">
          <div className="rounded-full bg-[#ecfcfc] p-2.5 md:p-5">
            <FaSquareCheck aria-hidden="true" className="text-[#21bdbd]" />
          </div>
          <p className="text-sm md:text-lg">
            مسیر موفقیت از یک انتخاب
            <br />
            درست آغاز می‌شود
          </p>
        </div>

        <div className="mt-0 flex shrink-0 flex-col items-center justify-center md:-mt-4">
          <span aria-hidden="true" className="font-arial text-3xl font-bold text-secondery md:text-5xl">T1</span>
          <p className="font-yekan-bakh text-xs font-bold text-white md:text-lg">
            آرین تجارت تیوان
          </p>
        </div>
      </div>
    </section>
  );
}
