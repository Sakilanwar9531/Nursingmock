import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "About NCBT | India's Leading Nursing & Paramedical CBT Platform",
  description: "Learn about NCBT's mission, exam methodology, peer-reviewed clinical rationale standards, and how our CBT simulation empowers 100,000+ medical aspirants.",
  keywords: [
    "About NCBT",
    "NCBT mission",
    "nursing exam preparation portal India",
    "clinical CBT test system",
  ],
  alternates: {
    canonical: "https://ncbt.in/about",
  },
  openGraph: {
    title: "About NCBT - Educational Mission & Standards",
    description: "Setting the gold standard for Nursing, Pharmacist & Paramedical government test series.",
    url: "https://ncbt.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <ClientApp />;
}
