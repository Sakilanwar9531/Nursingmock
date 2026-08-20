import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Zap, 
  Newspaper, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Clock,
  Bookmark,
  ChevronRight,
  Stethoscope,
  TrendingUp,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Daily Healthcare & National Current Affairs for Govt Exams | NCBT",
  description: "Daily healthcare current affairs capsules, WHO resolutions, Union Health Ministry scheme updates, appointments, and general awareness quizzes for AIIMS NORCET, ESIC, and RRB exams.",
  keywords: [
    "healthcare current affairs",
    "nursing officer general knowledge",
    "AIIMS NORCET current affairs",
    "ESIC GK and current affairs",
    "health ministry schemes for exams",
  ],
  alternates: {
    canonical: "https://ncbt.in/current-affairs",
  },
  openGraph: {
    title: "Daily Healthcare & National Current Affairs | NCBT",
    description: "High-yield general awareness capsules and healthcare scheme updates for competitive medical exams.",
    url: "https://ncbt.in/current-affairs",
    type: "website",
  },
};

export default function CurrentAffairsPage() {
  const currentAffairsList = [
    {
      id: "nhm-health-budget-2026",
      tag: "National Health Policy",
      date: "Latest Release 2026",
      readTime: "3 min read",
      title: "Union Health Budget & National Health Mission (NHM) Expanded Outlay Analysis",
      summary: "Key statistics on Ayushman Bharat digital mission expansion, new AIIMS nursing college sanctions, and national disease elimination timelines critical for upcoming CBT exams.",
      highlights: [
        "Special allocation for primary healthcare center (PHC) modernization and tele-consultation.",
        "Revised incentive structures for Community Health Officers (CHOs) and Staff Nurses.",
        "National Tuberculosis Elimination Programme (NTEP) targets and diagnostic upgrades."
      ]
    },
    {
      id: "who-immunization-guidelines",
      tag: "Global Health & WHO",
      date: "WHO Updates",
      readTime: "4 min read",
      title: "WHO World Health Assembly Key Resolutions & Revised Immunization Protocols",
      summary: "High-yield immunization schedule updates, global anti-microbial resistance (AMR) guidelines, and international nursing council declarations.",
      highlights: [
        "Updated global vaccine schedules and cold chain monitoring mandates.",
        "High-priority pathogen list for AMR surveillance in tertiary care hospitals.",
        "Global healthcare workforce retention standards and nurse-to-patient ratio recommendations."
      ]
    },
    {
      id: "national-health-appointments-schemes",
      tag: "Appointments & Schemes",
      date: "National Digest",
      readTime: "3 min read",
      title: "Key Healthcare Appointments, DGHS Directives & Ayushman Bharat Upgrades",
      summary: "Important administrative appointments in national health councils, ICMR research grants, and healthcare recognitions frequently tested in competitive exam GA sections.",
      highlights: [
        "New leadership appointments across National Medical Commission (NMC) and Pharmacy Council.",
        "Pradhan Mantri Jan Arogya Yojana (PM-JAY) senior citizen health coverage rollout.",
        "Mission Indradhanush vaccination drive phase updates and target district metrics."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">Current Affairs & General Awareness</span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/blog"
              className="text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Exam Blueprints
            </Link>
            <Link 
              href="/"
              className="text-xs font-black px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Practice CBT Mock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Healthcare Capsules & General Knowledge</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            Daily Healthcare & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Exam Current Affairs</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Stay ahead in the 20-mark General Awareness & Aptitude sections of AIIMS NORCET, ESIC, and Railway Paramedical recruitments with verified policy breakdowns and daily capsules.
          </p>
        </div>
      </div>

      {/* Main Articles Stream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-emerald-400" />
                <span>High-Yield Current Affairs Capsules</span>
              </h2>
              <span className="text-xs font-bold text-emerald-400">Updated Regularly</span>
            </div>

            <div className="space-y-6">
              {currentAffairsList.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#0e172a]/90 rounded-2xl border border-slate-800/90 p-6 space-y-4 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Highlights List */}
                  <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Exam Recall Points</span>
                    </div>
                    <ul className="space-y-1.5">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar Widgets (1 col) */}
          <div className="space-y-6">
            {/* Quick Practice Card */}
            <div className="bg-[#0e172a]/90 rounded-2xl border border-emerald-500/30 p-6 space-y-4 shadow-lg shadow-emerald-950/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">General Awareness CBT Drills</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Take timed 10-question speed quizzes testing recent national health initiatives, disease eradication schemes, and healthcare awards.
              </p>
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <span>Attempt GK Speed Quiz</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Links Card */}
            <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Related Study Guides</span>
              </h3>
              <div className="space-y-2 text-xs">
                <Link 
                  href="/blog" 
                  className="block p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
                >
                  AIIMS NORCET 2026 Blueprint & Cutoff Trends
                </Link>
                <Link 
                  href="/exams/esic-officer" 
                  className="block p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
                >
                  ESIC Nursing Officer Official Exam Pattern
                </Link>
                <Link 
                  href="/subjects" 
                  className="block p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
                >
                  Pharmacology & Clinical Question Banks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
