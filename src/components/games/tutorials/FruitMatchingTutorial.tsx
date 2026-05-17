"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";
import { FruitChoices } from "../fruit-matching-grid/FruitChoices";

const CELLS = [
    ["🍎", "🍌", "🍊"],
    ["🍇", "🍓", "🍋"],
    ["🍑", "🍍", "🥝"],
];
const ROWS = ["A", "B", "C"];
const COLS = ["1", "2", "3"];
const ROW_COLORS = ["#EC4899", "#F97316", "#22C55E"];
const COL_COLORS = ["#EC4899", "#F97316", "#22C55E"];
const ALL_COORDS = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
const CELL_SZ = 52;
const BADGE_SZ = 22;
const GAP = 5;

function MiniGrid({ highlight, found = [], activeCoord }: { highlight?: string; found?: string[]; activeCoord?: string }) {
    const activeRow = activeCoord ? activeCoord[0] : null;
    const activeCol = activeCoord ? activeCoord[1] : null;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            <div style={{ display: "flex", gap: GAP, marginLeft: BADGE_SZ + GAP }}>
                {COLS.map((c, ci) => {
                    const isAc = activeCol === c;
                    return (
                        <div key={c} style={{ width: CELL_SZ, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{
                                width: BADGE_SZ, height: BADGE_SZ, borderRadius: "50%",
                                background: COL_COLORS[ci], color: "#fff", fontSize: 12, fontWeight: 900,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transform: isAc ? "scale(1.3)" : "scale(1)",
                                boxShadow: isAc ? `0 0 8px ${COL_COLORS[ci]}99` : "none",
                                transition: "all 0.25s",
                            }}>{c}</div>
                        </div>
                    );
                })}
            </div>
            {CELLS.map((row, ri) => {
                const isAr = activeRow === ROWS[ri];
                return (
                    <div key={ri} style={{ display: "flex", alignItems: "center", gap: GAP }}>
                        <div style={{
                            width: BADGE_SZ, height: BADGE_SZ, borderRadius: "50%",
                            background: ROW_COLORS[ri], color: "#fff", fontSize: 12, fontWeight: 900,
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            transform: isAr ? "scale(1.3)" : "scale(1)",
                            boxShadow: isAr ? `0 0 8px ${ROW_COLORS[ri]}99` : "none",
                            transition: "all 0.25s",
                        }}>{ROWS[ri]}</div>
                        {row.map((fruit, ci) => {
                            const coord = `${ROWS[ri]}${ci + 1}`;
                            const isHl = highlight === coord;
                            const isDone = found.includes(coord);
                            return (
                                <div key={ci} style={{
                                    width: CELL_SZ, height: CELL_SZ, borderRadius: 12,
                                    background: isDone ? "#DCFCE7" : isHl ? "#FFF3CD" : "#F9FAFB",
                                    border: `2px solid ${isDone ? "#4ade80" : isHl ? "#F59E0B" : "#E5E7EB"}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 24,
                                    boxShadow: isDone ? "0 3px 0 #4ade80" : isHl ? "0 3px 0 #F59E0B" : "0 3px 0 #E5E7EB",
                                    transform: isHl ? "scale(1.1) translateY(-2px)" : isDone ? "scale(0.95)" : "scale(1)",
                                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                }}>{fruit}</div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

/* ── Step 1: Observe fruits in the grid ─────────────────────────── */
function Step1Grid() {
    const [hlIdx, setHlIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setHlIdx(h => (h + 1) % ALL_COORDS.length), 750);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                ตารางมีผลไม้ต่างกันในแต่ละช่อง สังเกตดูนะ!
            </p>
            <MiniGrid highlight={ALL_COORDS[hlIdx]} />
        </div>
    );
}

/* ── Step 2: Read coordinates — grid + badge ─────────────────────── */
function Step2CoordRead() {
    const DEMO = ["A1", "B2", "C3", "A3", "C1"];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % DEMO.length), 1400);
        return () => clearInterval(t);
    }, []);

    const coord = DEMO[idx];
    const ri = ROWS.indexOf(coord[0]);
    const ci = parseInt(coord[1]) - 1;

    return (
        <div className="flex flex-col items-center gap-3">
            <div key={coord} style={{ display: "flex", alignItems: "center", gap: 6, animation: "fmPop 0.3s ease-out" }}>
                <div style={{ background: ROW_COLORS[ri], color: "#fff", borderRadius: 10, padding: "4px 12px", fontSize: 17, fontWeight: 900, boxShadow: `0 3px 0 ${ROW_COLORS[ri]}99` }}>
                    แถว {coord[0]}
                </div>
                <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 700 }}>+</span>
                <div style={{ background: COL_COLORS[ci], color: "#fff", borderRadius: 10, padding: "4px 12px", fontSize: 17, fontWeight: 900, boxShadow: `0 3px 0 ${COL_COLORS[ci]}99` }}>
                    คอลัมน์ {coord[1]}
                </div>
                <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 700 }}>=</span>
                <div style={{ background: "#1D4ED8", color: "#fff", borderRadius: 10, padding: "4px 14px", fontSize: 18, fontWeight: 900, boxShadow: "0 3px 0 #1e40af" }}>
                    {coord}
                </div>
            </div>
            <MiniGrid highlight={coord} activeCoord={coord} />
            <style>{`
                @keyframes fmPop {
                    0%   { transform: scale(0.6); opacity: 0; }
                    70%  { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: FruitChoices — click to answer ─────────────────────── */
function Step3FruitChoices() {
    const CHOICES = ["🍎", "🍓", "🍌", "🍋"];
    const CORRECT = "🍓";
    const NAMES: Record<string, string> = { "🍎": "แอปเปิ้ล", "🍓": "สตรอว์เบอร์รี", "🍌": "กล้วย", "🍋": "มะนาว" };
    const [cycleKey, setCycleKey] = useState(0);

    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-[260px]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl font-extrabold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }}>
                <span>📍</span><span>B2 มีผลไม้อะไร?</span>
            </div>
            <FruitChoices
                key={cycleKey}
                choices={CHOICES}
                correctAnswer={CORRECT}
                fruitNames={NAMES}
                onCorrect={() => setTimeout(() => setCycleKey(k => k + 1), 900)}
                onWrong={() => { }}
                disabled={false}
            />
            <p className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                👆 กดเลือกผลไม้ที่ถูกต้อง!
            </p>
        </div>
    );
}

export const fruitMatchingTutorialSteps: TutorialStep[] = [
    {
        title: "สังเกตผลไม้ในตาราง",
        content: <Step1Grid />,
        hint: "ตารางมีผลไม้ต่างกันในแต่ละช่อง สังเกตให้ดีนะ!",
        audio: "/audio/games/fruit-matching-grid/FruitMatchingGrid_step1.wav",
    },
    {
        title: "อ่านพิกัด: แถว + คอลัมน์",
        content: <Step2CoordRead />,
        hint: "A1 หมายถึง แถว A คอลัมน์ 1 — อ่านตัวอักษรก่อน เสร็จแล้วตามด้วยตัวเลข!",
        audio: "/audio/games/fruit-matching-grid/FruitMatchingGrid_step2.wav",
    },
    {
        title: "กดเลือกผลไม้ที่ถูกต้อง",
        content: <Step3FruitChoices />,
        hint: "กดคลิกผลไม้ที่อยู่ในตำแหน่งที่โจทย์บอก!",
        audio: "/audio/games/fruit-matching-grid/FruitMatchingGrid_step3.wav",
    },
];
