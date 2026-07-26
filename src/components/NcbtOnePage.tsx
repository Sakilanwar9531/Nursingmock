import React, { useState } from "react";
import { 
  Sparkles, 
  Layers, 
  BarChart3, 
  FileText, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  BookOpen
} from "lucide-react";

interface NcbtOnePageProps {
  showPage: (pageId: string, pushHistory?: boolean, customState?: any) => void;
}

export const NcbtOnePage: React.FC<NcbtOnePageProps> = ({ showPage }) => {
  // Table of Contents closed by default as requested
  const [isTocOpen, setIsTocOpen] = useState(false);

  const tocItems = [
    { id: "nursing-officer", slug: "nursing", label: "Nursing Officer", icon: "🩺" },
    { id: "pharmacist", slug: "pharma", label: "Pharmacist", icon: "💊" },
    { id: "paramedical-ot", slug: "ot-technician", label: "Paramedical / OT Technician", icon: "🏥" },
    { id: "physiotherapist", slug: "physiotherapist", label: "Physiotherapist", icon: "🧘" },
    { id: "radiographer", slug: "radiographer", label: "Radiographer / X-Ray Technician", icon: "📸" },
    { id: "lab-technician", slug: "lab-technician", label: "Lab Technician (DMLT)", icon: "🧪" },
    { id: "medical-officer", slug: "", label: "Medical Officer", icon: "⚕️" }
  ];

  const handleProfessionClick = (prof: { id: string; slug: string }) => {
    if (prof.slug) {
      showPage("ncbt_one_" + prof.slug);
    } else {
      scrollToSection(prof.id);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 font-sans">
      
      {/* ==================== A) HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--surface-2)] via-[var(--surface)] to-[var(--bg)] pt-12 pb-14 px-4 md:px-8 border-b border-[var(--border)] text-center">
        
        {/* Glow backdrop accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-slate-500/10 rounded-full filter blur-[140px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          
          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.15]">
            One Dashboard. Every Exam. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 bg-clip-text text-transparent font-serif italic font-normal">
              Zero Distractions.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-base text-[var(--text2)] max-w-2xl mx-auto leading-relaxed font-sans">
            NCBT One brings every mock test, PYQ, and short test for your profession into a single personalized space — no ads, no page-hopping, no clicking through five menus to practice. Just you, your exams, and your progress.
          </p>

        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 space-y-8">

        {/* ==================== B) PROFESSION BUTTONS (ABOVE TOC) ==================== */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 md:p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span>Select Profession to Jump:</span>
          </div>
          
          <div className="n-card-grid pt-1">
            {tocItems.map((prof) => (
              <button
                key={prof.id}
                onClick={() => handleProfessionClick(prof)}
                className="n-card-compact flex items-center gap-2.5 hover:border-[var(--primary)] transition-all cursor-pointer group text-left"
              >
                <span className="text-xl group-hover:scale-110 transition-transform shrink-0">{prof.icon}</span>
                <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{prof.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==================== C) TABLE OF CONTENTS (COLLAPSIBLE BY DEFAULT) ==================== */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 md:p-6 shadow-xl space-y-4">
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="flex items-center gap-2.5 text-sm md:text-base font-black text-[var(--text-primary)] hover:text-slate-300 transition-colors cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <Layers className="w-4 h-4" />
              </div>
              <span>☰ Table of Contents — Select Your Profession</span>
              {isTocOpen ? (
                <ChevronUp className="w-4 h-4 text-[var(--text2)]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[var(--text2)]" />
              )}
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-400 hidden sm:inline">
              7 Professions Covered
            </span>
          </div>

          {isTocOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-[var(--border)]/60 animate-fade-in">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="p-3 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-2)] border border-[var(--border)] hover:border-slate-400 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-white leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==================== D) PROFESSION SECTIONS ==================== */}
        <div className="space-y-10">

          {/* 1. NURSING OFFICER NCBT ONE */}
          <section id="nursing-officer" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">🩺</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Nursing Officer NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting AIIMS NORCET, ESIC, WBHRB &amp; Staff Nurse
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Nursing Officer NCBT One</strong> is the ultimate distraction-free computer-based testing hub designed specifically for nursing graduates and diploma holders across India. Preparing for premier nursing recruitment exams like <strong>AIIMS NORCET</strong>, <strong>ESIC Nursing Officer</strong>, <strong>WBHRB Basic B.Sc &amp; GNM Staff Nurse</strong>, and <strong>RRB Railway Staff Nurse</strong> often requires bouncing between multiple websites, dealing with broken links, and fighting intrusive advertisements.
              </p>
              <p>
                With <strong>Nursing Officer NCBT One</strong>, candidates gain single-click access to thousands of authentic CBT mock papers, past year solved question sets (PYQs), clinical speed drills, and image-based nursing procedure questions. Every question includes in-depth professor-verified clinical rationales, physiological explanations, and drug dosage breakdowns.
              </p>
            </div>
          </section>

          {/* 2. PHARMACIST NCBT ONE */}
          <section id="pharmacist" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">💊</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Pharmacist NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting RRB Pharmacist, ESIC, WBHRB &amp; Drug Inspector
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Pharmacist NCBT One</strong> provides a dedicated, streamlined practice environment for Diploma in Pharmacy (D.Pharm) and Bachelor of Pharmacy (B.Pharm) candidates preparing for central and state government pharmaceutical posts. Top recruitment exams such as <strong>RRB Pharmacist CBT</strong>, <strong>ESIC Pharmacist</strong>, <strong>WBHRB Pharmacist Grade-III</strong>, <strong>CGHS Hospital Pharmacist</strong>, and <strong>State Drug Inspector</strong> demand deep conceptual clarity across Pharmaceutics, Pharmacology, Pharmacognosy, and Pharmaceutical Jurisprudence.
              </p>
              <p>
                Inside <strong>Pharmacist NCBT One</strong>, aspirants can practice full-length online mock exams, subject-specific pharmaceutical quizzes, and official past year papers without external redirects.
              </p>
            </div>
          </section>

          {/* 3. PARAMEDICAL & OT TECHNICIAN NCBT ONE */}
          <section id="paramedical-ot" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">🏥</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Paramedical &amp; OT Technician NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting Operation Theatre, Anesthesia &amp; Dialysis Techs
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Paramedical &amp; OT Technician NCBT One</strong> offers an all-in-one testing portal customized for Operation Theatre Technicians, Anesthesia Assistants, Dialysis Technicians, and CSSD Supervisors. Candidates targeting competitive exams across <strong>AIIMS Surgical OT Recruitment</strong>, <strong>RRB Paramedical Cadres</strong>, and State Health Directorates frequently struggle to find high-quality, exam-oriented study content.
              </p>
              <p>
                Through <strong>Paramedical &amp; OT Technician NCBT One</strong>, candidates access structured test suites covering surgical instrument identification, sterilization protocols, anesthesia workstation workflows, and emergency airway management.
              </p>
            </div>
          </section>

          {/* 4. PHYSIOTHERAPIST NCBT ONE */}
          <section id="physiotherapist" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">🧘</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Physiotherapist NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting BPT / MPT AIIMS, RRB &amp; State Hospital Recruitment
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Physiotherapist NCBT One</strong> delivers a comprehensive computer-based examination workspace for Bachelor of Physiotherapy (BPT) and Master of Physiotherapy (MPT) professionals. Securing government physiotherapy positions in premier institutions such as <strong>AIIMS Hospital Physiotherapist</strong>, <strong>RRB Rehabilitation Cadres</strong>, and State Public Service Commissions requires mastering complex subjects like Kinesiology, Electrotherapy, and Neuro-rehabilitation.
              </p>
              <p>
                By consolidating all past papers, clinical case scenario MCQs, and domain-wise speed drills into <strong>Physiotherapist NCBT One</strong>, candidates no longer need to spend hours searching for authentic test series.
              </p>
            </div>
          </section>

          {/* 5. RADIOGRAPHER & X-RAY TECHNICIAN NCBT ONE */}
          <section id="radiographer" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">📸</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Radiographer &amp; X-Ray Technician NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting DRT, BRT, CT/MRI &amp; Radiation Physics Exams
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Radiographer &amp; X-Ray Technician NCBT One</strong> is designed for Diploma in Radiography Technology (DRT) and Bachelor in Radiography Technology (BRT) specialists. Candidates targeting central recruitment for <strong>AIIMS Radiographer</strong>, <strong>RRB X-Ray Technician</strong>, and state health directorate imaging posts must excel in Radiation Physics, Diagnostic Radiographic Positioning, Computed Tomography (CT), and Magnetic Resonance Imaging (MRI).
              </p>
              <p>
                Inside <strong>Radiographer &amp; X-Ray Technician NCBT One</strong>, students practice full-length CBT mocks, radiation safety quizzes, and image-based diagnostic questions without annoying popups or ad traps.
              </p>
            </div>
          </section>

          {/* 6. LAB TECHNICIAN NCBT ONE */}
          <section id="lab-technician" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">🧪</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Lab Technician NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting DMLT, BMLT, AIIMS Pathology &amp; RRB Lab Assistant
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Lab Technician NCBT One</strong> serves DMLT and BMLT medical laboratory professionals seeking government appointments across AIIMS, Railway Recruitment Boards, and state pathology departments. Competitive exams for <strong>AIIMS Medical Laboratory Technologist</strong>, <strong>RRB Lab Assistant</strong>, and <strong>State DMLT Recruitment</strong> evaluate thorough knowledge in Clinical Biochemistry, Hematology, Blood Banking, Medical Microbiology, and Histopathology.
              </p>
              <p>
                With <strong>Lab Technician NCBT One</strong>, candidates get direct, ad-free access to solved PYQs, topic-wise diagnostic practice sets, and full-length CBT exams on a single clean interface.
              </p>
            </div>
          </section>

          {/* 7. MEDICAL OFFICER NCBT ONE */}
          <section id="medical-officer" className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 shadow-lg space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <span className="text-2xl p-2 bg-[var(--surface)] rounded-2xl border border-[var(--border)]">⚕️</span>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
                  Medical Officer NCBT One
                </h2>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Targeting State MO, UPSC Combined Medical Services (CMS) &amp; NHM
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-[var(--text2)] space-y-3 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                <strong>Medical Officer NCBT One</strong> is tailored for MBBS doctors and medical professionals preparing for government healthcare leadership posts. Examinations such as <strong>UPSC Combined Medical Services (CMS)</strong>, <strong>State Public Service Commission Medical Officer (MO) Recruitment</strong>, and <strong>NHM Medical Officer Screening Tests</strong> require rapid recall in General Medicine, Pediatrics, Surgery, Obstetrics &amp; Gynecology, and Preventive &amp; Social Medicine (PSM).
              </p>
              <p>
                Through <strong>Medical Officer NCBT One</strong>, candidates access high-yield clinical case questions, official previous year question banks, and timed full-scale CBT simulations.
              </p>
            </div>
          </section>

        </div>

        {/* ==================== E) FEATURES SECTION ==================== */}
        <div className="border-t border-[var(--border)] pt-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-[var(--surface-2)] px-3 py-1 rounded-full border border-[var(--border)]">
              THE NCBT ONE ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Designed for Pure Performance &amp; Focus
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text2)] max-w-xl mx-auto">
              Every tool and view inside NCBT One is built around speed, clarity, and deep diagnostic retention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1 */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 hover:border-slate-400/50 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/15 text-slate-300 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">All Your Tests, One Place</h3>
              <p className="text-xs text-[var(--text2)] leading-relaxed">
                Full mock tests, solved past year question sets, and speed sprints for your exact profession and target exam — with zero page-hopping.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 hover:border-slate-400/50 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/15 text-slate-300 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">Personalized Dashboard</h3>
              <p className="text-xs text-[var(--text2)] leading-relaxed">
                A dedicated, ad-free learning space per student showing overall syllabus coverage, test history, and daily target goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 hover:border-slate-400/50 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/15 text-slate-300 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">Performance Analytics</h3>
              <p className="text-xs text-[var(--text2)] leading-relaxed">
                Comprehensive accuracy trends, weak-topic diagnostics, and comparison charts tracking improvement across mock attempts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 hover:border-slate-400/50 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/15 text-slate-300 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-sm font-black text-[var(--text-primary)]">Study Resources</h3>
              <p className="text-xs text-[var(--text2)] leading-relaxed">
                High-yield clinical notes, pharmaceutical charts, and downloadable PDFs (expanding continuously over time).
              </p>
            </div>

          </div>
        </div>

        {/* ==================== F) CLOSING ==================== */}
        <div className="bg-gradient-to-r from-[var(--surface-2)] via-[var(--card)] to-[var(--surface-2)] border border-[var(--border)] rounded-3xl p-8 md:p-10 text-center space-y-5 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] text-slate-300 flex items-center justify-center mx-auto border border-[var(--border)]">
            <Sparkles className="w-6 h-6 text-slate-300" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              NCBT One — Medical &amp; Paramedical Prep
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text2)] leading-relaxed">
              Experience focused, distraction-free computer-based practice tailored for your exact profession.
            </p>
          </div>

          {/* Return Home Button */}
          <div className="pt-2">
            <button
              onClick={() => showPage("landing")}
              className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 shadow-md hover:scale-105"
            >
              <span>← Return to NCBT Home</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
