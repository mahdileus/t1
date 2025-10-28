import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { PiDotsNineThin } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
export default function HeroSection() {


    return (
        <>
            <div className="container pt-15 md:pt-40 items-center flex flex-col-reverse md:flex md:flex-row justify-between relative">
                <div className=" w-[100%] md:w-[50%]">
                    <div className="flex flex-col gap-6 md:gap-10 items-center">
                        <span className="inline-flex">
                            <h4 className=" text-third text-center font-yekan-bakh text-lg md:text-xl py-1 px-4 border-t border-b"> اولیـــــــن قــــدم بــــــــرای موفقیــــــت آنـــــــــلاین </h4>
                        </span>
                        <h1 className=" text-third text-center text-6xl md:text-7xl font-bold font-yekan-bakh"> طراحی حرفه ای<br /> وب ســـــــــایت </h1>
                        <Link href={"/web-design"} className="flex justify-between group items-center hover:bg-black hover:border-black hover:text-white transition-all py-2 px-6 border-2 rounded-full gap-10">
                            <p className="font-yekan-bakh text-lg ">شروع کنید</p>
                            <HiOutlineArrowLongLeft className="text-3xl group-hover:-translate-x-2 transition-all" />
                        </Link>
                        <div className="flex justify-between items-center gap-5 pb-3 md:pb-0">
                            <PiDotsNineThin className="text-7xl text-third" />
                            <h4 className="font-yekan-bakh font-medium text-gray-700"><span className="font-bold text-secondery">تیوان</span> | طراحی وب‌سایت اختصاصی و راهکارهای <br/>دیجیتال مارکتینگ برای رشد سریع کسب‌وکار شما</h4>

                        </div>

                    </div>
                </div>
                <div className="w-[100%] md:w-[50%] select-none"><img
                    src="/images/Group-237.png"
                />
                </div>


            </div>
            <div className="container md:-mt-9 mt-0 flex justify-between items-center mx-auto md:w-[55%] w-[95%] rounded-full bg-third py-2.5 md:py-5 px-0 md:px-6">
                <div className="flex items-center justify-between gap-5 font-yekan-bakh text-white">
                    <div className="bg-[#ecfcfc] p-2.5 md:p-5 rounded-full">
                        <FaSquareCheck className=" text-[#21bdbd]" />
                    </div>

                    <h4 className="text-base md:text-lg"> مسیر موفقیت از یک انتخاب<br /> درســــت آغـــــــــاز می شـــــود </h4>
                </div>
                <div className="flex flex-col md:-mt-4 mt-0 items-center justify-center">
                    <h4 className="font-arial text-3xl md:text-5xl font-bold text-secondery">T1</h4>
                    <h4 className="font-yekan-bakh text-white text-base md:text-lg font-bold">آرین تجارت تیوان</h4>

                </div>

            </div>
        </>
    )
}