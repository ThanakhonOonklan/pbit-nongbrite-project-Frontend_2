"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";
import { Glass } from "../step-counting/Glass";
import type { LoopTheme } from "@/constants/games/step-counting-levels";

const JUICE_TYPES: { theme: LoopTheme; label: string }[] = [
    { theme: "orange", label: "น้ำส้ม" },
    { theme: "pineapple", label: "น้ำสับปะรด" },
    { theme: "watermelon", label: "น้ำแตงโม" },
    { theme: "apple", label: "น้ำแอปเปิ้ล" },
];

const RATIO_DATA: { theme: LoopTheme; emoji: string; yields: number; label: string }[] = [
    { theme: "orange", emoji: "🍊", yields: 0.5, label: "ครึ่งแก้ว" },
    { theme: "pineapple", emoji: "🍍", yields: 1, label: "1 แก้ว" },
    { theme: "watermelon", emoji: "🍉", yields: 2, label: "2 แก้ว" },
];

/* ── Step 1: Glass identification ────────────────────────────── */
function Step1Glasses() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActive(a => (a + 1) % JUICE_TYPES.length), 1300);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                สังเกตสีแก้วน้ำ ว่าคือน้ำผลไม้อะไร
            </p>
            <div className="flex items-end gap-3">
                {JUICE_TYPES.map((j, i) => (
                    <div key={i} className="flex flex-col items-center gap-1"
                        style={{
                            transform: active === i ? "scale(1.2) translateY(-8px)" : "scale(1)",
                            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                        }}>
                        <div key={`${i}-${active === i ? 1 : 0}`}>
                            <Glass
                                index={0}
                                taskIndex={i}
                                currentAmount={0}
                                currentGlass={-1}
                                isRunning={false}
                                theme={j.theme}
                                showLabel={false}
                                sizeOverride={50}
                            />
                        </div>
                        <span className="text-[10px] font-bold text-center"
                            style={{ color: active === i ? "#FFFFFF" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
                            {j.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Step 2: Fruit → yield ratio card ───────────────────────── */
function Step2RatioCard() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setActive(a => (a + 1) % RATIO_DATA.length), 2000);
        return () => clearInterval(t);
    }, []);

    const cur = RATIO_DATA[active];

    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                ผลไม้แต่ละลูกให้น้ำได้ไม่เท่ากัน
            </p>
            <div key={active}
                style={{
                    background: "#E0F7F6",
                    borderRadius: 16,
                    padding: "14px 22px",
                    border: "2px solid #80CBC4",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    animation: "scFadeIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}>
                <span style={{ fontSize: 42 }}>{cur.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#00695C", whiteSpace: "nowrap" }}>1 ลูก →</span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 70, overflow: "visible" }}>
                    {cur.yields <= 1
                        ? (
                            <div style={{ transform: "scale(0.88)", transformOrigin: "center bottom" }}>
                                <Glass index={0} taskIndex={active * 100} currentAmount={cur.yields} currentGlass={-1} isRunning={false} theme={cur.theme} showLabel={false} sizeOverride={56} />
                            </div>
                        )
                        : Array.from({ length: cur.yields }, (_, gi) => (
                            <div key={gi} style={{ transform: "scale(0.80)", transformOrigin: "center bottom" }}>
                                <Glass index={gi} taskIndex={active * 100 + gi} currentAmount={cur.yields} currentGlass={-1} isRunning={false} theme={cur.theme} showLabel={false} sizeOverride={50} />
                            </div>
                        ))
                    }
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#00695C" }}>{cur.label}</span>
            </div>
            <style>{`
                @keyframes scFadeIn {
                    from { opacity: 0; transform: scale(0.88); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: Stepper + Run button ───────────────────────────── */
function Step3CountRun() {
    const [count, setCount] = useState(0);
    const [flash, setFlash] = useState(false);
    const [phase, setPhase] = useState<"counting" | "running" | "done">("counting");
    const [fillLevel, setFillLevel] = useState(0);
    const [cycleKey, setCycleKey] = useState(0);

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setCycleKey(k => k + 1); setCount(0); setPhase("counting"); setFlash(false); setFillLevel(0);
            let n = 0;
            const pressPlus = () => {
                if (!alive) return;
                if (n >= 4) {
                    setTimeout(() => {
                        if (!alive) return;
                        setPhase("running");
                        setTimeout(() => { if (alive) setFillLevel(1); }, 200);
                        setTimeout(() => {
                            if (!alive) return;
                            setPhase("done");
                            setTimeout(() => { if (alive) cycle(); }, 1800);
                        }, 1300);
                    }, 700);
                    return;
                }
                setFlash(true);
                setTimeout(() => {
                    if (!alive) return;
                    setFlash(false); n++; setCount(n);
                    setTimeout(pressPlus, 520);
                }, 220);
            };
            setTimeout(pressPlus, 700);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    const btnBg = phase === "done" ? "#16A34A" : phase === "running" ? "#EA580C" : "#22C55E";
    const btnSh = phase === "done" ? "#15803D" : phase === "running" ? "#C2410C" : "#15803D";

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[280px]">
            {/* Stepper row — mimics TaskRow from LoopCodePanel */}
            <div style={{
                background: "#FFF8F0", borderRadius: 22, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 10,
                border: "2px solid #FFE0B2", width: "100%",
            }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FFB74D", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px #FFB74D88", flexShrink: 0 }}>
                    <span style={{ fontSize: 26 }}>🍊</span>
                </div>
                <span style={{ fontWeight: 800, color: "#BF360C", fontSize: 15, flex: 1 }}>ส้ม</span>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#E0E0E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#9CA3AF" }}>−</div>
                <div style={{ width: 50, height: 40, borderRadius: 12, background: "#fff", border: "2px solid #F57F17", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#F57F17" }}>
                    {count}
                </div>
                <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: flash ? "#45B8B6" : "#6ED1CF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, fontWeight: 900, color: "#fff",
                    transform: flash ? "scale(0.88) translateY(3px)" : "scale(1)",
                    boxShadow: flash ? "none" : "0 4px 0 #45B8B6",
                    transition: "transform 0.15s, background 0.1s, box-shadow 0.1s",
                }}>+</div>
            </div>

            {/* Glass — fills when Run is pressed */}
            <div key={cycleKey} style={{ display: "flex", justifyContent: "center" }}>
                <Glass
                    index={0}
                    taskIndex={999}
                    currentAmount={fillLevel}
                    currentGlass={-1}
                    isRunning={phase === "running"}
                    theme="orange"
                    showLabel={false}
                    sizeOverride={66}
                />
            </div>

            {/* Run button */}
            <button style={{
                width: "100%", borderRadius: 18, padding: "12px 0",
                background: btnBg, color: "#fff", fontWeight: 900, fontSize: 17, border: "none",
                boxShadow: `0 4px 0 ${btnSh}`,
                transform: phase === "running" ? "translateY(4px) scale(0.97)" : phase === "done" ? "scale(1.04)" : "scale(1)",
                transition: "all 0.3s",
                animation: phase === "counting" ? "scRunGlow 1.2s ease-in-out infinite" : "none",
            }}>
                {phase === "done" ? "✅ เสร็จแล้ว!" : phase === "running" ? "⏳ กำลังปั่น..." : "▶ Run!"}
            </button>

            <style>{`
                @keyframes scRunGlow {
                    0%, 100% { box-shadow: 0 4px 0 #15803D; }
                    50%      { box-shadow: 0 4px 0 #15803D, 0 0 16px rgba(34,197,94,0.4); transform: scale(1.03); }
                }
            `}</style>
        </div>
    );
}

export const stepCountingTutorialSteps: TutorialStep[] = [
    {
        title: "สังเกตแก้วน้ำว่าคือน้ำอะไร",
        content: <Step1Glasses />,
        hint: "ดูสีของแก้วน้ำว่าเป็นน้ำผลไม้ชนิดใด — แต่ละสีคือน้ำคนละอย่าง",
    },
    {
        title: "ผลไม้แต่ละลูกให้น้ำได้แค่ไหน",
        content: <Step2RatioCard />,
        hint: "ส้ม 1 ลูก ได้ครึ่งแก้ว แตงโม 1 ลูก ได้ 2 แก้วเลย! แต่ละชนิดไม่เหมือนกัน",
    },
    {
        title: "กด + แล้วกด Run เพื่อปั่น!",
        content: <Step3CountRun />,
        hint: "กด + เพิ่มจำนวนผลไม้ให้ได้น้ำตามเป้าหมาย แล้วกด Run เพื่อปั่น!",
    },
];
