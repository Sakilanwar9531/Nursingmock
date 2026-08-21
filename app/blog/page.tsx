import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { STATIC_NURSING_UPDATES } from "@/src/updatesData";
import { SEO_ARTICLES } from "@/src/seoArticles";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Award,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Exam Updates, Syllabus Blueprints & Clinical Nursing Articles | NCBT",
  description: "Browse verified recruitment notifications, syllabus breakdowns, clinical nursing study notes, and previous year solved questions for AIIMS NORCET, ESIC, RRB, and State Paramedical exams.",
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

export default function BlogFeedPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "NCBT Nursing & Paramedical Exam Updates, Syllabus & Clinical Notes",
    description: "Comprehensive guides, official notices, and subject preparation notes for medical competitive exams.",
    url: "https://ncbt.in/blog",
    hasPart: STATIC_NURSING_UPDATES.map((update, idx) => ({
      "@type": "Article",
      position: idx + 1,
      name: update.title,
      description: update.summary,
      url: `https://ncbt.in/blog/${update.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Medical Exam Insights
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Official Exam Blueprints, Syllabus & Clinical Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Stay ahead in AIIMS NORCET, ESIC, RRB, and State Staff Nurse recruitments with official syllabus analyses, exam updates, and peer-reviewed high-yield study notes.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STATIC_NURSING_UPDATES.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all overflow-hidden shadow-lg hover:shadow-sky-500/10"
            >
              {/* Image Banner */}
              {post.image && (
                <div className="relative w-full h-48 overflow-hidden bg-slate-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#070b14]/80 text-sky-400 backdrop-blur-md border border-slate-700">
                      {post.badge || "GUIDE"}
                    </span>
                  </div>
                </div>
              )}

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700"
                    />
                    <span className="text-[11px] text-slate-300 font-medium">{post.authorName}</span>
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-transform"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Comprehensive Articles Section */}
        <section className="mb-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            Comprehensive Exam Preparation Handbooks
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Target Exam Preparation Blueprints & Selection Guidelines
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Detailed step-by-step guides covering selection processes, eligibility criteria, vacancy trends, and subject-wise MCQ weightage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {Object.entries(SEO_ARTICLES).map(([key, article]) => (
              <Link
                key={key}
                href={`/blog/${key}`}
                className="p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-sky-500/30 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    EXAM HANDBOOK
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-sky-400 font-semibold">
                  <span>Explore Blueprint</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
