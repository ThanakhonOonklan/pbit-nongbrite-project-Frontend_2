"use client";

import { Fragment } from "react";
import { ROW_LABELS } from "@/constants/games/fruit-matching-grid-levels";

interface FruitGridProps {
  grid: string[][];
  gridSize: number;
  onCellClick?: (coordinate: string) => void;
  foundCoordinates?: string[];
  disabled?: boolean;
  highlightCoordinate?: string; // for Mode 2: highlights the target cell
}

const FRUIT_NAMES: Record<string, string> = {
  "🍎": "APPLE",
  "🍊": "ORANGE",
  "🍇": "GRAPE",
  "🍌": "BANANA",
  "🍓": "STRAWBERRY",
  "🥝": "KIWI",
  "🍉": "WATERMELON",
  "🍑": "PEACH",
  "🍒": "CHERRY",
  "🍍": "PINEAPPLE",
  "🫐": "BLUEBERRY",
  "🥭": "MANGO",
  "🍋": "LEMON",
  "🍈": "MELON",
  "🥥": "COCONUT",
  "🍐": "PEAR",
  "🥑": "AVOCADO",
  "🍅": "TOMATO",
};

const LABEL_COLORS = [
  "bg-pink-100 text-pink-600",
  "bg-orange-100 text-orange-600",
  "bg-green-100 text-green-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600"
];

export function FruitGrid({ grid, gridSize, onCellClick, foundCoordinates = [], disabled = false, highlightCoordinate }: FruitGridProps) {
  const colLabels = Array.from({ length: gridSize }, (_, i) => i + 1);

  return (
    <div className="rounded-[2rem] shadow-xl p-2 sm:p-4 md:p-5 w-full max-w-lg mx-auto border-4 sm:border-8 sm:border-t-4 border-[#e3a869] bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] overflow-hidden relative">
      {/* Basket inner shadow/texture */}
      <div className="absolute inset-0 border-4 border-white/50 rounded-[1.5rem] pointer-events-none" />

      {/* Unified grid: first col = labels, rest = fruit columns */}
      <div
        className="gap-1 sm:gap-2 md:gap-2.5"
        style={{ display: "grid", gridTemplateColumns: `minmax(1.75rem, 2.25rem) repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {/* Corner spacer */}
        <div />
        {/* Column header badges */}
        {colLabels.map((col, idx) => (
          <div key={col} className="flex items-center justify-center h-7 sm:h-9 md:h-10 relative z-10">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-base md:text-lg shadow-sm ${LABEL_COLORS[idx]}`}>
              {col}
            </div>
          </div>
        ))}

        {/* Fruit rows — each row: label badge + fruit cells as direct children of the parent grid */}
        {grid.map((row, rowIdx) => (
          <Fragment key={rowIdx}>
            {/* Row label badge — spans 1 col */}
            <div key={`label-${rowIdx}`} className="flex items-center justify-center relative z-10">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-base md:text-lg shadow-sm ${LABEL_COLORS[rowIdx]}`}>
                {ROW_LABELS[rowIdx]}
              </div>
            </div>

            {/* Fruit cells */}
            {row.map((fruit, colIdx) => {
              const coordinate = `${ROW_LABELS[rowIdx]}${colIdx + 1}`;
              const isFound = foundCoordinates.includes(coordinate);
              const isHighlighted = highlightCoordinate === coordinate;

              return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  type="button"
                  disabled={disabled || isFound}
                  onClick={() => onCellClick?.(coordinate)}
                  className={`
                    min-w-0 aspect-square flex flex-col items-center justify-center
                    rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] p-0.5 sm:p-1
                    ${isFound
                      ? "bg-gradient-to-br from-green-100 to-green-50 border sm:border-2 border-green-300 ring-2 sm:ring-4 ring-green-100 opacity-90 scale-95"
                      : isHighlighted
                      ? "bg-amber-50 border sm:border-2 border-amber-400 ring-2 sm:ring-4 ring-amber-200"
                      : "bg-white border sm:border-2 border-slate-100 shadow-[0_2px_0_0_#e2e8f0,0_4px_6px_rgba(0,0,0,0.04)] sm:shadow-[0_4px_0_0_#e2e8f0,0_8px_10px_rgba(0,0,0,0.04)]"}
                    ${!disabled && !isFound && onCellClick
                      ? "hover:-translate-y-1 hover:shadow-[0_4px_0_0_#cbd5e1,0_6px_10px_rgba(0,0,0,0.06)] cursor-pointer active:translate-y-[2px] active:shadow-[0_1px_0_0_#e2e8f0,0_1px_2px_rgba(0,0,0,0.04)]"
                      : "cursor-default"}
                    transition-all duration-200 ease-out relative
                  `}
                >
                  <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    <span 
                      className={`
                        ${gridSize >= 5 ? "text-lg sm:text-xl md:text-2xl lg:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"} 
                        select-none drop-shadow-sm transition-transform duration-300 
                        ${isFound ? "scale-110 drop-shadow-md" : "scale-100"}
                      `}
                    >
                      {fruit}
                    </span>
                  </div>
                  <div className="mb-1 sm:mb-1.5 px-1 sm:px-1.5 py-0 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shrink-0 max-w-[95%] overflow-hidden">
                    <span 
                      className={`
                        ${gridSize >= 5 ? "text-[4px] sm:text-[6px] md:text-[7.5px]" : "text-[6px] sm:text-[9px] md:text-[11px]"} 
                        font-black uppercase tracking-tight text-slate-500 leading-none truncate block
                      `}
                    >
                      {FRUIT_NAMES[fruit] || ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

