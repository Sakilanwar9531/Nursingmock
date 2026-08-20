import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  FileText, 
  Sparkles, 
  Bookmark, 
  ChevronRight,
  GraduationCap,
  Stethoscope,
  TrendingUp,
  Share2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Exam Updates, Syllabus Blueprints & Clinical Nursing Articles | NCBT",
  description: "Browse verified exam notifications, syllabus breakdowns, clinical nursing study notes, and previous year solved questions for AIIMS NORCET, ESIC, RRB, and State Paramedical exams.",
  keywords: [
    "AIIMS NORCET updates",
    "ESIC Nursing Officer syllabus",
    "RRB Paramedical exam pattern",
    "Clinical nursing notes",
    "Pharmacist government exam preparation",
    "NCBT official blog",
  ],
  alternates: {
    canonical: "https://ncbt.in/blog",
  },
  openGraph: {
    title: "Official Exam Updates, Syllabus Blueprints & Study Notes | NCBT Blog",
    description: "Verified exam alerts, in-depth subject notes, and preparation guides for Nursing, Pharmacist & Paramedical government exams.",
    url: "https://ncbt.in/blog",
    type: "website",
  },
};

export default function BlogFeed() {
  const posts = STATIC_NURSING_UPDATES;
  const categories = [
    { label: "All Updates", count: posts.length },
    { label: "Jobs & Notifications", count: posts.filter(p => p.category === "jobs").length },
    { label: "Exam Guides & Syllabus", count: posts.filter(p => p.category === "syllabus").length },
    { label: "Clinical Study Notes", count: posts.filter(p => p.category === "notes").length },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-20">
      {/* Top Breadcrumb & Brand Bar */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">Knowledge Hub & Articles</span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Take Live CBT Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NCBT Editorial & Research Bureau</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Nursing, Pharmacist & Paramedical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Exam Intelligence</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Instant official recruitment notifications, high-yield clinical revision notes, CBT navigation strategies, and verified seat matrix releases.
          </p>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-8">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2 hover:border-slate-700 transition-colors"
              >
                <span>{cat.label}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-[#0e172a]/90 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col overflow-hidden group hover:shadow-xl hover:shadow-emerald-950/20"
            >
              {post.image && (
                <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e172a] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
                    {post.badge || post.category}
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {post.readTime || "4 min read"}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.authorAvatar && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-800">
                        <Image 
                          src={post.authorAvatar} 
                          alt={post.authorName || "Author"} 
                          fill 
                          sizes="24px"
                          className="object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-slate-300">
                      {post.authorName || "NCBT Editorial"}
                    </span>
                  </div>

                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-transform group-hover:translate-x-1"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* High-Impact Exam Preparation Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-[#0e172a] border border-emerald-500/30 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Testbook & Adda Pattern Online CBT</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Test Your Real Preparation Level?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Simulate actual AIIMS, ESIC, and RRB timer interfaces with negative marking penalties, detailed clinical rationales, and All-India percentile rankings.
            </p>
          </div>
          <Link
            href="/"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Launch Free Test Series</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
