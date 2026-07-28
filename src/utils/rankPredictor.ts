/**
 * Standard normal CDF approximation (Abramowitz & Stegun 26.2.17).
 * Converts a z-score into a percentile (0–100). This is a well-known
 * closed-form approximation — no external stats library needed.
 */
function normalCDF(z: number): number {
  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z);
  const t = 1 / (1 + 0.2316419 * z);
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return sign === 1 ? 1 - p : p;
}

export interface RankPredictorInput {
  netScore: number;              // student's net score, e.g. correct*1 - incorrect*(1/3)
  maxScore: number;
  shiftDifficultyMultiplier: number; // ~0.90–1.10; >1 means this shift was harder (score gets a bump)
  topperAverageScore: number;    // average of top scorers this cycle (proxy for distribution ceiling)
  totalCandidates: number;
  historicalCutoffs: number[];   // last 2-3 years' net-score cutoffs for this exam/category
}

export interface RankPredictorOutput {
  normalizedScore: number;
  estimatedPercentile: number;   // 0-100
  predictedRank: number;
  cutoffZone: "Safe" | "Borderline" | "Unsafe";
  safetyMargin: number;          // normalizedScore - avgHistoricalCutoff
  avgHistoricalCutoff: number;
}

/**
 * Estimates percentile/rank/cutoff-safety from a single net score.
 *
 * MODEL ASSUMPTIONS (documented, not hidden):
 * - We don't have the full candidate score distribution, so we approximate
 *   it as roughly normal, anchored using topperAverageScore as a ~97th
 *   percentile marker (z ≈ 1.88) and an assumed population mean at 42% of
 *   the topper average (typical for negative-marking CBT exams where most
 *   candidates score well below toppers).
 * - shiftDifficultyMultiplier normalizes for shift-to-shift difficulty
 *   variance, applied before percentile estimation.
 */
export function predictRankAndCutoffZone(
  input: RankPredictorInput
): RankPredictorOutput {
  const {
    netScore,
    shiftDifficultyMultiplier,
    topperAverageScore,
    totalCandidates,
    historicalCutoffs,
  } = input;

  const normalizedScore = netScore * shiftDifficultyMultiplier;

  const assumedMean = topperAverageScore * 0.42;
  const zAnchor = 1.88; // ~97th percentile
  const assumedSD = Math.max((topperAverageScore - assumedMean) / zAnchor, 1);

  const z = (normalizedScore - assumedMean) / assumedSD;
  const estimatedPercentile = Math.min(Math.max(normalCDF(z) * 100, 0.1), 99.9);

  const predictedRank = Math.max(
    1,
    Math.round(totalCandidates * (1 - estimatedPercentile / 100))
  );

  const avgHistoricalCutoff =
    historicalCutoffs.reduce((a, b) => a + b, 0) / historicalCutoffs.length;

  const safetyMargin = normalizedScore - avgHistoricalCutoff;
  const marginThreshold = Math.abs(avgHistoricalCutoff) * 0.06 || 2;

  let cutoffZone: RankPredictorOutput["cutoffZone"];
  if (safetyMargin > marginThreshold) cutoffZone = "Safe";
  else if (safetyMargin >= -marginThreshold) cutoffZone = "Borderline";
  else cutoffZone = "Unsafe";

  return {
    normalizedScore,
    estimatedPercentile: Math.round(estimatedPercentile * 100) / 100,
    predictedRank,
    cutoffZone,
    safetyMargin: Math.round(safetyMargin * 100) / 100,
    avgHistoricalCutoff: Math.round(avgHistoricalCutoff * 100) / 100,
  };
}
