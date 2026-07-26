import React from "react";
import { ArrowRight } from "lucide-react";

interface CadreCard {
  label: string;
  slug: string;
  tint: "primary" | "accent" | "info" | "success";
}

const CADRES: CadreCard[] = [
  { label: "Nursing Officer",      slug: "nursing",         tint: "primary" },
  { label: "Pharmacist",           slug: "pharmacist",      tint: "accent"  },
  { label: "Lab Technician",       slug: "lab-technician",  tint: "info"    },
  { label: "Radiographer",         slug: "radiographer",    tint: "success" },
  { label: "OT Technician",        slug: "ot-technician",   tint: "primary" },
  { label: "Physiotherapist",      slug: "physiotherapist", tint: "info"    },
  { label: "Dialysis Technician",  slug: "dialysis-tech",   tint: "primary" },
  { label: "ECG Technician",       slug: "ecg-technician",  tint: "accent"  },
];

function navigateToCategory(slug: string) {
  let targetSlug = slug;
  if (slug === "pharmacist") targetSlug = "pharma";
  if (["nursing", "pharma", "lab-technician", "radiographer", "ot-technician", "physiotherapist"].includes(targetSlug)) {
    window.history.pushState(null, "", `/ncbt-one/${targetSlug}`);
  } else {
    window.history.pushState(null, "", `/find-tests?category=${slug}`);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function CadreGrid() {
  return (
    <section className="px-1 sm:px-2 py-4 w-full max-w-5xl mx-auto">
      <div className="mb-5">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          Browse by Cadre
        </span>
        <h2
          className="text-[22px] font-bold mt-1"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
        >
          Choose Your Profession
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {CADRES.map((cadre) => (
          <button
            key={cadre.slug}
            onClick={() => navigateToCategory(cadre.slug)}
            className="relative overflow-hidden rounded-2xl p-4 text-left transition-transform active:scale-[0.97] hover:-translate-y-0.5 cursor-pointer group"
            style={{
              background: `color-mix(in srgb, var(--${cadre.tint}) 12%, var(--surface))`,
              border: `1px solid color-mix(in srgb, var(--${cadre.tint}) 25%, transparent)`,
            }}
          >
            {/* decorative quarter-circle motif, bottom-right */}
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full pointer-events-none transition-transform group-hover:scale-110"
              style={{
                background: `color-mix(in srgb, var(--${cadre.tint}) 20%, transparent)`,
              }}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full pointer-events-none transition-transform group-hover:scale-125"
              style={{
                background: `color-mix(in srgb, var(--${cadre.tint}) 30%, transparent)`,
              }}
            />

            <div className="relative flex items-center justify-between gap-2 z-10">
              <span
                className="text-[15px] font-bold leading-tight"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
              >
                {cadre.label}
              </span>
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <ArrowRight size={15} style={{ color: `var(--${cadre.tint})` }} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
