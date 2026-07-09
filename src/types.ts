export interface Question {
  q: string;
  opts: string[];
  ans: number;
  source: string;
  explain: string;
}

export interface Test {
  id: string;
  icon: string;
  title: string;
  desc: string;
  questions: number;
  mins: number;
  ready: boolean;
  data: Question[];
}

export interface Subject {
  id: string;
  icon: string;
  name: string;
  tests: Test[];
}

export interface PyqCard {
  exam: string;
  tag: string;
  year: string;
  count: number;
  color: string;
}

export interface User {
  name: string;
  email: string;
  pass?: string;
  phone?: string;
  isAdmin: boolean;
  guest?: boolean;
  joined?: number;
}

export interface Attempt {
  testId: string;
  testTitle: string;
  correct: number;
  total: number;
  pct: number;
  timestamp: number;
}

export interface StreakData {
  streak: number;
  last: string;
}

export interface NursingUpdate {
  id: string;
  title: string;
  category: "jobs" | "syllabus" | "motivation" | "notes";
  badge: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
}
