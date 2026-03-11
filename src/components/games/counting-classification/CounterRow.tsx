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

export function CounterRow({ type, value, maxValue, onIncrement, onDecrement, disabled = false }: CounterRowProps) {
    const color = SHAPE_COLORS[type];
    const label = SHAPE_LABELS[type];
    const canDec = value > 0 && !disabled;
    const canInc = value < maxValue && !disabled;

    return (
        <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-3xl bg-white shadow-md"
            style={{ border: `3px solid ${color}` }}
        >
            {/* Shape icon */}
            <div
                className="flex items-center justify-center shrink-0 rounded-2xl"
                style={{ width: 52, height: 52, background: `${color}22` }}
            >
                <ShapeIcon type={type} size={38} className="drop-shadow-sm" hoverable />
            </div>

            {/* Label */}
            <span className="flex-1 text-sm font-extrabold select-none" style={{ color }}>
                {label}
            </span>

            {/* Counter controls */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Decrement */}
                <button
                    onClick={onDecrement}
                    disabled={!canDec}
                    aria-label={`ลด ${label}`}
                    className="w-12 h-12 rounded-2xl text-white text-2xl font-black flex items-center justify-center select-none
                               transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                               shadow-[0_5px_0_rgba(0,0,0,0.18)] active:shadow-[0_2px_0_rgba(0,0,0,0.18)] active:translate-y-[3px]"
                    style={{ backgroundColor: canDec ? "#FC8181" : "#CBD5E0" }}
                >
                    −
                </button>

                {/* Count bubble */}
                <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl font-black text-white select-none shadow-inner"
                    style={{ background: `${color}` }}
                >
                    {value}
                </div>

                {/* Increment */}
                <button
                    onClick={onIncrement}
                    disabled={!canInc}
                    aria-label={`เพิ่ม ${label}`}
                    className="w-12 h-12 rounded-2xl text-white text-2xl font-black flex items-center justify-center select-none
                               transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                               shadow-[0_5px_0_rgba(0,0,0,0.18)] active:shadow-[0_2px_0_rgba(0,0,0,0.18)] active:translate-y-[3px]"
                    style={{ backgroundColor: canInc ? "#60D394" : "#CBD5E0" }}
                >
                    +
                </button>
            </div>
        </div>
    );
}
