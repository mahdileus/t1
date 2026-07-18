const siteUrl = "https://t1w.ir";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/seo",
          "/programming",
          "/web-design",
          "/about-us",
          "/contact-us",
          "/portfolios",
          "/portfolio",
          "/articles",
        ],
        disallow: [
          "/api/",
          "/admin-login",
          "/p-admin/",
          "/not-found",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
