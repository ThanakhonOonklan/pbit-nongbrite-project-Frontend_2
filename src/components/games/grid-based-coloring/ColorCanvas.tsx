"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Palette, Grid, Undo2, Redo2 } from "lucide-react";

import { type DrawingMode } from "./GridColoringGame";

interface ColorCanvasProps {
  gridSize: number;
  canvas: (string | null)[][];
  selectedColor: string | null;
  disabled: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellDrag: (row: number, col: number) => void;
  drawingMode?: DrawingMode;
  onDrawEnd?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
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
  drawingMode = "paint",
  onDrawEnd,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: ColorCanvasProps) {
  const [isPainting, setIsPainting] = useState(false);
  const lastCellRef = useRef<string | null>(null);

  const cellSize = gridSize <= 5 ? "w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16" :
    gridSize <= 6 ? "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" :
      "w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12";

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
    if (!isPainting) return;
    setIsPainting(false);
    lastCellRef.current = null;
    if (onDrawEnd) onDrawEnd();
  }, [isPainting, onDrawEnd]);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  const getCursorClass = () => {
    if (disabled) return "cursor-not-allowed";
    switch (drawingMode) {
      case "fill": return "cursor-fill";
      case "eyedropper": return "cursor-eyedropper";
      case "eraser": return "cursor-eraser";
      case "paint": return "cursor-paint";
      default: return "cursor-pointer";
    }
  };

  const hoverColor = getHoverColor();

  function getHoverColor() {
    if (drawingMode === "eraser") return "#ffffff";
    return "transparent";
  }

  return (
    <div className="relative rounded-3xl p-4 sm:p-5 w-full flex-1 flex flex-col overflow-hidden bg-white/90 shadow-xl border-2 border-white backdrop-blur-sm">
      {/* Subtle animated glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#AACE30]/20 blur-3xl canvas-glow" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#AACE30]/15 flex items-center justify-center shadow-inner">
            <Palette className="w-5 h-5 text-[#8BB422]" />
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-700 tracking-wide">
            พื้นที่ระบายสี
          </h3>
          {selectedColor && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 ml-2">
              <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: selectedColor }} />
              <span className="text-xs text-gray-500 font-bold">{colorNameMap[selectedColor.toUpperCase()] || colorNameMap[selectedColor] || selectedColor}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo || disabled}
            className="p-1.5 sm:p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 transition-all"
            title="เลิกทำ"
          >
            <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo || disabled}
            className="p-1.5 sm:p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 transition-all"
            title="ทำซ้ำ"
          >
            <Redo2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-1 sm:px-4">
        <div
          className="inline-grid border-2 border-slate-800 rounded-xl overflow-hidden select-none transition-all duration-300 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] bg-white"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            touchAction: "none",
            '--hover-color': hoverColor,
          } as React.CSSProperties}
          onPointerLeave={handlePointerUp}
          onPointerUp={handlePointerUp}
          onTouchEnd={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {canvas.map((row, rowIdx) =>
            row.map((cellColor, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handlePointerDown(rowIdx, colIdx);
                  // Optional: capture pointer to ensure we don't lose events, 
                  // though relying on enter/move is usually enough inside the grid
                }}
                onPointerEnter={() => handlePointerEnter(rowIdx, colIdx)}
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
                                    border-slate-800
                                    ${colIdx < gridSize - 1 ? 'border-r' : ''}
                                    ${rowIdx < gridSize - 1 ? 'border-b' : ''}
                                    ${getCursorClass()} ${!disabled ? "z-10 cell-interactive" : ""}
                                    ${cellColor ? "cell-painted" : ""}
                                `}
                style={{
                  '--cell-color': cellColor || "#ffffff",
                } as React.CSSProperties}
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
                .cell-interactive { background-color: var(--cell-color); }
                
                /* Custom Cursors for Tools */
                .cursor-paint {
                    /* Standard crosshair cursor for painting */
                    cursor: crosshair !important;
                }
                .cursor-fill {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>') 4 20, crosshair !important;
                }
                .cursor-eraser {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>') 4 20, crosshair !important;
                }
                .cursor-eyedropper {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></svg>') 2 22, crosshair !important;
                }
            `}</style>
    </div>
  );
}
