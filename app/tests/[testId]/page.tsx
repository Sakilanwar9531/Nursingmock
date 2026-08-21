import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUBJECTS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  FileText, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

interface Props {
  params: {
    testId: string;
  };
}

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
    title: `${test.title} (${subject.name}) | Online CBT Practice Test - NCBT`,
    description: `${test.desc || "Official CBT test practice"} - ${test.questions} questions, ${test.mins} minutes, realistic negative marking exam portal.`,
    keywords: [
      `${test.title} online test`,
      `${subject.name} mock test`,
      "nursing CBT practice",
      "NCBT test series",
    ],
    alternates: {
      canonical: `https://ncbt.in/tests/${params.testId}`,
    },
    openGraph: {
      title: `${test.title} — Online CBT Mock Test | NCBT`,
      description: `Practice ${test.title} with official timer, instant score calculation, and detailed rationale solutions.`,
      url: `https://ncbt.in/tests/${params.testId}`,
      type: "website",
    },
  };
}

export default function TestDetailPage({ params }: Props) {
  const result = findTest(params.testId);

  if (!result) {
    notFound();
  }

  const { test, subject } = result;

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: test.title,
    description: test.desc,
    educationalLevel: "Professional Medical Certification",
    hasPart: [
      {
        "@type": "Question",
        name: test.title,
        text: `Attempt ${test.questions} clinical MCQs in ${test.mins} minutes.`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/tests" className="hover:text-white transition-colors">All Tests</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href={`/subjects/${subject.id}`} className="hover:text-white transition-colors">{subject.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 font-medium">{test.title}</span>
        </nav>

        {/* Test Card Header */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{test.icon}</span>
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {subject.name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                {test.title}
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {test.desc}
          </p>

          {/* Test Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Questions</span>
              <p className="text-base font-extrabold text-white">{test.questions} MCQs</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Time Limit</span>
              <p className="text-base font-extrabold text-white">{test.mins} Mins</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Correct Mark</span>
              <p className="text-base font-extrabold text-emerald-400">+1.0 Mark</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Negative Mark</span>
              <p className="text-base font-extrabold text-rose-400">-0.33 Mark</p>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Examination Instructions:
            </h3>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>The countdown timer starts as soon as you launch the test.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Click &apos;Save &amp; Next&apos; to submit your response for each question palette index.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant scorecards with clinical rationales are generated immediately on submission.</span>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-slate-800">
            <Link
              href="/"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" /> Start Online CBT Simulation Now
            </Link>
          </div>
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
