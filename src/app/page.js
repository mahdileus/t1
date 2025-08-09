import connectToDB from "../../configs/db";
import Navbar from "./components/module/navbar/Navbar";
import AboutUs from "./components/trmplate/index/about-us/AboutUs";
import Contact from "./components/trmplate/index/contact/Contact";
import HeroSection from "./components/trmplate/index/herosection/Herosection";
import Portfolio from "./components/trmplate/index/portfolio/Portfolio";
import Posts from "./components/trmplate/index/posts/Posts";
import Process from "./components/trmplate/index/process/Process";
import Services from "./components/trmplate/index/servvices/Services";
import Shape from "./components/trmplate/index/shape/Shape";
import ArticleModel from "../../models/Article"
import ProjectModel from "../../models/Project"
import Footer from "./components/module/footer/Footer";
import Comments from "./components/trmplate/index/comments/comments";

export default async function Home() {
    await connectToDB();
   const posts = await ArticleModel.find({}).sort({createdAt: -1}).limit(8);
   const projects = await ProjectModel.find({}).sort({createdAt: -1}).limit(8);
   
  return (
    <div >
      <Shape/>
      <Navbar/>
      <HeroSection/>
      <Portfolio projects={JSON.parse(JSON.stringify(projects))}/>
      <AboutUs/>
      <Services/>
      <Contact/>
      <Process/>
      <Posts posts={JSON.parse(JSON.stringify(posts))}/>
      <Comments/>
      <Footer/>
    </div>
  );
}
