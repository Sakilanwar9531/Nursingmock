import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Daily Medical & Healthcare Current Affairs 2025–2026 | NCBT",
  description: "High-yield healthcare schemes, WHO guidelines, ICMR updates, and health summit GK questions for AIIMS NORCET, ESIC, and State medical exams.",
  keywords: [
    "Medical current affairs 2025",
    "Health GK for AIIMS NORCET",
    "Ayushman Bharat updates",
    "WHO guidelines MCQ",
  ],
  alternates: {
    canonical: "https://ncbt.in/current-affairs",
  },
  openGraph: {
    title: "Daily Medical & Healthcare Current Affairs | NCBT",
    description: "High-yield healthcare general knowledge and medical current affairs for competitive exams.",
    url: "https://ncbt.in/current-affairs",
    type: "website",
  },
};

export default function CurrentAffairsPage() {
  return <ClientApp />;
}
