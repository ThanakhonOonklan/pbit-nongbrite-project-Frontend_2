"use client";

import { type ShapeType, SHAPE_COLORS } from "@/constants/games/counting-classification-levels";

interface ShapeIconProps {
    type: ShapeType;
    size?: number;
    color?: string;
    className?: string;
    /** เมื่อ true จะ animate "หยิบขึ้น" เมื่อ hover */
    hoverable?: boolean;
}

/** คำนวณ points ของ polygon รูป n เหลี่ยม */
function polygonPoints(sides: number, cx: number, cy: number, r: number): string {
    return Array.from({ length: sides }, (_, i) => {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
    }).join(" ");
}

const SHAPE_SIDES: Partial<Record<ShapeType, number>> = {
    triangle: 3,
    square: 4,
    pentagon: 5,
    hexagon: 6,
};

/**
 * SVG renderer สำหรับรูปทรงเลขาคณิต
 * รองรับ: circle, triangle, square, pentagon, hexagon
 *
 * hoverable={true} → เพิ่ม hover effect "หยิบขึ้น" (lift + scale + shadow)
 */
export function ShapeIcon({ type, size = 48, color, className = "", hoverable = false }: ShapeIconProps) {
    const fill = color ?? SHAPE_COLORS[type];
    const half = size / 2;
    const pad = size * 0.08;
    const r = half - pad;

    // สร้าง SVG element
    const svgEl =
        type === "circle" ? (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="วงกลม">
                <circle cx={half} cy={half} r={r} fill={fill} />
            </svg>
        ) : (() => {
            const sides = SHAPE_SIDES[type];
            if (!sides) return null;
            return (
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={type}>
                    <polygon points={polygonPoints(sides, half, half, r)} fill={fill} />
                </svg>
            );
        })();

    if (!svgEl) return null;

    /* ── ไม่ hoverable: ห่อแค่ span เปล่า ─────────────────── */
    if (!hoverable) {
        return <span className={`inline-flex ${className}`}>{svgEl}</span>;
    }

    /* ── hoverable: lift animation ──────────────────────────── */
    return (
        <>
            <span
                className={`shape-lift inline-flex cursor-pointer select-none ${className}`}
                style={{ willChange: "transform, filter" }}
            >
                {svgEl}
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
