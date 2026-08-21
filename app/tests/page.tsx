import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SUBJECTS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  FileText, 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Search
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
  const allTests = SUBJECTS.flatMap(s => s.tests.map(t => ({ ...t, subjectName: s.name, subjectId: s.id })));

  const testsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NCBT Online CBT Mock Tests & Solved PYQ Directory",
    itemListElement: allTests.slice(0, 30).map((t, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: t.title,
      url: `https://ncbt.in/tests/${t.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testsSchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            50,000+ Aspirants Practicing Daily
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Full-Length CBT Mocks & Solved PYQ Papers
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Practice in genuine Computer Based Test mode with countdown timer, question status palette, negative marks, and step-by-step clinical explanations.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allTests.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{test.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {test.subjectName}
                  </span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {test.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {test.desc}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-500" /> {test.questions} Questions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {test.mins} Mins
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <Link
                  href={`/tests/${test.id}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Start Practice CBT
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
