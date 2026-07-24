import React, { useState } from "react";
import { 
  Zap, 
  Newspaper, 
  Clock, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Search,
  Bookmark
} from "lucide-react";

interface CurrentAffairsPageProps {
  showPage: (pageId: string, pushHistory?: boolean, customState?: any) => void;
}

export const CurrentAffairsPage: React.FC<CurrentAffairsPageProps> = ({ showPage }) => {
  const [emailSub, setEmailSub] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setIsSubscribed(true);
    }
  };

  const previewUpdates = [
    {
      date: "TODAY'S SPECIAL",
      title: "Union Ministry of Health National Health Mission (NHM) Budget Allocation Update 2026",
      tag: "National Health",
      desc: "Key statistics on Ayushman Bharat expansion, new nursing college sanctioning, and healthcare workforce incentives relevant for upcoming CBT exams."
    },
    {
      date: "THIS WEEK",
      title: "WHO World Health Assembly Key Resolutions & Vaccine Guidelines",
      tag: "International Health",
      desc: "High-yield immunization schedule updates, global epidemic alerts, and international nursing council declarations for competitive exams."
    },
    {
      date: "MONTHLY RECAP",
      title: "India Govt Appointments: New Director General of Health Services & AIIMS Council",
      tag: "Appointments",
      desc: "Important administrative appointments, awards, and healthcare recognitions frequently asked in general awareness sections."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-20 font-sans">
      
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-[var(--surface)] to-[var(--bg)] pt-12 pb-16 px-4 md:px-8 border-b border-[var(--border)]">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 rounded-full filter blur-[140px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest shadow-lg">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>DAILY HEALTHCARE &amp; NATIONAL CURRENT AFFAIRS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
            Current Affairs &amp; General Knowledge <br />
            <span className="text-amber-500 font-serif italic font-normal">Coming Soon!</span>
          </h1>

          <p className="text-sm md:text-base text-[var(--text2)] max-w-2xl mx-auto leading-relaxed">
            We are building a dedicated daily healthcare current affairs capsule, national exam updates feed, and monthly PDF digests tailored for Nursing, Pharmacist, and Paramedical CBT recruitment exams.
          </p>

        </div>
      </div>

      {/* COMING SOON ALERT CARD */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <div className="bg-[var(--card)] border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
              Daily Current Affairs Module is Under Construction 🚀
            </h2>
            <p className="text-xs md:text-sm text-[var(--text2)] max-w-lg mx-auto leading-relaxed">
              Get notified when our editorial team launches daily 10-minute current affairs quizzes and downloadable monthly PDF magazines for NORCET, ESIC, and Railway exams.
            </p>
          </div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email for early alert..."
                className="flex-1 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl px-4 py-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-500 font-sans"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <Bell className="w-4 h-4 fill-slate-950" />
                <span>Notify Me</span>
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>You're subscribed! We'll alert you as soon as daily current affairs go live.</span>
            </div>
          )}

        </div>
      </div>

      {/* SAMPLE UPCOMING CURRENT AFFAIRS FEED PREVIEW */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-black text-[var(--text-primary)] uppercase tracking-wider">
              Sneak Peek — Upcoming Daily Current Affairs Format
            </h3>
          </div>
          <span className="text-xs text-amber-500 font-bold">100% Exam Focused</span>
        </div>

        <div className="space-y-4">
          {previewUpdates.map((item, idx) => (
            <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm hover:border-[var(--border)] transition-all space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {item.date}
                </span>
                <span className="text-[10px] font-bold text-[var(--text2)] bg-[var(--surface-2)] px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-[var(--text2)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Back to Home Action */}
        <div className="text-center pt-8">
          <button
            onClick={() => showPage("landing")}
            className="px-6 py-3 bg-[var(--surface-2)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>← Back to NCBT Home</span>
          </button>
        </div>
      </div>

    </div>
  );
};
