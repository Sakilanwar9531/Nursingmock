import { useState, useRef } from "react";
import {
  ArrowLeft, Download, ChevronDown, ChevronUp, Clock, CheckCircle2,
  XCircle, HelpCircle, Trophy, Target, Percent, ListChecks, BarChart3
} from "lucide-react";

/* ---------------- TYPES ---------------- */
export interface QuestionResult {
  id: string;
  index: number;
  text: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null; // null = unattempted
  timeTakenSec: number;
  pctGotRight: number;
  solution: string;
  status: "correct" | "incorrect" | "unattempted" | "overtime";
}

export interface AnalysisData {
  testName: string;
  rank: number;
  totalCandidates: number;
  score: number;
  maxScore: number;
  averageScore: number;
  bestScore: number;
  percentile: number;
  accuracy: number;
  attempted: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  topperScore: number;
  questions: QuestionResult[];
}

const TABS = [
  { key: "analysis",  label: "Analysis",    icon: BarChart3 },
  { key: "solutions", label: "Solutions",   icon: ListChecks },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy },
] as const;
type TabKey = typeof TABS[number]["key"];

const METRICS = ["Score", "Accuracy", "Attempt", "Correct", "Incorrect", "Time"] as const;
type MetricKey = typeof METRICS[number];

/* =================================================================== */
export default function ResultAnalysisPage({
  data,
  onBack,
}: {
  data: AnalysisData;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("analysis");
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = (section: "analysis" | "solutions") => {
    // Print-based PDF export — no extra dependency required.
    // Adds a temporary class so print CSS (below) shows only the relevant section.
    document.body.setAttribute("data-print-section", section);
    window.print();
    setTimeout(() => document.body.removeAttribute("data-print-section"), 500);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* HEADER */}
      <div
        className="flex items-center gap-3 px-4 py-3 sticky top-0 z-30 no-print"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
      >
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{ background: "var(--surface-2)" }}>
          <ArrowLeft size={16} style={{ color: "var(--text-primary)" }} />
        </button>
        <span className="flex-1 min-w-0 truncate text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>
          {data.testName}
        </span>
      </div>

      {/* TABS */}
      <div className="flex gap-1 px-4 pt-3 no-print">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-t-lg text-[12.5px] font-semibold border-b-2 cursor-pointer transition-colors"
              style={{
                borderBottomColor: active ? "var(--primary)" : "transparent",
                color: active ? "var(--primary)" : "var(--text-secondary)",
              }}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div ref={printRef} className="px-4 py-4">
        {activeTab === "analysis" && <AnalysisTab data={data} onDownload={() => handleDownload("analysis")} />}
        {activeTab === "solutions" && <SolutionsTab questions={data.questions} onDownload={() => handleDownload("solutions")} />}
        {activeTab === "leaderboard" && <LeaderboardTab data={data} />}
      </div>

      {/* PRINT-ONLY CSS: shows only the active exported section cleanly */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body[data-print-section="analysis"] .solutions-only,
          body[data-print-section="solutions"] .analysis-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* =================== ANALYSIS TAB =================== */
function AnalysisTab({ data, onDownload }: { data: AnalysisData; onDownload: () => void }) {
  const [metric, setMetric] = useState<MetricKey>("Score");

  const chartValues: Record<MetricKey, { you: number; topper: number; average: number; max: number }> = {
    Score:     { you: Math.max(data.score, 0), topper: data.topperScore, average: data.averageScore, max: data.maxScore },
    Accuracy:  { you: data.accuracy, topper: 96, average: 58, max: 100 },
    Attempt:   { you: data.attempted, topper: data.totalQuestions, average: Math.round(data.totalQuestions * 0.7), max: data.totalQuestions },
    Correct:   { you: data.correct, topper: data.totalQuestions - 1, average: Math.round(data.totalQuestions * 0.5), max: data.totalQuestions },
    Incorrect: { you: data.incorrect, topper: 1, average: 4, max: data.totalQuestions },
    Time:      { you: 32, topper: 41, average: 36, max: 60 },
  };
  const c = chartValues[metric];

  return (
    <div className="analysis-only flex flex-col gap-4">
      <div className="flex justify-end no-print">
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold cursor-pointer hover:opacity-90"
          style={{ background: "var(--surface-2)", color: "var(--text-primary)" }}
        >
          <Download size={14} /> Download Analysis
        </button>
      </div>

      {/* STAT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox icon={Trophy} label="Rank" value={`${data.rank}`} sub={`of ${data.totalCandidates}`} />
        <StatBox icon={Target} label="Score" value={`${data.score}`} sub={`/ ${data.maxScore}`} />
        <StatBox icon={Percent} label="Percentile" value={`${data.percentile}%`} sub="" />
        <StatBox icon={CheckCircle2} label="Accuracy" value={`${data.accuracy}%`} sub="" />
      </div>

      <div className="rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex justify-between text-[12.5px] mb-2" style={{ color: "var(--text-secondary)" }}>
          <span>Correct: {data.correct}</span>
          <span>Incorrect: {data.incorrect}</span>
          <span>Unattempted: {data.unattempted}</span>
        </div>
        <div className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
          Average score: <b style={{ color: "var(--text-primary)" }}>{data.averageScore}</b> · Best score: <b style={{ color: "var(--text-primary)" }}>{data.bestScore}</b>
        </div>
      </div>

      {/* COMPARE CHART */}
      <div className="rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <p className="text-[13px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Compare</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {METRICS.map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className="px-3 py-1.5 rounded-full text-[11.5px] font-semibold border cursor-pointer transition-all"
              style={{
                background: metric === m ? "var(--primary)" : "transparent",
                color: metric === m ? "#fff" : "var(--text-secondary)",
                borderColor: metric === m ? "var(--primary)" : "var(--border)",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-around h-40">
          {(["you", "average", "topper"] as const).map((k) => {
            const val = c[k];
            const heightPct = Math.max((val / (c.max || 1)) * 100, 3);
            return (
              <div key={k} className="flex flex-col items-center gap-2 w-1/4">
                <span className="text-[11px] font-mono font-bold" style={{ color: "var(--text-primary)" }}>{val}</span>
                <div
                  className="w-10 rounded-t-md transition-all"
                  style={{
                    height: `${heightPct}%`,
                    background: k === "you" ? "var(--primary)" : k === "topper" ? "var(--accent)" : "var(--surface-2)",
                  }}
                />
                <span className="text-[11px] font-semibold capitalize" style={{ color: "var(--text-secondary)" }}>{k}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl p-3.5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={13} style={{ color: "var(--primary)" }} />
        <span className="text-[10.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{label}</span>
      </div>
      <p className="text-[20px] font-black font-mono" style={{ color: "var(--text-primary)" }}>
        {value} <span className="text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>{sub}</span>
      </p>
    </div>
  );
}

/* =================== SOLUTIONS TAB =================== */
function SolutionsTab({ questions, onDownload }: { questions: QuestionResult[]; onDownload: () => void }) {
  const [filter, setFilter] = useState<"all" | "incorrect" | "unattempted" | "overtime">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = {
    all: questions.length,
    incorrect: questions.filter((q) => q.status === "incorrect").length,
    unattempted: questions.filter((q) => q.status === "unattempted").length,
    overtime: questions.filter((q) => q.status === "overtime").length,
  };

  const filtered = filter === "all" ? questions : questions.filter((q) => q.status === filter);

  return (
    <div className="solutions-only flex flex-col gap-3">
      <div className="flex justify-end no-print">
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold cursor-pointer hover:opacity-90"
          style={{ background: "var(--surface-2)", color: "var(--text-primary)" }}
        >
          <Download size={14} /> Download Solutions
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar no-print">
        {(["all", "incorrect", "unattempted", "overtime"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border capitalize cursor-pointer transition-all"
            style={{
              background: filter === f ? "var(--primary)" : "transparent",
              color: filter === f ? "#fff" : "var(--text-secondary)",
              borderColor: filter === f ? "var(--primary)" : "var(--border)",
            }}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.map((q) => (
          <QuestionCard key={q.id} q={q} open={openId === q.id} onToggle={() => setOpenId(openId === q.id ? null : q.id)} />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ q, open, onToggle }: { q: QuestionResult; open: boolean; onToggle: () => void; key?: string | number }) {
  const statusIcon = {
    correct: <CheckCircle2 size={15} style={{ color: "var(--success)" }} />,
    incorrect: <XCircle size={15} style={{ color: "var(--danger)" }} />,
    unattempted: <HelpCircle size={15} style={{ color: "var(--text-secondary)" }} />,
    overtime: <Clock size={15} style={{ color: "var(--accent)" }} />,
  }[q.status];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer">
        <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--surface-2)" }}>
          {statusIcon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            Q{q.index}. {q.text}
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
            {q.timeTakenSec}s · {q.pctGotRight}% got it right
          </p>
        </div>
        {open ? <ChevronUp size={16} style={{ color: "var(--text-secondary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-secondary)" }} />}
      </button>

      {open && (
        <div className="px-4 pb-4">
          <p className="text-[14px] font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{q.text}</p>
          <div className="flex flex-col gap-2 mb-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelectedWrong = i === q.selectedIndex && i !== q.correctIndex;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px]"
                  style={{
                    background: isCorrect ? "color-mix(in srgb, var(--success) 12%, var(--surface))"
                      : isSelectedWrong ? "color-mix(in srgb, var(--danger) 12%, var(--surface))"
                      : "var(--surface-2)",
                    border: `1px solid ${isCorrect ? "var(--success)" : isSelectedWrong ? "var(--danger)" : "var(--border)"}`,
                    color: "var(--text-primary)",
                  }}
                >
                  <span className="font-bold shrink-0">{i + 1}.</span>
                  <span className="flex-1">{opt}</span>
                  {isCorrect && <CheckCircle2 size={14} style={{ color: "var(--success)" }} />}
                  {isSelectedWrong && <XCircle size={14} style={{ color: "var(--danger)" }} />}
                </div>
              );
            })}
          </div>
          <div className="rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: "var(--primary)" }}>Solution</p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{q.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* =================== LEADERBOARD TAB =================== */
function LeaderboardTab({ data }: { data: AnalysisData }) {
  return (
    <div className="rounded-2xl p-8 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
      <Trophy size={26} style={{ color: "var(--primary)", margin: "0 auto" }} />
      <p className="text-[14px] font-bold mt-3" style={{ color: "var(--text-primary)" }}>
        You ranked {data.rank} of {data.totalCandidates}
      </p>
      <p className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
        Full leaderboard view coming soon.
      </p>
    </div>
  );
}
