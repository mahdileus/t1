import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import MapBox from "../components/trmplate/contact-us/MapBox";
import Shape from "../components/trmplate/index/shape/Shape";

export const metadata = {
  title: "تماس با ما | شرکت تیوان",
  description:
    "برای مشاوره طراحی سایت، سئو یا برنامه‌نویسی اختصاصی با تیم تیوان تماس بگیرید. ارتباط مستقیم با کارشناسان فنی و بازاریابی دیجیتال.",
  keywords: [
    "تماس با تیوان",
    "مشاوره طراحی سایت",
    "درخواست پروژه",
    "پشتیبانی سایت",
    "مشاوره سئو",
    "ارتباط با شرکت تیوان",
    "تیوان"
  ],
};

const ContactUs =  () => {

  return (
    <>
    <Shape/>
    <Navbar/>
    <MapBox/>
    
    <Footer/>
    </>
  );
};

export default ContactUs;