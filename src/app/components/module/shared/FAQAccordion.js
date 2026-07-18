"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

export default function FAQAccordion({
  faqs = [],
  title = "سوالات متداول",
  badge = "FAQ",
  image = "/images/FAQ.png",
  imageAlt = "سوالات متداول",
  minImageHeight = "md:min-h-[420px]",
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  if (!faqs.length) return null;

  return (
    <section className="w-full py-16 md:py-20 font-yekan-bakh">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 text-center">
          {badge && (
            <span className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {badge}
            </span>
          )}

          {title && (
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
              {title}
            </h2>
          )}
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 space-y-3 md:order-1">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  className={[
                    "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                    isOpen
                      ? "border-primary/30 shadow-lg shadow-primary/10"
                      : "border-gray-200 shadow-sm hover:border-primary/20 hover:shadow-md",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-right md:px-5"
                  >
                    <span
                      className={[
                        "text-sm font-bold leading-7 transition-colors md:text-base",
                        isOpen ? "text-primary" : "text-gray-800",
                      ].join(" ")}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={[
                        "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isOpen
                          ? "rotate-45 bg-primary text-white"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      <FaPlus className="text-xs" />
                    </span>
                  </button>

                  <div
                    className={[
                      "grid transition-all duration-300 ease-in-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-gray-100 px-4 pb-5 pt-3 text-sm leading-8 text-gray-600 md:px-5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {image && (
            <div className="order-1 md:order-2">
              <div
                className={[
                  "relative flex min-h-[280px] items-center justify-center rounded-[2rem]",
                  "border border-gray-100 bg-white/80 p-5 shadow-lg shadow-gray-200/70 backdrop-blur-3xl",
                  minImageHeight,
                ].join(" ")}
              >
                <Image
                  className="select-none object-contain"
                  src={image}
                  width={500}
                  height={500}
                  alt={imageAlt}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
