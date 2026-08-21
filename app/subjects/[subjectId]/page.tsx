import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SUBJECTS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Layers, 
  Clock, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  ShieldCheck
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
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  const totalQuestions = subject.tests.reduce((acc, t) => acc + t.questions, 0);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/subjects" className="hover:text-white transition-colors">Subject Banks</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 font-medium">{subject.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 md:p-10 mb-10 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">{subject.icon}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {subject.tests.length} CBT MODULES
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {totalQuestions}+ MCQS
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
              {subject.name} Question Bank
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master {subject.name} through focused unit tests, timed CBT simulations, and peer-reviewed clinical rationale explanations.
            </p>
          </div>
        </div>

        {/* Practice Sets Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
              <FileText className="w-5 h-5 text-indigo-400" />
              Available Practice Sets & Speed Sprints
            </h2>
            <span className="text-xs text-slate-400 font-semibold">
              {subject.tests.length} Test Sets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.tests.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{test.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {test.questions} Questions
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400">
                        {test.mins} Mins
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {test.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {test.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    href={`/tests/${test.id}`}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-indigo-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Start Test Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
