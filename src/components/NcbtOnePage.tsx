import React, { useState } from "react";
import { 
  Menu, 
  Sparkles, 
  Layers, 
  FileText, 
  Target, 
  Zap, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  Pill,
  TestTube2,
  Radiation,
  Scissors,
  HeartPulse,
  Activity,
  Stethoscope,
  BookOpen,
  Award,
  AlertCircle
} from "lucide-react";
import { NCBTOneTopNav } from "./NCBTOneTopNav";
import { NCBTOneSidebar, PROFESSIONS } from "./NCBTOneSidebar";
import NCBTOneHub from "./NCBTOneHub";
import { TARGET_EXAMS, PYQ_DATA, SUBJECTS } from "../data";

interface NcbtOnePageProps {
  professionSlug?: string | null;
  showPage?: (pageId: string, pushHistory?: boolean, customState?: any) => void;
  onStartTest?: (subjectId: string, testId: string) => void;
}

export const NcbtOnePage: React.FC<NcbtOnePageProps> = ({ 
  professionSlug, 
  showPage,
  onStartTest 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pyq");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentProfession = PROFESSIONS.find(p => p.slug === professionSlug);

  // Helper to trigger test navigation
  const handleStartTestClick = (subjId: string, testId: string) => {
    if (onStartTest) {
      onStartTest(subjId, testId);
    } else if (showPage) {
      showPage("test", true, { subjectId: subjId, testId: testId });
    } else {
      window.history.pushState({ page: "test", subjectId: subjId, testId: testId }, "", `/test/${subjId}/${testId}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  // Helper to open exam page
  const handleExamClick = (examId: string) => {
    if (showPage) {
      showPage("exam_landing", true, { examId: examId });
    } else {
      window.history.pushState({ page: "exam_landing", examId: examId }, "", `/exams/${examId}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  // Filter exams by profession slug match
  const getMatchingExams = () => {
    if (!currentProfession) return [];
    const catMatch = currentProfession.categoryMatch.toLowerCase();
    
    return TARGET_EXAMS.filter(exam => {
      const examCat = exam.category.toLowerCase();
      if (currentProfession.slug === "nursing") return examCat === "nursing";
      if (currentProfession.slug === "pharma") return examCat === "pharmacist";
      if (currentProfession.slug === "lab-technician") return examCat === "lab tech" || examCat === "lab technician";
      if (currentProfession.slug === "radiographer") return examCat === "radiographer";
      if (currentProfession.slug === "ot-technician") return examCat === "paramedical" || examCat === "ot technician";
      if (currentProfession.slug === "medical-officer") return examCat === "medical officer";
      return examCat === catMatch;
    });
  };

  const matchingExams = getMatchingExams();

  // Pull matching PYQs for matching exams
  const getMatchingPYQs = () => {
    if (matchingExams.length === 0) return [];
    const examIds = matchingExams.map(e => e.id.toLowerCase());
    return PYQ_DATA.filter(p => {
      const tag = p.tag.toLowerCase();
      return examIds.some(eId => eId.includes(tag) || tag.includes(eId) || (currentProfession?.slug === "nursing" && tag.includes("norcet")));
    });
  };

  const matchingPYQs = getMatchingPYQs();

  // Render Hub Landing Page if no specific profession slug is selected
  if (!professionSlug) {
    return <NCBTOneHub onStartTest={onStartTest} showPage={showPage} />;
  }

  // Render DEDICATED PROFESSION PAGE (/ncbt-one/:profession)
  return (
    <div className="ncbt-one-theme min-h-screen text-[var(--n1-text)] font-sans pb-24" style={{ background: "var(--n1-bg)" }}>
      <NCBTOneSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* TOP PROFESSION HEADER */}
      <header className="px-4 py-3 border-b border-[var(--n1-border)] flex items-center justify-between sticky top-0 z-40 backdrop-blur-md" style={{ background: "var(--n1-surface)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-[var(--n1-surface-2)] transition-colors cursor-pointer border border-[var(--n1-border)]"
            title="Open Professions Sidebar"
          >
            <Menu size={18} style={{ color: "var(--n1-primary)" }} />
          </button>
          
          <button
            onClick={() => {
              window.history.pushState(null, "", "/ncbt-one");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-[var(--n1-border)] cursor-pointer hover:bg-[var(--n1-surface-2)] transition-colors"
            style={{ color: "var(--n1-text)" }}
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Hub</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold tracking-tight truncate max-w-[180px] sm:max-w-xs" style={{ color: "var(--n1-text)" }}>
              {currentProfession ? currentProfession.label : "Profession"} NCBT One
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: "var(--n1-surface-2)", color: "var(--n1-primary)" }}>
            {matchingExams.length > 0 ? `${matchingExams.length} Series` : "Coming Soon"}
          </span>
        </div>
      </header>

      {/* ZEPTAL-STYLE STICKY TOP NAV */}
      <NCBTOneTopNav 
        onSearch={(q) => setSearchQuery(q)}
        onTabChange={(t) => setActiveTab(t)}
        onFilterChange={(f) => setActiveFilter(f)}
        activeTab={activeTab}
        activeFilter={activeFilter}
      />

      {/* PROFESSION CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">

        {/* CASE A: NO DATA FOR PROFESSION -> STRICT "COMING SOON" EMPTY STATE */}
        {matchingExams.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl border border-[var(--n1-border)] text-center space-y-4 max-w-2xl mx-auto my-12" style={{ background: "var(--n1-surface)" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-[var(--n1-border)]" style={{ background: "var(--n1-surface-2)" }}>
              <AlertCircle size={32} style={{ color: "var(--n1-accent)" }} />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider" style={{ background: "var(--n1-surface-2)", color: "var(--n1-primary)" }}>
                Upcoming Cadre
              </span>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: "var(--n1-text)" }}>
                {currentProfession ? currentProfession.label : "This Cadre"} Test Series Coming Soon
              </h2>
              <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed" style={{ color: "var(--n1-text-secondary)" }}>
                We are actively curating board-level previous year papers and high-yield CBT mock tests specifically for {currentProfession ? currentProfession.label : "this profession"}. Check back soon for full access!
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/ncbt-one");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                style={{ background: "var(--n1-primary)" }}
              >
                Return to NCBT One Hub
              </button>
            </div>
          </div>
        ) : (
          /* CASE B: REAL EXAM DATA EXISTS FOR THIS PROFESSION */
          <div className="space-y-8">

            {/* TAB 1: PYQ ZONE */}
            {(activeTab === "pyq" || activeFilter === "pyq" || activeFilter === "all") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--n1-border)] pb-2">
                  <h3 className="text-base font-black flex items-center gap-2" style={{ color: "var(--n1-text)" }}>
                    <FileText size={18} style={{ color: "var(--n1-accent)" }} />
                    <span>{currentProfession?.label} PYQ Zone</span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-500">100% Verified Papers</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingPYQs.length > 0 ? (
                    matchingPYQs.map((pyq, idx) => {
                      const pyqVirtualId = `pyq-${pyq.tag}-${pyq.year}`.toLowerCase();
                      if (searchQuery && !pyq.exam.toLowerCase().includes(searchQuery.toLowerCase())) return null;

                      return (
                        <div
                          key={idx}
                          className="rounded-2xl p-4 border border-[var(--n1-border)] flex flex-col justify-between space-y-3 hover:shadow-md transition-all"
                          style={{ background: "var(--n1-surface)" }}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "var(--n1-surface-2)", color: "var(--n1-primary)" }}>
                                {pyq.year} Official PYQ
                              </span>
                              <span className="text-[11px] font-bold" style={{ color: "var(--n1-text-secondary)" }}>
                                {pyq.tag.toUpperCase()}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold line-clamp-2" style={{ color: "var(--n1-text)" }}>
                              {pyq.exam}
                            </h4>
                            <p className="text-xs line-clamp-2" style={{ color: "var(--n1-text-secondary)" }}>
                              Board Previous Year Question Paper
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[var(--n1-border)] flex items-center justify-between">
                            <span className="text-xs font-medium" style={{ color: "var(--n1-text-secondary)" }}>
                              {pyq.count} Questions
                            </span>
                            <button
                              onClick={() => handleStartTestClick("virtual", pyqVirtualId)}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
                              style={{ background: "var(--n1-primary)" }}
                            >
                              Attempt PYQ
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full p-6 rounded-2xl border border-[var(--n1-border)] text-center text-xs" style={{ background: "var(--n1-surface)", color: "var(--n1-text-secondary)" }}>
                      Board-level official PYQ papers for {currentProfession?.label} are being verified and mapped. Check mock test series below!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MOCK ARENA */}
            {(activeTab === "mocks" || activeFilter === "mocks" || activeFilter === "all") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--n1-border)] pb-2">
                  <h3 className="text-base font-black flex items-center gap-2" style={{ color: "var(--n1-text)" }}>
                    <Target size={18} style={{ color: "var(--n1-primary)" }} />
                    <span>{currentProfession?.label} Mock Test Series</span>
                  </h3>
                  <span className="text-xs font-bold" style={{ color: "var(--n1-text-secondary)" }}>
                    {matchingExams.length} Series Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingExams.map((exam) => {
                    if (searchQuery && !exam.name.toLowerCase().includes(searchQuery.toLowerCase())) return null;

                    return (
                      <div
                        key={exam.id}
                        onClick={() => handleExamClick(exam.id)}
                        className="rounded-2xl p-5 border border-[var(--n1-border)] flex flex-col justify-between space-y-4 hover:shadow-md transition-all cursor-pointer group"
                        style={{ background: "var(--n1-surface)" }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{exam.icon || "📋"}</span>
                            {exam.badge && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ background: "var(--n1-accent)" }}>
                                🔥 {exam.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-extrabold group-hover:underline transition-colors" style={{ color: "var(--n1-text)" }}>
                            {exam.fullName || exam.name}
                          </h4>
                          <p className="text-xs line-clamp-2" style={{ color: "var(--n1-text-secondary)" }}>
                            {exam.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--n1-border)] flex items-center justify-between text-xs font-bold" style={{ color: "var(--n1-primary)" }}>
                          <span>Explore Mock Series →</span>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: QUICK QUIZ & SPEED DRILLS */}
            {(activeTab === "quiz" || activeTab === "drills") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--n1-border)] pb-2">
                  <h3 className="text-base font-black flex items-center gap-2" style={{ color: "var(--n1-text)" }}>
                    <Zap size={18} style={{ color: "var(--n1-accent)" }} />
                    <span>Speed Drills &amp; High-Yield Topic Quizzes</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "sprint-curated-1", title: "General Awareness & Current Affairs", mins: 15, qs: 15 },
                    { id: "sprint-curated-2", title: "Reasoning & Quantitative Aptitude", mins: 15, qs: 15 },
                    { id: "sprint-curated-3", title: "Clinical Pharmacology & Safety", mins: 20, qs: 20 },
                  ].map((sprint) => (
                    <div
                      key={sprint.id}
                      className="rounded-2xl p-4 border border-[var(--n1-border)] space-y-3 flex flex-col justify-between"
                      style={{ background: "var(--n1-surface)" }}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "var(--n1-surface-2)", color: "var(--n1-primary)" }}>
                          Speed Drill
                        </span>
                        <h4 className="text-sm font-bold" style={{ color: "var(--n1-text)" }}>
                          {sprint.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-[var(--n1-border)] flex items-center justify-between">
                        <span className="text-xs" style={{ color: "var(--n1-text-secondary)" }}>
                          ⏱ {sprint.mins} Mins • {sprint.qs} Qs
                        </span>
                        <button
                          onClick={() => handleStartTestClick("virtual", sprint.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
                          style={{ background: "var(--n1-primary)" }}
                        >
                          Start Drill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
