import { TARGET_EXAMS, SUBJECTS, PYQ_DATA } from "./data";
import { STATIC_NURSING_UPDATES } from "./updatesData";

export interface SeoMeta {
  title: string;
  description: string;
  jsonLd?: string;
  noIndex?: boolean;
}

export const CATEGORY_ROUTES = [
  { path: "/nursing", id: "Nursing", name: "Nursing", desc: "AIIMS NORCET, WBHRB, ESIC, RRB, CHO, DSSSB Staff Nurse" },
  { path: "/pharmacist", id: "Pharmacist", name: "Pharmacist", desc: "RRB Pharmacist, ESIC, WBHRB, Drug Inspector, State Health" },
  { path: "/paramedical", id: "Paramedical", name: "Paramedical", desc: "Surgical OT Tech, Ophthalmic, Dialysis, ICU Technician" },
  { path: "/lab-tech", id: "Lab Tech", name: "Lab Technician", desc: "DMLT, AIIMS Pathology, RRB Lab Assistant" },
  { path: "/radiographer", id: "Radiographer", name: "Radiographer", desc: "X-Ray Technician, CT/MRI, Radiation Physics" },
  { path: "/medical-officer", id: "Medical Officer", name: "Medical Officer & Govt", desc: "CHO Medical, UPSC CMS, State Public Health Officer" },
];

/**
 * SINGLE SOURCE OF TRUTH FOR ALL ROUTES IN THE NCBT APPLICATION
 * Automatically discovers static, category, exam, blog/updates, and test routes.
 */
export function getAllAppRoutes(): string[] {
  const routes: string[] = [
    '/',
    '/updates',
    '/about',
    '/contact',
    '/analytics',
    '/find-tests',
  ];

  // 1. Add Category/Profession landing routes
  CATEGORY_ROUTES.forEach(c => routes.push(c.path));

  // 2. Add Target Exam landing routes (/exams/exam-id)
  TARGET_EXAMS.forEach(exam => {
    routes.push(`/exams/${exam.id}`);
  });

  // 3. Add Blog/Update article routes (/updates/update-id)
  STATIC_NURSING_UPDATES.forEach(update => {
    routes.push(`/updates/${update.id}`);
  });

  // 4. Add Subject Test routes (/test/subject-id/test-id)
  SUBJECTS.forEach(subj => {
    subj.tests.forEach(t => {
      if (t.ready) {
        routes.push(`/test/${subj.id}/${t.id}`);
      }
    });
  });

  // 5. Add PYQ virtual test routes
  PYQ_DATA.forEach(pyq => {
    const pyqId = `pyq-${pyq.tag}-${pyq.year}`.toLowerCase();
    routes.push(`/test/virtual/${pyqId}`);
  });

  // 6. Add Curated Sprint virtual test routes
  const SPRINT_IDS = ["sprint-anatomy", "sprint-medsurg", "sprint-pharma", "sprint-curated-1", "sprint-curated-2", "sprint-curated-3", "sprint-curated-4", "sprint-curated-5"];
  SPRINT_IDS.forEach(sprintId => {
    routes.push(`/test/virtual/${sprintId}`);
  });

  // Return unique route list
  return Array.from(new Set(routes));
}

export function isValidAppRoute(urlPath: string): boolean {
  let cleanPath = urlPath.toLowerCase().split('?')[0];
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (cleanPath === "/" || cleanPath === "") return true;

  const validRoutes = getAllAppRoutes();
  if (validRoutes.includes(cleanPath)) return true;

  // Check alias routes & dynamic patterns
  if (cleanPath === "/find-test" || cleanPath === "/find-tests") return true;
  if (cleanPath.startsWith("/exams/") || cleanPath.startsWith("/exam/")) {
    const slug = cleanPath.split("/")[2];
    if (slug && TARGET_EXAMS.some(e => e.id.toLowerCase() === slug.toLowerCase())) {
      return true;
    }
    return false;
  }
  if (cleanPath.startsWith("/updates/")) {
    const slug = cleanPath.split("/")[2];
    if (slug && STATIC_NURSING_UPDATES.some(u => u.id.toLowerCase() === slug.toLowerCase())) {
      return true;
    }
    return false;
  }
  if (cleanPath.startsWith("/test/")) {
    const parts = cleanPath.split("/");
    const subjId = parts[2];
    const testId = parts[3];
    if (subjId === "virtual" && testId) {
      if (testId.startsWith("pyq-")) {
        return PYQ_DATA.some(p => `pyq-${p.tag}-${p.year}`.toLowerCase() === testId.toLowerCase());
      }
      if (testId.startsWith("sprint-")) return true;
    }
    if (subjId && testId) {
      const subj = SUBJECTS.find(s => s.id === subjId);
      if (subj && subj.tests.some(t => t.id === testId)) return true;
    }
    return false;
  }

  return false;
}

export function getSeoMetadata(urlPath: string): SeoMeta {
  const cleanPath = urlPath.toLowerCase().split('?')[0];

  // If path is invalid / 404
  if (!isValidAppRoute(cleanPath)) {
    return {
      title: "404 - Page Not Found | NCBT.in",
      description: "The page or assessment route you requested does not exist or has been updated on NCBT.in.",
      noIndex: true
    };
  }

  // 1. Static Core Pages
  if (cleanPath === "/updates") {
    return {
      title: "NCBT Syllabus, Recruitment Vacancy Updates & Blog Insights | NCBT.in",
      description: "Live notifications of government healthcare vacancies, exam syllabus details, and clinical notes for AIIMS, ESIC, RRB, WBHRB, and State Health Directorates.",
    };
  }

  if (cleanPath === "/analytics") {
    return {
      title: "CBT Performance Analytics Dashboard & Rank Analytics | NCBT.in",
      description: "Analyse your exam preparation with personalized diagnostic reporting of strengths, streak multipliers, accuracy rates, and time-management stats.",
    };
  }

  if (cleanPath === "/about") {
    return {
      title: "About Us — NCBT National Computer Based Test Platform | NCBT.in",
      description: "Learn about NCBT.in, our mission to democratize quality computer-based test prep for Indian Nursing, Pharmacist, and Paramedical government aspirants.",
    };
  }

  if (cleanPath === "/contact") {
    return {
      title: "Contact Us & Academic Support Helpdesk | NCBT.in",
      description: "Reach out to the NCBT academic support team for help with mock tests, question rationales, syllabus updates, or platform feedback.",
    };
  }

  if (cleanPath === "/find-tests" || cleanPath === "/find-test") {
    return {
      title: "Find Exams & Mock Test Series | NCBT.in",
      description: "Search and filter through all Nursing, Pharmacist, Paramedical, Lab Technician, and Radiographer mock tests, PYQs, and subject-wise CBT series.",
    };
  }

  // 2. Category / Profession Landing Pages
  const categoryMatch = CATEGORY_ROUTES.find(c => c.path === cleanPath);
  if (categoryMatch) {
    return {
      title: `${categoryMatch.name} Govt Exam Preparation, CBT Mocks & Syllabus | NCBT.in`,
      description: `Prepare for ${categoryMatch.name} government recruitment exams. Practice free CBT mock tests, previous year papers, and syllabus practice sets for ${categoryMatch.desc}.`,
    };
  }

  // 3. Exam Landing Pages (/exam/exam-id or /exams/exam-id)
  if (cleanPath.startsWith("/exam/") || cleanPath.startsWith("/exams/")) {
    const parts = cleanPath.split("/");
    const examSlug = parts[2] || "";
    const foundExam = TARGET_EXAMS.find(e => e.id.toLowerCase() === examSlug);
    if (foundExam) {
      return {
        title: `${foundExam.fullName || foundExam.name} Mock Tests, Syllabus & Solved PYQs | NCBT.in`,
        description: `${foundExam.desc} Attempt free CBT mock test series and solved past year question papers for ${foundExam.name} on NCBT.in.`,
      };
    }
    const examName = examSlug.replace(/-/g, " ").toUpperCase();
    return {
      title: `${examName} CBT Mock Tests, Syllabus & PYQ Prep Series | NCBT.in`,
      description: `Prepare for ${examName} with free full-length CBT mock tests, solved past year question papers, subject-wise practice, and live rank analytics on NCBT.in`,
    };
  }

  // 4. Blog / Update Article Pages (/updates/update-id)
  if (cleanPath.startsWith("/updates/")) {
    const parts = cleanPath.split("/");
    const updateId = parts[2];
    const foundUpdate = STATIC_NURSING_UPDATES.find(u => u.id.toLowerCase() === updateId);
    if (foundUpdate) {
      return {
        title: `${foundUpdate.title} | NCBT Exam Notes & Syllabus`,
        description: foundUpdate.summary,
        jsonLd: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": foundUpdate.title,
          "description": foundUpdate.summary,
          "image": foundUpdate.image,
          "datePublished": foundUpdate.date,
          "author": {
            "@type": "Organization",
            "name": "NCBT.in"
          }
        })
      };
    }
  }

  // 5. Test Pages (/test/subject-id/test-id)
  if (cleanPath.startsWith("/test/")) {
    const parts = cleanPath.split("/");
    const subjId = parts[2];
    const testId = parts[3];
    
    let testTitle = "CBT Assessment";
    if (subjId === "virtual") {
      testTitle = testId ? testId.toUpperCase().replace(/-/g, " ") : "Virtual CBT";
    } else {
      const subject = SUBJECTS.find(s => s.id === subjId);
      if (subject) {
        const test = subject.tests.find(t => t.id === testId);
        if (test) {
          testTitle = test.title;
        }
      }
    }

    return {
      title: `Attend CBT Test: ${testTitle} | NCBT.in`,
      description: `Practice ${testTitle} on NCBT. Answer high-yield multiple choice questions with active timers, negative markings, review flags, and detailed explanations.`,
    };
  }

  // DEFAULT (LANDING PAGE "/")
  return {
    title: "NCBT – Mock Tests & PYQs for Nursing, Pharmacist & Paramedical Govt Exams",
    description: "Prepare smarter with NCBT. Practice free and premium Mock Tests, Previous Year Questions (PYQs), exam-wise practice sets and performance analytics for Nursing, Pharmacist and Paramedical Government Exams including WBHRB, AIIMS NORCET, ESIC, RRB, NHM, DSSSB and more.",
    jsonLd: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NCBT.in",
        "url": "https://ncbt.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ncbt.in/?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What exams does NCBT help prepare for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NCBT (National CBT) provides computer-based testing preparation for top Nursing, Pharmacist, and Paramedical Government Recruitment Exams including WBHRB, AIIMS NORCET, ESIC, RRB, NHM, DSSSB, and state PSC exams."
            }
          },
          {
            "@type": "Question",
            "name": "Is there negative marking in NCBT simulated tests?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our CBT exam mode accurately replicates standard negative marking penalties (e.g. 0.25) for incorrect selections, giving you a true assessment of your test-taking skills."
            }
          },
          {
            "@type": "Question",
            "name": "Are explanations and rationales provided?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, every question on NCBT features comprehensive expert-curated rationales, enhanced by our AI tutor for real-time clarification."
            }
          }
        ]
      }
    ])
  };
}

export function getPreRenderedContent(urlPath: string): string {
  return `
    <div class="ncbt-app-loader">
      <div class="ncbt-spinner"></div>
      <div class="ncbt-brand-text">NCBT</div>
    </div>
  `.trim();
}
