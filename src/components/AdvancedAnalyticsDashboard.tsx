import { useMemo, useState } from "react";
import {
  Trophy, Target, Percent, AlertTriangle, BrainCircuit, Zap,
  Clock, TrendingUp, ShieldCheck, ShieldAlert, ShieldX, ArrowRight,
  ChevronDown, ChevronUp
} from "lucide-react";
import { predictRankAndCutoffZone } from "../utils/rankPredictor";
import { TestSubmissionAnalytics, ErrorType } from "../data/mockAnalyticsSubmission";

const ERROR_LABELS: Record<Exclude<ErrorType, null>, string> = {
  memory_recall_gap: "Memory Recall Gap",
  clinical_scenario_trap: "Clinical Scenario Trap",
  rushed_error: "Rushed Error",
};

export default function AdvancedAnalyticsDashboard({
  submission,
  onGenerateFixItQuiz,
}: {
  submission: TestSubmissionAnalytics;
  onGenerateFixItQuiz: (subTopics: string[]) => void;
}) {
  const { testMeta, questions } = submission;
  const [expandedQuadrant, setExpandedQuadrant] = useState<string | null>(null);

  /* ---------- RANK PREDICTION ---------- */
  const prediction = useMemo(
    () =>
      predictRankAndCutoffZone({
        netScore: testMeta.netScore,
        maxScore: testMeta.maxScore,
        shiftDifficultyMultiplier: testMeta.shiftDifficultyMultiplier || 1.0,
        topperAverageScore: testMeta.topperAverageScore || (testMeta.maxScore * 0.85),
        totalCandidates: testMeta.totalCandidates || 2500,
        historicalCutoffs: testMeta.historicalCutoffs?.length ? testMeta.historicalCutoffs : [testMeta.maxScore * 0.5, testMeta.maxScore * 0.52],
      }),
    [testMeta]
  );

  /* ---------- ACCURACY vs TIME QUADRANTS ---------- */
  const attempted = questions.filter((q) => q.status !== "unattempted");
  const avgTime = attempted.reduce((s, q) => s + q.timeTakenSec, 0) / (attempted.length || 1);
  const OVERTIME_THRESHOLD = 90;

  const quadrants = {
    wastedTime: attempted.filter((q) => q.timeTakenSec > OVERTIME_THRESHOLD && q.status === "incorrect"),
    overthoughtButRight: attempted.filter((q) => q.timeTakenSec > OVERTIME_THRESHOLD && q.status === "correct"),
    rushedWrong: attempted.filter((q) => q.timeTakenSec <= OVERTIME_THRESHOLD && q.status === "incorrect" && q.timeTakenSec < avgTime * 0.6),
    efficientRight: attempted.filter((q) => q.timeTakenSec <= OVERTIME_THRESHOLD && q.status === "correct"),
  };

  /* ---------- ERROR CLASSIFICATION ---------- */
  const errorCounts = useMemo(() => {
    const counts: Record<string, number> = { memory_recall_gap: 0, clinical_scenario_trap: 0, rushed_error: 0 };
    questions.forEach((q) => {
      if (q.errorType) counts[q.errorType]++;
    });
    return counts;
  }, [questions]);
  const totalErrors = (Object.values(errorCounts) as number[]).reduce((a, b) => a + b, 0);

  /* ---------- TOPPER BENCHMARK BY SUBJECT ---------- */
  const subjectBenchmarks = useMemo(() => {
    const map: Record<string, { yourTotal: number; topperTotal: number; count: number }> = {};
    attempted.forEach((q) => {
      const subj = q.subject || "General Nursing";
      if (!map[subj]) map[subj] = { yourTotal: 0, topperTotal: 0, count: 0 };
      map[subj].yourTotal += q.timeTakenSec;
      map[subj].topperTotal += (q.topperAvgTimeSec || 30);
      map[subj].count++;
    });
    return Object.entries(map).map(([subject, v]) => ({
      subject,
      yourAvg: Math.round(v.yourTotal / v.count),
      topperAvg: Math.round(v.topperTotal / v.count),
    }));
  }, [attempted]);

  /* ---------- SUBJECT WEAKNESS BUCKETS ---------- */
  const weaknessBuckets = useMemo(() => {
    const map: Record<string, { subject: string; impact: number; count: number }> = {};
    questions
      .filter((q) => q.status === "incorrect")
      .forEach((q) => {
        const key = `${q.subject || "Nursing"} — ${q.subTopic || "General Topic"}`;
        if (!map[key]) map[key] = { subject: key, impact: 0, count: 0 };
        map[key].impact += (q.negativeMarkingValue || 0.33);
        map[key].count++;
      });
    return Object.values(map)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3);
  }, [questions]);

  const zoneConfig = {
    Safe: { icon: ShieldCheck, color: "var(--success, #10b981)", label: "Safe Zone" },
    Borderline: { icon: ShieldAlert, color: "var(--accent, #f59e0b)", label: "Borderline Zone" },
    Unsafe: { icon: ShieldX, color: "var(--danger, #ef4444)", label: "Unsafe Zone" },
  }[prediction.cutoffZone];
  const ZoneIcon = zoneConfig.icon;

  return (
    <div className="flex flex-col gap-5 mt-6" style={{ color: "var(--text-primary)" }}>

      {/* ===== RANK PREDICTOR HEADER ===== */}
      <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} style={{ color: "var(--primary)" }} />
          <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
            Dynamic Rank Predictor & Cutoff Analysis
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <MiniStat icon={Percent} label="Est. Percentile" value={`${prediction.estimatedPercentile}%`} />
          <MiniStat icon={Trophy} label="Predicted Rank" value={`~${prediction.predictedRank.toLocaleString()}`} sub={`of ${testMeta.totalCandidates.toLocaleString()}`} />
          <MiniStat icon={Target} label="Normalized Score" value={prediction.normalizedScore.toFixed(2)} sub={`/ ${testMeta.maxScore}`} />
          <MiniStat icon={Clock} label="Avg Historical Cutoff" value={prediction.avgHistoricalCutoff.toFixed(1)} />
        </div>

        <div
          className="flex items-center justify-between rounded-xl p-3.5"
          style={{ background: `color-mix(in srgb, ${zoneConfig.color} 10%, var(--surface))`, border: `1px solid color-mix(in srgb, ${zoneConfig.color} 35%, transparent)` }}
        >
          <div className="flex items-center gap-2.5">
            <ZoneIcon size={18} style={{ color: zoneConfig.color }} />
            <div>
              <p className="text-[13.5px] font-bold" style={{ color: zoneConfig.color }}>{zoneConfig.label}</p>
              <p className="text-[11.5px]" style={{ color: "var(--text-secondary)" }}>
                {prediction.safetyMargin >= 0 ? "+" : ""}{prediction.safetyMargin} vs avg cutoff
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACCURACY vs TIME QUADRANTS ===== */}
      <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} style={{ color: "var(--primary)" }} />
          <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
            Accuracy vs Time Analysis
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <QuadrantCard
            title="Wasted Time"
            desc="Overthought (>90s) & wrong"
            count={quadrants.wastedTime.length}
            tone="var(--danger, #ef4444)"
            expanded={expandedQuadrant === "wastedTime"}
            onToggle={() => setExpandedQuadrant(expandedQuadrant === "wastedTime" ? null : "wastedTime")}
            items={quadrants.wastedTime}
          />
          <QuadrantCard
            title="Rushed & Wrong"
            desc="Answered too fast & wrong"
            count={quadrants.rushedWrong.length}
            tone="var(--accent, #f59e0b)"
            expanded={expandedQuadrant === "rushedWrong"}
            onToggle={() => setExpandedQuadrant(expandedQuadrant === "rushedWrong" ? null : "rushedWrong")}
            items={quadrants.rushedWrong}
          />
          <QuadrantCard
            title="Overthought, Correct"
            desc="Slow (>90s) but correct"
            count={quadrants.overthoughtButRight.length}
            tone="var(--text-secondary, #6b7280)"
            expanded={expandedQuadrant === "overthoughtButRight"}
            onToggle={() => setExpandedQuadrant(expandedQuadrant === "overthoughtButRight" ? null : "overthoughtButRight")}
            items={quadrants.overthoughtButRight}
          />
          <QuadrantCard
            title="Efficient & Correct"
            desc="Fast & accurate"
            count={quadrants.efficientRight.length}
            tone="var(--success, #10b981)"
            expanded={expandedQuadrant === "efficientRight"}
            onToggle={() => setExpandedQuadrant(expandedQuadrant === "efficientRight" ? null : "efficientRight")}
            items={quadrants.efficientRight}
          />
        </div>
      </div>

      {/* ===== ERROR CLASSIFICATION ===== */}
      <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit size={16} style={{ color: "var(--primary)" }} />
          <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
            Error Classification Breakdown
          </span>
        </div>
        {totalErrors === 0 ? (
          <p className="text-[13px] text-center py-3" style={{ color: "var(--text-secondary)" }}>Great job! No errors detected in this attempt.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {(Object.keys(ERROR_LABELS) as Array<keyof typeof ERROR_LABELS>).map((key) => {
              const count = errorCounts[key] || 0;
              const pct = totalErrors ? (count / totalErrors) * 100 : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-[12.5px] font-semibold mb-1">
                    <span style={{ color: "var(--text-primary)" }}>{ERROR_LABELS[key]}</span>
                    <span style={{ color: "var(--text-secondary)" }}>{count} question{count !== 1 ? "s" : ""} ({Math.round(pct)}%)</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--primary)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== TOPPER BENCHMARK ===== */}
      {subjectBenchmarks.length > 0 && (
        <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} style={{ color: "var(--primary)" }} />
            <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
              Time per Question — You vs Top 10%
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {subjectBenchmarks.map((b) => {
              const max = Math.max(b.yourAvg, b.topperAvg, 1) * 1.2;
              return (
                <div key={b.subject}>
                  <p className="text-[12.5px] font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>{b.subject}</p>
                  <div className="flex flex-col gap-1">
                    <BenchmarkBar label="You" value={b.yourAvg} max={max} color="var(--primary)" />
                    <BenchmarkBar label="Topper" value={b.topperAvg} max={max} color="var(--accent, #f59e0b)" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== WEAKNESS BUCKETS + FIX-IT CTA ===== */}
      <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} style={{ color: "var(--danger, #ef4444)" }} />
          <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
            Weak Sub-Topics Focus
          </span>
        </div>
        {weaknessBuckets.length === 0 ? (
          <p className="text-[13px] text-center py-2" style={{ color: "var(--text-secondary)" }}>No major negative-mark drag found in this attempt!</p>
        ) : (
          <>
            <div className="flex flex-col gap-2.5 mb-4">
              {weaknessBuckets.map((w, i) => (
                <div key={w.subject} className="flex items-center justify-between rounded-xl px-3.5 py-3" style={{ background: "var(--surface-2)" }}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: "var(--danger, #ef4444)" }}>
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>{w.subject}</span>
                  </div>
                  <span className="text-[11.5px] font-mono font-bold shrink-0" style={{ color: "var(--danger, #ef4444)" }}>
                    -{w.impact.toFixed(2)} marks
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onGenerateFixItQuiz(weaknessBuckets.map((w) => w.subject))}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13.5px] font-bold text-white transition-transform active:scale-[0.98] cursor-pointer"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--accent, #f59e0b))" }}
            >
              <Zap size={15} />
              Generate 10-Question Fix-It Quiz
              <ArrowRight size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- SUBCOMPONENTS ---------------- */
function MiniStat({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} style={{ color: "var(--primary)" }} />
        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{label}</span>
      </div>
      <p className="text-[17px] font-black font-mono" style={{ color: "var(--text-primary)" }}>
        {value} {sub && <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>{sub}</span>}
      </p>
    </div>
  );
}

function QuadrantCard({ title, desc, count, tone, expanded, onToggle, items }: {
  title: string; desc: string; count: number; tone: string; expanded: boolean; onToggle: () => void;
  items: { id: string; text: string; timeTakenSec: number }[];
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--surface-2)" }}>
      <button onClick={onToggle} className="w-full text-left p-3.5 cursor-pointer">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>{title}</span>
          {expanded ? <ChevronUp size={14} style={{ color: "var(--text-secondary)" }} /> : <ChevronDown size={14} style={{ color: "var(--text-secondary)" }} />}
        </div>
        <p className="text-[10.5px] mb-2" style={{ color: "var(--text-secondary)" }}>{desc}</p>
        <p className="text-[20px] font-black font-mono" style={{ color: tone }}>{count}</p>
      </button>
      {expanded && items.length > 0 && (
        <div className="px-3.5 pb-3.5 flex flex-col gap-1.5">
          {items.map((it) => (
            <div key={it.id} className="text-[11px] rounded-lg px-2.5 py-1.5" style={{ background: "var(--surface)", color: "var(--text-secondary)" }}>
              {it.text} <span className="font-mono">({it.timeTakenSec}s)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BenchmarkBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 text-[10.5px] font-semibold shrink-0" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: color }} />
      </div>
      <span className="w-10 text-[10.5px] font-mono text-right shrink-0" style={{ color: "var(--text-primary)" }}>{value}s</span>
    </div>
  );
}
