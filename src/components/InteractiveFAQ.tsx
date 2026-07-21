import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

interface InteractiveFAQProps {
  faqs?: FAQItem[];
  title?: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    q: "How does the NCBT Live CBT Exam Simulator work?",
    a: "Our simulator is precisely tuned to mimic the real-world computer-based testing layouts of AIIMS NORCET, ESIC, and State PSCs. It features precise section-wise counts, live countdown timers, and automatically calculates negative marks (like -0.33 per wrong answer for central recruitments) upon submission."
  },
  {
    q: "Are the Solved Previous Year Papers (PYQs) 100% authentic?",
    a: "Yes! All PYQs on our platform are verified recall papers compiled by nursing tutors and rank-holding officers. Each question includes a deep, clinically referenced rationale derived from standard nursing textbooks to facilitate concept mastery."
  },
  {
    q: "Can I practice mock tests and speed sprints for free?",
    a: "Absolutely. NCBT.in is committed to providing free, high-quality, professional resources for Staff Nurse and Nursing Officer aspirants. All mock papers, past solved papers, subject drills, and speed sprints are accessible free of charge."
  },
  {
    q: "How are my Performance Analytics and rank calculated?",
    a: "When you finish a test, our engine evaluates your accuracy, negative marking risks, and speed index (seconds spent per question). This is compared against other aspirants to simulate your All India Rank (AIR), pointing out exactly which clinical sub-categories need more focus."
  },
  {
    q: "Does NCBT.in support practice on mobile browsers?",
    a: "Yes! The portal is 100% mobile-responsive with high-contrast UI, spacious touch targets (minimum 44px), and fluid scrolling so you can revise clinical MCQs, study rationales, and check job alerts smoothly on the go."
  },
  {
    q: "How can I report an error or reach academic support?",
    a: "We strive for perfect accuracy. If you notice a typo or discrepancy in any medical rationale, you can click the 'Report' button directly inside the CBT portal, or submit a support ticket via our 'Contact Us' page to get instant assistance from our academic team."
  }
];

export function InteractiveFAQ({ faqs = defaultFAQs, title = "Frequently Asked Questions (FAQ)" }: InteractiveFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div 
      className="bg-[#0f172a]/65 backdrop-blur-md border border-slate-800/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden transition-all max-w-4xl mx-auto"
      id="interactive-faq-block"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
        <HelpCircle className="w-5 h-5 text-accent animate-pulse shrink-0" />
        <h3 className="text-sm md:text-base font-black text-white uppercase tracking-wider">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                isOpen
                  ? "bg-accent/10 border-accent/70 shadow-md shadow-accent/5"
                  : "bg-slate-900/40 border-slate-850 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
              id={`faq-item-${idx}`}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[12px] md:text-xs font-black text-slate-100 flex items-center gap-2 text-left leading-snug">
                  <span className="text-accent shrink-0 font-black">Q:</span>
                  {faq.q}
                </h4>
                <div className="text-slate-400 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-accent" />
                  ) : (
                    <ChevronDown className="w-4 h-4 hover:text-white" />
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2 border-t border-slate-850/40 mt-2">
                  <p className="text-[11px] md:text-[12px] text-slate-300 pl-4 font-sans leading-relaxed border-l-2 border-accent/60">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
