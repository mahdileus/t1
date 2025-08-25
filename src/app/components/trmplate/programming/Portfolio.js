"use client"
import ProjectCard from "@/app/components/module/ProjectCard/ProjectCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules";
import {HiOutlineArrowLongLeft} from "react-icons/hi2"
export default function Portfolio({ projects }) {



    return (
        <div className=" py-20 container">
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
                        پروژه های موفق برنامه نویسی   <span className="text-black font-light text-xl hidden md:inline-block">|</span>
                        <span className="text-gray-600 text-base px-2 hidden md:inline-block">از آرزو تا واقعیت با تیوان</span>
                    </span>
                </div>


            </div>
            {/* portfolio boxes */}
            {/* slider */}
            <div className="relative py-20 container ">
                <Swiper
                    autoplay={{
                        delay: 3000, // هر 3 ثانیه یک اسلاید
                        disableOnInteraction: true, // اگر کاربر اسلایدر رو لمس کرد، autoplay متوقف نشه
                    }}
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 1.5 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3.5 },
                        1280: { slidesPerView: 4.5 },

                    }}
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project._id}>
                            <ProjectCard project={project} />
                        </SwiperSlide>
                    ))}
                </Swiper>


            </div>
            <div className="flex justify-center items-center">
                <Link href={"/portfolio"} className="flex justify-between items-center group hover:bg-black hover:border-black transition-all hover:text-white py-2 px-6 border-2 rounded-full gap-10">
                    <p className="font-yekan-bakh text-lg ">پروژه های بیشتر را مشاهد کنید </p>
                    <HiOutlineArrowLongLeft className="text-3xl transition-all group-hover:-translate-x-2" />
                </Link>
            </div>

        </div>
    )
}