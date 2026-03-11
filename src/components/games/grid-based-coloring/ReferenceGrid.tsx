"use client";

import { Eye } from "lucide-react";

interface ReferenceGridProps {
  gridSize: number;
  pattern: (string | null)[][];
}

export function ReferenceGrid({ gridSize, pattern }: ReferenceGridProps) {
  // Same cell size as ColorCanvas for equal panel sizes
  const cellSize = gridSize <= 5 ? "w-10 h-10 sm:w-12 sm:h-12" :
    gridSize <= 6 ? "w-9 h-9 sm:w-11 sm:h-11" :
      "w-8 h-8 sm:w-10 sm:h-10";

  // Count colored cells
  let coloredCount = 0;
  for (const row of pattern) {
    for (const cell of row) {
      if (cell) coloredCount++;
    }
  }

  return (
    <div className="relative rounded-2xl p-4 sm:p-5 w-full overflow-hidden bg-[#1E293B]">
      {/* Subtle animated glow */}
      <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-amber-500/8 blur-3xl ref-glow" />

      {/* Header */}
      <div className="relative flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
          <Eye className="w-4.5 h-4.5 text-purple-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
          Reference Image
        </h3>
        <span className="ml-auto text-[10px] text-white/30 font-mono bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          {coloredCount} cells
        </span>
      </div>

      {/* Grid with subtle float animation */}
      <div className="relative flex justify-center ref-float">
        <div
          className="inline-grid gap-[2px] bg-slate-700/50 border border-slate-600/50 rounded-xl overflow-hidden shadow-xl shadow-black/30"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {pattern.map((row, rowIdx) =>
            row.map((cellColor, colIdx) => (
              <div
                key={`ref-${rowIdx}-${colIdx}`}
                className={cellSize}
                style={{
                  backgroundColor: cellColor || "#F8FAFC",

                }}
              />
            ))
          )}
        </div>
      </div>

      <style>{`
                @keyframes refGlow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                .ref-glow { animation: refGlow 5s ease-in-out infinite; }
                @keyframes refFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .ref-float { animation: refFloat 4s ease-in-out infinite; }
            `}</style>
    </div>
  );
}
