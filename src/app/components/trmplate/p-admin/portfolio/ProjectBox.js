// components/template/p-admin/course/CourseBox.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md'; 

export default function ProjectBox({ project }) {

  
  const router = useRouter()

  const removeProject = async () => {
    const confirm = await swal({
      title: "آیا از حذف مطمئنی؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
      dangerMode: true,
    });
    if (confirm) {
      const res = await fetch(`/api/project/${project._id}`, {
        method: "DELETE",
      });
      

      if (res.ok) {
        swal({
          title:"پروژه با موفقیت حذف شد",
          icon:"success",
          buttons:"فهمیدم"
          
        }).then(() =>
          router.refresh()
        );
      }
    }
  };
    const handleEditClick = () => {
    router.push(`/p-admin/portfolio/edit-project/${project._id}`);
  };


  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 mb-4">
      {/* تصویر دوره */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* اطلاعات دوره */}
      <div className="flex flex-col justify-between pr-4 w-full">
        <div className="flex justify-between ">
          <div>
            <Link
              href={`/portfolio/${project.slug}`}
              className="text-lg font-semibold text-primary hover:underline text-right"
            >
              {project.title}
            </Link>
            
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-red-400 hover:text-red-500 text-2xl cursor-pointer" onClick={removeProject} >
            <MdDelete/>
          </span>
          <span className="text-third hover:text-third/90 text-2xl cursor-pointer" onClick={handleEditClick}>

            <MdModeEdit />
          </span>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: project.longDescription }} className="text-sm text-gray-600 mt-1 text-right line-clamp-2"> 
        </p>

        <div className="text-left text-secondery font-bold mt-2">
          {project.category}
        </div>
      </div>
    </div>
  );
}
