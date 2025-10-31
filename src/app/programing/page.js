import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import ProjectModel from "@/models/Project"
import ProgrammingHeader from "../components/trmplate/programming/programmingHeader";
import ComparisonTable from "../components/trmplate/programming/ComparisonTable";
import TechUseCases from "../components/trmplate/programming/TechUseCases";
import FAQAccordion from "../components/trmplate/programming/FAQAccordion";
import Portfolio from "../components/trmplate/programming/Portfolio";

export const metadata = {
  title: "برنامه‌نویسی اختصاصی وب و اپلیکیشن | شرکت تیوان",
  description:
    "توسعه وب و اپلیکیشن‌های اختصاصی با تیوان. برنامه‌نویسی با Next.js، Node.js، Laravel، React و APIهای حرفه‌ای برای پروژه‌های سازمانی و استارتاپی.",
  keywords: [
    "برنامه نویسی اختصاصی",
    "توسعه وب",
    "توسعه اپلیکیشن",
    "Next.js",
    "React",
    "Node.js",
    "Laravel",
    "API نویسی",
    "طراحی سیستم اختصاصی",
    "تیوان"
  ],
};


export default async function page() {
const projects = await ProjectModel.find({ category: "برنامه نویسی" })
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