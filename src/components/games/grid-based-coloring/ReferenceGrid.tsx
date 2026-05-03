"use client";

import { Eye, SkipForward } from "lucide-react";
import {
  getGridCellSizeClass,
  gridContainerClass,
  gridPanelClass,
  gridStageClass,
} from "./grid-layout";

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
  onSkip,
}: ReferenceGridProps) {
  const cellSize = getGridCellSizeClass(gridSize);

  const isUnlimited = maxPeeks >= 999;
  const canPeek = isUnlimited || peekCount < maxPeeks;
  const isPenaltyPeek = !isUnlimited && peekCount > 0;
  const isReferenceHidden = isHidden;

  return (
    <div className={gridPanelClass}>

      {/* Peek button row — always render to ensure layout stability */}
      {onPeek && (
        <div className="absolute right-3 top-3 z-50 m-1.5 sm:m-2 lg:right-4 lg:top-4">
          <button
            onClick={onPeek}
            disabled={!canPeek || isPeeking || !isReferenceHidden}
            className={`flex max-w-[34vw] items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold transition-all shadow-sm sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs
              ${canPeek && !isPeeking && isReferenceHidden
                ? isPenaltyPeek
                  ? "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100"
                  : "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                : "bg-white/50 border-amber-900/10 text-amber-900/40 cursor-not-allowed"
              }
            `}
            title={!isReferenceHidden ? "กำลังแสดงรูปต้นแบบอยู่" : !canPeek ? "หมดโควต้าดูแล้ว" : isPenaltyPeek ? "ระวัง! หัก 1 คะแนน" : "ดูรูปต้นแบบ"}
          >
            <Eye className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span>ดูรูป {isUnlimited ? "∞" : `(${peekCount}/${maxPeeks})`}</span>
          </button>
        </div>
      )}

      {/* Grid */}
      <div className={gridStageClass}>
        <div
          className={gridContainerClass}
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {/* Timer overlay during memorize/peek phase */}
          {(isMemorizing || isPeeking) && (
            <div
              className="absolute inset-0 rounded-lg bg-black/50 z-10 flex items-center justify-center flex-col"
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
