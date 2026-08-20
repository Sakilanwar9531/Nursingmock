import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Official Exam Updates, Syllabus Blueprints & Clinical Nursing Articles | NCBT",
  description: "Browse verified exam notifications, syllabus breakdowns, clinical nursing study notes, and previous year solved questions for AIIMS NORCET, ESIC, RRB, and State Paramedical exams.",
  keywords: [
    "AIIMS NORCET updates",
    "ESIC Nursing Officer syllabus",
    "RRB Paramedical exam pattern",
    "Clinical nursing notes",
    "Pharmacist government exam preparation",
    "NCBT official blog",
  ],
  alternates: {
    canonical: "https://ncbt.in/blog",
  },
  openGraph: {
    title: "Official Exam Updates, Syllabus Blueprints & Study Notes | NCBT Blog",
    description: "Verified exam alerts, in-depth subject notes, and preparation guides for Nursing, Pharmacist & Paramedical government exams.",
    url: "https://ncbt.in/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <ClientApp />;
}
