import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TARGET_EXAMS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Award, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Search
} from "lucide-react";

export const metadata: Metadata = {
  title: "Target Exam Test Series & Syllabus Directory | NCBT",
  description: "Browse official CBT Mock Tests, Previous Year Solved Papers, and Syllabus Blueprints for AIIMS NORCET, ESIC Nursing Officer, RRB Paramedical, Pharmacist, Lab Technician & State Health Exams.",
  keywords: [
    "AIIMS NORCET test series",
    "ESIC Nursing Officer mock test",
    "RRB Paramedical CBT",
    "Pharmacist government exam test series",
    "Lab Technician exam syllabus",
    "WBHRB staff nurse question papers",
  ],
  alternates: {
    canonical: "https://ncbt.in/exams",
  },
  openGraph: {
    title: "All Government Nursing, Pharmacist & Paramedical Exams | NCBT",
    description: "Prepare with official pattern CBT mocks and PYQs for top medical recruitments in India.",
    url: "https://ncbt.in/exams",
    type: "website",
  },
};

export default function ExamsCatalogPage() {
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Government Medical & Paramedical Exam Test Series Directory",
    itemListElement: TARGET_EXAMS.map((exam, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: exam.fullName,
      url: `https://ncbt.in/exams/${exam.id}`,
    })),
  };

  const categories = Array.from(new Set(TARGET_EXAMS.map(e => e.category)));

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Central & State Exam Blueprints
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Target Examination Test Series Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Select your target competitive examination to view official CBT test patterns, negative marking penalties, subject syllabus distribution, and curated mock tests.
          </p>
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryExams = TARGET_EXAMS.filter(e => e.category === category);

          return (
            <section key={category} className="mb-14 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  {category} Recruitment Exams
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  {categoryExams.length} Series Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryExams.map((exam) => (
                  <Link
                    key={exam.id}
                    href={`/exams/${exam.id}`}
                    className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{exam.icon}</span>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {exam.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        {exam.fullName}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {exam.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-400">
                      <span>View Exam Blueprint</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <ServerFooter />
    </div>
  );
}
