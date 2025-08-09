
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="container min-h-screen flex flex-col items-center justify-center text-center py-10 font-yekan-bakh">
      <div className="relative mb-8">
        <Image
          src="/images/404.gif"
          alt="404 Not Found"
          width={700}
          height={700}
          className="object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold  text-primary mb-4 ">صفحه مورد نظر پیدا نشد!</h1>
      <p className="text-gray-600 max-w-md mb-6 ">
        متأسفیم، صفحه‌ای که دنبال آن بودید وجود ندارد یا ممکن است حذف شده باشد.
      </p>
      <Link
        href="/"
        className="inline-block bg-secondery text-white px-6 py-2 rounded-xl text-sm hover:bg-primary transition "
      >
        بازگشت به صفحه اصلی
      </Link>
    </section>
  );
}
