import CommentBox from "@/app/components/module/commentbox/CommentBox";
import { PiDotsNineThin } from "react-icons/pi";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function Comments() {
  return (
    <div className="py-20 container font-yekan-bakh relative">
      <BiSolidQuoteLeft className="absolute right-0 -top-16 text-[300px] rotate-12 text-gray-200" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">

        {/* ستون عنوان سمت راست */}
        <div className="flex flex-col gap-4 w-full">
          <PiDotsNineThin className="text-6xl font-light text-gray-400" />
          <h2 className="text-3xl font-bold text-primary">نظرات مشتریان</h2>
          <p> نظرات مشتریان عزیز همیشه برای تیوان دارای اولویت بوده و همواره میکوشد تا خدمات خود را به نحو احسنت در خدمت کارفرمایان عزیز قرار دهد  </p>
        </div>

        {/* دکمه‌های ناوبری در وسط */}
        <div className="flex flex-col items-center border border-primary rounded-full my-6 md:my-0">
          <div className="swiper-button-prev-custom cursor-pointer text-primary rounded-full p-2 transition-all">
            <MdKeyboardArrowUp size={20} />
          </div>
          <div className="swiper-button-next-custom cursor-pointer  text-primary rounded-full p-2 transition-all">
            <MdKeyboardArrowDown size={20} />
          </div>
        </div>

        {/* اسلایدر سمت چپ */}
        <div className="w-full">
          <CommentBox />
        </div>

      </div>
    </div>

  )
}