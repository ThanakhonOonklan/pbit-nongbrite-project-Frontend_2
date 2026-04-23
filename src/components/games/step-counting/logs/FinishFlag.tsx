"use client";

import React from "react";

interface FinishFlagProps {
  className?: string;
}

export function FinishFlag({ className = "" }: FinishFlagProps) {
  return (
    <svg
      width="80"
      height="120"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <pattern
          id="checkers"
          x="16"
          y="20"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="8" height="8" fill="#ffffff" />
          <rect x="8" width="8" height="8" fill="#1e293b" />
          <rect y="8" width="8" height="8" fill="#1e293b" />
          <rect x="8" y="8" width="8" height="8" fill="#ffffff" />
        </pattern>
      </defs>

      <g transform="scale(-1, 1) translate(-80, 0)">
        {/* Pole outline/shadow */}
        <rect x="10" y="12" width="8" height="108" rx="4" fill="#5c3a21" />
        {/* Pole main */}
        <rect x="8" y="12" width="8" height="108" rx="4" fill="#8b5a2b" />
        {/* Pole highlight */}
        <rect x="9" y="12" width="2" height="108" rx="1" fill="#a67139" />

        {/* Flag cloth (waving) */}
        <g stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round">
          <path
            d="M 16 20 L 75 20 L 75 52 L 16 52 Z"
            fill="url(#checkers)"
          />
        </g>

        {/* Pole top knob */}
        <circle cx="12" cy="10" r="8" fill="#f59e0b" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="9" cy="7" r="3" fill="#fbbf24" />
      </g>
    </svg>
  );
}
