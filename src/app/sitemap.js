import connectToDB from "@/configs/db";
import Article from "@/models/Article";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://t1w.ir"
).replace(/\/+$/, "");

function getValidDate(...values) {
  for (const value of values) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime()) && date.getTime() <= Date.now()) {
      return date;
    }
  }
  return undefined;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value, `${siteUrl}/`);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    url.hash = "";
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return url.href;
  } catch {
    return null;
  }
}

function makeRoute(document, basePath, includeArticleDate = false) {
  if (typeof document.slug !== "string" || !document.slug.trim()) {
    return null;
  }

  const url = `${siteUrl}/${basePath}/${encodeURIComponent(document.slug)}`;
  const canonical =
    typeof document.canonicalUrl === "string"
      ? document.canonicalUrl.trim()
      : "";

  if (canonical && normalizeUrl(canonical) !== normalizeUrl(url)) {
    return null;
  }

  const route = { url };

  if (includeArticleDate) {
    const lastModified = getValidDate(
      document.contentUpdatedAt,
      document.publishedAt,
      document.createdAt
    );
    if (lastModified) {
      route.lastModified = lastModified;
    }
  }

  return route;
}

export default async function sitemap() {
  const staticPaths = [
    "/",
    "/seo",
    "/programming",
    "/web-design",
    "/about-us",
    "/contact-us",
    "/portfolios",
    "/articles",
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  try {
    await connectToDB();

    const filter = {
      status: "published",
      noIndex: { $ne: true },
      slug: { $type: "string", $ne: "" },
    };

    const [articles, projects] = await Promise.all([
      Article.find(filter)
        .select("slug canonicalUrl contentUpdatedAt publishedAt createdAt")
        .lean()
        .exec(),
      Project.find(filter).select("slug canonicalUrl").lean().exec(),
    ]);

    const articleRoutes = articles.map((article) =>
      makeRoute(article, "articles", true)
    );
    const projectRoutes = projects.map((project) =>
      makeRoute(project, "portfolios")
    );

    const routes = [
      ...staticRoutes,
      ...articleRoutes,
      ...projectRoutes,
    ].filter(Boolean);

    return [
      ...new Map(routes.map((route) => [route.url, route])).values(),
    ];
  } catch (error) {
    // موقع build در Docker دیتابیس در دسترس نیست → فقط مسیرهای استاتیک
    console.warn("Sitemap: DB unavailable during build, returning static routes only.", error.message);
    return staticRoutes;
  }
}