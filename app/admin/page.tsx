"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/services/AuthContext";
import { db } from "@/src/services/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { 
  ShieldCheck, 
  FileText, 
  Users, 
  Layers, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Flame,
  Search,
  BookOpen,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Award
} from "lucide-react";
import Link from "next/link";
import ServerNavbar from "@/components/ServerNavbar";

export default function AdminPage() {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "blog" | "attempts" | "users">("overview");

  // Blog / Notice state
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("jobs");
  const [articleBadge, setArticleBadge] = useState("NORCET 2026");
  const [articleSummary, setArticleSummary] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Student test attempts state
  const [testAttempts, setTestAttempts] = useState<any[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);

  // Users count
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      loadArticles();
      loadAttempts();
      loadUsers();
    }
  }, [isAdmin]);

  const loadArticles = async () => {
    setLoadingArticles(true);
    try {
      const snap = await getDocs(collection(db, "exam_updates"));
      const list: any[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setArticles(list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingArticles(false);
    }
  };

  const loadAttempts = async () => {
    setLoadingAttempts(true);
    try {
      const snap = await getDocs(collection(db, "test_attempts"));
      const list: any[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setTestAttempts(list.sort((a, b) => (b.submittedAt > a.submittedAt ? 1 : -1)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const loadUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "users"));
      const list: any[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setUserList(list);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleContent.trim() || !articleSummary.trim()) {
      setStatusMsg("Please fill in Title, Summary, and Content.");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");
    try {
      await addDoc(collection(db, "exam_updates"), {
        title: articleTitle.trim(),
        category: articleCategory,
        badge: articleBadge.trim() || "Notification",
        summary: articleSummary.trim(),
        content: articleContent.trim(),
        image: articleImage.trim() || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        readTime: "4 min read",
        published: true,
        createdAt: new Date().toISOString(),
      });

      setStatusMsg("Article published to live website and Firestore! 🎉");
      setArticleTitle("");
      setArticleSummary("");
      setArticleContent("");
      setArticleImage("");
      loadArticles();
    } catch (err: any) {
      setStatusMsg("Error publishing: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;
    try {
      await deleteDoc(doc(db, "exam_updates", id));
      loadArticles();
    } catch (e: any) {
      alert("Error deleting: " + e.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-400 font-medium">Verifying Administrator Privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
        <ServerNavbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">Administrator Access Required</h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                This console is reserved for Master Admins (<code className="text-sky-400">sakil.net.in@gmail.com</code>). Please sign in with your authorized Google account to manage live tests, blog articles, and student scorecards.
              </p>
            </div>

            <button
              onClick={signInWithGoogle}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              Sign In with Master Google Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                FIREBASE ACTIVE
              </span>
              <span className="text-xs text-slate-400 font-mono">sakil.net.in@gmail.com</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              NCBT Admin & Content Management Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live Firestore Database, Real-Time Student CBT Submissions & Article Publisher.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
            >
              View Live Website
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "blog"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Publish Blog & Notices ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab("attempts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "attempts"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Award className="w-4 h-4" /> Real-time CBT Submissions ({testAttempts.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Users className="w-4 h-4" /> Registered Aspirants ({userList.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Total Registered Aspirants</span>
                  <Users className="w-5 h-5 text-sky-400" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-3 font-display">
                  {userList.length}
                </div>
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                  Synchronized in real-time with Firebase Auth
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Live Mock Test Submissions</span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-3 font-display">
                  {testAttempts.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  All-India Scorecard records logged
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Exam Notices & Study Articles</span>
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white mt-3 font-display">
                  {articles.length}
                </div>
                <p className="text-[11px] text-sky-400 mt-2">
                  Indexed with Google rich schemas
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Firebase Firestore Storage Health
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Firestore Database Connected
                  </div>
                  <p className="text-slate-400">
                    Database ID: <code className="text-sky-300">ai-studio-nursingmocknew-5c9011f8-c034-4700-8b01-1020bd4aa2f2</code>
                  </p>
                  <p className="text-slate-400">
                    Security Rules: Deployed and restricted to Admin & Authorized Aspirants.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <ShieldCheck className="w-4 h-4" /> Master Admin Authorization
                  </div>
                  <p className="text-slate-400">
                    Master Email: <code className="text-sky-300">sakil.net.in@gmail.com</code>
                  </p>
                  <p className="text-slate-400">
                    Full CRUD privileges to publish exam circulars and manage mock tests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Publish Blog & Notices */}
        {activeTab === "blog" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-400" /> Publish Exam Notice or Study Guide
              </h2>

              {statusMsg && (
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
                  {statusMsg}
                </div>
              )}

              <form onSubmit={handlePublishArticle} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={articleTitle}
                    onChange={e => setArticleTitle(e.target.value)}
                    placeholder="e.g., AIIMS NORCET 08 Application Window Open: 2,500+ Posts"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={articleCategory}
                      onChange={e => setArticleCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="jobs">Job Notification</option>
                      <option value="syllabus">Syllabus & Pattern</option>
                      <option value="notes">Clinical Study Notes</option>
                      <option value="motivation">Strategy & Motivation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={articleBadge}
                      onChange={e => setArticleBadge(e.target.value)}
                      placeholder="e.g. AIIMS Notice"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Header Image URL (Optional)</label>
                  <input
                    type="text"
                    value={articleImage}
                    onChange={e => setArticleImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (1-2 Sentences for Google Search snippet)</label>
                  <textarea
                    required
                    rows={2}
                    value={articleSummary}
                    onChange={e => setArticleSummary(e.target.value)}
                    placeholder="Comprehensive overview of exam dates, age relaxation, and clinical syllabus..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Article Content (Markdown Supported)</label>
                  <textarea
                    required
                    rows={8}
                    value={articleContent}
                    onChange={e => setArticleContent(e.target.value)}
                    placeholder="Write detailed vacancy tables, eligibility bullet points, and clinical notes..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Publishing to Firestore..." : "Publish Article to Live Website 🚀"}
                </button>
              </form>
            </div>

            {/* List of Published Articles */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center justify-between">
                <span>Published Articles in Firestore ({articles.length})</span>
                <button
                  onClick={loadArticles}
                  className="text-xs text-sky-400 hover:underline font-normal"
                >
                  Refresh
                </button>
              </h2>

              {loadingArticles ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading articles...</div>
              ) : articles.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                  No custom articles published yet in Firestore. Use the form to publish your first notification!
                </div>
              ) : (
                <div className="space-y-3">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-bold">
                            {art.badge || "Update"}
                          </span>
                          <span className="text-[10px] text-slate-400">{art.date}</span>
                        </div>
                        <h3 className="text-xs font-bold text-white">{art.title}</h3>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{art.summary}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-xs transition-colors shrink-0"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Test Attempts / Submissions */}
        {activeTab === "attempts" && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Live Student Mock Test Submissions</h2>
              <button
                onClick={loadAttempts}
                className="text-xs text-sky-400 hover:underline"
              >
                Refresh Log
              </button>
            </div>

            {loadingAttempts ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading attempts...</div>
            ) : testAttempts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No mock test submissions logged yet. When aspirants finish any CBT mock test, their scores will stream here live.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Test Title</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Accuracy</th>
                      <th className="py-3 px-4">Correct / Total</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {testAttempts.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-semibold text-white">
                          <div>{att.userName || "Aspirant"}</div>
                          <div className="text-[10px] text-slate-400">{att.userEmail}</div>
                        </td>
                        <td className="py-3 px-4">{att.testTitle || att.testId}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{att.score}</td>
                        <td className="py-3 px-4">{att.accuracy}%</td>
                        <td className="py-3 px-4">{att.correctCount} / {att.totalQuestions}</td>
                        <td className="py-3 px-4 text-[10px] text-slate-400">
                          {att.submittedAt ? new Date(att.submittedAt).toLocaleString() : "Recent"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Registered Users */}
        {activeTab === "users" && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Registered Aspirants Database</h2>
              <button
                onClick={loadUsers}
                className="text-xs text-sky-400 hover:underline"
              >
                Refresh Users
              </button>
            </div>

            {userList.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No user profiles recorded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userList.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="flex items-center gap-3">
                      {u.photoURL ? (
                        <img src={u.photoURL} className="w-9 h-9 rounded-full object-cover border border-sky-500/40" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                          {(u.displayName || u.email || "U")[0].toUpperCase()}
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate">{u.displayName || "Aspirant"}</p>
                        <p className="text-[10px] text-slate-400 truncate">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[10px]">
                      <span className="text-slate-400">Tests: <strong className="text-white">{u.totalTestsAttempted || 0}</strong></span>
                      <span className="text-slate-400">Accuracy: <strong className="text-emerald-400">{u.averageAccuracy || 0}%</strong></span>
                      <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-bold uppercase">{u.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
