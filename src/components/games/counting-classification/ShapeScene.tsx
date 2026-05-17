"use client";

import React, { useRef, useCallback } from "react";
import { type ShapePlacement, type ShapeType } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

const SHAPE_AUDIO: Record<ShapeType, string> = {
    circle:   "/audio/games/counting-classification/circle.wav",
    triangle: "/audio/games/counting-classification/triangle.wav",
    square:   "/audio/games/counting-classification/square.wav",
    pentagon: "/audio/games/counting-classification/pentagon.wav",
    hexagon:  "/audio/games/counting-classification/hexagon.wav",
};

interface ShapeSceneProps {
    placements: ShapePlacement[];
}

/**
 * พื้นที่แสดงรูปทรงฝั่งซ้าย (Theme: Vibrant Kawaii Pastel Pink to Yellow)
 */
export const ShapeScene = React.memo(function ShapeScene({ placements }: ShapeSceneProps) {
    const shapeAudioRef = useRef<HTMLAudioElement | null>(null);

    const playShapeAudio = useCallback((type: ShapeType) => {
        if (shapeAudioRef.current) {
            shapeAudioRef.current.pause();
            shapeAudioRef.current.currentTime = 0;
        }
        const audio = new Audio(SHAPE_AUDIO[type]);
        shapeAudioRef.current = audio;
        audio.play().catch(() => {});
    }, []);

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

                {/* ── Scene Background: Image ── */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat" 
                    style={{ backgroundImage: "url('/images/Background/counting-classificationBackgroundScene.png')" }}
                />

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
                                    onClick={() => playShapeAudio(p.type)}
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
                                                        filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.08)) drop-shadow(0px 0px 0px rgba(255,255,255,0.9))"
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

                .shape-lift {
                    transition:
                        transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                        filter    0.18s ease;
                }
                .shape-lift:hover {
                    transform: translateY(-10px) scale(1.12);
                    filter: drop-shadow(0 10px 8px rgba(0,0,0,0.12))
                            drop-shadow(0 4px 4px rgba(0,0,0,0.05));
                }
                .shape-lift:active {
                    transform: translateY(-4px) scale(1.05);
                    filter: drop-shadow(0 4px 4px rgba(0,0,0,0.1));
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
