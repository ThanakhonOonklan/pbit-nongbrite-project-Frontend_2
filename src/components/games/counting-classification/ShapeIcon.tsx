"use client";

import Image from "next/image";
import { type ShapeType } from "@/constants/games/counting-classification-levels";

// ── นำเข้าภาพ SVG จากโฟลเดอร์ shape ──
import CircleSvg from "./shape/circle.svg";
import TriangleSvg from "./shape/triangle.svg";
import SquareSvg from "./shape/square.svg";
import PentagonSvg from "./shape/pentagon.svg";
import HexagonSvg from "./shape/hexagon.svg";

interface ShapeIconProps {
    type: ShapeType;
    size?: number;
    className?: string;
    /** เมื่อ true จะ animate "หยิบขึ้น" เมื่อ hover */
    hoverable?: boolean;
}

const SHAPE_IMAGES: Record<ShapeType, any> = {
    circle: CircleSvg,
    triangle: TriangleSvg,
    square: SquareSvg,
    pentagon: PentagonSvg,
    hexagon: HexagonSvg,
};


export function ShapeIcon({ type, size = 48, className = "", hoverable = false }: ShapeIconProps) {
    const src = SHAPE_IMAGES[type];

    if (!src) return null;

    const imgEl = (
        <Image
            src={src}
            alt={type}
            width={size}
            height={size}
            className="object-contain"
            // ป้องกันลากรูป
            draggable={false}
        />
    );

    /* ── ไม่ hoverable: ห่อแค่ span เปล่า ─────────────────── */
    if (!hoverable) {
        return <span className={`inline-flex items-center justify-center ${className}`}>{imgEl}</span>;
    }

    /* ── hoverable: lift animation ──────────────────────────── */
    return (
        <>
            <span
                className={`shape-lift inline-flex items-center justify-center cursor-pointer select-none ${className}`}
                style={{ willChange: "transform, filter", width: size, height: size }}
            >
                {imgEl}
            </span>

            <style>{`
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
        </>
    );
}
