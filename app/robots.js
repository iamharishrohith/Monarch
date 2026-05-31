export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harishrohith.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/v2"],
      disallow: ["/gear5", "/gear5/login", "/api/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
