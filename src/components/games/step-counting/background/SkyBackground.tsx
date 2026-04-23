import React from "react";

export function SkyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex flex-col bg-[#DCEFFE]">
      {/* --- UPPER PART: SKY & MOUNTAINS (55% Height) --- */}
      <div className="relative w-full h-[55%] z-0">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A5D8FF" />  {/* Clear blue */}
              <stop offset="40%" stopColor="#D0EFFF" /> {/* Light horizon blue */}
              <stop offset="70%" stopColor="#FFF1E6" /> {/* Soft warm cloud base */}
              <stop offset="100%" stopColor="#FFE4E1" /> {/* Soft peach sunset */}
            </linearGradient>
          </defs>
          <rect y="0" width="100%" height="100%" fill="url(#sky-grad)" />
        </svg>

        {/* --- SUN RAYS --- */}
        <svg
          className="absolute top-0 right-0 w-[80%] h-full opacity-30 mix-blend-overlay"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="100,0 30,100 50,100 100,30" fill="white" />
          <polygon points="100,0 70,100 85,100 100,50" fill="white" />
        </svg>

        {/* --- CLOUDS --- */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
        >
          <g transform="translate(250, 40) scale(0.65)">
            <g fill="#FFFFFF" fillOpacity="0.95">
              <path d="M 150,120 A 30,30 0 0,1 200,90 A 40,40 0 0,1 270,100 A 35,35 0 0,1 320,130 A 20,20 0 0,1 320,160 L 130,160 A 20,20 0 0,1 150,120 Z" />
              <path d="M 330,220 A 40,40 0 0,1 420,200 A 45,45 0 0,1 490,220 A 30,30 0 0,1 500,270 L 320,270 A 25,25 0 0,1 330,220 Z" fill="#F8FAFC" />
              <path d="M 800,100 A 40,40 0 0,1 860,60 A 50,50 0 0,1 940,80 A 35,35 0 0,1 970,120 L 780,120 A 20,20 0 0,1 800,100 Z" />
              <path d="M 1150,180 A 45,45 0 0,1 1230,140 A 50,50 0 0,1 1310,160 A 40,40 0 0,1 1330,210 L 1120,210 A 30,30 0 0,1 1150,180 Z" fill="#F8FAFC" />
              <path d="M 550,160 A 25,25 0 0,1 600,140 A 35,35 0 0,1 660,150 A 20,20 0 0,1 670,180 L 530,180 A 15,15 0 0,1 550,160 Z" fillOpacity="0.6" />
              <path d="M 950,240 A 30,30 0 0,1 1000,210 A 40,40 0 0,1 1070,230 A 25,25 0 0,1 1080,270 L 930,270 A 20,20 0 0,1 950,240 Z" fillOpacity="0.4" />
            </g>
          </g>
        </svg>

        {/* --- BIRDS --- */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
        >
          <g stroke="#718096" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 380,180 Q 395,160 410,180 Q 425,160 440,180" />
            <path d="M 400,210 Q 410,195 420,210 Q 430,195 440,210" strokeWidth="2.5" />
            <path d="M 1000,140 Q 1015,120 1030,140 Q 1045,120 1060,140" stroke="#879AA8" />
            <path d="M 1040,110 Q 1050,95 1060,110 Q 1070,95 1080,110" strokeWidth="2.5" stroke="#879AA8" />
            <path d="M 900,160 Q 910,145 920,160 Q 930,145 940,160" strokeWidth="2" stroke="#A0AEC0" />
          </g>
        </svg>

        {/* --- MOUNTAINS --- 
            Sit exactly at the bottom of the upper sky container so they are fully visible. */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[80%]"
          viewBox="0 0 1440 480"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Layer 1 (Farthest) */}
          <path d="M 0,250 Q 150,120 300,200 T 700,150 T 1000,220 T 1440,180 L 1440,480 L 0,480 Z" fill="#D2C4DF" opacity="0.8" />
          {/* Layer 2 */}
          <path d="M 0,320 Q 200,210 400,290 T 800,200 T 1200,300 T 1440,250 L 1440,480 L 0,480 Z" fill="#BDAEC6" opacity="0.9" />
          {/* Layer 3 (Closest) */}
          <path d="M -50,380 Q 180,280 430,370 T 930,260 T 1490,360 L 1440,480 L 0,480 Z" fill="#9CA4BE" />
        </svg>

        {/* --- PINE TREES --- */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[65%]"
          viewBox="0 0 1440 480"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <g id="pine-tree">
              <rect x="45" y="145" width="10" height="45" fill="#8C7A8E" rx="2" />
              <path d="M 50 0 L 32 45 L 42 45 L 20 95 L 32 95 L 5 150 L 95 150 L 68 95 L 80 95 L 58 45 L 68 45 Z" />
            </g>
          </defs>

          <g opacity="0.95" transform="translate(0, 50)">
            {/* Far Left pines (Layer 1 - Back) */}
            <g fill="#B4A8C8">
              <use href="#pine-tree" transform="translate(-10, 160) scale(1.1)" />
              <use href="#pine-tree" transform="translate(70, 180) scale(0.9)" />
              <use href="#pine-tree" transform="translate(190, 150) scale(1.2)" />
              <use href="#pine-tree" transform="translate(320, 190) scale(0.85)" />
            </g>

            {/* Far Left pines (Layer 2 - Mid) */}
            <g fill="#9CA4BE">
              <use href="#pine-tree" transform="translate(20, 180) scale(1.2)" />
              <use href="#pine-tree" transform="translate(140, 190) scale(1.05)" />
              <use href="#pine-tree" transform="translate(260, 200) scale(0.95)" />
            </g>

            {/* Far Left pines (Layer 3 - Front) */}
            <g fill="#828CA9">
              <use href="#pine-tree" transform="translate(-30, 210) scale(1.4)" />
              <use href="#pine-tree" transform="translate(80, 220) scale(1.2)" />
              <use href="#pine-tree" transform="translate(200, 230) scale(1.1)" />
            </g>


            {/* Far Right pines (Layer 1 - Back) */}
            <g fill="#B4A8C8">
              <use href="#pine-tree" transform="translate(1050, 170) scale(1.1)" />
              <use href="#pine-tree" transform="translate(1180, 140) scale(1.3)" />
              <use href="#pine-tree" transform="translate(1320, 180) scale(0.9)" />
            </g>

            {/* Far Right pines (Layer 2 - Mid) */}
            <g fill="#9CA4BE">
              <use href="#pine-tree" transform="translate(1120, 190) scale(1.1)" />
              <use href="#pine-tree" transform="translate(1250, 170) scale(1.2)" />
              <use href="#pine-tree" transform="translate(1380, 200) scale(1.0)" />
            </g>

            {/* Far Right pines (Layer 3 - Front) */}
            <g fill="#828CA9">
              <use href="#pine-tree" transform="translate(1080, 220) scale(1.3)" />
              <use href="#pine-tree" transform="translate(1200, 210) scale(1.4)" />
              <use href="#pine-tree" transform="translate(1330, 230) scale(1.2)" />
            </g>
          </g>
        </svg>

        {/* Seamlessly cover any remaining gap beneath the upper SVGs but above the water. */}
        <div className="absolute top-[99%] w-full h-[15vh] bg-[#9CA4BE]" />
      </div>

      {/* --- LOWER PART: WATER (45% Height) --- */}
      <div className="absolute bottom-0 w-full h-[45%] z-10">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="water-depth-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8DBEDE" />
              <stop offset="100%" stopColor="#67A0CA" />
            </linearGradient>

            {/* Ripples patterns */}
            <pattern id="ripples-bg" x="0" y="0" width="400" height="350" patternUnits="userSpaceOnUse">
              <animate attributeName="x" from="0" to="-400" dur="15s" repeatCount="indefinite" />
              <path d="M 20 120 Q 50 110 80 120 T 140 120" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 220 220 Q 250 210 280 220 T 340 220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="125" r="3" fill="rgba(255,255,255,0.5)" />
            </pattern>

            <pattern id="ripples-fg" x="0" y="0" width="500" height="350" patternUnits="userSpaceOnUse">
              <animate attributeName="x" from="0" to="-500" dur="10s" repeatCount="indefinite" />
              <path d="M 50 160 Q 80 150 110 160 T 170 160" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 300 280 Q 330 270 360 280 T 420 280" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="150" cy="165" r="3.5" fill="rgba(255,255,255,0.7)" />
              <circle cx="380" cy="275" r="2.5" fill="rgba(255,255,255,0.6)" />
            </pattern>

            {/* Reusable Object Templates */}
            <g id="lily-pad">
              <ellipse cx="15" cy="5" rx="14" ry="4" fill="#86EFAC" />
              <ellipse cx="14" cy="4" rx="12" ry="3" fill="#4ADE80" />
              <path d="M 15 5 L 20 8" stroke="#166534" strokeWidth="1" />
              <path d="M 8 3 Q 10 0 12 3 Q 10 5 8 3" fill="#F472B6" />
              <path d="M 12 3 Q 14 0 16 3 Q 14 5 12 3" fill="#F472B6" />
            </g>
            <g id="fish-orange">
              <ellipse cx="20" cy="10" rx="15" ry="8" fill="#FDBA74" />
              <polygon points="5,10 -2,4 -2,16" fill="#FDBA74" />
              <circle cx="28" cy="8" r="1.5" fill="#9A3412" />
            </g>
            <g id="fish-blue">
              <ellipse cx="20" cy="10" rx="15" ry="8" fill="#60A5FA" />
              <polygon points="5,10 -2,4 -2,16" fill="#60A5FA" />
              <circle cx="28" cy="8" r="1.5" fill="#1E3A8A" />
            </g>
            <g id="leaf">
              <path d="M 0 0 C 10 -10 20 0 30 5 C 20 15 5 10 0 0 Z" fill="#A3E635" />
              <path d="M 0 0 L 25 5" stroke="#4D7C0F" strokeWidth="1" />
            </g>
            <g id="twig">
              <path d="M 0 0 L 20 5 L 25 3" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 10 2.5 L 15 -2" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            </g>
          </defs>

          {/* MAIN WATER WAVE (Single Layer) */}
          <path
            d="M 0,60 Q 40,65 80,60 T 160,60 T 240,60 T 320,60 T 400,60 T 480,60 T 560,60 T 640,60 T 720,60 T 800,60 T 880,60 T 960,60 T 1040,60 T 1120,60 T 1200,60 T 1280,60 T 1360,60 T 1440,60 L 1440,350 L 0,350 Z"
            fill="url(#water-depth-grad)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />

          {/* Floating Objects (Back Layer) */}
          <g>
            <animateTransform attributeName="transform" type="translate" from="1800 80" to="-200 80" dur="35s" repeatCount="indefinite" />
            <use href="#fish-orange" transform="scale(0.8)" opacity="0.8" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="translate" from="2500 70" to="-200 70" dur="45s" repeatCount="indefinite" />
            <use href="#lily-pad" transform="scale(1.0) rotate(10)" opacity="0.9" />
          </g>

          {/* Background & Foreground Swirling Ripples */}
          <rect width="100%" height="100%" fill="url(#ripples-bg)" />
          <rect width="100%" height="100%" fill="url(#ripples-fg)" />

          {/* Floating Objects (Front Layer) */}
          <g>
            <animateTransform attributeName="transform" type="translate" from="1500 150" to="-200 150" dur="28s" repeatCount="indefinite" />
            <use href="#fish-blue" transform="scale(1.0)" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="translate" from="2200 120" to="-200 120" dur="38s" repeatCount="indefinite" />
            <use href="#lily-pad" transform="scale(1.3) rotate(-8)" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="translate" from="1700 130" to="-200 130" dur="32s" repeatCount="indefinite" />
            <use href="#leaf" transform="scale(1.1) rotate(20)" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="translate" from="2900 240" to="-200 240" dur="48s" repeatCount="indefinite" />
            <use href="#twig" transform="scale(1.4) rotate(-25)" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
