"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";

/* ── Step 1: Mini grid with highlighted cell ─────────────────── */
function Step1Grid() {
    const cells = [
        ["🍎", "🍌", "🍊"],
        ["🍇", "🍓", "🍋"],
        ["🍑", "🍍", "🥝"],
    ];
    const rows = ["A", "B", "C"];
    const cols = ["1", "2", "3"];

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 ml-6">
                {cols.map(c => (
                    <div key={c} className="w-12 h-6 flex items-center justify-center text-xs font-bold text-gray-400">{c}</div>
                ))}
            </div>
            {cells.map((row, ri) => (
                <div key={ri} className="flex items-center gap-1">
                    <div className="w-6 h-12 flex items-center justify-center text-xs font-bold text-gray-400">{rows[ri]}</div>
                    {row.map((fruit, ci) => {
                        const isTarget = ri === 1 && ci === 1;
                        return (
                            <div
                                key={ci}
                                className="w-12 h-12 flex items-center justify-center rounded-xl text-xl border-2 transition-all"
                                style={{
                                    background: isTarget ? "#FFF3CD" : "#F9FAFB",
                                    borderColor: isTarget ? "#F59E0B" : "#E5E7EB",
                                    animation: isTarget ? "fmCellPulse 1s ease-in-out infinite" : "none",
                                }}
                            >
                                {fruit}
                            </div>
                        );
                    })}
                </div>
            ))}
            <p className="text-xs text-amber-600 font-bold mt-2 bg-amber-50 px-3 py-1 rounded-xl">
                B2 = แถว B, คอลัมน์ 2
            </p>
            <style>{`
                @keyframes fmCellPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); transform: scale(1); }
                    50%      { box-shadow: 0 0 0 6px rgba(245,158,11,0.35); transform: scale(1.12); }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: Coordinate badge + fruit reveal ─────────────────── */
function Step2Coord() {
    const [showFruit, setShowFruit] = useState(false);

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            const t1 = setTimeout(() => { if (alive) setShowFruit(true); }, 1000);
            const t2 = setTimeout(() => { if (alive) setShowFruit(false); }, 2600);
            const t3 = setTimeout(() => { if (alive) cycle(); }, 3400);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        };
        const cleanup = cycle();
        return () => { alive = false; cleanup(); };
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            <div
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-xl text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", animation: "fmPop 0.5s ease-out" }}
            >
                <span>📍</span>
                <span>B2</span>
            </div>
            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border-2 transition-all duration-500"
                style={{
                    background: showFruit ? "#FFF3CD" : "#F3F4F6",
                    borderColor: showFruit ? "#F59E0B" : "#E5E7EB",
                    transform: showFruit ? "scale(1.15)" : "scale(1)",
                    boxShadow: showFruit ? "0 0 16px rgba(245,158,11,0.4)" : "none",
                }}
            >
                {showFruit ? "🍓" : "❓"}
            </div>
            {showFruit && (
                <p className="text-green-600 font-bold text-sm" style={{ animation: "fmPop 0.3s ease-out" }}>
                    พิกัด B2 คือ 🍓 !
                </p>
            )}
            <style>{`
                @keyframes fmPop {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.1); }
                    100% { transform: scale(1);   opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: Choices — correct one glows green ───────────────── */
function Step3Choices() {
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            const t1 = setTimeout(() => { if (alive) setSelected(2); }, 1200);
            const t2 = setTimeout(() => { if (alive) setSelected(null); }, 2800);
            const t3 = setTimeout(() => { if (alive) cycle(); }, 3600);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        };
        const cleanup = cycle();
        return () => { alive = false; cleanup(); };
    }, []);

    const fruits = ["🍎", "🍌", "🍓", "🍇"];

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-xs font-bold text-gray-500 bg-blue-50 px-3 py-1.5 rounded-xl">📍 B2 มีผลไม้อะไร?</p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                {fruits.map((fruit, i) => (
                    <div
                        key={i}
                        className="py-3 rounded-2xl text-2xl border-2 flex flex-col items-center gap-0.5 transition-all duration-300 select-none"
                        style={{
                            background: selected === i ? (i === 2 ? "#DCFCE7" : "#FEE2E2") : "#F9FAFB",
                            borderColor: selected === i ? (i === 2 ? "#22C55E" : "#EF4444") : "#E5E7EB",
                            transform: selected === i ? "scale(1.08)" : "scale(1)",
                            boxShadow: selected === i && i === 2 ? "0 0 16px rgba(34,197,94,0.4)" : "none",
                        }}
                    >
                        {fruit}
                        {selected === i && i === 2 && (
                            <span className="text-[10px] text-green-600 font-bold" style={{ animation: "fmPop 0.2s ease-out" }}>
                                ✓ ถูก!
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export const fruitMatchingTutorialSteps: TutorialStep[] = [
    {
        title: "ดูพิกัดในตาราง",
        content: <Step1Grid />,
        hint: "ตารางมีแกน A, B, C (แถว) และ 1, 2, 3 (คอลัมน์)",
    },
    {
        title: "โจทย์จะบอกพิกัดเป้าหมาย",
        content: <Step2Coord />,
        hint: "อ่านพิกัด แล้วหาว่าตำแหน่งนั้นมีผลไม้อะไร",
    },
    {
        title: "จิ้มเลือกผลไม้ที่ถูกต้อง",
        content: <Step3Choices />,
        hint: "เลือกผลไม้ที่อยู่ในพิกัดนั้นจากตัวเลือก 4 อัน",
    },
];
