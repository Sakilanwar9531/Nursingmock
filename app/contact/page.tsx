import React from "react";
import { Metadata } from "next";
import ClientApp from "@/app/ClientApp";

export const metadata: Metadata = {
  title: "Contact NCBT Support & Student Helpdesk | NCBT",
  description: "Get 24/7 student assistance, technical exam portal support, and institutional partnership inquiries at NCBT Helpdesk.",
  keywords: [
    "Contact NCBT",
    "NCBT helpline",
    "student grievance nursing exam",
    "CBT support India",
  ],
  alternates: {
    canonical: "https://ncbt.in/contact",
  },
  openGraph: {
    title: "Contact NCBT Support & Student Helpdesk",
    description: "Reach our exam grievance and technical support team anytime.",
    url: "https://ncbt.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ClientApp />;
}
