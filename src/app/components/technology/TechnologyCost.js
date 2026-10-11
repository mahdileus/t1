import SectionHeader from "./SectionHeader";

function Number({ children }) {
    return (
        <span
            className="text-[11px] font-bold"
            style={{ color: "var(--tech-hex)" }}
        >
            {children}
        </span>
    );
}

export default function TechnologyCost({ data }) {
    if (!data) return null;

    return (
        <section
            id={data.id || "cost"}
            className="relative scroll-mt-24"
        >
            <SectionHeader
                badge={data.badge}
                title={data.title}
                highlight={data.highlight}
                description={data.description}
            />

            {/* Factors */}
            <div>
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <span
                        className="text-[11px] font-bold"
                        style={{ color: "var(--tech-hex)" }}
                    >
                        COST FACTORS
                    </span>

                    <h3 className="mt-2 text-[27px] font-bold leading-10 text-white">
                        {data.factorsTitle}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-gray-400">
                        {data.factorsDescription}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.factors?.map((item, index) => (
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
                            <Number>
                                {String(index + 1).padStart(2, "0")}
                            </Number>

                            <h4 className="mt-4 text-[17px] font-bold text-white">
                                {item.title}
                            </h4>

                            <p className="mt-3 text-[12px] leading-7 text-gray-400">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            {/* Complexity */}
            {data.complexity?.length > 0 && (
                <div className="mt-24">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <span
                            className="text-[11px] font-bold"
                            style={{ color: "var(--tech-hex)" }}
                        >
                            PROJECT LEVEL
                        </span>

                        <h3 className="mt-2 text-[27px] font-bold text-white">
                            {data.complexityTitle}
                        </h3>

                        <p className="mt-3 text-[13px] leading-7 text-gray-400">
                            {data.complexityDescription}
                        </p>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {data.complexity.map((level, index) => (
                            <article
                                key={level.title}
                                className="
                  relative overflow-hidden
                  rounded-[26px]
                  border border-primary/40
                  bg-primary/30
                  p-7
                "
                            >
                                {level.featured && (
                                    <div
                                        className="
                      pointer-events-none
                      absolute inset-0
                      opacity-30
                    "
                                        style={{
                                            background:
                                                "radial-gradient(circle at top right, rgba(var(--tech-color),.2), transparent 45%)",
                                        }}
                                    />
                                )}

                                <div className="relative">
                                    <div className="flex items-start justify-between">
                                        <span
                                            className="
                        flex size-11 items-center justify-center
                        rounded-xl bg-white/[0.05]
                        text-[12px] text-white
                      "
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] text-gray-400">
                                            {level.label}
                                        </span>
                                    </div>

                                    <h4 className="mt-6 text-[19px] font-bold text-white">
                                        {level.title}
                                    </h4>

                                    <p className="mt-2 text-[12px] leading-7 text-gray-400">
                                        {level.description}
                                    </p>

                                    <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5 text-[11px]">
                                        {level.items.map((item,index) => (
                                            <p key={index} className="text-white">
                                                <span style={{ color: "var(--tech-hex)" }}>
                                                    ✓
                                                </span>{" "}
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {/* Additional costs */}
            {data.additionalCosts?.length > 0 && (
                <div className="mt-24 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
                    <div
                        className="
              rounded-[28px]
              border border-primary/40
              bg-primary/30
              p-8
            "
                    >
                        <span
                            className="text-[11px]"
                            style={{ color: "var(--tech-hex)" }}
                        >
                            AFTER DEVELOPMENT
                        </span>

                        <h3 className="mt-3 text-[23px] font-bold leading-9 text-white">
                            {data.additionalTitle}
                        </h3>

                        <p className="mt-4 text-[13px] leading-8 text-gray-400">
                            {data.additionalDescription}
                        </p>

                        {data.additionalNote && (
                            <div className="mt-7 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5">
                                <span
                                    className="text-[10px]"
                                    style={{ color: "var(--tech-hex)" }}
                                >
                                    نکته مهم
                                </span>

                                <p className="mt-2 text-[11px] leading-6 text-gray-400">
                                    {data.additionalNote}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {data.additionalCosts.map((item, index) => (
                            <div
                                key={item.title}
                                className="
                  rounded-2xl
                  border border-primary/40
                  bg-primary/30
                  p-5
                "
                            >
                                <Number>
                                    {String(index + 1).padStart(2, "0")}
                                </Number>

                                <h4 className="mt-2 text-[14px] font-bold text-white">
                                    {item.title}
                                </h4>

                                <p className="mt-2 text-[11px] leading-6 text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Estimation */}
            {data.estimation?.length > 0 && (
                <div className="mt-24">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <span
                            className="text-[11px] font-bold"
                            style={{ color: "var(--tech-hex)" }}
                        >
                            PRICE ESTIMATION
                        </span>

                        <h3 className="mt-2 text-[27px] font-bold text-white">
                            {data.estimationTitle}
                        </h3>

                        <p className="mt-3 text-[13px] leading-7 text-gray-400">
                            {data.estimationDescription}
                        </p>
                    </div>

                    <div className="relative">
                        <div
                            className="
                absolute left-[10%] right-[10%] top-6
                hidden h-px lg:block
              "
                            style={{
                                background:
                                    "linear-gradient(to right, transparent, rgba(var(--tech-color),.3), transparent)",
                            }}
                        />

                        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            {data.estimation.map((step, index) => (
                                <div key={step.title} className="text-center">
                                    <span
                                        className="
                      mx-auto flex size-12
                      items-center justify-center
                      rounded-full
                      border
                      text-[11px] font-bold
                      backdrop-blur-xl
                    "
                                        style={{
                                            color: "var(--tech-hex)",
                                            borderColor:
                                                "rgba(var(--tech-color), .3)",
                                            background:
                                                "rgba(var(--tech-color), .08)",
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <h4 className="mt-5 text-[14px] font-bold text-white">
                                        {step.title}
                                    </h4>

                                    <p className="mt-2 text-[11px] leading-6 text-gray-400">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}