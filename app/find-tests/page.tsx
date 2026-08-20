import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Search All CBT Tests & Mock Exams | NCBT",
  description: "Explore all central & state nursing, pharmacist, and paramedical CBT mock tests, PYQ series, and practice questions.",
  alternates: {
    canonical: "https://ncbt.in/find-tests",
  },
};

export default function FindTestsRoute() {
  return <ClientApp />;
}
