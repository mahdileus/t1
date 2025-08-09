"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { TbWorldWww } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
import { TbSeo } from "react-icons/tb";
import { PiChartLineUpLight } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";

const stats = [
    {
        icon: <TbWorldWww className="text-secondery sm:w-14 sm:h-14 w-10 h-10" />,
        end: 100,
        label: "وبسایت اختصاصی",
    },
    {
        icon: <FaNodeJs className="text-secondery sm:w-14 sm:h-14 w-10 h-10" />,
        end: 50,
        label: "برنامه نویسی",
    },
    {
        icon: <TbSeo className="text-secondery sm:w-14 sm:h-14 w-10 h-10" />,
        end: 100,
        label: "سئو",
    },
    {
        icon: <PiChartLineUpLight className="text-secondery sm:w-14 sm:h-14 w-10 h-10" />,
        end: 60,
        label: "همکاری در فروش ",
    },
    {
        icon: <RiCustomerService2Fill className="text-secondery sm:w-14 sm:h-14 w-10 h-10" />,
        end: 60,
        label: "رضایت مشتری",
    },
];

const AboutCounter = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <section className="w-full py-16 ">
            {/* بک‌گراند شیب‌دار */}
            <div
                className="h-[200px] bg-[#fff3f0] mt-10"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)"
                }}
            ></div>
            <div className="container mx-auto px-4">
                <div className=" rounded-3xl p-5 sm:p-6">
                    <div
                        ref={ref}
                        className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center relative z-10 -mt-40"
                    >
                        {stats.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 bg-white/65 backdrop:blur-2xl shadow rounded-2xl py-4">
                                {item.icon}
                                <span className="sm:text-2xl text-lg font-bold text-primary">
                                    {inView && <CountUp end={item.end} duration={10} />}+
                                </span>
                                <span className="text-md text-gray-600 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCounter;
