import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Target, 
  Users,
  Building2,
  TrendingUp,
  Brain
} from "lucide-react";

export const metadata: Metadata = {
  title: "About NCBT | India's Leading Nursing & Paramedical CBT Platform",
  description: "Learn about NCBT's mission, exam methodology, peer-reviewed clinical rationale standards, and how our CBT simulation empowers 100,000+ medical aspirants.",
  keywords: [
    "About NCBT",
    "NCBT mission",
    "nursing exam preparation portal India",
    "clinical CBT test system",
  ],
  alternates: {
    canonical: "https://ncbt.in/about",
  },
  openGraph: {
    title: "About NCBT - Educational Mission & Standards",
    description: "Setting the gold standard for Nursing, Pharmacist & Paramedical government test series.",
    url: "https://ncbt.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">About NCBT</span>
          </div>

          <Link 
            href="/"
            className="text-xs font-black px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Launch Test Series</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Educational Standard & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Govt Exam Preparation</span> for Healthcare Professionals
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            NCBT (National CBT) is India's dedicated computer-based testing portal created specifically for Nursing Officers, Pharmacists, and Paramedical candidates.
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Exact CBT Exam Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every mock test faithfully reproduces the actual server-timed interface, question palette colors, negative scoring, and sectional restrictions used by AIIMS, ESIC, and RRB.
            </p>
          </div>

          <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Clinical Rationale Clarity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No bare answer keys. Each question is accompanied by high-yield explanations citing standard textbooks (Brunner & Suddarth, KD Tripathi, Ross & Wilson).
            </p>
          </div>

          <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI Diagnostic Feedback</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyze time spent per question, accuracy across clinical sub-domains, and calculate your predicted All-India rank against past cut-off trends.
            </p>
          </div>
        </div>

        {/* Quality Standard */}
        <section className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              The NCBT Editorial & Research Bureau
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our question banks are curated and vetted by senior nursing tutors, hospital clinical instructors, and registered pharmacists. We continuously update questions to reflect recent changes in national health guidelines, pharmacology alerts, and NExT / NORCET clinical vignette formats.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-slate-300">50,000+ verified multiple choice questions with authentic source tags.</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-slate-300">Zero tolerance for outdated syllabus or unverified answer keys.</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 shadow-xl shadow-emerald-500/20"
          >
            <span>Start Practicing with NCBT Free Mock Tests</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
