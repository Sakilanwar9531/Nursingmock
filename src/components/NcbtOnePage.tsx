import React, { useState } from "react";
import {
  GraduationCap,
  Pill,
  Activity,
  Scissors,
  Radiation,
  TestTube2,
  Sparkles,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Share2,
  Check,
  Zap,
  CheckCircle2,
  Target,
  Clock,
  ShieldCheck,
  Award,
  HelpCircle,
  BarChart3,
  Flame,
  Search,
  ChevronRight,
  ExternalLink,
  Layers,
  FileText,
  FileCheck,
  Newspaper,
  Bookmark
} from "lucide-react";

interface NcbtOnePageProps {
  showPage: (pageId: string, pushHistory?: boolean, customState?: any) => void;
}

interface ProfessionSection {
  slug: string;
  label: string;
  icon: any;
  exams: string;
  shortDesc: string;
  longCopy: string[];
  keyTopics: string[];
  bg: string;
  border: string;
  quarterBgInner: string;
  quarterBgOuter: string;
  iconColor: string;
  badge: string;
}

const PROFESSIONS: ProfessionSection[] = [
  {
    slug: "nursing",
    label: "Nursing Officer",
    icon: GraduationCap,
    exams: "AIIMS NORCET, ESIC Nursing Officer, WBHRB Staff Nurse, RRB Staff Nurse, CHO & State PSC",
    shortDesc: "Complete practice dashboard for AIIMS NORCET, ESIC, WBHRB, and RRB Nursing Officer CBT examinations.",
    longCopy: [
      "Nursing NCBT One aggregates verified question sets for AIIMS NORCET (Stage 1 & Stage 2), ESIC Nursing Officer, WBHRB Staff Nurse Grade II, RRB Staff Nurse, NIMHANS, and State CHO recruitment into a unified testing hub. Designed specifically for nursing graduates and diploma holders, this module provides instant access to subject-wise drills, image-based clinical scenarios, and past year solved question papers.",
      "The curriculum strictly follows Indian Nursing Council (INC) syllabus standards. Candidates can practice high-yield topics including Fundamentals of Nursing, Medical-Surgical Nursing, Obstetrics & Gynecological Nursing, Pediatric Nursing, Pharmacology, Anatomy & Physiology, Community Health Nursing, and Psychiatric Nursing. Real-time CBT timers, section-wise navigation, and comprehensive clinical rationales ensure optimal exam-day readiness."
    ],
    keyTopics: [
      "Fundamentals & Clinical Nursing Procedures",
      "Medical-Surgical & Critical Care Nursing",
      "Pharmacology & Dose Calculation MCQs",
      "Obstetrics, Gynecology & Pediatric Care",
      "Image-Based & Scenario-Based Questions"
    ],
    bg: "#9ec2af",
    border: "#7aa88d",
    quarterBgInner: "#428c68",
    quarterBgOuter: "#63a380",
    iconColor: "#063b2a",
    badge: "MOST POPULAR"
  },
  {
    slug: "pharma",
    label: "Pharmacist",
    icon: Pill,
    exams: "RRB Pharmacist, ESIC Pharmacist, WBHRB Pharmacist, CGHS, Drug Inspector & State PSC",
    shortDesc: "Unified mock test portal for Central Government and State Pharmacist competitive examinations.",
    longCopy: [
      "Pharmacist NCBT One consolidates practice papers for RRB Pharmacist Grade III, ESIC Pharmacist, WBHRB Pharmacist, CGHS, Drug Inspector, and State Public Service Commission exams. Designed to bridge academic knowledge with competitive exam speed, this module offers topic-wise practice sets and full-length CBT papers.",
      "Candidates can systematically drill core pharmacy subjects including Pharmacology & Toxicology, Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy, Hospital & Clinical Pharmacy, Pharmacy Jurisprudence, and Pharmaceutical Analysis. Every question includes structured explanations with drug classifications, mechanisms of action, and mathematical dose calculation formulas."
    ],
    keyTopics: [
      "Pharmacology & Drug Action Mechanisms",
      "Pharmaceutics & Dosage Form Technology",
      "Pharmaceutical Chemistry & Analysis",
      "Hospital, Clinical & Community Pharmacy",
      "Drug Jurisprudence & Practice Legislation"
    ],
    bg: "#eab592",
    border: "#d6996e",
    quarterBgInner: "#a85220",
    quarterBgOuter: "#c46d37",
    iconColor: "#522105",
    badge: "HIGH YIELD"
  },
  {
    slug: "physio",
    label: "Physiotherapist",
    icon: Activity,
    exams: "AIIMS Physiotherapist, SVNIRTAR, State PSC Physiotherapist, DSSSB & Railway Recruitment",
    shortDesc: "Dedicated question bank and timed test series for BPT & MPT clinical recruitment exams.",
    longCopy: [
      "Physiotherapy NCBT One is engineered for candidates preparing for AIIMS Physiotherapist vacancies, SVNIRTAR CET, State PSC Paramedical exams, DSSSB, and Railway recruitment. The platform provides structured question banks covering both basic foundational sciences and advanced clinical physiotherapy modalities.",
      "Aspirants can undertake focused practice in Kinesiology, Biomechanics, Electrotherapy, Exercise Therapy, Clinical Orthopedics, Neurological Rehabilitation, Cardio-Respiratory Physiotherapy, and Musculoskeletal Assessment. Test sets reflect modern clinical scenario formats and include detailed anatomical rationales for quick conceptual clarity."
    ],
    keyTopics: [
      "Kinesiology, Biomechanics & Gait Analysis",
      "Electrotherapy Modalities & Currents",
      "Clinical Orthopedic & Sports Rehabilitation",
      "Neurological & Pediatric Physiotherapy",
      "Cardio-Pulmonary & ICU Rehabilitation"
    ],
    bg: "#9bc8ea",
    border: "#6ca8d4",
    quarterBgInner: "#256e9c",
    quarterBgOuter: "#428dbf",
    iconColor: "#072d47",
    badge: "CLINICAL"
  },
  {
    slug: "labtech",
    label: "Medical Lab Technician",
    icon: TestTube2,
    exams: "DMLT / BMLT Recruitment, RRB Lab Technician, AIIMS MLT, ESIC Lab Assistant & State Paramedical",
    shortDesc: "Comprehensive diagnostic question bank and CBT mock tests for MLT & DMLT cadres.",
    longCopy: [
      "Medical Lab Technician NCBT One serves DMLT and BMLT aspirants preparing for RRB Lab Technician, AIIMS MLT, ESIC Lab Assistant, WBHRB, and State Health Directorate recruitments. It simplifies complex diagnostic laboratory procedures into organized, high-yield CBT practice modules.",
      "The test series spans essential diagnostic disciplines including Clinical Biochemistry, Hematology & Blood Banking, Medical Microbiology, Parasitology, Pathology, Histopathology, and Cytotechnology. Practicing with real-time countdown timers helps candidates master diagnostic algorithms and technical procedure questions under exam conditions."
    ],
    keyTopics: [
      "Hematology, Hemostasis & Blood Transfusion",
      "Clinical Biochemistry & Instrumentation",
      "Medical Microbiology & Serology",
      "Histopathology & Cytological Techniques",
      "Quality Control & Laboratory Safety"
    ],
    bg: "#9bc8ea",
    border: "#6ca8d4",
    quarterBgInner: "#256e9c",
    quarterBgOuter: "#428dbf",
    iconColor: "#072d47",
    badge: "ACTIVE"
  },
  {
    slug: "radiography",
    label: "Radiographer / X-Ray Tech",
    icon: Radiation,
    exams: "AIIMS Radiographer, RRB Radiographer, State Health X-Ray Technician, DRT & Paramedical Boards",
    shortDesc: "Targeted practice module for Diagnostic Radiography, CT, MRI, and X-Ray Technician recruitment.",
    longCopy: [
      "Radiography NCBT One brings together previous year papers and mock test series for AIIMS Radiographer, RRB Radiographer, State Health X-Ray Technician, DRT, and Paramedical Board examinations. The workspace delivers structured practice covering classical diagnostic radiography as well as modern sectional imaging techniques.",
      "Key study areas include Radiation Physics, Radiation Protection & Safety Rules, Darkroom Processing, Radiographic Positioning, Computed Tomography (CT), Magnetic Resonance Imaging (MRI), and Basic Ultrasonography principles. Clear question breakdowns with radiation physics principles ensure candidates retain essential technical concepts."
    ],
    keyTopics: [
      "Radiation Physics & Radiation Safety",
      "Radiographic Positioning & Anatomy",
      "Computed Tomography (CT Scan) Protocol",
      "Magnetic Resonance Imaging (MRI) Physics",
      "Special Radiological Procedures & Darkroom"
    ],
    bg: "#9ec2af",
    border: "#7aa88d",
    quarterBgInner: "#428c68",
    quarterBgOuter: "#63a380",
    iconColor: "#063b2a",
    badge: "IMAGING TECH"
  },
  {
    slug: "ot-icu",
    label: "OT & Critical Care Technician",
    icon: Scissors,
    exams: "AIIMS OT Technician, ESIC Anesthesia Tech, Central Govt ICU Assistant & State Health Cadres",
    shortDesc: "High-yield test engine for Operation Theatre, Anesthesia, and ICU Assistant recruitment.",
    longCopy: [
      "OT & Critical Care NCBT One provides specialized exam preparation for AIIMS Operation Theatre Technician, ESIC Anesthesia Assistant, Central Government ICU Technician, and State Paramedical Cadres. The portal features curated clinical scenarios and technical instrument MCQs reflecting current recruitment patterns.",
      "Candidates can practice critical care modules covering Sterilization Protocols, Anesthesia Machines & Gas Circuits, Surgical Instrumentation, Emergency Airway Management, Patient Vital Monitoring, Intensive Care Resuscitation, and Infection Control Practices. Every practice paper provides immediate performance metrics and step-by-step clinical explanations."
    ],
    keyTopics: [
      "Sterilization, Asepsis & Infection Control",
      "Anesthesia Machine & Airway Management",
      "Surgical Instruments & OT Setup",
      "ICU Patient Monitoring & Resuscitation",
      "Emergency Care & Biomedical Waste Rules"
    ],
    bg: "#eab592",
    border: "#d6996e",
    quarterBgInner: "#a85220",
    quarterBgOuter: "#c46d37",
    iconColor: "#522105",
    badge: "SURGERY & ICU"
  }
];

export const NcbtOnePage: React.FC<NcbtOnePageProps> = ({ showPage }) => {
  const [selectedProfession, setSelectedProfession] = useState<string>("nursing");
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleNavigateToProfession = (slug: string) => {
    showPage("ncbt_one_" + slug);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleStartTestClick = () => {
    if (selectedProfession) {
      handleNavigateToProfession(selectedProfession);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const faqs = [
    {
      q: "What is NCBT One?",
      a: "NCBT One is a dedicated, distraction-free computer-based testing (CBT) platform engineered specifically for healthcare and paramedical recruitment examinations. It streamlines practice by combining past year solved papers (PYQs), subject-wise practice drills, and full-length mock tests into a single workspace."
    },
    {
      q: "Are there free tests available on NCBT One?",
      a: "Yes. NCBT One offers free practice tests and subject-wise diagnostic drills for every healthcare profession. Candidates can start practicing right away, and can optionally unlock full test series pass packages for unlimited access."
    },
    {
      q: "Does NCBT One match the official CBT exam interface?",
      a: "Yes. The examination engine replicates the official computer-based testing interface utilized in national recruitment exams (such as AIIMS NORCET, RRB, and ESIC), including real-time countdown timers, question palette flagging, and automated negative marking calculations."
    },
    {
      q: "Which healthcare professions are supported on NCBT One?",
      a: "NCBT One offers tailored exam preparation modules for Nursing Officers, Pharmacists, Physiotherapists, Medical Lab Technicians (MLT), Radiographers / X-Ray Technicians, and OT & Critical Care Technicians."
    },
    {
      q: "How does NCBT One help improve exam accuracy and score?",
      a: "Every mock test submission generates a detailed performance diagnostic showing accuracy percentages, subject-level strength analysis, time spent per question, and comprehensive clinical rationales for every option."
    }
  ];

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pb-24 font-sans leading-relaxed selection:bg-emerald-500/20 selection:text-emerald-700">
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-10">

        {/* 1. HERO BANNER - MATCHING HOME PAGE STYLE (ALL-IN-ONE HUB / HERO AURORA) */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 p-6 sm:p-10 md:p-12 shadow-2xl">
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>Distraction-Free NCBT One Hub</span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                NCBT ONE — <span className="text-emerald-400">ZERO DISTRACTION.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                Unified, distraction-free computer-based testing hub for healthcare & paramedical aspirants. AIIMS NORCET, ESIC, WBHRB, RRB & State PSC mock test series.
              </p>
            </div>

            {/* Micro Stats & Value Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-extrabold text-sm">
                  ⚡
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Interface</span>
                  <p className="text-xs font-black text-white truncate">Official CBT Simulator</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-extrabold text-sm">
                  🎯
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Question Sets</span>
                  <p className="text-xs font-black text-white truncate">Verified Syllabus PYQs</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-extrabold text-sm">
                  📊
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Analytics</span>
                  <p className="text-xs font-black text-white truncate">Instant Rationales</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 font-extrabold text-sm">
                  🛡️
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Environment</span>
                  <p className="text-xs font-black text-white truncate">100% Ad-Free Hub</p>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* 3. CADRE GRID - EXACT HOME PAGE CADRE GRID CARDS (CadreGrid.tsx Style) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                NCBT ONE PROFESSION CADRES
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-0.5">
                Select your healthcare cadre to open dedicated syllabus mock test series
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFESSIONS.map((p) => {
              const IconComponent = p.icon;
              return (
                <button
                  key={p.slug}
                  onClick={() => handleNavigateToProfession(p.slug)}
                  className="relative overflow-hidden rounded-[22px] py-5 px-6 text-left transition-all active:scale-[0.98] hover:-translate-y-1 cursor-pointer group shadow-sm flex flex-col justify-between min-h-[140px] border border-transparent"
                  style={{
                    backgroundColor: p.bg,
                    borderColor: p.border,
                  }}
                >
                  {/* Top Badge & Arrow Button */}
                  <div className="flex items-center justify-between w-full relative z-10 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/80 text-slate-800 shadow-2xs border border-black/5">
                      {p.badge}
                    </span>

                    {/* White Circular Arrow Button */}
                    <span className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:translate-x-0.5 border border-black/5 shrink-0">
                      <ArrowRight size={18} style={{ color: p.iconColor }} strokeWidth={2.5} />
                    </span>
                  </div>

                  {/* Profession Name & Exams */}
                  <div className="relative z-10 space-y-1">
                    <h3
                      className="text-lg font-extrabold tracking-tight flex items-center gap-2"
                      style={{ color: "#0f172a" }}
                    >
                      <IconComponent className="w-5 h-5 shrink-0" style={{ color: p.iconColor }} />
                      <span>{p.label}</span>
                    </h3>
                    <p className="text-xs line-clamp-1 font-semibold" style={{ color: "#475569" }}>
                      {p.exams}
                    </p>
                  </div>

                  {/* Bottom-right quarter-circle background motifs (signature Home Page style) */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-7 -right-7 w-28 h-28 rounded-full pointer-events-none transition-transform group-hover:scale-105 opacity-80"
                    style={{ backgroundColor: p.quarterBgOuter }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full pointer-events-none transition-transform group-hover:scale-110"
                    style={{ backgroundColor: p.quarterBgInner }}
                  />
                </button>
              );
            })}
          </div>
        </section>


        {/* 4. CORE SYSTEM FEATURES - HOME PAGE BENTO CARDS */}
        <section className="space-y-4">
          <div className="px-1 border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
              Platform Features & Architecture
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">
              Engineered for high-focus CBT preparation without distraction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "01",
                title: "Distraction-Free Environment",
                desc: "100% ad-free, popup-free layout designed for maximum focus and steady speed.",
                icon: ShieldCheck,
                color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
              },
              {
                num: "02",
                title: "Authentic CBT Engine",
                desc: "Real-time countdown timer, review flags, and standard negative marking (-0.25 / -0.33).",
                icon: Clock,
                color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
              },
              {
                num: "03",
                title: "Verified PYQ Repository",
                desc: "Solves from AIIMS, ESIC, RRB, and State PSCs with thorough professor explanations.",
                icon: FileText,
                color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
              },
              {
                num: "04",
                title: "Performance Diagnostics",
                desc: "Instant score analytics, accuracy metrics, and subject-wise strength breakdown.",
                icon: BarChart3,
                color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
              }
            ].map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={feat.num}
                  className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/40 transition-all space-y-3 shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center font-bold ${feat.color}`}>
                      <FeatIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-black text-[var(--text-secondary)]">
                      {feat.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>


        {/* 5. PROFESSION DEEP-DIVE CARDS (EDITORIAL + SEO HUB) */}
        <section className="space-y-6">
          <div className="px-1 border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
              Healthcare Profession Syllabus & Test Portals
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">
              Detailed competitive exam scope, topic distribution, and instant test launch buttons for each cadre
            </p>
          </div>

          <div className="space-y-6">
            {PROFESSIONS.map((p) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={p.slug}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm hover:border-emerald-500/40 transition-all"
                >
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-[var(--text-primary)]">{p.label}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            NCBT ONE
                          </span>
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                          {p.exams}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavigateToProfession(p.slug)}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
                    >
                      <span>Open {p.label} Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Copy Description */}
                  <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {p.longCopy.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Key Exam Modules */}
                  <div className="pt-2">
                    <h4 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      High-Yield Exam Modules Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {p.keyTopics.map((topic, tidx) => (
                        <span
                          key={tidx}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text-primary)] font-bold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* 6. COMPARISON MATRIX - HOME PAGE CARDS STYLE */}
        <section className="space-y-4">
          <div className="px-1 border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
              Why Prepare with NCBT One?
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">
              Comparing NCBT One against standard advertisement-heavy testing portals
            </p>
          </div>

          <div className="overflow-x-auto border border-[var(--border)] rounded-3xl bg-[var(--surface)] shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-primary)] font-extrabold">
                  <th className="p-4 sm:p-5">Feature Parameter</th>
                  <th className="p-4 sm:p-5 text-[var(--text-secondary)]">Standard Online Portals</th>
                  <th className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-extrabold">NCBT One Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)] font-medium">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">User Interface</td>
                  <td className="p-4 sm:p-5 text-rose-500">Intrusive Ads & Popups</td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-600 dark:text-emerald-400">100% Clean & Distraction-Free</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">Test Accessibility</td>
                  <td className="p-4 sm:p-5">Complex Paywalls & Logins</td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-600 dark:text-emerald-400">Instant 1-Click Test Launcher</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">Exam Engine Simulator</td>
                  <td className="p-4 sm:p-5">Generic Survey Forms</td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-600 dark:text-emerald-400">Official Exam Pattern Simulator</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">Question Rationales</td>
                  <td className="p-4 sm:p-5">Short / Incomplete Answers</td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-600 dark:text-emerald-400">Step-by-Step Clinical Explanations</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">Pricing Model</td>
                  <td className="p-4 sm:p-5">Expensive Subscriptions</td>
                  <td className="p-4 sm:p-5 font-extrabold text-emerald-600 dark:text-emerald-400">Free Practice Mocks & Open Drills</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-4">
          <div className="px-1 border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[var(--border)] rounded-2xl bg-[var(--surface)] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-extrabold text-xs sm:text-sm text-[var(--text-primary)] flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] bg-[var(--surface-2)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* 8. FOOTER CALL TO ACTION BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white p-8 sm:p-12 text-center space-y-6 border border-emerald-500/30 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Accelerate Your Exam Preparation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Join thousands of healthcare candidates practicing on India's premier distraction-free computer-based testing hub.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => handleNavigateToProfession("nursing")}
              className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              <span>Start Nursing Officer Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="px-6 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>{copiedLink ? "Link Copied!" : "Share NCBT One Hub"}</span>
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};

export default NcbtOnePage;
