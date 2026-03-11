"use client";

import Image from "next/image";
import { type ShapePlacement } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

import SkyGradientSvg from "./decorate/sky-gradient.svg";
import GrassStripSvg from "./decorate/grass-strip.svg";
import CloudPinkSvg from "./decorate/cloud-pink.svg";
import FlowerPinkSvg from "./decorate/flower-pink.svg";
import BushSmallSvg from "./decorate/bush-small.svg";

interface ShapeSceneProps {
    placements: ShapePlacement[];
}

/**
 * พื้นที่แสดงรูปทรงฝั่งซ้าย (Theme: Soft Meadow วงกตหญ้าสีชมพู)
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

    return (
        <div className="flex flex-col h-full relative">
            {/* Header */}
            <p className="text-center text-xl font-bold text-[#8B5E34] mb-2 z-10">
                พบเจอกล่องสมบัติน่ารักๆ อะไรบ้าง?
            </p>

            {/* Scene container */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-transparent">

                {/* 1. Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src={SkyGradientSvg} alt="Sky" fill className="object-cover" />
                </div>

                {/* 2. เมฆ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <Image src={CloudPinkSvg} alt="Cloud" width={150} height={90} className="absolute top-[5%] left-[10%] opacity-80 animate-cloud-slow" />
                    <Image src={CloudPinkSvg} alt="Cloud" width={100} height={60} className="absolute top-[18%] right-[15%] opacity-60 animate-cloud-med" style={{ transform: "scaleX(-1)" }} />
                    <Image src={CloudPinkSvg} alt="Cloud" width={120} height={70} className="absolute top-[40%] left-[60%] opacity-70 animate-cloud-fast" />
                </div>

                {/* 3. พื้นหญ้า */}
                <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none h-[40%]">
                    <Image src={GrassStripSvg} alt="Grass" fill className="object-cover object-bottom" />
                </div>

                {/* 4. พุ่มไม้ + ดอกไม้ */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Bushes */}
                    <Image src={BushSmallSvg} alt="Bush" width={80} height={50} className="absolute bottom-[-1px] left-[-10px]" />
                    <Image src={BushSmallSvg} alt="Bush" width={100} height={65} className="absolute bottom-[-1px] right-[-15px]" style={{ transform: "scaleX(-1)" }} />

                    {/* Flowers */}
                    <Image src={FlowerPinkSvg} alt="Flower" width={30} height={30} className="absolute bottom-[10%] left-[15%]" />
                    <Image src={FlowerPinkSvg} alt="Flower" width={20} height={20} className="absolute bottom-[25%] left-[8%]" />
                    <Image src={FlowerPinkSvg} alt="Flower" width={40} height={40} className="absolute bottom-[5%] right-[20%]" />
                    <Image src={FlowerPinkSvg} alt="Flower" width={30} height={30} className="absolute bottom-[15%] right-[5%]" />
                </div>

                {/* 5. รูปทรง — กระจายสุ่มทั่วฉาก + bobbing animation */}
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

                            return (
                                <div
                                    key={p.id}
                                    className="absolute pointer-events-auto cursor-pointer"
                                    style={{
                                        left: `${posX}%`,
                                        top: `${posY}%`,
                                        transform: "translate(-50%, -50%)",
                                        width: `${finalSize}px`,
                                        height: `${finalSize}px`,
                                    }}
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
                    
                @keyframes cloud-move {
                    0% { transform: translateX(-50px); }
                    50% { transform: translateX(30px); }
                    100% { transform: translateX(-50px); }
                }
                .animate-cloud-slow { animation: cloud-move 20s ease-in-out infinite; }
                .animate-cloud-med { animation: cloud-move 15s ease-in-out infinite reverse; }
                .animate-cloud-fast { animation: cloud-move 12s ease-in-out infinite; }

                .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            `}</style>
        </div>
    );
}
