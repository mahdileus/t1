export const revalidate = 3600;

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";

import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";

import WebHeader from "../components/trmplate/web-design/webHeader";
import Services from "../components/trmplate/web-design/Services";
import Portfolio from "../components/trmplate/web-design/Portfolio";
import Process from "../components/trmplate/web-design/process";
import FAQAccordion from "../components/module/shared/FAQAccordion";

const siteUrl = "https://t1w.ir";
const pageUrl = `${siteUrl}/web-design`;

export const metadata = {
  title: "طراحی سایت اختصاصی و حرفه‌ای | شرکت تیوان",
  description:
    "طراحی سایت اختصاصی، شرکتی، فروشگاهی و خدماتی با تیوان؛ طراحی وب‌سایت مدرن، سریع، واکنش‌گرا، سئوپذیر و قابل توسعه با Next.js، React و تکنولوژی‌های روز وب.",

  keywords: [
    "طراحی سایت اختصاصی",
    "طراحی سایت",
    "طراحی وبسایت",
    "طراحی وبسایت شرکتی",
    "طراحی سایت شرکتی",
    "طراحی سایت فروشگاهی",
    "طراحی سایت حرفه‌ای",
    "طراحی سایت واکنش گرا",
    "طراحی سایت سئو شده",
    "طراحی رابط کاربری",
    "UI UX",
    "Next.js",
    "React",
    "تیوان",
    "آرین تجارت تیوان",
  ],

  alternates: {
    canonical: "/web-design",
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
    title: "طراحی سایت اختصاصی و حرفه‌ای | شرکت تیوان",
    description:
      "طراحی سایت اختصاصی، سریع، مدرن و سئوپذیر برای کسب‌وکارهای شرکتی، فروشگاهی و خدماتی با شرکت تیوان.",
    url: "/web-design",
    siteName: "آرین تجارت تیوان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-web-design-og.jpg",
        width: 1200,
        height: 630,
        alt: "طراحی سایت اختصاصی و حرفه‌ای شرکت تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "طراحی سایت اختصاصی و حرفه‌ای | شرکت تیوان",
    description:
      "طراحی وب‌سایت اختصاصی، شرکتی و فروشگاهی با تمرکز بر سرعت، تجربه کاربری، امنیت و سئو.",
    images: ["/images/og/tivan-web-design-og.jpg"],
  },
};

const faqs = [
  {
    question: "تفاوت طراحی سایت اختصاصی با استفاده از قالب آماده چیست؟",
    answer:
      "طراحی سایت اختصاصی یعنی ساختار، ظاهر و امکانات وب‌سایت بر اساس نیازهای واقعی برند و کسب‌وکار شما طراحی و پیاده‌سازی می‌شود. در مقابل، قالب‌های آماده محدودیت‌های بیشتری دارند و معمولاً از نظر ظاهر، امکانات، سرعت و توسعه‌پذیری انعطاف کمتری ارائه می‌کنند.",
  },
  {
    question: "چرا طراحی سایت اختصاصی برای سئو بهتر است؟",
    answer:
      "در طراحی سایت اختصاصی می‌توان ساختار فنی، سرعت بارگذاری، URLها، متادیتا، اسکیما، تجربه کاربری و معماری صفحات را از ابتدا بر اساس اصول سئو پیاده‌سازی کرد. این موضوع باعث می‌شود سایت برای موتورهای جستجو قابل فهم‌تر و برای کاربران کاربردی‌تر باشد.",
  },
  {
    question: "طراحی سایت اختصاصی چه مدت زمان می‌برد؟",
    answer:
      "زمان طراحی و توسعه سایت اختصاصی به نوع سایت، تعداد صفحات، امکانات مورد نیاز، سطح طراحی رابط کاربری و پیچیدگی فنی بستگی دارد. معمولاً پروژه‌های شرکتی ساده‌تر در زمان کوتاه‌تری انجام می‌شوند، اما سایت‌های فروشگاهی یا سامانه‌های پیشرفته نیاز به زمان بیشتری دارند.",
  },
  {
    question: "آیا امکان توسعه و اضافه کردن امکانات جدید در سایت اختصاصی وجود دارد؟",
    answer:
      "بله. یکی از مهم‌ترین مزیت‌های طراحی سایت اختصاصی، قابلیت توسعه در آینده است. امکاناتی مثل فروشگاه آنلاین، وبلاگ، پنل کاربری، سیستم رزرو، اتصال به درگاه پرداخت، API، سیستم چندزبانه یا پنل مدیریتی اختصاصی می‌توانند بر اساس نیاز کسب‌وکار اضافه شوند.",
  },
  {
    question: "آیا سایت اختصاصی امنیت بیشتری نسبت به قالب آماده دارد؟",
    answer:
      "در طراحی اختصاصی می‌توان معماری سایت، سطح دسترسی‌ها، اعتبارسنجی داده‌ها، ساختار پنل مدیریت و روش‌های ذخیره‌سازی اطلاعات را با دقت بیشتری طراحی کرد. به همین دلیل، اگر اصول امنیتی درست رعایت شود، سایت اختصاصی می‌تواند امنیت و کنترل بیشتری نسبت به قالب‌های آماده داشته باشد.",
  },
  {
    question: "آیا طراحی سایت اختصاصی هزینه بیشتری نسبت به قالب آماده دارد؟",
    answer:
      "معمولاً هزینه اولیه طراحی سایت اختصاصی بیشتر از قالب آماده است، اما در بلندمدت می‌تواند ارزش بیشتری ایجاد کند. چون سایت اختصاصی دقیقاً بر اساس اهداف کسب‌وکار ساخته می‌شود، محدودیت کمتری دارد، بهتر قابل توسعه است و می‌تواند تجربه کاربری و عملکرد بهتری ارائه دهد.",
  },
  {
    question: "آیا بعد از طراحی سایت اختصاصی نیاز به پشتیبانی دارم؟",
    answer:
      "بله. هر وب‌سایت حرفه‌ای برای به‌روزرسانی، رفع خطاهای احتمالی، بهینه‌سازی سرعت، حفظ امنیت، مدیریت محتوا و بهبود سئو به پشتیبانی نیاز دارد. پشتیبانی باعث می‌شود سایت در طول زمان پایدارتر و مؤثرتر عمل کند.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "طراحی سایت اختصاصی",
  serviceType: "Web Design",
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
    "خدمات طراحی سایت اختصاصی، طراحی سایت شرکتی، طراحی سایت فروشگاهی، طراحی رابط کاربری، توسعه وب‌سایت واکنش‌گرا و سئوپذیر با تکنولوژی‌های مدرن وب.",
  offers: {
    "@type": "Offer",
    url: pageUrl,
    availability: "https://schema.org/InStock",
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
      name: "طراحی سایت",
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

export default async function WebDesignPage() {
  await connectToDB();

  const projects = await ProjectModel.find({
    category: "طراحی وبسایت",

    // اگر این فیلدها را در مدل Project داری، فعال کن:
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
        <WebHeader />

        <Services />

        <Portfolio projects={serializedProjects} />

        <Process />

        <FAQAccordion
          faqs={faqs}
          title="سوالات متداول طراحی سایت اختصاصی"
          badge="FAQ"
          image="/images/FAQ.png"
          imageAlt="سوالات متداول خدمات طراحی سایت اختصاصی"
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
