import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { TARGET_EXAMS } from "@/src/data";
import { 
  Building2, 
  GraduationCap, 
  ChevronRight, 
  Stethoscope, 
  Pill, 
  FlaskConical, 
  Activity, 
  Search, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Target Exam Test Series & Syllabus Directory | NCBT",
  description: "Browse official CBT Mock Tests, Previous Year Solved Papers, and Syllabus Blueprints for AIIMS NORCET, ESIC Nursing Officer, RRB Paramedical, Pharmacist, Lab Technician & State Health Exams.",
  keywords: [
    "AIIMS NORCET test series",
    "ESIC Nursing Officer mock test",
    "RRB Paramedical CBT",
    "Pharmacist government exam test series",
    "Lab Technician exam syllabus",
    "WBHRB staff nurse question papers",
  ],
  alternates: {
    canonical: "https://ncbt.in/exams",
  },
  openGraph: {
    title: "All Government Nursing, Pharmacist & Paramedical Exams | NCBT",
    description: "Prepare with official pattern CBT mocks and PYQs for top medical recruitments in India.",
    url: "https://ncbt.in/exams",
    type: "website",
  },
};

export default function ExamsCatalogPage() {
  const categories = Array.from(new Set(TARGET_EXAMS.map((e) => e.category)));

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-20">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">Exams Directory</span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/blog"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Exam Updates & Notes
            </Link>
            <Link 
              href="/"
              className="text-xs font-black px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Launch Mock Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Recruitment Standards</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Target Exams & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">CBT Mock Series</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Select your target recruitment board to access dedicated full-length mock tests, topic-wise question banks, negative marking simulations, and official solved previous papers.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat, idx) => (
              <a
                key={idx}
                href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 text-xs font-semibold transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Exam Grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 space-y-16">
        {categories.map((cat, catIdx) => {
          const examsInCat = TARGET_EXAMS.filter((e) => e.category === cat);
          return (
            <section 
              key={catIdx} 
              id={cat.toLowerCase().replace(/\s+/g, "-")}
              className="scroll-mt-20"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{cat} Recruitment Exams</h2>
                </div>
                <span className="text-xs font-bold text-slate-400">{examsInCat.length} Specialized Series</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examsInCat.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-[#0e172a]/80 rounded-2xl border border-slate-800/90 p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                          {exam.icon || "🏥"}
                        </div>
                        <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {exam.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                        {exam.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-1 mb-3">
                        {exam.fullName}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {exam.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <Link
                        href={`/exams/${exam.id}`}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Syllabus & Blueprints</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/?exam=${exam.id}`}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 transition-all"
                      >
                        Start Tests
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
