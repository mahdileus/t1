import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import ProjectModel from "@/models/Project"
import FAQAccordion from "../components/trmplate/web-design/FAQAccordion";
import WebHeader from "../components/trmplate/web-design/webHeader";
import Services from "../components/trmplate/web-design/Services";
import Portfolio from "../components/trmplate/web-design/Portfolio";
import Process from "../components/trmplate/web-design/process";

export default async function page() {
const projects = await ProjectModel.find({ category: "web-design" })
  .sort({ createdAt: -1 })
  .limit(8);

    return (
        <>
            <Shape />
            <Navbar />
            <WebHeader />
            <Services/>
            <Portfolio projects={JSON.parse(JSON.stringify(projects))} />
            <Process/>

            <FAQAccordion/>
            <Footer />
        </>
    )
}