export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  logoAnchor = true,
}) {
  return (
    <header
      className="
        mx-auto mb-14
        max-w-3xl
        text-center
      "
    >
      {/* جایگاه لوگوی سه‌بعدی (فقط دسکتاپ) */}
      {logoAnchor && (
        <div
          aria-hidden="true"
          data-logo-anchor="section"
          className="mx-auto mb-6 hidden size-24 lg:block"
        />
      )}

      {badge && (
        <div
          className="
            mx-auto mb-4
            w-fit
            rounded-full
            bg-primary/60
            px-4 py-1.5
            text-[12px]
            text-gray-300
          "
        >
          {badge}
        </div>
      )}

      <h2
        className="
          font-yekan-bakh-Fat
          text-[30px]
          font-bold
          leading-[1.5]
          text-white
          md:text-[38px]
        "
      >
        {title}{" "}

        {highlight && (
          <span
            style={{
              color: "var(--tech-hex)",
            }}
          >
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className="
            mx-auto mt-4
            max-w-2xl
            text-[14px]
            leading-8
            text-gray-400
            md:text-[15px]
          "
        >
          {description}
        </p>
      )}
    </header>
  );
}