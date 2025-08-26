"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules";
import PostCard from "@/app/components/module/PostCard/PostCard";
import Link from "next/link";
import {HiOutlineArrowLongLeft} from "react-icons/hi2"


export default function LatestArticle({ posts }) {

  return (
    <div className="container py-20">
        {/* header */}
            <div className="container flex items-center gap-5" style={{padding:0}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="172.565"
                    height="8"
                    viewBox="0 0 172.565 8"
                    className=" hidden md:block"
                >
                    <g id="Group_5243" data-name="Group 5243" transform="translate(-1012.435 -3308)">
                        <path
                            id="Path_1898"
                            data-name="Path 1898"
                            d="M28.565,0H0"
                            transform="translate(1012.435 3312)"
                            fill="none"
                            stroke="#ff9436"
                            strokeWidth="8"
                        />
                        <path
                            id="Path_1906"
                            data-name="Path 1906"
                            d="M0,0H141"
                            transform="translate(1044 3312)"
                            fill="none"
                            stroke="#173372"
                            strokeWidth="8"
                        />
                    </g>
                </svg>
                {/* این کانتینر در وسط صفحه و همه چی داخلشه */}
                <div className="container mx-auto flex items-center justify-between z-10 py-4" style={{padding:0}}>
                    <span className=" font-yekan-bakh text-third text-2xl font-medium">
                        مقالات   <span className="text-black font-light text-xl hidden md:inline-block">|</span>
                        <span className="text-gray-600 text-base px-2 hidden md:inline-block">مطالب مفید برای ارتقای دانش خود</span>
                    </span>

                    <Link
                        href="/posts"
                        className="flex group justify-between items-center py-2 px-2 hover:bg-gray-100 transition-all bg-[#f8f9fb] rounded-full gap-6"
                    >
                        <p className="font-yekan-bakh text-lg"> مشاهده همه</p>
                        <span className="w-8 h-8 relative bg-secondery rounded-full">
                            <HiOutlineArrowLongLeft
                                size={40}
                                className="absolute group-hover:-translate-x-2 transition-all -top-1 bottom-0 -right-4 left-0 z-50"
                            />
                        </span>
                    </Link>
                </div>


            </div>
        {/* slider */}
    <div className="relative py-10 ">
      <Swiper
        autoplay={{
        delay: 3000, // هر 3 ثانیه یک اسلاید
        disableOnInteraction: true, // اگر کاربر اسلایدر رو لمس کرد، autoplay متوقف نشه
        }}
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4.5 },
          
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <PostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
      

    </div>
    </div>
  );
}