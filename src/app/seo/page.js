import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import SEOProcess from "../components/trmplate/seo/Process";
import SeoHeader from "../components/trmplate/seo/SeoHeader";
import ProjectModel from "@/models/Project"
import FAQAccordion from "../components/trmplate/seo/FAQAccordion";
import Portfolio from "../components/trmplate/seo/Portfolio";

export const metadata = {
  title: "خدمات سئو و بهینه‌سازی سایت | شرکت تیوان",
  description:
    "افزایش رتبه سایت در گوگل با خدمات سئو تیوان: آنالیز تخصصی، بهینه‌سازی فنی، لینک‌سازی، تولید محتوا و افزایش ورودی ارگانیک.",
  keywords: [
    "سئو",
    "خدمات سئو",
    "بهینه سازی سایت",
    "افزایش رتبه گوگل",
    "لینک سازی",
    "آنالیز سئو",
    "سئو داخلی",
    "سئو خارجی",
    "تولید محتوا سئو شده",
    "تیوان"
  ],
};



export default async function page() {
const projects = await ProjectModel.find({ category: "سئو" })
  .sort({ createdAt: -1 })
  .limit(8);

    return (
        <>
            <Shape />
            <Navbar />
            <SeoHeader />
            <SEOProcess />
            <Portfolio projects={JSON.parse(JSON.stringify(projects))} />

            <FAQAccordion/>
            <Footer />
        </>
    )
}