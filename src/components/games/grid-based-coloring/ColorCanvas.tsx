"use client";

import { useState, useCallback, useRef } from "react";
import { Palette } from "lucide-react";

interface ColorCanvasProps {
  gridSize: number;
  canvas: (string | null)[][];
  selectedColor: string | null;
  disabled: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellDrag: (row: number, col: number) => void;
}

export function ColorCanvas({
  gridSize,
  canvas,
  selectedColor,
  disabled,
  onCellClick,
  onCellDrag,
}: ColorCanvasProps) {
  const [isPainting, setIsPainting] = useState(false);
  const lastCellRef = useRef<string | null>(null);

  const cellSize = gridSize <= 5 ? "w-10 h-10 sm:w-12 sm:h-12" :
    gridSize <= 6 ? "w-9 h-9 sm:w-11 sm:h-11" :
      "w-8 h-8 sm:w-10 sm:h-10";

  const handlePointerDown = useCallback(
    (row: number, col: number) => {
      if (disabled) return;
      setIsPainting(true);
      lastCellRef.current = `${row}-${col}`;
      onCellClick(row, col);
    },
    [disabled, onCellClick]
  );

  const handlePointerEnter = useCallback(
    (row: number, col: number) => {
      if (!isPainting || disabled) return;
      const key = `${row}-${col}`;
      if (lastCellRef.current === key) return;
      lastCellRef.current = key;
      onCellDrag(row, col);
    },
    [isPainting, disabled, onCellDrag]
  );

  const handlePointerUp = useCallback(() => {
    setIsPainting(false);
    lastCellRef.current = null;
  }, []);

  return (
    <div className="relative rounded-2xl p-4 sm:p-5 w-full overflow-hidden bg-[#1E293B]">
      {/* Subtle animated glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#AACE30]/10 blur-3xl canvas-glow" />

      {/* Header */}
      <div className="relative flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#AACE30]/15 flex items-center justify-center">
          <Palette className="w-4.5 h-4.5 text-[#AACE30]" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
          Your Canvas
        </h3>
        {selectedColor && (
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: selectedColor }} />
            <span className="text-[10px] text-white/40 font-mono">{selectedColor}</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="relative flex justify-center">
        <div
          className="inline-grid gap-[2px] bg-slate-700/50 border border-slate-600/50 rounded-xl overflow-hidden select-none"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            touchAction: "none",
          }}
          onMouseLeave={handlePointerUp}
          onMouseUp={handlePointerUp}
          onTouchEnd={handlePointerUp}
        >
          {canvas.map((row, rowIdx) =>
            row.map((cellColor, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlePointerDown(rowIdx, colIdx);
                }}
                onMouseEnter={() => handlePointerEnter(rowIdx, colIdx)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handlePointerDown(rowIdx, colIdx);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (el) {
                    const cellKey = el.getAttribute("data-cell");
                    if (cellKey && cellKey !== lastCellRef.current) {
                      const [r, c] = cellKey.split("-").map(Number);
                      lastCellRef.current = cellKey;
                      onCellDrag(r, c);
                    }
                  }
                }}
                data-cell={`${rowIdx}-${colIdx}`}
                className={`
                                    ${cellSize} transition-all duration-100 relative
                                    ${!disabled ? "cursor-pointer hover:brightness-110" : "cursor-not-allowed"}
                                    ${cellColor ? "cell-painted" : ""}
                                `}
                style={{
                  backgroundColor: cellColor || "#F8FAFC",
                }}
              />
            ))
          )}
        </div>
      </div>

      <style>{`
                @keyframes canvasGlow {
                    0%, 100% { opacity: 0.3; transform: translate(0, 0); }
                    50% { opacity: 0.6; transform: translate(10px, 10px); }
                }
                .canvas-glow { animation: canvasGlow 6s ease-in-out infinite; }
                .cell-painted { animation: cellPop 0.15s ease-out; }
                @keyframes cellPop {
                    0% { transform: scale(0.85); }
                    60% { transform: scale(1.08); }
                    100% { transform: scale(1); }
                }
            `}</style>
    </div>
  );
}
