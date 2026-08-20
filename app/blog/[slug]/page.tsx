import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import { BLOG_TRANSLATIONS } from "@/src/blogTranslations";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Globe
} from "lucide-react";

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
    title: `${title} | NCBT`,
    description,
    keywords: seoArticle?.keywords || [
      "nursing officer exam",
      "CBT mock test",
      "NCBT study guide",
      "AIIMS NORCET",
      "ESIC Nursing Officer",
    ],
    alternates: {
      canonical: `https://ncbt.in/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | NCBT`,
      description,
      url: `https://ncbt.in/blog/${slug}`,
      siteName: "NCBT — National CBT Exam Portal",
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
      title: `${title} | NCBT`,
      description,
      images: [image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const update = STATIC_NURSING_UPDATES.find((u) => u.id === slug);
  const seoArticle = SEO_ARTICLES[slug];

  if (!update && !seoArticle) {
    notFound();
  }

  const title = update?.title || seoArticle?.title || "";
  const subtitle = update?.summary || seoArticle?.subtitle || "";
  const badge = update?.badge || seoArticle?.badge || "EXAM BLUEPRINT";
  const date = update?.date || "Official Publication";
  const readTime = update?.readTime || "5 min read";
  const authorName = update?.authorName || "NCBT Editorial Board";
  const authorAvatar = update?.authorAvatar || "https://api.dicebear.com/7.x/bottts/svg?seed=NCBTEditorial";
  const image = update?.image || seoArticle?.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200";
  const pdfUrl = update?.pdfUrl || seoArticle?.pdfUrl;
  const officialLink = update?.officialLink || seoArticle?.officialLink;

  // Schema.org Article Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: subtitle,
    image: [image],
    datePublished: "2026-06-26T08:00:00+05:30",
    dateModified: "2026-06-26T08:00:00+05:30",
    author: [
      {
        "@type": "Person",
        name: authorName,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "NCBT",
      logo: {
        "@type": "ImageObject",
        url: "https://ncbt.in/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ncbt.in/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ncbt.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Knowledge Hub",
        item: "https://ncbt.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://ncbt.in/blog/${slug}`,
      },
    ],
  };

  // Helper to format simple markdown-like syntax for updates
  const renderContent = () => {
    if (seoArticle?.contentHtml) {
      return (
        <div 
          className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6"
          dangerouslySetInnerHTML={{ __html: seoArticle.contentHtml }} 
        />
      );
    }

    if (update?.content) {
      const paragraphs = update.content.split("\n\n");
      return (
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6">
          {paragraphs.map((p, idx) => {
            const trimmed = p.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-black text-white mt-8 mb-3 border-b border-slate-800 pb-2">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("|")) {
              return (
                <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap">{trimmed}</pre>
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  };

  // Check if related translations exist
  const translations = BLOG_TRANSLATIONS[slug];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation Header */}
      <nav className="border-b border-slate-800/80 bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-xs font-black px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Practice CBT Mock</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {badge}
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400 font-semibold">{readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}

        {/* Author and Date Meta Bar */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
              <Image 
                src={authorAvatar} 
                alt={authorName} 
                fill 
                sizes="40px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{authorName}</div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {officialLink && (
              <a
                href={officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Official Notice</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>PDF Document</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <Image 
              src={image} 
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0e172a]/60 rounded-2xl border border-slate-800/80 p-6 sm:p-10 shadow-lg">
          {renderContent()}

          {/* Bilingual Translation Highlight if Available */}
          {translations && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                <Globe className="w-4 h-4" />
                <span>हिंदी अनुवाद (Hindi Summary & Notes)</span>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-100">{translations.hi.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{translations.hi.summary}</p>
              </div>
            </div>
          )}
        </div>

        {/* High Conversion Test CTA for Real CBT Practice */}
        <section className="mt-12 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-[#0e172a] border border-emerald-500/30 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Evaluate Your Knowledge Under Real CBT Conditions
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Experience the real AIIMS NORCET & ESIC online testing portal with strict countdown timers, question palettes, and instant All-India percentiles.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 shadow-xl shadow-emerald-500/20"
            >
              <span>Start Free CBT Mock Test Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
