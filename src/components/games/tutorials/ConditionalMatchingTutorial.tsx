"use client";

import { useEffect, useState } from "react";
import { MatchingCard } from "@/components/games/conditional-matching/MatchingCard";
import type { TutorialStep } from "../TutorialModal";

const PAIRS = [
    { left: { emoji: "🐱", label: "ถ้าแมวหิว" }, right: { emoji: "🐟", label: "ให้กินปลา" } },
    { left: { emoji: "🐇", label: "ถ้ากระต่ายหิว" }, right: { emoji: "🥕", label: "ให้กินแครอท" } },
    { left: { emoji: "🐒", label: "ถ้าลิงหิว" }, right: { emoji: "🍌", label: "ให้กินกล้วย" } },
];

/* ── Step 1: Left-side condition cards pop in ─────────────────── */
function Step1Cards() {
    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                เงื่อนไขทางซ้าย
            </p>
            <div className="flex gap-4">
                {PAIRS.map((p, i) => (
                    <div key={i} style={{ animation: `cmCardIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both` }}>
                        <MatchingCard
                            emoji={p.left.emoji}
                            label={p.left.label}
                            align="top"
                            compact
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

/* ── Step 2: Animated connection (one pair) ───────────────────── */
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
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-3 w-full max-w-[360px]">
                {/* Left card */}
                <div className="shrink-0">
                    <MatchingCard
                        emoji={PAIRS[0].left.emoji}
                        label={PAIRS[0].left.label}
                        align="top"
                        compact
                        isConnected={progress > 0 && !correct}
                        isCorrect={correct}
                    />
                </div>

                {/* Animated line */}
                <div className="flex-1 relative h-3 rounded-full overflow-hidden mx-1"
                    style={{ background: "#F3F4F6" }}>
                    <div className="absolute inset-y-0 left-0 rounded-full transition-none"
                        style={{
                            width: `${progress}%`,
                            background: correct
                                ? "linear-gradient(90deg,#34D399,#16A34A)"
                                : "linear-gradient(90deg,#FB923C,#F97316)",
                        }} />
                </div>

                {/* Right card */}
                <div className="shrink-0">
                    <MatchingCard
                        emoji={PAIRS[0].right.emoji}
                        label={PAIRS[0].right.label}
                        align="bottom"
                        compact
                        isConnected={progress >= 100 && !correct}
                        isCorrect={correct}
                    />
                </div>
            </div>

            {correct && (
                <p className="text-green-500 font-extrabold text-sm"
                    style={{ animation: "cmPop 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
                    ✅ จับคู่สำเร็จ!
                </p>
            )}

            <style>{`
                @keyframes cmPop {
                    from { transform: scale(0.5); opacity: 0; }
                    to   { transform: scale(1);   opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: All pairs correct ────────────────────────────────── */
function Step3AllCorrect() {
    return (
        <div className="flex flex-col gap-3 w-full max-w-[380px]">
            {PAIRS.map((pair, i) => (
                <div key={i} className="flex items-center gap-2"
                    style={{ animation: `cmFadeUp 0.4s ease-out ${i * 0.1}s both` }}>
                    <div className="shrink-0">
                        <MatchingCard emoji={pair.left.emoji} label={pair.left.label} align="top" compact isCorrect />
                    </div>
                    <div className="flex-1 h-2 rounded-full"
                        style={{
                            background: "linear-gradient(90deg,#34D399,#16A34A)",
                            boxShadow: "0 0 8px rgba(52,211,153,0.35)"
                        }} />
                    <span className="text-green-400 font-black text-base">✓</span>
                    <div className="shrink-0">
                        <MatchingCard emoji={pair.right.emoji} label={pair.right.label} align="bottom" compact isCorrect />
                    </div>
                </div>
            ))}
            <div className="text-center text-sm text-green-500 font-extrabold mt-1"
                style={{ animation: "cmFadeUp 0.4s ease-out 0.35s both" }}>
                🎉 จับคู่ครบทุกคู่ — ผ่านด่าน!
            </div>
            <style>{`
                @keyframes cmFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export const conditionalMatchingTutorialSteps: TutorialStep[] = [
    {
        title: "อ่านเงื่อนไขทางซ้าย",
        content: <Step1Cards />,
        hint: 'อ่านการ์ดเงื่อนไข "ถ้า..." ทางซ้ายมือให้เข้าใจก่อน',
    },
    {
        title: "ลากเส้นเชื่อมคู่ที่ตรงกัน",
        content: <Step2Connect />,
        hint: "ลากจากการ์ดซ้ายไปหาคำตอบที่ตรงกันทางขวา",
    },
    {
        title: "จับคู่ให้ครบทุกคู่",
        content: <Step3AllCorrect />,
        hint: "จับคู่เงื่อนไขทุกข้อให้ถูกต้องครบ เพื่อผ่านด่าน!",
    },
];
