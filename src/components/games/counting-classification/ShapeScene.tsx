"use client";

import React from "react";
import { type ShapePlacement } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

interface ShapeSceneProps {
    placements: ShapePlacement[];
}

/**
 * พื้นที่แสดงรูปทรงฝั่งซ้าย (Theme: Vibrant Kawaii Pastel Pink to Yellow)
 */
export const ShapeScene = React.memo(function ShapeScene({ placements }: ShapeSceneProps) {
    // ฟังก์ชันช่วยสุ่มเลขที่มีค่าเท่าเดิมเสมอสำหรับ id เดิม (กัน Hydration Mismatch)
    const getDeterministicRandom = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(Math.sin(hash));
    };

    return (
        <div className="flex flex-col h-full relative">

            {/* Scene container */}
            <div className="relative flex-1 rounded-[22px] overflow-hidden bg-transparent shadow-inner">

                {/* Header overlay inside scene */}
                <div className="absolute top-2 left-0 right-0 z-30 flex items-center justify-center pointer-events-none">
                    <div 
                        className="px-6 py-2 rounded-[30px] flex items-center justify-center"
                        style={{
                            background: "rgba(255,255,255,0.9)",
                            boxShadow: "0 4px 12px rgba(255,182,193,0.4), inset 0 -3px 0 rgba(220,230,240,0.9)",
                            border: "3px solid #E8F4F8"
                        }}
                    >
                        <span
                            className="text-sm sm:text-base font-extrabold tracking-wide"
                            style={{
                                color: "#6A8DBA",
                                textShadow: "0 1px 0 rgba(255,255,255,1)"
                            }}
                        >
                            มองหาและนับรูปทรงในภาพ!
                        </span>
                    </div>
                </div>

                {/* ── Scene Background: Vibrant Pastel Pink → Peach → Light Yellow ── */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(180deg, #FFCDE0 0%, #FFE2C7 45%, #FFF8B0 100%)",
                    }}
                />

                {/* ── Cute Clouds (Static + Floating) ── */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Top Left Cloud (With Face) */}
                    <div className="absolute top-[8%] left-[5%] opacity-90 animate-pulse-slow">
                        <CuteCloud withFace scale={1.2} />
                    </div>
                    {/* Top Right Cloud */}
                    <div className="absolute top-[12%] right-[8%] opacity-85" style={{ animation: "float-bob 8s ease-in-out infinite" }}>
                        <CuteCloud scale={0.9} />
                    </div>
                    {/* Mid Left Cloud */}
                    <div className="absolute top-[35%] left-[-2%] opacity-80" style={{ animation: "float-bob 12s ease-in-out infinite reverse" }}>
                        <CuteCloud scale={1.4} />
                    </div>
                    {/* Mid Right Cloud (With Face) */}
                    <div className="absolute top-[40%] right-[2%] opacity-90 animate-pulse-slow">
                        <CuteCloud withFace scale={1.1} />
                    </div>
                    {/* Top Center-ish Cloud */}
                    <div className="absolute top-[25%] left-[45%] opacity-75" style={{ animation: "float-bob 9s ease-in-out infinite" }}>
                        <CuteCloud scale={0.7} />
                    </div>
                </div>

                {/* ── Sparkles in the sky ── */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[15%] left-[30%] opacity-80 animate-pulse-slow"><Sparkle scale={0.8} /></div>
                    <div className="absolute top-[30%] right-[25%] opacity-70" style={{ animation: "pulse 3s infinite" }}><Sparkle scale={0.6} /></div>
                    <div className="absolute top-[45%] left-[15%] opacity-90" style={{ animation: "pulse 2.5s infinite" }}><Sparkle scale={1} /></div>
                </div>

                {/* ── Single Green Hill (More Saturated & Darker) ── */}
                <div className="absolute bottom-0 left-0 w-full h-[35%] z-0 pointer-events-none">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 250" preserveAspectRatio="none">
                        <path d="M0,80 C400,200 800,20 1440,100 L1440,250 L0,250 Z" fill="#8BC34A" />
                        {/* Soft highlight on the hill */}
                        <path d="M0,80 C400,200 800,20 1440,100 L1440,115 C800,35 400,215 0,95 Z" fill="#9CCC65" opacity="0.6" />
                    </svg>

                    {/* Grass details */}
                    <div className="absolute bottom-[20%] left-[15%]"><Grass /></div>
                    <div className="absolute bottom-[10%] left-[30%]"><Grass scale={0.8} /></div>
                    <div className="absolute bottom-[18%] left-[55%]"><Grass scale={1.2} /></div>
                    <div className="absolute bottom-[12%] right-[25%]"><Grass /></div>
                    <div className="absolute bottom-[25%] right-[10%]"><Grass scale={0.9} /></div>

                    {/* Dark Green Bushes */}
                    <div className="absolute bottom-[-10%] left-[-5%]">
                        <Bush scale={1.2} color="#558B2F" />
                    </div>
                    <div className="absolute bottom-[-5%] right-[-2%]">
                        <Bush scale={1.4} color="#689F38" />
                    </div>
                    <div className="absolute bottom-[2%] left-[8%]">
                        <Bush scale={0.7} color="#689F38" />
                    </div>
                </div>

                {/* รูปทรง — กระจายสุ่มทั่วฉาก + bobbing animation */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {(() => {
                        const n = placements.length;

                        // ── Grid layout ──────────────────────────────────────────────
                        const cols = Math.ceil(Math.sqrt(n * 1.6));
                        const rows = Math.ceil(n / cols);

                        // Safe zone: ขยายเต็มฉาก ทับหญ้าและขอบได้
                        const safeX1 = 5, safeX2 = 95;
                        const safeY1 = 15, safeY2 = 85;
                        const cellW = (safeX2 - safeX1) / cols;
                        const cellH = (safeY2 - safeY1) / rows;

                        // ── Deterministic Fisher-Yates shuffle ────────────────────────
                        const cellIndices = Array.from({ length: n }, (_, i) => i);
                        for (let i = n - 1; i > 0; i--) {
                            const seed = `shuffle_${n}_${i}`;
                            const j = Math.floor(getDeterministicRandom(seed) * (i + 1));
                            [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
                        }

                        return placements.map((p, originalIndex) => {
                            const cellIndex = cellIndices[originalIndex];
                            const col = cellIndex % cols;
                            const row = Math.floor(cellIndex / cols);

                            const jitterX = getDeterministicRandom(p.id + 'jx') * cellW * 0.9 - cellW * 0.45;
                            const jitterY = getDeterministicRandom(p.id + 'jy') * cellH * 0.9 - cellH * 0.45;

                            const posX = +Math.min(Math.max(safeX1 + col * cellW + cellW / 2 + jitterX, safeX1), safeX2).toFixed(4);
                            const posY = +Math.min(Math.max(safeY1 + row * cellH + cellH / 2 + jitterY, safeY1), safeY2).toFixed(4);

                            const randomScale = 0.8 + getDeterministicRandom(p.id + 'scale') * 0.3;
                            const finalSize = +(p.size * randomScale).toFixed(2);

                            const animDelay = `${+(getDeterministicRandom(p.id + 'anim') * 2.5).toFixed(4)}s`;
                            const animDuration = `${+(2.5 + getDeterministicRandom(p.id + 'dur') * 2).toFixed(4)}s`;

                            const rotation = +((getDeterministicRandom(p.id + 'rot') * 70) - 35).toFixed(2);

                            return (
                                <div
                                    key={p.id}
                                    className="absolute pointer-events-auto cursor-pointer shape-lift"
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
                                                <div 
                                                    style={{
                                                        // เพิ่มขอบขาวหนาให้รูปทรงดูเป็น sticker เด้งๆ 
                                                        filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.2)) drop-shadow(0px 0px 0px rgba(255,255,255,0.9))"
                                                    }}
                                                >
                                                    <ShapeIcon
                                                        type={p.type}
                                                        size={finalSize}
                                                        className="drop-shadow-sm"
                                                        hoverable
                                                    />
                                                </div>
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

                /* ── shape-lift hover ── */
                .shape-lift {
                    transition:
                        transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                        filter    0.18s ease;
                }
                .shape-lift:hover {
                    transform: translateY(-10px) scale(1.12);
                    filter: drop-shadow(0 14px 8px rgba(0,0,0,0.25))
                            drop-shadow(0 4px 4px rgba(0,0,0,0.15));
                }
                .shape-lift:active {
                    transform: translateY(-4px) scale(1.05);
                    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
                }

                @media (max-width: 1023px) {
                    .responsive-shape-scale {
                        transform: scale(0.70);
                        transform-origin: center center;
                    }
                }
            `}</style>
        </div>
    );
});

/** ก้อนเมฆน่ารัก */
function CuteCloud({ withFace = false, scale = 1 }: { withFace?: boolean, scale?: number }) {
    return (
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
            <svg width="140" height="90" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 8px 12px rgba(255,160,180,0.25))" }}>
                {/* Cloud body */}
                <path d="M45 80C25.67 80 10 64.33 10 45C10 27.6 22.68 13.15 39.52 10.58C46.68 4.08 56.4 0 67 0C84.45 0 99.1 11.55 104.38 27.35C107.03 26.47 109.93 26 113 26C126.8 26 138 37.2 138 51C138 64.8 126.8 76 113 76H110C110 78.2 110 80 110 80H45Z" fill="white" />
                
                {/* Face */}
                {withFace && (
                    <g transform="translate(60, 45)">
                        {/* Eyes */}
                        <circle cx="-12" cy="0" r="3.5" fill="#5C4D5D" />
                        <circle cx="12" cy="0" r="3.5" fill="#5C4D5D" />
                        {/* Smile */}
                        <path d="M-4 6C-4 6 -2 9 0 9C2 9 4 6 4 6" stroke="#5C4D5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Blush */}
                        <ellipse cx="-18" cy="4" rx="4" ry="2.5" fill="#FF9EAA" opacity="0.85" />
                        <ellipse cx="18" cy="4" rx="4" ry="2.5" fill="#FF9EAA" opacity="0.85" />
                    </g>
                )}
            </svg>
        </div>
    );
}

/** วิ้งๆ (Sparkle) */
function Sparkle({ scale = 1 }: { scale?: number }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${scale})` }}>
            <path d="M12 0C12 0 13.5 9 24 12C24 12 14.5 14 12 24C12 24 10.5 15 0 12C0 12 9.5 10 12 0Z" fill="white" />
        </svg>
    );
}

/** หญ้าเล็กๆ */
function Grass({ scale = 1 }: { scale?: number }) {
    return (
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${scale})` }}>
            <path d="M10 15C10 15 8 5 2 0C8 5 10 15 10 15Z" fill="#689F38" />
            <path d="M10 15C10 15 12 5 18 0C12 5 10 15 10 15Z" fill="#7CB342" />
        </svg>
    );
}

/** พุ่มไม้ (Bush) */
function Bush({ scale = 1, color = "#689F38" }: { scale?: number, color?: string }) {
    return (
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${scale})`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}>
            <path d="M60 10C75 10 88 20 95 35C110 38 120 50 120 65C120 75 110 80 100 80H20C10 80 0 75 0 65C0 50 10 38 25 35C32 20 45 10 60 10Z" fill={color} />
            <path d="M60 15C72 15 82 23 88 35C100 37 108 47 108 58C108 65 102 70 95 70H25C18 70 12 65 12 58C12 47 20 37 32 35C38 23 48 15 60 15Z" fill="white" opacity="0.15" />
        </svg>
    );
}
