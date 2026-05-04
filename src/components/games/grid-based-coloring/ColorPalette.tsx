"use client";

import { FaEraser, FaPaintBrush, FaFillDrip, FaTrashAlt, FaPlay } from "react-icons/fa";
import { Undo2, Redo2 } from "lucide-react";
import { type DrawingMode } from "./GridColoringGame";
import { TiltButton } from "react-tilt-button";

interface ColorPaletteProps {
  palette: string[];
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  drawingMode: DrawingMode;
  onSelectMode: (mode: DrawingMode) => void;
  onCheckAnswer?: () => void;
  onReset?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  isCheckDisabled?: boolean;
}

export const colorNameMap: Record<string, string> = {
  "#EF4444": "สีแดง",
  "#22C55E": "สีเขียว",
  "#8B5A2B": "สีน้ำตาล",
  "#F97316": "สีส้ม",
  "#3B82F6": "สีฟ้า",
  "#D2B48C": "สีเนื้อ",
  "#FFFFFF": "สีขาว",
  "#111827": "สีดำ",
  "#FACC15": "สีเหลือง",
  "#FCA5A5": "สีชมพูอ่อน",
  "#D4A373": "สีแทน",
  "#EC4899": "สีชมพู",
  "#6B7280": "สีเทา",
  "#14B8A6": "สีเขียวน้ำทะเล",
  "#A855F7": "สีม่วง",
};

const TOOLS: { mode: DrawingMode; icon: React.ReactNode; label: string }[] = [
  { mode: "paint", icon: <FaPaintBrush />, label: "พู่กัน" },
  { mode: "fill", icon: <FaFillDrip />, label: "เทสี" },
  { mode: "eraser", icon: <FaEraser />, label: "ยางลบ" },
];

export function ColorPalette({
  palette,
  selectedColor,
  onSelectColor,
  drawingMode,
  onSelectMode,
  onCheckAnswer,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isCheckDisabled = false,
}: ColorPaletteProps) {
  const displayPalette = palette.reduce((acc: string[], curr: string) => {
    if (!acc.some((c) => c.toLowerCase() === curr.toLowerCase())) acc.push(curr);
    return acc;
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">

      <style>{`
        @keyframes paletteItemIn {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          65%  { transform: scale(1.15) rotate(2deg);  opacity: 1; }
          100% { transform: scale(1) rotate(0deg);    opacity: 1; }
        }
      `}</style>

      {/* ── Color swatches ── */}
      {displayPalette.map((color, swatchIdx) => {
        const isActive = drawingMode === "paint" && selectedColor?.toLowerCase() === color.toLowerCase();
        const name = colorNameMap[color.toUpperCase()] || colorNameMap[color] || color;
        return (
          <button
            key={color}
            onClick={() => { onSelectColor(color); onSelectMode("paint"); }}
            title={name}
            style={{ backgroundColor: color, animation: `paletteItemIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${swatchIdx * 45}ms both` }}
            className={`
              w-12 h-12 rounded-full transition-all duration-150 active:scale-90 flex items-center justify-center shrink-0
              ${isActive
                ? "scale-110 shadow-md z-10"
                : "shadow-sm hover:scale-105 ring-1 ring-black/5"
              }
            `}
          >
            {isActive && <div className="w-5 h-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />}
          </button>
        );
      })}

      {/* ── Divider ── */}
      <div className="w-px self-stretch bg-amber-900/10 mx-1" />

      {/* ── Tool buttons ── */}
      {TOOLS.map(({ mode, label, icon }, toolIdx) => {
        const isActive = drawingMode === mode;
        return (
          <button
            key={mode}
            onClick={() => { if (mode === "eraser") onSelectColor(null); onSelectMode(mode); }}
            title={label}
            style={{ animation: `paletteItemIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${(displayPalette.length + 1 + toolIdx) * 45}ms both` }}
            className={`
              w-[3.5rem] h-[3.5rem] rounded-full border-2 flex items-center justify-center shrink-0
              transition-all duration-150 active:scale-90 shadow-sm
              ${isActive
                ? "bg-amber-100 border-amber-400 text-amber-700 scale-105"
                : "bg-white border-amber-900/10 text-amber-900/60 hover:bg-amber-50 hover:border-amber-400/40 hover:text-amber-900"
              }
            `}
          >
            <span className="text-[22px]">{icon}</span>
          </button>
        );
      })}

      {/* ── Undo / Redo ── */}
      {onUndo && (
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="เลิกทำ"
          className="w-[3.5rem] h-[3.5rem] rounded-full border-2 border-amber-900/10 bg-white hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm text-amber-900/60 hover:text-amber-900 transition-all duration-150 active:scale-90 shrink-0"
        >
          <Undo2 className="w-6 h-6" />
        </button>
      )}
      {onRedo && (
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="ทำซ้ำ"
          className="w-[3.5rem] h-[3.5rem] rounded-full border-2 border-amber-900/10 bg-white hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm text-amber-900/60 hover:text-amber-900 transition-all duration-150 active:scale-90 shrink-0"
        >
          <Redo2 className="w-6 h-6" />
        </button>
      )}

      {/* ── Reset ── */}
      {onReset && (
        <button
          onClick={onReset}
          title="ล้างทั้งหมด"
          className="w-[3.5rem] h-[3.5rem] rounded-full border-2 border-amber-900/10 bg-white hover:bg-rose-50 hover:border-rose-300 flex items-center justify-center shadow-sm text-amber-900/60 hover:text-rose-600 transition-all duration-150 active:scale-90 shrink-0"
        >
          <span className="text-xl"><FaTrashAlt /></span>
        </button>
      )}

      {/* ── Divider ── */}
      {onCheckAnswer && <div className="w-px self-stretch bg-amber-900/10 mx-1" />}

      {/* ── Submit ── */}
      {onCheckAnswer && (
        <div className={isCheckDisabled ? "opacity-50 cursor-not-allowed grayscale" : ""}>
          <TiltButton
            onClick={isCheckDisabled ? undefined : onCheckAnswer}
            variant="solid"
            width={140}
            height={46}
            elevation={isCheckDisabled ? 0 : 3}
            pressInset={isCheckDisabled ? 0 : 4}
            radius={12}
            motion={isCheckDisabled ? 0 : 100}
            surfaceColor={isCheckDisabled ? "#9CA3AF" : "#22C55E"}
            sideColor={isCheckDisabled ? "#6B7280" : "#16A34A"}
            textColor="#ffffff"
            borderColor="transparent"
            borderWidth={0}
            style={{ pointerEvents: isCheckDisabled ? 'none' : 'auto' }}
          >
            <span className="font-bold text-base flex items-center justify-center gap-2 drop-shadow-sm">
              <FaPlay className="w-4 h-4" /> ยืนยัน!
            </span>
          </TiltButton>
        </div>
      )}
    </div>
  );
}
