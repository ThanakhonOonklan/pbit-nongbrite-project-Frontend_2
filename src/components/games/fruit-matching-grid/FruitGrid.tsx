"use client";

import { ROW_LABELS } from "@/constants/games/fruit-matching-grid-levels";

interface FruitGridProps {
  grid: string[][];
  gridSize: number;
}

// Pastel cell background colors for a fun child-friendly look
const CELL_COLORS = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-rose-100",
  "bg-teal-100",
  "bg-amber-100",
  "bg-indigo-100",
];

// Row header colors
const ROW_HEADER_COLORS = [
  "text-pink-500",
  "text-orange-500",
  "text-green-500",
  "text-blue-500",
  "text-purple-500",
];

export function FruitGrid({ grid, gridSize }: FruitGridProps) {
  const colLabels = Array.from({ length: gridSize }, (_, i) => i + 1);

  return (
    <div
      className="rounded-3xl shadow-lg p-3 sm:p-4 w-full max-w-md mx-auto border-2 border-white/60"
      style={{
        background: "linear-gradient(135deg, #FFF9E6 0%, #FFE8F0 50%, #E8F4FF 100%)",
      }}
    >
      {/* Column headers */}
      <div
        className="gap-2 sm:gap-2.5 mb-2 sm:mb-3"
        style={{
          display: "grid",
          gridTemplateColumns: `44px repeat(${gridSize}, 1fr)`,
        }}
      >
        <div /> {/* empty corner */}
        {colLabels.map((col) => (
          <div
            key={col}
            className="flex items-center justify-center text-base sm:text-lg font-extrabold text-orange-500 drop-shadow-sm"
          >
            {col}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      {grid.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="gap-2 sm:gap-2.5 mb-2 sm:mb-3 last:mb-0"
          style={{
            display: "grid",
            gridTemplateColumns: `44px repeat(${gridSize}, 1fr)`,
          }}
        >
          {/* Row label */}
          <div
            className={`flex items-center justify-center text-base sm:text-lg font-extrabold ${ROW_HEADER_COLORS[rowIdx % ROW_HEADER_COLORS.length]} drop-shadow-sm`}
          >
            {ROW_LABELS[rowIdx]}
          </div>

          {/* Fruit cells */}
          {row.map((fruit, colIdx) => {
            const colorIdx = (rowIdx * gridSize + colIdx) % CELL_COLORS.length;
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className={`
                  aspect-square flex items-center justify-center
                  rounded-2xl border-2 border-white/80
                  ${CELL_COLORS[colorIdx]}
                  hover:scale-105 hover:shadow-md
                  transition-all duration-200 ease-out
                  cursor-default
                  shadow-sm
                `}
              >
                <span className="text-2xl sm:text-3xl md:text-4xl select-none drop-shadow-sm">
                  {fruit}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

