export default function TechnologyNavigation({
  items,
}) {
  return (
    <section>
      <div className="mx-auto mb-12 max-w-2xl text-center">

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
          راهنمای توسعه
        </div>

        <h2
          className="
            mb-3
            font-yekan-bakh-Fat
            text-[32px]
            text-white
          "
        >
          راهنمای جامع{" "}

          <span
            style={{
              color: "var(--tech-hex)",
            }}
          >
            تکنولوژی
          </span>
        </h2>
      </div>

      <div
        className="
          grid grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-5
        "
      >
        {items.map((item , index) => (
          <a
            href={index}
            key={item.number}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-primary/40
              bg-primary/30
              p-5
              transition-all
              duration-500
              hover:-translate-y-1
            "
          >
            <span
              className="text-[12px]"
              style={{
                color: "var(--tech-hex)",
              }}
            >
              {item.number}
            </span>

            <h3
              className="
                mt-3
                text-[17px]
                font-bold
                text-white
              "
            >
              {item.title}
            </h3>

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

            <div
              className="
                absolute
                bottom-0 right-0
                h-px w-0
                transition-all
                duration-500
                group-hover:w-full
              "
              style={{
                background:
                  "var(--tech-hex)",
              }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}