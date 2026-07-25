import { X, GraduationCap, Pill, TestTube2, Radiation, Scissors, HeartPulse, Stethoscope, Activity } from "lucide-react";

export const PROFESSIONS = [
  { slug: "nursing",         label: "Nursing Officer",     icon: GraduationCap, categoryMatch: "Nursing" },
  { slug: "pharma",          label: "Pharmacist",          icon: Pill,          categoryMatch: "Pharmacist" },
  { slug: "lab-technician",  label: "Lab Technician",      icon: TestTube2,     categoryMatch: "Lab Tech" },
  { slug: "radiographer",    label: "Radiographer",        icon: Radiation,     categoryMatch: "Radiographer" },
  { slug: "ot-technician",   label: "OT Technician",       icon: Scissors,      categoryMatch: "Paramedical" },
  { slug: "cho",             label: "CHO",                 icon: HeartPulse,    categoryMatch: "CHO" },
  { slug: "physiotherapist", label: "Physiotherapist",     icon: Activity,      categoryMatch: "Physiotherapist" },
  { slug: "medical-officer", label: "Medical Officer",     icon: Stethoscope,   categoryMatch: "Medical Officer" },
];

export function NCBTOneSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="ncbt-one-theme fixed inset-0 z-50 flex animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div
        className="relative w-72 h-full flex flex-col p-4 overflow-y-auto shadow-2xl border-r border-[var(--n1-border)]"
        style={{ background: "var(--n1-surface)" }}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--n1-border)]">
          <span className="text-[15px] font-bold tracking-tight" style={{ color: "var(--n1-text)" }}>
            NCBT One — Professions
          </span>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[var(--n1-surface-2)] cursor-pointer transition-colors"
          >
            <X size={18} style={{ color: "var(--n1-text-secondary)" }} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {PROFESSIONS.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.slug}
                onClick={() => {
                  window.history.pushState(null, "", `/ncbt-one/${p.slug}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-[var(--n1-surface-2)] cursor-pointer group"
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: "var(--n1-surface-2)" }}
                >
                  <Icon size={16} style={{ color: "var(--n1-primary)" }} />
                </span>
                <span className="text-[14px] font-medium group-hover:font-semibold transition-all" style={{ color: "var(--n1-text)" }}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
