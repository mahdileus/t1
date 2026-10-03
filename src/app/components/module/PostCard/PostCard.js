import Link from "next/link";
import { HiOutlineCalendar } from "react-icons/hi";

export default function PostCard({ post }) {
  const dateCandidates = [
    { value: post.contentUpdatedAt, label: "بروزرسانی" },
    { value: post.publishedAt, label: "انتشار" },
    { value: post.createdAt, label: "انتشار" },
  ];

  const displayDate = dateCandidates
    .filter((item) => item.value)
    .map((item) => ({
      ...item,
      date: new Date(item.value),
    }))
    .find((item) => !Number.isNaN(item.date.getTime()));

  const formattedDate = displayDate
    ? displayDate.date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tehran",
    })
    : "";
  return (
    <div className="relative w-70 h-[400px] font-yekan-bakh rounded-3xl overflow-hidden shadow-lg group">
      {/* تصویر پس‌زمینه */}
      <img
        src={post.cover}
        alt="article"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* لایه‌ی تاریک برای خوانایی متن */}
      <div className="absolute inset-0 blog-img"></div>

      {/* محتوای مقاله */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white space-y-4">
        {/* تاریخ و آیکن */}
        {displayDate && (
          <div className="flex items-center gap-2 bg-[#ff9436] text-white text-sm px-3 py-1 rounded-full w-max">
            <HiOutlineCalendar aria-hidden="true" className="text-lg" />

            <time dateTime={displayDate.date.toISOString()}>
              {displayDate.label}: {formattedDate}
            </time>
          </div>
        )}

        {/* عنوان مقاله */}
        <Link href={`/articles/${post.slug}`} className="text-base font-medium text-justify leading-7">
          {post.title}
        </Link>

        {/* توضیح کوتاه */}
        <p className="text-sm text-gray-100 leading-6 line-clamp-4 text-justify">
          {post.excerpt || post.shortDescription}
        </p>
      </div>

      {/* دکمه پایین شناور (در صورت نیاز) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-20">
        <svg className="w-4 h-4 text-third absolute top-1.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
