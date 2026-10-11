import SectionHeader from "./SectionHeader";

export default function TechnologyUseCases({ data }) {
    if (!data) return null;

    return (
        <section
            id={data.id || "use-cases"}
            className="relative scroll-mt-24"
        >
            <SectionHeader
                badge={data.badge}
                title={data.title}
                highlight={data.highlight}
                description={data.description}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.items?.map((item, index) => (
                    <article
                        key={item.title}
                        className="
              group relative overflow-hidden
              rounded-[24px]
              border border-primary/40
              bg-primary/30
              p-6
              transition-all duration-500
              hover:-translate-y-1
            "
                    >
                        <div
                            className="
                pointer-events-none
                absolute -left-16 -top-16
                size-40 rounded-full
                opacity-0 blur-3xl
                transition-opacity duration-500
                group-hover:opacity-100
              "
                            style={{
                                background: "rgba(var(--tech-color), .15)",
                            }}
                        />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-[11px] font-bold"
                                    style={{ color: "var(--tech-hex)" }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {item.tag && (
                                    <span
                                        className="
                      rounded-full px-3 py-1
                      text-[9px]
                    "
                                        style={{
                                            color: "var(--tech-hex)",
                                            background: "rgba(var(--tech-color), .10)",
                                        }}
                                    >
                                        {item.tag}
                                    </span>
                                )}
                            </div>

                            <h3 className="mt-4 text-[17px] font-bold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-[12px] leading-7 text-gray-400">
                                {item.description}
                            </p>

                            {item.features?.length > 0 && (
                                <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                                    {item.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 text-[11px] text-gray-400"
                                        >
                                            <span style={{ color: "var(--tech-hex)" }}>✓</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {data.bottomNote && (
                <div
                    className="
            relative mt-10 overflow-hidden
            rounded-[24px]
            border border-white/[0.06]
            bg-white/[0.03]
            p-6 md:p-8
          "
                >
                    <div
                        className="absolute right-0 top-0 h-full w-1"
                        style={{
                            background: "var(--tech-hex)",
                        }}
                    />

                    <h3 className="text-[18px] font-bold text-white">
                        {data.bottomNote.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-8 text-gray-400">
                        {data.bottomNote.description}
                    </p>
                </div>
            )}
        </section>
    );
}