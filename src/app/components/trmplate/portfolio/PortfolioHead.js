import Image from "next/image";
import Link from "next/link";

import {
  FaCheck,
  FaCode,
  FaHtml5,
  FaIndustry,
  FaRegLightbulb,
  FaTags,
  FaUserTie,
} from "react-icons/fa";

import { CiFolderOn } from "react-icons/ci";
import { TbSeo, TbWorldWww } from "react-icons/tb";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir"
).replace(/\/$/, "");

function getAbsoluteUrl(value) {
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}/${String(value).replace(/^\/+/, "")}`;
}

function getImageSrc(value) {
  return value || "/images/fallback.webp";
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function TextSection({ title, icon, children }) {
  if (!children) return null;

  return (
    <section className=" pt-7">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-secondery">{icon}</span>
        <h2 className="text-xl font-bold text-primary">{title}</h2>
      </div>

      <div className="whitespace-pre-line text-sm leading-8 text-gray-700">
        {children}
      </div>
    </section>
  );
}

function RichTextSection({ title, icon, content }) {
  if (!content) return null;

  return (
    <section className=" pt-7">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-secondery">{icon}</span>
        <h2 className="text-xl font-bold text-primary">{title}</h2>
      </div>

      <div
        className="rich-text text-sm leading-8 text-gray-700"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </section>
  );
}

function MetaItem({ icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-secondery">{icon}</span>

      <div className="min-w-0">
        <span className="block text-xs text-gray-500">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-primary">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioHead({ project, projects = [] }) {
  const categoryIcons = {
    "وب سایت": <TbWorldWww className="h-5 w-5 text-secondery" />,
    سئو: <TbSeo className="h-5 w-5 text-secondery" />,
    "برنامه نویسی": <FaHtml5 className="h-5 w-5 text-secondery" />,
    default: <CiFolderOn className="h-5 w-5 text-secondery" />,
  };

  const tags = toArray(project?.tags);
  const technologies = toArray(project?.technologies);
  const features = toArray(project?.features);
  const gallery = toArray(project?.gallery);

  const thumbnail = getImageSrc(project?.thumbnail);
  const mainPicture = getImageSrc(project?.mainPicture);

  return (
    <div className="container my-10 font-yekan-bakh">
      <article>
        <header className="grid gap-8 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl md:grid-cols-[minmax(260px,32%)_1fr] md:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={thumbnail}
              alt={project.imageAlt || project.title || "تصویر پروژه"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 32vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-primary shadow-sm">
                  {categoryIcons[project.category] || categoryIcons.default}
                  {project.category || "نمونه‌کار"}
                </span>

                {project.isFeatured ? (
                  <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
                    پروژه منتخب
                  </span>
                ) : null}
              </div>

              <h1 className="text-2xl font-bold leading-10 text-primary md:text-4xl">
                {project.title || "عنوان پروژه"}
              </h1>

              {project.shortDescription ? (
                <p className="mt-5 text-sm leading-8 text-gray-700 md:text-base">
                  {project.shortDescription}
                </p>
              ) : null}
            </div>

            <div className="grid gap-5  pt-5 sm:grid-cols-2">
              <MetaItem
                icon={<FaUserTie />}
                label="کارفرما"
                value={project.clientName}
              />

              <MetaItem
                icon={<FaIndustry />}
                label="صنعت"
                value={project.industry}
              />

              <MetaItem
                icon={<CiFolderOn className="h-5 w-5" />}
                label="نوع پروژه"
                value={project.projectType}
              />

              <MetaItem
                icon={<FaCode />}
                label="برند"
                value={project.brandName}
              />
            </div>

            {project.link ? (
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center rounded-xl bg-secondery px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  مشاهده وب‌سایت پروژه
                </a>
              </div>
            ) : null}
          </div>
        </header>

        <section className="pt-16 mt-8 rounded-3xl  bg-white/10 p-5 shadow-lg backdrop-blur-xl md:p-8">
          <RichTextSection
            title="درباره پروژه"
            icon={<FaRegLightbulb />}
            content={project.longDescription}
          />

          {!project.longDescription && project.shortDescription ? (
            <TextSection
              title="درباره پروژه"
              icon={<FaRegLightbulb />}
            >
              {project.shortDescription}
            </TextSection>
          ) : null}

          {project.challenge ? (
            <TextSection title="چالش پروژه" icon={<FaRegLightbulb />}>
              {project.challenge}
            </TextSection>
          ) : null}

          {project.solution ? (
            <TextSection title="راهکار اجراشده" icon={<FaCheck />}>
              {project.solution}
            </TextSection>
          ) : null}

          {features.length > 0 ? (
            <section className="pt-16">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-secondery">
                  <FaCheck />
                </span>
                <h2 className="text-xl font-bold text-primary">
                  امکانات و قابلیت‌ها
                </h2>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <li
                    key={`${feature}-${index}`}
                    className="flex items-start gap-3 text-sm leading-7 text-gray-700"
                  >
                    <FaCheck className="mt-2 shrink-0 text-secondery" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}



          {project.mainPicture ? (
            <section className=" pt-16">
              <h2 className="mb-5 text-xl font-bold text-primary">
                تصویر اصلی پروژه
              </h2>

              <div className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={mainPicture}
                  alt={
                    project.imageAlt ||
                    `${project.title} - تصویر اصلی پروژه`
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
            </section>
          ) : null}

          {gallery.length > 0 ? (
            <section className=" pt-7">
              <h2 className="mb-5 text-xl font-bold text-primary">
                تصاویر بیشتر پروژه
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => {
                  const imageSrc =
                    typeof image === "string"
                      ? getImageSrc(image)
                      : getImageSrc(image?.url || image?.src);

                  return (
                    <a
                      key={`${imageSrc}-${index}`}
                      href={getAbsoluteUrl(imageSrc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
                    >
                      <Image
                        src={imageSrc}
                        alt={
                          typeof image === "object" && image?.alt
                            ? image.alt
                            : `${project.title} - تصویر ${index + 1}`
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </a>
                  );
                })}
              </div>
            </section>
          ) : null}
          <div className="flex items-center justify-between px-10">
            {technologies.length > 0 ? (
              <section className=" pt-7">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-secondery">
                    <FaCode />
                  </span>
                  <h2 className="text-xl font-bold text-primary">
                    تکنولوژی‌های استفاده‌شده
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology, index) => (
                    <span
                      key={`${technology}-${index}`}
                      className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-white"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {tags.length > 0 ? (
              <section className=" pt-7">
                <div className="mb-4 flex items-center gap-2">
                  <FaTags className="text-primary" />
                  <h2 className="text-xl font-bold text-primary">برچسب‌ها</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full bg-[#fff3f0] px-4 py-2 text-sm text-secondery"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

        </section>
      </article>

      {projects.length > 0 ? (
        <section className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary">
              جدیدترین نمونه‌کارها
            </h2>

            <Link
              href="/portfolios"
              className="text-sm font-semibold text-secondery hover:underline"
            >
              مشاهده همه
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((item) => (
              <Link
                key={item._id}
                href={`/portfolios/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/20 bg-white/60 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={getImageSrc(item.thumbnail)}
                    alt={item.imageAlt || item.title || "نمونه‌کار"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="mb-2 line-clamp-1 text-base font-bold text-primary">
                    {item.title}
                  </h3>

                  {item.shortDescription ? (
                    <p className="line-clamp-2 text-sm leading-7 text-gray-600">
                      {item.shortDescription}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
