"use client";

import { TiltButton } from "react-tilt-button";
import { type ShapeType } from "@/constants/games/counting-classification-levels";
import { CounterRow } from "./CounterRow";
import { FaPlay } from "react-icons/fa";

interface CounterPanelProps {
    shapeTypes: ShapeType[];
    counts: Record<ShapeType, number>;
    maxPerShape?: number;
    onCountChange: (type: ShapeType, newValue: number) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

export function CounterPanel({
    shapeTypes,
    counts,
    maxPerShape = 30,
    onCountChange,
    onSubmit,
    disabled = false,
}: CounterPanelProps) {
    return (
        <div className="flex flex-col gap-3 h-full">

            {/* Header */}
            <div className="flex items-center justify-center gap-2 py-1">
                <span className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                    ใส่จำนวนรูปทรงที่นับได้
                </span>
            </div>



            {/* Counter rows */}
            <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pr-1 pb-1">
                {shapeTypes.map((type) => (
                    <CounterRow
                        key={type}
                        type={type}
                        value={counts[type] ?? 0}
                        maxValue={maxPerShape}
                        onIncrement={() => onCountChange(type, (counts[type] ?? 0) + 1)}
                        onDecrement={() => onCountChange(type, Math.max(0, (counts[type] ?? 0) - 1))}
                        disabled={disabled}
                    />
                ))}
            </div>

            {/* Submit button */}
            <div className="pt-1">
                <TiltButton
                    width="100%"
                    height={50} // slightly smaller base height
                    elevation={7}
                    pressInset={5}
                    tilt={0.5}
                    radius={28}
                    motion={60}
                    surfaceColor="#FF6B9D"
                    sideColor="#C2185B"
                    textColor="#ffffff"
                    onClick={onSubmit}
                    disabled={disabled}
                >
                    <span className="font-extrabold text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 drop-shadow-sm">
                        <FaPlay className="w-4 h-4" /> ยืนยัน!
                    </span>
                </TiltButton>
            </div>
        </div>
    );
}
