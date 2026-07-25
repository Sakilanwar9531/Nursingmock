import { useState } from "react";
import { Search, FileText, Target, Zap, Layers } from "lucide-react";

const TABS = [
  { key: "pyq",    label: "PYQ Zone",    icon: FileText },
  { key: "mocks",  label: "Mock Arena",  icon: Target },
  { key: "quiz",   label: "Quick Quiz",  icon: Zap },
  { key: "drills", label: "Speed Drills", icon: Layers },
];

const FILTERS = [
  { key: "all",    label: "All" },
  { key: "pyq",    label: "PYQ" },
  { key: "mocks",  label: "Mocks" },
  { key: "notes",  label: "Notes" },
];

interface NCBTOneTopNavProps {
  onSearch?: (q: string) => void;
  onTabChange?: (tab: string) => void;
  onFilterChange?: (filter: string) => void;
  activeTab?: string;
  activeFilter?: string;
}

export function NCBTOneTopNav({
  onSearch,
  onTabChange,
  onFilterChange,
  activeTab: propActiveTab,
  activeFilter: propActiveFilter
}: NCBTOneTopNavProps) {
  const [internalTab, setInternalTab] = useState("pyq");
  const [internalFilter, setInternalFilter] = useState("all");

  const currentTab = propActiveTab !== undefined ? propActiveTab : internalTab;
  const currentFilter = propActiveFilter !== undefined ? propActiveFilter : internalFilter;

  const handleTabClick = (key: string) => {
    setInternalTab(key);
    onTabChange?.(key);
  };

  const handleFilterClick = (key: string) => {
    setInternalFilter(key);
    onFilterChange?.(key);
  };

  return (
    <div
      className="ncbt-one-theme sticky top-0 z-30 px-4 pt-3 pb-2 transition-colors duration-200"
      style={{ background: "var(--n1-primary)" }}
    >
      {/* Row 1: pill tabs, Zepto-style */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = currentTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer"
              style={{
                background: active ? "var(--n1-surface)" : "rgba(255,255,255,0.08)",
                color: active ? "var(--n1-primary)" : "rgba(255,255,255,0.85)",
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Row 2: search */}
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl mb-3 shadow-sm border border-black/5"
        style={{ background: "var(--n1-surface)" }}
      >
        <Search size={16} style={{ color: "var(--n1-text-secondary)" }} />
        <input
          placeholder={`Search "${TABS.find(t => t.key === currentTab)?.label}"...`}
          onChange={(e) => onSearch?.(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[14px]"
          style={{ color: "var(--n1-text)" }}
        />
      </div>

      {/* Row 3: quick filters, icon-row style */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((f) => {
          const active = currentFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => handleFilterClick(f.key)}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer"
              style={{
                background: active ? "var(--n1-accent)" : "rgba(255,255,255,0.1)",
                color: active ? "var(--n1-primary)" : "rgba(255,255,255,0.8)",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
