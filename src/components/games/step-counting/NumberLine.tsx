"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Obstacle } from "@/constants/games/step-counting-levels";

interface NumberLineProps {
  totalCells: number;
  startPosition: number;
  flagPosition: number;
  obstacles: Obstacle[];
  characterPosition: number;
  isAnimating: boolean;
  showCorrect: boolean;
  currentHopObstacle?: number | null;
}

const OBSTACLE_EMOJI: Record<string, string> = {
  log: "🪵",
  rock: "🪨",
  bush: "🌿",
};

// Small grass decorations between cells
const GRASS_DECORATIONS = ["🌱", "🌿", "☘️", "🍀", "🌾"];

export function NumberLine({
  totalCells,
  startPosition,
  flagPosition,
  obstacles,
  characterPosition,
  isAnimating,
  showCorrect,
  currentHopObstacle,
}: NumberLineProps) {
  const [animPos, setAnimPos] = useState(characterPosition);

  // Check if character is currently hopping
  const isHopping = currentHopObstacle !== null && currentHopObstacle !== undefined;

  useEffect(() => {
    setAnimPos(characterPosition);
  }, [characterPosition]);

  const obstacleMap = new Map(obstacles.map((o) => [o.position, o.type]));

  const CELL_SIZE = 56;
  const GAP = 8;
  const CELL_TOTAL = CELL_SIZE + GAP;

  return (
    <div className="w-full overflow-x-auto py-2 scrollbar-none hide-scrollbar">
      <div className="relative min-w-fit mx-auto px-4">
        {/* ── Character row ── */}
        <div
          className="relative flex items-end mb-1"
          style={{ width: `${totalCells * CELL_TOTAL}px`, height: "90px" }}
        >
          <div
            className="absolute bottom-0 transition-all ease-in-out flex flex-col items-center"
            style={{
              left: `${animPos * CELL_TOTAL + (CELL_SIZE / 2) - 40}px`,
              transitionDuration: isAnimating ? "350ms" : "0ms",
            }}
          >
            {/* Shadow under character */}
            <div
              className="absolute -bottom-1 w-12 h-3 rounded-full opacity-20"
              style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
            />
            <Image
              src="/images/P_Bobo/bobo-01.svg"
              alt="Bobo"
              width={80}
              height={80}
              className="object-contain"
              style={{
                animation: isHopping 
                  ? "hop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" 
                  : isAnimating 
                    ? "bounce 0.35s ease-in-out infinite" 
                    : "none",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                transformOrigin: "bottom center",
              }}
            />
          </div>
        </div>

        {/* ── Grass ground + Track ── */}
        <div className="relative">
          {/* Grass background */}
          <div
            className="absolute inset-x-0 bottom-0 rounded-2xl"
            style={{
              height: "calc(100% + 24px)",
              background: "linear-gradient(180deg, #7EC850 0%, #5DAA3A 40%, #4A8F2C 100%)",
              top: "-4px",
              zIndex: 0,
            }}
          />

          {/* Small grass tips along the top of the ground */}
          <div
            className="absolute inset-x-0 flex justify-around pointer-events-none select-none"
            style={{ top: "-14px", zIndex: 1 }}
          >
            {Array.from({ length: Math.min(totalCells * 2, 20) }).map((_, i) => (
              <span
                key={i}
                className="text-xs opacity-80"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 3)}deg)`,
                }}
              >
                {GRASS_DECORATIONS[i % GRASS_DECORATIONS.length]}
              </span>
            ))}
          </div>

          {/* Track cells */}
          <div
            className="relative flex items-center gap-2 p-2"
            style={{ zIndex: 2 }}
          >
            {Array.from({ length: totalCells }).map((_, idx) => {
              const isStart = idx === startPosition;
              const isFlag = idx === flagPosition;
              const obstacle = obstacleMap.get(idx);
              const isFlagReached = showCorrect && idx === flagPosition;
              const isBeingHopped = currentHopObstacle === idx;

              // Determine cell style
              let cellStyle = "";
              let cellBorder = "";

              if (isBeingHopped) {
                // Flash golden when hopped over
                cellStyle = "bg-gradient-to-br from-yellow-300 to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)] scale-110 z-10 brightness-110";
                cellBorder = "border-2 border-yellow-200";
              } else if (isStart) {
                // Start cell — solid warm color
                cellStyle = "bg-gradient-to-br from-amber-200 to-yellow-300 shadow-md";
                cellBorder = "border-2 border-amber-400";
              } else if (obstacle) {
                // Obstacle cell — solid with obstacle
                cellStyle = "bg-gradient-to-br from-amber-100 to-orange-100 shadow-md";
                cellBorder = "border-2 border-amber-300";
              } else if (isFlagReached) {
                // Reached flag — celebration
                cellStyle = "bg-gradient-to-br from-emerald-200 to-green-300 shadow-lg";
                cellBorder = "border-2 border-emerald-400";
              } else if (isFlag) {
                // Flag cell — slightly highlighted
                cellStyle = "bg-white/90 shadow-sm";
                cellBorder = "border-2 border-dashed border-green-400";
              } else {
                // Empty cell — dashed border, transparent-ish
                cellStyle = "bg-white/70 shadow-sm";
                cellBorder = "border-2 border-dashed border-gray-300/80";
              }

              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`
                      relative flex flex-col items-center justify-center
                      rounded-xl transition-all duration-300
                      ${cellStyle} ${cellBorder}
                    `}
                    style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                  >
                    {/* Obstacle emoji */}
                    {obstacle && (
                      <span className="text-xl leading-none drop-shadow-sm">
                        {OBSTACLE_EMOJI[obstacle]}
                      </span>
                    )}

                    {/* Flag — checkered pattern */}
                    {isFlag && !obstacle && (
                      <span className="text-xl leading-none">🏁</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hop {
          0% { transform: translateY(0) scaleY(0.9); }
          50% { transform: translateY(-30px) scaleY(1.05); }
          100% { transform: translateY(0) scaleY(0.95); }
        }
      `}</style>
    </div>
  );
}
