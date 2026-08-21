import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Flame, 
  Sparkles, 
  Calendar, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Daily Medical & Healthcare Current Affairs 2025–2026 | NCBT",
  description: "High-yield healthcare schemes, WHO guidelines, ICMR updates, and health summit GK questions for AIIMS NORCET, ESIC, and State medical exams.",
  keywords: [
    "Medical current affairs 2025",
    "Health GK for AIIMS NORCET",
    "Ayushman Bharat updates",
    "WHO guidelines MCQ",
  ],
  alternates: {
    canonical: "https://ncbt.in/current-affairs",
  },
  openGraph: {
    title: "Daily Medical & Healthcare Current Affairs | NCBT",
    description: "High-yield healthcare general knowledge and medical current affairs for competitive exams.",
    url: "https://ncbt.in/current-affairs",
    type: "website",
  },
};

export default function CurrentAffairsPage() {
  const CURRENT_AFFAIRS_ITEMS = [
    {
      id: "ca-1",
      title: "Ayushman Bharat PM-JAY Coverage Expanded: Universal Health Coverage for Seniors 70+",
      category: "National Health Schemes",
      date: "June 2026",
      summary: "Union Cabinet approves free health insurance coverage up to ₹5 Lakh annually for all senior citizens aged 70 years and above regardless of income category.",
      tags: ["PM-JAY", "Ayushman Bharat", "Geriatric Care", "NORCET GK"]
    },
    {
      id: "ca-2",
      title: "WHO Releases Updated Antimicrobial Resistance (AMR) AWaRe Classification Guidelines",
      category: "Global Health Directives",
      date: "June 2026",
      summary: "Revised guidance highlights Access, Watch, and Reserve antibiotic groups to prevent critical hospital-acquired multi-drug resistant superbug infections.",
      tags: ["WHO", "AMR", "Pharmacology", "Infection Control"]
    },
    {
      id: "ca-3",
      title: "ICMR National Essential Diagnostics List (NEDL) 2026 Revision Published",
      category: "Clinical Policy",
      date: "May 2026",
      summary: "Indian Council of Medical Research introduces rapid molecular point-of-care tests for primary health centres (PHCs) and district hospitals.",
      tags: ["ICMR", "Diagnostics", "Public Health", "Lab Tech"]
    },
    {
      id: "ca-4",
      title: "National Health Mission (NHM) New Hypertension & Diabetes Screening Protocols",
      category: "Non-Communicable Diseases",
      date: "May 2026",
      summary: "Standardized community-level blood pressure tracking targets 75 million individuals with early pharmacological intervention at Ayushman Arogya Mandirs.",
      tags: ["NCD", "Hypertension", "CHO Exam", "Community Health"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            High-Yield Health GK & Current Affairs
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Medical & Healthcare Current Affairs 2025–2026
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Curated daily for AIIMS NORCET (General Awareness 20-marks section), ESIC Nursing Officer, RRB Paramedical, and State CHO recruitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CURRENT_AFFAIRS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/30 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" /> {item.date}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Test Your General Knowledge in Real CBT Mode</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Attempt mixed subject mock tests including medical current affairs, aptitude, and clinical questions.
          </p>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-sky-500/20"
          >
            Attempt Full Mock Tests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
