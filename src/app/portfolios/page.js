export const dynamic = "force-dynamic";


import ProjectModel from "@/models/Project"
import connectToDB from "@/configs/db";
import { FaUserTie } from "react-icons/fa";
import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Shape from "../components/trmplate/index/shape/Shape";
import Projects from "../components/trmplate/portfolio/Projects";

export const metadata = {
  title: "نمونه‌کارهای طراحی سایت و برنامه‌نویسی | شرکت تیوان",
  description:
    "نمونه‌کارهای موفق تیوان در طراحی سایت، برنامه‌نویسی اختصاصی، سئو و مارکتینگ دیجیتال برای برندهای ایران، کانادا و آلمان.",
  keywords: [
    "نمونه کار طراحی سایت",
    "پروژه های تیوان",
    "طراحی سایت اختصاصی",
    "نمونه کار سئو",
    "نمونه کار برنامه نویسی",
    "Portfolio",
    "تیوان"
  ],
};


const PostsArchive = async () => {
  await connectToDB();
  const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags || [])));
  const allCategories = Array.from(new Set(projects.map(p => p.category)));



  return (
    <>
    <Shape/>
      <Navbar />
      <div className="flex justify-center items-center gap-4 pt-20">
        <FaUserTie className="w-10 h-10 text-secondery" />
        <h1 className="text-center text-3xl text-primary font-bold font-yekan-bakh ">نمونه کارها </h1>

      </div>

      <Projects projects={JSON.parse(JSON.stringify(projects))} tags={allTags}
        categories={allCategories} />
      <Footer />
    </>
  );
};

export default PostsArchive;