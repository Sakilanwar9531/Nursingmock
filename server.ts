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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
        
        // 1. Replace Title
        html = html.replace(
          /<title>.*?<\/title>/i,
          `<title>${meta.title}</title>`
        );
        
        // 2. Inject optimal meta tags & structured data JSON-LD inside the head
        const headTags = [
          `<meta name="description" content="${meta.description}" />`,
          `<meta property="og:title" content="${meta.title}" />`,
          `<meta property="og:description" content="${meta.description}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="NCBT.in" />`,
          `<meta name="twitter:card" content="summary" />`,
          `<meta name="twitter:title" content="${meta.title}" />`,
          `<meta name="twitter:description" content="${meta.description}" />`
        ];
        
        if (meta.jsonLd) {
          headTags.push(`<script type="application/ld+json">${meta.jsonLd}</script>`);
        }
        
        const tagsString = headTags.join('\n    ');
        
        // Replace </head> to inject tags right before it closes
        html = html.replace('</head>', `  ${tagsString}\n  </head>`);
        
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
