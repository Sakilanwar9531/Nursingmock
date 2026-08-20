import React from "react";
import { Metadata } from "next";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import ClientApp from "@/app/ClientApp";

interface Props {
  params: {
    slug: string;
  };
}

// SSG: Generate static params for all slugs at build time
export async function generateStaticParams() {
  const updateSlugs = STATIC_NURSING_UPDATES.map((update) => ({
    slug: update.id,
  }));
  
  const seoArticleSlugs = Object.keys(SEO_ARTICLES).map((slug) => ({
    slug,
  }));

  return [...updateSlugs, ...seoArticleSlugs];
}

// Generate dynamic SEO metadata for each specific article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const update = STATIC_NURSING_UPDATES.find((u) => u.id === slug);
  const seoArticle = SEO_ARTICLES[slug];

  if (!update && !seoArticle) {
    return {
      title: "Article Not Found | NCBT Exam Prep",
    };
  }

  const title = update?.title || seoArticle?.title || "NCBT Article";
  const description = update?.summary || seoArticle?.subtitle || "Read in-depth exam preparation guide and clinical notes on NCBT.";
  const image = update?.image || seoArticle?.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200";

  return {
    title: `${title} | NCBT Official Portal`,
    description,
    keywords: [
      update?.tag || "Nursing Exam",
      "NCBT Blog",
      "Medical exam preparation",
      "Official CBT Mock Test",
      slug.replace(/-/g, " "),
    ],
    alternates: {
      canonical: `https://ncbt.in/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | NCBT`,
      description,
      url: `https://ncbt.in/blog/${slug}`,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogPostPage() {
  return <ClientApp />;
}
