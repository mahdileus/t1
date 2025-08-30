import Link from "next/link";

// SidebarArticles.js
export default function SidebarArticles({ articles }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
            {articles.map((item) => (
                <div key={item._id}>
                    <div className="flex items-start gap-3">
                        <img
                            src={item.thumbnail || "/fallback.webp"}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-start text-right">
                            <h4 className="font-semibold text-sm text-primary">
                                <Link href={`/articles/${item.slug}`}>
                                    {item.title}
                                </Link>
                            </h4>

                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {item.shortDescription}
                            </p>
                            <div className="flex justify-between text-xs text-gray-600 mt-2">
                                <span className="bg-[#fff3f0] text-secondery text-sm px-2 py-0.5 rounded-full">
                                    {item.category}
                                </span>
                                <span className="text-third text-sm">
                                    {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <hr className="text-[#fff3f0] my-2" />
                </div>
            ))}
        </div>
    );
}
