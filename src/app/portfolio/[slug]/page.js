
import connectToDB from "@/configs/db";


import ProjectModel from "@/models/Project"
import Navbar from "@/app/components/module/navbar/Navbar";
import Footer from "@/app/components/module/footer/Footer";
import Shape from "@/app/components/trmplate/index/shape/Shape";
import PortfolioHead from "@/app/components/trmplate/portfolio/PortfolioHead";

const Article = async ({ params }) => {
    await connectToDB();

    const { slug } = await params;

    const project = await ProjectModel.findOne({ slug })
        .lean();
    const latestProject = await ProjectModel.find({})
        .sort({ createdAt: -1 }) // جدیدترین‌ها
        .limit(4)
        .lean();



    return (
        <>
        <Shape/>
            <Navbar />
            <PortfolioHead project={JSON.parse(JSON.stringify(project))}
            projects={JSON.parse(JSON.stringify(latestProject))}
            />
            <Footer />
        </>
    );
};

export default Article;
