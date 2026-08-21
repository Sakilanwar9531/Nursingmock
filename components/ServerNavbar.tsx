import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  Layers, 
  Sparkles, 
  Award, 
  Search, 
  Flame, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

import UserAuthWidget from "./UserAuthWidget";

export default function ServerNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-display">
                  NCBT<span className="text-sky-400">.in</span>
                </span>
                <span className="bg-sky-500/10 text-sky-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-500/20">
                  CBT PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium -mt-0.5 hidden sm:block">
                National Computer Based Test Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              href="/exams" 
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Target Exams
            </Link>
            <Link 
              href="/tests" 
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              Mock Tests & PYQs
            </Link>
            <Link 
              href="/subjects" 
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Subject Banks
            </Link>
            <Link 
              href="/blog" 
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Syllabus & Blog
            </Link>
            <Link 
              href="/current-affairs" 
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Current Affairs
            </Link>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/tests"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start Free CBT
            </Link>
            <Link
              href="/find-tests"
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Search tests"
            >
              <Search className="w-4 h-4" />
            </Link>
            <UserAuthWidget />
          </div>
        </div>
      </div>
    </header>
  );
}
