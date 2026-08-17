export const dynamic = "force-dynamic";

import ProjectModel from "@/models/Project";
import connectToDB from "@/configs/db";

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import Projects from "../components/trmplate/portfolio/Projects";

const siteUrl = "https://t1w.ir";

export const metadata = {
  title: "نمونه‌کارهای طراحی سایت و برنامه‌نویسی | شرکت تیوان",
  description:
    "مشاهده نمونه‌کارهای شرکت تیوان در طراحی سایت اختصاصی، برنامه‌نویسی وب، سئو و دیجیتال مارکتینگ برای کسب‌وکارهای مختلف در ایران و خارج از کشور.",

  keywords: [
    "نمونه کار طراحی سایت",
    "نمونه کار برنامه نویسی",
    "نمونه کار سئو",
    "پروژه های تیوان",
    "طراحی سایت اختصاصی",
    "طراحی سایت شرکتی",
    "طراحی سایت فروشگاهی",
    "برنامه نویسی وب",
    "Portfolio",
    "تیوان",
    "آرین تجارت تیوان",
  ],

  alternates: {
    canonical: "/portfolio",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "نمونه‌کارهای طراحی سایت و برنامه‌نویسی | شرکت تیوان",
    description:
      "نمونه‌کارهای تیوان در طراحی سایت اختصاصی، توسعه وب، سئو و دیجیتال مارکتینگ.",
    url: "/portfolio",
    siteName: "آرین تجارت تیوان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "نمونه‌کارهای طراحی سایت و برنامه‌نویسی تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "نمونه‌کارهای طراحی سایت و برنامه‌نویسی | شرکت تیوان",
    description:
      "مشاهده پروژه‌های طراحی سایت، برنامه‌نویسی وب، سئو و دیجیتال مارکتینگ شرکت تیوان.",
    images: ["/images/og/tivan-portfolio-og.jpg"],
  },
};

/* ---------- helper ها ---------- */
function getCategoryLabel(category) {
  if (!category) return "";
  if (typeof category === "string") return category.trim();
  return (category?.title || category?.name || "").trim();
}

function absoluteUrl(url) {
  if (!url || typeof url !== "string") return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function buildPortfolioSchema(projects) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "خانه",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "نمونه‌کارها",
            item: `${siteUrl}/portfolio`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "نمونه‌کارهای تیوان",
        url: `${siteUrl}/portfolio`,
        inLanguage: "fa-IR",
        description:
          "آرشیو نمونه‌کارهای شرکت تیوان در زمینه طراحی سایت اختصاصی، برنامه‌نویسی وب، سئو و دیجیتال مارکتینگ.",
        isPartOf: {
          "@type": "WebSite",
          name: "آرین تجارت تیوان",
          url: siteUrl,
        },
        mainEntity: {
          "@type": "ItemList",
          name: "فهرست نمونه‌کارهای تیوان",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => {
            const category = getCategoryLabel(project.category);

            return {
              "@type": "ListItem",
              position: index + 1,
              url: `${siteUrl}/portfolio/${project.slug}`,
              item: {
                "@type": "CreativeWork",
                name: project.title,
                description: project.excerpt || project.description || "",
                image: absoluteUrl(project.cover),
                ...(category ? { about: category } : {}),
              },
            };
          }),
        },
      },
    ],
  };
}

export default async function PortfolioPage() {
  await connectToDB();

  const projects = await ProjectModel.find({})
    .sort({ createdAt: -1 })
    .select("title slug description excerpt cover coverAlt tags category createdAt")
    .lean();

  const serializedProjects = JSON.parse(JSON.stringify(projects));

  const allTags = Array.from(
    new Set(
      serializedProjects
        .flatMap((project) => project.tags || [])
        .filter(Boolean)
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    )
  );

  const allCategories = Array.from(
    new Set(
      serializedProjects
        .map((project) => getCategoryLabel(project.category))
        .filter(Boolean)
    )
  );

  const portfolioSchema = buildPortfolioSchema(serializedProjects);

  return (
    <>
      <Shape />
      <Navbar />

      <main
        id="main-content"
        aria-labelledby="portfolio-page-title"
        className="pb-20 pt-10 font-yekan-bakh md:pt-14"
      >
        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-[var(--color-secondery)]">
              نمونه‌کارهای تیوان
            </p>

            <h1
              id="portfolio-page-title"
              className="mt-5 text-3xl font-extrabold leading-[2.5rem] text-primary md:text-5xl md:leading-[4.5rem]"
            >
              پروژه‌های طراحی سایت، برنامه‌نویسی و سئو
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-500 md:text-base">
              بخشی از پروژه‌های تیوان در زمینه طراحی سایت اختصاصی، برنامه‌نویسی
              وب، سئو و دیجیتال مارکتینگ را اینجا مرور کنید.
            </p>
          </header>
        </section>

        <Projects
          projects={serializedProjects}
          tags={allTags}
          categories={allCategories}
        />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026"),
        }}
      />
    </>
  );
}
