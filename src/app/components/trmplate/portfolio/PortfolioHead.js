"use client";

import Image from "next/image";
import { FaTags,FaHtml5  } from "react-icons/fa";
import { CiFolderOn } from "react-icons/ci";
import { TbSeo,TbWorldWww } from "react-icons/tb";

export default function PortfolioHead({ project }) {
    // آیکون دسته بندی‌ها
    const categoryIcons = {
        "وب سایت": <TbWorldWww className="text-secondery w-5 h-5" />,
        "سئو": <TbSeo className="text-secondery w-5 h-5" />,
        "برنامه نویسی": <FaHtml5 className="text-secondery w-5 h-5" />,
        default: <CiFolderOn className="text-secondery w-5 h-5" />,
    };

    return (
        <div className="container gap-8 my-10 font-yekan-bakh">
            <div className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-4xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">
                {/* تصویر سمت راست */}
                <div className="w-full md:w-[30%]">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="rounded-xl shadow-md"
                    />
                </div>

                {/* عنوان + توضیح کوتاه سمت چپ */}
                <div className="w-full md:w-[70%] flex flex-col justify-between p-8 rounded-4xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-primary mb-3">
                            {project.title}
                        </h1>
                        <div className="flex items-center gap-2 bg-white p-2 rounded-full">
                            {categoryIcons[project.category] || categoryIcons.default}
                            <span className="text-primary text-sm">{project.category}</span>
                        </div>
                    </div>


                    {/* توضیح کوتاه و دسته‌بندی */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-800 text-sm">{project.shortDescription}</p>

                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-secondery text-md">لینک به وبسایت</a>
                    </div>

                    {/* تگ‌ها */}
                    <div className="flex gap-2 items-center flex-wrap">
                        <FaTags className="text-primary" />
                        {(Array.isArray(project.tags) ? project.tags : [project.tags]).map(
                            (tag, index) => (
                                <span
                                    key={index}
                                    className="text-sm bg-[#fff3f0] text-secondery px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* توضیح بلند */}
            <div className="mt-8 rich-text">
                <div
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                    className="text-gray-700 leading-7 p-8 rounded-4xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg"
                />
                {project.mainPicture}
            </div>
        </div>
    );
}
