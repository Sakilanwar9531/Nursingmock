import React from "react";
import { Metadata } from "next";
import { SUBJECTS } from "@/src/data";
import ClientApp from "@/app/ClientApp";

interface Props {
  params: {
    testId: string;
  };
}

function findTest(testId: string) {
  for (const sub of SUBJECTS) {
    const found = sub.tests.find((t) => t.id === testId);
    if (found) {
      return { test: found, subject: sub };
    }
  }
  return null;
}

export async function generateStaticParams() {
  const params: { testId: string }[] = [];
  SUBJECTS.forEach((sub) => {
    sub.tests.forEach((t) => {
      if (t.id) {
        params.push({ testId: t.id });
      }
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = findTest(params.testId);

  if (!result) {
    return {
      title: "Test Not Found | NCBT",
    };
  }

  const { test, subject } = result;

  return {
    title: `${test.title} (${subject.name}) | Online CBT Practice Test - NCBT`,
    description: `${test.desc || "Official CBT test practice"} - ${test.questions} questions, ${test.mins} minutes, realistic negative marking exam portal.`,
    keywords: [
      `${test.title} online test`,
      `${subject.name} mock test`,
      "nursing CBT practice",
      "NCBT test series",
    ],
    alternates: {
      canonical: `https://ncbt.in/tests/${params.testId}`,
    },
    openGraph: {
      title: `${test.title} — Online CBT Mock Test | NCBT`,
      description: `Practice ${test.title} with official timer, instant score calculation, and detailed rationale solutions.`,
      url: `https://ncbt.in/tests/${params.testId}`,
      type: "website",
    },
  };
}

export default function TestPage() {
  return <ClientApp />;
}
