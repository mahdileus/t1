import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import SEOProcess from "../components/trmplate/seo/Process";
import SeoHeader from "../components/trmplate/seo/SeoHeader";
import ProjectModel from "@/models/Project"
import FAQAccordion from "../components/trmplate/seo/FAQAccordion";
import Portfolio from "../components/trmplate/seo/Portfolio";

export default async function page() {
const projects = await ProjectModel.find({ category: "seo" })
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