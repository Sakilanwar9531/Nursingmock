import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Share2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Award,
  ArrowRight,
  ExternalLink,
  Download
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const updateSlugs = STATIC_NURSING_UPDATES.map((update) => ({
    slug: update.id,
  }));
  
  const seoArticleSlugs = Object.keys(SEO_ARTICLES).map((slug) => ({
    slug,
  }));

  return [...updateSlugs, ...seoArticleSlugs];
}

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

// Markdown parser helper for static server rendering
function renderMarkdownContent(content: string) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Markdown Table Detection
    if (line.startsWith("|") && i + 1 < lines.length && lines[i + 1].includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) => 
          rowStr.split("|").map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).map(parseRow);

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-200 font-bold">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 border-r border-slate-700/60 last:border-r-0 uppercase tracking-wider text-[11px] text-sky-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map((r, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                    {r.map((c, cIdx) => (
                      <td key={cIdx} className="p-3 border-r border-slate-800/60 last:border-r-0 text-slate-300 font-medium">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Heading 3
    if (line.startsWith("### ")) {
      const titleText = line.replace("### ", "").trim();
      const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push(
        <h3 key={`h3-${i}`} id={id} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2">
          {titleText}
        </h3>
      );
      i++;
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      const titleText = line.replace("## ", "").trim();
      const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      elements.push(
        <h2 key={`h2-${i}`} id={id} className="text-2xl md:text-3xl font-extrabold text-white mt-10 mb-4 border-b border-slate-800 pb-2">
          {titleText}
        </h2>
      );
      i++;
      continue;
    }

    // Bullet List Item
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const text = line.substring(2).trim();
      elements.push(
        <li key={`li-${i}`} className="text-slate-300 text-sm md:text-base leading-relaxed mb-2 ml-4 list-disc marker:text-sky-400">
          {text}
        </li>
      );
      i++;
      continue;
    }

    // Numbered List Item
    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "").trim();
      elements.push(
        <li key={`oli-${i}`} className="text-slate-300 text-sm md:text-base leading-relaxed mb-2 ml-4 list-decimal marker:text-sky-400">
          {text}
        </li>
      );
      i++;
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-slate-300 text-sm md:text-base leading-relaxed my-4">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const update = STATIC_NURSING_UPDATES.find((u) => u.id === slug);
  const seoArticle = SEO_ARTICLES[slug];

  if (!update && !seoArticle) {
    notFound();
  }

  const title = update?.title || seoArticle?.title || "NCBT Article";
  const subtitle = update?.summary || seoArticle?.subtitle || "";
  const date = update?.date || "2026";
  const authorName = update?.authorName || "NCBT Editorial Board";
  const authorAvatar = update?.authorAvatar || "https://api.dicebear.com/7.x/bottts/svg?seed=SakilAnwar";
  const readTime = update?.readTime || "5 min read";
  const badge = update?.badge || seoArticle?.badge || "OFFICIAL GUIDE";
  const image = update?.image || seoArticle?.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200";
  const pdfUrl = update?.pdfUrl || seoArticle?.pdfUrl;
  const officialLink = update?.officialLink || seoArticle?.officialLink;

  // Structured Data (JSON-LD) for Search Engines & AI Bots
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: subtitle,
    image: [image],
    datePublished: "2026-06-20T08:00:00+05:30",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://ncbt.in/about",
    },
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
        name: "Blog & Syllabus",
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

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-grow">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog & Exam Updates</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {badge}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {date}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              {subtitle}
            </p>
          )}

          {/* Author Card & CTA Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"
              />
              <div>
                <p className="text-xs font-bold text-white">{authorName}</p>
                <p className="text-[11px] text-slate-400">Clinical Exam Specialist, NCBT</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/tests"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Practice CBT Test
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-800 shadow-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Official Document Downloads (If Available) */}
        {(pdfUrl || officialLink) && (
          <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Official Notification & Blueprint Document</p>
                <p className="text-[11px] text-slate-400">Released by official examination conducting board</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              )}
              {officialLink && (
                <a
                  href={officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Official Portal
                </a>
              )}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-a:text-sky-400 prose-strong:text-white space-y-4">
          {update?.content ? (
            renderMarkdownContent(update.content)
          ) : seoArticle?.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: seoArticle.contentHtml }} />
          ) : null}
        </article>

        {/* High-Yield CBT Callout Banner */}
        <section className="my-12 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border border-sky-500/30 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            Computer Based Test Simulation
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">
            Ready to test your preparation on this exact syllabus?
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Attempt real-time CBT mock tests with official 120-minute timers, negative marking (1/3rd penalty), question palettes, and instant peer-reviewed clinical rationales.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition-colors shadow-lg shadow-sky-500/20"
            >
              Start Free Full-Length CBT Mock <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
            >
              Explore All Target Exams
            </Link>
          </div>
        </section>

        {/* Related Articles & Syllabus Guides */}
        <section className="mt-12 pt-8 border-t border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Related Exam Blueprints & Study Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STATIC_NURSING_UPDATES.filter(u => u.id !== slug).slice(0, 4).map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.id}`}
                className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                    {rel.badge || "GUIDE"}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{rel.date}</span>
                  <span className="text-sky-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <ServerFooter />
    </div>
  );
}
