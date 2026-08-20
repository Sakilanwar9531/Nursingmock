import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SUBJECTS } from "@/src/data";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Stethoscope, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

interface Props {
  params: {
    subjectId: string;
  };
}

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    subjectId: subject.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);

  if (!subject) {
    return {
      title: "Subject Not Found | NCBT",
    };
  }

  return {
    title: `${subject.name} Mock Tests & Practice Question Bank | NCBT`,
    description: `Practice ${subject.name} MCQs with clinical rationales, official past year questions, and timed CBT practice sets for Nursing Officer, Pharmacist, and Paramedical exams.`,
    keywords: [
      `${subject.name} nursing questions`,
      `${subject.name} MCQs with answers`,
      `${subject.name} AIIMS NORCET test`,
      `${subject.name} solved questions`,
    ],
    alternates: {
      canonical: `https://ncbt.in/subjects/${params.subjectId}`,
    },
    openGraph: {
      title: `${subject.name} Unit Tests & Practice Questions | NCBT`,
      description: `Comprehensive question bank with detailed explanations for ${subject.name}.`,
      url: `https://ncbt.in/subjects/${params.subjectId}`,
      type: "website",
    },
  };
}

export default function SubjectDetailPage({ params }: Props) {
  const { subjectId } = params;
  const subject = SUBJECTS.find((s) => s.id === subjectId);

  if (!subject) {
    notFound();
  }

  const totalQuestions = subject.tests.reduce((acc, t) => acc + (t.data ? t.data.length : t.questions || 0), 0);

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
        name: "Subjects",
        item: "https://ncbt.in/subjects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: subject.name,
        item: `https://ncbt.in/subjects/${subject.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumb */}
      <nav className="border-b border-slate-800/80 bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link 
            href="/subjects" 
            className="text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Subjects</span>
          </Link>

          <Link 
            href={`/?tab=subject&subjectId=${subject.id}`}
            className="text-xs font-black px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Practice All Units</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
            {subject.icon || "📚"}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Core Subject Domain
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-slate-300">
                {subject.tests.length} Units Available
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {subject.name}
            </h1>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2 max-w-2xl">
          Master high-yield questions for {subject.name} with detailed clinical rationales, exam citations, and official scoring rubrics.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Questions</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white mt-1">
              {totalQuestions} MCQs
            </div>
          </div>

          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unit Test Time</span>
            </div>
            <div className="text-base sm:text-lg font-black text-white mt-1">
              10 - 30 Minutes
            </div>
          </div>

          <div className="bg-[#0e172a] border border-slate-800 rounded-xl p-4 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verification</span>
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              Official PYQ Sourced
            </div>
          </div>
        </div>
      </header>

      {/* Unit Tests List */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>Available Unit Tests & Sub-Modules</span>
        </h2>

        <div className="space-y-4">
          {subject.tests.map((test, idx) => {
            const qCount = test.data ? test.data.length : test.questions || 30;
            return (
              <div
                key={test.id || idx}
                className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <span className="text-2xl p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                    {test.icon || "🔬"}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                      {test.desc}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                      <span>{qCount} Questions</span>
                      <span>•</span>
                      <span>{test.mins || 30} Mins</span>
                      <span>•</span>
                      <span className="text-emerald-400">Ready to attempt</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 pt-2 sm:pt-0">
                  <Link
                    href={`/tests/${test.id}`}
                    className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    View Details
                  </Link>

                  <Link
                    href={`/?tab=subject&subjectId=${subject.id}&testId=${test.id}`}
                    className="text-xs font-black px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Start Test</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
