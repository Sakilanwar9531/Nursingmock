import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/analytics",
        "/auth",
        "/test/",
        "/test",
        "/result",
      ],
    },
    sitemap: "https://ncbt.in/sitemap.xml",
  };
}
