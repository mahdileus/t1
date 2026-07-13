import ArticlesArchiveCard from "./ArticlesArchiveCard";

export default function ArticlesArchiveGrid({ articles = [] }) {
  if (!articles.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
        <h3 className="text-xl font-bold text-[var(--color-secondery)]">
          مقاله‌ای پیدا نشد
        </h3>
        <p className="mt-3 text-sm text-slate-500">
          فیلترها را تغییر بده یا عبارت جستجوی دیگری امتحان کن.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticlesArchiveCard key={article._id} article={article} />
      ))}
    </div>
  );
}
