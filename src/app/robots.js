const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://t1w.ir"
).replace(/\/+$/, "");

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api$",
        "/api/",
        "/p-admin$",
        "/p-admin?",
        "/p-admin/",
        "/admin-login/",
        "/admin-login",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}