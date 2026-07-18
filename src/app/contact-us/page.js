import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import MapBox from "../components/trmplate/contact-us/MapBox";
import Shape from "../components/trmplate/index/shape/Shape";

export const revalidate = 86400;

const siteUrl = "https://t1w.ir";
const pageUrl = `${siteUrl}/contact-us`;

export const metadata = {
  title: "تماس با ما | شرکت تیوان",
  description:
    "برای مشاوره طراحی سایت، سئو، برنامه‌نویسی اختصاصی و پشتیبانی پروژه‌های وب با تیم تیوان تماس بگیرید. ارتباط مستقیم با کارشناسان فنی و بازاریابی دیجیتال.",

  keywords: [
    "تماس با تیوان",
    "تماس با شرکت تیوان",
    "مشاوره طراحی سایت",
    "مشاوره سئو",
    "درخواست پروژه",
    "پشتیبانی سایت",
    "برنامه نویسی اختصاصی",
    "طراحی سایت اختصاصی",
    "ارتباط با شرکت تیوان",
    "آرین تجارت تیوان",
    "تیوان",
  ],

  alternates: {
    canonical: "/contact-us",
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
    title: "تماس با ما | شرکت تیوان",
    description:
      "ارتباط با تیم تیوان برای مشاوره طراحی سایت، سئو، برنامه‌نویسی اختصاصی و پشتیبانی پروژه‌های وب.",
    url: "/contact-us",
    siteName: "آرین تجارت تیوان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "تماس با شرکت تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تماس با ما | شرکت تیوان",
    description:
      "برای مشاوره طراحی سایت، سئو و برنامه‌نویسی اختصاصی با تیم تیوان تماس بگیرید.",
    images: ["/images/og/tivan-contact-og.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "آرین تجارت تیوان",
  alternateName: "تیوان",
  url: siteUrl,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Persian", "English"],
      areaServed: "IR",
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "تماس با ما",
  url: pageUrl,
  description:
    "صفحه تماس با شرکت تیوان برای دریافت مشاوره طراحی سایت، سئو، برنامه‌نویسی اختصاصی و پشتیبانی پروژه‌های وب.",
  mainEntity: {
    "@type": "Organization",
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
      name: "تماس با ما",
      item: pageUrl,
    },
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <Shape />

      <Navbar />

      <main>
        <MapBox />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
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
