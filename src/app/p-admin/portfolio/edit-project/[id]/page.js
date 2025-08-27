import EditProjectForm from "@/app/components/trmplate/p-admin/portfolio/EditProjectForm";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";

export default async function EditArticlePage({ params }) {

      const { id } = await params;
          await connectToDB();
      


  const project = await ProjectModel.findById(id).lean();
  

  return (
    <div className="mt-10">
      <EditProjectForm
        project={JSON.parse(JSON.stringify(project))}
        projectId={id}
      />
    </div>
  );
}
