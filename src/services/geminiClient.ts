/// <reference types="vite/client" />
// Client-side Gemini API Service for Pure Static Web Hosting (Hostinger)
// Connects directly to Google Generative Language APIs without requiring a backend server.

import { safeLocalStorage } from "./safeStorage";

export function getClientGeminiKey(): string {
  // 1. Try env variable VITE_GEMINI_API_KEY
  let key = import.meta.env.VITE_GEMINI_API_KEY;
  // 2. Fallback to localStorage configured by user in UI
  if (!key || key === "MY_GEMINI_API_KEY") {
    key = safeLocalStorage.getItem("np_gemini_api_key") || "";
  }
  return key;
}

export function isGeminiClientConfigured(): boolean {
  const key = getClientGeminiKey();
  return !!key && key.trim().length > 10;
}

export function saveClientGeminiKey(key: string) {
  if (key && key.trim().length > 10) {
    safeLocalStorage.setItem("np_gemini_api_key", key.trim());
    return true;
  }
  return false;
}

export function clearClientGeminiKey() {
  safeLocalStorage.removeItem("np_gemini_api_key");
}

/**
 * Executes a direct client-side call to Google Gemini 2.5 Flash API
 */
export async function generateContentDirect(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = getClientGeminiKey();
  if (!apiKey) {
    throw new Error("No Gemini API key available on the client.");
  }

  // We use gemini-1.5-flash as it is extremely stable and supports direct public keys
  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload: any = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500
    }
  };

  // Add system instruction if supported/provided
  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [
        { text: systemInstruction }
      ]
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error details:", errorText);
    throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error("Invalid or empty response structure from Gemini API.");
  }

  return text;
}
