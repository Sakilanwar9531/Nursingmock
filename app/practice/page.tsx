"use client";

import dynamic from "next/dynamic";

// Loads your interactive CBT testing engine in the browser
const App = dynamic(() => import("@/src/App"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-300">
          Entering NCBT Online Exam Hall...
        </p>
      </div>
    </div>
  ),
});

export default function PracticePage() {
  return <App />;
}
