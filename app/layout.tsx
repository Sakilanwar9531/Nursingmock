import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/src/index.css";

export const metadata: Metadata = {
  title: "NCBT – Mock Tests & PYQs for Nursing, Pharmacist & Paramedical Govt Exams",
  description: "Practice free and premium Mock Tests, Previous Year Solved Papers (PYQs), exam-wise drills, and clinical test series for AIIMS NORCET, ESIC, RRB, and State exams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
