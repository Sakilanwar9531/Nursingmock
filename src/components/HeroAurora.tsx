export default function HeroAurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.28]"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="aurora-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <linearGradient id="aurora-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <filter id="aurora-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="45" />
          </filter>
        </defs>

        <path
          d="M -100 120 Q 200 20, 400 140 T 900 100"
          stroke="url(#aurora-a)"
          strokeWidth="90"
          fill="none"
          filter="url(#aurora-blur)"
          className="aurora-ribbon-1"
        />
        <path
          d="M -100 320 Q 250 420, 450 300 T 900 340"
          stroke="url(#aurora-b)"
          strokeWidth="70"
          fill="none"
          filter="url(#aurora-blur)"
          className="aurora-ribbon-2"
        />
        <circle cx="640" cy="90" r="3" fill="var(--accent)" className="aurora-dot d1" />
        <circle cx="120" cy="260" r="2.5" fill="var(--primary)" className="aurora-dot d2" />
        <circle cx="500" cy="380" r="2" fill="var(--accent)" className="aurora-dot d3" />
      </svg>

      <style>{`
        .aurora-ribbon-1 {
          animation: aurora-drift-1 18s ease-in-out infinite alternate;
        }
        .aurora-ribbon-2 {
          animation: aurora-drift-2 22s ease-in-out infinite alternate;
        }
        @keyframes aurora-drift-1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.06); }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-25px, 15px) scale(1.04); }
        }
        .aurora-dot { animation: aurora-twinkle 3.5s ease-in-out infinite; }
        .d2 { animation-delay: 1.1s; }
        .d3 { animation-delay: 2s; }
        @keyframes aurora-twinkle {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-ribbon-1, .aurora-ribbon-2, .aurora-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
