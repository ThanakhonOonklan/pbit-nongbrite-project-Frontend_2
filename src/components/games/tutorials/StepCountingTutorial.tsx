"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";

/* ── Step 1: Task rows with unknown counts ───────────────────── */
function Step1Tasks() {
    const tasks = [
        { emoji: "🍊", label: "เติมน้ำส้ม",         bg: "#FFF7ED", border: "#FED7AA" },
        { emoji: "🍓", label: "ใส่สตรอว์เบอร์รี", bg: "#FFF1F2", border: "#FECDD3" },
    ];

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            {tasks.map((t, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 border-2 w-full max-w-[260px]"
                    style={{ background: t.bg, borderColor: t.border, animation: `scSlideIn ${0.15 * i + 0.2}s ease-out both` }}
                >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="text-sm font-bold text-gray-700 flex-1">{t.label}</span>
                    <div className="flex items-center gap-1">
                        <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">−</div>
                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-orange-300 flex items-center justify-center text-sm font-extrabold text-orange-600">?</div>
                        <div className="w-7 h-7 rounded-lg bg-green-400 flex items-center justify-center text-xs font-bold text-white">+</div>
                    </div>
                    <span className="text-xs font-bold text-gray-500">ครั้ง</span>
                </div>
            ))}
            <p className="text-xs text-gray-500 mt-1">ตั้งจำนวนรอบที่แต่ละงานต้องทำ</p>
            <style>{`
                @keyframes scSlideIn {
                    from { opacity: 0; transform: translateX(-16px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: + button pressed, count increases ───────────────── */
function Step2CountUp() {
    const [count, setCount] = useState(0);
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        const tick = () => {
            setFlash(true);
            setTimeout(() => {
                setFlash(false);
                setCount(c => (c >= 3 ? 0 : c + 1));
            }, 260);
        };
        const t = setInterval(tick, 900);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            <div
                className="flex items-center gap-3 rounded-2xl px-5 py-4 border-2 w-full max-w-[260px]"
                style={{ background: "#FFF7ED", borderColor: "#FED7AA" }}
            >
                <span className="text-3xl">🍊</span>
                <span className="text-sm font-bold text-gray-700 flex-1">เติมน้ำส้ม</span>
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base font-bold text-gray-400 select-none">−</div>
                    <div
                        className="w-10 h-10 rounded-xl bg-white border-2 border-amber-300 flex items-center justify-center text-xl font-extrabold text-amber-700 transition-all duration-200"
                        style={{ transform: flash ? "scale(1.25)" : "scale(1)" }}
                    >
                        {count}
                    </div>
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold text-white transition-all duration-200 select-none"
                        style={{
                            background: flash ? "#16A34A" : "#22C55E",
                            transform: flash ? "scale(0.88)" : "scale(1)",
                            boxShadow: !flash ? "0 0 10px rgba(34,197,94,0.45)" : "none",
                        }}
                    >+</div>
                </div>
                <span className="text-xs font-bold text-gray-500">ครั้ง</span>
            </div>

            <div className="flex gap-1.5 items-center">
                {[0, 1, 2, 3].map(n => (
                    <div
                        key={n}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold border-2 transition-all duration-300"
                        style={{
                            background: n === count ? "#FFF7ED" : "#F9FAFB",
                            borderColor: n === count ? "#F97316" : "#E5E7EB",
                            transform: n === count ? "scale(1.15)" : "scale(1)",
                            color: n === count ? "#C2410C" : "#9CA3AF",
                        }}
                    >{n}</div>
                ))}
            </div>
        </div>
    );
}

/* ── Step 3: Run button → character executes ─────────────────── */
function Step3Run() {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setPhase(p => (p + 1) % 5), 700);
        return () => clearInterval(t);
    }, []);

    const isRunning = phase >= 1 && phase <= 3;
    const isDone = phase === 4;

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Task summary */}
            <div className="flex gap-3">
                {[{ emoji: "🍊", count: 3 }, { emoji: "🍓", count: 2 }].map((t, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                        <span className="text-xl">{t.emoji}</span>
                        <span className="text-xs font-bold text-orange-700">×{t.count}</span>
                    </div>
                ))}
            </div>

            {/* Run button */}
            <button
                className="flex items-center gap-2 px-8 py-3 rounded-2xl font-extrabold text-white shadow-lg transition-all duration-300"
                style={{
                    background: isDone ? "#16A34A" : isRunning ? "#EA580C" : "#F97316",
                    animation: !isRunning && !isDone ? "scRunGlow 1s ease-in-out infinite" : "none",
                }}
            >
                {isDone ? "✅ เสร็จแล้ว!" : isRunning ? "⚙️ กำลังรัน..." : "▶ Run!"}
            </button>

            {/* Character */}
            <div
                className="text-4xl select-none"
                style={{ animation: isRunning ? "scBounce 0.4s ease-in-out infinite alternate" : "none" }}
            >
                🤖
            </div>

            <style>{`
                @keyframes scRunGlow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.3); }
                    50%      { box-shadow: 0 0 0 10px rgba(249,115,22,0.15); transform: scale(1.03); }
                }
                @keyframes scBounce {
                    from { transform: translateY(0) rotate(-4deg); }
                    to   { transform: translateY(-10px) rotate(4deg); }
                }
            `}</style>
        </div>
    );
}

export const stepCountingTutorialSteps: TutorialStep[] = [
    {
        title: "ดูงานที่ต้องทำ",
        content: <Step1Tasks />,
        hint: "แต่ละแถวคืองานหนึ่งอย่าง ต้องตั้งจำนวนรอบให้พอดี",
    },
    {
        title: "กด + เพื่อตั้งจำนวนรอบ",
        content: <Step2CountUp />,
        hint: "กด + หรือ − เพื่อตั้งว่าจะทำงานนั้นกี่ครั้ง",
    },
    {
        title: "กด ▶ Run เพื่อรัน!",
        content: <Step3Run />,
        hint: "กด Run เพื่อให้ตัวละครทำงานตามจำนวนที่ตั้งไว้",
    },
];
