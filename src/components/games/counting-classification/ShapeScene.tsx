"use client";

import { type ShapePlacement } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

interface ShapeSceneProps {
    placements: ShapePlacement[];
}

/**
 * พื้นที่แสดงรูปทรงฝั่งซ้าย (Theme: Pink Toy Room ห้องของเล่นธีมชมพู)
 * รูปทรงแต่ละตัวถูกวางตายตัวตาม x%, y% และ size ใน config
 */
export function ShapeScene({ placements }: ShapeSceneProps) {
    // ฟังก์ชันช่วยสุ่มเลขที่มีค่าเท่าเดิมเสมอสำหรับ id เดิม (กัน Hydration Mismatch)
    const getDeterministicRandom = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        // คืนค่าระหว่าง 0 ถึง 1
        return Math.abs(Math.sin(hash));
    };

    // ── ดาวกะพริบ 14 ดวง (deterministic positions) ─────────────────
    const STAR_COUNT = 14;
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
        const sid = `star_${i}`;
        return {
            id: sid,
            x: +(getDeterministicRandom(sid + 'x') * 92 + 2).toFixed(2),
            y: +(getDeterministicRandom(sid + 'y') * 88 + 2).toFixed(2),
            size: +(getDeterministicRandom(sid + 's') * 10 + 8).toFixed(2),
            delay: `${+(getDeterministicRandom(sid + 'd') * 3).toFixed(2)}s`,
            duration: `${+(1.5 + getDeterministicRandom(sid + 'dur') * 1.5).toFixed(2)}s`,
        };
    });

    return (
        <div className="flex flex-col h-full relative">

            {/* Scene container */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-transparent">

                {/* Header overlay inside scene */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center pt-2 pb-1 pointer-events-none">
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(180,0,80,0.4)]">
                        มองหาและนับรูปทรงในภาพ!
                    </span>
                </div>

                {/* 1. Background — Pink Toy Room gradient */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, #FFD6E7 0%, #FFADD6 55%, #FF80C0 100%)" }}
                />

                {/* 2. ดาวกะพริบ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {stars.map((s) => (
                        <div
                            key={s.id}
                            className="absolute select-none"
                            style={{
                                left: `${s.x}%`,
                                top: `${s.y}%`,
                                fontSize: `${s.size}px`,
                                color: "#fff",
                                textShadow: "0 0 8px #FFB6D9, 0 0 16px #FF80C0",
                                transform: "translate(-50%, -50%)",
                                animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
                            }}
                        >
                            ★
                        </div>
                    ))}
                </div>

                {/* 3. รูปทรง — กระจายสุ่มทั่วฉาก + bobbing animation */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {(() => {
                        const n = placements.length;

                        // ── Grid layout ──────────────────────────────────────────────
                        const cols = Math.ceil(Math.sqrt(n * 1.6));
                        const rows = Math.ceil(n / cols);

                        // Safe zone: ขยายเต็มฉาก ทับหญ้าและขอบได้
                        const safeX1 = 5, safeX2 = 95;
                        const safeY1 = 4, safeY2 = 85;
                        const cellW = (safeX2 - safeX1) / cols;
                        const cellH = (safeY2 - safeY1) / rows;

                        // ── Deterministic Fisher-Yates shuffle ────────────────────────
                        // สุ่มลำดับ cell ก่อน เพื่อไม่ให้ type เดียวกันเรียงต่อกัน
                        const cellIndices = Array.from({ length: n }, (_, i) => i);
                        for (let i = n - 1; i > 0; i--) {
                            // ใช้ level seed + position เพื่อให้ผลเดิมทุกครั้ง
                            const seed = `shuffle_${n}_${i}`;
                            const j = Math.floor(getDeterministicRandom(seed) * (i + 1));
                            [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
                        }

                        return placements.map((p, originalIndex) => {
                            // ตำแหน่ง cell ที่ถูก shuffle แล้ว
                            const cellIndex = cellIndices[originalIndex];
                            const col = cellIndex % cols;
                            const row = Math.floor(cellIndex / cols);

                            // jitter สูงสุด 90% ของ cell เพื่อกระจายมากขึ้น
                            const jitterX = getDeterministicRandom(p.id + 'jx') * cellW * 0.9 - cellW * 0.45;
                            const jitterY = getDeterministicRandom(p.id + 'jy') * cellH * 0.9 - cellH * 0.45;

                            // ─── round ทุกค่าก่อนใส่ style เพื่อป้องกัน Hydration Mismatch ───
                            const posX = +Math.min(Math.max(safeX1 + col * cellW + cellW / 2 + jitterX, safeX1), safeX2).toFixed(4);
                            const posY = +Math.min(Math.max(safeY1 + row * cellH + cellH / 2 + jitterY, safeY1), safeY2).toFixed(4);

                            // สุ่มขนาดระหว่าง 0.8 ถึง 1.1
                            const randomScale = 0.8 + getDeterministicRandom(p.id + 'scale') * 0.3;
                            const finalSize = +(p.size * randomScale).toFixed(2);

                            // สุ่ม delay และ duration สำหรับ animation ลอย
                            const animDelay = `${+(getDeterministicRandom(p.id + 'anim') * 2.5).toFixed(4)}s`;
                            const animDuration = `${+(2.5 + getDeterministicRandom(p.id + 'dur') * 2).toFixed(4)}s`;

                            // สุ่มองศาหมุน ±35° แบบ deterministic
                            const rotation = +((getDeterministicRandom(p.id + 'rot') * 70) - 35).toFixed(2);

                            return (
                                <div
                                    key={p.id}
                                    className="absolute pointer-events-auto cursor-pointer"
                                    style={{
                                        left: `${posX}%`,
                                        top: `${posY}%`,
                                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                        width: `${finalSize}px`,
                                        height: `${finalSize}px`,
                                    }}
                                >
                                    <div
                                        className="w-full h-full shape-pop-in"
                                        style={{ animationDelay: `${(originalIndex * 0.1).toFixed(2)}s` }}
                                    >
                                        <div className="w-full h-full responsive-shape-scale">
                                            <div
                                                className="w-full h-full animate-float-bob flex items-center justify-center"
                                                style={{
                                                    animationDelay: animDelay,
                                                    animationDuration: animDuration,
                                                }}
                                            >
                                                <ShapeIcon
                                                    type={p.type}
                                                    size={finalSize}
                                                    className="drop-shadow-md"
                                                    hoverable
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>

            <style>{`
                @keyframes float-bob {
                    0%   { transform: translateY(0px); }
                    50%  { transform: translateY(-8px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float-bob { animation: float-bob 10s ease-in-out infinite; }
                    
                @media (max-width: 1023px) {
                    .responsive-shape-scale {
                        transform: scale(0.65);
                        transform-origin: center;
                    }
                }
                    
                @keyframes twinkle {
                    0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
                    50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.4); }
                }

                .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

                @keyframes pop-in {
                    0%   { transform: scale(0);    opacity: 0; }
                    55%  { transform: scale(1.28); opacity: 1; }
                    75%  { transform: scale(0.88); }
                    100% { transform: scale(1);    opacity: 1; }
                }
                .shape-pop-in {
                    animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                /* ── shape-lift hover (ใส่ที่นี่ที่เดียว ไม่ inject ซ้ำต่อ instance) ── */
                .shape-lift {
                    transition:
                        transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                        filter    0.18s ease;
                }
                .shape-lift:hover {
                    transform: translateY(-10px) scale(1.12);
                    filter: drop-shadow(0 14px 8px rgba(0,0,0,0.22))
                            drop-shadow(0 4px 4px rgba(0,0,0,0.14));
                }
                .shape-lift:active {
                    transform: translateY(-4px) scale(1.05);
                    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.18));
                }
            `}</style>
        </div>
    );
}
