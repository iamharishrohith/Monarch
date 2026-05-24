export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harishrohith.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/v2"],
      disallow: ["/admin", "/admin/login", "/api/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
