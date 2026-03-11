"use client";

import { TiltButton } from "react-tilt-button";
import { type ShapeType } from "@/constants/games/counting-classification-levels";
import { CounterRow } from "./CounterRow";

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
                <span className="text-base font-extrabold text-[#D84C7B] tracking-wide">
                    นับจำนวนรูปทรง
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
                    height={60}
                    elevation={7}
                    pressInset={5}
                    tilt={0.5}
                    radius={28}
                    motion={60}
                    surfaceColor="#FF85B3"
                    sideColor="#D84C7B"
                    textColor="#ffffff"
                    onClick={onSubmit}
                    disabled={disabled}
                >
                    <span className="font-extrabold text-lg tracking-wide flex items-center justify-center gap-2 drop-shadow-sm">
                        ส่งคำตอบ!
                    </span>
                </TiltButton>
            </div>
        </div>
    );
}
