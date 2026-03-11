"use client";

import { Eye } from "lucide-react";

interface ReferenceGridProps {
  gridSize: number;
  pattern: (string | null)[][];
  isHidden?: boolean;
  onPeek?: () => void;
  peekCount?: number;
  maxPeeks?: number;
  isMemorizing?: boolean;
  timeLeft?: number;
  isPeeking?: boolean;
}

export function ReferenceGrid({ 
  gridSize, 
  pattern,
  isHidden = false,
  onPeek,
  peekCount = 0,
  maxPeeks = 3,
  isMemorizing = false,
  timeLeft = 0,
  isPeeking = false
}: ReferenceGridProps) {
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

  const canPeek = peekCount < maxPeeks;
  const isPenaltyPeek = peekCount > 0;

  return (
    <div className="relative rounded-3xl p-4 sm:p-5 w-full overflow-hidden bg-white/90 shadow-xl border-2 border-white backdrop-blur-sm">
      {/* Subtle animated glow */}
      <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-[#AACE30]/30 blur-3xl ref-glow" />

      {/* Header */}
      <div className="relative flex items-center gap-2 sm:gap-3 mb-5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#AACE30]/15 flex items-center justify-center shadow-inner">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#8BB422]" />
        </div>
        <h3 className="text-sm sm:text-xl font-extrabold text-gray-700 tracking-wide truncate">
          รูปต้นแบบ
        </h3>
        
        {/* Peek Button */}
        {isHidden && !isMemorizing && !isPeeking && onPeek && (
          <button
            onClick={onPeek}
            disabled={!canPeek}
            className={`ml-auto flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-bold transition-all
              ${canPeek 
                ? isPenaltyPeek 
                  ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 shadow-sm" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 shadow-sm"
                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
            title={canPeek ? (isPenaltyPeek ? "หัก 1 ผิดพลาด" : "ดูฟรีครั้งแรก") : "หมดโควต้าดูแล้ว"}
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">ดูรูป</span> ({peekCount}/{maxPeeks})
          </button>
        )}
        
        {!isHidden && !isMemorizing && !isPeeking && (
           <span className="ml-auto text-xs font-bold text-[#8BB422] bg-[#AACE30]/10 px-3 py-1 rounded-full border border-[#AACE30]/20 shadow-sm shrink-0">
             {coloredCount} ช่อง
           </span>
        )}
      </div>

      {/* Grid with subtle float animation */}
      <div className="relative flex justify-center ref-float">
        <div
          className="inline-grid gap-[2px] bg-slate-200/60 border-2 border-slate-300/60 rounded-xl overflow-hidden shadow-md relative"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {/* Overlay for timer during memorize/peek phase */}
          {(isMemorizing || isPeeking) && (
             <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center rounded-xl flex-col">
                <span className="text-4xl sm:text-6xl font-black text-white drop-shadow-lg tabular-nums animate-pulse">
                   {timeLeft}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white/90 drop-shadow-md mt-1">
                   {isMemorizing ? "จดจำรูปภาพ" : "แอบดู..."}
                </span>
             </div>
          )}

          {pattern.map((row, rowIdx) =>
            row.map((cellColor, colIdx) => (
              <div
                key={`ref-${rowIdx}-${colIdx}`}
                className={`${cellSize} flex items-center justify-center`}
                style={{
                  backgroundColor: isHidden ? "#f8fafc" : (cellColor || "#ffffff"), // slate-50 if hidden
                }}
              >
                  {isHidden && (
                      <span className="text-xs text-slate-300 font-black opacity-30">?</span>
                  )}
              </div>
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
