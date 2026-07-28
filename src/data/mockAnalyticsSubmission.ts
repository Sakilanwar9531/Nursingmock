export type ErrorType = "memory_recall_gap" | "clinical_scenario_trap" | "rushed_error" | null;
export type QStatus = "correct" | "incorrect" | "unattempted";

export interface QuestionAnalytics {
  id: string;
  subject: string;
  subTopic: string;
  text: string;
  status: QStatus;
  timeTakenSec: number;
  topperAvgTimeSec: number;
  negativeMarkingValue: number; // e.g. 1/3
  errorType: ErrorType;
}

export interface TestSubmissionAnalytics {
  testMeta: {
    testName: string;
    totalQuestions: number;
    maxScore: number;
    netScore: number;
    shiftDifficultyMultiplier: number;
    topperAverageScore: number;
    totalCandidates: number;
    historicalCutoffs: number[];
  };
  questions: QuestionAnalytics[];
}

export const MOCK_SUBMISSION: TestSubmissionAnalytics = {
  testMeta: {
    testName: "AIIMS NORCET 7 — Full Mock",
    totalQuestions: 15,
    maxScore: 15,
    netScore: 6.33,
    shiftDifficultyMultiplier: 1.03,
    topperAverageScore: 12.4,
    totalCandidates: 2800,
    historicalCutoffs: [6.8, 7.1, 6.5],
  },
  questions: [
    { id: "q1", subject: "Pharmacology", subTopic: "Antibiotics", text: "Mechanism of action of Beta-lactam antibiotics.", status: "incorrect", timeTakenSec: 112, topperAvgTimeSec: 38, negativeMarkingValue: 0.33, errorType: "memory_recall_gap" },
    { id: "q2", subject: "Anatomy", subTopic: "Cardiovascular System", text: "Which chamber receives deoxygenated blood from the body?", status: "correct", timeTakenSec: 22, topperAvgTimeSec: 20, negativeMarkingValue: 0, errorType: null },
    { id: "q3", subject: "Medical-Surgical", subTopic: "Autoimmune Disorders", text: "A patient asks what an autoimmune disease means. Best response?", status: "incorrect", timeTakenSec: 65, topperAvgTimeSec: 40, negativeMarkingValue: 0.33, errorType: "clinical_scenario_trap" },
    { id: "q4", subject: "Pharmacology", subTopic: "Antibiotics", text: "Which antibiotic class is contraindicated in pregnancy?", status: "incorrect", timeTakenSec: 15, topperAvgTimeSec: 30, negativeMarkingValue: 0.33, errorType: "rushed_error" },
    { id: "q5", subject: "Anatomy", subTopic: "Cardiovascular System", text: "Identify the valve between left atrium and left ventricle.", status: "incorrect", timeTakenSec: 98, topperAvgTimeSec: 25, negativeMarkingValue: 0.33, errorType: "memory_recall_gap" },
    { id: "q6", subject: "Community Health", subTopic: "Immunization", text: "Correct interval between BCG and OPV dose.", status: "correct", timeTakenSec: 30, topperAvgTimeSec: 28, negativeMarkingValue: 0, errorType: null },
    { id: "q7", subject: "Medical-Surgical", subTopic: "Autoimmune Disorders", text: "Which lab marker is elevated in Rheumatoid Arthritis?", status: "unattempted", timeTakenSec: 0, topperAvgTimeSec: 35, negativeMarkingValue: 0, errorType: null },
    { id: "q8", subject: "Pharmacology", subTopic: "Antibiotics", text: "First-line drug for uncomplicated UTI.", status: "correct", timeTakenSec: 40, topperAvgTimeSec: 32, negativeMarkingValue: 0, errorType: null },
    { id: "q9", subject: "Anatomy", subTopic: "Cardiovascular System", text: "Coronary artery supplying the SA node in most individuals.", status: "incorrect", timeTakenSec: 105, topperAvgTimeSec: 42, negativeMarkingValue: 0.33, errorType: "memory_recall_gap" },
    { id: "q10", subject: "Community Health", subTopic: "Immunization", text: "Cold chain temperature range for vaccine storage.", status: "correct", timeTakenSec: 24, topperAvgTimeSec: 22, negativeMarkingValue: 0, errorType: null },
    { id: "q11", subject: "Medical-Surgical", subTopic: "Autoimmune Disorders", text: "A nurse must respond urgently to a patient in anaphylaxis. First action?", status: "incorrect", timeTakenSec: 20, topperAvgTimeSec: 26, negativeMarkingValue: 0.33, errorType: "rushed_error" },
    { id: "q12", subject: "Pharmacology", subTopic: "Cardiac Drugs", text: "Digoxin toxicity is potentiated by which electrolyte imbalance?", status: "unattempted", timeTakenSec: 0, topperAvgTimeSec: 33, negativeMarkingValue: 0, errorType: null },
    { id: "q13", subject: "Anatomy", subTopic: "Nervous System", text: "Cranial nerve responsible for pupillary constriction.", status: "correct", timeTakenSec: 18, topperAvgTimeSec: 24, negativeMarkingValue: 0, errorType: null },
    { id: "q14", subject: "Community Health", subTopic: "Immunization", text: "Which vaccine is contraindicated in immunocompromised patients?", status: "incorrect", timeTakenSec: 88, topperAvgTimeSec: 30, negativeMarkingValue: 0.33, errorType: "memory_recall_gap" },
    { id: "q15", subject: "Medical-Surgical", subTopic: "Autoimmune Disorders", text: "Best nursing intervention for a lupus patient during a flare.", status: "correct", timeTakenSec: 46, topperAvgTimeSec: 38, negativeMarkingValue: 0, errorType: null },
  ],
};
