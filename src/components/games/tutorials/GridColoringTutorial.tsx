"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";

/* ── Step 1: Reference pattern grid ─────────────────────────── */
function Step1Reference() {
    const pattern = [
        ["#EF4444", "#FFFFFF", "#EF4444"],
        ["#FFFFFF", "#3B82F6", "#FFFFFF"],
        ["#EF4444", "#FFFFFF", "#EF4444"],
    ];

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl">
                จดจำรูปต้นแบบให้ดี!
            </div>
            <div
                className="grid gap-2 p-4 bg-white rounded-2xl shadow border border-gray-100"
                style={{ gridTemplateColumns: "repeat(3, 68px)", gridTemplateRows: "repeat(3, 68px)" }}
            >
                {pattern.flat().map((color, i) => (
                    <div
                        key={i}
                        className="w-[68px] h-[68px] rounded-xl border border-gray-200"
                        style={{
                            background: color,
                            animation: `gcFadeCell ${0.08 * i + 0.2}s ease-out both`,
                        }}
                    />
                ))}
            </div>
            <style>{`
                @keyframes gcFadeCell {
                    from { opacity: 0; transform: scale(0.6); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: Color palette selection ─────────────────────────── */
function Step2Palette() {
    const colors = ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#FFFFFF"];
    const labels = ["แดง", "น้ำเงิน", "เขียว", "เหลือง", "ม่วง", "ขาว"];
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        let i = 0;
        const t = setInterval(() => {
            i = (i + 1) % colors.length;
            setSelected(i);
        }, 700);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Palette */}
            <div className="flex gap-2 flex-wrap justify-center max-w-[240px]">
                {colors.map((color, i) => (
                    <div
                        key={i}
                        className="rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                        style={{
                            width: selected === i ? 48 : 36,
                            height: selected === i ? 48 : 36,
                            background: color,
                            borderColor: selected === i ? "#1E3A5F" : "#E5E7EB",
                            boxShadow: selected === i ? "0 0 0 3px rgba(30,58,95,0.25), 0 4px 12px rgba(0,0,0,0.15)" : "none",
                        }}
                    />
                ))}
            </div>

            {/* Selected color display */}
            <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-300"
                style={{
                    background: colors[selected],
                    color: selected === 5 ? "#374151" : "white",
                    borderColor: "rgba(0,0,0,0.1)",
                }}
            >
                ✓ เลือกสี{labels[selected]}แล้ว
            </div>
        </div>
    );
}

/* ── Step 3: Cells filling in one by one ─────────────────────── */
function Step3Fill() {
    const pattern = ["#EF4444", "#FFFFFF", "#EF4444", "#FFFFFF", "#3B82F6", "#FFFFFF", "#EF4444", "#FFFFFF", "#EF4444"];
    const [filled, setFilled] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setFilled(f => (f >= 9 ? 0 : f + 1));
        }, 380);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-5 items-start">
                {/* Reference */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] text-gray-400 font-bold">ต้นแบบ</p>
                    <div
                        className="grid gap-1 p-2 bg-gray-50 rounded-xl border border-gray-200"
                        style={{ gridTemplateColumns: "repeat(3, 44px)", gridTemplateRows: "repeat(3, 44px)" }}
                    >
                        {pattern.map((c, i) => (
                            <div key={i} className="w-[44px] h-[44px] rounded-lg" style={{ background: c }} />
                        ))}
                    </div>
                </div>

                {/* Canvas being painted */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] text-gray-400 font-bold">กำลังระบาย</p>
                    <div
                        className="grid gap-1 p-2 bg-gray-50 rounded-xl border border-gray-200"
                        style={{ gridTemplateColumns: "repeat(3, 44px)", gridTemplateRows: "repeat(3, 44px)" }}
                    >
                        {pattern.map((c, i) => (
                            <div
                                key={i}
                                className="w-[44px] h-[44px] rounded-lg border border-gray-100 transition-all duration-300"
                                style={{
                                    background: i < filled ? c : "#F9FAFB",
                                    transform: i === filled - 1 ? "scale(1.18)" : "scale(1)",
                                    boxShadow: i === filled - 1 ? "0 0 8px rgba(0,0,0,0.2)" : "none",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {filled >= 9 && (
                <div
                    className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-xl"
                    style={{ animation: "gcFadeCell 0.3s ease-out" }}
                >
                    ระบายครบแล้ว — กด ✓ ส่ง!
                </div>
            )}
        </div>
    );
}

export const gridColoringTutorialSteps: TutorialStep[] = [
    {
        title: "ดูรูปแบบต้นแบบ",
        content: <Step1Reference />,
        hint: "จำสีและตำแหน่งของตารางต้นแบบให้ดี",
        audio: "/audio/games/grid-based-coloring/GridColoring_step1.wav",
    },
    {
        title: "เลือกสีจาก Palette",
        content: <Step2Palette />,
        hint: "คลิกที่วงสีเพื่อเลือก แล้วนำไประบายบนตาราง",
        audio: "/audio/games/grid-based-coloring/GridColoring_step2.wav",
    },
    {
        title: "ระบายสีให้ตรงต้นแบบ",
        content: <Step3Fill />,
        hint: "คลิกหรือลากบนช่องเพื่อระบาย แล้วกด ✓ ส่ง",
        audio: "/audio/games/grid-based-coloring/GridColoring_step3.wav",
    },
];
