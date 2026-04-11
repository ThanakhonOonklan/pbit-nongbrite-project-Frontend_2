"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Undo2, Redo2 } from "lucide-react";

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
  /** Cells that were wrong on last check — shown with red highlight */
  wrongCells?: { row: number; col: number }[];
}



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
  wrongCells = [],
}: ColorCanvasProps) {
  const [isPainting, setIsPainting] = useState(false);
  const lastCellRef = useRef<string | null>(null);

  const cellSize = gridSize <= 5 ? "w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lg:w-[84px] lg:h-[84px]" :
    gridSize <= 6 ? "w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px]" :
      "w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[60px] lg:h-[60px]";

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
    <div className="relative rounded-2xl p-3 sm:p-4 w-full flex-1 flex flex-col overflow-hidden bg-[#1C2B32] border border-white/10">

      {/* Undo / Redo row */}
      <div className="flex items-center justify-end gap-1.5 mb-3">
        <button
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
          title="เลิกทำ"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || disabled}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
          title="ทำซ้ำ"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-1 sm:px-3">
        <div
          className="inline-grid border-2 border-[#FFAC3E] rounded-xl overflow-hidden select-none bg-white"
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
            row.map((cellColor, colIdx) => {
              const isWrong = wrongCells.some(
                (wc) => wc.row === rowIdx && wc.col === colIdx
              );
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handlePointerDown(rowIdx, colIdx);
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
                    border-gray-300
                    ${colIdx < gridSize - 1 ? 'border-r' : ''}
                    ${rowIdx < gridSize - 1 ? 'border-b' : ''}
                    ${getCursorClass()} ${!disabled ? "z-10 cell-interactive" : ""}
                    ${cellColor ? "cell-painted" : ""}
                    ${isWrong ? "cell-wrong" : ""}
                  `}
                  style={{
                    '--cell-color': cellColor || "#ffffff",
                  } as React.CSSProperties}
                >
                  {/* Removed color tooltip on hover */}
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
                .cell-painted { animation: cellGrow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                @keyframes cellGrow {
                    0% { transform: scale(0.4); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; z-index: 10; }
                }
                .cell-interactive { background-color: var(--cell-color); }

                /* 🔴 Wrong cell highlight */
                .cell-wrong {
                    box-shadow: inset 0 0 0 3px #ef4444 !important;
                    animation: cellGrow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                               wrongPulse 1.2s ease-in-out infinite 0.3s !important;
                    z-index: 5;
                }
                @keyframes wrongPulse {
                    0%, 100% { box-shadow: inset 0 0 0 3px #ef4444; }
                    50%       { box-shadow: inset 0 0 0 4px #ef4444, 0 0 8px rgba(239,68,68,0.45); }
                }

                /* Custom Cursors for Tools */
                .cursor-paint  { cursor: crosshair !important; }
                .cursor-fill {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23aace30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>') 4 20, crosshair !important;
                }
                .cursor-eraser {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23aace30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>') 4 20, crosshair !important;
                }
            `}</style>
    </div>
  );
}
