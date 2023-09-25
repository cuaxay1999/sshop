export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
