import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Online CBT Mock Tests & Solved PYQs Series | NCBT",
  description: "Attempt full-length CBT mock tests, previous year papers (AIIMS NORCET, ESIC, RRB, WBHRB), subject unit tests, and 10-MCQ speed sprints with real exam timers.",
  keywords: [
    "online CBT mock test",
    "nursing test series",
    "pharmacist exam practice",
    "paramedical solved question papers",
    "AIIMS NORCET mock test series",
    "NCBT test portal",
  ],
  alternates: {
    canonical: "https://ncbt.in/tests",
  },
  openGraph: {
    title: "CBT Test Series Portal | NCBT",
    description: "Real-time exam simulation with negative marking penalties and All-India ranking.",
    url: "https://ncbt.in/tests",
    type: "website",
  },
};

export default function TestsCatalogPage() {
  return <ClientApp />;
}
