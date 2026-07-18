"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaNodeJs } from "react-icons/fa";
import { PiChartLineUpLight } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbSeo, TbWorldWww } from "react-icons/tb";

const stats = [
  {
    Icon: TbWorldWww,
    end: 100,
    label: "وبسایت اختصاصی",
  },
  {
    Icon: FaNodeJs,
    end: 50,
    label: "برنامه نویسی",
  },
  {
    Icon: TbSeo,
    end: 100,
    label: "سئو",
  },
  {
    Icon: PiChartLineUpLight,
    end: 60,
    label: "همکاری در فروش",
  },
  {
    Icon: RiCustomerService2Fill,
    end: 60,
    label: "رضایت مشتری",
  },
];

export default function AboutCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="w-full py-16 font-yekan-bakh">
      <div
        className="mt-10 h-[200px] bg-[#fff3f0]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
        }}
      />

      <div className="container">
        <div
          ref={ref}
          className="relative z-10 -mt-40 grid grid-cols-2 gap-5 text-center sm:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map(({ Icon, end, label }) => (
            <article
              key={label}
              className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-5 shadow-lg shadow-gray-200/60 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:border-secondery/30 hover:shadow-xl hover:shadow-secondery/10 motion-reduce:transform-none"
            >
              <Icon
                className="size-10 text-secondery sm:size-14"
                aria-hidden="true"
              />

              <div className="text-lg font-extrabold text-primary sm:text-2xl">
                {inView ? <CountUp end={end} duration={3} /> : 0}
                <span>+</span>
              </div>

              <h3 className="text-sm font-semibold leading-7 text-gray-600 sm:text-base">
                {label}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
