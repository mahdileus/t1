import {
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineFolder,
  HiOutlineChartBar,
} from "react-icons/hi2";
import getDashboardStats from "../utils/getDashboardStats";

const statCards = [
  {
    key: "totalViews",
    title: "کل بازدیدها",
    icon: HiOutlineEye,
  },
  {
    key: "todayViews",
    title: "بازدید امروز",
    icon: HiOutlineChartBar,
  },
  {
    key: "totalArticles",
    title: "تعداد مقالات",
    icon: HiOutlineDocumentText,
  },
  {
    key: "totalProjects",
    title: "تعداد نمونه‌کارها",
    icon: HiOutlineFolder,
  },
];

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const viewsChart = Array.isArray(stats.viewsChart) ? stats.viewsChart : [];
  const maxChartViews = Math.max(
    ...viewsChart.map((item) => Number(item.views || 0)),
    1
  );

  return (
    <main className="space-y-6 rounded-[2rem] bg-slate-50 p-4 font-yekan-bakh text-primary sm:p-6">
      <div className="flex flex-col gap-3 rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 w-fit rounded-full bg-secondery/10 px-3 py-1 text-xs font-bold text-secondery ring-1 ring-secondery/20">
            پنل مدیریت
          </p>

          <h1 className="text-xl font-bold text-primary">داشبورد مدیریت</h1>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            گزارش زنده از محتوا، بازدیدها و عملکرد سایت
          </p>
        </div>

        <div className="w-fit rounded-2xl border border-secondery/20 bg-secondery/10 px-4 py-3 text-sm font-bold text-secondery">
          {Number(stats.totalViews || 0).toLocaleString("fa-IR")} بازدید کل
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="group rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.055)] transition hover:border-secondery/30 hover:shadow-[0_22px_65px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <p className="mt-3 text-2xl font-black text-primary">
                    {Number(stats[item.key] || 0).toLocaleString("fa-IR")}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondery/10 text-secondery ring-1 ring-secondery/20 transition group-hover:bg-secondery group-hover:text-white">
                  <Icon className="h-5 w-5 stroke-[1.7]" aria-hidden="true" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-primary">
              نمودار بازدید ۷ روز اخیر
            </h2>

            <p className="mt-1 text-xs leading-6 text-slate-500">
              مجموع بازدید ثبت‌شده در هر روز
            </p>
          </div>

          <span className="w-fit rounded-full bg-secondery/10 px-4 py-2 text-xs font-bold text-secondery ring-1 ring-secondery/20">
            {Number(stats.last7DaysViews || 0).toLocaleString("fa-IR")} بازدید
          </span>
        </div>

        <div className="flex h-72 items-end gap-3 overflow-x-auto rounded-[1.5rem] border border-slate-100 bg-slate-50 px-3 pb-3 pt-5">
          {viewsChart.length ? (
            viewsChart.map((item) => {
              const itemViews = Number(item.views || 0);

              const height = Math.max(
                (itemViews / maxChartViews) * 100,
                itemViews ? 12 : 4
              );

              return (
                <div
                  key={item.date || item.label}
                  className="flex min-w-20 flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-48 w-full items-end justify-center rounded-2xl bg-white px-2 py-2 ring-1 ring-slate-100">
                    <div
                      className="w-full max-w-12 rounded-t-2xl bg-gradient-to-t from-secondery to-orange-300 shadow-[0_10px_25px_rgba(249,115,22,0.22)] transition-all"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.label} - ${itemViews.toLocaleString(
                        "fa-IR"
                      )} بازدید`}
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-black text-primary">
                      {itemViews.toLocaleString("fa-IR")}
                    </p>

                    <p className="mt-1 whitespace-nowrap text-[11px] text-slate-400">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-white text-sm text-slate-400 ring-1 ring-slate-100">
              هنوز داده‌ای برای نمودار ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-base font-bold text-primary">
              پربازدیدترین صفحات
            </h2>

            <span className="shrink-0 rounded-full bg-secondery/10 px-3 py-1 text-xs font-bold text-secondery ring-1 ring-secondery/20">
              {Number(stats.totalPageViews || 0).toLocaleString("fa-IR")} بازدید
            </span>
          </div>

          <div className="space-y-3">
            {stats.topPages?.length ? (
              stats.topPages.map((page) => (
                <div
                  key={page._id || page.path}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-secondery/30 hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-primary">
                      {page.title || page.path}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {page.path}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-secondery ring-1 ring-secondery/20">
                    {Number(page.views || 0).toLocaleString("fa-IR")}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-center text-sm text-slate-400">
                هنوز بازدید صفحه‌ای ثبت نشده است.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-base font-bold text-primary">
              پربازدیدترین مقالات
            </h2>

            <span className="shrink-0 rounded-full bg-secondery/10 px-3 py-1 text-xs font-bold text-secondery ring-1 ring-secondery/20">
              {Number(stats.totalArticleViews || 0).toLocaleString("fa-IR")}{" "}
              بازدید
            </span>
          </div>

          <div className="space-y-3">
            {stats.topArticles?.length ? (
              stats.topArticles.map((article) => (
                <div
                  key={article._id || article.path}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-secondery/30 hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-primary">
                      {article.title || "بدون عنوان"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {article.path}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-secondery ring-1 ring-secondery/20">
                    {Number(article.views || 0).toLocaleString("fa-IR")}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-center text-sm text-slate-400">
                هنوز بازدید مقاله‌ای ثبت نشده است.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
