import CommentBox from "@/app/components/module/commentbox/CommentBox";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { PiDotsNineThin } from "react-icons/pi";

export default function Comments() {
  return (
    <section
      className="container relative py-16 font-yekan-bakh md:py-24"
      aria-labelledby="comments-title"
    >
      <BiSolidQuoteLeft
        className="pointer-events-none absolute -top-12 right-0 -z-10 rotate-12 text-[180px] text-gray-100 md:-top-16 md:text-[300px]"
        aria-hidden="true"
      />

      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)] lg:gap-12">
        <div className="w-full">
          <PiDotsNineThin
            className="mb-3 text-5xl font-light text-gray-400 md:text-6xl"
            aria-hidden="true"
          />

          <h2
            id="comments-title"
            className="text-3xl font-extrabold leading-relaxed text-primary md:text-4xl"
          >
            نظرات مشتریان
          </h2>

          <p className="mt-4 max-w-xl text-justify text-sm leading-8 text-gray-600 md:text-base md:leading-9">
            نظرات مشتریان عزیز همیشه برای تیوان دارای اولویت بوده و همواره
            می‌کوشیم خدمات خود را به بهترین شکل در اختیار کارفرمایان عزیز قرار
            دهیم.
          </p>
        </div>

        <div
          className="flex w-fit flex-row items-center rounded-full border border-primary/30 bg-white p-1 shadow-sm md:flex-col"
          aria-label="کنترل نظرات مشتریان"
        >
          <button
            id="comments-slider-prev"
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="مشاهده نظر قبلی"
          >
            <MdKeyboardArrowUp
              className="-rotate-90 md:rotate-0"
              size={22}
              aria-hidden="true"
            />
          </button>

          <span
            className="h-6 w-px bg-primary/20 md:h-px md:w-6"
            aria-hidden="true"
          />

          <button
            id="comments-slider-next"
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="مشاهده نظر بعدی"
          >
            <MdKeyboardArrowDown
              className="-rotate-90 md:rotate-0"
              size={22}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="min-w-0">
          <CommentBox />
        </div>
      </div>
    </section>
  );
}
