import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Subject-Wise Clinical Nursing, Pharmacology & Paramedical Question Banks | NCBT",
  description: "Browse subject-wise practice modules: Anatomy & Physiology, Pharmacology, Medical-Surgical Nursing, Community Health, Midwifery & OBG, Pediatric Nursing, and Microbiology.",
  keywords: [
    "Anatomy and physiology MCQs for nursing",
    "Pharmacology mock questions",
    "Medical surgical nursing CBT test",
    "Community health nursing MCQs",
    "OBG nursing questions",
  ],
  alternates: {
    canonical: "https://ncbt.in/subjects",
  },
  openGraph: {
    title: "Subject-Wise Test Banks | NCBT",
    description: "Master each core subject with targeted unit-wise MCQs and detailed clinical rationales.",
    url: "https://ncbt.in/subjects",
    type: "website",
  },
};

export default function SubjectsDirectoryPage() {
  return <ClientApp />;
}
