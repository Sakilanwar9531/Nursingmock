import { MetadataRoute } from "next";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import { TARGET_EXAMS, SUBJECTS, PYQ_DATA } from "@/src/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ncbt.in";
  const now = new Date();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exams`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/subjects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tests`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic Blog & Updates Articles
  const blogUrls: MetadataRoute.Sitemap = STATIC_NURSING_UPDATES.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const seoArticleUrls: MetadataRoute.Sitemap = Object.keys(SEO_ARTICLES).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Exam Pages
  const examUrls: MetadataRoute.Sitemap = TARGET_EXAMS.map((exam) => ({
    url: `${baseUrl}/exams/${exam.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Subject Pages
  const subjectUrls: MetadataRoute.Sitemap = SUBJECTS.map((sub) => ({
    url: `${baseUrl}/subjects/${sub.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Test Instruction Pages
  const testUrls: MetadataRoute.Sitemap = [];
  SUBJECTS.forEach((sub) => {
    sub.tests.forEach((t) => {
      if (t.id) {
        testUrls.push({
          url: `${baseUrl}/tests/${t.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    });
  });

  return [
    ...staticPages,
    ...blogUrls,
    ...seoArticleUrls,
    ...examUrls,
    ...subjectUrls,
    ...testUrls,
  ];
}
