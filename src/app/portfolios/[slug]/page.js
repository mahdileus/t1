import { notFound } from "next/navigation";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";

import Navbar from "@/app/components/module/navbar/Navbar";
import Footer from "@/app/components/module/footer/Footer";
import Shape from "@/app/components/trmplate/index/shape/Shape";
import PortfolioHead from "@/app/components/trmplate/portfolio/PortfolioHead";

export const dynamic = "force-dynamic";

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

function getProjectImage(project) {
  return getAbsoluteUrl(
    project?.mainPicture ||
      project?.thumbnail ||
      "/images/fallback.webp"
  );
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

async function getProject(slug) {
  await connectToDB();

  return ProjectModel.findOne({
    slug,
    status: "published",
  }).lean();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "نمونه‌کار پیدا نشد | تیوان",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    project.seoTitle ||
    `${project.title} | نمونه‌کار طراحی سایت و سئو تیوان`;

  const description =
    project.seoDescription ||
    project.shortDescription ||
    `مشاهده جزئیات پروژه ${project.title} در نمونه‌کارهای تیوان.`;

  const canonicalUrl =
    project.canonicalUrl || `${SITE_URL}/portfolios/${project.slug}`;

  const image = getProjectImage(project);

  const keywords = Array.isArray(project.seoKeywords)
    ? project.seoKeywords
    : typeof project.seoKeywords === "string"
    ? project.seoKeywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: "article",
      locale: "fa_IR",
      url: canonicalUrl,
      siteName: "تیوان",
      title: project.ogTitle || title,
      description: project.ogDescription || description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: project.imageAlt || project.title,
            },
          ]
        : [],
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

  await connectToDB();

  const project = await ProjectModel.findOne({
    slug,
    status: "published",
  }).lean();

  if (!project) {
    notFound();
  }

  const latestProjects = await ProjectModel.find({
    status: "published",
    slug: { $ne: slug },
  })
    .sort({
      isFeatured: -1,
      sortOrder: 1,
      createdAt: -1,
    })
    .limit(4)
    .lean();

  const serializedProject = JSON.parse(JSON.stringify(project));
  const serializedLatestProjects = JSON.parse(
    JSON.stringify(latestProjects)
  );

  const projectUrl = `${SITE_URL}/portfolios/${project.slug}`;
  const projectImage = getProjectImage(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.seoTitle || project.title,
    description:
      project.seoDescription ||
      project.shortDescription ||
      `نمونه‌کار ${project.title} در تیوان`,
    url: projectUrl,
    image: projectImage ? [projectImage] : [],
    inLanguage: "fa-IR",
    creator: {
      "@type": "Organization",
      name: "تیوان",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "تیوان",
      url: SITE_URL,
    },
    ...(project.clientName
      ? {
          client: {
            "@type": "Organization",
            name: project.clientName,
          },
        }
      : {}),
    ...(project.category
      ? {
          genre: project.category,
        }
      : {}),
    ...(project.technologies?.length
      ? {
          keywords: project.technologies.join(", "),
        }
      : {}),
    ...(project.createdAt
      ? {
          dateCreated: new Date(project.createdAt).toISOString(),
        }
      : {}),
    ...(project.updatedAt
      ? {
          dateModified: new Date(project.updatedAt).toISOString(),
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />

      <Shape />
      <Navbar />

      <main>
        <PortfolioHead
          project={serializedProject}
          projects={serializedLatestProjects}
        />
      </main>

      <Footer />
    </>
  );
}
