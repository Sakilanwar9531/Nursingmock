import { useState } from "react";
import {
  Search, Mic, FileText, Target, Zap, BookOpen,
  GraduationCap, Pill, TestTube2, Radiation, Scissors,
  HeartPulse, Activity, Stethoscope, ChevronRight, Flame,
  Menu, ArrowRight, Award
} from "lucide-react";
import { NCBTOneSidebar, PROFESSIONS } from "./NCBTOneSidebar";
import { TARGET_EXAMS, PYQ_DATA } from "../data";

/* ---------- DATA ---------- */
const STORE_TABS = [
  { key: "nursing",  label: "Nursing",   slug: "nursing",  tint: "#7C3AED" }, // violet
  { key: "pharma",   label: "Pharmacy",  slug: "pharma",   tint: "#0EA5A6" }, // teal
  { key: "lab",      label: "Lab Tech",  slug: "lab-technician", tint: "#1E293B" }, // dark
  { key: "physio",   label: "Physio",    slug: "physiotherapist", tint: "#EA580C" }, // orange
];

const CATEGORY_CHIPS = [
  { key: "pyq",    label: "PYQ Zone",     icon: FileText, bg: "#EDE4FB" },
  { key: "mocks",  label: "Mock Arena",   icon: Target,   bg: "#FCE8D6" },
  { key: "quiz",   label: "Quick Quiz",   icon: Zap,      bg: "#FEF3C7" },
  { key: "notes",  label: "Notes",        icon: BookOpen, bg: "#DCFCE7" },
];

interface NCBTOneHubProps {
  onStartTest?: (subjectId: string, testId: string) => void;
  showPage?: (pageId: string, pushHistory?: boolean, customState?: any) => void;
}

export default function NCBTOneHub({ onStartTest, showPage }: NCBTOneHubProps) {
  const [activeStore, setActiveStore] = useState("nursing");
  const [activeCategory, setActiveCategory] = useState("pyq");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const store = STORE_TABS.find(s => s.key === activeStore) || STORE_TABS[0];

  // Dynamically pull real tests matching the store selection
  const getDynamicTestCards = () => {
    let matches = TARGET_EXAMS.filter(exam => {
      const cat = exam.category.toLowerCase();
      if (store.key === "nursing") return cat === "nursing";
      if (store.key === "pharma") return cat === "pharmacist";
      if (store.key === "lab") return cat.includes("lab");
      if (store.key === "physio") return cat.includes("physio") || cat.includes("paramedical");
      return true;
    });

    if (matches.length === 0) matches = TARGET_EXAMS.slice(0, 4);

    return matches.slice(0, 6).map((m, idx) => ({
      id: m.id,
      virtualSubjectId: "virtual",
      virtualTestId: `mock-${m.id}-1`,
      tag: idx % 2 === 0 ? "PYQ · 2024" : "Mock · Full Length",
      title: m.fullName || m.name,
      qs: 100,
      mins: 90,
      attempts: `${(12.4 - idx * 1.8).toFixed(1)}K`,
      badge: idx === 0 ? "HOT" : idx === 1 ? "NEW" : null,
      icon: m.icon || "📋"
    }));
  };

  const testCards = getDynamicTestCards();

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

  const navigateToProfession = (slug: string) => {
    window.history.pushState(null, "", `/ncbt-one/${slug}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="ncbt-one-theme min-h-screen pb-28 text-[var(--n1-text)]" style={{ background: "var(--n1-bg)" }}>
      <NCBTOneSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* HEADER STRIP: streak + login, like Zepto's delivery-time bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3" style={{ background: "var(--n1-surface)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl border border-[var(--n1-border)] hover:bg-[var(--n1-surface-2)] transition-colors cursor-pointer"
            title="Open Sidebar"
          >
            <Menu size={18} style={{ color: store.tint }} />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-[13px] font-bold" style={{ color: "var(--n1-text)" }}>
              <Flame size={14} style={{ color: store.tint }} />
              12-day streak
            </div>
            <div className="text-[11px]" style={{ color: "var(--n1-text-secondary)" }}>
              {store.label} Cadre · Level 7 Prep
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-[var(--n1-border)]" style={{ background: "var(--n1-surface-2)", color: "var(--n1-text-secondary)" }}>
            ⚡ 100% Free CBT
          </span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-extrabold shadow-sm"
            style={{ background: store.tint, color: "#fff" }}
          >
            NC
          </div>
        </div>
      </div>

      {/* STORE-SWITCHER TABS (zepto/monsoon/supermall/cafe equivalent) */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar" style={{ background: "var(--n1-surface)" }}>
        {STORE_TABS.map((s) => {
          const active = activeStore === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActiveStore(s.key)}
              className="shrink-0 px-4 py-2.5 rounded-2xl text-[13px] font-extrabold transition-all cursor-pointer"
              style={{
                background: active ? s.tint : "var(--n1-surface)",
                color: active ? "#fff" : "var(--n1-text)",
                border: active ? "none" : "1px solid var(--n1-border)",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="px-4 py-3">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl shadow-xs"
          style={{ background: "var(--n1-surface)", border: "1px solid var(--n1-border)" }}
        >
          <Search size={17} style={{ color: "var(--n1-text-secondary)" }} />
          <input
            type="text"
            placeholder={`Search "${store.label} NORCET, ESIC PYQ"...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: "var(--n1-text)" }}
          />
          <Mic size={16} style={{ color: store.tint }} />
        </div>
      </div>

      {/* CATEGORY ICON CHIPS (Pharmacy/Decor/Kids equivalent) */}
      <div className="flex gap-4 px-4 pb-4 overflow-x-auto no-scrollbar">
        {CATEGORY_CHIPS.map((c) => {
          const Icon = c.icon;
          const active = activeCategory === c.key;
          return (
            <button 
              key={c.key} 
              onClick={() => {
                setActiveCategory(c.key);
                navigateToProfession(store.slug);
              }} 
              className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform"
                style={{
                  background: c.bg,
                  transform: active ? "scale(1.05)" : "scale(1)",
                  boxShadow: active ? `0 0 0 2px ${store.tint}` : "none",
                }}
              >
                <Icon size={22} style={{ color: store.tint }} />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: "var(--n1-text)" }}>
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* GRADIENT HERO BANNER (Find the Perfect Gift equivalent) */}
      <div className="px-4 mb-5">
        <div
          className="rounded-3xl p-6 relative overflow-hidden shadow-md cursor-pointer"
          onClick={() => navigateToProfession(store.slug)}
          style={{ background: `linear-gradient(135deg, ${store.tint}, ${store.tint}CC)` }}
        >
          <span
            aria-hidden
            className="absolute -right-6 -top-6 w-28 h-28 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <span
            aria-hidden
            className="absolute right-8 bottom-2 w-14 h-14 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <p className="relative text-[22px] font-black leading-tight text-white">
            Master every<br />question type
          </p>
          <p className="relative text-[12px] text-white/80 mt-1">
            PYQs, mocks &amp; drills — one dashboard for {store.label}
          </p>

          <div className="mt-3 relative inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold backdrop-blur-xs">
            <span>Explore {store.label} Hub</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* ALL PROFESSIONS QUICK SELECT GRID */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold flex items-center gap-1.5" style={{ color: "var(--n1-text)" }}>
            <Award size={16} style={{ color: store.tint }} />
            Browse Healthcare Cadres
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--n1-surface-2)", color: "var(--n1-text-secondary)" }}>
            8 Cadres
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROFESSIONS.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.slug}
                onClick={() => navigateToProfession(p.slug)}
                className="p-3 rounded-2xl border border-[var(--n1-border)] flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer text-left"
                style={{ background: "var(--n1-surface)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--n1-surface-2)" }}>
                  <Icon size={16} style={{ color: store.tint }} />
                </div>
                <span className="text-[12px] font-bold truncate" style={{ color: "var(--n1-text)" }}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TEST CARDS ROW (product-card style: image → ADD → price/rating strip) */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold" style={{ color: "var(--n1-text)" }}>
            Trending {store.label} Practice Sets
          </span>
          <button 
            onClick={() => navigateToProfession(store.slug)}
            className="flex items-center text-[12px] font-semibold cursor-pointer" 
            style={{ color: store.tint }}
          >
            See all <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {testCards.map((t) => {
            if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
              <div
                key={t.id}
                className="shrink-0 w-[175px] rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs border border-[var(--n1-border)]"
                style={{ background: "var(--n1-surface)" }}
              >
                <div>
                  <div
                    className="h-20 flex items-center justify-center relative"
                    style={{ background: "var(--n1-surface-2)" }}
                  >
                    <span className="text-3xl">{t.icon}</span>
                    {t.badge && (
                      <span
                        className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: t.badge === "HOT" ? "#DC2626" : store.tint }}
                      >
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-semibold" style={{ color: "var(--n1-text-secondary)" }}>
                      {t.tag}
                    </span>
                    <p className="text-[13px] font-bold leading-snug mt-0.5 mb-2 line-clamp-2" style={{ color: "var(--n1-text)" }}>
                      {t.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] mb-2" style={{ color: "var(--n1-text-secondary)" }}>
                      <span>{t.qs} Qs · {t.mins} min</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => handleStartTestClick(t.virtualSubjectId, t.virtualTestId)}
                    className="w-full py-2 rounded-xl text-[12px] font-bold cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
                    style={{ background: store.tint, color: "#fff" }}
                  >
                    START
                  </button>
                  <p className="text-[10px] mt-1.5 text-center" style={{ color: "var(--n1-text-secondary)" }}>
                    {t.attempts} attempts
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FLOATING "CONTINUE" PILL (View Cart equivalent) */}
      <div className="fixed bottom-20 left-4 right-4 z-30 max-w-lg mx-auto">
        <button
          onClick={() => handleStartTestClick("virtual", "mock-aiims-norcet-1")}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl shadow-xl cursor-pointer transition-all hover:scale-[1.01]"
          style={{ background: store.tint }}
        >
          <span className="flex items-center gap-2 text-white font-bold text-[14px]">
            <Target size={16} />
            Resume: AIIMS NORCET CBT Q14/100
          </span>
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>

      {/* BOTTOM NAV (Home/Categories/Buy Again/Cafe/District equivalent) */}
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2.5 z-30 shadow-lg"
        style={{ background: "var(--n1-surface)", borderTop: "1px solid var(--n1-border)" }}
      >
        {[
          { icon: GraduationCap, label: "Home", action: () => navigateToProfession("nursing") },
          { icon: FileText, label: "PYQs", action: () => navigateToProfession(store.slug) },
          { icon: Target, label: "Mocks", action: () => navigateToProfession(store.slug) },
          { icon: Activity, label: "Progress", action: () => setSidebarOpen(true) },
        ].map((n, i) => (
          <button key={i} onClick={n.action} className="flex flex-col items-center gap-0.5 cursor-pointer">
            <n.icon size={19} style={{ color: i === 0 ? store.tint : "var(--n1-text-secondary)" }} />
            <span className="text-[10px] font-semibold" style={{ color: i === 0 ? store.tint : "var(--n1-text-secondary)" }}>
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
