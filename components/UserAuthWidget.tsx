"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/services/AuthContext";
import { LogIn, LogOut, User as UserIcon, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-sm"
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
        className="flex items-center gap-2 p-1 pl-2 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
      >
        <span className="text-xs font-bold text-slate-200 max-w-[90px] truncate hidden sm:inline">
          {user.displayName || "Aspirant"}
        </span>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 rounded-full border border-sky-500/40 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">
            {(user.displayName || user.email || "U")[0].toUpperCase()}
          </div>
        )}
      </button>

      {dropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDropdownOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 space-y-1">
            <div className="px-3 py-2 border-b border-slate-800">
              <p className="text-xs font-bold text-white truncate">{user.displayName || "Aspirant"}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              {isAdmin && (
                <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  MASTER ADMIN
                </span>
              )}
            </div>

            <div className="px-3 py-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Tests Done:</span>
                <span className="font-bold text-white">{profile?.totalTestsAttempted || 0}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Avg Accuracy:</span>
                <span className="font-bold text-emerald-400">{profile?.averageAccuracy || 0}%</span>
              </div>
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-sky-400 hover:bg-slate-800 transition-colors"
              >
                <ShieldAlert className="w-4 h-4" /> Admin Console
              </Link>
            )}

            <button
              onClick={() => {
                signOut();
                setDropdownOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
