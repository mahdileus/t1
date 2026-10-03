import "server-only";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { FiArrowLeft, FiArrowUpLeft, FiCheck, FiChevronLeft, FiExternalLink } from "react-icons/fi";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir").replace(/\/+$/, "");
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondery focus-visible:ring-offset-4";

function safeUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim(), `${SITE_URL}/`);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function imageSrc(value) {
  if (!safeUrl(value)) return null;
  const trimmed = value.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//") ? trimmed : safeUrl(trimmed);
}

function toArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch { /* Also accept comma-separated strings. */ }
  return value.split(/[,،]/).map((item) => item.trim()).filter(Boolean);
}

function textList(value) {
  return toArray(value).filter((item) => typeof item === "string" && item.trim());
}

// Render editor HTML on the server, with no scripts, inline styles or event handlers.
function cleanHtml(value) {
  if (typeof value !== "string") return "";
  return sanitizeHtml(value, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "blockquote", "pre", "code", "hr", "table", "thead", "tbody", "tr", "th", "td", "figure", "figcaption", "img", "span", "div"],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      h1: "h3",
      h2: "h3",
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  });
}

function SectionHeading({ number, title, id }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span aria-hidden="true" className="font-mono text-xs text-secondery">{number}</span>
      <h2 id={id} className="text-lg font-bold tracking-tight text-primary sm:text-xl">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

function TextPanel({ title, children, accent = false }) {
  if (!children) return null;
  return (
    <section className={`rounded-2xl border p-6 sm:p-7 ${accent ? "border-orange-100 bg-orange-50/50" : "border-slate-200/70 bg-slate-50/70"}`}>
      <h2 className="mb-3 text-base font-bold text-primary">{title}</h2>
      <p className="whitespace-pre-line text-sm leading-8 text-slate-600">{children}</p>
    </section>
  );
}

export default function PortfolioHead({ project, projects = [] }) {
  const title = project.title || "نمونه‌کار تیوان";
  const cover = imageSrc(project.thumbnail) || imageSrc(project.mainPicture) || "/images/fallback.webp";
  const mainPicture = imageSrc(project.mainPicture);
  const website = safeUrl(project.link);
  const technologies = textList(project.technologies);
  const features = textList(project.features);
  const tags = textList(project.tags);
  const description = cleanHtml(project.longDescription);
  const gallery = toArray(project.gallery).map((item) => ({
    src: imageSrc(typeof item === "string" ? item : item?.url || item?.src),
    alt: typeof item === "object" && typeof item?.alt === "string" ? item.alt : "",
  })).filter((item) => item.src);
  const details = [
    ["کارفرما", project.clientName],
    ["حوزه فعالیت", project.industry],
    ["نوع پروژه", project.projectType],
    ["برند", project.brandName],
  ].filter(([, value]) => value);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 lg:px-8">
      <nav aria-label="مسیر راهنما" className="mb-8 sm:mb-12">
        <ol className="flex flex-wrap items-center gap-2 text-xs leading-6 text-slate-500">
          <li><Link href="/" className={`rounded transition-colors hover:text-primary ${focus}`}>خانه</Link></li>
          <li aria-hidden="true"><FiChevronLeft /></li>
          <li><Link href="/portfolios" className={`rounded transition-colors hover:text-primary ${focus}`}>نمونه‌کارها</Link></li>
          <li aria-hidden="true"><FiChevronLeft /></li>
          <li aria-current="page" className="break-words font-medium text-primary">{title}</li>
        </ol>
      </nav>

      <article>
        <header className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 font-medium text-slate-600">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondery" />
                {project.category || "نمونه‌کار تیوان"}
              </span>
              {project.isFeatured && <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-orange-800">پروژه منتخب</span>}
            </div>
            <h1 className="break-words text-3xl font-bold leading-[1.6] tracking-tight text-primary sm:text-2xl lg:text-3xl">{title}</h1>
            {project.shortDescription && <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">{project.shortDescription}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 ${focus}`}>
                  مشاهده وب‌سایت <FiArrowUpLeft aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">(در زبانه جدید)</span>
                </a>
              )}
              <a href="#project-details" className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm text-primary ${focus}`}>
                جزئیات پروژه <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative isolate min-w-0">
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-orange-50 sm:-inset-4" />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div aria-hidden="true" className="flex h-10 items-center justify-between border-b border-slate-100 px-4">
                <span className="text-[10px] font-medium tracking-[0.18em] text-slate-400">TIVAN / PORTFOLIO</span>
                <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-200" /><span className="h-2 w-2 rounded-full bg-slate-200" /><span className="h-2 w-2 rounded-full bg-orange-200" /></div>
              </div>
              <div className="relative aspect-[4/3] bg-slate-50">
                <Image src={cover} alt={project.imageAlt || `نمای پروژه ${title}`} fill priority sizes="(max-width: 1023px) 100vw, (max-width: 1280px) 50vw, 608px" className="object-contain p-2" />
              </div>
            </div>
          </div>
        </header>

        {details.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-slate-200/80 py-7 sm:mt-14 md:grid-cols-4">
            {details.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-2 break-words text-sm font-semibold leading-7 text-primary">{value}</dd></div>)}
          </dl>
        )}

        <div id="project-details" className="mt-12 grid scroll-mt-28 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
          <div className="min-w-0 space-y-10">
            {(description || project.shortDescription) && (
              <section aria-labelledby="project-story">
                <SectionHeading number="01" title="داستان پروژه" id="project-story" />
                {description ? <div className="break-words text-sm leading-8 text-slate-600 [&_p]:my-4 [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-primary [&_h4]:my-4 [&_h4]:font-bold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pr-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pr-5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_blockquote]:my-5 [&_blockquote]:border-r-2 [&_blockquote]:border-secondery [&_blockquote]:pr-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-50 [&_pre]:p-4 [&_table]:block [&_table]:overflow-x-auto [&_td]:border [&_td]:p-3 [&_th]:border [&_th]:p-3" dangerouslySetInnerHTML={{ __html: description }} /> : <p className="whitespace-pre-line text-sm leading-8 text-slate-600">{project.shortDescription}</p>}
              </section>
            )}
            {(project.challenge || project.solution) && (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextPanel title="چالش پروژه">{project.challenge}</TextPanel>
                <TextPanel title="راهکار تیوان" accent>{project.solution}</TextPanel>
              </div>
            )}
            {features.length > 0 && (
              <section aria-labelledby="project-features">
                <SectionHeading number="02" title="جزئیاتی که تفاوت می‌سازند" id="project-features" />
                <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {features.map((feature, index) => <li key={`${feature}-${index}`} className="flex items-start gap-3 text-sm leading-7 text-slate-600"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-secondery"><FiCheck aria-hidden="true" className="h-3 w-3" /></span><span>{feature}</span></li>)}
                </ul>
              </section>
            )}
          </div>

          <aside aria-label="اطلاعات تکمیلی پروژه" className="min-w-0">
            <div className="space-y-7 rounded-2xl border border-slate-200/80 bg-white p-6 lg:sticky lg:top-28">
              <div><p className="text-xs text-slate-500">شناسنامه پروژه</p><p className="mt-2 text-base font-bold leading-7 text-primary">{title}</p></div>
              {technologies.length > 0 && <section><h2 className="mb-3 text-xs font-semibold text-slate-500">تکنولوژی‌ها</h2><ul className="flex flex-wrap gap-2">{technologies.map((item, index) => <li key={`${item}-${index}`} className="max-w-full break-words rounded-lg bg-slate-50 px-3 py-1.5 text-xs leading-6 text-primary"><bdi>{item}</bdi></li>)}</ul></section>}
              {tags.length > 0 && <section><h2 className="mb-3 text-xs font-semibold text-slate-500">موضوعات پروژه</h2><ul className="flex flex-wrap gap-x-3 gap-y-2">{tags.map((tag, index) => <li key={`${tag}-${index}`} className="break-words text-xs leading-6 text-slate-600">#{tag}</li>)}</ul></section>}
              <Link href="/portfolios" className={`flex items-center justify-between gap-2 rounded border-t border-slate-100 pt-5 text-xs font-medium text-primary ${focus}`}>کاوش در نمونه‌کارها <FiArrowLeft aria-hidden="true" /></Link>
            </div>
          </aside>
        </div>

        {(mainPicture || gallery.length > 0) && (
          <section className="mt-14 sm:mt-20" aria-labelledby="project-gallery">
            <SectionHeading number="03" title="پروژه از نزدیک" id="project-gallery" />
            {mainPicture && <a href={mainPicture} target="_blank" rel="noopener noreferrer" aria-label={`نمایش تصویر اصلی ${title} در زبانه جدید`} className={`relative mb-5 block aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 ${focus}`}><Image src={mainPicture} alt={project.imageAlt || `تصویر کامل پروژه ${title}`} fill sizes="(max-width: 1280px) 100vw, 1216px" className="object-contain p-3 sm:p-6" /><span aria-hidden="true" className="absolute bottom-4 left-4 rounded-full border border-slate-100 bg-white p-3 text-primary"><FiExternalLink className="h-4 w-4" /></span></a>}
            {gallery.length > 0 && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gallery.map((item, index) => <a key={`${item.src}-${index}`} href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`نمایش ${item.alt || `تصویر ${index + 1} پروژه ${title}`} در زبانه جدید`} className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 ${focus}`}><Image src={item.src} alt={item.alt || `${title}؛ نمای ${index + 1}`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px" className="object-contain p-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]" /></a>)}</div>}
          </section>
        )}
      </article>

      {projects.length > 0 && (
        <section className="mt-16 border-t border-slate-200/80 pt-10 sm:mt-24" aria-labelledby="other-projects">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs text-slate-500">مسیرهای دیگر، ایده‌های تازه</p><h2 id="other-projects" className="text-xl font-bold text-primary sm:text-2xl">نمونه‌کارهای دیگر</h2></div><Link href="/portfolios" className={`inline-flex items-center gap-2 rounded text-sm text-primary ${focus}`}>مشاهده همه <FiArrowLeft aria-hidden="true" /></Link></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((item) => <Link key={String(item._id || item.slug)} href={`/portfolios/${encodeURIComponent(item.slug)}`} className={`group min-w-0 rounded-2xl ${focus}`}><div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50"><Image src={imageSrc(item.thumbnail) || imageSrc(item.mainPicture) || "/images/fallback.webp"} alt={item.imageAlt || item.title || "نمونه‌کار تیوان"} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 300px" className="object-contain p-3 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.04]" /></div><div className="pt-4">{item.category && <p className="mb-2 text-xs text-slate-500">{item.category}</p>}<div className="flex items-start justify-between gap-3"><h3 className="break-words text-sm font-bold leading-7 text-primary">{item.title}</h3><FiArrowUpLeft aria-hidden="true" className="mt-1.5 shrink-0 text-slate-400 transition-colors group-hover:text-secondery" /></div>{item.shortDescription && <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">{item.shortDescription}</p>}</div></Link>)}
          </div>
        </section>
      )}
    </div>
  );
}
