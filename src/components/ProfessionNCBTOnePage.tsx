import { useState } from "react";
import {
  Home, FileText, Layers, Target, ClipboardCheck, BookOpen,
  ChevronRight, Lock, Sparkles
} from "lucide-react";

export interface SubjectEntry {
  name: string;
  tests: { id: string; title: string; qCount: number; year?: string; source?: string }[];
}

export interface ProfessionConfig {
  slug: string;
  label: string;
  tint: string;
  pyq: SubjectEntry[];
  topicWise: SubjectEntry[];
  practice: SubjectEntry[];
  mock: SubjectEntry[];
  notes: SubjectEntry[];
}

const TABS = [
  { key: "pyq",      label: "PYQ Zone",      icon: FileText },
  { key: "topic",    label: "Topic Wise",    icon: Layers },
  { key: "practice", label: "Practice Test", icon: Target },
  { key: "mock",     label: "Mock Test",     icon: ClipboardCheck },
  { key: "notes",    label: "Notes",         icon: BookOpen },
] as const;

type TabKey = typeof TABS[number]["key"];

export function ProfessionNCBTOnePage({
  config,
  onStartTest,
  onGoHome,
}: {
  config: ProfessionConfig;
  onStartTest: (testId: string) => void;
  onGoHome: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("pyq");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const dataForTab: SubjectEntry[] =
    activeTab === "pyq" ? config.pyq :
    activeTab === "topic" ? config.topicWise :
    activeTab === "practice" ? config.practice :
    activeTab === "mock" ? config.mock :
    config.notes;

  const selectedSubject = dataForTab.find((s) => s.name === activeSubject) ?? dataForTab[0] ?? null;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "var(--n1-bg)",
        fontFamily: "var(--font-body, 'Inter', sans-serif)",
      }}
    >
      {/* ===== AMBIENT BACKGROUND GRAPHIC ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--n1-primary)" }}
        />
        <div
          className="absolute top-40 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--n1-accent)" }}
        />
      </div>

      {/* ===== FLOATING HOME BUTTON ===== */}
      <button
        onClick={onGoHome}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          background: "color-mix(in srgb, var(--n1-surface) 85%, transparent)",
          border: "1px solid var(--n1-border)",
        }}
      >
        <Home size={17} style={{ color: "var(--n1-primary)" }} />
      </button>

      {/* ===== HERO ===== */}
      <div className="relative px-5 pt-20 pb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={13} style={{ color: "var(--n1-accent)" }} />
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "var(--n1-accent)" }}
          >
            {config.label} Hub
          </span>
        </div>
        <h1
          className="text-[26px] font-black leading-tight"
          style={{ color: "var(--n1-text)", fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)" }}
        >
          Everything {config.label},<br />in one calm space.
        </h1>
        <p className="text-[13px] mt-2 max-w-[85%]" style={{ color: "var(--n1-text-secondary)" }}>
          Papers, drills, and mocks — organized so you never lose your place.
        </p>
      </div>

      {/* ===== FLOATING TAB DOCK (curvy, animated) ===== */}
      <div className="relative px-5 mb-6">
        <div
          className="grid grid-cols-5 gap-1.5 p-2 rounded-[26px] shadow-xl"
          style={{
            background: "var(--n1-surface)",
            border: "1px solid var(--n1-border)",
          }}
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setActiveSubject(null); }}
                className="relative flex flex-col items-center gap-1 py-2.5 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: active
                    ? `linear-gradient(155deg, var(--n1-primary), var(--n1-primary-2))`
                    : "transparent",
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={2.2}
                  style={{ color: active ? "#fff" : "var(--n1-text-secondary)" }}
                  className="transition-transform duration-300"
                />
                <span
                  className="text-[9.5px] font-bold text-center leading-tight"
                  style={{ color: active ? "#fff" : "var(--n1-text-secondary)" }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== MAIN SPLIT: subject ticker + content ===== */}
      <div className="relative flex gap-3 px-5 pb-28">

        {/* VERTICAL SUBJECT TICKER — sticky, pill-style */}
        {dataForTab.length > 0 && (
          <div
            className="w-[100px] shrink-0 sticky top-24 self-start rounded-[22px] p-2 flex flex-col gap-1.5 max-h-[65vh] overflow-y-auto no-scrollbar"
            style={{
              background: "var(--n1-surface)",
              border: "1px solid var(--n1-border)",
            }}
          >
            {dataForTab.map((s) => {
              const active = selectedSubject?.name === s.name;
              return (
                <button
                  key={s.name}
                  onClick={() => setActiveSubject(s.name)}
                  className="relative text-[11px] font-bold text-left px-2.5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: active
                      ? `linear-gradient(155deg, var(--n1-primary), var(--n1-primary-2))`
                      : "var(--n1-surface-2)",
                    color: active ? "#fff" : "var(--n1-text-secondary)",
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        )}

        {/* TEST LIST / EMPTY STATE */}
        <div className="flex-1 flex flex-col gap-3">
          {dataForTab.length === 0 ? (
            <ComingSoonCard tint={config.tint} />
          ) : selectedSubject && selectedSubject.tests.length > 0 ? (
            selectedSubject.tests.map((test, i) => (
              <div
                key={test.id}
                className="rounded-[22px] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "var(--n1-surface)",
                  border: "1px solid var(--n1-border)",
                  animation: `n1-fade-in 0.35s ease ${i * 0.05}s both`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {test.year && (
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "var(--n1-surface-2)", color: "var(--n1-primary)" }}
                    >
                      {test.year}
                    </span>
                  )}
                  {test.source && (
                    <span className="text-[10.5px] font-bold" style={{ color: "var(--n1-text-secondary)" }}>
                      {test.source}
                    </span>
                  )}
                </div>
                <p className="text-[14.5px] font-bold mb-3 leading-snug" style={{ color: "var(--n1-text)" }}>
                  {test.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: "var(--n1-text-secondary)" }}>
                    {test.qCount} Questions
                  </span>
                  <button
                    onClick={() => onStartTest(test.id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-[12.5px] font-bold text-white transition-transform active:scale-95 cursor-pointer"
                    style={{ background: `linear-gradient(135deg, var(--n1-primary), var(--n1-primary-2))` }}
                  >
                    Attempt <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <ComingSoonCard tint={config.tint} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes n1-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function ComingSoonCard({ tint }: { tint: string }) {
  return (
    <div
      className="rounded-[24px] p-10 flex flex-col items-center text-center"
      style={{ background: "var(--n1-surface)", border: "1px dashed var(--n1-border)" }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: "var(--n1-surface-2)" }}
      >
        <Lock size={22} style={{ color: "var(--n1-primary)" }} />
      </div>
      <p className="text-[15px] font-bold" style={{ color: "var(--n1-text)" }}>Coming Soon</p>
      <p className="text-[12.5px] mt-1 max-w-[70%]" style={{ color: "var(--n1-text-secondary)" }}>
        We're building this section — check back shortly.
      </p>
    </div>
  );
}
