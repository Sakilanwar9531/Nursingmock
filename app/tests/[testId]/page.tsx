import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SUBJECTS } from "@/src/data";
import { 
  AlertCircle, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Clock, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Timer
} from "lucide-react";

interface Props {
  params: {
    testId: string;
  };
}

// Find test across all subjects
function findTest(testId: string) {
  for (const sub of SUBJECTS) {
    const found = sub.tests.find((t) => t.id === testId);
    if (found) {
      return { test: found, subject: sub };
    }
  }
  return null;
}

export async function generateStaticParams() {
  const params: { testId: string }[] = [];
  SUBJECTS.forEach((sub) => {
    sub.tests.forEach((t) => {
      if (t.id) {
        params.push({ testId: t.id });
      }
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = findTest(params.testId);

  if (!result) {
    return {
      title: "Test Not Found | NCBT",
    };
  }

  const { test, subject } = result;

  return {
    title: `${test.title} - ${subject.name} CBT Mock Test | NCBT`,
    description: `Attempt ${test.title} (${test.questions || 30} MCQs, ${test.mins || 30} mins) with real-time timer countdown, negative marking analysis, and detailed rationales.`,
    keywords: [
      `${test.title} mock test`,
      `${subject.name} CBT exam`,
      `online nursing test ${test.title}`,
      `free CBT exam NCBT`,
    ],
    alternates: {
      canonical: `https://ncbt.in/tests/${params.testId}`,
    },
    openGraph: {
      title: `${test.title} Mock Test | NCBT`,
      description: test.desc,
      url: `https://ncbt.in/tests/${params.testId}`,
      type: "website",
    },
  };
}

export default function TestInstructionPage({ params }: Props) {
  const result = findTest(params.testId);

  if (!result) {
    notFound();
  }

  const { test, subject } = result;
  const qCount = test.data ? test.data.length : test.questions || 30;
  const duration = test.mins || 30;

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
        name: subject.name,
        item: `https://ncbt.in/subjects/${subject.id}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: test.title,
        item: `https://ncbt.in/tests/${test.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#0c1322]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link 
            href={`/subjects/${subject.id}`}
            className="text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {subject.name}</span>
          </Link>

          <Link 
            href={`/?tab=subject&subjectId=${subject.id}&testId=${test.id}`}
            className="text-xs font-black px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Launch Test Interface</span>
          </Link>
        </div>
      </nav>

      {/* Main Instruction Card */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {subject.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-800 text-slate-400 font-mono">
                Code: {test.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {test.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              {test.desc}
            </p>
          </div>

          {/* Test Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Questions</span>
              </div>
              <div className="text-lg font-black text-white mt-1 font-mono">
                {qCount} MCQs
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Duration</span>
              </div>
              <div className="text-lg font-black text-white mt-1 font-mono">
                {duration} Mins
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Total Marks</span>
              </div>
              <div className="text-lg font-black text-white mt-1 font-mono">
                {qCount * 1} Marks
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Negative Mark</span>
              </div>
              <div className="text-lg font-black text-rose-400 mt-1 font-mono">
                -0.25 / -0.33
              </div>
            </div>
          </div>

          {/* General Instructions */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standard Candidate Instructions</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>The clock will be set at the server. The countdown timer at the top displays the time remaining to complete the test.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Green indicators represent answered questions. Purple/Amber indicates marked for review. Gray represents unvisited questions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Upon final submission, you will receive an instant AI Diagnostic Report with chapter-wise accuracy and clinical rationales.</span>
              </li>
            </ul>
          </div>

          {/* Start Button Banner */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-semibold text-center sm:text-left">
              Ensure you have a stable network connection before starting.
            </span>

            <Link
              href={`/?tab=subject&subjectId=${subject.id}&testId=${test.id}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all text-center shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <Timer className="w-4 h-4" />
              <span>I am Ready to Begin</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
