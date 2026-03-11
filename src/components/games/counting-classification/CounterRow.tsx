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
            className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl bg-white shadow-md"
            style={{ border: `3px solid ${color}` }}
        >
            {/* Shape icon */}
            <div
                className="flex items-center justify-center shrink-0 rounded-xl sm:rounded-2xl w-10 h-10 sm:w-[52px] sm:h-[52px]"
                style={{ background: `${color}22` }}
            >
                <ShapeIcon type={type} size={30} className="drop-shadow-sm sm:w-[38px] sm:h-[38px]" hoverable />
            </div>

            {/* Label */}
            <span className="flex-1 text-xs sm:text-sm font-extrabold select-none truncate pr-1" style={{ color }}>
                {label}
            </span>

            {/* Counter controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Decrement */}
                <button
                    onClick={onDecrement}
                    disabled={!canDec}
                    aria-label={`ลด ${label}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl text-white text-xl sm:text-2xl font-black flex items-center justify-center select-none
                               transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                               shadow-[0_4px_0_rgba(0,0,0,0.18)] sm:shadow-[0_5px_0_rgba(0,0,0,0.18)] 
                               active:shadow-[0_2px_0_rgba(0,0,0,0.18)] active:translate-y-[2px] sm:active:translate-y-[3px]"
                    style={{ backgroundColor: canDec ? "#FC8181" : "#CBD5E0" }}
                >
                    −
                </button>

                {/* Count bubble */}
                <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white select-none shadow-inner"
                    style={{ background: `${color}` }}
                >
                    {value}
                </div>

                {/* Increment */}
                <button
                    onClick={onIncrement}
                    disabled={!canInc}
                    aria-label={`เพิ่ม ${label}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl text-white text-xl sm:text-2xl font-black flex items-center justify-center select-none
                               transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                               shadow-[0_4px_0_rgba(0,0,0,0.18)] sm:shadow-[0_5px_0_rgba(0,0,0,0.18)] 
                               active:shadow-[0_2px_0_rgba(0,0,0,0.18)] active:translate-y-[2px] sm:active:translate-y-[3px]"
                    style={{ backgroundColor: canInc ? "#60D394" : "#CBD5E0" }}
                >
                    +
                </button>
            </div>
        </div>
    );
}
