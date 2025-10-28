
"use client";

import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import { PiTelegramLogo, PiInstagramLogo, PiYoutubeLogo, PiClock, PiPhone } from "react-icons/pi"

export default function Footer() {
  return (
    <footer className=" mt-25 pt-20 pb-10 overflow-hidden font-yekan-bakh bg-gray-50">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-b-gray-200 gap-6 md:gap-0">
        {/* لوگو و متن توضیحی */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-[35%] text-center md:text-right">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="110.25" height="110.312" viewBox="0 0 52.25 59.312">
              <g id="logo" transform="translate(-742.691 -73.077)">
                <path id="Path_1894" data-name="Path 1894"
                  d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                  transform="translate(-2975)" fill="#173372" />
                <path id="Path_1895" data-name="Path 1895"
                  d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                  transform="translate(-3207.251 -96.367)" fill="#ff9436" />
              </g>
            </svg>
          </div>
          <div className="text-xs font-semibold text-primary leading-relaxed text-justify">
            با پیشرفت روز افزون تکنــــــولوژی و پیدایش ویروس کرونا اهمیت طراحی سایت برای تمامی کسب و کارها الزامی شده و ایــن ابزار پرقدرت روه فروش و تبلیغات را بصورت کامل تغییر داده است. طراحــــی سایت تیوان با توجه به وضعیت اقتصـــادی کشور اقدام به طراحی سایت بصورت آماده و اختصاصـــی کرده و در بصورت کامل مدیریت سایت را آموزش می‌دهد، به این صورت مشترکین به راحتی میتوانند سایت خود را مدیریت کرده و از این ابزار پر قدرت لذت ببرند.
          </div>
        </div>

        {/* تماس‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-b from-[#26417b] to-white p-3.5 rounded-full">
              <FaWhatsapp size={28} className="text-white" />
            </div>
            <div className="flex flex-col items-start justify-center text-right">
              <p className="font-medium text-primary text-lg">پشتیبانی واتساپ :</p>
              <a href="https://wa.me/09125673763" className="text-primary text-2xl font-bold">09125673763</a>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:border-r border-r-gray-300 sm:pr-4">
            <div className="bg-gradient-to-b from-[#26417b] to-white p-3.5 rounded-full">
              <BiPhoneCall size={28} className="text-white" />
            </div>
            <div className="flex flex-col items-start justify-center text-right">
              <p className="font-medium text-primary text-lg">شماره تماس :</p>
              <a href="tel:02186097738" className="text-primary text-2xl font-bold">02186097738</a>
              <a href="tel:09125673763" className="text-primary text-2xl font-bold">09125673763</a>
            </div>
          </div>
        </div>
      </div>

      <div>

      </div>
      <div className=" container  mx-auto place-self-center place-items-center  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6" >
        {/* ستون دوم - دوره ها */}
        <div className="space-y-2 text-center md:text-right lg:pr-20">
          <h4 className="font-bold text-xl text-primary">مقالات </h4>
          <ul className="space-y-3 text-md text-center md:text-right">
            <li>آموزش موفقیت</li>
            <li>آموزش فن‌بیان</li>
            <li>آموزش ذهنیت برتر</li>
            <li>موفقیت چیست</li>
          </ul>
        </div>
        <div className="space-y-2 text-center md:text-right">
          <h4 className="font-bold text-xl text-primary">دسترسی سریع</h4>
          <ul className="space-y-2 text-md text-center md:text-right">
            <Link href={"/"} className="block">صفحه نخست</Link>
            <Link href={"/portfolios"} className="block">نمونه کارها</Link>
            <Link href={"/posts"} className="block">مقالات</Link>
            <Link href={"/about-us"} className="block">درباره ما</Link>
          </ul>
        </div>
        <div className="space-y-4 text-center md:text-right">
          <h4 className="font-bold text-xl text-center md:text-right text-primary">تماس باما</h4>
          <div className="text-sm ">
            <a href="tel:09125673763" className="text-base"><PiPhone size={24} className="inline ml-2 text-xl text-third" /> 09125673763</a>

            <p className="text-base mt-2"><PiClock size={24} className="inline ml-2 text-xl text-third" /> ساعت کاری از ساعت 8 صبح تا 10 شب </p>
          </div>
          <div className="flex gap-4 mt-5 text-xl justify-center md:justify-start text-third">
            <a href="https://www.instagram.com/t1w.ir/">            
            <PiInstagramLogo size={24} className="hover:text-[#3F72AF] cursor-pointer" />
            </a>
            <a href="https://t.me/09125673763">
                        <PiTelegramLogo size={24} className="hover:text-[#3F72AF] cursor-pointer" />
            </a>
            <PiYoutubeLogo size={24} className="hover:text-[#3F72AF] cursor-pointer" />
          </div>
        </div>

      </div>
      <div className="flex container items-center w-full p-0">
        <div className="bg-secondery text-sm md:text-base rounded-r-full w-full p-5 mt-8 flex justify-between items-center text-white">
          <p>کلیه حقوق این سایت متعلق به تیوان می باشد</p>
          <p className="hidden md:inline-block">شرکت آرین تجارت تیوان</p>
        </div>
        <div className="flex mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-5 bg-third text-white rounded-l-full cursor-pointer">
            <IoIosArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}

