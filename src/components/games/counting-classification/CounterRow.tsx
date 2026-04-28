"use client";

import { useRef } from "react";
import { TiltButton } from "react-tilt-button";
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

    // refs เพื่อให้ setTimeout closure อ่านค่าล่าสุดได้เสมอ
    const canDecRef = useRef(canDec);
    canDecRef.current = canDec;
    const canIncRef = useRef(canInc);
    canIncRef.current = canInc;

    const decTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const incTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── hold-to-repeat — สร้าง start/stop สำหรับแต่ละปุ่ม ────────────
    const makeHold = (
        action: () => void,
        canRef: { current: boolean },
        timerRef: { current: ReturnType<typeof setTimeout> | null },
    ) => {
        const schedule = (count: number) => {
            const delay = count === 0 ? 400 : count > 15 ? 40 : count > 7 ? 80 : count > 3 ? 120 : 150;
            timerRef.current = setTimeout(() => {
                if (!canRef.current) return;
                action();
                schedule(count + 1);
            }, delay);
        };
        const start = () => {
            if (!canRef.current) return;
            action();
            schedule(0);
        };
        const stop = () => {
            if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
        };
        return { start, stop };
    };

    const dec = makeHold(onDecrement, canDecRef, decTimerRef);
    const inc = makeHold(onIncrement, canIncRef, incTimerRef);

    return (
        <div
            className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl shadow-md"
            style={{ background: "#1E3340", border: `2px solid ${color}40` }}
        >
            {/* Shape icon */}
            <div
                className="flex items-center justify-center shrink-0 rounded-xl sm:rounded-2xl w-10 h-10 sm:w-[52px] sm:h-[52px]"
                style={{ background: `${color}22` }}
            >
                <ShapeIcon type={type} size={30} className="drop-shadow-sm sm:w-[38px] sm:h-[38px]" hoverable />
            </div>

            {/* Label */}
            <span className="flex-1 text-xs sm:text-sm font-extrabold select-none truncate pr-1 text-white">
                {label}
            </span>

            {/* Counter controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Decrement — wrapper div จับ pointer events เพราะ TiltButton ไม่ forward */}
                <div
                    onPointerDown={dec.start}
                    onPointerUp={dec.stop}
                    onPointerLeave={dec.stop}
                    onPointerCancel={dec.stop}
                    style={{ touchAction: "none", userSelect: "none" }}
                >
                    <TiltButton
                        variant="solid"
                        width={42} height={42} elevation={4} pressInset={4}
                        tilt={0.85} radius={12} motion={40}
                        surfaceColor={canDec ? "#6B7280" : "#374151"}
                        sideColor={canDec ? "#4B5563" : "#1F2937"}
                        textColor={canDec ? "#FFFFFF" : "#6B7280"}
                        glareOpacity={0} glareWidth={0}
                        disabled={!canDec}
                    >
                        <span style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>−</span>
                    </TiltButton>
                </div>

                {/* Count bubble */}
                <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-white select-none shadow-inner"
                    style={{ background: color }}
                >
                    {value}
                </div>

                {/* Increment */}
                <div
                    onPointerDown={inc.start}
                    onPointerUp={inc.stop}
                    onPointerLeave={inc.stop}
                    onPointerCancel={inc.stop}
                    style={{ touchAction: "none", userSelect: "none" }}
                >
                    <TiltButton
                        variant="solid"
                        width={42} height={42} elevation={4} pressInset={4}
                        tilt={0.85} radius={12} motion={40}
                        surfaceColor={canInc ? "#FF6B9D" : "#374151"}
                        sideColor={canInc ? "#D04E80" : "#1F2937"}
                        textColor={canInc ? "#FFFFFF" : "#6B7280"}
                        glareOpacity={0} glareWidth={0}
                        disabled={!canInc}
                    >
                        <span style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>+</span>
                    </TiltButton>
                </div>
            </div>
        </div>
    );
}
