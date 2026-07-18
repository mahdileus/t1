import "./globals.css";

const siteUrl = "https://t1w.ir";
const siteName = "آرین تجارت تیوان";

export const metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default: "آرین تجارت تیوان | طراحی سایت اختصاصی، برنامه‌نویسی و سئو حرفه‌ای",
    template: "%s | آرین تجارت تیوان",
  },

  description:
    "شرکت آرین تجارت تیوان ارائه‌دهنده خدمات طراحی سایت اختصاصی، برنامه‌نویسی حرفه‌ای، سئو، بهینه‌سازی سایت و دیجیتال مارکتینگ برای کسب‌وکارها در ایران و خارج از کشور.",

  keywords: [
    "آرین تجارت تیوان",
    "تیوان",
    "طراحی سایت",
    "طراحی سایت اختصاصی",
    "طراحی سایت شرکتی",
    "طراحی سایت فروشگاهی",
    "برنامه نویسی وب",
    "توسعه وب",
    "خدمات سئو",
    "سئو سایت",
    "بهینه سازی سایت",
    "افزایش رتبه گوگل",
    "دیجیتال مارکتینگ",
    "تبلیغات آنلاین",
    "Next.js",
    "React",
    "Node.js",
    "Laravel",
  ],

  authors: [{ name: "آرین تجارت تیوان", url: siteUrl }],
  creator: "آرین تجارت تیوان",
  publisher: "آرین تجارت تیوان",
  category: "Web Design, SEO, Digital Marketing",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "آرین تجارت تیوان | طراحی سایت، برنامه‌نویسی و سئو",
    description:
      "طراحی سایت اختصاصی، توسعه وب، خدمات سئو و دیجیتال مارکتینگ با آرین تجارت تیوان؛ همراه کسب‌وکارها برای رشد آنلاین، افزایش فروش و بهبود حضور در گوگل.",
    url: siteUrl,
    siteName,
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-og.jpg",
        width: 1200,
        height: 630,
        alt: "آرین تجارت تیوان - طراحی سایت، سئو و دیجیتال مارکتینگ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "آرین تجارت تیوان | خدمات طراحی سایت و سئو",
    description:
      "طراحی وب‌سایت اختصاصی، برنامه‌نویسی حرفه‌ای، سئو و تبلیغات دیجیتال با آرین تجارت تیوان.",
    images: ["/images/og/tivan-og.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "آرین تجارت تیوان",
  alternateName: "تیوان",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description:
    "آرین تجارت تیوان ارائه‌دهنده خدمات طراحی سایت اختصاصی، برنامه‌نویسی وب، سئو و دیجیتال مارکتینگ.",
  sameAs: [
    // اگر شبکه اجتماعی داری اینجا اضافه کن
    // "https://www.instagram.com/...",
    // "https://www.linkedin.com/company/...",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Persian", "English"],
      areaServed: ["IR"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "آرین تجارت تیوان",
  alternateName: "تیوان",
  url: siteUrl,
  inLanguage: "fa-IR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/articles?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {children}
      </body>
    </html>
  );
}
