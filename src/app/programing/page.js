export const revalidate = 3600;

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";

import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";

import ProgrammingHeader from "../components/trmplate/programming/programmingHeader";
import ComparisonTable from "../components/trmplate/programming/ComparisonTable";
import TechUseCases from "../components/trmplate/programming/TechUseCases";
import Portfolio from "../components/trmplate/programming/Portfolio";
import FAQAccordion from "../components/module/shared/FAQAccordion";

const siteUrl = "https://t1w.ir";
const pageUrl = `${siteUrl}/programming`;

export const metadata = {
  title: "برنامه‌نویسی اختصاصی وب و اپلیکیشن | شرکت تیوان",
  description:
    "خدمات برنامه‌نویسی اختصاصی وب و اپلیکیشن با تیوان؛ توسعه وب‌سایت، پنل مدیریتی، API، سامانه‌های سازمانی و وب‌اپلیکیشن‌های حرفه‌ای با Next.js، React، Node.js و Laravel.",

  keywords: [
    "برنامه نویسی اختصاصی",
    "برنامه نویسی وب",
    "توسعه وب",
    "توسعه اپلیکیشن",
    "طراحی سایت اختصاصی",
    "طراحی سیستم اختصاصی",
    "توسعه نرم افزار تحت وب",
    "API نویسی",
    "Next.js",
    "React",
    "Node.js",
    "Laravel",
    "MERN Stack",
    "تیوان",
    "آرین تجارت تیوان",
  ],

  alternates: {
    canonical: "/programming",
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
    title: "برنامه‌نویسی اختصاصی وب و اپلیکیشن | شرکت تیوان",
    description:
      "طراحی و توسعه وب‌سایت‌ها، وب‌اپلیکیشن‌ها، پنل‌های مدیریتی و سامانه‌های اختصاصی با معماری حرفه‌ای و قابل توسعه.",
    url: "/programming",
    siteName: "آرین تجارت تیوان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-programming-og.jpg",
        width: 1200,
        height: 630,
        alt: "برنامه‌نویسی اختصاصی وب و اپلیکیشن با شرکت تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "برنامه‌نویسی اختصاصی وب و اپلیکیشن | شرکت تیوان",
    description:
      "توسعه وب‌سایت، اپلیکیشن تحت وب، API و سامانه‌های اختصاصی با تیوان.",
    images: ["/images/og/tivan-programming-og.jpg"],
  },
};

const faqs = [
  {
    question: "چرا باید وب‌سایت خود را با برنامه‌نویسی اختصاصی توسعه دهیم؟",
    answer:
      "برنامه‌نویسی اختصاصی این امکان را فراهم می‌کند که وب‌سایت یا سامانه دقیقاً بر اساس نیازهای کسب‌وکار شما طراحی شود. برخلاف قالب‌های آماده، در توسعه اختصاصی می‌توان ساختار فنی، امنیت، سرعت، تجربه کاربری و قابلیت‌های آینده پروژه را از ابتدا به‌درستی طراحی کرد.",
  },
  {
    question:
      "چه تکنولوژی‌هایی برای توسعه وب‌سایت و سامانه اختصاصی استفاده می‌شود؟",
    answer:
      "انتخاب تکنولوژی به نوع پروژه بستگی دارد. در تیوان برای توسعه رابط کاربری، وب‌اپلیکیشن و پروژه‌های مدرن معمولاً از Next.js، React، Node.js، MongoDB و در برخی پروژه‌ها از Laravel و PHP استفاده می‌شود. هدف، انتخاب بهترین معماری برای سرعت، امنیت و توسعه‌پذیری پروژه است.",
  },
  {
    question: "آیا برنامه‌نویسی اختصاصی روی سئو سایت تأثیر دارد؟",
    answer:
      "بله. در پروژه‌های اختصاصی می‌توان ساختار صفحات، سرعت بارگذاری، URLها، متادیتا، اسکیما، لینک‌سازی داخلی و تجربه کاربری را از پایه برای سئو بهینه کرد. این موضوع می‌تواند به بهبود عملکرد سایت در نتایج گوگل کمک کند.",
  },
  {
    question: "برای سایت فروشگاهی، برنامه‌نویسی اختصاصی بهتر است یا قالب آماده؟",
    answer:
      "اگر فروشگاه ساده و محدود باشد، قالب آماده می‌تواند گزینه سریع‌تری باشد. اما برای فروشگاه‌هایی که نیاز به امکانات خاص، اتصال به API، مدیریت پیشرفته محصولات، قیمت‌گذاری اختصاصی، پنل مدیریتی حرفه‌ای یا توسعه در آینده دارند، برنامه‌نویسی اختصاصی انتخاب مناسب‌تری است.",
  },
  {
    question: "آیا امکان توسعه پنل مدیریتی اختصاصی وجود دارد؟",
    answer:
      "بله. یکی از مزیت‌های برنامه‌نویسی اختصاصی، امکان طراحی پنل مدیریتی متناسب با فرآیندهای داخلی کسب‌وکار است؛ مانند مدیریت کاربران، محصولات، سفارش‌ها، مقالات، سئو، گزارش‌ها، نقش‌های کاربری و سایر بخش‌های مورد نیاز.",
  },
  {
    question: "هزینه برنامه‌نویسی اختصاصی چگونه محاسبه می‌شود؟",
    answer:
      "هزینه بر اساس حجم امکانات، طراحی رابط کاربری، پیچیدگی فنی، تعداد پنل‌ها، اتصال به سرویس‌های خارجی، سطح امنیت، زمان اجرا و نیازهای توسعه آینده مشخص می‌شود. برای برآورد دقیق، ابتدا نیازهای پروژه بررسی و سپس پیشنهاد فنی و مالی ارائه می‌شود.",
  },
  {
    question: "زمان اجرای پروژه برنامه‌نویسی اختصاصی چقدر است؟",
    answer:
      "زمان اجرا به اندازه و پیچیدگی پروژه بستگی دارد. یک وب‌سایت شرکتی اختصاصی ممکن است در زمان کوتاه‌تری آماده شود، اما سامانه‌های سازمانی، فروشگاه‌های پیشرفته یا وب‌اپلیکیشن‌های چندبخشی به تحلیل، طراحی، توسعه، تست و بهینه‌سازی بیشتری نیاز دارند.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "برنامه‌نویسی اختصاصی وب و اپلیکیشن",
  serviceType: "Web Development",
  url: pageUrl,
  provider: {
    "@type": "Organization",
    name: "آرین تجارت تیوان",
    url: siteUrl,
  },
  areaServed: {
    "@type": "Country",
    name: "Iran",
  },
  description:
    "خدمات برنامه‌نویسی اختصاصی وب، طراحی سامانه‌های تحت وب، توسعه API، پنل مدیریتی و وب‌اپلیکیشن‌های حرفه‌ای با Next.js، React، Node.js و Laravel.",
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
      name: "برنامه‌نویسی اختصاصی",
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default async function ProgrammingPage() {
  await connectToDB();

  const projects = await ProjectModel.find({
    category: "برنامه نویسی",
    // اگر این فیلدها را در مدل Project داری، فعال کن
    // status: "published",
    // visibility: "public",
    // noIndex: { $ne: true },
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .select("title slug description excerpt cover coverAlt tags category createdAt")
    .lean();

  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return (
    <>
      <Shape />

      <Navbar />

      <main>
        <ProgrammingHeader />

        <ComparisonTable />

        <TechUseCases />

        <Portfolio projects={serializedProjects} />

        <FAQAccordion
          faqs={faqs}
          title="سوالات متداول برنامه‌نویسی اختصاصی"
          badge="FAQ"
          image="/images/FAQ.png"
          imageAlt="سوالات متداول خدمات برنامه‌نویسی اختصاصی"
        />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
