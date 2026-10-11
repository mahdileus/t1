import SectionHeader from "./SectionHeader";

export default function TechnologyFAQ({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section
            id={data.id || "faq"}
            className="relative scroll-mt-24"
        >
            <SectionHeader
                badge={data.badge}
                title={data.title}
                highlight={data.highlight}
                description={data.description}
            />

            <div className="mx-auto max-w-4xl space-y-3">
                {data.items.map((item, index) => (
                    <details
                        key={`faq-${index}-${item.question}`}
                        className="
              group relative overflow-hidden
              rounded-[24px]
              border border-primary/40
              bg-primary/30
              transition-all duration-500
              open:bg-white/[0.03]
            "
                    >
                        <summary
                            className="
                flex cursor-pointer
                list-none
                items-center
                justify-between
                gap-5
                p-6
                md:p-7
                [&::-webkit-details-marker]:hidden
              "
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    border
                    text-[11px]
                  "
                                    style={{
                                        color: "var(--tech-hex)",
                                        borderColor: "rgba(var(--tech-color), .2)",
                                        background: "rgba(var(--tech-color), .1)",
                                    }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3
                                    className="
                    text-[13px]
                    font-bold
                    leading-7
                    text-white
                    md:text-[15px]
                  "
                                >
                                    {item.question}
                                </h3>
                            </div>

                            <span
                                className="
                  flex size-9 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-white/[0.06]
                  bg-white/[0.04]
                  text-[20px]
                  text-gray-400
                  transition-all duration-300
                  group-open:rotate-45
                "
                            >
                                +
                            </span>
                        </summary>

                        <div className="px-6 pb-7 md:px-[84px]">
                            <div className="border-t border-white/[0.06] pt-5">
                                {item.answer?.length > 0 && (
                                    <div className="space-y-4 text-[12px] leading-8 text-gray-400">
                                        {item.answer.map((paragraph, paragraphIndex) => (
                                            <p key={`answer-${index}-${paragraphIndex}`}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {item.highlights?.length > 0 && (
                                    <div
                                        className={`
                      mt-6 grid gap-2
                      ${item.highlights.length >= 5
                                                ? "sm:grid-cols-5"
                                                : "sm:grid-cols-3"
                                            }
                    `}
                                    >
                                        {item.highlights.map(
                                            (highlight, highlightIndex) => (
                                                <div
                                                    key={`highlight-${index}-${highlightIndex}-${highlight.label}`}
                                                    className="
                            rounded-xl
                            bg-white/[0.04]
                            p-3
                            text-center
                          "
                                                >
                                                    <span className="text-[10px] text-gray-500">
                                                        {highlight.label}
                                                    </span>

                                                    <strong className="mt-1 block text-[11px] text-white">
                                                        {highlight.value}
                                                    </strong>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {item.note && (
                                    <div
                                        className="mt-5 rounded-xl border p-4"
                                        style={{
                                            borderColor:
                                                "rgba(var(--tech-color), .10)",
                                            background:
                                                "rgba(var(--tech-color), .04)",
                                        }}
                                    >
                                        <span
                                            className="text-[10px] font-bold"
                                            style={{
                                                color: "var(--tech-hex)",
                                            }}
                                        >
                                            {item.note.title}
                                        </span>

                                        <p className="mt-1 text-[11px] leading-6 text-gray-300">
                                            {item.note.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}