import { cache } from "react";
import { notFound } from "next/navigation";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";
import Navbar from "@/app/components/module/navbar/Navbar";
import Footer from "@/app/components/module/footer/Footer";
import Shape from "@/app/components/trmplate/index/shape/Shape";
import PortfolioHead from "@/app/components/trmplate/portfolio/PortfolioHead";

export const dynamic = "force-dynamic";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir").replace(/\/+$/, "");

function absoluteUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim(), `${SITE_URL}/`);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function canonicalUrl(project) {
  return absoluteUrl(project.canonicalUrl) ||
    `${SITE_URL}/portfolios/${encodeURIComponent(project.slug)}`;
}

function projectImage(project) {
  return absoluteUrl(project.mainPicture) || absoluteUrl(project.thumbnail) ||
    absoluteUrl("/images/fallback.webp");
}

function textList(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return textList(parsed);
  } catch { /* Supports comma-separated text as well as JSON arrays. */ }
  return value.split(/[,،]/).map((item) => item.trim()).filter(Boolean);
}

function isoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const getProject = cache(async (slug) => {
  await connectToDB();
  return ProjectModel.findOne({ slug, status: "published" }).lean().exec();
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const title = project.seoTitle || `${project.title} | نمونه‌کار تیوان`;
  const description = project.seoDescription || project.shortDescription ||
    `آشنایی با پروژه ${project.title}؛ چالش‌ها، راهکارها و جزئیات اجرای پروژه توسط تیوان.`;
  const url = canonicalUrl(project);
  const image = projectImage(project);

  return {
    // Avoid repeating the brand if the root layout has a title template.
    title: { absolute: title },
    description,
    keywords: textList(project.seoKeywords),
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: "تیوان",
      url,
      title: project.ogTitle || title,
      description: project.ogDescription || description,
      images: image ? [{ url: image, alt: project.imageAlt || project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.ogTitle || title,
      description: project.ogDescription || description,
      images: image ? [image] : [],
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const otherProjects = await ProjectModel.find({
    status: "published",
    slug: { $ne: slug },
  })
    .select("title slug thumbnail mainPicture imageAlt shortDescription category")
    .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
    .limit(4)
    .lean()
    .exec();

  const url = canonicalUrl(project);
  const image = projectImage(project);
  const keywords = textList(project.technologies);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.title,
        description: project.seoDescription || project.shortDescription || `نمونه‌کار ${project.title} در تیوان`,
        url,
        image: image ? [image] : undefined,
        inLanguage: "fa-IR",
        creator: { "@type": "Organization", name: "تیوان", url: SITE_URL },
        publisher: { "@type": "Organization", name: "تیوان", url: SITE_URL },
        genre: project.category || undefined,
        keywords: keywords.length ? keywords.join(", ") : undefined,
        dateCreated: isoDate(project.createdAt),
        dateModified: isoDate(project.updatedAt),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "نمونه‌کارها", item: `${SITE_URL}/portfolios` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Shape />
      <Navbar />
      <main id="portfolio-main" dir="rtl" className="relative font-yekan-bakh">
        <PortfolioHead
          project={JSON.parse(JSON.stringify(project))}
          projects={JSON.parse(JSON.stringify(otherProjects))}
        />
      </main>
      <Footer />
    </>
  );
}
