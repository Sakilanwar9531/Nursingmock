import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { STATIC_NURSING_UPDATES } from "./src/updatesData";
import { GoogleGenAI } from "@google/genai";

interface SeoMeta {
  title: string;
  description: string;
  jsonLd?: string;
}

function getSeoMetadata(urlPath: string): SeoMeta {
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
    title: "NCBT - India's Nursing CBT Exam Preparation Platform | AIIMS NORCET, ESIC, RRB Mocks",
    description: "Prepare smarter for central government Staff Nurse & Nursing Officer exams. Real-time simulated CBT portal featuring top rationales, PYQs, and daily pulse.",
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
              "text": "NCBT provides computer-based testing (CBT) preparation for all major Indian nurse officer exams including AIIMS NORCET, ESIC, RRB Staff Nurse, DSSSB, JIPMER, CHO, and state PSC exams."
            }
          },
          {
            "@type": "Question",
            "name": "Is there negative marking in NCBT simulated tests?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our CBT exam mode accurately replicates the standard 0.25 negative marking penalty for incorrect selections, giving you a true assessment of your test-taking skills."
            }
          },
          {
            "@type": "Question",
            "name": "Are clinical explanations and rationales provided?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, every question on NCBT features comprehensive expert-curated clinical rationales, enhanced by our Gemini AI tutor for real-time clarification."
            }
          }
        ]
      }
    ])
  };
}

function getPreRenderedContent(urlPath: string): string {
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
          
          <img src="${foundUpdate.image}" alt="${foundUpdate.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />
          
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
      <div class="hero-eyebrow">NCBT | Nursing CBT Exam Preparation</div>
      <h1>Stop Cramming. Start Understanding.</h1>
      <p class="hero-sub">Subject-wise MCQs from real exams — AIIMS, RRB, ESIC, DSSSB, RPSC — with instant organized rationale, and zero distractions.</p>
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
      <p>NCBT provides clean, focused, high-yield computer-based test simulations designed specifically for central government Staff Nurse and Nursing Officer exams in India.</p>
    </div>
    <div class="cta-banner">
      <h2>Ready to ace your exam?</h2>
      <p>Join thousands of nursing students preparing smarter, not harder.</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <a href="/mock-tests" class="btn-hero-primary">Browse Tests</a>
      </div>
    </div>
    <div class="exam-section pt-4">
      <div class="section-eyebrow">Coverage</div>
      <h2>Every major exam. One platform.</h2>
      <div class="exam-bands mt-6">
        <span>AIIMS Nursing Officer</span>
        <span>RRB Staff Nurse</span>
        <span>ESIC Staff Nurse</span>
        <span>DSSSB Staff Nurse</span>
        <span>RPSC Staff Nurse</span>
        <span>JIPMER</span>
        <span>BHU Nursing Officer</span>
        <span>RUHS Nursing Entrance</span>
        <span>BSF Staff Nurse</span>
        <span>IGNOU Post B.Sc Nursing</span>
        <span>State PSC Nursing</span>
        <span>CHO Recruitment</span>
      </div>
    </div>
    <footer>
      NCBT · India's Nursing CBT Exam Preparation Platform · 
      <a href="/subject-mocks">Tests</a> · 
      <a href="/pyq">PYQ</a> · 
      <a href="/analytics">Analytics</a> · For educational use only
    </footer>
  `;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SEO Optimization: Redirect www.ncbt.in to ncbt.in (WWW Canonicalization)
  app.use((req, res, next) => {
    const host = req.get('host');
    if (host && host.startsWith('www.')) {
      const newHost = host.slice(4);
      return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
    }
    next();
  });

  // SEO Optimization: robots.txt Endpoint
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth

Sitemap: https://ncbt.in/sitemap.xml`);
  });

  // SEO Optimization: Google Site Verification HTML Dynamic Route
  // This automatically serves correct content for ANY google verification file (e.g., googleff29df342e48cf28.html)
  app.get('/google:id.html', (req, res) => {
    const id = req.params.id;
    res.type('text/html');
    res.send(`google-site-verification: google${id}.html`);
  });

  // SEO Optimization: sitemap.xml Endpoint
  app.get('/sitemap.xml', (req, res) => {
    const updatesUrls = STATIC_NURSING_UPDATES.map(u => `  <url>
    <loc>https://ncbt.in/updates/${u.id}</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");

    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ncbt.in/</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ncbt.in/pyq</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ncbt.in/mock-tests</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ncbt.in/subject-mocks</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ncbt.in/short-sprints</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ncbt.in/updates</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
${updatesUrls}
  <url>
    <loc>https://ncbt.in/analytics</loc>
    <lastmod>2026-07-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`);
  });

  // 1. API route: Get updates dynamically
  app.get("/api/updates", (req, res) => {
    res.json(STATIC_NURSING_UPDATES);
  });

  // 2. API route: Generate AI explanation
  app.post("/api/explain", async (req, res) => {
    const { q, correctAnswer, explain } = req.body;
    if (!q || !correctAnswer) {
      return res.status(400).json({ error: "Missing required fields 'q' and 'correctAnswer'." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert Nursing Educator tutor. Explain this nursing multiple choice question (MCQ) in depth for preparation of Central Government Nursing Officer exams (like AIIMS NORCET, ESIC, RRB, and NCBT in India).

QUESTION: ${q}
CORRECT ANSWER: ${correctAnswer}
PROVIDED EXPLANATION/CONCEPT: ${explain || ""}

Provide a comprehensive, highly-structured, professional, and visually engaging breakdown:
1. 🔑 **MASTER CONCEPT (DEPTH)**: Explain the core physiological, pharmacological, or clinical principle in detail.
2. 📖 **WHY THIS ANSWER IS CORRECT**: Detail why the correct option is selected, linking it back to nursing protocols (e.g., INC guidelines, AIIMS NORCET standards, Brunner & Suddarth).
3. 💡 **CLINICAL MNEMONIC/KEY TAKEAWAY**: A short, high-yield mnemonic or memory rule (e.g., ABC priority, ADPIE, etc.) to remember this forever.
4. ⚠️ **EXAM TRAP / COMMON MISTAKE**: Warn the student about common misinterpretations or distractors in this question.

Keep the response structured with clear headers, using bolding, bullet points, and clean spacing. Do not include introductory or concluding conversational chit-chat, just provide the structured explanation directly.`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.3,
        }
      });

      const responseText = aiResponse.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini.");
      }

      res.json({ text: responseText });
    } catch (err: any) {
      console.warn("Fallback active. /api/explain error details:", err.message || err);
      
      // Fallback response so the user still gets a quality explanation offline if the API key is not configured or fails
      const fallbackConcept = explain || "Important physiological, pharmacological or clinical principle tested in central nursing officer exams.";
      const reasoning = `The selected answer '${correctAnswer}' aligns perfectly with established medical-surgical nursing protocols, INC guidelines, and AIIMS NORCET standards.`;
      const rememberMnemonic = "ABC Priority Rule: Always prioritize Airway, Breathing, and Circulation (safety parameters) before secondary diagnostic inquiries or procedural preparation.";
      const mistake = "Confusing clinical priorities (e.g., getting distracted by stable lab values instead of addressing acute changes in patient status)";
      
      const fallbackText = `🔑 MASTER CONCEPT (DEPTH)\n${fallbackConcept}\n\n📖 WHY THIS ANSWER\n${reasoning}\n\n💡 CLINICAL MNEMONIC\n${rememberMnemonic}\n\n⚠️ EXAM TRAP\n${mistake}\n\n*(Server is running in high-yield local fallback mode)*`;
      
      res.json({ text: fallbackText });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      try {
        const indexPath = path.join(distPath, 'index.html');
        let html = fs.readFileSync(indexPath, 'utf8');
        
        const meta = getSeoMetadata(req.path);
        const cleanPath = req.path.split('?')[0];
        
        // 1. Replace Title
        html = html.replace(
          /<title>.*?<\/title>/i,
          `<title>${meta.title}</title>`
        );
        
        // 2. Inject optimal meta tags, canonical link, & structured data JSON-LD inside the head
        const headTags = [
          `<meta name="description" content="${meta.description}" />`,
          `<link rel="canonical" href="https://ncbt.in${cleanPath}" />`,
          `<meta property="og:title" content="${meta.title}" />`,
          `<meta property="og:description" content="${meta.description}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="NCBT.in" />`,
          `<meta name="twitter:card" content="summary" />`,
          `<meta name="twitter:title" content="${meta.title}" />`,
          `<meta name="twitter:description" content="${meta.description}" />`
        ];

        if (process.env.GOOGLE_SITE_VERIFICATION) {
          headTags.push(`<meta name="google-site-verification" content="${process.env.GOOGLE_SITE_VERIFICATION}" />`);
        }
        
        if (meta.jsonLd) {
          headTags.push(`<script type="application/ld+json">${meta.jsonLd}</script>`);
        }
        
        const tagsString = headTags.join('\n    ');
        
        // Replace </head> to inject tags right before it closes
        html = html.replace('</head>', `  ${tagsString}\n  </head>`);
        
        // 3. Inject pre-rendered static content inside #root for static search engine bots (like Rank Math, Googlebot)
        const preRendered = getPreRenderedContent(req.path);
        html = html.replace('<div id="root"></div>', `<div id="root">${preRendered}</div>`);
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      } catch (err) {
        console.error("Error serving dynamic index.html:", err);
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
