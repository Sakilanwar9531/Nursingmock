import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "NCBT ONE — Lifetime Universal Access Pass | NCBT",
  description: "Get unlimited lifetime access to 500+ CBT Mock Tests, Previous Year Solved Papers, and Real Exam Simulation.",
  alternates: {
    canonical: "https://ncbt.in/ncbt-one",
  },
};

export default function NcbtOneRoute() {
  return <ClientApp />;
}
