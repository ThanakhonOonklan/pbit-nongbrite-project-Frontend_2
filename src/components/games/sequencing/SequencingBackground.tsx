import React from "react";

/**
 * SequencingBackground — Cosmic Magic purple animated background
 * Layers:
 *   1. Deep purple gradient sky
 *   2. Twinkling stars (~50 stars, CSS animation)
 *   3. Floating nebula clouds (SVG + CSS translate animation)
 *   4. Silhouette mountains/castle spires at the bottom
 *   5. Shooting stars (occasional diagonal streaks)
 */
export function SequencingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* ═══ LAYER 1: Deep Purple Gradient Sky ═══ */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cosmic-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B0620" />
            <stop offset="25%" stopColor="#130D2E" />
            <stop offset="50%" stopColor="#1A0938" />
            <stop offset="75%" stopColor="#1E1145" />
            <stop offset="100%" stopColor="#241350" />
          </linearGradient>

          {/* Radial glow behind the moon area */}
          <radialGradient id="moon-glow" cx="80%" cy="12%" r="25%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          {/* Nebula glow center-left */}
          <radialGradient id="nebula-glow-1" cx="25%" cy="35%" r="30%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          {/* Nebula glow center-right */}
          <radialGradient id="nebula-glow-2" cx="70%" cy="55%" r="25%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </radialGradient>

          {/* Pine Tree Silhouette */}
          <g id="pine-sil">
            <path d="M 50 0 L 32 45 L 42 45 L 20 95 L 32 95 L 5 150 L 95 150 L 68 95 L 80 95 L 58 45 L 68 45 Z" />
          </g>
        </defs>

        <rect width="100%" height="100%" fill="url(#cosmic-sky)" />
        <rect width="100%" height="100%" fill="url(#moon-glow)" />
        <rect width="100%" height="100%" fill="url(#nebula-glow-1)" />
        <rect width="100%" height="100%" fill="url(#nebula-glow-2)" />
      </svg>

      {/* ═══ LAYER 2: Moon ═══ */}
      <svg
        className="absolute top-[6%] right-[12%] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="moon-surface" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="70%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </radialGradient>
          <filter id="moon-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* Moon glow */}
        <circle cx="60" cy="60" r="55" fill="#C084FC" opacity="0.15" filter="url(#moon-blur)" />
        <circle cx="60" cy="60" r="45" fill="#C084FC" opacity="0.1" filter="url(#moon-blur)" />
        {/* Moon body */}
        <circle cx="60" cy="60" r="32" fill="url(#moon-surface)" />
        {/* Craters */}
        <circle cx="50" cy="52" r="4" fill="#DDD6FE" opacity="0.5" />
        <circle cx="68" cy="58" r="3" fill="#DDD6FE" opacity="0.4" />
        <circle cx="55" cy="70" r="2.5" fill="#DDD6FE" opacity="0.35" />
        <circle cx="72" cy="48" r="2" fill="#DDD6FE" opacity="0.3" />
      </svg>

      {/* ═══ LAYER 3: Twinkling Stars ═══ */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Stars are rendered via CSS-only approach with small dots */}
        {Array.from({ length: 55 }).map((_, i) => {
          const size = 1 + Math.random() * 2.5;
          const top = Math.random() * 75; // keep stars in upper 75%
          const left = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 2 + Math.random() * 3;
          const opacity = 0.3 + Math.random() * 0.7;

          return (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                backgroundColor: i % 5 === 0 ? "#E9D5FF" : i % 3 === 0 ? "#C4B5FD" : "#FFFFFF",
                opacity,
                animation: `cosmic-twinkle ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* ═══ LAYER 4: Shooting Stars ═══ */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute"
          style={{
            top: "15%",
            left: "60%",
            width: "80px",
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, #E9D5FF, transparent)",
            transform: "rotate(-35deg)",
            animation: "cosmic-shoot 8s ease-in 2s infinite",
            opacity: 0,
          }}
        />
        <div
          className="absolute"
          style={{
            top: "25%",
            left: "30%",
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C4B5FD, transparent)",
            transform: "rotate(-40deg)",
            animation: "cosmic-shoot 12s ease-in 6s infinite",
            opacity: 0,
          }}
        />
        <div
          className="absolute"
          style={{
            top: "8%",
            left: "75%",
            width: "50px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #F5F3FF, transparent)",
            transform: "rotate(-30deg)",
            animation: "cosmic-shoot 15s ease-in 10s infinite",
            opacity: 0,
          }}
        />
      </div>

      {/* ═══ LAYER 5: Floating Nebula Clouds ═══ */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="nebula-blur">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>
        {/* Cloud 1 — drifts right slowly */}
        <ellipse cx="300" cy="250" rx="200" ry="80" fill="#7C3AED" opacity="0.12" filter="url(#nebula-blur)">
          <animateTransform attributeName="transform" type="translate" values="0,0; 100,10; 0,0" dur="30s" repeatCount="indefinite" />
        </ellipse>
        {/* Cloud 2 — drifts left */}
        <ellipse cx="1000" cy="350" rx="250" ry="100" fill="#A855F7" opacity="0.08" filter="url(#nebula-blur)">
          <animateTransform attributeName="transform" type="translate" values="0,0; -120,15; 0,0" dur="35s" repeatCount="indefinite" />
        </ellipse>
        {/* Cloud 3 — subtle top */}
        <ellipse cx="700" cy="150" rx="180" ry="60" fill="#C084FC" opacity="0.06" filter="url(#nebula-blur)">
          <animateTransform attributeName="transform" type="translate" values="0,0; 80,-10; 0,0" dur="25s" repeatCount="indefinite" />
        </ellipse>
      </svg>

      {/* ═══ LAYER 6: Silhouette Mountains & Castle Spires ═══ */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[35%]"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Mountain Layer 1 (farthest — lightest purple) */}
        <path
          d="M 0,200 Q 100,120 200,160 T 400,100 T 600,150 T 800,80 T 1000,130 T 1200,90 T 1440,140 L 1440,300 L 0,300 Z"
          fill="#1E1145"
          opacity="0.7"
        />
        {/* Mountain Layer 2 (mid) */}
        <path
          d="M 0,230 Q 150,160 300,200 T 600,140 T 900,190 T 1150,130 T 1440,180 L 1440,300 L 0,300 Z"
          fill="#160D38"
          opacity="0.85"
        />
        {/* Castle spire silhouettes */}
        <g fill="#0F0825" opacity="0.9">
          {/* Left tower */}
          <rect x="180" y="170" width="12" height="130" />
          <polygon points="176,170 196,170 186,145" />
          <rect x="170" y="200" width="32" height="8" rx="1" />
          {/* Center tower */}
          <rect x="710" y="150" width="16" height="150" />
          <polygon points="702,150 734,150 718,115" />
          <rect x="700" y="190" width="36" height="8" rx="1" />
          <rect x="706" y="155" width="4" height="6" fill="#7C3AED" opacity="0.6" />
          <rect x="718" y="155" width="4" height="6" fill="#7C3AED" opacity="0.6" />
          {/* Right tower */}
          <rect x="1200" y="200" width="14" height="100" />
          <polygon points="1193,200 1221,200 1207,170" />
          <rect x="1190" y="235" width="34" height="8" rx="1" />
          <rect x="1203" y="205" width="4" height="5" fill="#A855F7" opacity="0.5" />
        </g>
        {/* Mountain Layer 3 (closest — darkest) */}
        <path
          d="M -50,260 Q 120,200 350,250 T 750,190 T 1100,240 T 1490,210 L 1440,300 L 0,300 Z"
          fill="#0B0620"
        />
        {/* Tree silhouettes on the closest ridge */}
        <g fill="#0B0620">
          {/* Left cluster */}
          <use href="#pine-sil" transform="translate(60, 200) scale(0.35)" />
          <use href="#pine-sil" transform="translate(90, 190) scale(0.45)" />
          <use href="#pine-sil" transform="translate(130, 205) scale(0.4)" />

          {/* Center-left */}
          <use href="#pine-sil" transform="translate(360, 210) scale(0.45)" />
          <use href="#pine-sil" transform="translate(400, 220) scale(0.55)" />

          {/* Center-right */}
          <use href="#pine-sil" transform="translate(880, 190) scale(0.35)" />
          <use href="#pine-sil" transform="translate(910, 175) scale(0.5)" />
          <use href="#pine-sil" transform="translate(950, 195) scale(0.4)" />

          {/* Right cluster */}
          <use href="#pine-sil" transform="translate(1260, 240) scale(0.45)" />
          <use href="#pine-sil" transform="translate(1300, 230) scale(0.55)" />
          <use href="#pine-sil" transform="translate(1350, 250) scale(0.4)" />
        </g>
      </svg>

      {/* ═══ CSS Keyframes ═══ */}
      <style>{`
        @keyframes cosmic-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1) translateZ(0); }
          50% { opacity: 1; transform: scale(1.3) translateZ(0); }
        }
        @keyframes cosmic-shoot {
          0% { opacity: 0; transform: rotate(-35deg) translateX(0) translateZ(0); }
          5% { opacity: 0.9; }
          15% { opacity: 0; transform: rotate(-35deg) translateX(150px) translateZ(0); }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
