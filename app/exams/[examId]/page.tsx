import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TARGET_EXAMS, SUBJECTS } from "@/src/data";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Award, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface Props {
  params: {
    examId: string;
  };
}

export async function generateStaticParams() {
  return TARGET_EXAMS.map((exam) => ({
    examId: exam.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = TARGET_EXAMS.find((e) => e.id === params.examId);

  if (!exam) {
    return {
      title: "Exam Not Found | NCBT",
    };
  }

  return {
    title: `${exam.fullName} Mock Test Series, Syllabus & PYQ Papers | NCBT`,
    description: `Prepare for ${exam.fullName} with real CBT pattern mock tests, negative marking (1/3 or 1/4), subject-wise question distribution, syllabus blueprints, and previous year solved papers.`,
    keywords: [
      `${exam.name} mock test`,
      `${exam.fullName} syllabus`,
      `${exam.name} previous year questions`,
      `${exam.name} CBT preparation online`,
      `${exam.name} cut off marks`,
    ],
    alternates: {
      canonical: `https://ncbt.in/exams/${params.examId}`,
    },
    openGraph: {
      title: `${exam.fullName} Online Test Series | NCBT`,
      description: `Official pattern Computer Based Test (CBT) mock tests for ${exam.fullName}.`,
      url: `https://ncbt.in/exams/${params.examId}`,
      type: "website",
    },
  };
}

export default function ExamDetailPage({ params }: Props) {
  const exam = TARGET_EXAMS.find((e) => e.id === params.examId);

  if (!exam) {
    notFound();
  }

  // Get sample related tests
  const sampleTests = SUBJECTS.flatMap(s => s.tests).slice(0, 6);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: exam.fullName,
    description: exam.desc,
    provider: {
      "@type": "Organization",
      name: "NCBT",
      sameAs: "https://ncbt.in",
    },
    offers: {
      "@type": "Offer",
      category: "Free",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the exam pattern for ${exam.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${exam.name} examination is conducted via Computer Based Test (CBT) with 100–200 objective multiple choice questions, negative marking penalty for incorrect answers, and real-time timer countdown.`,
        },
      },
      {
        "@type": "Question",
        name: `Are NCBT ${exam.name} mock tests free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! All official pattern CBT mock tests, previous year papers (PYQs), and detailed clinical rationale solutions are 100% free on NCBT.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex-grow">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/exams" className="hover:text-white transition-colors">Target Exams</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300 font-medium">{exam.name}</span>
        </nav>

        {/* Hero Banner Card */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 p-6 sm:p-8 md:p-10 mb-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-2xl">{exam.icon}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {exam.category} EXAM SUITE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {exam.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              {exam.fullName}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {exam.desc}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" /> Start Official CBT Mock Test
              </Link>
              <Link
                href="/subjects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-sky-400" /> View Subject Bank
              </Link>
            </div>
          </div>
        </div>

        {/* Exam Pattern & Blueprint Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Blueprint Info */}
          <div className="lg:col-span-2 space-y-8">
            <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <Award className="w-5 h-5 text-amber-400" />
                Exam Pattern & Marking Blueprint
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80 w-1/3">Exam Mode</td>
                      <td className="p-3.5 font-semibold text-white">Online Computer Based Test (CBT)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80">Total Questions</td>
                      <td className="p-3.5 font-semibold text-white">100 - 200 Objective MCQs</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80">Exam Duration</td>
                      <td className="p-3.5 font-semibold text-white">90 to 180 Minutes (Timed)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80">Marking Scheme</td>
                      <td className="p-3.5 font-semibold text-emerald-400">+1.00 Mark for every correct response</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80">Negative Penalty</td>
                      <td className="p-3.5 font-semibold text-rose-400">-0.33 (1/3rd) or -0.25 (1/4th) per wrong answer</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-400 bg-slate-900/80">Question Palette</td>
                      <td className="p-3.5 font-semibold text-slate-300">Answered, Marked for Review, Not Visited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Preparation Strategies */}
            <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Strategic CBT Preparation Tips for {exam.name}
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <span><strong>Simulate Actual Exam Pressure:</strong> Practice under realistic negative marking conditions to train your elimination intuition.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <span><strong>Adopt the 3-Pass Method:</strong> Attempt direct recall questions first, numerical/reasoning questions second, and difficult clinical scenarios last.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <span><strong>Deep-Dive into Explanations:</strong> Review peer-reviewed clinical rationales after each test submission to avoid recurring errors.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Test Quick Launch */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Featured Practice Tests
              </h3>
              <div className="space-y-3">
                {sampleTests.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tests/${t.id}`}
                    className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 transition-all block group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                        {t.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">
                        {t.mins}m
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{t.desc}</p>
                  </Link>
                ))}
              </div>
              <Link
                href="/tests"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs text-center block transition-colors border border-slate-700"
              >
                Browse All 100+ Tests →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            Frequently Asked Questions about {exam.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-white">How does NCBT simulate the real {exam.name} exam?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                NCBT replicates the exact question palette color scheme, real-time timer countdown, Save & Next protocol, and negative mark penalties.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-white">Are previous year papers available?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes, authentic previous year solved papers (PYQs) from AIIMS, ESIC, and State boards are fully digitized with instant score calculations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <ServerFooter />
    </div>
  );
}
