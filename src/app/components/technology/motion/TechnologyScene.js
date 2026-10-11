/* =========================================================
   TechnologyScene (Hero)

   فقط یک جایگاه DOM است. لوگوی سه‌بعدی واقعی در
   TechnologyStage رسم می‌شود و به data-logo-anchor="hero"
   می‌چسبد. برچسب‌ها از technology.motion.labels می‌آیند.
========================================================= */

const LABEL_POSITIONS = [
  "left-[6%] top-[22%]",
  "bottom-[22%] right-[4%]",
  "left-[10%] bottom-[14%]",
  "right-[8%] top-[14%]",
];

export default function TechnologyScene({ technology }) {
  if (!technology) return null;

  const labels = technology.motion?.labels || [];

  return (
    <div
      className="
        relative
        h-[22rem]
        w-full
        sm:h-[28rem]
        lg:h-[36rem]
      "
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2 top-1/2
          size-[65%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[100px]
        "
        style={{ background: "rgba(var(--tech-color), .12)" }}
      />

      {/* جایگاه لوگوی سه‌بعدی */}
      <div
        aria-hidden="true"
        data-logo-anchor="hero"
        className="
          absolute
          left-1/2 top-1/2
          aspect-square
          w-[58%]
          max-w-[21rem]
          -translate-x-1/2
          -translate-y-1/2
        "
      />

      {/* برچسب‌ها */}
      {labels.slice(0, LABEL_POSITIONS.length).map((label, index) => (
        <div
          key={label}
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            hidden
            rounded-full
            border
            bg-black/20
            px-3 py-1.5
            text-[9px]
            tracking-[2px]
            lg:block
            ${LABEL_POSITIONS[index]}
          `}
          style={{
            color: "rgba(var(--tech-color), .7)",
            borderColor: "rgba(var(--tech-color), .18)",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
