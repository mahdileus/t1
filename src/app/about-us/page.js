import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import AboutBoxes from "../components/trmplate/about-us/AboutBoxes";
import AboutCounter from "../components/trmplate/about-us/AboutCounter";
import AboutHeader from "../components/trmplate/about-us/AboutHeader";
import Comments from "../components/trmplate/index/comments/comments";
import Shape from "../components/trmplate/index/shape/Shape";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://t1w.ir";

const siteUrl = SITE_URL.endsWith("/")
  ? SITE_URL.slice(0, -1)
  : SITE_URL;

const pageUrl = `${siteUrl}/about-us`;

const pageTitle = "درباره ما | شرکت تیوان";
const pageDescription =
  "با شرکت تیوان آشنا شوید؛ تیمی متخصص در طراحی سایت، سئو، برنامه‌نویسی اختصاصی و توسعه راهکارهای دیجیتال برای رشد برندها و افزایش فروش آنلاین.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,

  keywords: [
    "درباره تیوان",
    "شرکت تیوان",
    "تیم تیوان",
    "طراحی سایت",
    "برنامه نویسی اختصاصی",
    "سئو",
    "دیجیتال مارکتینگ",
    "طراحی سایت شرکتی",
    "طراحی سایت فروشگاهی",
    "توسعه وب",
    "برندسازی دیجیتال",
  ],

  alternates: {
    canonical: pageUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Tivan",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og/about-us.jpg`,
        width: 1200,
        height: 630,
        alt: "درباره شرکت تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}/images/og/about-us.jpg`],
  },
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function buildAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#about-page`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: "fa-IR",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: "Tivan",
      url: siteUrl,
    },
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "Tivan",
      alternateName: "شرکت تیوان",
      url: siteUrl,
      description:
        "شرکت تیوان ارائه‌دهنده خدمات طراحی سایت، سئو، برنامه‌نویسی اختصاصی و راهکارهای دیجیتال برای رشد کسب‌وکارها.",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
  };
}

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
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
        name: "درباره ما",
        item: pageUrl,
      },
    ],
  };
}

export default function AboutUs() {
  return (
    <>
      <JsonLd data={buildAboutPageSchema()} />
      <JsonLd data={buildBreadcrumbSchema()} />

      <Shape />
      <Navbar />

      <main className="font-yekan-bakh">
        <AboutHeader />
        <AboutBoxes />
        <AboutCounter />
        <Comments />
      </main>

      <Footer />
    </>
  );
}
