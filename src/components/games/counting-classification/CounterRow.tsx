"use client";

import { type ShapeType, SHAPE_COLORS, SHAPE_LABELS } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

interface CounterRowProps {
    type: ShapeType;
    value: number;
    maxValue: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disabled?: boolean;
}

/**
 * แถวนับรูปทรงหนึ่งประเภท — ประกอบด้วย icon + ชื่อ + ปุ่ม − / ตัวเลข / ปุ่ม +
 * ปุ่มขนาดใหญ่ (48px) เหมาะสำหรับเด็กเล็ก
 */
export function CounterRow({ type, value, maxValue, onIncrement, onDecrement, disabled = false }: CounterRowProps) {
    const color = SHAPE_COLORS[type];
    const label = SHAPE_LABELS[type];
    const canDec = value > 0 && !disabled;
    const canInc = value < maxValue && !disabled;

    return (
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-white shadow-sm border border-gray-100">
            {/* Shape icon + label */}
            <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 48, height: 48, backgroundColor: `${color}22` }}
            >
                <ShapeIcon type={type} size={30} />
            </div>
            <span className="flex-1 text-sm font-semibold text-gray-700 select-none">
                {label}
            </span>

            {/* Counter controls */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Decrement */}
                <button
                    onClick={onDecrement}
                    disabled={!canDec}
                    aria-label={`ลด ${label}`}
                    className="w-12 h-12 rounded-xl text-white text-2xl font-bold flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ backgroundColor: canDec ? color : "#CBD5E0" }}
                >
                    −
                </button>

                {/* Count display */}
                <div
                    className="w-10 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold select-none"
                    style={{ color, backgroundColor: `${color}15` }}
                >
                    {value}
                </div>

                {/* Increment */}
                <button
                    onClick={onIncrement}
                    disabled={!canInc}
                    aria-label={`เพิ่ม ${label}`}
                    className="w-12 h-12 rounded-xl text-white text-2xl font-bold flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ backgroundColor: canInc ? color : "#CBD5E0" }}
                >
                    +
                </button>
            </div>
        </div>
    );
}
