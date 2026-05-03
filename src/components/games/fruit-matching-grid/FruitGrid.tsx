"use client";

import { Fragment, useState } from "react";
import { ROW_LABELS } from "@/constants/games/fruit-matching-grid-levels";

interface FruitGridProps {
  grid: string[][];
  gridSize: number;
  onCellClick?: (coordinate: string) => void;
  foundCoordinates?: string[];
  disabled?: boolean;
  highlightCoordinate?: string; // for Mode 2: highlights the target cell
  interactiveHighlight?: boolean; // whether to allow the user to hover and discover coordinates
}



const LABEL_COLORS = [
  { passive: "bg-pink-100 text-pink-600", active: "bg-pink-500 text-white ring-4 ring-pink-200 shadow-pink-200" },
  { passive: "bg-orange-100 text-orange-600", active: "bg-orange-500 text-white ring-4 ring-orange-200 shadow-orange-200" },
  { passive: "bg-green-100 text-green-600", active: "bg-green-500 text-white ring-4 ring-green-200 shadow-green-200" },
  { passive: "bg-blue-100 text-blue-600", active: "bg-blue-500 text-white ring-4 ring-blue-200 shadow-blue-200" },
  { passive: "bg-purple-100 text-purple-600", active: "bg-purple-500 text-white ring-4 ring-purple-200 shadow-purple-200" }
];

export function FruitGrid({ grid, gridSize, onCellClick, foundCoordinates = [], disabled = false, highlightCoordinate, interactiveHighlight = false }: FruitGridProps) {
  const colLabels = Array.from({ length: gridSize }, (_, i) => i + 1);

  const [activeCell, setActiveCell] = useState<string | null>(null);

  const activeRowLabel = activeCell ? activeCell[0] : null;
  const activeColNumber = activeCell ? parseInt(activeCell.substring(1)) : null;

  return (
    <>
      <style>{`
        @keyframes fruitPop {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fruit-pop {
          animation: fruitPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }
      `}</style>
      <div className="w-full max-w-lg mx-auto p-3 sm:p-5 md:p-6 relative rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-amber-500 to-amber-700 border-b-8 border-r-8 border-amber-800 md:max-h-full">
        {/* Wood Highlights */}
      <div className="absolute inset-0 border-[6px] sm:border-[8px] border-amber-400/30 rounded-2xl sm:rounded-[2rem] pointer-events-none" />

      {/* Nails */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] z-10" />
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] z-10" />
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] z-10" />
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.2)] z-10" />

      {/* Inner Crate Floor */}
      <div className="relative z-10 w-full h-full rounded-xl sm:rounded-2xl bg-amber-50 shadow-[inset_0_4px_15px_rgba(0,0,0,0.2)] p-2 sm:p-4 border border-amber-900/30">
        
        {/* Slats texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 z-0 rounded-[inherit] overflow-hidden"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(217,119,6,0.3), rgba(217,119,6,0.3) 2px, transparent 2px, transparent 20%)" }} 
        />

        {/* Unified grid strictly for fruits */}
        <div
          className="gap-2 sm:gap-3 md:gap-4 relative z-10 w-full h-full"
          style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {grid.map((row, rowIdx) => {
            const rowLabel = ROW_LABELS[rowIdx];
            const isRowActive = activeRowLabel === rowLabel;

            return (
              <Fragment key={rowIdx}>
                {row.map((fruit, colIdx) => {
                  const coordinate = `${ROW_LABELS[rowIdx]}${colIdx + 1}`;
                  const isFound = foundCoordinates.includes(coordinate);
                  const isHighlighted = highlightCoordinate === coordinate;
                  const isActiveCol = activeColNumber === colIdx + 1;

                  const delayStr = `${(rowIdx * gridSize + colIdx) * 40}ms`;

                  return (
                    <div 
                      key={`${rowIdx}-${colIdx}`} 
                      className="relative w-full aspect-square flex items-center justify-center animate-fruit-pop"
                      style={{ animationDelay: delayStr }}
                    >
                      
                      {/* Column Badge (Only top row) */}
                      {rowIdx === 0 && (
                        <div 
                          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] sm:-translate-y-[calc(100%+1rem)] z-30 transition-transform duration-200" 
                          style={{ margin: 0, transform: `translate(-50%, ${isActiveCol ? 'calc(-100% - 1rem)' : 'calc(-100% - 0.5rem)'}) scale(${isActiveCol ? 1.2 : 1})` }}
                        >
                          <div 
                            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-base md:text-lg transition-colors duration-200
                              ${isActiveCol ? LABEL_COLORS[colIdx].active + " shadow-lg" : LABEL_COLORS[colIdx].passive + " shadow-md"}
                            `}
                          >
                            {colIdx + 1}
                          </div>
                        </div>
                      )}

                      {/* Row Badge (Only first column) */}
                      {colIdx === 0 && (
                        <div 
                          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] sm:-translate-x-[calc(100%+1rem)] z-30 transition-transform duration-200" 
                          style={{ margin: 0, transform: `translate(${isRowActive ? 'calc(-100% - 1rem)' : 'calc(-100% - 0.5rem)'}, -50%) scale(${isRowActive ? 1.2 : 1})` }}
                        >
                          <div 
                            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-base md:text-lg transition-colors duration-200
                              ${isRowActive ? LABEL_COLORS[rowIdx].active + " shadow-lg" : LABEL_COLORS[rowIdx].passive + " shadow-md"}
                            `}
                          >
                            {ROW_LABELS[rowIdx]}
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (!disabled && !isFound && onCellClick) onCellClick(coordinate);
                        }}
                        onPointerEnter={() => { if (interactiveHighlight) setActiveCell(coordinate) }}
                        onPointerDown={() => { if (interactiveHighlight) setActiveCell(coordinate) }}
                        onPointerLeave={() => setActiveCell(null)}
                        onPointerUp={() => setActiveCell(null)}
                        onPointerCancel={() => setActiveCell(null)}
                        className={`
                      w-full h-full absolute inset-0 flex flex-col items-center justify-center
                      rounded-xl sm:rounded-[1.25rem] md:rounded-[1.5rem] p-0.5 sm:p-1
                      ${interactiveHighlight && activeCell === coordinate && !isFound && !isHighlighted ? "bg-amber-50 ring-2 ring-amber-200 z-10 scale-105" : ""}
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
                      <div className={`flex-1 flex items-center justify-center w-full min-h-0 transition-transform duration-300 ${isFound ? "scale-110" : "scale-100"}`}>
                        <span
                          className={`
                            ${gridSize >= 5 ? "text-3xl sm:text-4xl md:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl md:text-5xl lg:text-6xl"} 
                            select-none drop-shadow-md block
                          `}
                        >
                          {fruit}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}

