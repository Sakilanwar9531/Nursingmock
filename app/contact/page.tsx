import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ServerNavbar from "@/components/ServerNavbar";
import ServerFooter from "@/components/ServerFooter";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  Send,
  Phone
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact NCBT Support & Student Helpdesk | NCBT",
  description: "Get 24/7 student assistance, technical exam portal support, and institutional partnership inquiries at NCBT Helpdesk.",
  keywords: [
    "Contact NCBT",
    "NCBT helpline",
    "student grievance nursing exam",
    "CBT support India",
  ],
  alternates: {
    canonical: "https://ncbt.in/contact",
  },
  openGraph: {
    title: "Contact NCBT Support & Student Helpdesk",
    description: "Reach our exam grievance and technical support team anytime.",
    url: "https://ncbt.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact NCBT Student Helpdesk",
    url: "https://ncbt.in/contact",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "NCBT",
      email: "support@ncbt.in",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Student Support & Technical Helpdesk",
        availableLanguage: ["English", "Hindi"],
        email: "support@ncbt.in",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      <ServerNavbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-grow space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            24/7 Student Grievance & Helpdesk
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            How Can We Help You Today?
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Have a question regarding exam question accuracy, mock test timers, or technical portal queries? Reach out to our academic team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Direct Email Support</h3>
            <p className="text-xs text-slate-400">Response within 4 to 12 hours</p>
            <a href="mailto:support@ncbt.in" className="text-xs font-bold text-sky-400 hover:underline block">
              support@ncbt.in
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Helpdesk Hours</h3>
            <p className="text-xs text-slate-400">Academic & Test Support</p>
            <p className="text-xs font-bold text-emerald-400">Mon – Sat: 9:00 AM – 8:00 PM IST</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Question Discrepancy</h3>
            <p className="text-xs text-slate-400">Peer-review recheck desk</p>
            <p className="text-xs font-bold text-indigo-400">academic-audit@ncbt.in</p>
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white font-display">Send a Quick Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. priya@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Subject / Target Exam</label>
              <input
                type="text"
                placeholder="e.g. Query regarding AIIMS NORCET 08 Test 2"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Message / Grievance Details</label>
              <textarea
                rows={4}
                placeholder="Type your message or inquiry here..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-sky-500 resize-none"
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-500/20"
            >
              <Send className="w-4 h-4" /> Submit Inquiry
            </button>
          </form>
        </div>
      </main>

      <ServerFooter />
    </div>
  );
}
