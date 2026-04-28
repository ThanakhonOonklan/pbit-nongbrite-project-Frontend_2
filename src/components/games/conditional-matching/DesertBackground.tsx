import React, { useMemo } from "react";

export function DesertBackground() {
  // Pre-compute stars and clouds
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        size: 1 + Math.random() * 2,
        top: Math.random() * 60,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        top: 5 + Math.random() * 20,
        delay: Math.random() * -40,
        duration: 50 + Math.random() * 50,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0.1 + Math.random() * 0.15,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0B1021]">
      {/* ═══ LAYER 1: Night Sky Gradient ═══ */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="desert-night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1021" />
            <stop offset="50%" stopColor="#152238" />
            <stop offset="100%" stopColor="#253556" />
          </linearGradient>
          <radialGradient id="moon-glow" cx="80%" cy="25%" r="35%">
            <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#CBD5E1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#desert-night-sky)" />
        <rect width="100%" height="100%" fill="url(#moon-glow)" />
        
        {/* The Moon */}
        <circle cx="80%" cy="25%" r="3.5%" fill="#F1F5F9" />
        <circle cx="79%" cy="24%" r="1%" fill="#CBD5E1" opacity="0.6" />
        <circle cx="81%" cy="26%" r="0.8%" fill="#CBD5E1" opacity="0.4" />
      </svg>

      {/* ═══ LAYER 2: Twinkling Stars ═══ */}
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══ LAYER 3: Dark Floating Clouds ═══ */}
      <div className="absolute inset-0" aria-hidden="true">
        {clouds.map((cloud, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              top: `${cloud.top}%`,
              left: `-20%`,
              transform: `scale(${cloud.scale})`,
              opacity: cloud.opacity,
              animation: `cloud-drift ${cloud.duration}s linear ${cloud.delay}s infinite`,
            }}
          >
            <div className="w-[120px] h-[40px] bg-slate-200 rounded-full relative">
              <div className="absolute w-[60px] h-[60px] bg-slate-200 rounded-full -top-[30px] left-[20px]" />
              <div className="absolute w-[45px] h-[45px] bg-slate-200 rounded-full -top-[15px] left-[65px]" />
            </div>
          </div>
        ))}
      </div>

      {/* ═══ LAYER 4: Moonlit Sand Dunes and Cacti ═══ */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[55%] min-h-[300px]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <g id="cactus-dark">
            <rect x="20" y="20" width="16" height="80" rx="8" fill="#1A2D3C" />
            <rect x="22" y="22" width="4" height="76" rx="2" fill="#2C4558" />
            <path d="M 22 55 Q 5 55 5 40 L 5 25" fill="none" stroke="#1A2D3C" strokeWidth="12" strokeLinecap="round" />
            <path d="M 22 55 Q 5 55 5 40 L 5 25" fill="none" stroke="#2C4558" strokeWidth="4" strokeLinecap="round" transform="translate(1, -1)" />
            <path d="M 34 45 Q 50 45 50 30 L 50 15" fill="none" stroke="#1A2D3C" strokeWidth="12" strokeLinecap="round" />
            <path d="M 34 45 Q 50 45 50 30 L 50 15" fill="none" stroke="#2C4558" strokeWidth="4" strokeLinecap="round" transform="translate(-1, -1)" />
          </g>
          
          <g id="small-cactus-dark">
             <rect x="10" y="10" width="12" height="40" rx="6" fill="#152633" />
             <path d="M 10 30 Q 0 30 0 20" fill="none" stroke="#152633" strokeWidth="8" strokeLinecap="round" />
             <path d="M 22 25 Q 32 25 32 15" fill="none" stroke="#152633" strokeWidth="8" strokeLinecap="round" />
          </g>
        </defs>

        {/* Dune Layer 1 (Back - Darkest) */}
        <path
          d="M 0,200 Q 200,100 400,180 T 800,130 T 1200,160 T 1440,110 L 1440,400 L 0,400 Z"
          fill="#1C273D"
        />
        <use href="#small-cactus-dark" transform="translate(250, 150) scale(0.8)" />
        <use href="#small-cactus-dark" transform="translate(850, 130)" />
        <use href="#cactus-dark" transform="translate(1300, 70) scale(0.7)" />

        {/* Dune Layer 2 (Middle) */}
        <path
          d="M 0,250 Q 250,160 500,220 T 950,170 T 1440,240 L 1440,400 L 0,400 Z"
          fill="#23324C"
        />
        <use href="#cactus-dark" transform="translate(150, 180) scale(0.9)" />
        <use href="#small-cactus-dark" transform="translate(580, 190) scale(1.2)" />
        <use href="#cactus-dark" transform="translate(1050, 140) scale(0.85)" />

        {/* Dune Layer 3 (Front - Moonlit) */}
        <path
          d="M -50,320 Q 200,220 450,300 T 900,260 T 1490,310 L 1440,400 L 0,400 Z"
          fill="#2D405D"
        />
        <use href="#cactus-dark" transform="translate(350, 240) scale(1.1)" />
        <use href="#small-cactus-dark" transform="translate(80, 270) scale(1.5)" />
        <use href="#cactus-dark" transform="translate(850, 210) scale(1.3)" />
        <use href="#small-cactus-dark" transform="translate(1250, 250) scale(1.2)" />
      </svg>

      {/* ═══ CSS Keyframes ═══ */}
      <style>{`
        @keyframes cloud-drift {
          0% { transform: translateX(-150px) scale(var(--scale, 1)); }
          100% { transform: translateX(110vw) scale(var(--scale, 1)); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
