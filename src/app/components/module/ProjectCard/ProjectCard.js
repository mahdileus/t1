import Link from "next/link";

export default function ProjectCard({project}) {
  return (
    <div className="relative w-70 h-[270px] group font-yekan-bakh rounded-3xl overflow-hidden shadow-lg group">
      {/* تصویر پس‌زمینه */}
      <img
        src={project.thumbnail}
        alt="article"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* لایه‌ی تاریک برای خوانایی متن */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all inset-0 blog-img"></div>

      {/* محتوای مقاله */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white space-y-4">

        {/* عنوان مقاله */}
        <Link href={`/posts/${project.slug}`} className="text-xl opacity-0 group-hover:opacity-100 transition-all font-bold leading-7">
            {project.title}
        </Link>
                {/* توضیح کوتاه */}
        <p className="text-sm text-gray-100 leading-6 line-clamp-4 text-justify">
            {project.shortDescription}
                    </p>


      </div>

    </div>
  );
}
