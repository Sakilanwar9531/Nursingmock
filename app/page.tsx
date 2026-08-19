"use client";

import dynamic from "next/dynamic";

// Loads your App safely in the browser without server-side localStorage errors
const App = dynamic(() => import("@/src/App"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-300">Loading NCBT...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return <App />;
}
