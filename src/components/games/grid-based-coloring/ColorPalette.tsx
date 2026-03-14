"use client";

import { FaEraser, FaPaintBrush, FaFillDrip, FaEyeDropper } from "react-icons/fa";
import { type DrawingMode } from "./GridColoringGame";
import { TiltButton } from "react-tilt-button";

interface ColorPaletteProps {
  palette: string[];
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  drawingMode: DrawingMode;
  onSelectMode: (mode: DrawingMode) => void;
  onCheckAnswer?: () => void;
}

const colorNameMap: Record<string, string> = {
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
  "#D4A373": "สีเนื้อ",
  "#EC4899": "สีชมพู",
  "#6B7280": "สีเทา",
};

export function ColorPalette({
  palette,
  selectedColor,
  onSelectColor,
  drawingMode,
  onSelectMode,
  onCheckAnswer,
}: ColorPaletteProps) {
  const displayPalette = palette.reduce((acc: string[], curr: string) => {
    if (!acc.some(c => c.toLowerCase() === curr.toLowerCase())) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div className="clay-palette-wrapper">
      <div className="clay-slab">
        <div className="clay-palette-items">
          {displayPalette.map((color) => {
            const isActive = selectedColor?.toLowerCase() === color.toLowerCase();
            const colorName =
              colorNameMap[color.toUpperCase()] ||
              colorNameMap[color] ||
              colorNameMap[color.toLowerCase()] ||
              color;
            return (
              <button
                key={color}
                onClick={() => onSelectColor(color)}
                className={`item-color ${isActive ? "item-color--active" : ""}`}
                style={{ "--color": color } as React.CSSProperties}
                aria-label={colorName}
                data-color-name={colorName}
              />
            );
          })}

          {/* Divider */}
          <div className="clay-divider" />

          {/* Tools Area */}
          <div className="clay-tools-group">
            {/* Paint */}
            <button
              onClick={() => onSelectMode("paint")}
              className={`item-color item-tool ${drawingMode === "paint" ? "item-color--active" : ""}`}
              style={{ "--color": "#9ca3af" } as React.CSSProperties}
              aria-label="พู่กัน"
              data-color-name="พู่กัน"
            >
              <FaPaintBrush className="tool-icon" />
            </button>

            {/* Fill */}
            <button
              onClick={() => onSelectMode("fill")}
              className={`item-color item-tool ${drawingMode === "fill" ? "item-color--active" : ""}`}
              style={{ "--color": "#9ca3af" } as React.CSSProperties}
              aria-label="เทสี"
              data-color-name="เทสี"
            >
              <FaFillDrip className="tool-icon" />
            </button>
            {/* Eraser */}
            <button
              onClick={() => {
                onSelectColor(null);
                onSelectMode("eraser");
              }}
              className={`item-color item-tool ${drawingMode === "eraser" || selectedColor === null ? "item-color--active" : ""}`}
              style={{ "--color": "#9ca3af" } as React.CSSProperties}
              aria-label="ยางลบ"
              data-color-name="ยางลบ"
            >
              <FaEraser className="tool-icon" />
            </button>
          </div>

          {onCheckAnswer && (
            <>
              <div className="clay-divider" />
              <div className="flex items-center">
                <TiltButton
                  onClick={onCheckAnswer}
                  variant="solid"
                  width={140}
                  height={46}
                  elevation={3}
                  pressInset={4}
                  radius={23}
                  motion={100}
                  surfaceColor="#84cc16"
                  sideColor="#4d7c0f"
                  textColor="#ffffff"
                  borderColor="transparent"
                  borderWidth={0}
                >
                  ✓ ส่ง
                </TiltButton>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .clay-palette-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .clay-slab {
          width: 100%;
          padding: 0.85rem;
          border-radius: 28px;
          background: #FCFDF8;
        }

        .clay-palette-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .item-color {
          position: relative;
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border: none;
          outline: none;
          cursor: pointer;
          background-color: var(--color);
          border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
          transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow:
            4px 4px 8px rgba(160, 160, 160, 0.6),
            -4px -4px 8px rgba(255, 255, 255, 0.8),
            inset 2px 2px 4px color-mix(in srgb, var(--color) 80%, black),
            inset -2px -2px 4px color-mix(in srgb, var(--color) 80%, white);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-color::before {
          position: absolute;
          content: attr(data-color-name);
          left: 50%;
          bottom: 120%;
          transform: translateX(-50%) scale(0);
          padding: 6px 10px;
          background: #e7e7e7;
          border-radius: 16px;
          font-size: 12px;
          color: #555;
          white-space: nowrap;
          box-shadow:
            inset 2px 2px 4px #c5c5c5,
            inset -2px -2px 4px #ffffff;
          pointer-events: none;
          opacity: 0;
          transform-origin: bottom center;
          transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 20;
          font-family: "Quicksand", sans-serif;
        }

        .item-color:hover {
          transform: translateY(-5px) scale(1.05);
          border-radius: 50%;
        }

        .item-color:hover::before {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        .item-color:active {
          transform: translateY(2px) scale(0.95);
          box-shadow:
            1px 1px 4px rgba(160, 160, 160, 0.6),
            -1px -1px 4px rgba(255, 255, 255, 0.8),
            inset 8px 8px 16px color-mix(in srgb, var(--color) 80%, black),
            inset -8px -8px 16px color-mix(in srgb, var(--color) 80%, white);
        }

        /* Active / selected state */
        .item-color--active {
          transform: translateY(-3px) scale(1.1);
          border-radius: 50%;
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.15),
            inset 4px 4px 8px color-mix(in srgb, var(--color) 80%, black),
            inset -4px -4px 8px color-mix(in srgb, var(--color) 80%, white);
        }

        .item-color--active::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 3px solid var(--color);
          opacity: 0.5;
          animation: clayPulse 1.5s ease-in-out infinite;
        }

        /* Icons */
        .tool-icon {
          width: 18px;
          height: 18px;
          color: white;
          pointer-events: none;
        }

        .clay-divider {
          width: 2px;
          min-height: 46px;
          background: rgba(0,0,0,0.06);
          border-radius: 4px;
          margin: 0 4px;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.8),
                      inset -1px -1px 2px rgba(0,0,0,0.05);
        }

        .clay-tools-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Active indicator below */
        .clay-active-indicator {
          padding-left: 4px;
          min-height: 20px;
        }

        .clay-active-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #555;
        }

        .clay-active-label--eraser {
          color: #f87171;
        }

        .clay-active-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
        }

        .clay-active-name {
          color: #666;
          font-weight: 500;
        }

        @keyframes clayPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
