"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyArchitecture({ data }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!root.current || !data) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-architecture-intro]", {
        scrollTrigger: {
          trigger: "[data-architecture-intro]",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from("[data-architecture-overview]", {
        scrollTrigger: {
          trigger: "[data-architecture-overview]",
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from("[data-overview-item]", {
        scrollTrigger: {
          trigger: "[data-architecture-overview]",
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from("[data-architecture-layer]", {
        scrollTrigger: {
          trigger: "[data-architecture-layers]",
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-flow-item]", {
        scrollTrigger: {
          trigger: "[data-architecture-flow]",
          start: "top 82%",
          once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.92,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.4)",
      });

      gsap.to("[data-architecture-glow]", {
        x: 25,
        y: 20,
        scale: 1.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [data]);

  if (!data) return null;

  return (
    <section
      ref={root}
      id={data.id || "architecture"}
      className="relative scroll-mt-24"
    >
      <SectionHeader
        badge={data.badge}
        title={data.title}
        highlight={data.highlight}
        description={data.description}
      />

      {/* Intro + Overview */}
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div
          data-architecture-intro
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-white/[0.06]
            bg-white/[0.04]
            p-7 md:p-9
          "
        >
          <div
            data-architecture-glow
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-32 -top-32
              size-[400px]
              rounded-full blur-3xl
            "
            style={{
              background: "rgba(var(--tech-color), .10)",
            }}
          />

          <span
            className="relative text-[11px] font-bold tracking-[1px]"
            style={{ color: "var(--tech-hex)" }}
          >
            {data.eyebrow}
          </span>

          <h3 className="relative mt-2 text-[23px] font-bold leading-9 text-white">
            {data.introTitle}
          </h3>

          <div className="relative mt-5 space-y-4 text-[14px] leading-[2.1] text-gray-300">
            {data.paragraphs?.map((paragraph, index) => (
              <p key={`architecture-paragraph-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {data.note && (
            <div className="relative mt-7 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <div className="flex gap-3">
                <div
                  className="
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-xl font-bold text-white
                  "
                  style={{
                    background: "var(--tech-hex)",
                  }}
                >
                  !
                </div>

                <div>
                  <h4 className="font-bold text-white">
                    {data.note.title}
                  </h4>

                  <p className="mt-1 text-[12px] leading-7 text-gray-400">
                    {data.note.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overview */}
        <div
          data-architecture-overview
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-white/[0.06]
            bg-white/[0.04]
            p-7 text-white
          "
        >
          <div
            data-architecture-glow
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-16 -top-16
              size-52 rounded-full blur-3xl
            "
            style={{
              background: "rgba(var(--tech-color), .18)",
            }}
          />

          <div className="relative">
            <span
              className="text-[10px] tracking-[2px]"
              style={{ color: "var(--tech-hex)" }}
            >
              STRUCTURE OVERVIEW
            </span>

            <h3 className="mt-2 text-[21px] font-bold">
              {data.overviewTitle}
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-gray-400">
              {data.overviewDescription}
            </p>

            <div className="mt-7 space-y-2">
              {data.overview?.map((item, index) => (
                <div
                  key={`overview-${item.title}-${index}`}
                  data-overview-item
                  className="
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.06]
                    bg-white/[0.04]
                    px-4 py-3
                    transition-colors duration-300
                    hover:bg-white/[0.07]
                  "
                >
                  <span
                    className="
                      flex size-8 shrink-0
                      items-center justify-center
                      rounded-lg text-[10px]
                    "
                    style={{
                      color: "var(--tech-hex)",
                      background:
                        "rgba(var(--tech-color), .10)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <strong className="block text-[12px]">
                      {item.title}
                    </strong>

                    <span className="text-[10px] text-gray-500">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layers */}
      {data.layers?.length > 0 && (
        <div
          data-architecture-layers
          className="mt-24"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span
              className="text-[11px] font-bold"
              style={{ color: "var(--tech-hex)" }}
            >
              LAYERED ARCHITECTURE
            </span>

            <h3 className="mt-2 text-[27px] font-bold text-white">
              {data.layersTitle}
            </h3>

            <p className="mt-3 text-[13px] leading-7 text-gray-400">
              {data.layersDescription}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {data.layers.map((layer, index) => (
              <article
                key={`layer-${layer.title}-${index}`}
                data-architecture-layer
                className="
                  group relative overflow-hidden
                  rounded-[24px]
                  border border-primary/40
                  bg-primary/30
                  p-7
                  transition-transform duration-500
                  hover:-translate-y-2
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute -right-16 -top-16
                    size-36 rounded-full
                    opacity-0 blur-3xl
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                  style={{
                    background:
                      "rgba(var(--tech-color), .18)",
                  }}
                />

                <div
                  className="
                    relative flex size-11
                    items-center justify-center
                    rounded-xl font-bold
                  "
                  style={{
                    color: "var(--tech-hex)",
                    background:
                      "rgba(var(--tech-color), .15)",
                  }}
                >
                  {layer.icon}
                </div>

                <h4 className="relative mt-5 text-[18px] font-bold text-white">
                  {layer.title}
                </h4>

                <p className="relative mt-4 text-[12px] leading-7 text-gray-400">
                  {layer.description}
                </p>

                {layer.items?.length > 0 && (
                  <div className="relative mt-5 space-y-2 border-t border-white/[0.06] pt-5">
                    {layer.items.map((item, itemIndex) => (
                      <p
                        key={`layer-${index}-${itemIndex}`}
                        className="text-[11px] text-gray-400"
                      >
                        <span
                          style={{
                            color: "var(--tech-hex)",
                          }}
                        >
                          ✓
                        </span>{" "}
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Flow */}
      {data.flow?.length > 0 && (
        <div
          data-architecture-flow
          className="mt-24"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span
              className="text-[11px] font-bold"
              style={{ color: "var(--tech-hex)" }}
            >
              DATA FLOW
            </span>

            <h3 className="mt-2 text-[27px] font-bold text-white">
              {data.flowTitle}
            </h3>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-[8%] right-[8%] top-10
                hidden h-px lg:block
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(var(--tech-color), .45), transparent)",
              }}
            />

            {data.flow.map((item, index) => (
              <div
                key={`flow-${item.title}-${index}`}
                data-flow-item
                className="
                  relative
                  rounded-2xl
                  border border-primary/40
                  bg-primary/30
                  p-5 text-center
                  transition-transform duration-500
                  hover:-translate-y-1
                "
              >
                <div
                  className="
                    relative z-10
                    mx-auto mb-4
                    flex size-10
                    items-center justify-center
                    rounded-xl
                    text-[12px] font-bold
                  "
                  style={{
                    color: "var(--tech-hex)",
                    background:
                      "rgba(var(--tech-color), .15)",
                    boxShadow:
                      "0 0 25px rgba(var(--tech-color), .10)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h4 className="text-[13px] font-bold text-white">
                  {item.title}
                </h4>

                <p className="mt-2 text-[11px] leading-5 text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}