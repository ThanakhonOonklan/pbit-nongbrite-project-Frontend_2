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
}

const OBSTACLE_EMOJI: Record<string, string> = {
  log: "🪵",
  rock: "🪨",
  bush: "🌿",
};

export function NumberLine({
  totalCells,
  startPosition,
  flagPosition,
  obstacles,
  characterPosition,
  isAnimating,
  showCorrect,
}: NumberLineProps) {
  const [animPos, setAnimPos] = useState(characterPosition);

  useEffect(() => {
    setAnimPos(characterPosition);
  }, [characterPosition]);

  const obstacleMap = new Map(obstacles.map((o) => [o.position, o.type]));

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="relative flex flex-col items-center min-w-fit mx-auto px-4">
        {/* Character row */}
        <div className="relative flex items-end mb-1" style={{ width: `${totalCells * 68}px`, height: "90px" }}>
          <div
            className="absolute bottom-0 transition-all ease-in-out flex flex-col items-center"
            style={{
              left: `${animPos * 68 - 14}px`,
              transitionDuration: isAnimating ? "350ms" : "0ms",
            }}
          >
            <Image
              src="/images/P_Bobo/bobo-01.svg"
              alt="Bobo"
              width={80}
              height={80}
              className="object-contain"
              style={{
                animation: isAnimating ? "bounce 0.35s ease-in-out infinite" : "none",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            />
          </div>
        </div>

        {/* Number line track */}
        <div
          className="relative flex items-center rounded-2xl p-2"
          style={{
            backgroundColor: "rgba(200, 235, 210, 0.4)",
          }}
        >
          {Array.from({ length: totalCells }).map((_, idx) => {
            const isStart = idx === startPosition;
            const isFlag = idx === flagPosition;
            const obstacle = obstacleMap.get(idx);
            const isFlagReached = showCorrect && idx === flagPosition;

            return (
              <div key={idx} className="flex items-center">
                {/* Cell */}
                <div
                  className={`
                    relative w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center
                    border-2 transition-all duration-300 shadow-sm
                    ${isStart
                      ? "bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-400 shadow-amber-200/60"
                      : isFlagReached
                        ? "bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-400 shadow-emerald-200/60"
                        : "bg-white border-gray-200/80 hover:border-gray-300"
                    }
                  `}
                >
                  {/* Obstacle or Flag on top */}
                  {obstacle && (
                    <span className="text-base leading-none">
                      {OBSTACLE_EMOJI[obstacle]}
                    </span>
                  )}
                  {isFlag && !obstacle && (
                    <span className="text-base leading-none">🚩</span>
                  )}
                </div>

                {/* Arrow between cells */}
                {idx < totalCells - 1 && (
                  <div className="flex items-center justify-center w-2 text-gray-300 text-[10px] select-none">
                    ·
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
            `}</style>
    </div>
  );
}
