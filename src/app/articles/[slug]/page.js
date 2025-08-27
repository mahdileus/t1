
import ArticleHeader from "@/app/components/trmplate/article/ArticleHeader";
import connectToDB from "@/configs/db";


import ArticleModel from "@/models/Article"
import Navbar from "@/app/components/module/navbar/Navbar";
import Footer from "@/app/components/module/footer/Footer";
import Shape from "@/app/components/trmplate/index/shape/Shape";

const Article = async ({ params }) => {
    await connectToDB();

    const { slug } = await params;

    const article = await ArticleModel.findOne({ slug })
        .lean();
    const latestArticles = await ArticleModel.find({})
        .sort({ createdAt: -1 }) // جدیدترین‌ها
        .limit(4)
        .lean();



    return (
        <>
        <Shape/>
            <Navbar />
            <ArticleHeader article={JSON.parse(JSON.stringify(article))}
            articles={JSON.parse(JSON.stringify(latestArticles))}
            />
            <Footer />
        </>
    );
};

export default Article;
