import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SUBJECTS } from "@/src/data";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Stethoscope, 
  Brain, 
  HelpCircle,
  FileQuestion,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Subject-Wise Clinical Nursing, Pharmacology & Paramedical Question Banks | NCBT",
  description: "Browse subject-wise practice modules: Anatomy & Physiology, Pharmacology, Medical-Surgical Nursing, Community Health, Midwifery & OBG, Pediatric Nursing, and Microbiology.",
  keywords: [
    "Anatomy and physiology MCQs for nursing",
    "Pharmacology mock questions",
    "Medical surgical nursing CBT test",
    "Community health nursing MCQs",
    "OBG nursing questions",
  ],
  alternates: {
    canonical: "https://ncbt.in/subjects",
  },
  openGraph: {
    title: "Subject-Wise Test Banks | NCBT",
    description: "Master each core subject with targeted unit-wise MCQs and detailed clinical rationales.",
    url: "https://ncbt.in/subjects",
    type: "website",
  },
};

export default function SubjectsDirectoryPage() {
  const totalQuestions = SUBJECTS.reduce((acc, sub) => {
    return acc + sub.tests.reduce((tAcc, t) => tAcc + (t.data ? t.data.length : t.questions || 0), 0);
  }, 0);

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
            <span className="text-slate-200 font-semibold">Subject Question Banks</span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/exams"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Exam Blueprints
            </Link>
            <Link 
              href="/"
              className="text-xs font-black px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Take Live Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Yield Clinical Subject Banks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Subject-Wise <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Practice Modules</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Target individual subjects to build foundational concept clarity. Over {totalQuestions}+ verified multiple-choice questions with verified citations from official AIIMS, ESIC, and State PSC papers.
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => {
            const subjectQuestions = subject.tests.reduce((acc, t) => acc + (t.data ? t.data.length : t.questions || 0), 0);
            return (
              <div
                key={subject.id}
                className="bg-[#0e172a]/90 rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                      {subject.icon || "📚"}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700">
                      {subject.tests.length} Unit Tests
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    Practice unit-wise modules covering high-frequency concepts, diagnostic criteria, drug dosages, and nursing interventions.
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mt-4 pt-3 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <FileQuestion className="w-3.5 h-3.5 text-emerald-400" />
                      {subjectQuestions} MCQs
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Timed Units
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/subjects/${subject.id}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Units</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/?tab=subject&subjectId=${subject.id}`}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all border border-emerald-500/20"
                  >
                    Practice Unit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
