import SectionHeader from "./SectionHeader";

export default function TechnologyComparison({ data }) {
    if (!data) return null;

    return (
        <section
            id={data.id || "comparison"}
            className="relative scroll-mt-24"
        >
            <SectionHeader
                badge={data.badge}
                title={data.title}
                highlight={data.highlight}
                description={data.description}
            />

            {/* Cards */}
            {data.cards?.length > 0 && (
                <div className="mb-14 grid gap-5 lg:grid-cols-3">
                    {data.cards.map((item, index) => (
                        <article
                            key={item.title}
                            className={`
                relative overflow-hidden
                rounded-[26px]
                border
                p-7
                ${item.featured
                                    ? "border-[rgba(var(--tech-color),.35)] bg-[rgba(var(--tech-color),.05)]"
                                    : "border-primary/40 bg-primary/30"
                                }
              `}
                        >
                            {item.featured && (
                                <span
                                    className="
                    absolute left-5 top-5
                    rounded-full px-3 py-1
                    text-[9px]
                  "
                                    style={{
                                        color: "var(--tech-hex)",
                                        background: "rgba(var(--tech-color), .12)",
                                    }}
                                >
                                    پیشنهاد اصلی
                                </span>
                            )}

                            <span
                                className="text-[10px] font-bold"
                                style={{ color: "var(--tech-hex)" }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3 className="mt-4 text-[19px] font-bold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-[12px] leading-7 text-gray-400">
                                {item.description}
                            </p>

                            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5">
                                {item.items?.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 text-[11px] text-gray-400"
                                    >
                                        <span style={{ color: "var(--tech-hex)" }}>✓</span>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Table */}
            {data.table && (
                <div
                    className="
            overflow-x-auto
            rounded-[28px]
            border border-primary/40
            bg-primary/30
          "
                >
                    <table className="min-w-[850px] w-full text-right">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {data.table.headers.map((header, index) => (
                                    <th
                                        key={header}
                                        className={`
                      p-5 text-[12px] font-bold
                      ${index === 1
                                                ? "text-[var(--tech-hex)]"
                                                : "text-white"
                                            }
                    `}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.table.rows.map((row, index) => (
                                <tr
                                    key={index}
                                    className="
                    border-b border-white/[0.05]
                    last:border-0
                    transition-colors
                    hover:bg-white/[0.02]
                  "
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`
                        p-5
                        text-[11px]
                        leading-6
                        ${cellIndex === 0
                                                    ? "font-bold text-white"
                                                    : cellIndex === 1
                                                        ? "text-[var(--tech-hex)]"
                                                        : "text-gray-400"
                                                }
                      `}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {data.recommendation && (
                <div
                    className="
            mt-8
            rounded-[24px]
            border p-6
          "
                    style={{
                        borderColor: "rgba(var(--tech-color), .20)",
                        background: "rgba(var(--tech-color), .04)",
                    }}
                >
                    <span
                        className="text-[10px] font-bold"
                        style={{ color: "var(--tech-hex)" }}
                    >
                        نتیجه مقایسه
                    </span>

                    <h3 className="mt-2 text-[17px] font-bold text-white">
                        {data.recommendation.title}
                    </h3>

                    <p className="mt-2 text-[12px] leading-7 text-gray-400">
                        {data.recommendation.description}
                    </p>
                </div>
            )}
        </section>
    );
}