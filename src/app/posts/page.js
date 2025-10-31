export const dynamic = "force-dynamic";

import ArticleModel from "@/models/Article"
import connectToDB from "@/configs/db";
import { CiFileOn } from "react-icons/ci";

import Footer from "../components/module/footer/Footer";
import Navbar from "../components/module/navbar/Navbar";
import Posts from "../components/trmplate/Posts/Posts";
import Shape from "../components/trmplate/index/shape/Shape";

export const metadata = {
  title: "مقالات آموزشی طراحی سایت، سئو و دیجیتال مارکتینگ | تیوان",
  description:
    "جدیدترین مقالات آموزشی در زمینه طراحی سایت، سئو، برنامه‌نویسی و رشد برند در فضای دیجیتال. مطالب کاربردی از تیم تیوان.",
  keywords: [
    "مقالات طراحی سایت",
    "آموزش سئو",
    "دیجیتال مارکتینگ",
    "آموزش برنامه نویسی",
    "محتوای آموزشی وب",
    "وبلاگ تیوان",
    "تیوان"
  ],
};


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