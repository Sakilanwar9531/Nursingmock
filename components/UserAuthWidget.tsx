"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/services/AuthContext";
import { LogIn, LogOut, User as UserIcon, ShieldAlert, Sparkles, CheckCircle2, ChevronDown, BarChart3, Award } from "lucide-react";
import Link from "next/link";

export default function UserAuthWidget() {
  const { user, profile, loading, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse border border-slate-700"></div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-sm active:scale-95"
      >
        <LogIn className="w-3.5 h-3.5 text-sky-400" />
        <span>Log In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pl-2.5 pr-2 rounded-full bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer shadow-sm active:scale-95"
        title="Candidate Profile"
        aria-label="Candidate Profile"
      >
        <span className="text-xs font-bold text-slate-200 max-w-[85px] truncate hidden sm:inline">
          {(user.displayName || "Candidate").split(" ")[0]}
        </span>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 rounded-full border border-sky-500 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-inner">
            {(user.displayName || user.email || "U")[0].toUpperCase()}
          </div>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {dropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDropdownOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2.5 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-sky-500 object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-md shrink-0">
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-white truncate">{user.displayName || "Aspirant"}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {isAdmin ? (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        👑 Super Admin
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        🎓 Verified Candidate
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 bg-slate-800/30 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tests Attempted:</span>
                <span className="font-bold text-white">{profile?.totalTestsAttempted || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Average Accuracy:</span>
                <span className="font-bold text-emerald-400">{profile?.averageAccuracy || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Exam:</span>
                <span className="font-semibold text-sky-300 truncate max-w-[120px]">{profile?.targetExam || "AIIMS NORCET"}</span>
              </div>
            </div>

            <div className="space-y-0.5 text-xs font-semibold">
              <Link
                href="/tests"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" /> Practice Mock Tests
              </Link>
              <Link
                href="/exams"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Award className="w-4 h-4 text-emerald-400" /> All Target Exams
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-amber-400 hover:bg-amber-500/10 font-bold transition-colors"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-400" /> Admin Control Console
                </Link>
              )}
            </div>

            <div className="pt-1 border-t border-slate-800">
              <button
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout Session
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
