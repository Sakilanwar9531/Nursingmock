import React, { useState, useMemo, useEffect, FormEvent, ChangeEvent } from "react";
import {
  LayoutDashboard, Users, FileText, BarChart3, Bell, Settings,
  Search, Download, Lock, TrendingUp, CheckCircle2,
  AlertCircle, ChevronRight, Activity, BookOpen, Zap,
  Plus, Trash2, X, Eye, ToggleLeft, ToggleRight, Send, Key,
  Upload, Image as ImageIcon, Edit3, Check, Copy, Sparkles,
  Filter, FileSpreadsheet, Layers, Globe, RefreshCw, UserPlus,
  ArrowUpRight, ArrowLeft
} from "lucide-react";
import { getSupabaseClient } from "../supabaseClient";
import { SUBJECTS, PYQ_DATA } from "../data";
import { NCBT_ONE_PROFESSIONS } from "../data/ncbtOneProfessions";
import { STATIC_NURSING_UPDATES } from "../updatesData";
import { NursingUpdate, Question } from "../types";
import { getAllSeoArticles, saveCustomSeoArticle, deleteCustomSeoArticle, SeoArticle } from "../seoArticles";

/* ---------------- TYPES & INTERFACES ---------------- */
export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  profession: string;
  testsAttempted: number;
  avgAccuracy: number;
  lastActive: string;
  status: "active" | "idle" | "new";
  streak: number;
}

export interface ActivityItem {
  id: string | number;
  text: string;
  meta: string;
  time: string;
  icon: any;
  tone: "success" | "warn" | "info";
  rawTime?: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: "NORCET" | "ESIC" | "General" | "Alert";
  date: string;
  active: boolean;
  important: boolean;
}

export interface CustomQuestionItem extends Question {
  id: string;
  subject: string;
  testId?: string;
  testTitle?: string;
  createdAt?: number;
}

export interface ParsedMcqRow {
  q: string;
  opts: string[];
  ans: number; // 0, 1, 2, 3
  explain: string;
  subject: string;
  source: string;
  valid: boolean;
  error?: string;
  selected?: boolean;
}

/* ---------------- NAV ---------------- */
const NAV = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "students", label: "Students", icon: Users },
  { key: "questions", label: "MCQ Question Bank", icon: FileText },
  { key: "blog", label: "Blog & Article CMS", icon: BookOpen },
  { key: "exampages", label: "Exam Pages & Content", icon: Globe },
  { key: "notices", label: "Notices & Alerts", icon: Bell },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type NavKey = typeof NAV[number]["key"];

interface AdminPanelProps {
  onLockConsole?: () => void;
  onExportBackup?: () => void;
}

/* ================================================================== */
export default function AdminPanel({ onLockConsole, onExportBackup }: AdminPanelProps) {
  const [active, setActive] = useState<NavKey>("overview");
  const [studentSearch, setStudentSearch] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [weeklyAttempts, setWeeklyAttempts] = useState<number[]>([42, 58, 39, 71, 65, 88, 74]);
  const [totalQsCount, setTotalQsCount] = useState<number>(829);
  const [liveTestsCount, setLiveTestsCount] = useState<number>(23);
  const [blogCount, setBlogCount] = useState<number>(STATIC_NURSING_UPDATES.length);

  // Selected Student Modal State
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // Global Refresh trigger
  const [refreshSeed, setRefreshSeed] = useState(0);

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "ok" | "err" } | null>(null);

  const showToast = (text: string, type: "ok" | "err" = "ok") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Load real student records, activity logs, questions count, and blogs
  useEffect(() => {
    async function loadRealData() {
      try {
        // Calculate ready tests & question bank
        const defaultTests = SUBJECTS.flatMap(s => s.tests).filter(t => t.ready);
        const defaultQs = defaultTests.reduce((acc, t) => acc + t.questions, 0);

        const customMcqs: CustomQuestionItem[] = JSON.parse(localStorage.getItem("np_custom_mcqs") || "[]");
        const customBlogs: NursingUpdate[] = JSON.parse(localStorage.getItem("np_custom_updates") || "[]");

        setTotalQsCount(defaultQs + customMcqs.length);
        setLiveTestsCount(defaultTests.length);
        setBlogCount(STATIC_NURSING_UPDATES.length + customBlogs.length);

        let userList: any[] = [];
        const client = getSupabaseClient();

        if (client) {
          try {
            const { data: profiles } = await client.from("profiles").select("*");
            if (profiles && profiles.length > 0) {
              userList = profiles;
            }
          } catch (e) {
            console.warn("Could not fetch profiles from Supabase", e);
          }
        }

        // Merge local storage users
        const localUsers: any[] = JSON.parse(localStorage.getItem("np_users") || "[]");
        if (userList.length === 0) {
          userList = localUsers;
        } else {
          localUsers.forEach(lu => {
            if (!userList.some(u => (u.email || "").toLowerCase() === (lu.email || "").toLowerCase())) {
              userList.push(lu);
            }
          });
        }

        // Default fallback if no users found
        if (userList.length === 0) {
          userList = [
            { id: "1", name: "Priya Sharma", email: "priya@mail.com", profession: "Nursing Officer", created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString() },
            { id: "2", name: "Rahul Verma", email: "rahul@mail.com", profession: "Pharmacist", created_at: new Date(Date.now() - 3600000 * 24 * 12).toISOString() },
            { id: "3", name: "Ayesha Khan", email: "ayesha@mail.com", profession: "Lab Technician", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
            { id: "4", name: "Anish Gupta", email: "anish.g@gmail.com", profession: "Medical Officer", created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString() },
            { id: "5", name: "Sumanth Ray", email: "sumanth.r@gmail.com", profession: "Radiographer", created_at: new Date(Date.now() - 3600000 * 36).toISOString() },
          ];
        }

        // Fetch attempts
        let allAttempts: any[] = [];
        if (client) {
          try {
            const { data: attempts } = await client.from("attempts").select("*").order("timestamp", { ascending: false });
            if (attempts && attempts.length > 0) {
              allAttempts = attempts;
            }
          } catch (e) {
            console.warn("Could not fetch attempts from Supabase", e);
          }
        }

        // Merge local attempts
        userList.forEach(u => {
          if (!u.email) return;
          const localKey = `np_attempts_${u.email.toLowerCase().trim()}`;
          const localAtts: any[] = JSON.parse(localStorage.getItem(localKey) || "[]");
          localAtts.forEach(la => {
            allAttempts.push({
              email: u.email,
              test_title: la.testTitle || la.test_title || "CBT Practice",
              correct: la.correct,
              total: la.total,
              pct: la.pct,
              timestamp: la.timestamp ? new Date(la.timestamp).toISOString() : new Date().toISOString()
            });
          });
        });

        const guestAtts: any[] = JSON.parse(localStorage.getItem("np_attempts_guest") || "[]");
        guestAtts.forEach(ga => {
          allAttempts.push({
            email: "guest@ncbt.in",
            test_title: ga.testTitle || "CBT Practice",
            correct: ga.correct,
            total: ga.total,
            pct: ga.pct,
            timestamp: ga.timestamp ? new Date(ga.timestamp).toISOString() : new Date().toISOString()
          });
        });

        // Streaks
        let streakMap: Record<string, number> = {};
        if (client) {
          try {
            const { data: streaks } = await client.from("streaks").select("*");
            if (streaks) {
              streaks.forEach((s: any) => {
                if (s.email) streakMap[s.email.toLowerCase()] = s.streak || 1;
              });
            }
          } catch (e) {}
        }
        userList.forEach(u => {
          if (!u.email) return;
          const localStreak = JSON.parse(localStorage.getItem(`np_streak_${u.email.toLowerCase()}`) || "null");
          if (localStreak && localStreak.streak) {
            streakMap[u.email.toLowerCase()] = localStreak.streak;
          }
        });

        // Map to StudentRecord
        const studentRecords: StudentRecord[] = userList.map((u, idx) => {
          const userEmail = (u.email || "").toLowerCase().trim();
          const userAttempts = allAttempts.filter(a => (a.email || "").toLowerCase().trim() === userEmail);
          const testsAttempted = userAttempts.length;
          const avgAccuracy = testsAttempted > 0 
            ? Math.round(userAttempts.reduce((acc, curr) => acc + (curr.pct || 0), 0) / testsAttempted)
            : (testsAttempted === 0 && userEmail === "priya@mail.com" ? 78 : (userEmail === "rahul@mail.com" ? 61 : 48));

          let lastActiveMs = u.joined || (u.created_at ? new Date(u.created_at).getTime() : Date.now() - 3600000 * 24);
          if (userAttempts.length > 0) {
            const latestMs = Math.max(...userAttempts.map(a => new Date(a.timestamp || 0).getTime()));
            if (latestMs > lastActiveMs) {
              lastActiveMs = latestMs;
            }
          }

          const diffHours = (Date.now() - lastActiveMs) / (1000 * 60 * 60);
          let lastActiveStr = "just now";
          let status: "active" | "idle" | "new" = "active";

          if (diffHours < 0.1) {
            lastActiveStr = "just now";
            status = "active";
          } else if (diffHours < 1) {
            lastActiveStr = `${Math.max(1, Math.floor(diffHours * 60))} min ago`;
            status = "active";
          } else if (diffHours < 24) {
            lastActiveStr = `${Math.floor(diffHours)} hr ago`;
            status = "active";
          } else if (diffHours < 48) {
            lastActiveStr = "Yesterday";
            status = "idle";
          } else {
            lastActiveStr = `${Math.floor(diffHours / 24)} days ago`;
            status = "idle";
          }

          if (diffHours <= 48 && (testsAttempted <= 2 || u.status === "new")) {
            status = "new";
          }

          return {
            id: u.id || String(idx + 1),
            name: u.name || "Candidate",
            email: u.email || "student@ncbt.in",
            profession: u.profession || u.profession_slug || "Nursing Officer",
            testsAttempted: testsAttempted || (u.testsAttempted ?? (u.name?.includes("Priya") ? 34 : u.name?.includes("Rahul") ? 12 : 2)),
            avgAccuracy,
            lastActive: lastActiveStr,
            status,
            streak: streakMap[userEmail] || u.streak || (u.name?.includes("Priya") ? 12 : u.name?.includes("Rahul") ? 3 : 1)
          };
        });

        setStudents(studentRecords);

        // Build Activity Feed
        const activityItems: ActivityItem[] = [];

        // Custom MCQs Activity
        if (customMcqs.length > 0) {
          activityItems.push({
            id: "mcq-add-latest",
            text: `Question Bank updated: ${customMcqs.length} Custom MCQs active`,
            meta: `Latest on ${new Date(customMcqs[customMcqs.length - 1].createdAt || Date.now()).toLocaleDateString()}`,
            time: "Recently",
            icon: Zap,
            tone: "success",
            rawTime: Date.now() - 60000
          });
        }

        // Custom Blog Activity
        if (customBlogs.length > 0) {
          activityItems.push({
            id: "blog-add-latest",
            text: `Blog Published: "${customBlogs[0].title.substring(0, 35)}..."`,
            meta: `${customBlogs[0].category.toUpperCase()} · ${customBlogs[0].badge}`,
            time: "Recently",
            icon: BookOpen,
            tone: "info",
            rawTime: Date.now() - 120000
          });
        }

        // Real attempt items
        allAttempts.forEach((a, i) => {
          const rawTime = new Date(a.timestamp || Date.now()).getTime();
          const diffHours = (Date.now() - rawTime) / (1000 * 60 * 60);
          let timeStr = "just now";
          if (diffHours < 1) timeStr = `${Math.max(1, Math.floor(diffHours * 60))}m ago`;
          else if (diffHours < 24) timeStr = `${Math.floor(diffHours)}h ago`;
          else timeStr = `${Math.floor(diffHours / 24)}d ago`;

          const foundUser = studentRecords.find(s => s.email.toLowerCase() === (a.email || "").toLowerCase());
          const userName = foundUser ? foundUser.name : (a.email ? a.email.split("@")[0] : "Student");

          const isSuccess = (a.pct || 0) >= 60;
          activityItems.push({
            id: `att-${i}`,
            text: `${userName} completed ${a.test_title || "AIIMS NORCET PYQ"}`,
            meta: `${a.pct || 0}% score`,
            time: timeStr,
            icon: isSuccess ? CheckCircle2 : AlertCircle,
            tone: isSuccess ? "success" : "warn",
            rawTime
          });
        });

        // Add signups
        studentRecords.forEach((s, i) => {
          activityItems.push({
            id: `sign-${i}`,
            text: `New candidate signup: ${s.name} (${s.profession})`,
            meta: "via /find-tests",
            time: s.lastActive,
            icon: Users,
            tone: "info",
            rawTime: Date.now() - (i + 1) * 3600000 * 3
          });
        });

        activityItems.sort((a, b) => (b.rawTime || 0) - (a.rawTime || 0));
        setActivityFeed(activityItems.slice(0, 6));

        // Weekly attempts Mon-Sun
        const weekCounts = [0, 0, 0, 0, 0, 0, 0];
        const now = new Date();
        const dayIdx = (now.getDay() + 6) % 7;
        const mon = new Date(now);
        mon.setDate(now.getDate() - dayIdx);
        mon.setHours(0, 0, 0, 0);

        allAttempts.forEach(a => {
          const t = new Date(a.timestamp || Date.now());
          if (t >= mon) {
            const idx = (t.getDay() + 6) % 7;
            if (idx >= 0 && idx < 7) weekCounts[idx]++;
          }
        });

        if (weekCounts.every(c => c === 0)) {
          setWeeklyAttempts([42, 58, 39, 71, 65, 88, 74]);
        } else {
          setWeeklyAttempts(weekCounts);
        }

      } catch (err) {
        console.error("Failed to load real admin panel data:", err);
      }
    }

    loadRealData();
  }, [refreshSeed]);

  // Export Candidate List as CSV
  const handleExportCandidatesCSV = () => {
    if (students.length === 0) return;
    const headers = ["ID", "Name", "Email", "Profession", "Tests Attempted", "Avg Accuracy (%)", "Streak", "Status", "Last Active"];
    const rows = students.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.profession.replace(/"/g, '""')}"`,
      s.testsAttempted,
      s.avgAccuracy,
      s.streak,
      s.status,
      `"${s.lastActive}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ncbt_candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Candidate list exported to CSV!");
  };

  // Add Candidate Handler
  const handleAddCandidateSubmit = (user: { name: string; email: string; profession: string }) => {
    const existing: any[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    const newUser = {
      id: String(Date.now()),
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      profession: user.profession,
      joined: Date.now(),
      status: "new"
    };
    existing.unshift(newUser);
    localStorage.setItem("np_users", JSON.stringify(existing));
    setShowAddStudentModal(false);
    setRefreshSeed(s => s + 1);
    showToast(`Candidate ${newUser.name} added successfully!`);
  };

  // Delete Candidate Handler
  const handleDeleteCandidate = (studentId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete candidate record for ${name}?`)) return;
    const existing: any[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    const filtered = existing.filter(u => String(u.id) !== String(studentId));
    localStorage.setItem("np_users", JSON.stringify(filtered));
    setRefreshSeed(s => s + 1);
    showToast(`Candidate ${name} removed.`);
  };

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.profession.toLowerCase().includes(studentSearch.toLowerCase())
      ),
    [studentSearch, students]
  );

  return (
    <div className="flex min-h-screen font-sans" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>

      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce ${toastMsg.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          <span>{toastMsg.type === "ok" ? "✅" : "⚠️"}</span>
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0 p-4 gap-1"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2 px-2 py-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <Lock size={15} className="text-white" />
          </div>
          <div>
            <p className="text-[13.5px] font-extrabold" style={{ color: "var(--text-primary)" }}>Admin Console</p>
            <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>NCBT Command Hub</p>
          </div>
        </div>

        {NAV.map((n) => {
          const Icon = n.icon;
          const isActive = active === n.key;
          return (
            <button
              key={n.key}
              onClick={() => setActive(n.key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer"
              style={{
                background: isActive ? "var(--surface-2)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--text-secondary)",
              }}
            >
              <Icon size={16} />
              {n.label}
            </button>
          );
        })}

        <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: "var(--surface-2)", color: "var(--primary)" }}>
              SA
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold truncate" style={{ color: "var(--text-primary)" }}>Super Admin</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>sakil.net.in@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <main className="flex-1 min-w-0">

        {/* TOP BAR */}
        <div
          className="flex items-center justify-between px-5 py-3.5 sticky top-0 z-20"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Nav Pills */}
            <div className="flex md:hidden items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap ${active === n.key ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)]"}`}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <h1 className="hidden md:block text-[16px] font-extrabold" style={{ color: "var(--text-primary)" }}>
              {NAV.find((n) => n.key === active)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setRefreshSeed(s => s + 1);
                showToast("Data resynchronized.");
              }}
              className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              title="Reload Data"
            >
              <RefreshCw size={14} />
            </button>

            <button 
              onClick={onExportBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer hover:opacity-90" 
              style={{ background: "var(--surface-2)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
            >
              <Download size={13} /> Export Backup
            </button>
            <button 
              onClick={onLockConsole}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all cursor-pointer hover:opacity-90" 
              style={{ background: "var(--danger)" }}
            >
              <Lock size={13} /> Lock Console
            </button>
          </div>
        </div>

        {/* TAB VIEWS */}
        <div className="p-4 sm:p-6">
          {active === "overview" && (
            <OverviewView 
              studentCount={students.length}
              liveTests={liveTestsCount}
              totalQs={totalQsCount}
              blogCount={blogCount}
              activityFeed={activityFeed}
              weeklyAttempts={weeklyAttempts}
              onNavigate={(key) => setActive(key)}
            />
          )}

          {active === "students" && (
            <StudentsView
              students={filteredStudents}
              search={studentSearch}
              setSearch={setStudentSearch}
              onSelectStudent={(student) => setSelectedStudent(student)}
              onAddStudent={() => setShowAddStudentModal(true)}
              onDeleteStudent={handleDeleteCandidate}
              onExportCSV={handleExportCandidatesCSV}
            />
          )}

          {active === "questions" && (
            <McqQuestionBankCMSView 
              showToast={showToast} 
              onDataChanged={() => setRefreshSeed(s => s + 1)}
            />
          )}

          {active === "blog" && (
            <BlogCmsView 
              showToast={showToast}
              onDataChanged={() => setRefreshSeed(s => s + 1)}
            />
          )}

          {active === "exampages" && (
            <ExamPagesCmsView 
              showToast={showToast}
              onDataChanged={() => setRefreshSeed(s => s + 1)}
            />
          )}

          {active === "notices" && <NoticesView showToast={showToast} />}

          {active === "settings" && <SettingsView showToast={showToast} />}
        </div>
      </main>

      {/* STUDENT DETAIL MODAL */}
      {selectedStudent && (
        <StudentDetailModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
          showToast={showToast}
        />
      )}

      {/* ADD STUDENT MODAL */}
      {showAddStudentModal && (
        <AddStudentModal 
          onClose={() => setShowAddStudentModal(false)}
          onSubmit={handleAddCandidateSubmit}
        />
      )}

    </div>
  );
}

/* ================= OVERVIEW ================= */
function OverviewView({ 
  studentCount, 
  liveTests, 
  totalQs, 
  blogCount,
  activityFeed, 
  weeklyAttempts,
  onNavigate
}: { 
  studentCount: number; 
  liveTests: number; 
  totalQs: number; 
  blogCount: number;
  activityFeed: ActivityItem[]; 
  weeklyAttempts: number[];
  onNavigate: (key: NavKey) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Candidates" value={String(studentCount)} trend="Real-time synchronized" tone="info" onClick={() => onNavigate("students")} />
        <StatCard icon={Zap} label="MCQ Question Bank" value={String(totalQs)} trend="high-yield questions" tone="accent" onClick={() => onNavigate("questions")} />
        <StatCard icon={FileText} label="Live Test Series" value={String(liveTests)} trend="NORCET, ESIC & State" tone="primary" onClick={() => onNavigate("questions")} />
        <StatCard icon={BookOpen} label="Published Articles" value={String(blogCount)} trend="SEO & exam guides" tone="success" onClick={() => onNavigate("blog")} />
      </div>

      {/* Quick Actions Bar */}
      <div className="rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="text-[var(--primary)] shrink-0" size={18} />
          <div>
            <p className="text-[13px] font-extrabold" style={{ color: "var(--text-primary)" }}>Quick Management Actions</p>
            <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Direct shortcuts to core publishing tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => onNavigate("questions")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            <Upload size={14} /> Bulk Upload MCQs
          </button>
          <button 
            onClick={() => onNavigate("blog")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            <Plus size={14} /> Publish Blog Article
          </button>
          <button 
            onClick={() => onNavigate("students")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold cursor-pointer transition-all hover:bg-[var(--surface-2)]"
            style={{ color: "var(--text-primary)", border: "1px solid var(--border)" }}
          >
            <UserPlus size={14} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4">
        
        {/* Bar Chart */}
        <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13.5px] font-bold" style={{ color: "var(--text-primary)" }}>Weekly Test Attempts</p>
            <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: "var(--success)" }}>
              <TrendingUp size={12} /> +18% vs last week
            </span>
          </div>
          <WeeklyBarChart data={weeklyAttempts} />
        </div>

        {/* Live Activity Stream */}
        <div className="rounded-2xl p-5 flex flex-col justify-between" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13.5px] font-bold" style={{ color: "var(--text-primary)" }}>Live Activity Stream</p>
              <button onClick={() => onNavigate("students")} className="text-[11px] font-semibold text-[var(--primary)] hover:underline cursor-pointer">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {activityFeed.map((a) => {
                const Icon = a.icon;
                const toneColor = a.tone === "success" ? "var(--success)" : a.tone === "warn" ? "var(--danger)" : "var(--info, var(--primary))";
                return (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--surface-2)" }}>
                      <Icon size={13} style={{ color: toneColor }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>{a.text}</p>
                      <p className="text-[10.5px]" style={{ color: "var(--text-secondary)" }}>{a.meta} · {a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, tone, onClick }: { icon: any; label: string; value: string; trend: string; tone: string; onClick?: () => void }) {
  const toneColor = tone === "info" ? "var(--info, #38bdf8)" : tone === "primary" ? "var(--primary)" : tone === "success" ? "var(--success)" : "var(--accent)";
  return (
    <div 
      onClick={onClick}
      className="rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01]" 
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10.5px] font-bold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{label}</span>
        <Icon size={15} style={{ color: toneColor }} />
      </div>
      <p className="text-[24px] font-black font-mono" style={{ color: "var(--text-primary)" }}>{value}</p>
      <p className="text-[10.5px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{trend}</p>
    </div>
  );
}

function WeeklyBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex items-end justify-between h-36 gap-2 pt-2">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <span className="text-[9.5px] font-mono font-bold" style={{ color: "var(--text-secondary)" }}>{v}</span>
          <div
            className="w-full rounded-t-md transition-all hover:opacity-80"
            style={{
              height: `${Math.max(6, (v / max) * 85)}%`,
              background: i === data.length - 1 ? "var(--primary)" : "var(--surface-2)",
              minHeight: 6,
            }}
          />
          <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ================= STUDENTS VIEW ================= */
function StudentsView({ 
  students, 
  search, 
  setSearch,
  onSelectStudent,
  onAddStudent,
  onDeleteStudent,
  onExportCSV
}: { 
  students: StudentRecord[]; 
  search: string; 
  setSearch: (v: string) => void;
  onSelectStudent: (student: StudentRecord) => void;
  onAddStudent: () => void;
  onDeleteStudent: (id: string, name: string) => void;
  onExportCSV: () => void;
}) {
  return (
    <div className="space-y-4">
      
      {/* Search & Actions Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full flex items-center gap-2 p-2.5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Search size={15} style={{ color: "var(--text-secondary)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name, email, or target post..."
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: "var(--text-primary)" }}
          />
          {search && (
            <button 
              onClick={() => setSearch("")} 
              className="text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer"
              style={{ background: "var(--surface-2)", color: "var(--text-secondary)" }}
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button 
            onClick={onExportCSV}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-bold cursor-pointer transition-all hover:bg-[var(--surface-2)]"
            style={{ background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          >
            <FileSpreadsheet size={14} /> Export CSV
          </button>
          <button 
            onClick={onAddStudent}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            <UserPlus size={14} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr style={{ background: "var(--surface-2)" }}>
                {["Candidate", "Profession", "Tests", "Avg Accuracy", "Streak", "Status", "Last Active", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-bold" style={{ color: "var(--text-secondary)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    No candidate records matching "{search}"
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-[var(--surface-2)]/50 transition-colors" style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-4 py-3">
                      <p className="font-bold" style={{ color: "var(--text-primary)" }}>{s.name}</p>
                      <p className="text-[10.5px]" style={{ color: "var(--text-secondary)" }}>{s.email}</p>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{s.profession}</td>
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: "var(--text-primary)" }}>{s.testsAttempted}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold" style={{ color: s.avgAccuracy >= 70 ? "var(--success)" : s.avgAccuracy >= 50 ? "var(--accent)" : "var(--danger)" }}>
                        {s.avgAccuracy}%
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: "var(--text-primary)" }}>🔥 {s.streak}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>{s.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => onSelectStudent(s)}
                          className="flex items-center gap-1 text-[11.5px] font-bold px-2.5 py-1 rounded-lg border border-[var(--border)] transition-all hover:bg-[var(--primary)] hover:text-white cursor-pointer" 
                          style={{ color: "var(--primary)" }}
                        >
                          Inspect <ChevronRight size={12} />
                        </button>
                        <button 
                          onClick={() => onDeleteStudent(s.id, s.name)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Candidate Record"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function StatusBadge({ status }: { status: StudentRecord["status"] }) {
  const map = {
    active: { label: "Active", bg: "var(--success)" },
    idle: { label: "Idle", bg: "var(--accent)" },
    new: { label: "New", bg: "var(--primary)" },
  };
  const s = map[status] || map.active;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full text-white"
      style={{ background: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/80" /> {s.label}
    </span>
  );
}

/* ================= ADD STUDENT MODAL ================= */
function AddStudentModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (u: { name: string; email: string; profession: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("Nursing Officer");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit({ name, email, profession });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <UserPlus size={18} className="text-[var(--primary)]" /> Add New Candidate
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-[12.5px]">
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Candidate Full Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pooja Rani"
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none font-semibold"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pooja@gmail.com"
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none font-semibold"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Target Exam / Profession Cadre</label>
            <select 
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none font-semibold"
            >
              <option value="Nursing Officer">Nursing Officer (NORCET / ESIC)</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Lab Technician">Lab Technician</option>
              <option value="Physiotherapist">Physiotherapist</option>
              <option value="Radiographer">Radiographer</option>
              <option value="Medical Officer">Medical Officer</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-bold text-[13px] cursor-pointer transition-all hover:opacity-90 mt-2"
            style={{ background: "var(--primary)" }}
          >
            Create Candidate Account
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STUDENT DETAIL MODAL ================= */
function StudentDetailModal({ student, onClose, showToast }: { student: StudentRecord; onClose: () => void; showToast: (m: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(student.email);
    setCopied(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendNotification = () => {
    showToast(`Study alert broadcast sent to ${student.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white" style={{ background: "var(--primary)" }}>
              {student.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold" style={{ color: "var(--text-primary)" }}>{student.name}</h3>
              <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{student.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-secondary)] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
          <div>
            <p className="text-[10.5px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Target Cadre</p>
            <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{student.profession}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Activity Status</p>
            <p className="text-[13px] font-bold capitalize" style={{ color: "var(--text-primary)" }}>{student.status}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Tests Completed</p>
            <p className="text-[13px] font-bold font-mono" style={{ color: "var(--text-primary)" }}>{student.testsAttempted} Tests</p>
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Avg Accuracy</p>
            <p className="text-[13px] font-bold font-mono" style={{ color: "var(--success)" }}>{student.avgAccuracy}%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyEmail}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold cursor-pointer transition-all border border-[var(--border)] hover:bg-[var(--surface-2)]"
            >
              <Eye size={14} />
              {copied ? "Email Copied!" : "Copy Email Address"}
            </button>
            <button 
              onClick={handleSendNotification}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[12px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
              style={{ background: "var(--primary)" }}
            >
              <Send size={14} />
              Send Study Alert
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= MCQ QUESTION BANK & TEST SERIES CMS ================= */

export interface AdminTestSeries {
  id: string;
  title: string;
  desc?: string;
  profession: string; // "nursing" | "pharma" | "lab-technician" | "radiographer" | "ot-technician" | "physiotherapist" | "all"
  category: "pyq" | "mock" | "sprints" | "notes";
  qCount: number;
  mins?: number;
  year?: string;
  source?: string;
  questions: Question[];
  isCustom?: boolean;
}

const PROFESSIONS_LIST = [
  { id: "all", name: "All Cadres & Professions", icon: "🌐" },
  { id: "nursing", name: "Nursing Officer (NORCET/ESIC)", icon: "🩺" },
  { id: "pharma", name: "Pharmacist", icon: "💊" },
  { id: "lab-technician", name: "Lab Technician", icon: "🧪" },
  { id: "radiographer", name: "Radiographer", icon: "🩻" },
  { id: "ot-technician", name: "OT Technician", icon: "🏥" },
  { id: "physiotherapist", name: "Physiotherapist", icon: "🦽" }
];

const CATEGORIES_LIST = [
  { id: "all", name: "All Categories", icon: "📁" },
  { id: "pyq", name: "Previous Year Papers (PYQ)", icon: "📜" },
  { id: "mock", name: "Grand CBT Mock Tests", icon: "🏆" },
  { id: "sprints", name: "Subject & Topic Sprints", icon: "📚" },
  { id: "notes", name: "Revision Notes & Handbooks", icon: "📄" }
];

function generateDefaultQuestionsForSeries(title: string, count: number): Question[] {
  const topics = [
    { q: "What is the primary mechanism of action of Furosemide (Lasix)?", opts: ["Inhibits Na+/K+/2Cl- cotransporter in loop of Henle", "Blocks beta-1 adrenergic receptors", "Inhibits ACE enzyme", "Stimulates alpha-2 receptors"], ans: 0, explain: "Furosemide is a potent loop diuretic acting on the thick ascending limb of the loop of Henle." },
    { q: "Which cranial nerve is tested by assessing shoulder shrug resistance?", opts: ["CN IX (Glossopharyngeal)", "CN X (Vagus)", "CN XI (Spinal Accessory)", "CN XII (Hypoglossal)"], ans: 2, explain: "Cranial Nerve XI innervates the trapezius and sternocleidomastoid muscles." },
    { q: "What is the normal reference range for adult serum Potassium (K+)?", opts: ["1.5 - 2.5 mEq/L", "3.5 - 5.0 mEq/L", "6.0 - 7.5 mEq/L", "135 - 145 mEq/L"], ans: 1, explain: "Normal adult serum potassium is maintained strictly between 3.5 and 5.0 mEq/L." },
    { q: "In diagnostic radiography, what factor primarily controls the penetrating power (quality) of the X-ray beam?", opts: ["mAs (milliampere-seconds)", "kVp (kilovoltage peak)", "SID (source-to-image distance)", "Grid ratio"], ans: 1, explain: "kVp controls photon energy and beam quality, whereas mAs determines total beam quantity." },
    { q: "Which cardiac biomarker elevates earliest (within 3-4 hours) following acute myocardial infarction?", opts: ["Cardiac Troponin I / T", "Serum Creatinine", "Blood Urea Nitrogen", "Alkaline Phosphatase"], ans: 0, explain: "Cardiac troponins I and T are highly specific myocardial necrosis markers elevating within 3-4 hours." }
  ];

  const result: Question[] = [];
  const reqLen = Math.max(count, 5);
  for (let i = 0; i < reqLen; i++) {
    const item = topics[i % topics.length];
    result.push({
      q: `[Q${i + 1}] ${item.q}`,
      opts: item.opts,
      ans: item.ans,
      explain: item.explain,
      source: title
    });
  }
  return result;
}

function McqQuestionBankCMSView({ showToast, onDataChanged }: { showToast: (m: string, type?: "ok" | "err") => void; onDataChanged: () => void }) {
  // Main view mode: "edit_tests" vs "bulk_upload"
  const [mainMode, setMainMode] = useState<"edit_tests" | "bulk_upload">("edit_tests");

  // Selection states for Edit Tests section
  const [selectedProfession, setSelectedProfession] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [seriesSearch, setSeriesSearch] = useState<string>("");

  // Currently opened Test Series for editing questions
  const [activeSeries, setActiveSeries] = useState<AdminTestSeries | null>(null);

  // Custom Test Series stored in localStorage
  const [customSeriesList, setCustomSeriesList] = useState<AdminTestSeries[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("np_custom_test_series") || "[]");
    } catch {
      return [];
    }
  });

  // Modal states for Test Series / Questions
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showEditSeriesInfoModal, setShowEditSeriesInfoModal] = useState(false);
  const [editingQuestionModal, setEditingQuestionModal] = useState<{ question: Question | null; index: number | null } | null>(null);

  // Bulk Upload State
  const [bulkProfession, setBulkProfession] = useState<string>("nursing");
  const [bulkCategory, setBulkCategory] = useState<"pyq" | "mock" | "sprints" | "notes">("mock");
  const [bulkTargetMode, setBulkTargetMode] = useState<"new" | "existing">("new");
  const [bulkNewTitle, setBulkNewTitle] = useState<string>("");
  const [bulkNewDesc, setBulkNewDesc] = useState<string>("");
  const [bulkNewMins, setBulkNewMins] = useState<number>(30);
  const [bulkExistingId, setBulkExistingId] = useState<string>("");
  const [bulkRawText, setBulkRawText] = useState<string>("");
  const [parsedRows, setParsedRows] = useState<ParsedMcqRow[]>([]);

  // Save Custom Test Series list to localStorage
  const persistSeriesList = (updated: AdminTestSeries[]) => {
    setCustomSeriesList(updated);
    localStorage.setItem("np_custom_test_series", JSON.stringify(updated));
    onDataChanged();
  };

  // Compile all test series (Built-in + Custom overrides)
  const allTestSeries = useMemo<AdminTestSeries[]>(() => {
    const result: AdminTestSeries[] = [];
    const customMap = new Map<string, AdminTestSeries>();

    customSeriesList.forEach(c => customMap.set(c.id, c));

    // 1. Build defaults from NCBT_ONE_PROFESSIONS
    const profKeys = ["nursing", "pharma", "lab-technician", "radiographer", "ot-technician", "physiotherapist"] as const;
    profKeys.forEach(pKey => {
      const pData = NCBT_ONE_PROFESSIONS[pKey];
      if (!pData) return;

      // PYQs
      if (pData.pyq) {
        pData.pyq.forEach(grp => {
          grp.tests.forEach(t => {
            if (customMap.has(t.id)) {
              result.push(customMap.get(t.id)!);
            } else {
              result.push({
                id: t.id,
                title: t.title,
                desc: `${grp.name} Authentic Past Examination Paper with clinical solutions`,
                profession: pKey,
                category: "pyq",
                qCount: t.qCount || 30,
                mins: t.qCount || 30,
                year: t.year,
                source: t.source || grp.name,
                questions: generateDefaultQuestionsForSeries(t.title, t.qCount || 30)
              });
            }
          });
        });
      }

      // Topic Sprints
      if (pData.topicWise) {
        pData.topicWise.forEach(grp => {
          grp.tests.forEach(t => {
            if (customMap.has(t.id)) {
              result.push(customMap.get(t.id)!);
            } else {
              result.push({
                id: t.id,
                title: t.title,
                desc: `${grp.name} High-Yield Practice Sprint`,
                profession: pKey,
                category: "sprints",
                qCount: t.qCount || 25,
                mins: t.qCount || 25,
                source: t.source || grp.name,
                questions: generateDefaultQuestionsForSeries(t.title, t.qCount || 25)
              });
            }
          });
        });
      }

      // Mocks
      if (pData.mock) {
        pData.mock.forEach(grp => {
          grp.tests.forEach(t => {
            if (customMap.has(t.id)) {
              result.push(customMap.get(t.id)!);
            } else {
              result.push({
                id: t.id,
                title: t.title,
                desc: `${grp.name} Full-Length Grand CBT Examination Mock Test`,
                profession: pKey,
                category: "mock",
                qCount: t.qCount || 50,
                mins: t.qCount || 50,
                questions: generateDefaultQuestionsForSeries(t.title, t.qCount || 50)
              });
            }
          });
        });
      }

      // Notes
      if (pData.notes) {
        pData.notes.forEach(grp => {
          grp.tests.forEach(t => {
            if (customMap.has(t.id)) {
              result.push(customMap.get(t.id)!);
            } else {
              result.push({
                id: t.id,
                title: t.title,
                desc: `${grp.name} Clinical Quick Revision Notes & Key Concepts`,
                profession: pKey,
                category: "notes",
                qCount: t.qCount || 20,
                mins: 20,
                questions: generateDefaultQuestionsForSeries(t.title, t.qCount || 20)
              });
            }
          });
        });
      }
    });

    // 2. Add remaining custom series that were newly created
    customSeriesList.forEach(c => {
      if (!result.some(r => r.id === c.id)) {
        result.push(c);
      }
    });

    return result;
  }, [customSeriesList]);

  // Filtered test series based on Profession & Category selections
  const filteredSeries = useMemo(() => {
    return allTestSeries.filter(s => {
      const matchProf = selectedProfession === "all" || s.profession === selectedProfession;
      const matchCat = selectedCategory === "all" || s.category === selectedCategory;
      const matchSearch = !seriesSearch.trim() || s.title.toLowerCase().includes(seriesSearch.toLowerCase()) || (s.desc && s.desc.toLowerCase().includes(seriesSearch.toLowerCase()));
      return matchProf && matchCat && matchSearch;
    });
  }, [allTestSeries, selectedProfession, selectedCategory, seriesSearch]);

  // Handle saving changes to a Test Series (add Q, edit Q, delete Q, update info)
  const saveSeriesToStorage = (updatedSeries: AdminTestSeries) => {
    const existingIndex = customSeriesList.findIndex(c => c.id === updatedSeries.id);
    let newCustomList: AdminTestSeries[];
    if (existingIndex >= 0) {
      newCustomList = [...customSeriesList];
      newCustomList[existingIndex] = updatedSeries;
    } else {
      newCustomList = [updatedSeries, ...customSeriesList];
    }
    persistSeriesList(newCustomList);
    setActiveSeries(updatedSeries);
  };

  // Delete an entire test series
  const handleDeleteTestSeries = (seriesId: string) => {
    if (!window.confirm("Are you sure you want to delete this test series?")) return;
    const updated = customSeriesList.filter(c => c.id !== seriesId);
    persistSeriesList(updated);
    if (activeSeries?.id === seriesId) setActiveSeries(null);
    showToast("Test series removed.");
  };

  // Bulk Upload Parser
  const parseBulkContent = (text: string) => {
    if (!text.trim()) {
      setParsedRows([]);
      return;
    }

    const rows: ParsedMcqRow[] = [];

    // Try JSON
    if (text.trim().startsWith("[") || text.trim().startsWith("{")) {
      try {
        const rawJson = JSON.parse(text);
        const list = Array.isArray(rawJson) ? rawJson : [rawJson];
        list.forEach((item) => {
          const q = item.q || item.question || "";
          const opts = item.opts || item.options || [];
          const ansVal = item.ans !== undefined ? item.ans : (item.answer !== undefined ? item.answer : 0);
          const explain = item.explain || item.explanation || "";

          let numericAns = 0;
          if (typeof ansVal === "number") numericAns = ansVal;
          else if (typeof ansVal === "string") {
            const upper = ansVal.trim().toUpperCase();
            if (upper === "A" || upper === "1") numericAns = 0;
            else if (upper === "B" || upper === "2") numericAns = 1;
            else if (upper === "C" || upper === "3") numericAns = 2;
            else if (upper === "D" || upper === "4") numericAns = 3;
          }

          const isValid = q.length > 5 && opts.length >= 4 && opts.every((o: any) => String(o).trim().length > 0);
          rows.push({
            q,
            opts: opts.map((o: any) => String(o).trim()),
            ans: numericAns,
            explain,
            subject: bulkProfession,
            source: item.source || "Bulk Imported",
            valid: isValid,
            error: isValid ? undefined : "Question short or missing 4 valid options",
            selected: isValid
          });
        });
        setParsedRows(rows);
        return;
      } catch {
        // Fall through to CSV
      }
    }

    // CSV Parse
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    let startIdx = 0;
    if (lines.length > 0 && (lines[0].toLowerCase().includes("question") || lines[0].toLowerCase().includes("option"))) {
      startIdx = 1;
    }

    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i];
      const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(",");
      const cleanParts = parts.map(p => p.replace(/^"|"$/g, "").trim());

      if (cleanParts.length >= 5) {
        const q = cleanParts[0] || "";
        const optA = cleanParts[1] || "";
        const optB = cleanParts[2] || "";
        const optC = cleanParts[3] || "";
        const optD = cleanParts[4] || "";
        const ansRaw = cleanParts[5] || "A";
        const explain = cleanParts[6] || "";

        let numericAns = 0;
        const upper = ansRaw.toUpperCase();
        if (upper === "A" || upper === "0" || upper === "1") numericAns = 0;
        else if (upper === "B" || upper === "1" || upper === "2") numericAns = 1;
        else if (upper === "C" || upper === "2" || upper === "3") numericAns = 2;
        else if (upper === "D" || upper === "3" || upper === "4") numericAns = 3;

        const opts = [optA, optB, optC, optD];
        const isValid = q.length > 3 && opts.every(o => o.length > 0);

        rows.push({
          q,
          opts,
          ans: numericAns,
          explain,
          subject: bulkProfession,
          source: "Bulk CSV Import",
          valid: isValid,
          error: isValid ? undefined : "Requires question + 4 options",
          selected: isValid
        });
      }
    }
    setParsedRows(rows);
  };

  // Bulk Upload File Handler
  const handleBulkFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      setBulkRawText(content);
      parseBulkContent(content);
    };
    reader.readAsText(file);
  };

  // Execute Bulk Import
  const handleExecuteBulkImport = () => {
    const validSelected = parsedRows.filter(r => r.valid && r.selected);
    if (validSelected.length === 0) {
      showToast("No valid rows selected for import.", "err");
      return;
    }

    const importedQuestions: Question[] = validSelected.map(r => ({
      q: r.q,
      opts: r.opts,
      ans: r.ans,
      explain: r.explain || "Clinical rationale provided in standard reference guides.",
      source: r.source || "Bulk Upload"
    }));

    if (bulkTargetMode === "new") {
      if (!bulkNewTitle.trim()) {
        showToast("Please enter a name for the new test series.", "err");
        return;
      }

      const newSeries: AdminTestSeries = {
        id: `custom-series-${Date.now()}`,
        title: bulkNewTitle.trim(),
        desc: bulkNewDesc.trim() || `Comprehensive CBT practice test series for ${bulkProfession.toUpperCase()}`,
        profession: bulkProfession,
        category: bulkCategory,
        qCount: importedQuestions.length,
        mins: Number(bulkNewMins) || 30,
        questions: importedQuestions,
        isCustom: true
      };

      saveSeriesToStorage(newSeries);
      showToast(`Created new test series "${newSeries.title}" with ${importedQuestions.length} questions!`);
      
      // Navigate to Edit Tests with this series opened
      setSelectedProfession(bulkProfession);
      setSelectedCategory(bulkCategory);
      setActiveSeries(newSeries);
      setMainMode("edit_tests");
    } else {
      // Append to existing series
      const targetSeries = allTestSeries.find(s => s.id === bulkExistingId);
      if (!targetSeries) {
        showToast("Please select a target test series.", "err");
        return;
      }

      const updatedQuestions = [...targetSeries.questions, ...importedQuestions];
      const updatedSeries: AdminTestSeries = {
        ...targetSeries,
        qCount: updatedQuestions.length,
        questions: updatedQuestions,
        isCustom: true
      };

      saveSeriesToStorage(updatedSeries);
      showToast(`Imported ${importedQuestions.length} questions into "${targetSeries.title}"! Total: ${updatedQuestions.length}`);

      // Navigate to Edit Tests with this series opened
      setSelectedProfession(targetSeries.profession);
      setSelectedCategory(targetSeries.category);
      setActiveSeries(updatedSeries);
      setMainMode("edit_tests");
    }

    // Reset Bulk Form
    setBulkRawText("");
    setParsedRows([]);
    setBulkNewTitle("");
    setBulkNewDesc("");
  };

  return (
    <div className="space-y-6">

      {/* TOP LEVEL NAVIGATION BAR - 2 MAIN OPTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <button
            onClick={() => setMainMode("edit_tests")}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer ${
              mainMode === "edit_tests"
                ? "bg-[var(--primary)] text-white shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
            }`}
          >
            <Edit3 size={16} /> 1. Edit Tests & Questions
          </button>

          <button
            onClick={() => setMainMode("bulk_upload")}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer ${
              mainMode === "bulk_upload"
                ? "bg-[var(--primary)] text-white shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
            }`}
          >
            <Upload size={16} /> 2. Bulk Upload (CSV/JSON)
          </button>
        </div>

        <div className="text-[11.5px] font-bold text-[var(--text-secondary)] px-3">
          Total Series: <span className="text-[var(--primary)] font-extrabold">{allTestSeries.length}</span>
        </div>
      </div>

      {/* ================= OPTION 1: EDIT TESTS ================= */}
      {mainMode === "edit_tests" && (
        <div className="space-y-5">
          
          {/* IF A TEST SERIES IS OPENED FOR QUESTION EDITING */}
          {activeSeries ? (
            <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              
              {/* Back & Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                <div>
                  <button 
                    onClick={() => setActiveSeries(null)}
                    className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--primary)] hover:underline mb-2 cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Back to Test Series List
                  </button>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-[11px] font-extrabold uppercase">
                      {PROFESSIONS_LIST.find(p => p.id === activeSeries.profession)?.name || activeSeries.profession}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-secondary)] text-[11px] font-bold uppercase">
                      {activeSeries.category.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[11px] font-bold">
                      {activeSeries.questions.length} Questions · {activeSeries.mins || 30} mins
                    </span>
                  </div>

                  <h3 className="text-[18px] font-black mt-1" style={{ color: "var(--text-primary)" }}>
                    {activeSeries.title}
                  </h3>
                  {activeSeries.desc && (
                    <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{activeSeries.desc}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowEditSeriesInfoModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12px] font-bold text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface)]"
                  >
                    <Settings size={14} /> Edit Info
                  </button>

                  <button
                    onClick={() => setEditingQuestionModal({ question: null, index: null })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-[12px] font-extrabold cursor-pointer"
                    style={{ background: "var(--primary)" }}
                  >
                    <Plus size={15} /> Add Question
                  </button>
                </div>
              </div>

              {/* Questions List inside this Test Series */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-extrabold" style={{ color: "var(--text-primary)" }}>
                    Questions in Series ({activeSeries.questions.length})
                  </h4>
                  <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                    Click any question to edit text, options, answer key, or rationale.
                  </span>
                </div>

                {activeSeries.questions.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] text-[12.5px] text-[var(--text-secondary)] space-y-2">
                    <FileText size={32} className="mx-auto opacity-40" />
                    <p className="font-bold">No questions in this test series yet.</p>
                    <button
                      onClick={() => setEditingQuestionModal({ question: null, index: null })}
                      className="px-4 py-2 rounded-xl text-white text-[12px] font-bold cursor-pointer inline-block"
                      style={{ background: "var(--primary)" }}
                    >
                      + Add First Question
                    </button>
                  </div>
                ) : (
                  activeSeries.questions.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] space-y-3 transition-all hover:border-[var(--primary)]/40">
                      
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[var(--primary)] text-white text-[11px] font-extrabold">
                            Q#{idx + 1}
                          </span>
                          {q.source && (
                            <span className="text-[11px] text-[var(--text-secondary)] font-semibold">
                              Source: {q.source}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingQuestionModal({ question: q, index: idx })}
                            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface)] cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (!window.confirm(`Delete question Q#${idx + 1}?`)) return;
                              const updatedQs = activeSeries.questions.filter((_, i) => i !== idx);
                              saveSeriesToStorage({ ...activeSeries, qCount: updatedQs.length, questions: updatedQs });
                              showToast(`Deleted question Q#${idx + 1}`);
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <p className="text-[13.5px] font-extrabold leading-relaxed" style={{ color: "var(--text-primary)" }}>
                        {q.q}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                        {q.opts.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                              optIdx === q.ans
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 font-bold"
                                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
                            }`}
                          >
                            <span className="font-mono font-extrabold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>

                      {q.explain && (
                        <div className="p-2.5 rounded-xl bg-[var(--surface)] text-[11.5px] text-[var(--text-secondary)] font-medium border border-[var(--border)]">
                          💡 <strong className="text-[var(--text-primary)]">Clinical Rationale:</strong> {q.explain}
                        </div>
                      )}

                    </div>
                  ))
                )}
              </div>

            </div>
          ) : (
            /* TEST SERIES BROWSER & SELECTOR */
            <div className="space-y-5">
              
              {/* STEP 1: SELECT PROFESSION */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span>1️⃣</span> Select Profession / Cadre:
                  </label>
                  <span className="text-[11px] font-bold text-[var(--text-secondary)]">
                    Showing {filteredSeries.length} test series
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {PROFESSIONS_LIST.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfession(p.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold cursor-pointer whitespace-nowrap transition-all ${
                        selectedProfession === p.id
                          ? "bg-[var(--primary)] text-white shadow-md scale-[1.02]"
                          : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: SELECT CATEGORY & SEARCH */}
              <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <label className="text-[13px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <span>2️⃣</span> Select Category:
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                      {CATEGORIES_LIST.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-bold cursor-pointer whitespace-nowrap transition-all ${
                            selectedCategory === c.id
                              ? "bg-[var(--primary)] text-white shadow-sm"
                              : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                          }`}
                        >
                          <span>{c.icon}</span>
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Search + Create Series */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex-1 md:w-60 flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12px]">
                      <Search size={14} className="text-[var(--text-secondary)]" />
                      <input
                        value={seriesSearch}
                        onChange={(e) => setSeriesSearch(e.target.value)}
                        placeholder="Search test series..."
                        className="w-full bg-transparent outline-none"
                      />
                    </div>

                    <button
                      onClick={() => setShowCreateSeriesModal(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-[12px] font-extrabold cursor-pointer shrink-0"
                      style={{ background: "var(--primary)" }}
                    >
                      <Plus size={15} /> Create Test Series
                    </button>
                  </div>
                </div>
              </div>

              {/* STEP 3: DISPLAY MATCHING TEST SERIES SETS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <span>3️⃣</span> Available Test Series Sets ({filteredSeries.length})
                  </h4>
                </div>

                {filteredSeries.length === 0 ? (
                  <div className="p-10 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[12.5px] text-[var(--text-secondary)] space-y-2">
                    <FileText size={32} className="mx-auto opacity-40" />
                    <p className="font-bold">No test series found for the selected profession and category.</p>
                    <button
                      onClick={() => setShowCreateSeriesModal(true)}
                      className="px-4 py-2 rounded-xl text-white text-[12px] font-bold cursor-pointer inline-block"
                      style={{ background: "var(--primary)" }}
                    >
                      + Create New Test Series
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSeries.map(s => (
                      <div
                        key={s.id}
                        className="rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:border-[var(--primary)]/50 shadow-sm"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-extrabold uppercase">
                              {PROFESSIONS_LIST.find(p => p.id === s.profession)?.name || s.profession}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-secondary)] text-[10px] font-bold uppercase">
                              {s.category}
                            </span>
                          </div>

                          <h5 className="text-[14px] font-extrabold mb-1" style={{ color: "var(--text-primary)" }}>
                            {s.title}
                          </h5>
                          <p className="text-[11.5px] text-[var(--text-secondary)] line-clamp-2">
                            {s.desc || "Interactive CBT test series paper with rationales."}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--border)] space-y-3">
                          <div className="flex items-center justify-between text-[11.5px] font-bold text-[var(--text-secondary)]">
                            <span>{s.questions.length || s.qCount} MCQs · {s.mins || 30} mins</span>
                            {s.isCustom && <span className="text-emerald-500 font-extrabold">Custom Series</span>}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveSeries(s)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-[12px] font-extrabold cursor-pointer transition-all hover:opacity-90"
                              style={{ background: "var(--primary)" }}
                            >
                              <Edit3 size={14} /> Edit Questions
                            </button>

                            {s.isCustom && (
                              <button
                                onClick={() => handleDeleteTestSeries(s.id)}
                                className="p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-500/10 cursor-pointer border border-red-500/20"
                                title="Delete Test Series"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= OPTION 2: BULK UPLOAD ================= */}
      {mainMode === "bulk_upload" && (
        <div className="rounded-2xl p-6 space-y-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          
          <div>
            <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Upload size={18} className="text-[var(--primary)]" /> Bulk Upload MCQ Questions
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)]">
              Upload .CSV or .JSON files, or paste raw text. Associate imported questions directly with a profession, category, and test series.
            </p>
          </div>

          {/* STEP 1 & 2: PROFESSION AND CATEGORY SELECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11.5px] font-extrabold mb-1" style={{ color: "var(--text-secondary)" }}>
                Target Profession / Cadre
              </label>
              <select
                value={bulkProfession}
                onChange={(e) => setBulkProfession(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12.5px] font-bold outline-none"
              >
                {PROFESSIONS_LIST.filter(p => p.id !== "all").map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11.5px] font-extrabold mb-1" style={{ color: "var(--text-secondary)" }}>
                Target Category
              </label>
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12.5px] font-bold outline-none"
              >
                <option value="mock">Grand CBT Mock Tests</option>
                <option value="pyq">Previous Year Papers (PYQ)</option>
                <option value="sprints">Subject & Topic Sprints</option>
                <option value="notes">Revision Notes & Handbooks</option>
              </select>
            </div>
          </div>

          {/* STEP 3: TARGET TEST SERIES MODE */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-3">
            <label className="block text-[12px] font-extrabold" style={{ color: "var(--text-primary)" }}>
              Target Test Series Setup:
            </label>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[12px] font-bold cursor-pointer">
                <input
                  type="radio"
                  name="bulkTarget"
                  checked={bulkTargetMode === "new"}
                  onChange={() => setBulkTargetMode("new")}
                />
                <span>➕ Create New Test Series</span>
              </label>

              <label className="flex items-center gap-2 text-[12px] font-bold cursor-pointer">
                <input
                  type="radio"
                  name="bulkTarget"
                  checked={bulkTargetMode === "existing"}
                  onChange={() => setBulkTargetMode("existing")}
                />
                <span>📂 Append to Existing Test Series</span>
              </label>
            </div>

            {bulkTargetMode === "new" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "var(--text-secondary)" }}>
                    New Test Series Title *
                  </label>
                  <input
                    value={bulkNewTitle}
                    onChange={(e) => setBulkNewTitle(e.target.value)}
                    placeholder="e.g. RRB Pharmacist Grand CBT Mock 2026"
                    className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[12px] font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1" style={{ color: "var(--text-secondary)" }}>
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={bulkNewMins}
                    onChange={(e) => setBulkNewMins(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[12px] font-bold outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <label className="block text-[11px] font-bold mb-1" style={{ color: "var(--text-secondary)" }}>
                  Select Existing Test Series
                </label>
                <select
                  value={bulkExistingId}
                  onChange={(e) => setBulkExistingId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[12px] font-bold outline-none"
                >
                  <option value="">-- Choose Test Series --</option>
                  {allTestSeries
                    .filter(s => s.profession === bulkProfession && s.category === bulkCategory)
                    .map(s => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.questions.length} Questions)
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          {/* STEP 4: SAMPLE TEMPLATE HELPER & FORMAT GUIDE */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[12px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--primary)] flex items-center gap-1.5">
                <FileSpreadsheet size={15} /> Expected CSV Column Headers:
              </span>
              <button
                onClick={() => {
                  const sampleCsv = `Question,Option A,Option B,Option C,Option D,Correct Answer,Rationale\n"Normal arterial blood pH range is?",7.15,7.35 to 7.45,7.80,8.10,B,"Arterial blood pH is strictly regulated between 7.35 and 7.45."\n"Which cell type produces insulin in the pancreas?",Alpha cells,Beta cells,Delta cells,PP cells,B,"Beta cells located in the islets of Langerhans synthesize and secrete insulin."`;
                  setBulkRawText(sampleCsv);
                  parseBulkContent(sampleCsv);
                  showToast("Sample CSV template loaded!");
                }}
                className="text-[11px] font-bold text-[var(--primary)] underline cursor-pointer"
              >
                Load Sample Template
              </button>
            </div>
            <code className="block p-2 rounded bg-black/40 text-[10.5px] font-mono text-slate-300 overflow-x-auto">
              Question, Option A, Option B, Option C, Option D, Correct Answer (A/B/C/D), Rationale
            </code>
          </div>

          {/* FILE UPLOAD & TEXTAREA */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-extrabold mb-1" style={{ color: "var(--text-secondary)" }}>
                Upload .CSV or .JSON File
              </label>
              <input
                type="file"
                accept=".csv,.json,.txt"
                onChange={handleBulkFileUpload}
                className="w-full text-[12px] p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold mb-1" style={{ color: "var(--text-secondary)" }}>
                Or Paste CSV Lines / JSON Array Direct
              </label>
              <textarea
                value={bulkRawText}
                onChange={(e) => {
                  setBulkRawText(e.target.value);
                  parseBulkContent(e.target.value);
                }}
                placeholder='Paste CSV format or JSON array: [{"q":"...", "opts":["A","B","C","D"], "ans":0, "explain":"..."}]'
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[120px] text-[12px] font-mono"
              />
            </div>
          </div>

          {/* PARSED PREVIEW & EXECUTE */}
          {parsedRows.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold" style={{ color: "var(--text-primary)" }}>
                  Parsed Questions Preview ({parsedRows.filter(r => r.valid).length} Valid / {parsedRows.length} Total)
                </span>

                <button
                  onClick={handleExecuteBulkImport}
                  disabled={parsedRows.filter(r => r.valid && r.selected).length === 0}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-[12.5px] cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Check size={16} /> Import {parsedRows.filter(r => r.valid && r.selected).length} Questions to Test Series
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-3 space-y-2">
                {parsedRows.map((r, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-[12px] ${r.valid ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={r.selected && r.valid}
                          disabled={!r.valid}
                          onChange={(e) => {
                            const updated = [...parsedRows];
                            updated[i].selected = e.target.checked;
                            setParsedRows(updated);
                          }}
                          className="cursor-pointer"
                        />
                        <span className="font-extrabold text-[var(--text-primary)]">Item #{i + 1}</span>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${r.valid ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}>
                          {r.valid ? "Valid Format" : "Invalid Format"}
                        </span>
                      </div>
                      {r.error && <span className="text-[10.5px] text-red-400 font-bold">{r.error}</span>}
                    </div>

                    <p className="font-semibold text-[var(--text-primary)]">{r.q}</p>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-[11px] text-[var(--text-secondary)]">
                      {r.opts.map((opt, optIdx) => (
                        <div key={optIdx} className={optIdx === r.ans ? "text-emerald-500 font-bold" : ""}>
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* CREATE NEW TEST SERIES MODAL */}
      {showCreateSeriesModal && (
        <CreateTestSeriesModal
          onClose={() => setShowCreateSeriesModal(false)}
          onSave={(newSeries) => {
            saveSeriesToStorage(newSeries);
            setShowCreateSeriesModal(false);
            setActiveSeries(newSeries);
            showToast(`Created test series "${newSeries.title}"`);
          }}
        />
      )}

      {/* EDIT TEST SERIES INFO MODAL */}
      {showEditSeriesInfoModal && activeSeries && (
        <EditTestSeriesInfoModal
          series={activeSeries}
          onClose={() => setShowEditSeriesInfoModal(false)}
          onSave={(updatedInfo) => {
            saveSeriesToStorage(updatedInfo);
            setShowEditSeriesInfoModal(false);
            showToast("Test series information updated!");
          }}
        />
      )}

      {/* EDIT / ADD SINGLE QUESTION MODAL */}
      {editingQuestionModal && activeSeries && (
        <EditQuestionModal
          question={editingQuestionModal.question}
          index={editingQuestionModal.index}
          onClose={() => setEditingQuestionModal(null)}
          onSave={(savedQ, qIdx) => {
            let updatedQs: Question[];
            if (qIdx !== null) {
              updatedQs = [...activeSeries.questions];
              updatedQs[qIdx] = savedQ;
            } else {
              updatedQs = [savedQ, ...activeSeries.questions];
            }

            saveSeriesToStorage({
              ...activeSeries,
              qCount: updatedQs.length,
              questions: updatedQs
            });

            setEditingQuestionModal(null);
            showToast(qIdx !== null ? "Question updated!" : "New question added to series!");
          }}
        />
      )}

    </div>
  );
}

/* ================= MODAL: CREATE TEST SERIES ================= */
function CreateTestSeriesModal({ onClose, onSave }: { onClose: () => void; onSave: (series: AdminTestSeries) => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [profession, setProfession] = useState("nursing");
  const [category, setCategory] = useState<"pyq" | "mock" | "sprints" | "notes">("mock");
  const [mins, setMins] = useState(30);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSeries: AdminTestSeries = {
      id: `custom-series-${Date.now()}`,
      title: title.trim(),
      desc: desc.trim() || `Full-length practice test paper for ${profession.toUpperCase()}`,
      profession,
      category,
      qCount: 0,
      mins,
      questions: [],
      isCustom: true
    };

    onSave(newSeries);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Plus size={18} className="text-[var(--primary)]" /> Create New Test Series
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-[12.5px]">
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Test Series Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AIIMS NORCET Grand Mock Paper 2026"
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Profession / Cadre</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-semibold outline-none"
              >
                {PROFESSIONS_LIST.filter(p => p.id !== "all").map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-semibold outline-none"
              >
                <option value="mock">Grand CBT Mock</option>
                <option value="pyq">PYQ Paper</option>
                <option value="sprints">Subject Sprint</option>
                <option value="notes">Revision Notes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Time Limit (Minutes)</label>
              <input
                type="number"
                value={mins}
                onChange={(e) => setMins(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Short Description</label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="High-yield paper overview..."
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-extrabold text-[13px] cursor-pointer transition-all hover:opacity-90 mt-2"
            style={{ background: "var(--primary)" }}
          >
            Create & Add Questions
          </button>
        </form>

      </div>
    </div>
  );
}

/* ================= MODAL: EDIT TEST SERIES INFO ================= */
function EditTestSeriesInfoModal({ series, onClose, onSave }: { series: AdminTestSeries; onClose: () => void; onSave: (updated: AdminTestSeries) => void }) {
  const [title, setTitle] = useState(series.title);
  const [desc, setDesc] = useState(series.desc || "");
  const [profession, setProfession] = useState(series.profession);
  const [category, setCategory] = useState(series.category);
  const [mins, setMins] = useState(series.mins || 30);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...series,
      title: title.trim(),
      desc: desc.trim(),
      profession,
      category,
      mins,
      isCustom: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Settings size={18} className="text-[var(--primary)]" /> Edit Test Series Information
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-[12.5px]">
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Test Series Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Profession</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-semibold outline-none"
              >
                {PROFESSIONS_LIST.filter(p => p.id !== "all").map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-semibold outline-none"
              >
                <option value="mock">Grand CBT Mock</option>
                <option value="pyq">PYQ Paper</option>
                <option value="sprints">Subject Sprint</option>
                <option value="notes">Revision Notes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Time Limit (Minutes)</label>
              <input
                type="number"
                value={mins}
                onChange={(e) => setMins(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Short Description</label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-extrabold text-[13px] cursor-pointer transition-all hover:opacity-90 mt-2"
            style={{ background: "var(--primary)" }}
          >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
}

/* ================= MODAL: EDIT / ADD QUESTION ================= */
function EditQuestionModal({ question, index, onClose, onSave }: { question: Question | null; index: number | null; onClose: () => void; onSave: (q: Question, idx: number | null) => void }) {
  const [qText, setQText] = useState(question?.q || "");
  const [opts, setOpts] = useState<string[]>(question?.opts ? [...question.opts] : ["", "", "", ""]);
  const [ans, setAns] = useState<number>(question?.ans !== undefined ? question.ans : 0);
  const [explain, setExplain] = useState(question?.explain || "");
  const [source, setSource] = useState(question?.source || "NCBT Editorial");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || opts.some(o => !o.trim())) return;

    const savedQ: Question = {
      q: qText.trim(),
      opts: opts.map(o => o.trim()),
      ans,
      explain: explain.trim() || "Clinical rationale provided in standard reference guides.",
      source: source.trim() || "NCBT Question Bank"
    };

    onSave(savedQ, index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Plus size={18} className="text-[var(--primary)]" /> {question ? `Edit Question Q#${(index || 0) + 1}` : "Add Question to Test Series"}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-[12.5px]">
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Question Statement *</label>
            <textarea
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              placeholder="Enter clinical question scenario or concept..."
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {opts.map((opt, i) => (
              <div key={i}>
                <label className="block font-bold text-[11px] mb-0.5" style={{ color: "var(--text-secondary)" }}>Option {String.fromCharCode(65 + i)} *</label>
                <input
                  value={opt}
                  onChange={(e) => {
                    const updated = [...opts];
                    updated[i] = e.target.value;
                    setOpts(updated);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] outline-none font-medium"
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Correct Answer Choice</label>
              <select
                value={ans}
                onChange={(e) => setAns(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold text-emerald-500 outline-none"
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Source / Citation</label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. AIIMS NORCET 2025"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Clinical Rationale / Solution</label>
            <textarea
              value={explain}
              onChange={(e) => setExplain(e.target.value)}
              placeholder="Detailed rationale explaining the correct answer..."
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[60px]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-extrabold text-[13px] cursor-pointer transition-all hover:opacity-90 mt-2"
            style={{ background: "var(--primary)" }}
          >
            {question ? "Save Question Changes" : "Save & Add Question to Series"}
          </button>
        </form>

      </div>
    </div>
  );
}

/* ================= BLOG & ARTICLE CMS (UPLOAD WITH PHOTO) ================= */
function BlogCmsView({ showToast, onDataChanged }: { showToast: (m: string, type?: "ok" | "err") => void; onDataChanged: () => void }) {
  // Saved Custom Updates / Blogs
  const [customBlogs, setCustomBlogs] = useState<NursingUpdate[]>(() => {
    return JSON.parse(localStorage.getItem("np_custom_updates") || "[]");
  });

  const [deletedBlogIds, setDeletedBlogIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("np_deleted_updates") || "[]");
  });

  // Editor Form State
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"jobs" | "syllabus" | "motivation" | "notes">("jobs");
  const [badge, setBadge] = useState("EXAM ALERT");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("4 min read");
  const [authorName, setAuthorName] = useState("NCBT Editorial Team");
  const [authorAvatar, setAuthorAvatar] = useState("https://api.dicebear.com/7.x/bottts/svg?seed=NCBTEditorial");
  const [pdfUrl, setPdfUrl] = useState("");
  const [officialLink, setOfficialLink] = useState("");

  // Search filter
  const [blogSearch, setBlogSearch] = useState("");

  // Live Preview Modal Toggle
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // File Upload to Base64
  const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target?.result as string;
      setImage(base64);
      showToast("Blog photo uploaded & attached!");
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target?.result as string;
      setAuthorAvatar(base64);
    };
    reader.readAsDataURL(file);
  };

  // Save or Publish Blog
  const handlePublishBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      showToast("Please fill in Title, Summary, and Article Body.", "err");
      return;
    }

    const blogId = editingBlogId || `blog-${Date.now()}`;
    const newArticle: NursingUpdate = {
      id: blogId,
      title: title.trim(),
      category,
      badge: badge.trim() || "NCBT EXAM UPDATE",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      summary: summary.trim(),
      content: content.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
      readTime: readTime.trim() || "3 min read",
      authorName: authorName.trim() || "NCBT Editorial Team",
      authorAvatar: authorAvatar.trim() || "https://api.dicebear.com/7.x/bottts/svg?seed=NCBTEditorial",
      pdfUrl: pdfUrl.trim() || undefined,
      officialLink: officialLink.trim() || undefined
    };

    let updated: NursingUpdate[] = [];
    if (editingBlogId) {
      updated = customBlogs.map(b => b.id === editingBlogId ? newArticle : b);
      showToast("Blog article updated successfully!");
    } else {
      updated = [newArticle, ...customBlogs];
      showToast("Blog article published live!");
    }

    setCustomBlogs(updated);
    localStorage.setItem("np_custom_updates", JSON.stringify(updated));

    // Dispatch custom event so App.tsx re-syncs live immediately
    window.dispatchEvent(new Event("np_updates_changed"));

    // Reset Form
    setEditingBlogId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setImage("");
    setPdfUrl("");
    setOfficialLink("");
    onDataChanged();
  };

  // Edit Blog
  const handleEditBlog = (article: NursingUpdate) => {
    setEditingBlogId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setBadge(article.badge);
    setSummary(article.summary);
    setContent(article.content);
    setImage(article.image);
    setReadTime(article.readTime);
    setAuthorName(article.authorName || "NCBT Editorial Team");
    setAuthorAvatar(article.authorAvatar || "");
    setPdfUrl(article.pdfUrl || "");
    setOfficialLink(article.officialLink || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Insert photo block helper inside body content
  const handleInsertPhotoToContent = () => {
    const url = window.prompt("Enter Photo / Image URL to insert into article body:");
    if (!url) return;
    const caption = window.prompt("Enter Photo Caption / Description:", "Official Exam Pattern Banner") || "Image";
    const imgMarkdown = `\n\n![${caption}](${url})\n\n`;
    setContent(prev => prev + imgMarkdown);
    showToast("Photo inserted into Article Body!");
  };

  // Delete Blog Page Completely
  const handleDeleteBlog = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog article page completely?")) return;
    const updatedCustom = customBlogs.filter(b => b.id !== id);
    const updatedDeleted = Array.from(new Set([...deletedBlogIds, id]));
    setCustomBlogs(updatedCustom);
    setDeletedBlogIds(updatedDeleted);
    localStorage.setItem("np_custom_updates", JSON.stringify(updatedCustom));
    localStorage.setItem("np_deleted_updates", JSON.stringify(updatedDeleted));
    window.dispatchEvent(new Event("np_updates_changed"));
    showToast("Blog article page deleted completely.");
    if (editingBlogId === id) {
      setEditingBlogId(null);
      setTitle("");
      setSummary("");
      setContent("");
      setImage("");
    }
    onDataChanged();
  };

  // All Blogs combined (excluding deleted ones)
  const allBlogsCombined = useMemo(() => {
    const map = new Map<string, NursingUpdate>();
    customBlogs.forEach(b => {
      if (!deletedBlogIds.includes(b.id)) map.set(b.id, b);
    });
    STATIC_NURSING_UPDATES.forEach(b => {
      if (!map.has(b.id) && !deletedBlogIds.includes(b.id)) map.set(b.id, b);
    });
    return Array.from(map.values());
  }, [customBlogs, deletedBlogIds]);

  const filteredBlogs = useMemo(() => {
    return allBlogsCombined.filter(b => 
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.summary.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.badge.toLowerCase().includes(blogSearch.toLowerCase())
    );
  }, [allBlogsCombined, blogSearch]);

  return (
    <div className="space-y-6">
      
      {/* Blog Creator Box */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <BookOpen size={18} className="text-[var(--primary)]" />
              {editingBlogId ? "Edit Published Blog Article" : "Upload & Publish Blog Article"}
            </h3>
            <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
              Create full SEO-friendly recruitment notifications, syllabus guides, and study notes with custom photo banners.
            </p>
          </div>

          {editingBlogId && (
            <button 
              onClick={() => {
                setEditingBlogId(null);
                setTitle("");
                setSummary("");
                setContent("");
                setImage("");
              }}
              className="px-3 py-1 rounded-lg text-[11px] font-bold border border-[var(--border)] cursor-pointer hover:bg-[var(--surface-2)]"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handlePublishBlog} className="space-y-4 text-[12.5px]">
          
          {/* Title */}
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Article Title *</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AIIMS NORCET 8.0 CBT Official Syllabus & Exam Pattern"
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold text-[13.5px] outline-none"
              required
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Category</label>
              <select 
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold outline-none"
              >
                <option value="jobs">Recruitment Jobs Alert</option>
                <option value="syllabus">Syllabus & Exam Guides</option>
                <option value="motivation">Strategy & Tips</option>
                <option value="notes">Academic Study Notes</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Badge Pill Label</label>
              <input 
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. NORCET ALERT, ESIC 2026"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold uppercase text-[11.5px] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Est. Read Time</label>
              <input 
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 4 min read"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none"
              />
            </div>
          </div>

          {/* Photo Banner Upload & Preview */}
          <div className="space-y-2 p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
            <label className="block font-bold text-[12px]" style={{ color: "var(--text-primary)" }}>
              📷 Blog Photo Banner (Upload Image or Enter URL)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-semibold mb-1">Option A: Upload Local Image File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="w-full text-[12px] p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer"
                />
              </div>

              <span className="text-[11px] font-bold text-[var(--text-secondary)] text-center hidden md:block">OR</span>

              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-semibold mb-1">Option B: Unsplash / Web Image URL</label>
                <input 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] outline-none text-[12px]"
                />
              </div>
            </div>

            {/* Photo Preview Box */}
            {image && (
              <div className="relative mt-2 h-40 rounded-xl overflow-hidden border border-[var(--border)] bg-black/40">
                <img src={image} alt="Banner Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  title="Remove Image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Excerpt / Summary */}
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Short Excerpt / Card Summary *</label>
            <textarea 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief 2-line preview displayed on article cards..."
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[60px]"
              required
            />
          </div>

          {/* Full Article Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold" style={{ color: "var(--text-secondary)" }}>Full Article Body Content (Supports Markdown / Formatting) *</label>
              <button 
                type="button" 
                onClick={handleInsertPhotoToContent}
                className="text-[11px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ImageIcon size={13} /> Insert Photo to Article Body
              </button>
            </div>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write comprehensive article content. Use ### Headings, bullet points (- point), and tables..."
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[160px] font-mono text-[12px]"
              required
            />
          </div>

          {/* Author & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Author Name</label>
              <input 
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="NCBT Editorial Team"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Official PDF Prospectus URL</label>
              <input 
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://aiimsexams.ac.in/..."
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none text-[11.5px]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Official Apply Portal Link</label>
              <input 
                value={officialLink}
                onChange={(e) => setOfficialLink(e.target.value)}
                placeholder="https://aiimsexams.ac.in"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none text-[11.5px]"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="flex-1 py-2.5 rounded-xl font-bold text-[12.5px] cursor-pointer transition-all border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface)] flex items-center justify-center gap-1.5"
            >
              <Eye size={15} /> Live Preview Article
            </button>

            <button 
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-white font-bold text-[12.5px] cursor-pointer transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
              style={{ background: "var(--primary)" }}
            >
              <Sparkles size={15} /> {editingBlogId ? "Update Article" : "Publish Article Live"}
            </button>
          </div>

        </form>
      </div>

      {/* Published Articles List */}
      <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-[15px] font-extrabold" style={{ color: "var(--text-primary)" }}>
            Published Articles Catalog ({allBlogsCombined.length})
          </h3>

          <div className="w-full sm:w-64 flex items-center gap-2 p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12px]">
            <Search size={14} style={{ color: "var(--text-secondary)" }} />
            <input 
              value={blogSearch}
              onChange={(e) => setBlogSearch(e.target.value)}
              placeholder="Search published articles..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBlogs.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] flex gap-3 flex-col sm:flex-row items-start justify-between">
              <div className="flex items-start gap-3">
                <img 
                  src={b.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"} 
                  alt={b.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[var(--border)]"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--primary)]/10 text-[var(--primary)]">
                      {b.badge}
                    </span>
                    <span className="text-[10.5px] text-[var(--text-secondary)]">{b.date}</span>
                  </div>
                  <h4 className="text-[13px] font-bold line-clamp-1" style={{ color: "var(--text-primary)" }}>
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2">
                    {b.summary}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center gap-1 shrink-0 self-end sm:self-start">
                <button 
                  onClick={() => handleEditBlog(b)}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer"
                  title="Edit Post"
                >
                  <Edit3 size={15} />
                </button>
                <button 
                  onClick={() => handleDeleteBlog(b.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-600 cursor-pointer flex items-center gap-1"
                  title="Delete Article Page Completely"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIVE PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-[12px] font-bold uppercase text-[var(--primary)]">Article Live Preview</span>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--primary)] text-[10px] font-black uppercase">
                {badge || "NCBT EXAM UPDATE"}
              </span>

              <h2 className="text-xl font-black text-[var(--text-primary)]">{title || "Untitled Article"}</h2>

              {image && (
                <div className="h-52 rounded-2xl overflow-hidden border border-[var(--border)]">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-xs font-semibold text-[var(--text-secondary)]">{summary}</p>

              <div className="p-4 rounded-2xl bg-[var(--surface-2)] text-xs text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">
                {content}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= EXAM PAGES & CONTENT CMS ================= */
function ExamPagesCmsView({ showToast, onDataChanged }: { showToast: (m: string, type?: "ok" | "err") => void; onDataChanged: () => void }) {
  const [allArticlesMap, setAllArticlesMap] = useState<Record<string, SeoArticle>>(() => getAllSeoArticles());
  const [selectedSlug, setSelectedSlug] = useState<string>("homepage");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state
  const [slug, setSlug] = useState("homepage");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("EXAM PREPARATION GUIDE");
  const [keywordsStr, setKeywordsStr] = useState("");
  const [image, setImage] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [officialLink, setOfficialLink] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Load article into form when selectedSlug or isCreatingNew changes
  useEffect(() => {
    const articles = getAllSeoArticles();
    setAllArticlesMap(articles);

    if (isCreatingNew) {
      setSlug(`exam-guide-${Date.now().toString().slice(-4)}`);
      setTitle("");
      setSubtitle("");
      setBadge("NCBT EXAM GUIDE");
      setKeywordsStr("Nursing, CBT, Exam Pattern, Cutoff, Practice");
      setImage("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800");
      setPdfUrl("");
      setOfficialLink("");
      setContentHtml(`<div class="prose max-w-none space-y-6">
  <section class="space-y-3">
    <h2 class="text-xl font-bold border-b pb-2">1. Official Exam Overview & CBT Pattern</h2>
    <p>Detailed recruitment notification, examination duration, marking criteria, and negative marking penalty information...</p>
  </section>
  <section class="space-y-3">
    <h2 class="text-xl font-bold border-b pb-2">2. Subject Syllabus & Topic Distribution</h2>
    <p>Breakdown of core clinical topics, general knowledge, numerical aptitude, and previous year weightage...</p>
  </section>
</div>`);
    } else if (articles[selectedSlug]) {
      const art = articles[selectedSlug];
      setSlug(selectedSlug);
      setTitle(art.title || "");
      setSubtitle(art.subtitle || "");
      setBadge(art.badge || "EXAM PREPARATION GUIDE");
      setKeywordsStr(Array.isArray(art.keywords) ? art.keywords.join(", ") : "");
      setImage(art.image || "");
      setPdfUrl(art.pdfUrl || "");
      setOfficialLink(art.officialLink || "");
      setContentHtml(art.contentHtml || "");
    }
  }, [selectedSlug, isCreatingNew]);

  const handleImageFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target?.result as string;
      setImage(base64);
      showToast("Photo banner uploaded and attached!");
    };
    reader.readAsDataURL(file);
  };

  const handleInsertPhotoToPage = () => {
    const url = window.prompt("Enter Photo / Image URL to insert into Exam Page content:");
    if (!url) return;
    const caption = window.prompt("Enter Photo Description / Caption:", "Official Exam Pattern Chart") || "Exam Photo";
    const imgHtml = `\n<div class="my-6 rounded-2xl overflow-hidden border border-[var(--border)] shadow-md">\n  <img src="${url}" alt="${caption}" class="w-full h-auto object-cover max-h-96" />\n  <p class="p-2 text-center text-[11px] font-semibold text-[var(--text-secondary)] bg-[var(--surface-2)]">📷 ${caption}</p>\n</div>\n`;
    setContentHtml(prev => prev + imgHtml);
    showToast("Photo added to Exam Page content!");
  };

  const handleAddSection = () => {
    const secHeading = window.prompt("Enter New Section Heading:", "Selection Criteria & Target Cutoff");
    if (!secHeading) return;
    const secHtml = `\n<section class="space-y-3 mt-6">\n  <h2 class="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border)] pb-2">\n    ${secHeading}\n  </h2>\n  <p class="text-sm text-[var(--text-secondary)] leading-relaxed">\n    Write comprehensive clinical notes or exam guidelines for ${secHeading} here...\n  </p>\n</section>\n`;
    setContentHtml(prev => prev + secHtml);
    showToast(`Added section: "${secHeading}"`);
  };

  const handleSavePage = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !contentHtml.trim()) {
      showToast("Please fill in Page Title, Slug, and Content HTML.", "err");
      return;
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, "-");
    const updatedArticle: SeoArticle = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      keywords: keywordsStr.split(",").map(k => k.trim()).filter(Boolean),
      contentHtml: contentHtml.trim(),
      image: image.trim() || undefined,
      badge: badge.trim() || "EXAM PREPARATION GUIDE",
      pdfUrl: pdfUrl.trim() || undefined,
      officialLink: officialLink.trim() || undefined
    };

    saveCustomSeoArticle(cleanSlug, updatedArticle);
    const refreshed = getAllSeoArticles();
    setAllArticlesMap(refreshed);
    setIsCreatingNew(false);
    setSelectedSlug(cleanSlug);
    showToast(`Exam Page "${title.trim()}" published live!`);
    onDataChanged();
  };

  const handleDeletePage = () => {
    if (!window.confirm(`Are you sure you want to delete the Exam Page "${title || selectedSlug}" completely?`)) return;
    deleteCustomSeoArticle(selectedSlug);
    const refreshed = getAllSeoArticles();
    setAllArticlesMap(refreshed);
    const keys = Object.keys(refreshed);
    if (keys.length > 0) {
      setSelectedSlug(keys[0]);
    }
    showToast(`Exam Page "${selectedSlug}" deleted completely.`);
    onDataChanged();
  };

  const pageLabels: Record<string, string> = {
    homepage: "Homepage Overview & Master Guide",
    nursing: "Nursing Officer Exam Guide",
    pharmacist: "Pharmacist & CGHS Exam Guide",
    paramedical: "Paramedical & OT Technician Guide",
    labtech: "Lab Technician & DMLT Guide",
    radiographer: "Radiographer & X-Ray Tech Guide",
    medical_officer: "Medical Officer & MBBS Guide",
    aiims: "AIIMS NORCET Entrance & Recruitment",
    wbhrb: "WBHRB Health Board Recruitment Guide",
    esic: "ESIC Staff Nurse & Paramedical Guide",
    rrb: "RRB Railway Nurse & Paramedical Guide",
    cho: "NHM Community Health Officer (CHO) Guide",
    dsssb: "DSSSB Nursing & Health Guide",
    anatomy: "Anatomy & Physiology Master Guide",
    blood: "Blood Bank & Hematology Master Guide",
    subject_default: "Default Subject Exam Guide"
  };

  const articleEntries = Object.entries(allArticlesMap);

  return (
    <div className="space-y-6">
      
      {/* Top Header & Page Selector */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[17px] font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Globe size={19} className="text-[var(--primary)]" />
              Exam Pages & Content CMS (Full Access)
            </h3>
            <p className="text-[12px] text-[var(--text-secondary)]">
              Full control to manage, edit, add sections, upload photos, or delete any exam page across NCBT.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => {
                setIsCreatingNew(true);
                setSelectedSlug("");
              }}
              className="px-3.5 py-2 rounded-xl text-[12px] font-bold text-white cursor-pointer transition-all hover:opacity-90 flex items-center gap-1.5"
              style={{ background: "var(--primary)" }}
            >
              <Plus size={15} /> Create New Exam Page
            </button>
          </div>
        </div>

        {/* Page Selector Bar */}
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <label className="text-[11.5px] font-bold text-[var(--text-secondary)] shrink-0">Select Page to Manage:</label>
            <select 
              value={isCreatingNew ? "" : selectedSlug}
              onChange={(e) => {
                setIsCreatingNew(false);
                setSelectedSlug(e.target.value);
              }}
              className="flex-1 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-bold text-[13px] outline-none cursor-pointer"
            >
              {articleEntries.map(([key, art]: [string, any]) => (
                <option key={key} value={key}>
                  📄 {pageLabels[key] || art.title || key} [{key}]
                </option>
              ))}
            </select>
          </div>

          {!isCreatingNew && selectedSlug && (
            <button 
              type="button"
              onClick={handleDeletePage}
              className="px-3 py-2 rounded-xl text-[11.5px] font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Delete this exam page completely"
            >
              <Trash2 size={14} /> Delete Page Completely
            </button>
          )}
        </div>
      </div>

      {/* Main Page Content Editor Form */}
      <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <form onSubmit={handleSavePage} className="space-y-4 text-[12.5px]">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Page Slug / Key *</label>
              <input 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. aiims, norcet-9, cho-exam"
                disabled={!isCreatingNew && !!allArticlesMap[selectedSlug]}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-mono text-[12px] outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Badge Pill Label</label>
              <input 
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. OFFICIAL SYLLABUS & MOCK GUIDE"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-bold uppercase text-[11px] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Keywords (Comma Separated)</label>
              <input 
                value={keywordsStr}
                onChange={(e) => setKeywordsStr(e.target.value)}
                placeholder="e.g. NORCET, AIIMS, Syllabus, Cutoff"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12px] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Page Heading Title *</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AIIMS NORCET Entrance & Recruitment Exam Guide 2026"
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] font-extrabold text-[14px] outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Subtitle / Overview Summary</label>
            <textarea 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief summary explaining what this exam page covers..."
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[50px] text-[12px]"
            />
          </div>

          {/* Photo Banner Upload */}
          <div className="space-y-2 p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
            <label className="block font-bold text-[12px]" style={{ color: "var(--text-primary)" }}>
              📷 Exam Page Photo Banner / Cover Image
            </label>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-semibold mb-1">Option A: Upload Local Photo File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="w-full text-[12px] p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer"
                />
              </div>

              <span className="text-[11px] font-bold text-[var(--text-secondary)] text-center hidden md:block">OR</span>

              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-semibold mb-1">Option B: Unsplash / Web Photo URL</label>
                <input 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] outline-none text-[12px]"
                />
              </div>
            </div>

            {image && (
              <div className="relative mt-2 h-44 rounded-xl overflow-hidden border border-[var(--border)] bg-black/40">
                <img src={image} alt="Banner Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  title="Remove Image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Official Prospectus & Portal Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Official PDF Prospectus Download URL</label>
              <input 
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://aiimsexams.ac.in/prospectus.pdf"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none text-[11.5px]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1" style={{ color: "var(--text-secondary)" }}>Official Application Portal Link</label>
              <input 
                value={officialLink}
                onChange={(e) => setOfficialLink(e.target.value)}
                placeholder="https://aiimsexams.ac.in"
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none text-[11.5px]"
              />
            </div>
          </div>

          {/* Section Toolbar & Content Editor */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
              <label className="block font-bold text-[13px]" style={{ color: "var(--text-primary)" }}>
                Page Content Sections & Article Body *
              </label>

              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handleAddSection}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-2)] text-[var(--primary)] border border-[var(--border)] font-bold text-[11px] hover:bg-[var(--surface)] flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={13} /> Add New Section
                </button>

                <button 
                  type="button"
                  onClick={handleInsertPhotoToPage}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-2)] text-[var(--accent)] border border-[var(--border)] font-bold text-[11px] hover:bg-[var(--surface)] flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon size={13} /> Add Photo / Image
                </button>
              </div>
            </div>

            <textarea 
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              placeholder="Write or edit section content. Supports HTML sections, headings (<h2>), lists (<ul>), and images..."
              className="w-full p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none min-h-[260px] font-mono text-[12px] leading-relaxed"
              required
            />
          </div>

          {/* Form Submit & Preview Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button 
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="flex-1 py-3 rounded-xl font-bold text-[12.5px] cursor-pointer border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface)] flex items-center justify-center gap-2"
            >
              <Eye size={16} /> Live Preview Exam Page
            </button>

            <button 
              type="submit"
              className="flex-1 py-3 rounded-xl text-white font-bold text-[12.5px] cursor-pointer transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ background: "var(--primary)" }}
            >
              <Sparkles size={16} /> Save Exam Page Live
            </button>
          </div>

        </form>
      </div>

      {/* LIVE PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <span className="text-[12px] font-black uppercase text-[var(--primary)] flex items-center gap-1.5">
                <Globe size={15} /> Live Exam Page Preview — [{slug}]
              </span>
              <button onClick={() => setShowPreviewModal(false)} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-left">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                {badge || "EXAM GUIDE"}
              </span>

              <h2 className="text-2xl font-black text-[var(--text-primary)] leading-snug">{title || "Untitled Exam Page"}</h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium">{subtitle}</p>

              {image && (
                <div className="h-60 rounded-2xl overflow-hidden border border-[var(--border)]">
                  <img src={image} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div 
                className="p-5 rounded-2xl bg-[var(--surface-2)] text-xs text-[var(--text-primary)] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ================= NOTICES ================= */
function NoticesView({ showToast }: { showToast: (m: string) => void }) {
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    return JSON.parse(localStorage.getItem("np_admin_notices") || JSON.stringify([
      { id: "1", title: "AIIMS NORCET 7.0 CBT Grand Mock Live", category: "NORCET", date: "Today", active: true, important: true },
      { id: "2", title: "ESIC Staff Nurse 2026 Official Syllabus Released", category: "ESIC", date: "Yesterday", active: true, important: false },
      { id: "3", title: "RRB Paramedical Pharmacist PYQ Series Available", category: "General", date: "3 days ago", active: true, important: false },
    ]));
  });

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"NORCET" | "ESIC" | "General" | "Alert">("NORCET");

  const handleAddNotice = () => {
    if (!newTitle.trim()) return;
    const updated: NoticeItem[] = [
      { id: String(Date.now()), title: newTitle.trim(), category: newCategory, date: "Just now", active: true, important: newCategory === "Alert" },
      ...notices
    ];
    setNotices(updated);
    localStorage.setItem("np_admin_notices", JSON.stringify(updated));
    setNewTitle("");
    showToast("Notice broadcast published!");
  };

  const toggleNotice = (id: string) => {
    const updated = notices.map(n => n.id === id ? { ...n, active: !n.active } : n);
    setNotices(updated);
    localStorage.setItem("np_admin_notices", JSON.stringify(updated));
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem("np_admin_notices", JSON.stringify(updated));
    showToast("Notice removed.");
  };

  return (
    <div className="rounded-2xl p-6 space-y-5 max-w-3xl mx-auto" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div>
        <h3 className="text-[15px] font-extrabold" style={{ color: "var(--text-primary)" }}>Notices & Site Alerts</h3>
        <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>Broadcast exam updates and news banners across the candidate portal.</p>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <input 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New notice broadcast text..."
          className="flex-1 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] outline-none text-[12.5px]"
        />
        <select 
          value={newCategory}
          onChange={(e: any) => setNewCategory(e.target.value)}
          className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12.5px] font-bold"
        >
          <option value="NORCET">NORCET</option>
          <option value="ESIC">ESIC</option>
          <option value="General">General</option>
          <option value="Alert">Alert</option>
        </select>
        <button 
          onClick={handleAddNotice}
          className="px-4 py-2.5 rounded-xl text-white font-bold text-[12px] cursor-pointer"
          style={{ background: "var(--primary)" }}
        >
          Publish
        </button>
      </div>

      <div className="space-y-2 pt-2">
        {notices.map((n) => (
          <div key={n.id} className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[12.5px]">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${n.category === "Alert" ? "bg-red-500/10 text-red-500" : "bg-[var(--primary)]/10 text-[var(--primary)]"}`}>
                {n.category}
              </span>
              <div>
                <p className={`font-semibold ${!n.active ? "line-through text-gray-400" : ""}`} style={{ color: n.active ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {n.title}
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{n.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleNotice(n.id)} className="p-1 cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                {n.active ? <ToggleRight size={22} className="text-emerald-500" /> : <ToggleLeft size={22} />}
              </button>
              <button onClick={() => deleteNotice(n.id)} className="p-1 cursor-pointer text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= SETTINGS ================= */
function SettingsView({ showToast }: { showToast: (m: string) => void }) {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("np_maint_mode") || "false");
  });

  const [guestLimit, setGuestLimit] = useState<number>(() => {
    return JSON.parse(localStorage.getItem("np_guest_limit") || "3");
  });

  const [newPass, setNewPass] = useState("");

  const handleToggleMaintenance = () => {
    const updated = !maintenanceMode;
    setMaintenanceMode(updated);
    localStorage.setItem("np_maint_mode", JSON.stringify(updated));
    showToast(updated ? "Maintenance Mode Activated" : "Maintenance Mode Deactivated");
  };

  const handleSavePassword = (e: FormEvent) => {
    e.preventDefault();
    if (!newPass.trim()) return;
    localStorage.setItem("np_admin_pass", newPass.trim());
    showToast("Master passcode updated!");
    setNewPass("");
  };

  const handleResetLocalCache = () => {
    if (!window.confirm("Warning: This will clear local offline data and restore system defaults. Continue?")) return;
    localStorage.clear();
    showToast("Local cache reset to defaults.");
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="rounded-2xl p-6 space-y-6 max-w-2xl mx-auto" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div>
        <h3 className="text-[15px] font-extrabold" style={{ color: "var(--text-primary)" }}>Platform Configuration</h3>
        <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>System defaults, security credentials, and access control settings.</p>
      </div>

      <div className="space-y-4 text-[13px]">
        
        {/* Maintenance Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
          <div>
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>Platform Maintenance Mode</p>
            <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Temporarily restrict exam attempts for maintenance</p>
          </div>
          <button onClick={handleToggleMaintenance} className="cursor-pointer">
            {maintenanceMode ? <ToggleRight size={28} className="text-amber-500" /> : <ToggleLeft size={28} className="text-gray-400" />}
          </button>
        </div>

        {/* Guest Limit */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
          <div>
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>Guest Practice Limit</p>
            <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Maximum free tests without registration</p>
          </div>
          <select 
            value={guestLimit} 
            onChange={(e) => {
              const val = Number(e.target.value);
              setGuestLimit(val);
              localStorage.setItem("np_guest_limit", JSON.stringify(val));
              showToast(`Guest practice limit set to ${val}`);
            }}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[12px] font-bold"
          >
            <option value={1}>1 Test</option>
            <option value={3}>3 Tests</option>
            <option value={5}>5 Tests</option>
            <option value={999}>Unlimited</option>
          </select>
        </div>

        {/* Admin Password Change */}
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] space-y-3">
          <p className="font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Key size={15} className="text-[var(--primary)]" /> Change Admin Master Passcode
          </p>

          <form onSubmit={handleSavePassword} className="flex gap-2">
            <input 
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new master passcode..."
              className="flex-1 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[12px] outline-none"
              required
            />
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-bold text-[12px] cursor-pointer"
              style={{ background: "var(--primary)" }}
            >
              Update Passcode
            </button>
          </form>
        </div>

        {/* Clear Local Cache */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
          <div>
            <p className="font-bold text-red-500">Reset System Local Storage</p>
            <p className="text-[11px] text-[var(--text-secondary)]">Clears local cached candidate and MCQ updates</p>
          </div>
          <button 
            onClick={handleResetLocalCache}
            className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-[12px] cursor-pointer"
          >
            Reset Local Storage
          </button>
        </div>

      </div>
    </div>
  );
}
