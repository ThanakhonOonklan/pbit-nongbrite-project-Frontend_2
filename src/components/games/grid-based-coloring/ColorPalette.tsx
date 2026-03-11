"use client";

import { FaEraser } from "react-icons/fa";

interface ColorPaletteProps {
  palette: string[];
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
}

export function ColorPalette({
  palette,
  selectedColor,
  onSelectColor,
}: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-white/70 flex items-center gap-2">
        <span className="text-base">🎨</span> Color Palette
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {palette.map((color) => {
          const isActive = selectedColor === color;
          return (
            <button
              key={color}
              onClick={() => onSelectColor(color)}
              className={`
                                w-11 h-11 rounded-xl transition-all duration-200
                                cursor-pointer relative group
                                ${isActive
                  ? "scale-115 shadow-lg ring-2 ring-offset-2 ring-offset-[#1E293B]"
                  : "hover:scale-110 hover:shadow-md border-2 border-white/10 hover:border-white/30"
                }
                            `}
              style={{
                backgroundColor: color,
                '--tw-ring-color': isActive ? color : undefined,
                boxShadow: isActive ? `0 0 20px ${color}40, 0 4px 12px ${color}30` : undefined,
              } as React.CSSProperties}

            >
              {isActive && (
                <div className="absolute inset-0 rounded-xl border-2 border-white/40" />
              )}
              {/* Tooltip */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono
                                text-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {color}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" />

        {/* Eraser */}
        <button
          onClick={() => onSelectColor(null)}
          className={`
                        w-11 h-11 rounded-xl transition-all duration-200
                        cursor-pointer flex items-center justify-center relative
                        bg-gradient-to-br from-slate-500 to-slate-700
                        ${selectedColor === null
              ? "scale-115 shadow-lg ring-2 ring-offset-2 ring-offset-[#1E293B] ring-slate-400"
              : "hover:scale-110 hover:shadow-md border-2 border-white/10 hover:border-white/30"
            }
                    `}
        >
          <FaEraser className="w-4.5 h-4.5 text-white/80" />
          {selectedColor === null && (
            <div className="absolute inset-0 rounded-xl border-2 border-white/30" />
          )}
        </button>
      </div>

      {/* Active indicator */}
      <div className="flex items-center gap-2 h-5">
        {selectedColor ? (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor }} />
            <span className="text-[10px] text-white/40 font-mono">{selectedColor}</span>
          </div>
        ) : (
          <span className="text-[10px] text-white/30 flex items-center gap-1">
            🧹 Eraser mode
          </span>
        )}
      </div>
    </div>
  );
}
