import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { STATIC_NURSING_UPDATES } from "./src/updatesData";
import { GoogleGenAI } from "@google/genai";

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
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
