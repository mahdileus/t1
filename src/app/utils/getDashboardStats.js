import connectToDB from "@/configs/db";
import ArticleModel from "@/models/Article";
import ProjectModel from "@/models/Project";
import ViewEventModel from "@/models/ViewEvent";

function getTehranDateKey(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function getTehranDateLabel(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Tehran",
  }).format(date);
}

function getLast7Days() {
  const days = [];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    days.push({
      date,
      key: getTehranDateKey(date),
      label: getTehranDateLabel(date),
      views: 0,
    });
  }

  return days;
}

export default async function getDashboardStats() {
  await connectToDB();

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const last7Days = new Date(now);
  last7Days.setDate(last7Days.getDate() - 6);
  last7Days.setHours(0, 0, 0, 0);

  const [
    totalArticles,
    totalProjects,
    totalViews,
    totalArticleViews,
    totalPageViews,
    todayViews,
    last7DaysViews,
    chartViews,
    topArticles,
    topPages,
    recentArticles,
    recentProjects,
  ] = await Promise.all([
    ArticleModel.countDocuments(),
    ProjectModel.countDocuments(),

    ViewEventModel.countDocuments(),

    ViewEventModel.countDocuments({
      targetType: "ARTICLE",
    }),

    ViewEventModel.countDocuments({
      targetType: "PAGE",
    }),

    ViewEventModel.countDocuments({
      createdAt: {
        $gte: startOfToday,
      },
    }),

    ViewEventModel.countDocuments({
      createdAt: {
        $gte: last7Days,
      },
    }),

    ViewEventModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: last7Days,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Tehran",
            },
          },
          views: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]),

    ViewEventModel.aggregate([
      {
        $match: {
          targetType: "ARTICLE",
        },
      },
      {
        $group: {
          _id: "$targetId",
          title: {
            $last: "$title",
          },
          path: {
            $last: "$path",
          },
          views: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 5,
      },
    ]),

    ViewEventModel.aggregate([
      {
        $match: {
          targetType: "PAGE",
        },
      },
      {
        $group: {
          _id: "$path",
          title: {
            $last: "$title",
          },
          path: {
            $last: "$path",
          },
          views: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 5,
      },
    ]),

    ArticleModel.find({})
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select("title slug createdAt")
      .lean(),

    ProjectModel.find({})
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select("title slug createdAt")
      .lean(),
  ]);

  const days = getLast7Days();

  const chartViewsMap = chartViews.reduce((acc, item) => {
    acc[item._id] = item.views;
    return acc;
  }, {});

  const viewsChart = days.map((day) => ({
    date: day.key,
    label: day.label,
    views: chartViewsMap[day.key] || 0,
  }));

  return {
    totalArticles,
    totalProjects,
    totalViews,
    totalArticleViews,
    totalPageViews,
    todayViews,
    last7DaysViews,
    viewsChart,
    topArticles,
    topPages,
    recentArticles: JSON.parse(JSON.stringify(recentArticles)),
    recentProjects: JSON.parse(JSON.stringify(recentProjects)),
  };
}
