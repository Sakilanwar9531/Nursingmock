import React, { useState } from "react";
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Award,
  BookOpen,
  Filter
} from "lucide-react";
import { Subject, ExamDef } from "../types";
import { TARGET_EXAMS } from "../data";

interface FindTestPageProps {
  initialCategory?: string;
  onSelectExam?: (examId: string) => void;
  onStartTest?: (subjectId: string, testId: string) => void;
  subjects?: Subject[];
}

export const FindTestPage: React.FC<FindTestPageProps> = ({
  initialCategory = "Nursing",
  onSelectExam,
  onStartTest,
  subjects = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "Nursing");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const courseCategories = [
    { id: "Nursing", label: "Nursing Exams", icon: "🩺" },
    { id: "Pharmacist", label: "Pharmacist Exams", icon: "💊" },
    { id: "Paramedical", label: "Paramedical Exams", icon: "🔬" },
    { id: "Lab Tech", label: "Lab Technician", icon: "🧪" },
    { id: "Radiographer", label: "Radiographer", icon: "📸" },
    { id: "Medical Officer", label: "Medical Officer & Govt", icon: "👨‍⚕️" },
    { id: "all", label: "All Course Exams", icon: "🌐" }
  ];

  // Filter exams based on selectedCategory and searchQuery
  const filteredExams = TARGET_EXAMS.filter((exam) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      exam.name.toLowerCase().includes(q) || 
      exam.fullName.toLowerCase().includes(q) || 
      exam.desc.toLowerCase().includes(q) ||
      exam.category.toLowerCase().includes(q);

    if (selectedCategory !== "all") {
      const catMatches = exam.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && catMatches;
    }

    return matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans pb-24">
      
      {/* HERO SEARCH SECTION */}
      <div className="relative bg-gradient-to-b from-[#0b132b] via-[#081024] to-[#070c18] text-white border-b border-slate-800/60 py-12 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Test Series Portal</span>
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Find Your <span className="text-teal-400">Perfect Mock Test</span> Series in Seconds
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto font-medium">
              Search top government healthcare competitive exams across Nursing, Pharmacist, Paramedical, Lab Tech & Medical Officer.
            </p>
          </div>

          {/* CURVED SEARCH BAR */}
          <div className="max-w-xl mx-auto space-y-2">
            <div className="relative flex items-center bg-[#0e1935] border-2 border-teal-500/40 focus-within:border-teal-400 rounded-full p-1.5 shadow-2xl transition-all">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input 
                type="text" 
                className="w-full bg-transparent px-3 py-1.5 text-xs md:text-sm text-white placeholder-slate-400 font-medium focus:outline-none"
                placeholder="Search exam e.g. AIIMS NORCET, RRB Pharmacist, WBHRB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 mr-1"
                >
                  ✕
                </button>
              )}
              <button 
                onClick={() => {}}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-full font-black text-xs transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* SINGLE PLACE COURSE CATEGORY SELECTOR TICKER */}
          <div className="pt-3">
            <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
              {courseCategories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery("");
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-teal-500 text-slate-950 border-teal-400 font-black shadow-lg scale-105"
                        : "bg-[#0d1830] text-slate-300 border-slate-700 hover:border-teal-500/50 hover:bg-[#122144]"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* COMPACT STATS BANNER - ONE LINE WITH PORTAL DEFAULT CLEAN FONTS */}
      <div className="w-full bg-[var(--surface-2)] border-b border-[var(--border)] py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-black">5000+</span> Mock Tests
          </span>
          <span className="text-[var(--border)] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500 font-black">Upto 10 Yrs</span> PYQ Papers
          </span>
          <span className="text-[var(--border)] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-sky-500 font-black">5K+</span> Tests Attempted
          </span>
          <span className="text-[var(--border)] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-teal-500 font-black">100%</span> Free Access
          </span>
        </div>
      </div>

      {/* EXAM COURSE CARDS GRID (TAZAQUIZ / TESTBOOK STYLE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 space-y-6">
        
        {/* CATEGORY HEADER TITLE */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-black text-[var(--text-primary)]">
              {selectedCategory === "all" ? "All Government Exam Series" : `${selectedCategory} Mock Test Series`}
            </h2>
            <span className="text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
              {filteredExams.length} Series Available
            </span>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              Clear Search Filter ✕
            </button>
          )}
        </div>

        {/* NO RESULTS STATE */}
        {filteredExams.length === 0 ? (
          <div className="text-center py-16 bg-[var(--surface)] rounded-3xl border border-[var(--border)] p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-[var(--text-secondary)] mx-auto opacity-50" />
            <h3 className="text-base font-extrabold text-[var(--text-primary)]">No Exams Found For Your Selection</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
              Try switching course categories or search for keywords like "NORCET", "Pharmacist", "WBHRB" or "DMLT".
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-emerald-500 transition-all shadow-md"
            >
              Show All Course Exams
            </button>
          </div>
        ) : (
          /* RESPONSIVE GRID OF EXAM COURSE BOXES */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => {
                  if (onSelectExam) {
                    onSelectExam(exam.id);
                  }
                }}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/60 rounded-2xl p-5 text-center flex flex-col items-center justify-between space-y-4 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md relative overflow-hidden"
              >
                {/* BADGE IN TOP RIGHT CORNER */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--surface-2)] px-2.5 py-0.5 rounded-md border border-[var(--border)]">
                    {exam.category}
                  </span>
                  {exam.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-amber-500 text-slate-950 shadow-xs">
                      🔥 {exam.badge}
                    </span>
                  )}
                </div>

                {/* EXAM LOGO / ICON BOX (MATCHING ATTACHED DESIGN) */}
                <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-200">
                  {exam.icon || "📋"}
                </div>

                {/* EXAM NAME & SUBTITLE */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {exam.fullName}
                  </h3>
                  <p className="text-[11px] font-bold text-[var(--text-secondary)]">
                    {exam.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 font-normal pt-1 px-1">
                    {exam.desc}
                  </p>
                </div>

                {/* CLICK TO OPEN LANDING PAGE ACTION BUTTON */}
                <div className="w-full pt-2 border-t border-[var(--border)]/60 flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Test Series</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
