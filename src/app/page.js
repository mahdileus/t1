export const revalidate = 3600;

import Navbar from "./components/module/navbar/Navbar";
import AboutUs from "./components/trmplate/index/about-us/AboutUs";
import Contact from "./components/trmplate/index/contact/Contact";
import HeroSection from "./components/trmplate/index/herosection/Herosection";
import Portfolio from "./components/trmplate/index/portfolio/Portfolio";
import Posts from "./components/trmplate/index/posts/Posts";
import Process from "./components/trmplate/index/process/Process";
import Services from "./components/trmplate/index/servvices/Services";
import Footer from "./components/module/footer/Footer";
import Comments from "./components/trmplate/index/comments/comments";
import Shape from "./components/trmplate/index/shape/Shape";
import ViewTracker from "./components/trmplate/analytics/ViewTracker";

import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ProjectModel from "@/models/Project";

export default async function Home() {
  await connectToDB();

  const posts = await ArticleModel.find({
    status: "published",
    visibility: "public",
    noIndex: { $ne: true },
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(8)
    .select(
      "title slug excerpt description cover coverAlt createdAt publishedAt readingTime category"
    )
    .populate("category", "title slug")
    .lean();

  const projects = await ProjectModel.find({
    status: "published",
    visibility: "public",
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .select("title slug excerpt description cover coverAlt createdAt category")
    .lean();

  const footerPosts = posts.slice(0, 4);

  return (
    <>
      <Shape />

      <Navbar />

      <main>
        <HeroSection />

        <Portfolio projects={projects} />

        <AboutUs />

        <Services />

        <Contact />

        <Process />

        <Posts posts={posts} />

        <Comments />
      </main>

      <Footer posts={footerPosts} />

      <ViewTracker targetType="PAGE" path="/" title="صفحه اصلی" />
    </>
  );
}
