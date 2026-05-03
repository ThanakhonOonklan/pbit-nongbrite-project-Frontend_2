"use client";

import { useEffect, useState } from "react";
import { ShapeIcon } from "@/components/games/counting-classification/ShapeIcon";
import {
    SHAPE_COLORS, SHAPE_LABELS,
    type ShapeType,
} from "@/constants/games/counting-classification-levels";
import type { TutorialStep } from "../TutorialModal";


const DEMO_ROWS: { type: ShapeType; answer: number }[] = [
    { type: "circle", answer: 4 },
    { type: "triangle", answer: 2 },
    { type: "square", answer: 1 },
];

/* ── Step 1: ShapeIcon floating, no background ─────────────────── */
const FLOAT_SHAPES: { type: ShapeType; size: number; top: string; left: string; dur: string; delay: string; rot: number }[] = [
    { type: "circle", size: 56, top: "8%", left: "10%", dur: "3.2s", delay: "0s", rot: 0 },
    { type: "triangle", size: 52, top: "12%", left: "62%", dur: "2.8s", delay: "0.4s", rot: 15 },
    { type: "circle", size: 48, top: "48%", left: "78%", dur: "3.5s", delay: "0.8s", rot: 0 },
    { type: "square", size: 54, top: "55%", left: "22%", dur: "2.6s", delay: "0.2s", rot: -12 },
    { type: "circle", size: 50, top: "70%", left: "55%", dur: "3.0s", delay: "1.0s", rot: 0 },
    { type: "triangle", size: 46, top: "32%", left: "40%", dur: "2.9s", delay: "0.6s", rot: -8 },
    { type: "circle", size: 44, top: "18%", left: "85%", dur: "3.3s", delay: "1.2s", rot: 0 },
];

function Step1Scene() {
    return (
        <div className="relative w-full" style={{ height: 220 }}>
            {FLOAT_SHAPES.map((s, i) => (
                <div key={i} className="absolute"
                    style={{
                        top: s.top, left: s.left,
                        transform: `translate(-50%,-50%) rotate(${s.rot}deg)`,
                        filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.18))",
                        animation: `ccFloatShape ${s.dur} ease-in-out infinite`,
                        animationDelay: s.delay,
                    }}>
                    <ShapeIcon type={s.type} size={s.size} hoverable />
                </div>
            ))}
            <style>{`
                @keyframes ccFloatShape {
                    0%,100% { transform: translate(-50%,-50%) translateY(0px) rotate(var(--r,0deg)); }
                    50%     { transform: translate(-50%,-50%) translateY(-10px) rotate(var(--r,0deg)); }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: Real ShapeIcon counter rows + auto-increment ──────── */
function Step2Counters() {
    const [counts, setCounts] = useState<Record<ShapeType, number>>({
        circle: 0, triangle: 0, square: 0, pentagon: 0, hexagon: 0,
    });
    const [pressing, setPressing] = useState<ShapeType | null>(null);

    useEffect(() => {
        let alive = true;
        const seq: ShapeType[] = [
            "circle", "circle", "circle", "circle", "triangle", "triangle", "square",
        ];
        let idx = 0;
        const doNext = () => {
            if (!alive) return;
            if (idx >= seq.length) {
                setTimeout(() => {
                    if (!alive) return;
                    setCounts({ circle: 0, triangle: 0, square: 0, pentagon: 0, hexagon: 0 });
                    idx = 0;
                    setTimeout(doNext, 600);
                }, 2500);
                return;
            }
            const type = seq[idx++];
            setPressing(type);
            setTimeout(() => {
                if (!alive) return;
                setPressing(null);
                setCounts(c => ({ ...c, [type]: c[type] + 1 }));
                setTimeout(doNext, 500);
            }, 300);
        };
        const t = setTimeout(doNext, 800);
        return () => { alive = false; clearTimeout(t); };
    }, []);

    return (
        <div className="flex flex-col gap-2 w-full max-w-[400px]">
            {DEMO_ROWS.map(({ type }) => {
                const color = SHAPE_COLORS[type];
                const label = SHAPE_LABELS[type];
                const value = counts[type];
                const ip = pressing === type;
                return (
                    <div key={type} className="flex items-center gap-3 px-3 py-2.5 rounded-[24px]"
                        style={{ background: "#FFFAF4", boxShadow: "0 4px 10px rgba(0,0,0,0.06),inset 0 2px 0 rgba(255,255,255,1)" }}>
                        <div className="flex items-center justify-center shrink-0 rounded-[18px] w-14 h-14"
                            style={{ background: `${color}33` }}>
                            <ShapeIcon type={type} size={38} className="drop-shadow-sm" hoverable />
                        </div>
                        <span className="flex-1 text-base font-black select-none" style={{ color: "#5C4D5D" }}>
                            {label}
                        </span>
                        <div className="flex items-center gap-2 shrink-0 pr-1">
                            <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center"
                                style={{ background: "#E2E8F0", boxShadow: "0 4px 0 #CBD5E1" }}>
                                <span className="font-black text-gray-400" style={{ fontSize: 26, lineHeight: 1 }}>−</span>
                            </div>
                            <div className="w-[46px] h-[46px] rounded-[16px] flex items-center justify-center text-xl font-black text-white transition-transform duration-150"
                                style={{ background: color, boxShadow: "0 2px 6px rgba(0,0,0,0.15)", transform: ip ? "scale(1.28)" : "scale(1)" }}>
                                {value}
                            </div>
                            <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center transition-all duration-150"
                                style={{ background: ip ? "#66BB6A" : "#81C784", boxShadow: ip ? "0 0px 0 #66BB6A" : "0 4px 0 #66BB6A", transform: ip ? "translateY(4px) scale(0.9)" : "scale(1)" }}>
                                <span className="font-black text-white" style={{ fontSize: 26, lineHeight: 1 }}>+</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Step 3: Filled rows + animated submit ────────────────────── */
function Step3Submit() {
    const [phase, setPhase] = useState<"idle" | "checking" | "correct">("idle");

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setPhase("idle");
            setTimeout(() => { if (alive) setPhase("checking"); }, 1400);
            setTimeout(() => { if (alive) setPhase("correct"); }, 2400);
            setTimeout(() => { if (alive) cycle(); }, 4600);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    const bg = phase === "correct" ? "#16A34A" : phase === "checking" ? "#F59E0B" : "#22C55E";
    const sh = phase === "correct" ? "#15803D" : phase === "checking" ? "#D97706" : "#16A34A";

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-[400px]">
            {DEMO_ROWS.map(({ type, answer }) => {
                const color = SHAPE_COLORS[type];
                return (
                    <div key={type} className="flex items-center gap-3 px-3 py-2.5 rounded-[24px] w-full"
                        style={{ background: "#FFFAF4", boxShadow: "0 4px 10px rgba(0,0,0,0.06),inset 0 2px 0 rgba(255,255,255,1)" }}>
                        <div className="flex items-center justify-center shrink-0 rounded-[18px] w-12 h-12"
                            style={{ background: `${color}33` }}>
                            <ShapeIcon type={type} size={32} className="drop-shadow-sm" hoverable />
                        </div>
                        <span className="flex-1 text-base font-black select-none" style={{ color: "#5C4D5D" }}>
                            {SHAPE_LABELS[type]}
                        </span>
                        <div className="w-[46px] h-[46px] rounded-[16px] flex items-center justify-center text-xl font-black text-white mr-1"
                            style={{ background: color, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
                            {answer}
                        </div>
                    </div>
                );
            })}

            <button className="flex items-center gap-2 px-8 py-3 rounded-2xl text-white font-extrabold text-base transition-all duration-300 mt-1"
                style={{
                    background: bg,
                    boxShadow: `0 4px 0 ${sh}`,
                    transform: phase === "checking" ? "translateY(4px) scale(0.97)" : phase === "correct" ? "scale(1.06)" : "scale(1)",
                    animation: phase === "idle" ? "ccBtnPulse 1.2s ease-in-out infinite" : "none",
                }}>
                {phase === "correct" ? "✅ ถูกต้อง!" : phase === "checking" ? "⏳ กำลังตรวจ..." : "✓ ส่งคำตอบ"}
            </button>

            <style>{`
                @keyframes ccBtnPulse {
                    0%,100% { box-shadow: 0 4px 0 #16A34A; }
                    50%     { box-shadow: 0 4px 0 #16A34A, 0 0 18px rgba(34,197,94,0.4); transform: scale(1.03); }
                }
            `}</style>
        </div>
    );
}

export const countingClassificationTutorialSteps: TutorialStep[] = [
    {
        title: "มองหารูปทรงในภาพ",
        content: <Step1Scene />,
        hint: "มองหารูปทรงต่างๆ ที่ลอยอยู่ในฉาก แล้วนับจำนวนแต่ละแบบ",
    },
    {
        title: "กด + เพื่อนับจำนวน",
        content: <Step2Counters />,
        hint: "กด + บนแถวของแต่ละรูปทรงเพื่อเพิ่มจำนวนที่นับได้",
    },
    {
        title: "ส่งคำตอบ",
        content: <Step3Submit />,
        hint: "เมื่อนับครบทุกรูปทรงแล้ว กดส่งคำตอบเพื่อตรวจ!",
    },
];
