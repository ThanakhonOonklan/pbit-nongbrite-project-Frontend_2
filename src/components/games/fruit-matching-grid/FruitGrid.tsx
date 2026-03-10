"use client";

import { ROW_LABELS } from "@/constants/games/fruit-matching-grid-levels";

interface FruitGridProps {
  grid: string[][];
}

const COL_LABELS = [1, 2, 3, 4, 5];

export function FruitGrid({ grid }: FruitGridProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 w-full">
      {/* Column headers */}
      <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
        <div /> {/* empty corner */}
        {COL_LABELS.map((col) => (
          <div
            key={col}
            className="flex items-center justify-center text-sm sm:text-base font-bold text-slate-600"
          >
            {col}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      {grid.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="grid grid-cols-[40px_repeat(5,1fr)] gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 last:mb-0"
        >
          {/* Row label */}
          <div className="flex items-center justify-center text-sm sm:text-base font-bold text-slate-600">
            {ROW_LABELS[rowIdx]}
          </div>

          {/* Fruit cells */}
          {row.map((fruit, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="aspect-square flex items-center justify-center rounded-xl border-2 border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-xl sm:text-2xl md:text-3xl select-none">
                {fruit}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
