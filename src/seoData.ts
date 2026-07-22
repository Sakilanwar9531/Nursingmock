import { STATIC_NURSING_UPDATES } from "./updatesData";

export interface SeoMeta {
  title: string;
  description: string;
  jsonLd?: string;
}

export function getSeoMetadata(urlPath: string): SeoMeta {
  const cleanPath = urlPath.toLowerCase().split('?')[0];

  if (cleanPath === "/pyq") {
    return {
      title: "Nursing Officer Solved Past Papers & PYQs | NCBT.in Exam Prep",
      description: "Practice actual computer-based test solved past papers for AIIMS NORCET, ESIC, and RRB recruitment exams. Free real-time dashboard analytics and national percentile rank.",
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
      title: "Board-Level Nursing CBT Full Mock Series (NORCET Pattern) | NCBT.in",
      description: "Attempt free full mock tests styled after India's central government nursing exams. Track subject-wise clinical accuracy and speed progress metrics.",
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
      title: "Subject-Wise Nursing Unit Mocks & Clinical Diagnostic Tests | NCBT.in",
      description: "Target key exam areas: Medical-Surgical Nursing, Pharmacology, Pediatrics, Psychiatry, and Anatomy. Real-time feedback and rationales.",
    };
  }

  if (cleanPath === "/short-sprints") {
    return {
      title: "Rapid Practice Speed Sprints (10 MCQ Daily Checkpoints) | NCBT.in",
      description: "Daily randomized rapid speed nursing assessment sprints. Fast clinical rationales to accelerate your active recall.",
    };
  }

  if (cleanPath === "/updates") {
    return {
      title: "Nursing Jobs Recruitment, Vacancy Updates & Syllabus Alerts | NCBT.in",
      description: "Never miss an exam notice. Live notifications of vacancies from AIIMS, ESIC, RRB, JIPMER, and central/state government nursing directorates.",
    };
  }

  if (cleanPath.startsWith("/updates/")) {
    const parts = cleanPath.split("/");
    const updateId = parts[2];
    const foundUpdate = STATIC_NURSING_UPDATES.find(u => u.id.toLowerCase() === updateId);
    if (foundUpdate) {
      return {
        title: `${foundUpdate.title} | Nursing Officer Guide & Mock Tests | NCBT.in`,
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

  if (cleanPath === "/analytics") {
    return {
      title: "Nursing CBT Progress Analytics Dashboard | NCBT.in Exam Tracker",
      description: "Analyse your nursing preparation with personalized diagnostic reporting of strengths, streak multipliers, and exam time-management stats.",
    };
  }

  if (cleanPath === "/about") {
    return {
      title: "About Us | NCBT.in – National Computer Based Test Platform",
      description: "Learn about NCBT.in, our mission to democratize quality computer-based test prep for Indian Nursing, Pharmacist, and Paramedical government aspirants.",
    };
  }

  if (cleanPath === "/contact") {
    return {
      title: "Contact Us & Academic Helpdesk | NCBT.in",
      description: "Reach out to the NCBT academic support team for help with mock tests, question rationales, or exam syllabus notifications.",
    };
  }

  if (cleanPath === "/find-test") {
    return {
      title: "Search Mock Tests & Exam Series | NCBT.in",
      description: "Search and filter through all Nursing, Pharmacist, and Paramedical mock tests, PYQs, and subject-wise CBT series.",
    };
  }

  if (cleanPath.startsWith("/exam/")) {
    const examSlug = cleanPath.split("/")[2] || "";
    const examName = examSlug.replace(/-/g, " ").toUpperCase();
    return {
      title: `${examName} Mock Tests, Syllabus & PYQ Prep Series | NCBT.in`,
      description: `Prepare for ${examName} with free full-length CBT mock tests, solved past year question papers, subject-wise practice, and live rank analytics on NCBT.in`,
    };
  }

  if (cleanPath.startsWith("/test/")) {
    const parts = cleanPath.split("/");
    const testId = parts[3] ? parts[3].toUpperCase().replace(/-/g, " ") : "CBT";
    return {
      title: `Attend CBT Test: ${testId} Assessment | NCBT.in`,
      description: "Answer high-yield nursing multiple choice questions with active timers, negative markings, review flags, and detailed explanations.",
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
              "text": "Yes, our CBT exam mode accurately replicates the standard negative marking penalties (e.g. 0.25) for incorrect selections, giving you a true assessment of your test-taking skills."
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

  if (cleanPath === "/pyq") {
    return `
      <div class="page active">
        <header class="hub-header">
          <h1>Previous Year Solved Question Papers (PYQ) | NCBT</h1>
          <p>Solve official solved previous year question papers from AIIMS NORCET, ESIC, RRB, and central government nursing recruitments with detailed clinical rationales.</p>
        </header>
        <section class="tests-list">
          <h2>Available Simulated Past Papers</h2>
          <ul>
            <li><a href="/test/mock_tests/norcet_pyq_1">AIIMS NORCET Past Year CBT Paper</a></li>
            <li><a href="/test/mock_tests/esic_pyq_1">ESIC Nursing Officer Solved Exam</a></li>
            <li><a href="/test/mock_tests/rrb_pyq_1">RRB Staff Nurse Past Paper Series</a></li>
          </ul>
        </section>
        <footer>
          <p>Back to <a href="/">NCBT Homepage</a> for full simulated test series.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/mock-tests") {
    return `
      <div class="page active">
        <header class="hub-header">
          <h1>Full CBT Nursing Officer Mock Test Series | NCBT</h1>
          <p>Replicate actual computer-based tests with negative markings, countdown timers, and in-depth performance analysis reports matching Indian Staff Nurse vacancy exams.</p>
        </header>
        <section class="tests-list">
          <h2>Free simulated full-length CBT mocks</h2>
          <ul>
            <li><a href="/test/mock_tests/mock_1">Full Mock Series Test 1 (50 MCQs)</a></li>
            <li><a href="/test/mock_tests/mock_2">Full Mock Series Test 2 (50 MCQs)</a></li>
            <li><a href="/test/mock_tests/mock_3">Full Mock Series Test 3 (50 MCQs)</a></li>
          </ul>
        </section>
        <footer>
          <p>Back to <a href="/">NCBT Homepage</a> for other test modalities.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/subject-mocks") {
    return `
      <div class="page active">
        <header class="hub-header">
          <h1>Subject-Wise Nursing Mocks & Unit Diagnostics | NCBT</h1>
          <p>Target specific clinical domains to clear your fundamentals. Take specialized unit-level mock assessments.</p>
        </header>
        <section class="tests-list">
          <h2>Nursing Specialties covered</h2>
          <ul>
            <li><a href="/test/anatomy/cell_tissue">Anatomy & Physiology: Cell and Tissues</a></li>
            <li><a href="/test/med-surg/cardio">Medical-Surgical Nursing: Cardiovascular System</a></li>
            <li><a href="/test/med-surg/renal">Medical-Surgical Nursing: Renal System</a></li>
          </ul>
        </section>
        <footer>
          <p>Back to <a href="/">NCBT Homepage</a> for complete coverage details.</p>
        </footer>
      </div>
    `;
  }

  if (cleanPath === "/short-sprints") {
    return `
      <div class="page active">
        <header class="hub-header">
          <h1>Rapid Speed Practice Sprints (10 MCQ Checkpoints) | NCBT</h1>
          <p>Time-crunched? Solve dynamic randomly selected clinical questions with instant answer explanations.</p>
        </header>
        <section class="tests-list">
          <h2>Solve micro mock tests</h2>
          <p>Use active recall checkpoints to accelerate your study routine.</p>
          <p><a href="/mock-tests">Go to Full Mocks</a> or <a href="/pyq">Previous Year Papers</a>.</p>
        </section>
      </div>
    `;
  }

  if (cleanPath === "/updates") {
    return `
      <div class="page active">
        <header class="hub-header">
          <h1>Nursing Recruitment Vacancies, Job Alerts & Syllabus Updates</h1>
          <p>Stay informed about Indian central government nursing vacancies including AIIMS NORCET, ESIC, JIPMER, and RRB recruitment campaigns.</p>
        </header>
        <section class="updates-list">
          <h2>Latest Recruiting Notifications</h2>
          <article>
            <h3>AIIMS NORCET Nursing Officer Vacancy</h3>
            <p>Annual central government recruitment campaign notification details, eligibility criteria, and syllabus pattern.</p>
          </article>
          <article>
            <h3>ESIC & RRB Staff Nurse Announcements</h3>
            <p>Regular recruitment opportunities and high-yield study resources.</p>
          </article>
        </section>
        <footer>
          <p>Access computer-based training mock exams on <a href="/">NCBT.in</a></p>
        </footer>
      </div>
    `;
  }

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
        <div class="page active" style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; color: #111;">
          <header class="blog-header" style="border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
            <p style="color: #6366f1; font-weight: bold; text-transform: uppercase; font-size: 12px; margin-bottom: 8px;">🏷️ ${foundUpdate.badge} • 📅 ${foundUpdate.date} • ⏱️ ${foundUpdate.readTime}</p>
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

  // DEFAULT (LANDING PAGE "/")
  return `
    <div class="hero">
      <div class="hero-eyebrow">National CBT | NCBT</div>
      <h1>India's Trusted Platform for Nursing, Pharmacist & Paramedical Government Exam Preparation</h1>
      <p class="hero-sub">Practice with high-quality Mock Tests, Previous Year Questions (PYQs), Exam-wise Practice Sets and Detailed Performance Analysis for top Nursing, Pharmacist and Paramedical Government Recruitment Exams.</p>
      <div class="hero-ctas">
        <a href="/mock-tests" class="btn-hero-primary">Start Practising Free</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-val">150+ Questions</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val">6 Tests Ready</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-val">8+ Subjects</div>
        </div>
      </div>
    </div>
    <div class="exam-section pb-4">
      <div class="section-eyebrow">WHY NCBT.IN</div>
      <h2>Built different. On purpose.</h2>
      <p>NCBT provides clean, focused, high-yield computer-based test simulations designed specifically for Nursing, Pharmacist, and Paramedical government recruitment exams in India.</p>
    </div>
    <div class="cta-banner">
      <h2>Ready to ace your exam?</h2>
      <p>Join thousands of government exam aspirants preparing smarter, not harder.</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <a href="/mock-tests" class="btn-hero-primary">Browse Tests</a>
      </div>
    </div>
    <div class="exam-section pt-4">
      <div class="section-eyebrow">Coverage</div>
      <h2>Every major exam. One platform.</h2>
      <div class="exam-bands mt-6">
        <span>AIIMS NORCET</span>
        <span>WBHRB Staff Nurse</span>
        <span>Pharmacist Govt Recruitment</span>
        <span>Paramedical Staff Exams</span>
        <span>RRB Railway Staff Nurse</span>
        <span>ESIC Nursing Officer</span>
        <span>DSSSB Staff Nurse</span>
        <span>CHO NHM Recruitment</span>
        <span>State PSC Exams</span>
      </div>
    </div>
    <footer>
      NCBT · National CBT · India's Trusted Platform for Nursing, Pharmacist & Paramedical Govt Exams
    </footer>
  `;
}
