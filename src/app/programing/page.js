import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import ProjectModel from "../../../models/Project"
import ProgrammingHeader from "../components/trmplate/programming/programmingHeader";
import ComparisonTable from "../components/trmplate/programming/ComparisonTable";
import TechUseCases from "../components/trmplate/programming/TechUseCases";
import FAQAccordion from "../components/trmplate/programming/FAQAccordion";
import Portfolio from "../components/trmplate/programming/Portfolio";

export default async function page() {
const projects = await ProjectModel.find({ category: "programming" })
  .sort({ createdAt: -1 })
  .limit(8);

    return (
        <>
            <Shape />
            <Navbar />
            <ProgrammingHeader/>
            <ComparisonTable/>
            <TechUseCases/>
            <Portfolio projects={JSON.parse(JSON.stringify(projects))} />
            <FAQAccordion/>
            <Footer />
        </>
    )
}