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

const colorNameMap: Record<string, string> = {
  "#3B82F6": "สีฟ้า",
  "#FACC15": "สีเหลือง",
  "#EF4444": "สีแดง",
  "#22C55E": "สีเขียว",
  "#14B8A6": "สีเขียวน้ำทะเล",
  "#F97316": "สีส้ม",
  "#EC4899": "สีชมพู",
  "#A855F7": "สีม่วง",
  "#6B7280": "สีเทา",
};

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
    <div className="relative rounded-3xl p-4 sm:p-5 w-full overflow-hidden bg-white/90 shadow-xl border-2 border-white backdrop-blur-sm">
      {/* Subtle animated glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#AACE30]/20 blur-3xl canvas-glow" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#AACE30]/15 flex items-center justify-center shadow-inner">
          <Palette className="w-5 h-5 text-[#8BB422]" />
        </div>
        <h3 className="text-base sm:text-xl font-extrabold text-gray-700 tracking-wide">
          พื้นที่ระบายสี
        </h3>
        {selectedColor && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-100">
            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: selectedColor }} />
            <span className="text-xs text-gray-500 font-bold">{colorNameMap[selectedColor.toUpperCase()] || colorNameMap[selectedColor] || selectedColor}</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="relative flex justify-center">
        <div
          className="inline-grid gap-[2px] bg-slate-200/80 border-2 border-slate-300/60 rounded-xl overflow-hidden select-none shadow-md"
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
                                    ${cellSize} transition-all duration-100 relative group
                                    ${!disabled ? "cursor-pointer hover:brightness-95 hover:scale-105 z-10" : "cursor-not-allowed"}
                                    ${cellColor ? "cell-painted hover:z-30" : ""}
                                `}
                style={{
                  backgroundColor: cellColor || "#ffffff",
                }}
              >
                  {cellColor && (
                     <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold
                                text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100 pointer-events-none">
                        {colorNameMap[cellColor.toUpperCase()] || colorNameMap[cellColor] || cellColor}
                     </span>
                  )}
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
                @keyframes canvasGlow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(15px, 15px); }
                }
                .canvas-glow { animation: canvasGlow 8s ease-in-out infinite; }
                .cell-painted { animation: cellPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                @keyframes cellPop {
                    0% { transform: scale(0.9); }
                    50% { transform: scale(1.02); z-index: 20; }
                    100% { transform: scale(1); z-index: 10; }
                }
            `}</style>
    </div>
  );
}
