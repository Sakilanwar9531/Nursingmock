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
    '/pyq',
    '/mock-tests',
    '/subject-mocks',
    '/short-sprints',
    '/updates',
    '/about',
    '/contact',
    '/analytics',
    '/find-tests',
  ];

  // 1. Add Category/Profession landing routes
  CATEGORY_ROUTES.forEach(c => routes.push(c.path));

  // 2. Add Target Exam landing routes (/exam/exam-id)
  TARGET_EXAMS.forEach(exam => {
    routes.push(`/exam/${exam.id}`);
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
  const cleanPath = urlPath.toLowerCase().split('?')[0];
  if (cleanPath === "/" || cleanPath === "") return true;

  const validRoutes = getAllAppRoutes();
  if (validRoutes.includes(cleanPath)) return true;

  // Check alias routes
  if (cleanPath === "/find-test") return true;
  if (cleanPath.startsWith("/exams/")) {
    const slug = cleanPath.split("/")[2];
    if (slug && TARGET_EXAMS.some(e => e.id.toLowerCase() === slug.toLowerCase())) {
      return true;
    }
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
  if (cleanPath === "/pyq") {
    return {
      title: "Nursing & Paramedical Officer Solved Past Papers (PYQ) | NCBT.in",
      description: "Practice authentic solved previous year question papers for AIIMS NORCET, ESIC, RRB, and WBHRB recruitment exams with detailed professor rationales.",
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Quiz",
        "name": "Nursing Officer Past Year Question Papers (PYQ)",
        "description": "Authentic previous year question papers from central government nursing officer exams.",
        "educationalAlignment": {
          "@type": "AlignmentObject",
          "educationalFramework": "Nursing Recruitment Exams India",
          "targetName": "AIIMS NORCET, ESIC, RRB Staff Nurse"
        }
      })
    };
  }

  if (cleanPath === "/mock-tests") {
    return {
      title: "Full CBT Mock Test Series (NORCET & Govt Exam Pattern) | NCBT.in",
      description: "Attempt free full mock tests styled after India's central government nursing, pharmacist, and paramedical exams with timer countdowns and negative marking.",
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "NCBT Nursing Officer CBT Mock Exam Series",
        "description": "High-yield online simulated board examinations for nursing officers in India.",
        "provider": {
          "@type": "Organization",
          "name": "NCBT.in",
          "url": "https://ncbt.in"
        }
      })
    };
  }

  if (cleanPath === "/subject-mocks") {
    return {
      title: "Subject-Wise Nursing & Paramedical Mocks & Clinical Unit Drills | NCBT.in",
      description: "Target key exam areas: Medical-Surgical Nursing, Pharmacology, Pediatrics, Anatomy, and Pathology. Real-time feedback and rationales.",
    };
  }

  if (cleanPath === "/short-sprints") {
    return {
      title: "Rapid Practice Speed Sprints (10 MCQ Daily Checkpoints) | NCBT.in",
      description: "Daily randomized rapid speed nursing & paramedical assessment sprints. Fast clinical rationales to accelerate your active recall.",
    };
  }

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
  const cleanPath = urlPath.toLowerCase().split('?')[0];

  if (!isValidAppRoute(cleanPath)) {
    return `
      <div class="page active" style="max-width: 800px; margin: 0 auto; padding: 60px 24px; text-align: center; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <div style="font-size: 72px; font-weight: 900; color: #d97706; line-height: 1; margin-bottom: 16px;">404</div>
        <h1 style="font-size: 30px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0;">Page Not Found</h1>
        <p style="font-size: 16px; color: #64748b; margin: 0 auto 32px auto; max-width: 500px; line-height: 1.6;">The page or assessment route you requested does not exist, has been updated, or was moved on NCBT.in.</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/" style="background: #0f172a; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;">Return to Homepage</a>
          <a href="/mock-tests" style="background: #d97706; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;">Browse CBT Mocks</a>
        </div>
      </div>
    `;
  }

  // 1. Category / Profession Landing Pages
  const categoryMatch = CATEGORY_ROUTES.find(c => c.path === cleanPath);
  if (categoryMatch) {
    const categoryExams = TARGET_EXAMS.filter(e => e.category === categoryMatch.id);
    const categoryExamsList = categoryExams.length > 0 ? categoryExams : TARGET_EXAMS.slice(0, 4);

    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <div style="display: inline-block; background-color: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Healthcare Cadre Category</div>
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">${categoryMatch.name} Government Exam Preparation & CBT Mock Tests</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">Prepare for top ${categoryMatch.name} recruitment exams: ${categoryMatch.desc}. Practice free online simulated CBT mock tests, solved previous year papers, and high-yield subject questions.</p>
        </header>

        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Target Exams in ${categoryMatch.name}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${categoryExamsList.map(e => `
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 8px 0;"><a href="/exam/${e.id}" style="color: #2563eb; text-decoration: none;">${e.fullName || e.name}</a></h3>
                <p style="font-size: 13px; color: #64748b; margin: 0 0 16px 0;">${e.desc}</p>
                <a href="/exam/${e.id}" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">Explore Mock Series →</a>
              </div>
            `).join('')}
          </div>
        </section>

        <section style="background: #f1f5f9; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 40px;">
          <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 8px 0; color: #0f172a;">Ready to test your ${categoryMatch.name} clinical readiness?</h2>
          <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0;">Attempt free simulated computer based test papers on NCBT.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="/mock-tests" style="background: #059669; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Attempt Full Mocks</a>
            <a href="/pyq" style="background: #3b82f6; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Solve Past Year Papers (PYQ)</a>
          </div>
        </section>

        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Explore all categories on <a href="/" style="color: #2563eb;">NCBT.in Homepage</a> or view <a href="/updates" style="color: #2563eb;">NCBT Syllabus & Recruitment Blog</a>.</p>
        </footer>
      </div>
    `;
  }

  // 2. Target Exam Landing Pages (/exam/exam-id or /exams/exam-id)
  if (cleanPath.startsWith("/exam/") || cleanPath.startsWith("/exams/")) {
    const parts = cleanPath.split("/");
    const examSlug = parts[2] || "";
    const exam = TARGET_EXAMS.find(e => e.id.toLowerCase() === examSlug);
    const examName = exam ? (exam.fullName || exam.name) : examSlug.replace(/-/g, " ").toUpperCase();
    const examDesc = exam ? exam.desc : "Prepare for your government recruitment CBT exam with high-yield mock tests and PYQs.";

    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <div style="display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Exam Portal</div>
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">${examName} Online CBT Mock Tests, Syllabus & PYQ Practice</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">${examDesc}</p>
        </header>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Available Test Series for ${examName}</h2>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;">
            <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 16px; color: #0f172a; display: block;">${examName} Full Length Mock Test Series</strong>
                <span style="font-size: 13px; color: #64748b;">50 MCQs • Standard Exam Pattern & Negative Marking</span>
              </div>
              <a href="/mock-tests" style="background: #2563eb; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Start Mock →</a>
            </li>
            <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 16px; color: #0f172a; display: block;">${examName} Solved Previous Year Question Paper (PYQ)</strong>
                <span style="font-size: 13px; color: #64748b;">Authentic Past Paper Questions with Rationales</span>
              </div>
              <a href="/pyq" style="background: #059669; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Solve PYQs →</a>
            </li>
            <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 16px; color: #0f172a; display: block;">Subject-Wise Clinical Drills</strong>
                <span style="font-size: 13px; color: #64748b;">Anatomy, Med-Surg, Pharmacology & Specialty Mocks</span>
              </div>
              <a href="/subject-mocks" style="background: #4f46e5; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Practice Subjects →</a>
            </li>
          </ul>
        </section>

        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Return to <a href="/" style="color: #2563eb;">NCBT.in Homepage</a> or view <a href="/updates" style="color: #2563eb;">NCBT Exam Updates & Syllabus</a>.</p>
        </footer>
      </div>
    `;
  }

  // 3. Blog / Updates Article Pages (/updates/update-id)
  if (cleanPath.startsWith("/updates/")) {
    const parts = cleanPath.split("/");
    const updateId = parts[2];
    const foundUpdate = STATIC_NURSING_UPDATES.find(u => u.id.toLowerCase() === updateId);
    if (foundUpdate) {
      const ctaLink = foundUpdate.category === "jobs" ? "/mock-tests" :
                      foundUpdate.category === "syllabus" ? "/subject-mocks" : "/short-sprints";
      const ctaText = foundUpdate.category === "jobs" ? "Solve Full-Length CBT Mock Series" :
                      foundUpdate.category === "syllabus" ? "Practice Subject-Wise Mocks" : "Attempt Daily Speed Sprints";
      
      return `
        <div class="page active" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif; color: #111;">
          <header class="blog-header" style="border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
            <p style="color: #4f46e5; font-weight: bold; text-transform: uppercase; font-size: 12px; margin-bottom: 8px;">🏷️ ${foundUpdate.badge} • 📅 ${foundUpdate.date} • ⏱️ ${foundUpdate.readTime}</p>
            <h1 style="font-size: 28px; line-height: 1.2; font-weight: 800; margin-top: 0; margin-bottom: 12px; color: #111;">${foundUpdate.title}</h1>
            <p style="font-size: 16px; color: #555; line-height: 1.6; font-style: italic; margin: 0;">${foundUpdate.summary}</p>
          </header>
          
          <img src="${foundUpdate.image}" alt="${foundUpdate.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" referrerPolicy="no-referrer" />
          
          <article style="font-size: 15px; line-height: 1.8; color: #333;">
            ${foundUpdate.content.replace(/\n/g, '<br />')}
          </article>
          
          <div style="background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 24px; margin-top: 40px; text-align: center;">
            <h3 style="margin-top: 0; font-size: 18px; font-weight: 800; color: #1e1b4b;">⚡ PRACTICE THIS EXAM PATTERN</h3>
            <p style="font-size: 14px; color: #312e81; margin-bottom: 20px;">Prepare for central government nursing officer recruitments with India's best CBT simulation engine.</p>
            <a href="${ctaLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase;">${ctaText} →</a>
          </div>
          
          <footer style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; text-align: center;">
            <p style="font-size: 13px; color: #777;">Browse more <a href="/updates" style="color: #4f46e5;">Nursing Recruitment Updates & High-Yield notes</a> or practice full tests on <a href="/" style="color: #4f46e5;">NCBT.in</a></p>
          </footer>
        </div>
      `;
    }
  }

  // 4. Test Pages (/test/subject-id/test-id)
  if (cleanPath.startsWith("/test/")) {
    const parts = cleanPath.split("/");
    const subjId = parts[2];
    const testId = parts[3];

    let testTitle = "CBT Assessment";
    let testDesc = "Practice high-yield questions with active timers, negative markings, review flags, and detailed explanations.";
    let questionCount = 20;

    if (subjId === "virtual") {
      testTitle = testId ? testId.toUpperCase().replace(/-/g, " ") : "Virtual CBT Paper";
    } else {
      const subject = SUBJECTS.find(s => s.id === subjId);
      if (subject) {
        const test = subject.tests.find(t => t.id === testId);
        if (test) {
          testTitle = test.title;
          testDesc = test.desc;
          questionCount = test.questions || (test.data ? test.data.length : 20);
        }
      }
    }

    return `
      <div class="page active" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="display: inline-block; background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Active Test Engine</div>
          <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">${testTitle}</h1>
          <p style="font-size: 15px; color: #475569; margin: 0; line-height: 1.5;">${testDesc}</p>
        </header>

        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Test Parameters</h2>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.8;">
            <li>Total Questions: ${questionCount} MCQs</li>
            <li>Mode: Online CBT Simulation with Negative Marking (-0.25)</li>
            <li>Instant Rationales & AI Explanation Tutor</li>
          </ul>
        </div>

        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Return to <a href="/mock-tests" style="color: #2563eb;">All Mock Tests</a> or <a href="/" style="color: #2563eb;">NCBT.in Homepage</a>.</p>
        </footer>
      </div>
    `;
  }

  // 5. Core Static Pages
  if (cleanPath === "/pyq") {
    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Previous Year Solved Question Papers (PYQ) | NCBT</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">Solve official solved previous year question papers from AIIMS NORCET, ESIC, RRB, and central government nursing & paramedical recruitments with detailed clinical rationales.</p>
        </header>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Available Simulated Past Papers</h2>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;">
            ${PYQ_DATA.map(p => `
              <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="font-size: 16px; color: #0f172a; display: block;">${p.year} ${p.exam} Past Paper</strong>
                  <span style="font-size: 13px; color: #64748b;">${p.count || 20} High-Yield Questions • Authentic Exam Pattern</span>
                </div>
                <a href="/test/virtual/pyq-${p.tag}-${p.year}" style="background: #2563eb; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Solve Paper →</a>
              </li>
            `).join('')}
          </ul>
        </section>
        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Back to <a href="/" style="color: #2563eb;">NCBT Homepage</a> for full simulated test series.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/mock-tests") {
    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Full CBT Healthcare Officer Mock Test Series | NCBT</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">Replicate actual computer-based tests with negative markings, countdown timers, and in-depth performance analysis reports matching Indian healthcare recruitment vacancy exams.</p>
        </header>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Simulated Full-Length CBT Mocks</h2>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;">
            <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 16px; color: #0f172a; display: block;">Full Mock Series Test 1</strong>
                <span style="font-size: 13px; color: #64748b;">50 MCQs • 50 Mins • Standard NORCET & Govt Pattern</span>
              </div>
              <a href="/test/mock_tests/mock_1" style="background: #2563eb; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Start Test →</a>
            </li>
            <li style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 16px; color: #0f172a; display: block;">Full Mock Series Test 2</strong>
                <span style="font-size: 13px; color: #64748b;">50 MCQs • 50 Mins • Medical Surgical & Pharmacology Focus</span>
              </div>
              <a href="/test/mock_tests/mock_2" style="background: #2563eb; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700;">Start Test →</a>
            </li>
          </ul>
        </section>
        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Back to <a href="/" style="color: #2563eb;">NCBT Homepage</a> for other test modalities.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/subject-mocks") {
    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Subject-Wise Mocks & Unit Diagnostics | NCBT</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">Target specific clinical domains to clear your fundamentals. Take specialized unit-level mock assessments.</p>
        </header>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Core Healthcare Specialties</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${SUBJECTS.map(s => `
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                <h3 style="font-size: 18px; font-weight: 700; margin: 0 0 8px 0; color: #0f172a;">${s.icon} ${s.name}</h3>
                <p style="font-size: 13px; color: #64748b; margin: 0 0 16px 0;">${s.tests ? s.tests.length : 0} Practice Modules Available</p>
                ${s.tests && s.tests.length > 0 ? `<a href="/test/${s.id}/${s.tests[0].id}" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">Start Unit Drill →</a>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Back to <a href="/" style="color: #2563eb;">NCBT Homepage</a> for complete coverage details.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/updates") {
    return `
      <div class="page active" style="max-width: 1000px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, sans-serif; color: #1e293b;">
        <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Healthcare Recruitment Vacancies, Job Alerts & Syllabus Updates</h1>
          <p style="font-size: 16px; color: #475569; margin: 0; line-height: 1.6;">Stay informed about Indian central government healthcare vacancies including AIIMS NORCET, ESIC, JIPMER, and RRB recruitment campaigns.</p>
        </header>
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Latest Notifications & Notes</h2>
          <div style="display: grid; gap: 20px;">
            ${STATIC_NURSING_UPDATES.map(u => `
              <article style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                <p style="color: #2563eb; font-weight: 700; font-size: 12px; text-transform: uppercase; margin: 0 0 8px 0;">${u.badge} • ${u.date}</p>
                <h3 style="font-size: 20px; font-weight: 700; margin: 0 0 8px 0;"><a href="/updates/${u.id}" style="color: #0f172a; text-decoration: none;">${u.title}</a></h3>
                <p style="font-size: 14px; color: #475569; margin: 0 0 16px 0; line-height: 1.5;">${u.summary}</p>
                <a href="/updates/${u.id}" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">Read Article →</a>
              </article>
            `).join('')}
          </div>
        </section>
        <footer style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 13px; color: #64748b;">
          <p>Access computer-based training mock exams on <a href="/" style="color: #2563eb;">NCBT.in</a></p>
        </footer>
      </div>
    `;
  }

  // DEFAULT (LANDING PAGE "/")
  return `
    <div class="hero">
      <div class="hero-eyebrow">National CBT | NCBT</div>
      <h1>India's Trusted Platform for Nursing, Pharmacist & Paramedical Government Exam Preparation</h1>
      <p class="hero-sub">Practice with high-quality Mock Tests, Previous Year Questions (PYQs), Exam-wise Practice Sets and Detailed Performance Analysis for top Nursing, Pharmacist and Paramedical Government Recruitment Exams.</p>
      <div class="hero-ctas">
        <a href="/mock-tests" class="btn-hero-primary">Start Practising Free</a>
      </div>
    </div>
    <div class="exam-section pb-4">
      <div class="section-eyebrow">WHY NCBT.IN</div>
      <h2>Built different. On purpose.</h2>
      <p>NCBT provides clean, focused, high-yield computer-based test simulations designed specifically for Nursing, Pharmacist, and Paramedical government recruitment exams in India.</p>
    </div>
    <div class="exam-section pt-4">
      <div class="section-eyebrow">Categories</div>
      <h2>Healthcare Cadres Covered</h2>
      <div class="exam-bands mt-6">
        <a href="/nursing">Nursing Officer (NORCET, ESIC, WBHRB)</a>
        <a href="/pharmacist">Pharmacist (RRB, ESIC)</a>
        <a href="/paramedical">Paramedical Staff</a>
        <a href="/lab-tech">Lab Technician</a>
        <a href="/radiographer">Radiographer</a>
        <a href="/medical-officer">Medical Officer</a>
      </div>
    </div>
    <footer>
      NCBT · National CBT · India's Trusted Platform for Nursing, Pharmacist & Paramedical Govt Exams
    </footer>
  `;
}
