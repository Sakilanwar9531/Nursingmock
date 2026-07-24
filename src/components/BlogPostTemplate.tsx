import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  ArrowLeft, 
  Check, 
  Copy, 
  Link as LinkIcon,
  HelpCircle
} from "lucide-react";
import { NursingUpdate, User } from "../types";

interface BlogPostTemplateProps {
  post: NursingUpdate;
  onClose: () => void;
  onNavigatePage: (pageId: string, customState?: any) => void;
  currentUser?: User | null;
  triggerToast?: (msg: string, type?: "ok" | "err") => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const ARTICLE_FAQS: Record<string, FaqItem[]> = {
  "aiims-bsc-nursing-cbt-guide": [
    {
      question: "What is the format of the AIIMS B.Sc. Nursing Entrance Exam?",
      answer: "The AIIMS B.Sc. Nursing Entrance Exam is conducted as a Computer-Based Test (CBT) consisting of 100 multiple-choice questions (Physics: 30, Chemistry: 30, Biology: 30, General Knowledge: 10) with a total duration of 2 hours (120 minutes)."
    },
    {
      question: "What is the critical difference between using 'Mark for Review' and 'Save & Next' during the exam?",
      answer: "'Save & Next' saves your selected option into the central evaluation system. 'Mark for Review' allows you to flag a question to revisit. However, if an option is selected and marked for review, some exam systems evaluate it while others do not—hence, always click 'Save & Next' on your final answer to ensure evaluation."
    },
    {
      question: "How should I manage my time when encountering a difficult question?",
      answer: "Follow the 3-pass strategy: First attempt all direct, high-confidence questions within 50 minutes. In the second pass, attempt calculation or logic questions. In the final pass, review flagged questions without spending more than 1 minute on any single question."
    },
    {
      question: "What strategy should be adopted regarding negative marking in the exam?",
      answer: "AIIMS CBT carries 1/3rd (-0.33) negative marking for every wrong answer. Avoid blind guessing. Only attempt questions where you can eliminate at least two incorrect options to maintain a positive score ratio."
    }
  ],
  "update-1-norcet": [
    {
      question: "What is the deadline for AIIMS NORCET-VIII Stage II choice filling?",
      answer: "Candidates qualified in Stage II must log in to the official AIIMS portal and verify registered credentials, upload nursing registration certificates, and freeze institute options by June 24, 2026."
    },
    {
      question: "How is the 80:20 gender reservation quota applied in AIIMS seat allocation?",
      answer: "80% of nursing officer vacancies across all participating AIIMS institutes are reserved for female candidates, while 20% are allocated to male candidates based on merit rankings."
    }
  ]
};

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  post,
  onClose,
  triggerToast
}) => {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  const shareLink = `${window.location.origin}/updates?id=${post.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    if (triggerToast) triggerToast("Article link copied! 📋", "ok");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const text = `*NCBT Article: ${post.title}*\n\n${post.summary}\n\nRead more: ${shareLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const faqs = ARTICLE_FAQS[post.id] || [
    {
      question: `What is the format of the ${post.title.slice(0, 30)}... exam?`,
      answer: "The examination follows standard Computer-Based Testing guidelines. Review the detailed article sections above for section-wise breakdown and preparation rules."
    },
    {
      question: "Where can I practice free mock tests for this exam?",
      answer: "You can practice full-length CBT mock tests with real-time timer and negative marking on NCBT's Mock Test portal."
    }
  ];

  // Extract dynamic Table of Contents items from article headings
  const extractTocItems = (content: string) => {
    if (!content) return [];
    const lines = content.split("\n");
    const items: { title: string; id: string }[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        const titleText = trimmed.replace("### ", "").trim();
        const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        items.push({ title: titleText, id });
      }
    });
    return items;
  };

  const tocItems = extractTocItems(post.content);

  // Helper to parse content blocks including markdown tables
  const renderContentBlocks = (content: string) => {
    if (!content) return null;

    const lines = content.split("\n");
    const blocks: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line) {
        i++;
        continue;
      }

      // Detect Table (lines starting with |)
      if (line.startsWith("|") && i + 1 < lines.length && lines[i + 1].includes("---")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableLines.push(lines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const parseRow = (rowStr: string) => 
            rowStr.split("|").map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

          const headers = parseRow(tableLines[0]);
          const rows = tableLines.slice(2).map(parseRow);

          blocks.push(
            <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs bg-white">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                    {headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-3 border-r border-slate-200 last:border-r-0 uppercase tracking-wider font-semibold text-[11px] text-slate-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rows.map((r, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                      {r.map((c, cIdx) => {
                        // Custom badge style for Status / Badge columns
                        let badgeClass = "";
                        const lower = c.toLowerCase();
                        if (lower.includes("grey") || lower.includes("not visited")) badgeClass = "bg-slate-100 text-slate-700 border-slate-300";
                        else if (lower.includes("red") || lower.includes("unanswered")) badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
                        else if (lower.includes("green + blue") || lower.includes("answered & flagged")) badgeClass = "bg-teal-50 text-teal-800 border-teal-300";
                        else if (lower.includes("green") || lower.includes("saved")) badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        else if (lower.includes("blue") || lower.includes("flagged")) badgeClass = "bg-sky-50 text-sky-700 border-sky-200";

                        return (
                          <td key={cIdx} className="p-3 border-r border-slate-200 last:border-r-0 text-slate-800 font-medium">
                            {badgeClass && cIdx <= 1 ? (
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${badgeClass}`}>
                                {c}
                              </span>
                            ) : (
                              renderBoldText(c)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Headings ###
      if (line.startsWith("### ")) {
        const titleText = line.replace("### ", "").trim();
        const headingId = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        blocks.push(
          <div key={`h3-${i}`} id={headingId} className="pt-6 mb-2 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2 group">
              <span>{titleText}</span>
              <a href={`#${headingId}`} className="text-slate-300 hover:text-indigo-600 transition-colors">
                <LinkIcon className="w-4 h-4" />
              </a>
            </h2>
          </div>
        );
        i++;
        continue;
      }

      // Bullet points
      if (line.startsWith("- ")) {
        const bulletText = line.replace("- ", "").trim();
        blocks.push(
          <div key={`bullet-${i}`} className="flex items-start gap-2.5 my-2 pl-1 text-sm md:text-base text-slate-700 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-2.5" />
            <div className="flex-1">{renderBoldText(bulletText)}</div>
          </div>
        );
        i++;
        continue;
      }

      // Numbered items
      const numMatch = line.match(/^(\d+)\.\s*(.*)/);
      if (numMatch) {
        blocks.push(
          <div key={`num-${i}`} className="flex items-start gap-2.5 my-2 pl-1 text-sm md:text-base text-slate-700 leading-relaxed">
            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {numMatch[1]}
            </span>
            <div className="flex-1">{renderBoldText(numMatch[2])}</div>
          </div>
        );
        i++;
        continue;
      }

      // Standard Paragraph
      blocks.push(
        <p key={`p-${i}`} className="my-3 text-sm md:text-base text-slate-700 leading-relaxed md:leading-8 font-sans">
          {renderBoldText(line)}
        </p>
      );
      i++;
    }

    return blocks;
  };

  const renderBoldText = (text: string) => {
    const parts = text.split(/\*\*|__/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-slate-900">{part}</strong>;
      }
      return part;
    });
  };

  const defaultAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=SakilAnwar";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20 font-sans select-text">
      
      {/* Top Header with small back button only */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-slate-200 shadow-2xs"
            title="Back to Updates"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 space-y-6">
        
        {/* Article Title Header Block */}
        <div className="space-y-3 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-snug">
            {post.title}
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans">
            {post.summary}
          </p>

          {/* Author info & Share button row (Sakil Anwar with Cartoon Avatar) */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3 text-xs md:text-sm text-slate-500">
            <div className="flex items-center gap-2.5">
              <img 
                src={post.authorAvatar || defaultAvatar} 
                alt={post.authorName || "Sakil Anwar"} 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100 shrink-0"
              />
              <span className="font-semibold text-slate-800">{post.authorName || "Sakil Anwar"}</span>
              <span className="text-slate-300">|</span>
              <span>{post.date}</span>
            </div>

            <button
              onClick={() => setShowShareModal(!showShareModal)}
              className="px-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Share</span>
            </button>
          </div>

          {/* Share Modal Popover */}
          {showShareModal && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 animate-fade-in text-xs">
              <button
                onClick={handleShareWhatsapp}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 rounded-lg font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
              </button>
            </div>
          )}

        </div>

        {/* Expandable Table of Content Card */}
        {tocItems.length > 0 && (
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="text-base font-extrabold font-display">Table of Content</span>
              {isTocOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>

            {isTocOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2 animate-fade-in">
                {tocItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      setIsTocOpen(false);
                    }}
                    className="block text-xs md:text-sm text-slate-600 hover:text-indigo-600 transition-colors py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Article Body Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          {renderContentBlocks(post.content)}
        </div>

        {/* FAQs Accordion Block */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>{post.title.includes("AIIMS") ? "AIIMS B.Sc Nursing CBT FAQs" : "Frequently Asked Questions"}</span>
          </h2>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50/80 border border-slate-200/80 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs md:text-sm text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-3 font-sans animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
