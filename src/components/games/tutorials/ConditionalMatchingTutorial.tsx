"use client";

import { useEffect, useState } from "react";
import { MatchingCard } from "@/components/games/conditional-matching/MatchingCard";
import type { TutorialStep } from "../TutorialModal";

const PAIRS = [
    { left: { emoji: "🐱", label: "ถ้าแมวหิว" }, right: { emoji: "🐟", label: "ให้กินปลา" } },
    { left: { emoji: "🐇", label: "ถ้ากระต่ายหิว" }, right: { emoji: "🥕", label: "ให้กินแครอท" } },
    { left: { emoji: "🐒", label: "ถ้าลิงหิว" }, right: { emoji: "🍌", label: "ให้กินกล้วย" } },
];

/* ── Step 1: Condition cards + responsive label ──────────────── */
function Step1Cards() {
    return (
        <div className="flex flex-col items-center gap-3">
            {/* Mobile: ด้านซ้าย, PC: ด้านบน */}
            <p className="block md:hidden text-[11px] font-bold text-orange-400 uppercase tracking-wider text-center">
                อ่านการ์ดเงื่อนไข&nbsp;<span className="text-white/80">ด้านซ้าย</span>&nbsp;และให้เข้าใจ
            </p>
            <p className="hidden md:block text-[11px] font-bold text-orange-400 uppercase tracking-wider text-center">
                อ่านการ์ดเงื่อนไข&nbsp;<span className="text-white/80">ด้านบน</span>&nbsp;และให้เข้าใจ
            </p>
            <div className="flex gap-4">
                {PAIRS.map((p, i) => (
                    <div key={i} style={{ animation: `cmCardIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both` }}>
                        <MatchingCard
                            emoji={p.left.emoji}
                            label={p.left.label}
                            align="top"
                        />
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes cmCardIn {
                    from { transform: scale(0) rotate(-8deg); opacity: 0; }
                    to   { transform: scale(1) rotate(0deg);  opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: 3 pairs (top/bottom), 1 animated vertical line ─────── */
function Step2Connect() {
    const [progress, setProgress] = useState(0);
    const [correct, setCorrect] = useState(false);

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setProgress(0); setCorrect(false);
            let p = 0;
            const iv = setInterval(() => {
                if (!alive) { clearInterval(iv); return; }
                p = Math.min(p + 5, 100);
                setProgress(p);
                if (p >= 100) {
                    clearInterval(iv);
                    setTimeout(() => { if (alive) setCorrect(true); }, 200);
                    setTimeout(() => { if (alive) cycle(); }, 2200);
                }
            }, 28);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    return (
        <div className="flex flex-col gap-2 w-full max-w-[320px]">
            {PAIRS.map((pair, i) => (
                <div key={i} className="flex items-center gap-2">
                    {/* Left card (condition) */}
                    <MatchingCard
                        emoji={pair.left.emoji}
                        label={pair.left.label}
                        align="top"
                        isConnected={i === 0 && progress > 0 && !correct}
                        isCorrect={i === 0 && correct}
                    />

                    {/* Horizontal connector — only first pair animated */}
                    {i === 0 ? (
                        <div className="flex-1 relative h-2.5 rounded-full overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.15)" }}>
                            <div className="absolute inset-y-0 left-0 rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    background: correct
                                        ? "linear-gradient(90deg,#34D399,#16A34A)"
                                        : "linear-gradient(90deg,#FB923C,#F97316)",
                                    transition: "none",
                                }} />
                        </div>
                    ) : (
                        <div className="flex-1 h-2.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.1)", border: "1.5px dashed rgba(255,255,255,0.2)" }} />
                    )}

                    {/* Right card (answer) */}
                    <MatchingCard
                        emoji={pair.right.emoji}
                        label={pair.right.label}
                        align="bottom"
                        isConnected={i === 0 && progress >= 100 && !correct}
                        isCorrect={i === 0 && correct}
                    />
                </div>
            ))}
        </div>
    );
}

/* ── Step 3: 3 connected pairs + confirm button ───────────────── */
function Step3AllCorrect() {
    const [phase, setPhase] = useState<"idle" | "checking" | "correct">("idle");

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setPhase("idle");
            setTimeout(() => { if (alive) setPhase("checking"); }, 1400);
            setTimeout(() => { if (alive) setPhase("correct"); }, 2400);
            setTimeout(() => { if (alive) cycle(); }, 4800);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    const btnBg = phase === "correct" ? "#16A34A" : phase === "checking" ? "#F59E0B" : "#F97316";
    const btnSh = phase === "correct" ? "#15803D" : phase === "checking" ? "#D97706" : "#C2410C";

    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-[320px]">
            {/* 3 pairs — each pair as a horizontal row stacked vertically */}
            <div className="flex flex-col gap-2 w-full">
                {PAIRS.map((pair, i) => (
                    <div key={i} className="flex items-center gap-2"
                        style={{ animation: `cmFadeUp 0.4s ease-out ${i * 0.1}s both` }}>
                        <MatchingCard emoji={pair.left.emoji} label={pair.left.label} align="top" isCorrect />
                        <div className="flex-1 h-2.5 rounded-full"
                            style={{
                                background: "linear-gradient(90deg,#34D399,#16A34A)",
                                boxShadow: "0 0 6px rgba(52,211,153,0.4)",
                            }} />
                        <MatchingCard emoji={pair.right.emoji} label={pair.right.label} align="bottom" isCorrect />
                    </div>
                ))}
            </div>

            {/* Confirm button */}
            <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl font-extrabold text-sm text-white transition-all duration-300 mt-1"
                style={{
                    background: btnBg,
                    boxShadow: `0 4px 0 ${btnSh}`,
                    transform: phase === "checking" ? "translateY(4px) scale(0.97)" : phase === "correct" ? "scale(1.06)" : "scale(1)",
                    animation: phase === "idle" ? "cmBtnPulse 1.2s ease-in-out infinite" : "none",
                }}
            >
                {phase === "correct" ? "✅ ถูกต้อง!" : phase === "checking" ? "⏳ กำลังตรวจ..." : "✓ ยืนยัน"}
            </button>

            <style>{`
                @keyframes cmFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes cmBtnPulse {
                    0%,100% { box-shadow: 0 4px 0 #C2410C; }
                    50%     { box-shadow: 0 4px 0 #C2410C, 0 0 16px rgba(249,115,22,0.4); transform: scale(1.03); }
                }
            `}</style>
        </div>
    );
}

export const conditionalMatchingTutorialSteps: TutorialStep[] = [
    {
        title: "อ่านการ์ดเงื่อนไข",
        content: <Step1Cards />,
        hint: 'อ่านการ์ดเงื่อนไข "ถ้า..." ให้เข้าใจก่อนเริ่มเล่น',
    },
    {
        title: "ลากเส้นโยงคู่ที่ตรงกัน",
        content: <Step2Connect />,
        hint: "ลากเส้นจากการ์ดเงื่อนไขไปหาคำตอบที่ตรงกัน",
    },
    {
        title: "โยงครบแล้วกดยืนยัน",
        content: <Step3AllCorrect />,
        hint: "เมื่อโยงครบทุกคู่แล้ว กดยืนยันเพื่อตรวจคำตอบ!",
    },
];
