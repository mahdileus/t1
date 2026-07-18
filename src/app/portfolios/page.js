export const revalidate = 3600;

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

const portfolioSchema = {
  "@context": "https://schema.org",
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
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
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
};

function PortfolioIcon() {
  return (
    <svg
      className="h-10 w-10 text-secondery"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 10h16a6 6 0 0 1 6 6v4h6a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6h6v-4a6 6 0 0 1 6-6Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M22 20v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M6 34h18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 34h18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M25 31h14v8H25v-8Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
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
        .map((project) => project.category)
        .filter(Boolean)
        .map((category) => {
          if (typeof category === "string") return category.trim();
          if (category?.title) return category.title.trim();
          if (category?.name) return category.name.trim();
          return "";
        })
        .filter(Boolean)
    )
  );

  return (
    <>
      <Shape />

      <Navbar />

      <main>
        <section
          className="pt-20 font-yekan-bakh"
          aria-labelledby="portfolio-page-title"
        >
          <div className="container">
            <div className="flex items-center justify-center gap-4">
              <PortfolioIcon />

              <h1
                id="portfolio-page-title"
                className="text-center text-3xl font-bold text-primary"
              >
                نمونه‌کارها
              </h1>
            </div>

            <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-8 text-gray-600 md:text-base md:leading-9">
              در این بخش می‌توانید بخشی از پروژه‌های تیوان در زمینه طراحی سایت
              اختصاصی، برنامه‌نویسی وب، سئو و دیجیتال مارکتینگ را مشاهده کنید.
            </p>
          </div>
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
          __html: JSON.stringify(portfolioSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
