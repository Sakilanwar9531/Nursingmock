import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Cpu,
  HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
  title: "About NCBT | India's Leading Nursing & Paramedical CBT Platform",
  description: "Learn about NCBT's educational mission, exam methodology, peer-reviewed clinical rationale standards, and how our CBT simulation empowers 100,000+ medical aspirants.",
  keywords: [
    "About NCBT",
    "NCBT mission",
    "nursing exam preparation portal India",
    "clinical CBT test system",
  ],
  alternates: {
    canonical: "https://ncbt.in/about",
  },
  openGraph: {
    title: "About NCBT - Educational Mission & Standards",
    description: "Setting the gold standard for Nursing, Pharmacist & Paramedical government test series.",
    url: "https://ncbt.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About NCBT - National CBT Exam Platform",
    description: "India's dedicated CBT simulation and exam analytics platform for Nursing and Paramedical professionals.",
    url: "https://ncbt.in/about",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "NCBT",
      url: "https://ncbt.in",
      foundingDate: "2024",
      description: "Providing authentic Computer Based Test preparation for medical aspirants.",
    },
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-grow space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Healthcare Champions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Built by Clinicians, Engineered for Rank 1 Aspirants
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            NCBT (National CBT) is India&apos;s premier dedicated testing platform for Nursing Officers, Pharmacists, Lab Technicians, and Paramedical recruitment aspirants.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Our Core Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To democratize access to high-fidelity Computer-Based Test (CBT) simulations. We eliminate exam-hall friction by providing realistic timers, negative marking penalties, and instant clinical explanations for every multiple-choice question.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">Clinical Accuracy Standard</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every question and rationale on NCBT is verified against standard medical textbooks (Bruner & Suddarth, Guyton, K.D. Tripathi) and past official AIIMS, ESIC, and RRB answer keys to guarantee 100% conceptual reliability.
            </p>
          </div>
        </div>

        {/* What Sets NCBT Apart */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-sky-950/30 border border-slate-800 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-display">
              Why 100,000+ Aspirants Trust NCBT Over Generic Test Apps
            </h2>
            <p className="text-sm text-slate-400">
              Unlike generic multi-exam portals, NCBT is built exclusively for medical & healthcare exams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Cpu className="w-4 h-4" /> Official CBT Interface
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Color-coded question palette (Green, Red, Blue, Grey) and Save & Next handlers mirroring official exam software.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-4 h-4" /> 100% Free & Open
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlimited access to full-length mocks, subject unit tests, and authentic previous year solved papers without paywalls.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <HeartHandshake className="w-4 h-4" /> Detailed Rationales
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive explanations clarifying why the correct choice is right and why other options are eliminated.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-8 space-y-4">
          <h3 className="text-xl font-bold text-white">Start Your Exam Preparation Today</h3>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-sky-500/20"
            >
              Explore CBT Test Series <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Read Exam Guides
            </Link>
          </div>
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
