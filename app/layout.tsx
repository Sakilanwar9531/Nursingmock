import type { Metadata, Viewport } from "next";
import "../src/index.css";

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ncbt.in"),
  title: {
    default: "NCBT — India's Premier Nursing, Pharmacist & Paramedical CBT Exam Platform",
    template: "%s | NCBT Exam Prep",
  },
  description:
    "Master AIIMS NORCET, ESIC Nursing Officer, RRB Paramedical, Pharmacist, Lab Technician, CHO, and State PSC exams with real-time CBT mock tests, previous year papers, detailed rationales, and all-India analytics.",
  keywords: [
    "NORCET 07 mock test",
    "AIIMS Nursing Officer test series",
    "ESIC Staff Nurse CBT exam",
    "RRB Paramedical solved papers",
    "Pharmacist exam mock test",
    "Lab Technician CBT test",
    "Nursing CBT preparation",
    "CHO online exam series",
    "NCBT test portal",
  ],
  authors: [{ name: "NCBT Educational Team" }],
  creator: "NCBT",
  publisher: "NCBT Exam Portal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ncbt.in",
    siteName: "NCBT — Nursing & Paramedical CBT Platform",
    title: "NCBT — Complete Nursing & Paramedical Exam Test Series",
    description:
      "Practice 50,000+ exam-level MCQs, official PYQs with explanations, real AIIMS-pattern CBT timer, and All-India rank analytics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NCBT — Nursing & Paramedical CBT Exam Platform",
    description:
      "Real-time CBT Mock Tests & Solved PYQs for AIIMS NORCET, ESIC, RRB, and State Staff Nurse Exams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "NCBT",
    alternateName: "Nursing & Paramedical CBT Portal",
    url: "https://ncbt.in",
    description:
      "India's dedicated CBT preparation portal for Nursing Officers, Pharmacists, and Paramedical professionals.",
    educationalCredentialAwarded: "CBT Mock Test Assessment & Rank Certificate",
    sameAs: [],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#070b14] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
