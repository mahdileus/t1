import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import AboutBoxes from "../components/trmplate/about-us/AboutBoxes";
import AboutCounter from "../components/trmplate/about-us/AboutCounter";
import AboutHeader from "../components/trmplate/about-us/AboutHeader";
import Comments from "../components/trmplate/index/comments/comments";
import Shape from "../components/trmplate/index/shape/Shape";

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
