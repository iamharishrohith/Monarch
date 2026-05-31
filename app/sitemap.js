export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harishrohith.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${baseUrl}/v2`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    }
  ];
}
