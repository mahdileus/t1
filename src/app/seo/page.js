export const revalidate = 3600;

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";

import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";

import SEOProcess from "../components/trmplate/seo/Process";
import SeoHeader from "../components/trmplate/seo/SeoHeader";
import Portfolio from "../components/trmplate/seo/Portfolio";
import FAQAccordion from "../components/module/shared/FAQAccordion";

const siteUrl = "https://t1w.ir";
const pageUrl = `${siteUrl}/seo`;

export const metadata = {
  title: "خدمات سئو و بهینه‌سازی سایت | شرکت تیوان",
  description:
    "خدمات سئو و بهینه‌سازی سایت با تیوان؛ شامل سئو تکنیکال، سئو داخلی، تولید محتوای سئو شده، آنالیز رقبا، لینک‌سازی اصولی و افزایش ورودی ارگانیک از گوگل.",

  keywords: [
    "سئو",
    "خدمات سئو",
    "بهینه سازی سایت",
    "بهینه سازی سایت برای گوگل",
    "افزایش رتبه گوگل",
    "سئو تکنیکال",
    "سئو داخلی",
    "سئو خارجی",
    "لینک سازی",
    "آنالیز سئو",
    "تولید محتوا سئو شده",
    "افزایش ورودی گوگل",
    "شرکت سئو",
    "تیوان",
    "آرین تجارت تیوان",
  ],

  alternates: {
    canonical: "/seo",
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
    title: "خدمات سئو و بهینه‌سازی سایت | شرکت تیوان",
    description:
      "افزایش رتبه سایت در گوگل با خدمات تخصصی سئو تیوان؛ آنالیز، سئو تکنیکال، تولید محتوا، لینک‌سازی و بهبود ورودی ارگانیک.",
    url: "/seo",
    siteName: "آرین تجارت تیوان",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/og/tivan-seo-og.jpg",
        width: 1200,
        height: 630,
        alt: "خدمات سئو و بهینه‌سازی سایت شرکت تیوان",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "خدمات سئو و بهینه‌سازی سایت | شرکت تیوان",
    description:
      "خدمات تخصصی سئو برای افزایش رتبه گوگل، بهبود ساختار سایت و جذب ورودی ارگانیک هدفمند.",
    images: ["/images/og/tivan-seo-og.jpg"],
  },
};

const faqs = [
  {
    question: "سئو چیست و چرا برای کسب‌وکار من مهم است؟",
    answer:
      "سئو یا بهینه‌سازی سایت برای موتورهای جستجو، مجموعه‌ای از اقدامات فنی، محتوایی و اعتباری است که باعث می‌شود سایت شما در نتایج گوگل بهتر دیده شود. این موضوع می‌تواند به جذب بازدیدکننده هدفمند، افزایش اعتماد کاربران و رشد فروش یا دریافت سرنخ‌های تجاری کمک کند.",
  },
  {
    question: "چقدر طول می‌کشد تا نتیجه سئو را ببینم؟",
    answer:
      "زمان نتیجه‌گیری از سئو به وضعیت فعلی سایت، میزان رقابت کلمات کلیدی، کیفیت محتوا، ساختار فنی و اعتبار دامنه بستگی دارد. معمولاً برای مشاهده نتایج قابل اندازه‌گیری، بازه‌ای حدود ۳ تا ۶ ماه زمان نیاز است.",
  },
  {
    question: "آیا سئو فقط برای سایت‌های فروشگاهی مفید است؟",
    answer:
      "خیر. سئو برای سایت‌های فروشگاهی، شرکتی، خدماتی، آموزشی، خبری و حتی سایت‌های شخصی کاربرد دارد. هر کسب‌وکاری که مخاطبانش در گوگل جستجو می‌کنند، می‌تواند از سئو برای جذب ترافیک هدفمند استفاده کند.",
  },
  {
    question: "کلمات کلیدی چگونه انتخاب می‌شوند؟",
    answer:
      "انتخاب کلمات کلیدی با بررسی بازار، رفتار جستجوی کاربران، تحلیل رقبا، هدف تجاری صفحات و میزان سختی کلمات انجام می‌شود. هدف این است که روی عباراتی کار شود که هم جستجوی واقعی دارند و هم برای کسب‌وکار شما ارزشمند هستند.",
  },
  {
    question: "آیا محتوا تأثیر زیادی روی سئو دارد؟",
    answer:
      "بله. محتوای باکیفیت، ساختاریافته و پاسخ‌گو به نیاز کاربر یکی از مهم‌ترین عوامل موفقیت در سئو است. محتوای مناسب می‌تواند باعث افزایش زمان حضور کاربر، بهبود نرخ تعامل، کسب رتبه بهتر و افزایش اعتماد مخاطب شود.",
  },
  {
    question: "سئو تکنیکال چیست و چرا مهم است؟",
    answer:
      "سئو تکنیکال به بهینه‌سازی بخش‌های فنی سایت مانند سرعت بارگذاری، ساختار URL، نقشه سایت، فایل robots.txt، داده‌های ساختاریافته، موبایل‌فرندلی بودن، وضعیت ایندکس صفحات و خطاهای فنی مربوط می‌شود. بدون ساختار فنی درست، حتی محتوای خوب هم ممکن است عملکرد مناسبی در گوگل نداشته باشد.",
  },
  {
    question: "آیا لینک‌سازی هنوز موثر است؟",
    answer:
      "بله، اما کیفیت لینک‌ها بسیار مهم‌تر از تعداد آن‌هاست. لینک‌سازی اصولی و طبیعی از سایت‌های معتبر می‌تواند به افزایش اعتبار دامنه و بهبود رتبه کمک کند. در مقابل، لینک‌سازی اسپم یا غیرطبیعی ممکن است برای سایت آسیب‌زا باشد.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "خدمات سئو و بهینه‌سازی سایت",
  serviceType: "SEO Services",
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
    "خدمات سئو و بهینه‌سازی سایت شامل سئو تکنیکال، سئو داخلی، تولید محتوای سئو شده، تحلیل رقبا، لینک‌سازی اصولی و افزایش ورودی ارگانیک از گوگل.",
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
      name: "خدمات سئو",
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

export default async function SeoPage() {
  await connectToDB();

  const projects = await ProjectModel.find({
    category: "سئو",

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
        <SeoHeader />

        <SEOProcess />

        <Portfolio projects={serializedProjects} />

        <FAQAccordion
          faqs={faqs}
          title="سوالات متداول سئو"
          badge="FAQ"
          image="/images/FAQ.png"
          imageAlt="سوالات متداول خدمات سئو و بهینه‌سازی سایت"
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
