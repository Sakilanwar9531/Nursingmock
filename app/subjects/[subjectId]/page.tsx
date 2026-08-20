import React from "react";
import { Metadata } from "next";
import { SUBJECTS } from "@/src/data";
import ClientApp from "@/app/ClientApp";

interface Props {
  params: {
    subjectId: string;
  };
}

export async function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    subjectId: subject.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.id === params.subjectId);

  if (!subject) {
    return {
      title: "Subject Not Found | NCBT",
    };
  }

  return {
    title: `${subject.name} Mock Tests & Practice Question Bank | NCBT`,
    description: `Practice ${subject.name} MCQs with clinical rationales, official past year questions, and timed CBT practice sets for Nursing Officer, Pharmacist, and Paramedical exams.`,
    keywords: [
      `${subject.name} nursing questions`,
      `${subject.name} MCQs with answers`,
      `${subject.name} AIIMS NORCET test`,
      `${subject.name} solved questions`,
    ],
    alternates: {
      canonical: `https://ncbt.in/subjects/${params.subjectId}`,
    },
    openGraph: {
      title: `${subject.name} Unit Tests & Practice Questions | NCBT`,
      description: `Comprehensive question bank with detailed explanations for ${subject.name}.`,
      url: `https://ncbt.in/subjects/${params.subjectId}`,
      type: "website",
    },
  };
}

export default function SubjectDetailPage() {
  return <ClientApp />;
}
