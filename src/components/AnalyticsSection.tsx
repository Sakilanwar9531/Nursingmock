import { useMemo, useState } from "react";
import {
  Trophy, Target, Percent, CheckCircle2, TrendingUp, Clock,
  BrainCircuit, AlertTriangle, Zap, ArrowRight, ChevronDown, ChevronUp,
  ShieldCheck, ShieldAlert, ShieldX, Info, Flame, Sparkles, XCircle,
  HelpCircle, Gauge, Activity, RotateCcw, Flag, User, ClipboardList,
  Filter, Award
} from "lucide-react";
import { predictRankAndCutoffZone } from "../utils/rankPredictor";
import { TestSubmissionAnalytics, ErrorType } from "../data/mockAnalyticsSubmission";

const ERROR_LABELS: Record<Exclude<ErrorType, null>, { name: string; tip: string }> = {
  memory_recall_gap: {
    name: "Memory Recall Gap",
    tip: "Factual/guideline review recommended before next mock.",
  },
  clinical_scenario_trap: {
    name: "Clinical Scenario Trap",
    tip: "Watch out for priority intervention & assessment keywords.",
  },
  rushed_error: {
    name: "Rushed Careless Error",
    tip: "Slow down by 5-10s on multi-option select questions.",
  },
};

type CategoryKey = "General" | "OBC" | "EWS" | "SC" | "ST" | "PwD";

const CATEGORY_MAP: Record<CategoryKey, { label: string; multiplier: number }> = {
  General: { label: "General (UR)", multiplier: 1.0 },
  OBC: { label: "OBC", multiplier: 0.88 },
  EWS: { label: "EWS", multiplier: 0.92 },
  SC: { label: "SC", multiplier: 0.78 },
  ST: { label: "ST", multiplier: 0.72 },
  PwD: { label: "PwD", multiplier: 0.60 },
};

const COMPARE_METRICS = ["Score", "Accuracy", "Attempt", "Correct", "Incorrect", "Time"] as const;
type CompareMetric = typeof COMPARE_METRICS[number];

export default function AnalyticsSection({
  submission,
  onGenerateFixItQuiz,
  onReattempt,
}: {
  submission: TestSubmissionAnalytics;
  onGenerateFixItQuiz: (subTopics: string[]) => void;
  onReattempt?: () => void;
}) {
  const { testMeta, questions } = submission;
  const [openQuadrant, setOpenQuadrant] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("General");
  const [selectedMetric, setSelectedMetric] = useState<CompareMetric>("Score");

  const categoryMultiplier = CATEGORY_MAP[selectedCategory].multiplier;

  // Adjusted cutoffs based on category
  const adjustedHistoricalCutoffs = useMemo(() => {
    return testMeta.historicalCutoffs.map((c) => Math.round(c * categoryMultiplier * 10) / 10);
  }, [testMeta.historicalCutoffs, categoryMultiplier]);

  const prediction = useMemo(
    () =>
      predictRankAndCutoffZone({
        netScore: testMeta.netScore,
        maxScore: testMeta.maxScore,
        shiftDifficultyMultiplier: testMeta.shiftDifficultyMultiplier,
        topperAverageScore: testMeta.topperAverageScore,
        totalCandidates: testMeta.totalCandidates,
        historicalCutoffs: adjustedHistoricalCutoffs,
      }),
    [testMeta, adjustedHistoricalCutoffs]
  );

  const attempted = questions.filter((q) => q.status !== "unattempted");
  const correct = questions.filter((q) => q.status === "correct").length;
  const incorrect = questions.filter((q) => q.status === "incorrect").length;
  const unattempted = questions.length - attempted.length;
  const accuracy = attempted.length ? Math.round((correct / attempted.length) * 100) : 0;

  const totalTimeSpent = questions.reduce((s, q) => s + q.timeTakenSec, 0);
  const avgTime = attempted.length ? Math.round(totalTimeSpent / attempted.length) : 0;
  const OVERTIME = 90;

  // Cutoff range calculations
  const minCutoff = Math.min(...adjustedHistoricalCutoffs);
  const maxCutoff = Math.max(...adjustedHistoricalCutoffs);
  const cutoffRangeStr = `${minCutoff} - ${maxCutoff}`;

  const quadrants = {
    wastedTime: attempted.filter((q) => q.timeTakenSec > OVERTIME && q.status === "incorrect"),
    rushedWrong: attempted.filter(
      (q) => q.timeTakenSec <= OVERTIME && q.status === "incorrect" && q.timeTakenSec < avgTime * 0.6
    ),
    overthoughtRight: attempted.filter((q) => q.timeTakenSec > OVERTIME && q.status === "correct"),
    efficientRight: attempted.filter((q) => q.timeTakenSec <= OVERTIME && q.status === "correct"),
  };

  const errorCounts = useMemo(() => {
    const c: Record<string, number> = { memory_recall_gap: 0, clinical_scenario_trap: 0, rushed_error: 0 };
    questions.forEach((q) => {
      if (q.errorType) c[q.errorType]++;
    });
    return c;
  }, [questions]);
  const totalErrors = (Object.values(errorCounts) as number[]).reduce((a, b) => a + b, 0);

  const subjectBenchmarks = useMemo(() => {
    const map: Record<string, { your: number; topper: number; n: number }> = {};
    attempted.forEach((q) => {
      if (!map[q.subject]) map[q.subject] = { your: 0, topper: 0, n: 0 };
      map[q.subject].your += q.timeTakenSec;
      map[q.subject].topper += q.topperAvgTimeSec;
      map[q.subject].n++;
    });
    return Object.entries(map).map(([subject, v]) => ({
      subject,
      yourAvg: Math.round(v.your / v.n),
      topperAvg: Math.round(v.topper / v.n),
    }));
  }, [attempted]);

  const weaknesses = useMemo(() => {
    const map: Record<string, number> = {};
    questions
      .filter((q) => q.status === "incorrect")
      .forEach((q) => {
        const key = `${q.subject} — ${q.subTopic}`;
        map[key] = (map[key] || 0) + q.negativeMarkingValue;
      });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, [questions]);

  const zone = {
    Safe: { icon: ShieldCheck, color: "var(--success)", label: "Safe Cutoff Zone", badgeBg: "rgba(16, 185, 129, 0.12)" },
    Borderline: { icon: ShieldAlert, color: "var(--accent)", label: "Borderline Zone", badgeBg: "rgba(245, 158, 11, 0.12)" },
    Unsafe: { icon: ShieldX, color: "var(--danger)", label: "Unsafe Zone", badgeBg: "rgba(239, 68, 68, 0.12)" },
  }[prediction.cutoffZone];
  const ZoneIcon = zone.icon;

  // Comparison data calculation for "COMPARE" Bar Chart
  const compareData = useMemo(() => {
    const topperScore = testMeta.topperAverageScore || Math.round(testMeta.maxScore * 0.82);
    const avgScore = Math.round(testMeta.maxScore * 0.45);

    switch (selectedMetric) {
      case "Score":
        return {
          unit: "marks",
          you: testMeta.netScore,
          topper: topperScore,
          average: avgScore,
          maxVal: testMeta.maxScore,
        };
      case "Accuracy":
        return {
          unit: "%",
          you: accuracy,
          topper: 92,
          average: 56,
          maxVal: 100,
        };
      case "Attempt":
        return {
          unit: "qs",
          you: attempted.length,
          topper: Math.round(questions.length * 0.95),
          average: Math.round(questions.length * 0.65),
          maxVal: questions.length,
        };
      case "Correct":
        return {
          unit: "qs",
          you: correct,
          topper: Math.round(questions.length * 0.85),
          average: Math.round(questions.length * 0.42),
          maxVal: questions.length,
        };
      case "Incorrect":
        return {
          unit: "qs",
          you: incorrect,
          topper: Math.round(questions.length * 0.08),
          average: Math.round(questions.length * 0.22),
          maxVal: Math.max(10, questions.length * 0.5),
        };
      case "Time":
        return {
          unit: "s",
          you: avgTime,
          topper: 28,
          average: 48,
          maxVal: Math.max(120, avgTime * 1.3),
        };
      default:
        return { unit: "", you: 0, topper: 0, average: 0, maxVal: 100 };
    }
  }, [selectedMetric, testMeta, accuracy, attempted, correct, incorrect, questions, avgTime]);

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full text-left" style={{ fontFamily: "var(--font-body, system-ui, -apple-system, sans-serif)" }}>
      
      {/* ================= REATTEMPT TEST BANNER ================= */}
      <div className="rounded-2xl p-4 flex items-center justify-between border shadow-sm transition-all bg-[var(--surface)] border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface-2)] text-[var(--primary)]">
            <RotateCcw size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>
              Want to improve your rank?
            </h4>
            <p className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
              Re-attempt this test to fix careless mistakes and boost your score
            </p>
          </div>
        </div>
        <button
          onClick={onReattempt || (() => window.location.reload())}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12.5px] font-bold text-white bg-[var(--primary)] hover:opacity-95 transition-transform active:scale-95 cursor-pointer shadow-xs"
        >
          Reattempt Test <ArrowRight size={14} />
        </button>
      </div>

      {/* ================= QUICK SUMMARY SECTION (TESTBOOK UI) ================= */}
      <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
        
        {/* Header with Category Dropdown & Cutoff Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles size={16} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Quick Summary
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Category Dropdown Selector */}
            <div className="relative inline-flex items-center">
              <span className="text-[11px] font-medium mr-1.5 text-[var(--text-secondary)] hidden sm:inline">Category:</span>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as CategoryKey)}
                  className="appearance-none pl-3 pr-7 py-1 rounded-lg text-[12px] font-bold border cursor-pointer transition-all bg-[var(--surface-2)] text-[var(--primary)] border-[var(--primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                >
                  {Object.keys(CATEGORY_MAP).map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_MAP[cat as CategoryKey].label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--primary)]" />
              </div>
            </div>

            {/* Cutoff Range Indicator */}
            <div className="px-2.5 py-1 rounded-lg text-[11.5px] font-bold bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border)]">
              Cut off: <span className="font-mono text-[var(--primary)]">{cutoffRangeStr}</span>
            </div>
          </div>
        </div>

        {/* 1. RANK CARD */}
        <div className="mt-4 p-4 rounded-xl border bg-[var(--surface-2)] border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-500">
              <Flag size={20} />
            </div>
            <span className="text-[14px] font-extrabold text-[var(--text-primary)]">
              Rank
            </span>
          </div>
          <div className="text-right font-mono">
            <span className="text-2xl font-black text-[var(--text-primary)]">
              {prediction.predictedRank.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              /{testMeta.totalCandidates.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 2. SCORE CARD */}
        <div className="mt-3 rounded-xl border overflow-hidden bg-[var(--surface-2)] border-[var(--border)]">
          <div className="p-4 flex items-center justify-between border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500">
                <Trophy size={20} />
              </div>
              <span className="text-[14px] font-extrabold text-[var(--text-primary)]">
                Score
              </span>
            </div>
            <div className="text-right font-mono">
              <span className="text-2xl font-black text-[var(--text-primary)]">
                {testMeta.netScore}
              </span>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">
                /{testMeta.maxScore}
              </span>
            </div>
          </div>
          {/* Average & Best Score Bar */}
          <div className="px-4 py-2.5 bg-[var(--surface)] flex justify-between items-center text-[12px] font-semibold text-[var(--text-secondary)]">
            <span>Average Score: <strong className="text-[var(--text-primary)] font-mono">{testMeta.topperAverageScore ? Math.round(testMeta.topperAverageScore * 0.6) : 42}</strong></span>
            <span>Best Score: <strong className="text-[var(--text-primary)] font-mono">{testMeta.maxScore}</strong></span>
          </div>
        </div>

        {/* 3. MULTI-METRIC PERFORMANCE CARD */}
        <div className="mt-3 p-4 rounded-xl border bg-[var(--surface-2)] border-[var(--border)] flex flex-col gap-3.5">
          {/* Percentile Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-500/10 text-purple-500">
                <User size={18} />
              </div>
              <span className="text-[13px] font-bold text-[var(--text-primary)]">
                Percentile
              </span>
            </div>
            <span className="text-lg font-black font-mono text-[var(--text-primary)]">
              {prediction.estimatedPercentile} %
            </span>
          </div>

          <div className="w-full h-px bg-[var(--border)]" />

          {/* Accuracy Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                <Target size={18} />
              </div>
              <span className="text-[13px] font-bold text-[var(--text-primary)]">
                Accuracy
              </span>
            </div>
            <span className="text-lg font-black font-mono text-[var(--text-primary)]">
              {accuracy} %
            </span>
          </div>

          <div className="w-full h-px bg-[var(--border)]" />

          {/* Questions Attempted Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-sky-500/10 text-sky-500">
                <ClipboardList size={18} />
              </div>
              <span className="text-[13px] font-bold text-[var(--text-primary)]">
                Qs. Attempted
              </span>
            </div>
            <div className="font-mono">
              <span className="text-lg font-black text-[var(--text-primary)]">{attempted.length}</span>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">/{questions.length}</span>
            </div>
          </div>

          {/* Bottom Pill Badges */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <CheckCircle2 size={13} className="shrink-0" />
              <span>Correct: <strong className="font-mono">{correct}</strong></span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-extrabold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
              <XCircle size={13} className="shrink-0" />
              <span>Incorrect: <strong className="font-mono">{incorrect}</strong></span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-extrabold bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20">
              <HelpCircle size={13} className="shrink-0" />
              <span>Unattempted: <strong className="font-mono">{unattempted}</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= COMPARE SECTION (TESTBOOK BAR CHART) ================= */}
      <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Activity size={16} />
          </div>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Compare
          </h3>
        </div>

        {/* Metric Pill Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {COMPARE_METRICS.map((m) => {
            const active = selectedMetric === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className="px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer"
                style={{
                  background: active ? "var(--primary)" : "var(--surface-2)",
                  color: active ? "#ffffff" : "var(--text-secondary)",
                  borderColor: active ? "var(--primary)" : "var(--border)",
                }}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Visual Vertical Bar Chart Comparison */}
        <div className="p-4 rounded-xl border bg-[var(--surface-2)] border-[var(--border)]">
          <div className="relative h-52 flex items-end justify-around pt-6 pb-2 px-4 border-b border-slate-300 dark:border-slate-700">
            {/* Horizontal Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
              <div className="w-full border-b border-dashed border-current" />
              <div className="w-full border-b border-dashed border-current" />
              <div className="w-full border-b border-dashed border-current" />
              <div className="w-full border-b border-dashed border-current" />
            </div>

            {/* BAR 1: YOU */}
            <div className="flex flex-col items-center gap-1 z-10 w-16 md:w-20">
              <span className="text-[11px] font-black font-mono text-[var(--primary)]">
                {compareData.you} {compareData.unit}
              </span>
              <div
                className="w-full rounded-t-lg transition-all duration-500 shadow-sm"
                style={{
                  height: `${Math.max(8, Math.min(100, (compareData.you / compareData.maxVal) * 160))}px`,
                  background: "var(--primary)",
                }}
              />
            </div>

            {/* BAR 2: TOPPER */}
            <div className="flex flex-col items-center gap-1 z-10 w-16 md:w-20">
              <span className="text-[11px] font-black font-mono text-purple-600 dark:text-purple-400">
                {compareData.topper} {compareData.unit}
              </span>
              <div
                className="w-full rounded-t-lg transition-all duration-500 shadow-sm bg-purple-500"
                style={{
                  height: `${Math.max(8, Math.min(100, (compareData.topper / compareData.maxVal) * 160))}px`,
                }}
              />
            </div>

            {/* BAR 3: AVERAGE */}
            <div className="flex flex-col items-center gap-1 z-10 w-16 md:w-20">
              <span className="text-[11px] font-black font-mono text-indigo-500">
                {compareData.average} {compareData.unit}
              </span>
              <div
                className="w-full rounded-t-lg transition-all duration-500 shadow-sm bg-indigo-400/80"
                style={{
                  height: `${Math.max(8, Math.min(100, (compareData.average / compareData.maxVal) * 160))}px`,
                }}
              />
            </div>
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-around text-[12px] font-extrabold text-[var(--text-primary)] pt-3">
            <span className="w-16 md:w-20 text-center">You</span>
            <span className="w-16 md:w-20 text-center text-purple-600 dark:text-purple-400">Topper</span>
            <span className="w-16 md:w-20 text-center text-indigo-500">Average</span>
          </div>
        </div>
      </div>

      {/* ================= CUTOFF ZONE & STANDING STATUS ================= */}
      <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <TrendingUp size={16} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Category Cutoff & Margin
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border)]">
            Category: {selectedCategory}
          </span>
        </div>

        <div
          className="rounded-xl p-4 border flex items-center justify-between"
          style={{
            background: zone.badgeBg,
            borderColor: `color-mix(in srgb, ${zone.color} 30%, transparent)`,
          }}
        >
          <div className="flex items-center gap-3">
            <ZoneIcon size={24} style={{ color: zone.color }} />
            <div>
              <p className="text-[15px] font-extrabold" style={{ color: zone.color }}>
                {zone.label}
              </p>
              <p className="text-[12px] font-medium mt-0.5" style={{ color: "var(--text-primary)" }}>
                {prediction.safetyMargin >= 0 ? "+" : ""}
                {prediction.safetyMargin.toFixed(1)} pts margin against {selectedCategory} category cutoff
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACCURACY VS TIME BEHAVIOR MATRIX ================= */}
      <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <Clock size={16} />
          </div>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Time & Accuracy Quadrant Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuadrantBox
            title="Wasted Time"
            desc="Slow & Incorrect (>90s spent)"
            count={quadrants.wastedTime.length}
            tone="var(--danger)"
            icon={Flame}
            open={openQuadrant === "wasted"}
            onToggle={() => setOpenQuadrant(openQuadrant === "wasted" ? null : "wasted")}
            items={quadrants.wastedTime}
          />
          <QuadrantBox
            title="Rushed Careless"
            desc="Too fast & Incorrect (<60% avg time)"
            count={quadrants.rushedWrong.length}
            tone="var(--accent)"
            icon={Zap}
            open={openQuadrant === "rushed"}
            onToggle={() => setOpenQuadrant(openQuadrant === "rushed" ? null : "rushed")}
            items={quadrants.rushedWrong}
          />
          <QuadrantBox
            title="Overthought"
            desc="Slow but Correct (>90s spent)"
            count={quadrants.overthoughtRight.length}
            tone="var(--text-secondary)"
            icon={Clock}
            open={openQuadrant === "over"}
            onToggle={() => setOpenQuadrant(openQuadrant === "over" ? null : "over")}
            items={quadrants.overthoughtRight}
          />
          <QuadrantBox
            title="Efficient Mastered"
            desc="Fast & Correct (Optimal pace)"
            count={quadrants.efficientRight.length}
            tone="var(--success)"
            icon={CheckCircle2}
            open={openQuadrant === "eff"}
            onToggle={() => setOpenQuadrant(openQuadrant === "eff" ? null : "eff")}
            items={quadrants.efficientRight}
          />
        </div>
      </div>

      {/* ================= COGNITIVE ERROR PATTERNS ================= */}
      {totalErrors > 0 && (
        <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <BrainCircuit size={16} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Cognitive Error Pattern Analysis
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {(Object.keys(ERROR_LABELS) as Array<keyof typeof ERROR_LABELS>).map((key) => {
              const count = errorCounts[key] || 0;
              const pct = totalErrors ? Math.round((count / totalErrors) * 100) : 0;
              if (count === 0) return null;
              const meta = ERROR_LABELS[key];
              return (
                <div key={key} className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <div className="flex justify-between items-center text-[12.5px] font-bold mb-1.5">
                    <span style={{ color: "var(--text-primary)" }}>{meta.name}</span>
                    <span className="font-mono text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
                      {count} {count === 1 ? "question" : "questions"} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--border)] mb-2">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "var(--primary)" }} />
                  </div>
                  <p className="text-[11px] flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                    <Info size={12} className="text-[var(--primary)] shrink-0" /> {meta.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TOPPER BENCHMARK ================= */}
      {subjectBenchmarks.length > 0 && (
        <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Gauge size={16} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Subject Speed Benchmark (You vs Top 10%)
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {subjectBenchmarks.map((b) => {
              const max = Math.max(b.yourAvg, b.topperAvg) * 1.15 || 1;
              const diff = b.yourAvg - b.topperAvg;
              return (
                <div key={b.subject} className="p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <div className="flex items-center justify-between text-[12.5px] font-bold mb-2">
                    <span style={{ color: "var(--text-primary)" }}>{b.subject}</span>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold"
                      style={{
                        background: diff <= 0 ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                        color: diff <= 0 ? "var(--success)" : "var(--danger)",
                      }}
                    >
                      {diff <= 0 ? `${Math.abs(diff)}s faster than Toppers` : `${diff}s slower than Toppers`}
                    </span>
                  </div>

                  <BenchmarkBar label="You" value={b.yourAvg} max={max} color="var(--primary)" />
                  <BenchmarkBar label="Top 10%" value={b.topperAvg} max={max} color="var(--accent)" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= WEAK SUB-TOPICS & FIX-IT DRILL CTA ================= */}
      {weaknesses.length > 0 && (
        <div className="rounded-2xl p-5 border shadow-sm bg-[var(--surface)] border-[var(--border)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle size={16} />
            </div>
            <h3 className="text-[13px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Weakest Sub-Topics & Target Remediation
            </h3>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {weaknesses.map(([topic, impact], i) => (
              <div key={topic} className="flex items-center justify-between rounded-xl p-3 bg-[var(--surface-2)] border border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-extrabold text-white bg-red-500 shadow-xs">
                    #{i + 1}
                  </span>
                  <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                    {topic}
                  </span>
                </div>
                <span className="text-[11.5px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400">
                  -{impact.toFixed(2)} pts
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onGenerateFixItQuiz(weaknesses.map(([t]) => t))}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[13.5px] font-extrabold text-white shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
            style={{ background: "var(--primary)" }}
          >
            <Zap size={16} className="fill-current" /> Launch 10-Question Target Fix-It Drill <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Quadrant Box Component ---------------- */
function QuadrantBox({
  title,
  desc,
  count,
  tone,
  icon: Icon,
  open,
  onToggle,
  items,
}: {
  title: string;
  desc: string;
  count: number;
  tone: string;
  icon: any;
  open: boolean;
  onToggle: () => void;
  items: { id: string; text: string; timeTakenSec: number }[];
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] transition-all">
      <button onClick={onToggle} className="w-full text-left p-3.5 cursor-pointer flex flex-col justify-between h-full">
        <div className="flex items-center justify-between w-full mb-1">
          <div className="flex items-center gap-1.5">
            <Icon size={14} style={{ color: tone }} />
            <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>
              {title}
            </span>
          </div>
          {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
        </div>
        
        <p className="text-[11px] mb-2" style={{ color: "var(--text-secondary)" }}>
          {desc}
        </p>

        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black font-mono" style={{ color: tone }}>
            {count}
          </span>
          <span className="text-[10.5px] font-semibold text-[var(--primary)] hover:underline">
            {open ? "Hide details" : "View questions"}
          </span>
        </div>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 pt-1 border-t border-[var(--border)] flex flex-col gap-1.5 bg-[var(--surface)]">
          {items.length === 0 ? (
            <p className="text-[11px] italic py-1" style={{ color: "var(--text-secondary)" }}>
              No questions fell into this quadrant during this test.
            </p>
          ) : (
            items.map((it, idx) => (
              <div key={it.id || idx} className="text-[11px] rounded-lg p-2 bg-[var(--surface-2)] border border-[var(--border)] flex justify-between items-start gap-2">
                <span className="line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {it.text}
                </span>
                <span className="font-mono text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]" style={{ color: tone }}>
                  {it.timeTakenSec}s
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Benchmark Bar Component ---------------- */
function BenchmarkBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="w-16 text-[10.5px] font-semibold shrink-0" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(5, (value / max) * 100))}%`, background: color }}
        />
      </div>
      <span className="w-10 text-[11px] font-mono font-bold text-right" style={{ color: "var(--text-primary)" }}>
        {value}s
      </span>
    </div>
  );
}


