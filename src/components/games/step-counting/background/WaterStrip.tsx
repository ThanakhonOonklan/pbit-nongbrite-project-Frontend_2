import React from "react";

export function WaterStrip() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 rounded-t-2xl overflow-hidden pointer-events-none"
      style={{
        height: 70,
        background: "linear-gradient(180deg, rgba(110,209,207,0.7) 0%, rgba(69,186,198,0.9) 100%)",
        boxShadow: "inset 0px 4px 12px rgba(69,186,198,0.4)",
        borderTop: "2px solid rgba(110,209,207,0.8)",
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        aria-hidden="true"
      >
        <defs>
          {/* ── Background Slow Waves (Far distance) ── */}
          <pattern
            id="water-bg-pattern"
            x="0" y="0" width="240" height="52"
            patternUnits="userSpaceOnUse"
          >
            <animate attributeName="x" from="0" to="-240" dur="20s" repeatCount="indefinite" />
            
            {/* Ripples */}
            <path d="M 20 22 Q 35 12 50 22 T 80 22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 130 38 Q 145 28 160 38 T 190 38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
            
            {/* Tiny Bubbles */}
            <circle cx="95" cy="18" r="2" fill="rgba(255,255,255,0.25)" />
            <circle cx="210" cy="28" r="1.5" fill="rgba(255,255,255,0.3)" />
          </pattern>

          {/* ── Foreground Fast Waves (Near distance) ── */}
          <pattern
            id="water-fg-pattern"
            x="0" y="0" width="180" height="52"
            patternUnits="userSpaceOnUse"
          >
            <animate attributeName="x" from="0" to="-180" dur="12s" repeatCount="indefinite" />

            {/* Ripples */}
            <path d="M 10 35 Q 25 25 40 35 T 70 35" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 90 20 Q 100 12 110 20 T 130 20" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Bubbles */}
            <circle cx="45" cy="46" r="3" fill="rgba(255,255,255,0.7)" />
            <circle cx="52" cy="38" r="1.5" fill="rgba(255,255,255,0.8)" />
            <circle cx="150" cy="24" r="2" fill="rgba(255,255,255,0.5)" />
            
            {/* Sparkle / Shine */}
            <g transform="translate(125, 38) scale(0.5)">
              <path d="M 10 0 L 12 8 L 20 10 L 12 12 L 10 20 L 8 12 L 0 10 L 8 8 Z" fill="rgba(255,255,255,0.85)" />
            </g>
          </pattern>
        </defs>

        {/* ── Render Layers ── */}
        <rect width="100%" height="100%" fill="url(#water-bg-pattern)" />
        <rect width="100%" height="100%" fill="url(#water-fg-pattern)" />
      </svg>
    </div>
  );
}
