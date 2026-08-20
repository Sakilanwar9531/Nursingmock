import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TARGET_EXAMS, SUBJECTS, PYQ_DATA } from "@/src/data";
import { 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Award, 
  Target, 
  Stethoscope, 
  TrendingUp, 
  AlertCircle, 
  HelpCircle,
  Sparkles,
  BookOpen
} from "lucide-react";

interface Props {
  params: {
    examId: string;
  };
}

export async function generateStaticParams() {
  return TARGET_EXAMS.map((exam) => ({
    examId: exam.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = TARGET_EXAMS.find((e) => e.id === params.examId);

  if (!exam) {
    return {
      title: "Exam Not Found | NCBT",
    };
  }

  return {
    title: `${exam.name} Exam Mock Test Series, Syllabus & PYQ Papers | NCBT`,
    description: `Prepare for ${exam.fullName} with real CBT pattern mock tests, negative marking (1/3 or 1/4), subject-wise question distribution, syllabus blueprints, and previous year solved papers.`,
    keywords: [
      `${exam.name} mock test`,
      `${exam.fullName} syllabus`,
      `${exam.name} previous year questions`,
      `${exam.name} CBT preparation online`,
      `${exam.name} cut off marks`,
    ],
    alternates: {
      canonical: `https://ncbt.in/exams/${params.examId}`,
    },
    openGraph: {
      title: `${exam.fullName} Online Test Series | NCBT`,
      description: exam.desc,
      url: `https://ncbt.in/exams/${params.examId}`,
      type: "website",
    },
  };
}

export default function ExamDetailPage({ params }: Props) {
  const { examId } = params;
  const exam = TARGET_EXAMS.find((e) => e.id === examId);

  if (!exam) {
    notFound();
  }

  // Schema.org Course / Exam Structured Data
  const examSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${exam.fullName} Preparation & CBT Test Series`,
    description: exam.desc,
    provider: {
      "@type": "Organization",
      name: "NCBT",
      sameAs: "https://ncbt.in",
    },
    educationalCredentialAwarded: "CBT Mock Performance Assessment & Rank Card",
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
        name: "Target Exams",
        item: "https://ncbt.in/exams",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: exam.name,
        item: `https://ncbt.in/exams/${exam.id}`,
      },
    ],
  };

  // Exam-specific syllabus pattern highlights
  const examPatterns: Record<string, { totalQuestions: number; duration: string; negMark: string; sections: string[] }> = {
    "aiims-norcet": {
      totalQuestions: 100,
      duration: "90 Minutes",
      negMark: "1/3rd Negative Mark (0.33 per wrong answer)",
      sections: ["80 MCQs Nursing Core (MSN, OBG, Pediatrics, CHN, Pharmacology)", "20 MCQs General Knowledge & Aptitude"],
    },
    "esic-officer": {
      totalQuestions: 125,
      duration: "120 Minutes",
      negMark: "0.25 Negative Mark",
      sections: ["100 MCQs Technical Nursing Subject Knowledge", "25 MCQs General Awareness, Reasoning & Basic Arithmetic"],
    },
    "rrb-officer": {
      totalQuestions: 100,
      duration: "90 Minutes",
      negMark: "1/3rd Negative Marking",
      sections: ["70 MCQs Professional Ability (Nursing)", "10 MCQs General Science", "10 MCQs General Awareness", "10 MCQs General Arithmetic & Reasoning"],
    },
    "rrb-pharmacist": {
      totalQuestions: 100,
      duration: "90 Minutes",
      negMark: "1/3rd Negative Mark",
      sections: ["70 MCQs Pharmacy Domain (Pharmaceutics, Pharmacology, Pharmacognosy)", "30 MCQs Aptitude, Science & Current Affairs"],
    },
  };

  const currentPattern = examPatterns[exam.id] || {
    totalQuestions: 100,
    duration: "90 to 120 Minutes",
    negMark: "Standard 0.25 or 0.33 Negative Marking",
    sections: ["Domain Specific Technical Core Questions (70-80%)", "General Awareness, Reasoning & Clinical Aptitude (20-30%)"],
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(examSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb */}
      <nav className="border-b border-slate-800/80 bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link 
            href="/exams" 
            className="text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Target Exams</span>
          </Link>

          <Link 
            href={`/?exam=${exam.id}`}
            className="text-xs font-black px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Attempt {exam.name} CBT</span>
          </Link>
        </div>
      </nav>

      {/* Exam Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            {exam.icon || "🏥"}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {exam.category} Series
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-slate-300">
                {exam.badge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {exam.fullName}
            </h1>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
          {exam.desc}
        </p>

        {/* Quick Highlights Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exam Duration</span>
            </div>
            <div className="text-sm sm:text-base font-black text-white mt-1">
              {currentPattern.duration}
            </div>
          </div>

          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Questions</span>
            </div>
            <div className="text-sm sm:text-base font-black text-white mt-1">
              {currentPattern.totalQuestions} MCQs
            </div>
          </div>

          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Negative Marking</span>
            </div>
            <div className="text-sm sm:text-base font-black text-white mt-1 truncate">
              {currentPattern.negMark}
            </div>
          </div>

          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Accuracy</span>
            </div>
            <div className="text-sm sm:text-base font-black text-emerald-400 mt-1">
              85%+ Safe Score
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Exam Pattern & Section Breakdown */}
        <section className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              Official CBT Exam Blueprint & Weightage
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            The question distribution follows strictly notified guidelines from the respective recruitment authorities:
          </p>

          <div className="space-y-3">
            {currentPattern.sections.map((sec, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">{sec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Strategy Box */}
        <section className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              High-Yield Preparation Strategy for {exam.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Master Previous Year Questions (PYQs)
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Over 35-40% of concepts repeat in rotated clinical formats. Review solved rationale questions directly from official AIIMS, ESIC, and RRB shifts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Control Negative Marking Penalty
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Avoid blind guessing. A 1/3 negative penalty eliminates high scores. Utilize elimination strategies during CBT mock tests.
              </p>
            </div>
          </div>
        </section>

        {/* Action Call to Launch Test Series */}
        <section className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-[#0e172a] border border-emerald-500/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-2xl font-black text-white">
              Start {exam.name} Full Mock Series
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Simulate actual CBT countdown timer, question palette, review flags, and instant percentile analytics.
            </p>
          </div>

          <Link
            href={`/?exam=${exam.id}`}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 shadow-xl shadow-emerald-500/20 flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Launch Mock Exam</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
