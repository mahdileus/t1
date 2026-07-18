import connectToDB from "@/configs/db";
import Article from "@/models/Article";
import Project from "@/models/Project";

const siteUrl = "https://t1w.ir";

export default async function sitemap() {
  await connectToDB();

  const staticRoutes = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/seo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/programming`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/web-design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/portfolios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articles = await Article.find({
    $or: [
      { status: "published" },
      { status: { $exists: false } },
    ],
    noIndex: { $ne: true },
    slug: { $exists: true, $ne: "" },
  })
    .select("slug updatedAt createdAt")
    .sort({ updatedAt: -1 })
    .lean();

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: article.updatedAt || article.createdAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const projects = await Project.find({
    $or: [
      { status: "published" },
      { status: { $exists: false } },
    ],
    noIndex: { $ne: true },
    slug: { $exists: true, $ne: "" },
  })
    .select("slug updatedAt createdAt")
    .sort({ updatedAt: -1 })
    .lean();

  const portfolioRoutes = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt || project.createdAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...articleRoutes, ...portfolioRoutes];
}
