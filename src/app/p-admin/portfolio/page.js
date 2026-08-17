import ProjectTable from "@/app/components/trmplate/p-admin/portfolio/ProjectTable";
import connectToDB from "@/configs/db";
import ProjectModel from "@/models/Project";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default async function Page() {
  await connectToDB();

  const projects = await ProjectModel.find({})
    .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
    .lean();

  const serializedProjects = JSON.parse(JSON.stringify(projects));

  return (
    <section className="mt-14 container">
      <div className="px-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">تمام نمونه کارها</h1>
          <p className="mt-1 text-sm text-gray-500">
            {serializedProjects.length} نمونه‌کار ثبت شده است
          </p>
        </div>

        <Link
          href="/p-admin/portfolio/add-project"
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <MdAdd className="text-lg" />
          افزودن نمونه کار جدید
        </Link>
      </div>

      <div className="px-4">
        <ProjectTable projects={serializedProjects} />
      </div>
    </section>
  );
}
