import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Target Exam Test Series & Syllabus Directory | NCBT",
  description: "Browse official CBT Mock Tests, Previous Year Solved Papers, and Syllabus Blueprints for AIIMS NORCET, ESIC Nursing Officer, RRB Paramedical, Pharmacist, Lab Technician & State Health Exams.",
  keywords: [
    "AIIMS NORCET test series",
    "ESIC Nursing Officer mock test",
    "RRB Paramedical CBT",
    "Pharmacist government exam test series",
    "Lab Technician exam syllabus",
    "WBHRB staff nurse question papers",
  ],
  alternates: {
    canonical: "https://ncbt.in/exams",
  },
  openGraph: {
    title: "All Government Nursing, Pharmacist & Paramedical Exams | NCBT",
    description: "Prepare with official pattern CBT mocks and PYQs for top medical recruitments in India.",
    url: "https://ncbt.in/exams",
    type: "website",
  },
};

export default function ExamsCatalogPage() {
  return <ClientApp />;
}
