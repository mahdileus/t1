import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import AboutBoxes from "../components/trmplate/about-us/AboutBoxes";
import AboutCounter from "../components/trmplate/about-us/AboutCounter";
import AboutHeader from "../components/trmplate/about-us/AboutHeader";
import Comments from "../components/trmplate/index/comments/comments";
import Shape from "../components/trmplate/index/shape/Shape";

export const metadata = {
  title: "درباره ما | شرکت تیوان",
  description:
    "شرکت تیوان با تیمی متخصص در طراحی سایت، سئو و برنامه‌نویسی اختصاصی، همراه برندهای ایرانی و بین‌المللی برای رشد دیجیتال و افزایش فروش.",
  keywords: [
    "درباره تیوان",
    "شرکت تیوان",
    "تیم تیوان",
    "طراحی سایت",
    "برنامه نویسی",
    "سئو",
    "دیجیتال مارکتینگ",
    "تجربه تیوان",
    "برند سازی دیجیتال"
  ],
};


export default function AboutUs() {
  return (
    <section className="font-yekan-bakh">
    <Shape/>
    <Navbar/>
    <AboutHeader/>
    <AboutBoxes/>
    <AboutCounter/>
    <Comments/>
    <Footer/>
    </section>
  );
}
