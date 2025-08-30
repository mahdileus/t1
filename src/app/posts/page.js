export const dynamic = "force-dynamic";

import ArticleModel from "@/models/Article"
import connectToDB from "@/configs/db";
import { CiFileOn } from "react-icons/ci";

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Posts from "../components/trmplate/Posts/Posts";
import Shape from "../components/trmplate/index/shape/Shape";



const PostsArchive = async () => {
  await connectToDB();
  const posts = await ArticleModel.find({}).sort({ createdAt: -1 }).lean();
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));
  const allCategories = Array.from(new Set(posts.map(p => p.category)));



  return (
    <>
    <Shape/>
      <Navbar />
      <div className="flex justify-center items-center gap-4 pt-20">
        <CiFileOn className="w-10 h-10 text-secondery" />
        <h1 className="text-center text-3xl text-primary font-bold font-yekan-bakh ">مقالات </h1>

      </div>

      <Posts posts={JSON.parse(JSON.stringify(posts))} tags={allTags}
        categories={allCategories} />
      <Footer />
    </>
  );
};

export default PostsArchive;