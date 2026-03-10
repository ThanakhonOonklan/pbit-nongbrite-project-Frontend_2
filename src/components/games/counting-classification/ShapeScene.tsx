"use client";

import { type ShapePlacement } from "@/constants/games/counting-classification-levels";
import { ShapeIcon } from "./ShapeIcon";

interface ShapeSceneProps {
    placements: ShapePlacement[];
}

/**
 * พื้นที่แสดงรูปทรงฝั่งซ้าย
 * รูปทรงแต่ละตัวถูกวางตายตัวตาม x%, y% และ size ใน config
 */
export function ShapeScene({ placements }: ShapeSceneProps) {
    return (
        <div className="flex flex-col gap-3 h-full">
            {/* Header */}
            <p className="text-center text-base font-bold text-[#3C3C3C]">
                นับรูปทรงกันเถอะ! 🔍
            </p>

            {/* Scene container */}
            <div
                className="relative flex-1 rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(160deg, #EEF6FF 0%, #D6ECFF 100%)" }}
            >
                {placements.map((p) => (
                    <div
                        key={p.id}
                        className="absolute"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                        }}
                    >
                        <ShapeIcon
                            type={p.type}
                            size={p.size}
                            className="drop-shadow-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
