"use client";

import { FaEraser, FaPaintBrush, FaFillDrip, FaTrashAlt } from "react-icons/fa";
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
  isCheckDisabled = false,
}: ColorPaletteProps) {
  const displayPalette = palette.reduce((acc: string[], curr: string) => {
    if (!acc.some((c) => c.toLowerCase() === curr.toLowerCase())) acc.push(curr);
    return acc;
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">

      {/* ── Color swatches ── */}
      {displayPalette.map((color) => {
        const isActive = drawingMode === "paint" && selectedColor?.toLowerCase() === color.toLowerCase();
        const name = colorNameMap[color.toUpperCase()] || colorNameMap[color] || color;
        return (
          <button
            key={color}
            onClick={() => { onSelectColor(color); onSelectMode("paint"); }}
            title={name}
            style={{ backgroundColor: color }}
            className={`
              w-11 h-11 rounded-xl border-2 transition-all duration-150 active:scale-90
              ${isActive
                ? "border-[#FFAC3E] scale-110 shadow-[0_0_0_3px_rgba(255,172,62,0.4)]"
                : "border-transparent hover:border-[#FFAC3E]/60 hover:scale-105"
              }
            `}
          />
        );
      })}

      {/* ── Divider ── */}
      <div className="w-px self-stretch bg-white/10 mx-1" />

      {/* ── Tool buttons ── */}
      {TOOLS.map(({ mode, label, icon }) => {
        const isActive = drawingMode === mode;
        return (
          <button
            key={mode}
            onClick={() => { if (mode === "eraser") onSelectColor(null); onSelectMode(mode); }}
            title={label}
            className={`
              w-11 h-14 rounded-xl border-2 flex flex-col items-center justify-center gap-1
              text-white transition-all duration-150 active:scale-90
              ${isActive
                ? "bg-[#FFAC3E]/20 border-[#FFAC3E] scale-105"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }
            `}
          >
            <span className="text-sm">{icon}</span>
            <span className="text-[9px] font-bold leading-none">{label}</span>
          </button>
        );
      })}

      {/* ── Reset ── */}
      {onReset && (
        <button
          onClick={onReset}
          title="ล้างทั้งหมด"
          className="w-11 h-14 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-red-500/20 hover:border-red-500/40 flex flex-col items-center justify-center gap-1 text-white/60 hover:text-red-400 transition-all duration-150 active:scale-90"
        >
          <span className="text-sm"><FaTrashAlt /></span>
          <span className="text-[9px] font-bold leading-none">ล้าง</span>
        </button>
      )}

      {/* ── Divider ── */}
      {onCheckAnswer && <div className="w-px self-stretch bg-white/10 mx-1" />}

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
            surfaceColor={isCheckDisabled ? "#9CA3AF" : "#FFAC3E"}
            sideColor={isCheckDisabled ? "#6B7280" : "#D98A1E"}
            textColor="#ffffff"
            borderColor="transparent"
            borderWidth={0}
            style={{ pointerEvents: isCheckDisabled ? 'none' : 'auto' }}
          >
            ตรวจคำตอบ
          </TiltButton>
        </div>
      )}
    </div>
  );
}
