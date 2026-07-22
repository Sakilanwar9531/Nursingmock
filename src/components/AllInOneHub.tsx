import React, { useState } from "react";
import { 
  Sparkles, 
  User as UserIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Target, 
  GraduationCap, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  Edit3, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  HelpCircle,
  FileText,
  Activity,
  Stethoscope,
  Pill,
  Search
} from "lucide-react";
import { User as UserType, Test, Subject } from "../types";

interface AllInOneHubProps {
  currentUser: UserType;
  onUpdateProfile: (updated: Partial<UserType>) => void;
  onStartTest: (subjectId: string, testId: string) => void;
  onNavigatePage: (pageId: string) => void;
  subjects: Subject[];
}

export const AllInOneHub: React.FC<AllInOneHubProps> = ({
  currentUser,
  onUpdateProfile,
  onStartTest,
  onNavigatePage,
  subjects
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser.name || "");
  const [editStudentType, setEditStudentType] = useState(currentUser.studentType || "Nursing");
  const [editDesiredPost, setEditDesiredPost] = useState(currentUser.desiredPost || "AIIMS NORCET Nursing Officer");
  const [editState, setEditState] = useState(currentUser.state || "West Bengal");
  const [editPin, setEditPin] = useState(currentUser.pin || "700001");
  const [editPhone, setEditPhone] = useState(currentUser.phone || "9830000000");

  const [activeCourseTab, setActiveCourseTab] = useState<string>(
    currentUser.studentType || "Nursing"
  );

  const [tickerSearch, setTickerSearch] = useState<string>("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      studentType: editStudentType,
      desiredPost: editDesiredPost,
      state: editState,
      pin: editPin,
      phone: editPhone
    });
    setActiveCourseTab(editStudentType);
    setIsEditingProfile(false);
  };

  // Course specific ticker exam data
  const tickerExamsMap: Record<string, Array<{ id: string; name: string; tag: string; badge: string; icon: string }>> = {
    Nursing: [
      { id: "norcet", name: "AIIMS NORCET 2026 Stage I & II", tag: "Central Govt", badge: "HOT", icon: "🔥" },
      { id: "wbhrb", name: "WBHRB Staff Nurse Grade II", tag: "West Bengal", badge: "URGENT", icon: "🏥" },
      { id: "esic", name: "ESIC Nursing Officer Recruitment", tag: "ESIC Central", badge: "POPULAR", icon: "⚡" },
      { id: "rrb", name: "RRB Staff Nurse CBT Mock", tag: "Railways", badge: "NEW", icon: "🚑" },
      { id: "cho", name: "NHM / CHO Community Health Officer", tag: "State NHM", badge: "ACTIVE", icon: "🩺" },
      { id: "dsssb", name: "DSSSB Nursing Officer Delhi", tag: "Delhi Govt", badge: "TOP", icon: "🏛️" },
      { id: "jipmer", name: "JIPMER Staff Nurse CBT", tag: "Central Govt", badge: "FREE", icon: "🎓" },
      { id: "sgpgi", name: "SGPGI Nursing Officer Exam", tag: "UP State", badge: "PYQ", icon: "📋" }
    ],
    Pharmacist: [
      { id: "rrb-pharm", name: "RRB Pharmacist Grade III CBT", tag: "Railways", badge: "HOT", icon: "💊" },
      { id: "esic-pharm", name: "ESIC Hospital Pharmacist Mock", tag: "ESIC Central", badge: "POPULAR", icon: "🏥" },
      { id: "cghs", name: "CGHS Pharmacist Recruitment", tag: "Central Govt", badge: "NEW", icon: "⚡" },
      { id: "di", name: "State Drug Inspector Examination", tag: "Gazetted Officer", badge: "HIGH YIELD", icon: "🔬" },
      { id: "aiims-pharm", name: "AIIMS Pharmacist CBT Series", tag: "AIIMS", badge: "ACTIVE", icon: "🎓" },
      { id: "wbhrb-pharm", name: "WBHRB Pharmacist Recruitment", tag: "West Bengal", badge: "URGENT", icon: "🏛️" },
      { id: "gpat", name: "GPAT & NIPER Pharmacology Drill", tag: "National", badge: "PYQ", icon: "📖" }
    ],
    Paramedical: [
      { id: "dmlt", name: "DMLT Clinical Pathology Mock", tag: "Lab Science", badge: "HOT", icon: "🔬" },
      { id: "radio", name: "Radiographer & X-Ray Technician CBT", tag: "Imaging Tech", badge: "POPULAR", icon: "📸" },
      { id: "ot", name: "OT Assistant & Surgical Tech Paper", tag: "Surgery Dept", badge: "ACTIVE", icon: "🩺" },
      { id: "ophth", name: "Ophthalmic Assistant Officer Exam", tag: "Eye Care", badge: "NEW", icon: "👁️" },
      { id: "ecg", name: "ECG Specialist & Cardiology Assistant", tag: "Cardiac Tech", badge: "FREE", icon: "🫀" },
      { id: "dialysis", name: "Dialysis Technician Board Paper", tag: "Nephrology", badge: "HIGH YIELD", icon: "🩸" }
    ],
    "Lab Technician": [
      { id: "esic-lab", name: "ESIC Senior Lab Technician CBT", tag: "Central Govt", badge: "HOT", icon: "🧪" },
      { id: "aiims-lab", name: "AIIMS Technical Officer Pathology", tag: "AIIMS", badge: "TOP", icon: "🏥" },
      { id: "state-lab", name: "State Health Dept Lab Assistant", tag: "State Health", badge: "ACTIVE", icon: "🔬" },
      { id: "rrb-lab", name: "Railway Medical Lab Assistant", tag: "Railways", badge: "NEW", icon: "🚑" }
    ]
  };

  const currentTickerExams = tickerExamsMap[activeCourseTab] || tickerExamsMap["Nursing"];

  // Find tests relevant to current active course
  const mockSubject = subjects.find(s => s.id === "mock_tests");
  const availableMocks = mockSubject?.tests || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 font-sans">
      
      {/* HEADER HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
            <span>Personalized All-in-ONE Student Hub</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Welcome back, <span className="text-emerald-400">{currentUser.name || "Aspirant"}</span> 👋
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Your target-focused portal for <strong className="text-white">{currentUser.desiredPost || "Government Health Recruitment"}</strong>. Tailored mock tests, syllabus breakdowns, and high-yield question drills designed specifically for your career.
              </p>
            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Update Student Profile</span>
            </button>
          </div>

          {/* STUDENT PROFILE CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-extrabold text-sm">
                🎓
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Course / Category</span>
                <p className="text-xs font-black text-white truncate">{currentUser.studentType || "Nursing Aspirant"}</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-extrabold text-sm">
                🎯
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Desired Govt Post</span>
                <p className="text-xs font-black text-white truncate">{currentUser.desiredPost || "AIIMS NORCET Nursing Officer"}</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-extrabold text-sm">
                📍
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Location & PIN</span>
                <p className="text-xs font-black text-white truncate">{currentUser.state || "West Bengal"} ({currentUser.pin || "700001"})</p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 font-extrabold text-sm">
                📱
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Reg Contact</span>
                <p className="text-xs font-black text-white truncate">{currentUser.phone || currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-emerald-500" />
                <h3 className="text-lg font-black text-[var(--text-primary)]">Edit Student Registration Profile</h3>
              </div>
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">Course / Student Category</label>
                  <select 
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                    value={editStudentType}
                    onChange={e => setEditStudentType(e.target.value)}
                  >
                    <option value="Nursing">🩺 Nursing (B.Sc / GNM / M.Sc)</option>
                    <option value="Pharmacist">💊 Pharmacist (D.Pharm / B.Pharm)</option>
                    <option value="Paramedical">🔬 Paramedical & OT Technician</option>
                    <option value="Lab Technician">🧪 Lab Technician (DMLT / BMLT)</option>
                    <option value="Radiographer">📸 Radiographer & X-Ray</option>
                    <option value="Medical Officer">👨‍⚕️ Medical Officer & CHO</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">Desired Government Post</label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. AIIMS NORCET Nursing Officer / RRB Pharmacist"
                  value={editDesiredPost}
                  onChange={e => setEditDesiredPost(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">State / Region</label>
                  <select 
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                    value={editState}
                    onChange={e => setEditState(e.target.value)}
                  >
                    <option value="West Bengal">West Bengal</option>
                    <option value="Delhi">Delhi / NCR</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="All India">All India / Central Govt</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-secondary)] mb-1 block">PIN Code</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
                    value={editPin}
                    onChange={e => setEditPin(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  Save Profile Details
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-3 bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SWIPEABLE / SCROLLABLE STATIC TICKER STRIP BELOW PROFILE */}
      <div className="space-y-3 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">
              {activeCourseTab} Government Exams & Active Test Series Ticker
            </h3>
          </div>

          {/* COURSE SELECTOR TAB PILLS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["Nursing", "Pharmacist", "Paramedical", "Lab Technician"].map((course) => (
              <button
                key={course}
                onClick={() => setActiveCourseTab(course)}
                className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  activeCourseTab === course
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* SWIPEABLE TICKER STRIP */}
        <div className="relative overflow-hidden group">
          <div className="flex items-center gap-3 overflow-x-auto py-3 px-1 scrollbar-thin scroll-smooth select-none">
            {currentTickerExams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => onNavigatePage("find_test")}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--surface-2)] hover:bg-emerald-500/10 border border-[var(--border)] hover:border-emerald-500/40 transition-all cursor-pointer shrink-0 shadow-sm group/item"
              >
                <span className="text-lg">{exam.icon}</span>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[var(--text-primary)] group-hover/item:text-emerald-500 transition-colors">
                      {exam.name}
                    </span>
                    <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-500 rounded border border-amber-500/30">
                      {exam.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] font-semibold">
                    {exam.tag} • Tap to view series
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] group-hover/item:text-emerald-500 transition-colors ml-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY-TAILORED UNIQUE SECTIONS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Tailored All-in-ONE Modules for {activeCourseTab}</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Comprehensive exam syllabus, high-yield practice modules, and real CBT simulations.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("find_test")}
            className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* NURSING SPECIFIC SECTION */}
        {activeCourseTab === "Nursing" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                🩺
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">NORCET Stage-1 & 2 Clinical Drills</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                NCLEX & NORCET pattern scenario questions with verified rationales, drug dosages, and nursing care priorities.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all cursor-pointer"
              >
                Launch Clinical Drills
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                🏥
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">WBHRB & ESIC Staff Nurse Mocks</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Timed 100-question full mock exams adhering to West Bengal Health & ESIC central guidelines.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Start WBHRB Mock
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                📖
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Nursing Subject Mastery Cards</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Anatomy, Physiology, Pharmacology, Midwifery, Pediatric & Psychiatric Nursing quick summaries.
              </p>
              <button 
                onClick={() => onNavigatePage("subject_mocks")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Explore Subject Tests
              </button>
            </div>
          </div>
        )}

        {/* PHARMACIST SPECIFIC SECTION */}
        {activeCourseTab === "Pharmacist" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                💊
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">RRB & ESIC Pharmacist Mocks</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Full CBT mock tests covering Pharmaceutics, Pharmacology, Drug Laws, and General Ability.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs transition-all cursor-pointer"
              >
                Start Pharmacist CBT
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                🔬
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Drug Inspector Exam Suite</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                High-level MCQs on Drug & Cosmetics Act 1940, Jurisprudence, and Pharmaceutical Analysis.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Practice DI Drills
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                🧪
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Dosage & Formula Simulator</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Posology calculations, prescription interpretation, and drug stability formulas.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Solve Calculations
              </button>
            </div>
          </div>
        )}

        {/* PARAMEDICAL & LAB TECH SPECIFIC SECTION */}
        {(activeCourseTab === "Paramedical" || activeCourseTab === "Lab Technician") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-blue-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                🔬
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Clinical Pathology & DMLT CBT</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Hematology, Blood Banking, Clinical Biochemistry & Histopathology question banks.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all cursor-pointer"
              >
                Start Lab Tech Paper
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                📸
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Radiography & Imaging Mocks</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Radiation physics, CT/MRI protocols, and X-ray positioning question sets.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Practice Radiography
              </button>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                🩺
              </div>
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">OT & Surgical Tech Modules</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Sterilization protocols, surgical instrumentation, and anesthesia equipment drills.
              </p>
              <button 
                onClick={() => onNavigatePage("find_test")}
                className="w-full py-2.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-extrabold text-xs transition-all cursor-pointer"
              >
                Start OT Tech Test
              </button>
            </div>
          </div>
        )}

        {/* RECOMMENDED TEST SERIES LIST */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Recommended Active Practice Tests ({availableMocks.length})</span>
            </h3>
            <span className="text-xs font-bold text-emerald-500">100% Free Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableMocks.map((test) => (
              <div 
                key={test.id}
                className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{test.icon || "📋"}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
                      {test.ready ? "READY" : "UPCOMING"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
                    {test.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {test.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[var(--border)]/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                    {test.questions} Qs • {test.mins} Mins
                  </span>
                  <button
                    onClick={() => onStartTest("mock_tests", test.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all cursor-pointer shadow-sm"
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
