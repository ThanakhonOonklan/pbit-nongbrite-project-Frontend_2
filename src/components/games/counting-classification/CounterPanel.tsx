"use client";

import { TiltButton } from "react-tilt-button";
import { type ShapeType } from "@/constants/games/counting-classification-levels";
import { CounterRow } from "./CounterRow";

interface CounterPanelProps {
    /** รูปทรงที่ต้องตอบในด่านนี้ */
    shapeTypes: ShapeType[];
    /** จำนวนที่ผู้เล่นกำหนดสำหรับแต่ละประเภท */
    counts: Record<ShapeType, number>;
    /** จำนวนสูงสุดที่กด + ได้ (รวมทุกรูปในด่าน) */
    maxPerShape?: number;
    onCountChange: (type: ShapeType, newValue: number) => void;
    onSubmit: () => void;
    disabled?: boolean;
}

/**
 * แผงตอบคำถามฝั่งขวา
 * รวม CounterRow แต่ละประเภท + ปุ่ม Submit
 */
export function CounterPanel({
    shapeTypes,
    counts,
    maxPerShape = 20,
    onCountChange,
    onSubmit,
    disabled = false,
}: CounterPanelProps) {
    return (
        <div className="flex flex-col gap-3 h-full">
            {/* Header */}
            <p className="text-center text-base font-bold text-[#3C3C3C]">
                มีรูปทรงกี่อัน? 🤔
            </p>

            {/* Counter rows */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-0.5">
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
            <TiltButton
                width="100%"
                height={56}
                elevation={6}
                pressInset={6}
                tilt={0.5}
                radius={16}
                motion={60}
                surfaceColor="#1CB0F6"
                sideColor="#0A8ED9"
                textColor="#ffffff"
                borderColor="transparent"
                borderWidth={0}
                glareOpacity={0}
                glareWidth={0}
                onClick={onSubmit}
                disabled={disabled}
            >
                <span className="font-extrabold text-base tracking-wide">
                    ✅ ส่งคำตอบ
                </span>
            </TiltButton>
        </div>
    );
}
