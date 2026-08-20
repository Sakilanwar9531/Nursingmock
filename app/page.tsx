import Link from "next/link";
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  FileText, 
  HelpCircle,
  Stethoscope,
  Pill,
  Activity,
  Microscope,
  Eye,
  Brain
} from "lucide-react";

export default function HomePage() {
  const targetExams = [
    {
      id: "nursing",
      title: "Nursing Officer",
      tag: "AIIMS NORCET & ESIC",
      icon: Stethoscope,
      color: "from-sky-500/20 to-blue-600/20 border-sky-500/30 text-sky-400",
      description: "Comprehensive CBT tests for NORCET 07, ESIC, RRB Staff Nurse, DSSSB, and State PSC.",
      testsCount: "120+ Tests Available",
    },
    {
      id: "pharmacist",
      title: "Pharmacist",
      tag: "Central & State Govt",
      icon: Pill,
      color: "from-amber-500/20 to-orange-600/20 border-amber-500/30 text-amber-400",
      description: "Pharmaceutics, Pharmacology, Pharmacognosy, and Hospital Pharmacy test series.",
      testsCount: "45+ Tests Available",
    },
    {
      id: "lab-technician",
      title: "Lab Technician",
      tag: "DMLT / MLT Exams",
      icon: Microscope,
      color: "from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
      description: "Pathology, Microbiology, Biochemistry, and Hematology mock series for AIIMS & State Govt.",
      testsCount: "38+ Tests Available",
    },
    {
      id: "radiographer",
      title: "Radiographer",
      tag: "X-Ray & Imaging",
      icon: Activity,
      color: "from-purple-500/20 to-indigo-600/20 border-purple-500/30 text-purple-400",
      description: "Radiological Physics, Special Procedures, Radiation Safety, and Computed Tomography.",
      testsCount: "25+ Tests Available",
    },
    {
      id: "ot-technician",
      title: "OT Technician",
      tag: "Operation Theatre",
      icon: ShieldCheck,
      color: "from-rose-500/20 to-red-600/20 border-rose-500/30 text-rose-400",
      description: "Surgical instrumentation, Anesthesia equipment, Sterilization, and Patient Monitoring.",
      testsCount: "22+ Tests Available",
    },
    {
      id: "physiotherapist",
      title: "Physiotherapist",
      tag: "BPT Recruitment",
      icon: Brain,
      color: "from-cyan-500/20 to-sky-600/20 border-cyan-500/30 text-cyan-400",
      description: "Biomechanics, Electrotherapy, Orthopedic & Neurological Rehabilitation tests.",
      testsCount: "20+ Tests Available",
    },
  ];

  const featuredTests = [
    {
      title: "AIIMS NORCET 07 Full Length Grand Mock Test",
      category: "Nursing Officer",
      questions: 200,
      marks: 200,
      duration: "180 Mins",
      negativeMark: "1/3rd Negative",
      badge: "Exam-Pattern",
    },
    {
      title: "ESIC Nursing Officer Solved Previous Year Paper (Shift 1)",
      category: "Nursing Officer PYQ",
      questions: 125,
      marks: 125,
      duration: "120 Mins",
      negativeMark: "0.25 Negative",
      badge: "Official PYQ",
    },
    {
      title: "RRB Staff Nurse & Paramedical Standard CBT Drill",
      category: "RRB Paramedical",
      questions: 100,
      marks: 100,
      duration: "90 Mins",
      negativeMark: "1/3rd Negative",
      badge: "Updated 2026",
    },
    {
      title: "Central Govt Pharmacist Examination Full Mock 01",
      category: "Pharmacist",
      questions: 100,
      marks: 100,
      duration: "120 Mins",
      negativeMark: "0.25 Negative",
      badge: "Clinical MCQ",
    },
  ];

  const faqs = [
    {
      q: "Are the mock tests based on the latest AIIMS NORCET & ESIC exam pattern?",
      a: "Yes. All test series are updated to match the real TCS-pattern CBT interface with exact sectional timings, negative marking (1/3rd for NORCET), and clinical image-based questions.",
    },
    {
      q: "Do I get detailed solutions and rationales after submitting a test?",
      a: "Yes! Every single question has an in-depth clinical explanation with references to standard medical/nursing textbooks so you understand why an answer is correct.",
    },
    {
      q: "Can I practice Previous Year Solved Papers (PYQs)?",
      a: "Absolutely. NCBT provides authentic memory-based and official previous year question papers for AIIMS, ESIC, RRB, GMCH, DSSSB, and state paramedical recruitment.",
    },
    {
      q: "Does NCBT provide All-India Ranking and performance analytics?",
      a: "Yes. After completing any test, you receive instant percentile breakdown, accuracy score, subject-wise strengths & weaknesses, and time-per-question analysis.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">NCBT</span>
              <span className="text-xs ml-1.5 px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20 hidden sm:inline-block">
                Exam Portal
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="#exams" className="hover:text-white transition-colors">Target Exams</Link>
            <Link href="#mock-tests" className="hover:text-white transition-colors">Mock Tests</Link>
            <Link href="/practice" className="hover:text-white transition-colors">CBT Practice</Link>
            <Link href="#faqs" className="hover:text-white transition-colors">FAQs</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-md shadow-sky-500/25 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice Now</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India&apos;s #1 CBT Preparation Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Nursing, Pharmacist & Paramedical</span> Govt Exams
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Experience the exact exam interface for AIIMS NORCET, ESIC, RRB, and State PSC with real-time timers, clinical rationales, and All-India rank analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/practice"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-base shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Start Free Mock Test</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#exams"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-sky-400" />
                <span>Explore Exam Streams</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <div className="text-2xl font-black text-white">50,000+</div>
                <div className="text-xs text-slate-400 mt-0.5">High-Yield Questions</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-sky-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">TCS Exam Pattern</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-white">10+ Years</div>
                <div className="text-xs text-slate-400 mt-0.5">Solved PYQs</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-sky-400">Instant</div>
                <div className="text-xs text-slate-400 mt-0.5">Clinical Rationales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Professions Grid */}
      <section id="exams" className="py-16 lg:py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Choose Your Exam Stream
            </h2>
            <p className="text-slate-400 mt-3 text-base">
              Dedicated test series tailored to specific syllabus and marking schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetExams.map((exam) => {
              const Icon = exam.icon;
              return (
                <div
                  key={exam.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} border flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {exam.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {exam.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {exam.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      {exam.testsCount}
                    </span>
                    <Link
                      href="/practice"
                      className="text-xs font-bold text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                    >
                      <span>Practice Series</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Mock Tests & Solved PYQs */}
      <section id="mock-tests" className="py-16 lg:py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live Test Series</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Featured Mock Tests & Solved Papers
              </h2>
            </div>
            <p className="text-slate-400 text-sm mt-2 md:mt-0 max-w-md">
              Simulate actual exam pressure with strict countdown timers and instant clinical scorecards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTests.map((test, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {test.category}
                    </span>
                    <span className="text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      {test.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                    {test.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs mb-4 text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Questions</span>
                      <span className="font-bold text-white">{test.questions} MCQs</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Time</span>
                      <span className="font-bold text-white">{test.duration}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Marking</span>
                      <span className="font-bold text-rose-400">{test.negativeMark}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Free CBT Access</span>
                  </span>
                  <Link
                    href="/practice"
                    className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-sky-500/20"
                  >
                    <span>Attempt Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section id="faqs" className="py-16 lg:py-20 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Everything you need to know about NCBT mock exams and test series.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80"
              >
                <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-[#05080e] border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                </div>
                <span className="text-lg font-black text-white">NCBT</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                National Computer Based Test portal for Nursing Officers, Pharmacists, and Paramedical candidates across India.
              </p>
              <div className="text-xs text-slate-500">
                Contact: support@ncbt.in
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Nursing Exams</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/practice" className="hover:text-white">AIIMS NORCET 07 Mock Test</Link></li>
                <li><Link href="/practice" className="hover:text-white">ESIC Staff Nurse Test Series</Link></li>
                <li><Link href="/practice" className="hover:text-white">RRB Nursing Officer PYQ</Link></li>
                <li><Link href="/practice" className="hover:text-white">DSSSB Nursing Solved Papers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Paramedical & Pharmacy</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/practice" className="hover:text-white">Govt Pharmacist Exam Mock</Link></li>
                <li><Link href="/practice" className="hover:text-white">Lab Technician (DMLT) CBT</Link></li>
                <li><Link href="/practice" className="hover:text-white">Radiographer Solved Tests</Link></li>
                <li><Link href="/practice" className="hover:text-white">OT Technician Series</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Practice & Portal</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/practice" className="hover:text-white">Live CBT Exam Hall</Link></li>
                <li><Link href="/practice" className="hover:text-white">All India Test Series</Link></li>
                <li><Link href="/practice" className="hover:text-white">Previous Year Papers (PYQ)</Link></li>
                <li><Link href="/practice" className="hover:text-white">Student Dashboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 NCBT. All Rights Reserved. Not affiliated with official AIIMS or Govt bodies.</p>
            <p className="mt-2 sm:mt-0">Crafted for Medical & Paramedical Aspirants</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
