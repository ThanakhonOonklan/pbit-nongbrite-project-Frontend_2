"use client";

import { type ShapeType, SHAPE_COLORS } from "@/constants/games/counting-classification-levels";

interface ShapeIconProps {
    type: ShapeType;
    size?: number;
    color?: string;
    className?: string;
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
 */
export function ShapeIcon({ type, size = 48, color, className = "" }: ShapeIconProps) {
    const fill = color ?? SHAPE_COLORS[type];
    const half = size / 2;
    const pad = size * 0.08;
    const r = half - pad;

    if (type === "circle") {
        return (
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className={className}
                aria-label="วงกลม"
            >
                <circle cx={half} cy={half} r={r} fill={fill} />
            </svg>
        );
    }

    const sides = SHAPE_SIDES[type];
    if (!sides) return null;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            aria-label={type}
        >
            <polygon points={polygonPoints(sides, half, half, r)} fill={fill} />
        </svg>
    );
}
