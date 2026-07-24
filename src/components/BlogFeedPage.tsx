import React, { useState } from "react";
import { 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Copy
} from "lucide-react";
import { NursingUpdate, User } from "../types";

interface BlogFeedPageProps {
  updates: NursingUpdate[];
  loadingUpdates: boolean;
  updatesError: string | null;
  onFetchUpdates: () => void;
  onSelectUpdate: (update: NursingUpdate) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigatePage: (pageId: string) => void;
  triggerToast?: (msg: string, type?: "ok" | "err") => void;
  currentUser?: User | null;
}

export const BlogFeedPage: React.FC<BlogFeedPageProps> = ({
  updates,
  loadingUpdates,
  updatesError,
  onSelectUpdate,
  triggerToast
}) => {
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const copyPostLink = (update: NursingUpdate, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = `${window.location.origin}/updates?id=${update.id}`;
    navigator.clipboard.writeText(link);
    setCopiedPostId(update.id);
    if (triggerToast) triggerToast("Article link copied! 📋", "ok");
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const sharePostToWhatsapp = (update: NursingUpdate, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*NCBT Editorial: ${update.title}*\n\n${update.summary}\n\nRead full article & practice CBT: ${window.location.origin}/updates?id=${update.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text-primary)] min-h-screen pb-20 font-sans select-text">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        
        {/* Top Header Block: Centered NCBT Blog & SEO Subtitle */}
        <div className="text-center py-6 md:py-8 border-b border-[var(--border)] space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] font-display tracking-tight">
            NCBT Blog
          </h1>
          <p className="text-sm md:text-base text-[var(--text2)] font-medium max-w-2xl mx-auto leading-relaxed">
            Latest Exam Updates, Official Recruitment Notifications &amp; Clinical Preparation Tips
          </p>
        </div>

        {/* Error warning if any */}
        {updatesError && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-3.5 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <span>💡</span>
            <span>{updatesError}</span>
          </div>
        )}

        {/* Article Feed Cards */}
        {loadingUpdates ? (
          <div className="py-20 text-center space-y-3 bg-[var(--card)] rounded-3xl border border-[var(--border)]">
            <span className="animate-spin border-4 border-[var(--primary)] border-t-transparent rounded-full h-8 w-8 inline-block" />
            <p className="text-xs text-[var(--text2)] font-medium">Fetching active board updates...</p>
          </div>
        ) : updates.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[var(--card)] rounded-3xl border border-[var(--border)]">
            <div className="text-2xl">📰</div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">No articles available</h3>
            <p className="text-xs text-[var(--text2)]">Please check back later or sync the feed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectUpdate(item)}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/60 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
              >
                {/* Article Image Banner without top colorful lines */}
                <div className="relative h-48 overflow-hidden bg-[var(--surface-2)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Badge Pill & Read Time */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--surface-2)] text-[var(--primary)] text-[10px] font-black uppercase tracking-wider border border-[var(--border)]">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-[var(--text2)] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--text2)]" />
                        <span>{item.readTime}</span>
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug font-sans">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed font-sans">
                      {item.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[var(--text2)] font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[var(--text2)]" />
                      <span>{item.date}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => sharePostToWhatsapp(item, e)}
                        className="p-1.5 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface)] text-emerald-600 dark:text-emerald-400 border border-[var(--border)] transition-colors cursor-pointer"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => copyPostLink(item, e)}
                        className="p-1.5 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--text2)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-colors cursor-pointer"
                        title="Copy Article Link"
                      >
                        {copiedPostId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
