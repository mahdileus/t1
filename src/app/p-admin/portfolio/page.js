import ProjectBox from "@/app/components/trmplate/p-admin/portfolio/ProjectBox";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";
import Link from "next/link";
export default async function page() {
  await connectToDB();
  const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
  

  return (
    <section className=" mt-14 container">
      <div className=" px-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-6">تمام نمونه کارها</h1>
        </div>
        <div>
          <Link href={"/p-admin/portfolio/add-project"} className="text-white bg-primary p-3 rounded-2xl">افزودن نمونه کار جدید</Link>

        </div>
        
      </div>
              {projects.map((project) => (
            <ProjectBox key={project._id} project={JSON.parse(JSON.stringify(project))} />
          ))}
    </section>
  );
}
