import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Headphones, 
  Clock, 
  ShieldCheck, 
  Stethoscope,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Helpdesk Support | NCBT",
  description: "Get in touch with the NCBT support team for exam test series inquiries, question rationale queries, feedback, or grievance redressal.",
  keywords: [
    "NCBT contact",
    "NCBT helpdesk",
    "nursing exam support",
    "paramedical test series contact",
  ],
  alternates: {
    canonical: "https://ncbt.in/contact",
  },
  openGraph: {
    title: "Contact NCBT Helpdesk",
    description: "Reach our educational advisory board and technical team.",
    url: "https://ncbt.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-bold transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              NCBT.in
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">Contact & Support</span>
          </div>

          <Link 
            href="/"
            className="text-xs font-black px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Practice CBT</span>
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0e172a] via-[#070b14] to-[#070b14] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" />
            <span>Candidate Support Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Assist You?</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have questions about test series access, question key challenges, or syllabus updates? Our medical educator team is here to assist you.
          </p>
        </div>
      </div>

      {/* Main Form & Contact Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Direct Info */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Direct Channels</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Email Inquiries</div>
                  <a href="mailto:support@ncbt.in" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    support@ncbt.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Response Window</div>
                  <div className="text-slate-400">Monday - Saturday (9:00 AM - 7:00 PM IST)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Editorial Bureau</div>
                  <div className="text-slate-400">NCBT Health Sciences Research & CBT Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="bg-[#0e172a]/90 rounded-2xl border border-slate-800 p-6 sm:p-8 md:col-span-2">
          <h2 className="text-lg sm:text-xl font-black text-white mb-2">
            Send an Inquiry or Feedback
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Fill out the form below. We typically review and respond within 24 business hours.
          </p>

          <form className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Full Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Target Exam / Subject
              </label>
              <input
                type="text"
                placeholder="e.g. AIIMS NORCET, ESIC Pharmacist, RRB Staff Nurse"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Message / Question Query <span className="text-emerald-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe your question, challenge, or feedback in detail..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
