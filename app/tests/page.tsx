import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SUBJECTS, PYQ_DATA, TARGET_EXAMS } from "@/src/data";
import { 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileText, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Timer, 
  Award,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online CBT Mock Tests & Solved PYQs Series | NCBT",
  description: "Attempt full-length CBT mock tests, previous year papers (AIIMS NORCET, ESIC, RRB, WBHRB), subject unit tests, and 10-MCQ speed sprints with real exam timers.",
  keywords: [
    "online CBT mock test",
    "nursing test series",
    "pharmacist exam practice",
    "paramedical solved question papers",
    "AIIMS NORCET mock test series",
    "NCBT test portal",
  ],
  alternates: {
    canonical: "https://ncbt.in/tests",
  },
  openGraph: {
    title: "CBT Test Series Portal | NCBT",
    description: "Real-time exam simulation with negative marking penalties and All-India ranking.",
    url: "https://ncbt.in/tests",
    type: "website",
  },
};

export default function TestsCatalogPage() {
  const allSubjectTests = SUBJECTS.flatMap((s) => 
    s.tests.map((t) => ({
      ...t,
      subjectName: s.name,
      subjectIcon: s.icon,
      subjectId: s.id,
    }))
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Navigation */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">Test Series Directory</span>
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
              <span>Direct CBT Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Testbook & Adda Pattern Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">CBT Test Series</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Practice over 50,000+ exam-level questions with strict negative marking (0.25 / 0.33), real-time countdown timers, question palettes, and instant AI rationale breakdowns.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 space-y-12">
        {/* PYQ Previous Year Papers Section */}
        <section>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Official Solved Previous Year Papers (PYQs)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Authentic memory-based and official answer key verified question papers.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400">{PYQ_DATA.length} Papers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PYQ_DATA.map((pyq, idx) => (
              <div 
                key={idx}
                className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black tracking-wide uppercase px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono">
                      {pyq.year} Exam
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {pyq.count} Solved MCQs
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {pyq.exam}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5">
                    Includes official answer key explanations and detailed rationale pointers.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/?tab=pyq&examTag=${pyq.tag}`}
                    className="text-xs font-black px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-transform hover:scale-105 flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>Attempt CBT Paper</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Unit Tests Grid */}
        <section>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Subject-Wise Unit Tests & Practice Drills
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Target specific clinical domains and strengthen weak chapters.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400">{allSubjectTests.length} Units</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allSubjectTests.slice(0, 18).map((test, idx) => {
              const qCount = test.data ? test.data.length : test.questions || 30;
              return (
                <div 
                  key={test.id || idx}
                  className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {test.icon || test.subjectIcon || "🔬"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {test.subjectName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {test.desc}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-3 font-mono">
                      <span>{qCount} MCQs</span>
                      <span>•</span>
                      <span>{test.mins || 30} Mins</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/tests/${test.id}`}
                      className="text-xs font-bold text-slate-300 hover:text-white"
                    >
                      Instructions
                    </Link>

                    <Link
                      href={`/?tab=subject&subjectId=${test.subjectId}&testId=${test.id}`}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/20 transition-all"
                    >
                      Start Test
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
