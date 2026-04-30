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

    // ── hold-to-repeat ────────────────────────────
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-[24px] shadow-sm mb-1"
            style={{
                background: "#FFFAF4", // Soft cream/white
                boxShadow: "0 4px 10px rgba(0,0,0,0.06), inset 0 2px 0 rgba(255,255,255,1)"
            }}
        >
            {/* Shape icon in colored square */}
            <div
                className="flex items-center justify-center shrink-0 rounded-[18px] w-14 h-14"
                style={{ 
                    // Using the shape color with some transparency for the square background
                    background: `${color}33`,
                    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6)"
                }}
            >
                <ShapeIcon type={type} size={38} className="drop-shadow-sm" hoverable />
            </div>

            {/* Label */}
            <span className="flex-1 text-base sm:text-lg font-black select-none truncate pr-1" style={{ color: "#5C4D5D" }}>
                {label}
            </span>

            {/* Counter controls */}
            <div className="flex items-center gap-2 shrink-0 pr-1">
                {/* Decrement */}
                <div
                    onPointerDown={dec.start}
                    onPointerUp={dec.stop}
                    onPointerLeave={dec.stop}
                    onPointerCancel={dec.stop}
                    style={{ touchAction: "none", userSelect: "none" }}
                >
                    <TiltButton
                        variant="solid"
                        width={46} height={46} elevation={4} pressInset={4}
                        tilt={0.85} radius={14} motion={40}
                        surfaceColor={canDec ? "#E2E8F0" : "#F1F5F9"}
                        sideColor={canDec ? "#CBD5E1" : "#E2E8F0"}
                        textColor="#FFFFFF"
                        glareOpacity={0} glareWidth={0}
                        disabled={!canDec}
                    >
                        <span style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>−</span>
                    </TiltButton>
                </div>

                {/* Count bubble */}
                <div
                    className="w-[46px] h-[46px] rounded-[16px] flex items-center justify-center text-xl font-black text-white select-none"
                    style={{ 
                        background: color,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)"
                    }}
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
                        width={46} height={46} elevation={4} pressInset={4}
                        tilt={0.85} radius={14} motion={40}
                        surfaceColor={canInc ? "#81C784" : "#E0E0E0"}
                        sideColor={canInc ? "#66BB6A" : "#C0C0C0"}
                        textColor="#FFFFFF"
                        glareOpacity={0} glareWidth={0}
                        disabled={!canInc}
                    >
                        <span style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>+</span>
                    </TiltButton>
                </div>
            </div>
        </div>
    );
}
