"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import TechnologyScene from "./motion/TechnologyScene";

export default function TechnologyHero({ technology }) {
    const root = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            timeline
                .from("[data-hero-badge]", {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                })
                .from(
                    "[data-hero-title]",
                    {
                        opacity: 0,
                        y: 45,
                        duration: 0.9,
                    },
                    "-=.35"
                )
                .from(
                    "[data-hero-tag]",
                    {
                        opacity: 0,
                        y: 15,
                        stagger: 0.1,
                        duration: 0.5,
                    },
                    "-=.45"
                )
                .from(
                    "[data-hero-description]",
                    {
                        opacity: 0,
                        y: 25,
                        duration: 0.7,
                    },
                    "-=.25"
                )
                .from(
                    "[data-hero-button]",
                    {
                        opacity: 0,
                        y: 15,
                        stagger: 0.1,
                        duration: 0.5,
                    },
                    "-=.3"
                );
        }, root);

        return () => ctx.revert();
    }, []);

    if (!technology?.hero) return null;

    const hero = technology.hero;

    return (
        <section
            id="hero"
            ref={root}
            className="
                relative
                grid grid-cols-1
                items-center
                gap-10
                md:grid-cols-2
                md:gap-8
            "
        >

            {/* =========================================
                Hero Content
            ========================================= */}
            <div className="relative z-10 space-y-5">

                {/* Badge */}
                <div
                    data-hero-badge
                    className="
                        mx-auto w-fit
                        rounded-full
                        bg-primary/60
                        px-4 py-1.5
                        text-[12px]
                        text-gray-300
                        md:mx-0
                    "
                >
                    {hero.badge}
                </div>

                {/* Title */}
                <div
                    data-hero-title
                    className="
                        text-center
                        font-yekan-bakh-Fat
                        text-[32px]
                        font-bold
                        leading-[1.6]
                        text-white
                        sm:text-[34px]
                        md:text-start
                        md:text-[38px]
                        lg:text-[42px]
                    "
                >
                    <h1>
                        {hero.titleBefore}{" "}

                        <span
                            style={{
                                color: "var(--tech-hex)",
                            }}
                        >
                            {hero.highlightedTitle}
                        </span>

                        <span className="md:block">
                            {hero.titleAfter}
                        </span>
                    </h1>
                </div>

                {/* Tags */}
                {hero.tags?.length > 0 && (
                    <div
                        className="
                            flex flex-wrap
                            items-center
                            justify-center
                            gap-2.5
                            text-[13px]
                            md:justify-start
                        "
                    >
                        {hero.tags.map((tag, index) => (
                            <div
                                key={`hero-tag-${tag.title}-${index}`}
                                data-hero-tag
                                className="
                                    rounded-full
                                    px-5 py-1.5
                                "
                                style={{
                                    color: "var(--tech-hex)",
                                    background:
                                        "rgba(var(--tech-color), .15)",
                                }}
                            >
                                {tag.title}
                            </div>
                        ))}
                    </div>
                )}

                {/* Description */}
                {hero.description?.length > 0 && (
                    <div
                        data-hero-description
                        className="
                            mt-4
                            space-y-3
                            text-center
                            font-yekan-bakh-light
                            leading-8
                            md:pe-8
                            md:text-start
                            text-white
                        "
                    >
                        {hero.description.map(
                            (item, index) => (
                                <p
                                    key={`hero-description-${index}`}
                                    className={
                                        index
                                            ? "text-gray-400"
                                            : ""
                                    }
                                >
                                    {item}
                                </p>
                            )
                        )}
                    </div>
                )}

                {/* Actions */}
                {hero.actions?.length > 0 && (
                    <div
                        className="
                            flex flex-wrap
                            items-center
                            justify-center
                            gap-2.5
                            md:justify-start
                        "
                    >
                        {hero.actions.map(
                            (action, index) => (
                                <a
                                    key={`hero-action-${action.href}-${index}`}
                                    href={action.href}
                                    data-hero-button
                                    className="
                                        rounded-full
                                        border-2
                                        px-5 py-2
                                        transition
                                        duration-300
                                        hover:bg-white/[0.03]
                                    "
                                    style={{
                                        borderColor:
                                            "rgba(var(--tech-color), .7)",
                                    }}
                                >
                                    {action.label}
                                </a>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* =========================================
                Three.js Technology Scene
            ========================================= */}
            <TechnologyScene
                technology={technology}
            />
        </section>
    );
}