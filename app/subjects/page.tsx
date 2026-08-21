import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SUBJECTS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Layers, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  BookOpen,
  ArrowRight
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
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Medical Subject Question Banks & Practice Modules",
    itemListElement: SUBJECTS.map((subject, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: subject.name,
      url: `https://ncbt.in/subjects/${subject.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            Core Subject Mastery
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Subject-Wise Clinical Question Banks
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Strengthen your core clinical foundation with topic-wise CBT modules, authentic past exam questions, and step-by-step rationales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SUBJECTS.map((subject) => {
            const totalQuestions = subject.tests.reduce((acc, t) => acc + t.questions, 0);

            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{subject.icon}</span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {subject.tests.length} Practice Sets
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {subject.name}
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Over {totalQuestions}+ verified MCQs with negative marking simulations and clinical rationales.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400">
                  <span>Explore Question Sets</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
