import React from "react";
import Link from "next/link";
import { Shield, BookOpen, Award, CheckCircle2, FileText, Heart, Mail } from "lucide-react";

export default function ServerFooter() {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-base">
                N
              </div>
              <span className="font-extrabold text-base tracking-tight text-white font-display">
                NCBT<span className="text-sky-400">.in</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India&apos;s premier Computer Based Test (CBT) simulation and analytics platform for Nursing Officers, Pharmacists, and Paramedical recruitment examinations.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free & Open Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-400 font-semibold">
                <Shield className="w-3.5 h-3.5" /> Clinical Peer-Reviewed
              </span>
            </div>
          </div>

          {/* Col 2: Target Exams */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Target Exams</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/exams/norcet" className="hover:text-white transition-colors">AIIMS NORCET 08</Link></li>
              <li><Link href="/exams/esic" className="hover:text-white transition-colors">ESIC Nursing Officer</Link></li>
              <li><Link href="/exams/rrb" className="hover:text-white transition-colors">RRB Paramedical CBT</Link></li>
              <li><Link href="/exams/wbhrb" className="hover:text-white transition-colors">WBHRB Staff Nurse Gr-II</Link></li>
              <li><Link href="/exams/pharmacist" className="hover:text-white transition-colors">Government Pharmacist</Link></li>
              <li><Link href="/exams/cho" className="hover:text-white transition-colors">CHO Community Health</Link></li>
            </ul>
          </div>

          {/* Col 3: Test Banks */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Practice & PYQs</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/tests" className="hover:text-white transition-colors">Full-Length CBT Mocks</Link></li>
              <li><Link href="/tests" className="hover:text-white transition-colors">Previous Year Papers (PYQ)</Link></li>
              <li><Link href="/subjects" className="hover:text-white transition-colors">Anatomy & Physiology</Link></li>
              <li><Link href="/subjects" className="hover:text-white transition-colors">Clinical Pharmacology</Link></li>
              <li><Link href="/subjects" className="hover:text-white transition-colors">Medical-Surgical Nursing</Link></li>
              <li><Link href="/current-affairs" className="hover:text-white transition-colors">Medical Current Affairs</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Exam Notifications & Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Student Helpdesk & Contact</Link></li>
              <li><Link href="/ncbt-one" className="hover:text-white transition-colors">NCBT ONE Universal Pass</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NCBT.in (National CBT). All rights reserved. Dedicated to Medical & Healthcare Aspirants.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
