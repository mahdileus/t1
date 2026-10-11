import SectionHeader from "./SectionHeader";

export default function TechnologyIntroduction({ data }) {
    if (!data) return null;

    return (
        <section
            id={data.id || "introduction"}
            className="relative scroll-mt-24"
        >


            {/* =========================================
                Section Header
            ========================================= */}
            <SectionHeader
                badge={data.eyebrow}
                title={data.title}
                highlight=""
                description={data.description}
            />

            {/* =========================================
                Introduction + Overview
            ========================================= */}
            <div
                className="
                    grid
                    items-stretch
                    gap-6
                    lg:grid-cols-[1.5fr_.8fr]
                "
            >
                {/* Introduction */}
                <div
                    className="
                        rounded-[28px]
                        border
                        border-white/[0.06]
                        bg-white/[0.04]
                        p-6
                        md:p-9
                    "
                >
                    <span
                        className="text-[11px]"
                        style={{
                            color: "var(--tech-hex)",
                        }}
                    >
                        TECHNOLOGY DEVELOPMENT
                    </span>

                    <h3
                        className="
                            mt-2
                            text-[21px]
                            font-bold
                            text-white
                        "
                    >
                        {data.title} چیست؟
                    </h3>

                    <p
                        className="
                            mt-5
                            text-[14px]
                            leading-[2.1]
                            text-gray-400
                        "
                    >
                        {data.description}
                    </p>
                </div>

                {/* Overview */}
                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-white/[0.06]
                        bg-white/[0.04]
                        p-7
                    "
                >
                    {/* Glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -left-16
                            -top-16
                            size-48
                            rounded-full
                            blur-3xl
                        "
                        style={{
                            background:
                                "rgba(var(--tech-color), .25)",
                        }}
                    />

                    <h3
                        className="
                            relative
                            mb-6
                            text-[21px]
                            font-bold
                            text-white
                        "
                    >
                        {data.title} در یک نگاه
                    </h3>

                    <div className="relative space-y-2">
                        {data.overview?.map(
                            ([label, value], index) => (
                                <div
                                    key={`overview-${label}-${index}`}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        rounded-xl
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.04]
                                        px-4
                                        py-3.5
                                    "
                                >
                                    <span
                                        className="
                                            text-[12px]
                                            text-gray-400
                                        "
                                    >
                                        {label}
                                    </span>

                                    <span
                                        className="
                                            text-left
                                            text-[12px]
                                            text-white
                                        "
                                    >
                                        {value}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* =========================================
                Main Technologies
            ========================================= */}
            {data.technologies?.length > 0 && (
                <div
                    className="
                        mt-20
                        grid
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-primary/40
                        bg-primary/30
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {data.technologies.map(
                        (item, index) => (
                            <article
                                key={`technology-${item.number}-${item.title}-${index}`}
                                className="
                                    p-7
                                    transition-colors
                                    hover:bg-white/[0.02]
                                "
                            >
                                <span
                                    className="text-[11px]"
                                    style={{
                                        color: "var(--tech-hex)",
                                    }}
                                >
                                    {item.number}
                                </span>

                                <h4
                                    className="
                                        mt-3
                                        font-bold
                                        text-white
                                    "
                                >
                                    {item.title}
                                </h4>

                                <p
                                    className="
                                        mt-2
                                        text-[12px]
                                        leading-6
                                        text-gray-400
                                    "
                                >
                                    {item.description}
                                </p>
                            </article>
                        )
                    )}
                </div>
            )}
        </section>
    );
}