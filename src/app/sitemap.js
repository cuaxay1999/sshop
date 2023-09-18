export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact-page`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/view-news-detail`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/chain`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/facebook-login`,
      lastModified: new Date(),
    },
  ];
}
