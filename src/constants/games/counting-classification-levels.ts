// Counting & Classification Game Level Configs
// นับจำนวนและจัดหมวดหมู่รูปทรงเลขาคณิต

import { type Difficulty } from "@/lib/games/types";

// ── Shape Types ────────────────────────────────────────────────
export type ShapeType = "circle" | "triangle" | "square" | "pentagon" | "hexagon";

/** สีประจำรูปทรง */
export const SHAPE_COLORS: Record<ShapeType, string> = {
    circle: "#FF6B6B",
    triangle: "#FFB347",
    square: "#4ECDC4",
    pentagon: "#A78BFA",
    hexagon: "#34D399",
};

/** ชื่อภาษาไทยของรูปทรง */
export const SHAPE_LABELS: Record<ShapeType, string> = {
    circle: "วงกลม",
    triangle: "สามเหลี่ยม",
    square: "สี่เหลี่ยม",
    pentagon: "ห้าเหลี่ยม",
    hexagon: "หกเหลี่ยม",
};

/** ตำแหน่งและขนาดของรูปทรงแต่ละชิ้นในฉาก */
export interface ShapePlacement {
    id: string;
    type: ShapeType;
    /** x offset จากซ้ายของ scene (%) */
    x: number;
    /** y offset จากบนของ scene (%) */
    y: number;
    /** ขนาด (px) */
    size: number;
}

export interface CountingClassificationLevelConfig {
    level: number;
    difficulty: Difficulty;
    /** รูปทรงทั้งหมดในฉาก — ตำแหน่งและขนาดกำหนดตายตัว */
    shapes: ShapePlacement[];
    /** ประเภทรูปทรงที่ต้องตอบ (deduped จาก shapes) */
    shapeTypes: ShapeType[];
}

// ── Level Data ─────────────────────────────────────────────────

export const countingClassificationLevels: Record<number, CountingClassificationLevelConfig> = {

    // ─── Level 1 — easy | วงกลม + สามเหลี่ยม | 4 รูป ─────────
    1: {
        level: 1, difficulty: "easy",
        shapeTypes: ["circle", "triangle"],
        shapes: [
            { id: "c1", type: "circle", x: 20, y: 20, size: 64 },
            { id: "t1", type: "triangle", x: 60, y: 15, size: 64 },
            { id: "c2", type: "circle", x: 15, y: 58, size: 56 },
            { id: "t2", type: "triangle", x: 58, y: 55, size: 72 },
        ],
    },

    // ─── Level 2 — easy | วงกลม + สามเหลี่ยม | 5 รูป ─────────
    2: {
        level: 2, difficulty: "easy",
        shapeTypes: ["circle", "triangle"],
        shapes: [
            { id: "c1", type: "circle", x: 12, y: 12, size: 60 },
            { id: "t1", type: "triangle", x: 55, y: 10, size: 68 },
            { id: "c2", type: "circle", x: 10, y: 55, size: 68 },
            { id: "t2", type: "triangle", x: 55, y: 55, size: 60 },
            { id: "t3", type: "triangle", x: 33, y: 32, size: 56 },
        ],
    },

    // ─── Level 3 — easy | วงกลม + สามเหลี่ยม | 6 รูป ─────────
    3: {
        level: 3, difficulty: "easy",
        shapeTypes: ["circle", "triangle"],
        shapes: [
            { id: "c1", type: "circle", x: 10, y: 10, size: 64 },
            { id: "c2", type: "circle", x: 58, y: 10, size: 56 },
            { id: "t1", type: "triangle", x: 10, y: 54, size: 68 },
            { id: "t2", type: "triangle", x: 56, y: 52, size: 60 },
            { id: "c3", type: "circle", x: 32, y: 28, size: 60 },
            { id: "t3", type: "triangle", x: 34, y: 60, size: 52 },
        ],
    },

    // ─── Level 4 — normal | + สี่เหลี่ยม | 6 รูป ─────────────
    4: {
        level: 4, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "c1", type: "circle", x: 10, y: 10, size: 60 },
            { id: "t1", type: "triangle", x: 55, y: 10, size: 64 },
            { id: "s1", type: "square", x: 10, y: 55, size: 60 },
            { id: "c2", type: "circle", x: 55, y: 55, size: 56 },
            { id: "t2", type: "triangle", x: 30, y: 25, size: 56 },
            { id: "s2", type: "square", x: 32, y: 58, size: 52 },
        ],
    },

    // ─── Level 5 — normal | + สี่เหลี่ยม | 8 รูป ─────────────
    5: {
        level: 5, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "c1", type: "circle", x: 8, y: 8, size: 58 },
            { id: "t1", type: "triangle", x: 52, y: 8, size: 62 },
            { id: "s1", type: "square", x: 8, y: 52, size: 58 },
            { id: "c2", type: "circle", x: 52, y: 52, size: 54 },
            { id: "t2", type: "triangle", x: 28, y: 22, size: 54 },
            { id: "s2", type: "square", x: 28, y: 58, size: 50 },
            { id: "c3", type: "circle", x: 72, y: 30, size: 52 },
            { id: "t3", type: "triangle", x: 72, y: 65, size: 50 },
        ],
    },

    // ─── Level 6 — normal | + สี่เหลี่ยม | 9 รูป ─────────────
    6: {
        level: 6, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "c1", type: "circle", x: 8, y: 8, size: 56 },
            { id: "t1", type: "triangle", x: 45, y: 8, size: 60 },
            { id: "s1", type: "square", x: 76, y: 8, size: 52 },
            { id: "c2", type: "circle", x: 8, y: 52, size: 54 },
            { id: "t2", type: "triangle", x: 45, y: 52, size: 56 },
            { id: "s2", type: "square", x: 76, y: 52, size: 54 },
            { id: "t3", type: "triangle", x: 25, y: 30, size: 50 },
            { id: "s3", type: "square", x: 60, y: 30, size: 50 },
            { id: "c3", type: "circle", x: 25, y: 72, size: 48 },
        ],
    },

    // ─── Level 7 — hard | + ห้าเหลี่ยม | 10 รูป ──────────────
    7: {
        level: 7, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "c1", type: "circle", x: 6, y: 6, size: 54 },
            { id: "t1", type: "triangle", x: 38, y: 6, size: 58 },
            { id: "s1", type: "square", x: 68, y: 6, size: 52 },
            { id: "p1", type: "pentagon", x: 6, y: 48, size: 56 },
            { id: "c2", type: "circle", x: 38, y: 48, size: 52 },
            { id: "t2", type: "triangle", x: 68, y: 48, size: 54 },
            { id: "s2", type: "square", x: 20, y: 26, size: 48 },
            { id: "p2", type: "pentagon", x: 55, y: 26, size: 50 },
            { id: "c3", type: "circle", x: 20, y: 68, size: 48 },
            { id: "t3", type: "triangle", x: 55, y: 68, size: 46 },
        ],
    },

    // ─── Level 8 — hard | + ห้าเหลี่ยม | 11 รูป ─────────────
    8: {
        level: 8, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "c1", type: "circle", x: 5, y: 5, size: 52 },
            { id: "t1", type: "triangle", x: 34, y: 5, size: 56 },
            { id: "s1", type: "square", x: 64, y: 5, size: 50 },
            { id: "p1", type: "pentagon", x: 5, y: 44, size: 54 },
            { id: "c2", type: "circle", x: 34, y: 44, size: 50 },
            { id: "t2", type: "triangle", x: 64, y: 44, size: 52 },
            { id: "s2", type: "square", x: 18, y: 24, size: 48 },
            { id: "p2", type: "pentagon", x: 50, y: 24, size: 50 },
            { id: "c3", type: "circle", x: 78, y: 24, size: 46 },
            { id: "t3", type: "triangle", x: 18, y: 66, size: 46 },
            { id: "s3", type: "square", x: 50, y: 66, size: 48 },
        ],
    },

    // ─── Level 9 — hard | + หกเหลี่ยม | 12 รูป ───────────────
    9: {
        level: 9, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon", "hexagon"],
        shapes: [
            { id: "c1", type: "circle", x: 5, y: 5, size: 50 },
            { id: "t1", type: "triangle", x: 30, y: 5, size: 54 },
            { id: "s1", type: "square", x: 58, y: 5, size: 50 },
            { id: "h1", type: "hexagon", x: 80, y: 5, size: 52 },
            { id: "p1", type: "pentagon", x: 5, y: 44, size: 52 },
            { id: "c2", type: "circle", x: 30, y: 44, size: 48 },
            { id: "t2", type: "triangle", x: 58, y: 44, size: 50 },
            { id: "s2", type: "square", x: 80, y: 44, size: 48 },
            { id: "h2", type: "hexagon", x: 17, y: 24, size: 48 },
            { id: "p2", type: "pentagon", x: 44, y: 24, size: 50 },
            { id: "c3", type: "circle", x: 70, y: 24, size: 46 },
            { id: "t3", type: "triangle", x: 17, y: 67, size: 46 },
        ],
    },
};
