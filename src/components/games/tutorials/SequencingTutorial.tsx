"use client";

import { useEffect, useState } from "react";
import type { TutorialStep } from "../TutorialModal";

// Butterfly lifecycle — correct order
const SEQ = [
    { src: "/images/sequencing/butterfly/egg.svg", label: "ไข่" },
    { src: "/images/sequencing/butterfly/caterpillar.svg", label: "หนอน" },
    { src: "/images/sequencing/butterfly/chrysalis.svg", label: "ดักแด้" },
    { src: "/images/sequencing/butterfly/butterfly.svg", label: "ผีเสื้อ" },
];
// Pool order (shuffled display): chrysalis(2), egg(0), butterfly(3), caterpillar(1)
const POOL_ORDER = [2, 0, 3, 1];
// Which pool position corresponds to each slot's correct item
const POOL_POS_OF_SLOT = [1, 3, 0, 2]; // slot i → pool position of its item
// Which slot gets filled from each pool position
const SLOT_OF_POOL = [2, 0, 3, 1];

const CARD = 58; const GAP = 10;

/* shared card style */
const cardStyle = (active: boolean, placed: boolean) => ({
    background: active ? "#2D1055" : "#1A0938",
    borderColor: active ? "#A855F7" : "#3B1D7A",
    boxShadow: active
        ? "0 4px 0 #9333EA, 0 0 14px rgba(168,85,247,0.45)"
        : "0 4px 0 #6D28D9",
    transform: active ? "translateY(-5px) scale(1.1)" : placed ? "scale(0.82)" : "scale(1)",
    opacity: placed ? 0.28 : 1,
});

/* ── Step 1: Shuffled pool + empty slots ─────────────────────── */
function Step1Pool() {
    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-[11px] font-bold text-purple-300 uppercase tracking-widest"
                style={{ textShadow: "0 0 8px rgba(168,85,247,0.5)" }}>
                ลากหรือแตะเพื่อนำไปวาง
            </p>
            {/* Slots row */}
            <div className="flex" style={{ gap: GAP }}>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed"
                        style={{ width: CARD, height: CARD, background: "#0D0B2B", borderColor: "#3B1D7A40" }}>
                        <span className="text-purple-700 text-sm font-bold">{i + 1}</span>
                    </div>
                ))}
            </div>
            {/* Pool */}
            <div className="flex rounded-2xl border-2 border-[#2D1B69]/60 p-3"
                style={{ background: "#0F0825", gap: GAP }}>
                {POOL_ORDER.map((itemIdx, pi) => (
                    <div key={pi} className="flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200"
                        style={{
                            width: CARD, height: CARD, ...cardStyle(false, false),
                            animation: `seqCardIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${pi * 0.08}s both`
                        }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={SEQ[itemIdx].src} alt="" width={36} height={36} className="object-contain" />
                        <span className="text-[8px] text-purple-300 font-bold mt-0.5">{SEQ[itemIdx].label}</span>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes seqCardIn {
                    from { transform: scale(0) rotate(-8deg); opacity: 0; }
                    to   { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 2: Animated sequential pool → slot ─────────────────── */
function Step2Drag() {
    const [slots, setSlots] = useState<(number | null)[]>([null, null, null, null]);
    const [activePool, setActive] = useState<number | null>(null);

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setSlots([null, null, null, null]); setActive(null);
            let si = 0;
            const tick = () => {
                if (!alive) return;
                if (si >= 4) { setTimeout(() => { if (alive) cycle(); }, 2200); return; }
                const slotIdx = si++;
                const poolPos = POOL_POS_OF_SLOT[slotIdx];
                setActive(poolPos);
                setTimeout(() => {
                    if (!alive) return;
                    setActive(null);
                    setSlots(prev => { const n = [...prev]; n[slotIdx] = slotIdx; return n; });
                    setTimeout(tick, 380);
                }, 620);
            };
            setTimeout(tick, 500);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Slots */}
            <div className="flex" style={{ gap: GAP }}>
                {slots.map((itemIdx, si) => (
                    <div key={si} className="flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300"
                        style={{
                            width: CARD, height: CARD,
                            background: itemIdx !== null ? "#1A0938" : "#0D0B2B",
                            borderColor: itemIdx !== null ? "#7C3AED" : "#3B1D7A40",
                            borderStyle: itemIdx !== null ? "solid" : "dashed",
                            boxShadow: itemIdx !== null ? "0 4px 0 #6D28D9" : "none",
                            animation: itemIdx !== null ? "seqSlotPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                        }}>
                        {itemIdx !== null ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={SEQ[itemIdx].src} alt="" width={34} height={34} className="object-contain" />
                                <span className="text-[8px] text-purple-300 font-bold mt-0.5">{SEQ[itemIdx].label}</span>
                            </>
                        ) : (
                            <span className="text-purple-700/50 text-sm font-bold">{si + 1}</span>
                        )}
                    </div>
                ))}
            </div>
            <span className="text-purple-500 text-base">↑</span>
            {/* Pool */}
            <div className="flex rounded-2xl border-2 border-[#2D1B69]/60 p-3"
                style={{ background: "#0F0825", gap: GAP }}>
                {POOL_ORDER.map((itemIdx, pi) => {
                    const placed = slots[SLOT_OF_POOL[pi]] !== null;
                    const active = activePool === pi;
                    return (
                        <div key={pi} className="flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300"
                            style={{ width: CARD, height: CARD, ...cardStyle(active, placed) }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={SEQ[itemIdx].src} alt="" width={34} height={34} className="object-contain" style={{ opacity: placed ? 0.3 : 1 }} />
                            <span className="text-[8px] text-purple-300 font-bold mt-0.5">{SEQ[itemIdx].label}</span>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes seqSlotPop {
                    from { transform: scale(0) rotate(-5deg); opacity: 0; }
                    to   { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: All slots filled + check button ─────────────────── */
function Step3Complete() {
    const [phase, setPhase] = useState<"idle" | "checking" | "correct">("idle");

    useEffect(() => {
        let alive = true;
        const cycle = () => {
            setPhase("idle");
            setTimeout(() => { if (alive) setPhase("checking"); }, 1300);
            setTimeout(() => { if (alive) setPhase("correct"); }, 2200);
            setTimeout(() => { if (alive) cycle(); }, 4500);
        };
        cycle();
        return () => { alive = false; };
    }, []);

    const bg = phase === "correct" ? "#16A34A" : phase === "checking" ? "#F59E0B" : "#7C3AED";
    const sh = phase === "correct" ? "#15803D" : phase === "checking" ? "#D97706" : "#5B21B6";

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex rounded-2xl border-2 border-[#2D1B69]/60 p-3"
                style={{ background: "#0F0825", gap: GAP }}>
                {SEQ.map((item, i) => (
                    <div key={i} className="flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300"
                        style={{
                            width: CARD, height: CARD, background: "#1A0938",
                            borderColor: phase === "correct" ? "#22C55E" : "#7C3AED",
                            boxShadow: phase === "correct" ? "0 4px 0 #16A34A" : "0 4px 0 #6D28D9",
                            transform: phase === "correct" ? "scale(1.06)" : "scale(1)"
                        }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.src} alt="" width={34} height={34} className="object-contain" />
                        <span className="text-[8px] text-purple-300 font-bold mt-0.5">{item.label}</span>
                        {phase === "correct" && <span className="text-[7px] text-green-400 font-bold">✓</span>}
                    </div>
                ))}
            </div>

            <button className="flex items-center gap-2 px-7 py-2.5 rounded-2xl font-extrabold text-sm text-white transition-all duration-300"
                style={{
                    background: bg, boxShadow: `0 4px 0 ${sh}`,
                    transform: phase === "checking" ? "translateY(4px)" : phase === "correct" ? "scale(1.05)" : "scale(1)",
                    animation: phase === "idle" ? "seqBtnPulse 1.2s ease-in-out infinite" : "none",
                }}>
                {phase === "correct" ? "✅ เรียงถูกต้อง!" : phase === "checking" ? "⏳ กำลังตรวจ..." : "✓ ตรวจคำตอบ"}
            </button>

            <style>{`
                @keyframes seqBtnPulse {
                    0%,100% { box-shadow: 0 4px 0 #5B21B6; }
                    50%     { box-shadow: 0 4px 0 #5B21B6, 0 0 16px rgba(124,58,237,0.4); transform: scale(1.03); }
                }
            `}</style>
        </div>
    );
}

export const sequencingTutorialSteps: TutorialStep[] = [
    {
        title: "ดูของในคลังที่สุ่มมา",
        content: <Step1Pool />,
        hint: "ของจะถูกสุ่มลำดับ คุณต้องเรียงให้ถูกต้องตามลำดับ",
    },
    {
        title: "ลากของใส่ช่องตามลำดับ",
        content: <Step2Drag />,
        hint: "ลากของจากคลังขึ้นไปใส่ช่องหมายเลขให้ถูกลำดับ",
    },
    {
        title: "เรียงครบแล้วกดตรวจ",
        content: <Step3Complete />,
        hint: "เมื่อวางครบทุกช่องแล้ว กดปุ่มตรวจคำตอบ!",
    },
];
