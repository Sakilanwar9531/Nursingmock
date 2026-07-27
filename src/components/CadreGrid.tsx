import React from "react";
import { ArrowRight } from "lucide-react";

interface CadreCard {
  label: string;
  slug: string;
  bg: string;
  border: string;
  quarterBgInner: string;
  quarterBgOuter: string;
  iconColor: string;
}

const CADRES: CadreCard[] = [
  { label: "Nursing Officer", slug: "nursing", bg: "#9ec2af", border: "#7aa88d", quarterBgInner: "#428c68", quarterBgOuter: "#63a380", iconColor: "#063b2a" },
  { label: "Pharmacist", slug: "pharmacist", bg: "#eab592", border: "#d6996e", quarterBgInner: "#a85220", quarterBgOuter: "#c46d37", iconColor: "#522105" },
  { label: "Lab Technician", slug: "lab-technician", bg: "#9bc8ea", border: "#6ca8d4", quarterBgInner: "#256e9c", quarterBgOuter: "#428dbf", iconColor: "#072d47" },
  { label: "Radiographer", slug: "radiographer", bg: "#9ec2af", border: "#7aa88d", quarterBgInner: "#428c68", quarterBgOuter: "#63a380", iconColor: "#063b2a" },
  { label: "OT Technician", slug: "ot-technician", bg: "#9ec2af", border: "#7aa88d", quarterBgInner: "#428c68", quarterBgOuter: "#63a380", iconColor: "#063b2a" },
  { label: "Physiotherapist", slug: "physiotherapist", bg: "#9bc8ea", border: "#6ca8d4", quarterBgInner: "#256e9c", quarterBgOuter: "#428dbf", iconColor: "#072d47" },
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
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export default function CadreGrid() {
  return (
    <section className="px-1 sm:px-2 py-4 w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <p className="text-sm sm:text-base font-extrabold text-title-dark-black">
          Choose your profession to jump
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CADRES.map((cadre) => (
          <button
            key={cadre.slug}
            onClick={() => navigateToCategory(cadre.slug)}
            className="relative overflow-hidden rounded-[20px] py-4.5 px-6 text-left transition-all active:scale-[0.98] hover:-translate-y-0.5 cursor-pointer group shadow-sm flex items-center justify-between min-h-[72px]"
            style={{
              backgroundColor: cadre.bg,
              border: `1px solid ${cadre.border}`,
            }}
          >
            {/* Label */}
            <span
              className="text-[17px] sm:text-[18px] font-extrabold tracking-tight relative z-10"
              style={{ color: "#0f172a", fontFamily: "var(--font-display)" }}
            >
              {cadre.label}
            </span>

            {/* Right side circle button container */}
            <div className="relative flex items-center justify-center shrink-0 z-10">
              {/* White Circular Arrow Button */}
              <span
                className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                style={{ border: "1px solid rgba(0, 0, 0, 0.04)" }}
              >
                <ArrowRight size={19} style={{ color: cadre.iconColor }} strokeWidth={2.5} />
              </span>
            </div>

            {/* Bottom-right quarter-circle background motifs */}
            <span
              aria-hidden="true"
              className="absolute -bottom-7 -right-7 w-28 h-28 rounded-full pointer-events-none transition-transform group-hover:scale-105 opacity-80"
              style={{ backgroundColor: cadre.quarterBgOuter }}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full pointer-events-none transition-transform group-hover:scale-110"
              style={{ backgroundColor: cadre.quarterBgInner }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
