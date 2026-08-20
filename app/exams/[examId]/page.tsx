import React from "react";
import { Metadata } from "next";
import { TARGET_EXAMS } from "@/src/data";
import ClientApp from "@/app/ClientApp";

interface Props {
  params: {
    examId: string;
  };
}

export async function generateStaticParams() {
  return TARGET_EXAMS.map((exam) => ({
    examId: exam.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = TARGET_EXAMS.find((e) => e.id === params.examId);

  if (!exam) {
    return {
      title: "Exam Not Found | NCBT",
    };
  }

  return {
    title: `${exam.name} Exam Mock Test Series, Syllabus & PYQ Papers | NCBT`,
    description: `Prepare for ${exam.fullName} with real CBT pattern mock tests, negative marking (1/3 or 1/4), subject-wise question distribution, syllabus blueprints, and previous year solved papers.`,
    keywords: [
      `${exam.name} mock test`,
      `${exam.fullName} syllabus`,
      `${exam.name} previous year questions`,
      `${exam.name} CBT preparation online`,
      `${exam.name} cut off marks`,
    ],
    alternates: {
      canonical: `https://ncbt.in/exams/${params.examId}`,
    },
    openGraph: {
      title: `${exam.fullName} Online Test Series | NCBT`,
      description: `Official pattern Computer Based Test (CBT) mock tests for ${exam.fullName}.`,
      url: `https://ncbt.in/exams/${params.examId}`,
      type: "website",
    },
  };
}

export default function ExamDetailPage() {
  return <ClientApp />;
}
