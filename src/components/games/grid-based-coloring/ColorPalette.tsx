"use client";

import { FaEraser } from "react-icons/fa";

interface ColorPaletteProps {
  palette: string[];
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
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

export function ColorPalette({
  palette,
  selectedColor,
  onSelectColor,
}: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
        <span className="text-base">🎨</span> เลือกสีที่ต้องการ
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {palette.map((color) => {
          const isActive = selectedColor === color;
          const colorName = colorNameMap[color.toUpperCase()] || colorNameMap[color] || color;
          return (
            <button
              key={color}
              onClick={() => onSelectColor(color)}
              className={`
                                w-11 h-11 rounded-2xl transition-all duration-200
                                cursor-pointer relative group shadow-sm
                                ${isActive
                  ? "scale-110 shadow-lg ring-4 ring-offset-2 ring-offset-white"
                  : "hover:scale-105 hover:shadow-md border border-gray-200 hover:border-gray-400"
                }
                            `}
              style={{
                backgroundColor: color,
                '--tw-ring-color': isActive ? color : undefined,
                boxShadow: isActive ? `0 0 20px ${color}40, 0 4px 12px ${color}30` : undefined,
              } as React.CSSProperties}

            >
              {isActive && (
                <div className="absolute inset-0 rounded-2xl border-[3px] border-white/60" />
              )}
              {/* Tooltip */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-bold
                                text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100 z-10 pointer-events-none">
                {colorName}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-1" />

        {/* Eraser */}
        <button
          onClick={() => onSelectColor(null)}
          title="ยางลบ"
          className={`
                        w-11 h-11 rounded-2xl transition-all duration-200
                        cursor-pointer flex items-center justify-center relative shadow-sm
                        bg-gradient-to-br from-rose-400 to-rose-500
                        ${selectedColor === null
              ? "scale-110 shadow-lg ring-4 ring-offset-2 ring-offset-white ring-rose-400"
              : "hover:scale-105 hover:shadow-md border border-gray-200 hover:border-gray-400"
            }
                    `}
        >
          <FaEraser className="w-4.5 h-4.5 text-white" />
          {selectedColor === null && (
            <div className="absolute inset-0 rounded-2xl border-[3px] border-white/60" />
          )}
        </button>
      </div>

      {/* Active indicator */}
      <div className="flex items-center gap-2 h-5 pl-1">
        {selectedColor ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
              กำลังใช้สี:
            </span>
            <div className="w-3 h-3 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: selectedColor }} />
            <span className="text-xs text-gray-600 font-medium">
              {colorNameMap[selectedColor.toUpperCase()] || colorNameMap[selectedColor] || selectedColor}
            </span>
          </div>
        ) : (
          <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
            🧹 โหมดยางลบ
          </span>
        )}
      </div>
    </div>
  );
}
