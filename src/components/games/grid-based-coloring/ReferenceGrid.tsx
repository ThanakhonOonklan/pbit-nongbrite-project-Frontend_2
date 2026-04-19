"use client";

import { Eye, SkipForward } from "lucide-react";

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
  showPeekButton?: boolean;
  onSkip?: () => void;
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
  isPeeking = false,
  showPeekButton = false,
  onSkip,
}: ReferenceGridProps) {
  const cellSize = gridSize <= 5 ? "w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lg:w-[84px] lg:h-[84px]" :
    gridSize <= 6 ? "w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px]" :
      "w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[60px] lg:h-[60px]";

  const isUnlimited = maxPeeks >= 999;
  const canPeek = isUnlimited || peekCount < maxPeeks;
  const isPenaltyPeek = !isUnlimited && peekCount > 0;
  const isReferenceHidden = isHidden;

  return (
    <div className="relative rounded-lg p-3 sm:p-4 w-full flex-1 flex flex-col overflow-hidden bg-[#E2CDAE] border-4 border-[#8B5A2B] shadow-xl shadow-amber-900/30">

      {/* Peek button row — always render to ensure layout stability */}
      {onPeek && (
        <div className="flex justify-end mb-2 min-h-[32px]">
          <button
            onClick={onPeek}
            disabled={!canPeek || isPeeking || !isReferenceHidden}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm
              ${canPeek && !isPeeking && isReferenceHidden
                ? isPenaltyPeek
                  ? "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100"
                  : "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                : "bg-white/50 border-amber-900/10 text-amber-900/40 cursor-not-allowed"
              }
            `}
            title={!isReferenceHidden ? "กำลังแสดงรูปต้นแบบอยู่" : !canPeek ? "หมดโควต้าดูแล้ว" : isPenaltyPeek ? "ระวัง! หัก 1 คะแนน" : "ดูรูปต้นแบบ"}
          >
            <Eye className="w-4 h-4" />
            <span>ดูรูป {isUnlimited ? "∞" : `(${peekCount}/${maxPeeks})`}</span>
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 flex flex-col items-center justify-center px-1 sm:px-4">
        <div
          className="inline-grid border border-gray-300 shadow-sm overflow-hidden bg-white"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {/* Timer overlay during memorize/peek phase */}
          {(isMemorizing || isPeeking) && (
            <div
              className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center flex-col"
              style={{ gridColumn: `1 / -1`, gridRow: `1 / -1` }}
            >
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums animate-pulse drop-shadow-lg">
                {timeLeft}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white/80 mt-1 drop-shadow-md">
                {isMemorizing ? "จดจำรูปภาพ" : "จดจำ..."}
              </span>

              {isMemorizing && onSkip && (
                <button
                  onClick={onSkip}
                  className="mt-4 px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ข้าม
                </button>
              )}
            </div>
          )}

          {pattern.map((row, rowIdx) =>
            row.map((cellColor, colIdx) => (
              <div
                key={`ref-${rowIdx}-${colIdx}`}
                className={`${cellSize} flex items-center justify-center border-gray-300 ${colIdx < gridSize - 1 ? 'border-r' : ''} ${rowIdx < gridSize - 1 ? 'border-b' : ''}`}
                style={{
                  backgroundColor: isHidden ? "#ffffff" : (cellColor || "#ffffff"),
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
