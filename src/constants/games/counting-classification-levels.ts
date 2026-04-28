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
    /** ไม่ได้ใช้แล้ว — ShapeScene ใช้ scatter algorithm แทน */
    x: number;
    y: number;
    /** ขนาด (px) */
    size: number;
}

export interface CountingClassificationLevelConfig {
    level: number;
    difficulty: Difficulty;
    shapes: ShapePlacement[];
    shapeTypes: ShapeType[];
}

// ── Level Specs ─────────────────────────────────────────────────
// กำหนดกติกาแต่ละด่าน สำหรับสร้าง config สุ่มแบบ dynamic

/** ข้อมูลกำหนดของแต่ละด่าน */
export interface LevelSpec {
    difficulty: Difficulty;
    shapeTypes: ShapeType[];
    /** จำนวนรูปทรงทั้งหมดในด่านนี้ */
    total: number;
}

export const LEVEL_SPECS: Record<number, LevelSpec> = {
    1: { difficulty: "easy", shapeTypes: ["circle", "triangle", "square"], total: 10 },
    2: { difficulty: "easy", shapeTypes: ["circle", "triangle", "square"], total: 12 },
    3: { difficulty: "easy", shapeTypes: ["circle", "triangle", "square"], total: 14 },
    4: { difficulty: "normal", shapeTypes: ["circle", "triangle", "square", "pentagon"], total: 16 },
    5: { difficulty: "normal", shapeTypes: ["circle", "triangle", "square", "pentagon"], total: 18 },
    6: { difficulty: "normal", shapeTypes: ["circle", "triangle", "square", "pentagon"], total: 20 },
    7: { difficulty: "hard", shapeTypes: ["circle", "triangle", "square", "pentagon", "hexagon"], total: 22 },
    8: { difficulty: "hard", shapeTypes: ["circle", "triangle", "square", "pentagon", "hexagon"], total: 24 },
    9: { difficulty: "hard", shapeTypes: ["circle", "triangle", "square", "pentagon", "hexagon"], total: 26 },
};

// ── compat stub (ใช้ใน test_components เท่านั้น — จะถูกลบเมื่อ refactor เสร็จ) ──
export const countingClassificationLevels: Record<number, CountingClassificationLevelConfig> = {

    // ─── Level 1 — easy | 7 รูป | circle×4, triangle×2, square×1 ──
    1: {
        level: 1, difficulty: "easy",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "l1c1", type: "circle", x: 0, y: 0, size: 90 },
            { id: "l1c2", type: "circle", x: 0, y: 0, size: 88 },
            { id: "l1c3", type: "circle", x: 0, y: 0, size: 86 },
            { id: "l1c4", type: "circle", x: 0, y: 0, size: 90 },
            { id: "l1t1", type: "triangle", x: 0, y: 0, size: 90 },
            { id: "l1t2", type: "triangle", x: 0, y: 0, size: 86 },
            { id: "l1s1", type: "square", x: 0, y: 0, size: 90 },
        ],
    },

    // ─── Level 2 — easy | 8 รูป | circle×1, triangle×5, square×2 ──
    2: {
        level: 2, difficulty: "easy",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "l2c1", type: "circle", x: 0, y: 0, size: 88 },
            { id: "l2t1", type: "triangle", x: 0, y: 0, size: 88 },
            { id: "l2t2", type: "triangle", x: 0, y: 0, size: 86 },
            { id: "l2t3", type: "triangle", x: 0, y: 0, size: 84 },
            { id: "l2t4", type: "triangle", x: 0, y: 0, size: 86 },
            { id: "l2t5", type: "triangle", x: 0, y: 0, size: 88 },
            { id: "l2s1", type: "square", x: 0, y: 0, size: 88 },
            { id: "l2s2", type: "square", x: 0, y: 0, size: 84 },
        ],
    },

    // ─── Level 3 — easy | 9 รูป | circle×5, triangle×1, square×3 ──
    3: {
        level: 3, difficulty: "easy",
        shapeTypes: ["circle", "triangle", "square"],
        shapes: [
            { id: "l3c1", type: "circle", x: 0, y: 0, size: 86 },
            { id: "l3c2", type: "circle", x: 0, y: 0, size: 84 },
            { id: "l3c3", type: "circle", x: 0, y: 0, size: 82 },
            { id: "l3c4", type: "circle", x: 0, y: 0, size: 86 },
            { id: "l3c5", type: "circle", x: 0, y: 0, size: 84 },
            { id: "l3t1", type: "triangle", x: 0, y: 0, size: 86 },
            { id: "l3s1", type: "square", x: 0, y: 0, size: 86 },
            { id: "l3s2", type: "square", x: 0, y: 0, size: 84 },
            { id: "l3s3", type: "square", x: 0, y: 0, size: 80 },
        ],
    },

    // ─── Level 4 — normal | 11 รูป | circle×5, triangle×2, square×3, pentagon×1 ──
    4: {
        level: 4, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "l4c1", type: "circle", x: 0, y: 0, size: 82 },
            { id: "l4c2", type: "circle", x: 0, y: 0, size: 80 },
            { id: "l4c3", type: "circle", x: 0, y: 0, size: 78 },
            { id: "l4c4", type: "circle", x: 0, y: 0, size: 82 },
            { id: "l4c5", type: "circle", x: 0, y: 0, size: 80 },
            { id: "l4t1", type: "triangle", x: 0, y: 0, size: 82 },
            { id: "l4t2", type: "triangle", x: 0, y: 0, size: 78 },
            { id: "l4s1", type: "square", x: 0, y: 0, size: 82 },
            { id: "l4s2", type: "square", x: 0, y: 0, size: 80 },
            { id: "l4s3", type: "square", x: 0, y: 0, size: 76 },
            { id: "l4p1", type: "pentagon", x: 0, y: 0, size: 82 },
        ],
    },

    // ─── Level 5 — normal | 14 รูป | circle×2, triangle×7, square×4, pentagon×1 ──
    5: {
        level: 5, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "l5c1", type: "circle", x: 0, y: 0, size: 78 },
            { id: "l5c2", type: "circle", x: 0, y: 0, size: 76 },
            { id: "l5t1", type: "triangle", x: 0, y: 0, size: 78 },
            { id: "l5t2", type: "triangle", x: 0, y: 0, size: 76 },
            { id: "l5t3", type: "triangle", x: 0, y: 0, size: 74 },
            { id: "l5t4", type: "triangle", x: 0, y: 0, size: 76 },
            { id: "l5t5", type: "triangle", x: 0, y: 0, size: 78 },
            { id: "l5t6", type: "triangle", x: 0, y: 0, size: 76 },
            { id: "l5t7", type: "triangle", x: 0, y: 0, size: 74 },
            { id: "l5s1", type: "square", x: 0, y: 0, size: 78 },
            { id: "l5s2", type: "square", x: 0, y: 0, size: 76 },
            { id: "l5s3", type: "square", x: 0, y: 0, size: 74 },
            { id: "l5s4", type: "square", x: 0, y: 0, size: 76 },
            { id: "l5p1", type: "pentagon", x: 0, y: 0, size: 78 },
        ],
    },

    // ─── Level 6 — normal | 16 รูป | circle×8, triangle×1, square×5, pentagon×2 ──
    6: {
        level: 6, difficulty: "normal",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "l6c1", type: "circle", x: 0, y: 0, size: 76 },
            { id: "l6c2", type: "circle", x: 0, y: 0, size: 74 },
            { id: "l6c3", type: "circle", x: 0, y: 0, size: 72 },
            { id: "l6c4", type: "circle", x: 0, y: 0, size: 74 },
            { id: "l6c5", type: "circle", x: 0, y: 0, size: 76 },
            { id: "l6c6", type: "circle", x: 0, y: 0, size: 72 },
            { id: "l6c7", type: "circle", x: 0, y: 0, size: 74 },
            { id: "l6c8", type: "circle", x: 0, y: 0, size: 76 },
            { id: "l6t1", type: "triangle", x: 0, y: 0, size: 76 },
            { id: "l6s1", type: "square", x: 0, y: 0, size: 76 },
            { id: "l6s2", type: "square", x: 0, y: 0, size: 74 },
            { id: "l6s3", type: "square", x: 0, y: 0, size: 72 },
            { id: "l6s4", type: "square", x: 0, y: 0, size: 74 },
            { id: "l6s5", type: "square", x: 0, y: 0, size: 76 },
            { id: "l6p1", type: "pentagon", x: 0, y: 0, size: 76 },
            { id: "l6p2", type: "pentagon", x: 0, y: 0, size: 72 },
        ],
    },

    // ─── Level 7 — hard | 18 รูป | circle×3, triangle×9, square×2, pentagon×4 ──
    7: {
        level: 7, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "l7c1", type: "circle", x: 0, y: 0, size: 72 },
            { id: "l7c2", type: "circle", x: 0, y: 0, size: 70 },
            { id: "l7c3", type: "circle", x: 0, y: 0, size: 68 },
            { id: "l7t1", type: "triangle", x: 0, y: 0, size: 72 },
            { id: "l7t2", type: "triangle", x: 0, y: 0, size: 70 },
            { id: "l7t3", type: "triangle", x: 0, y: 0, size: 68 },
            { id: "l7t4", type: "triangle", x: 0, y: 0, size: 70 },
            { id: "l7t5", type: "triangle", x: 0, y: 0, size: 72 },
            { id: "l7t6", type: "triangle", x: 0, y: 0, size: 68 },
            { id: "l7t7", type: "triangle", x: 0, y: 0, size: 70 },
            { id: "l7t8", type: "triangle", x: 0, y: 0, size: 72 },
            { id: "l7t9", type: "triangle", x: 0, y: 0, size: 68 },
            { id: "l7s1", type: "square", x: 0, y: 0, size: 72 },
            { id: "l7s2", type: "square", x: 0, y: 0, size: 70 },
            { id: "l7p1", type: "pentagon", x: 0, y: 0, size: 72 },
            { id: "l7p2", type: "pentagon", x: 0, y: 0, size: 70 },
            { id: "l7p3", type: "pentagon", x: 0, y: 0, size: 68 },
            { id: "l7p4", type: "pentagon", x: 0, y: 0, size: 70 },
        ],
    },

    // ─── Level 8 — hard | 20 รูป | circle×9, triangle×2, square×8, pentagon×1 ──
    8: {
        level: 8, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon"],
        shapes: [
            { id: "l8c1", type: "circle", x: 0, y: 0, size: 70 },
            { id: "l8c2", type: "circle", x: 0, y: 0, size: 68 },
            { id: "l8c3", type: "circle", x: 0, y: 0, size: 66 },
            { id: "l8c4", type: "circle", x: 0, y: 0, size: 68 },
            { id: "l8c5", type: "circle", x: 0, y: 0, size: 70 },
            { id: "l8c6", type: "circle", x: 0, y: 0, size: 66 },
            { id: "l8c7", type: "circle", x: 0, y: 0, size: 68 },
            { id: "l8c8", type: "circle", x: 0, y: 0, size: 70 },
            { id: "l8c9", type: "circle", x: 0, y: 0, size: 68 },
            { id: "l8t1", type: "triangle", x: 0, y: 0, size: 70 },
            { id: "l8t2", type: "triangle", x: 0, y: 0, size: 66 },
            { id: "l8s1", type: "square", x: 0, y: 0, size: 70 },
            { id: "l8s2", type: "square", x: 0, y: 0, size: 68 },
            { id: "l8s3", type: "square", x: 0, y: 0, size: 66 },
            { id: "l8s4", type: "square", x: 0, y: 0, size: 68 },
            { id: "l8s5", type: "square", x: 0, y: 0, size: 70 },
            { id: "l8s6", type: "square", x: 0, y: 0, size: 66 },
            { id: "l8s7", type: "square", x: 0, y: 0, size: 68 },
            { id: "l8s8", type: "square", x: 0, y: 0, size: 70 },
            { id: "l8p1", type: "pentagon", x: 0, y: 0, size: 70 },
        ],
    },

    // ─── Level 9 — hard | 23 รูป | circle×9, triangle×2, square×5, pentagon×1, hexagon×6 ──
    9: {
        level: 9, difficulty: "hard",
        shapeTypes: ["circle", "triangle", "square", "pentagon", "hexagon"],
        shapes: [
            { id: "l9c1", type: "circle", x: 0, y: 0, size: 64 },
            { id: "l9c2", type: "circle", x: 0, y: 0, size: 62 },
            { id: "l9c3", type: "circle", x: 0, y: 0, size: 64 },
            { id: "l9c4", type: "circle", x: 0, y: 0, size: 62 },
            { id: "l9c5", type: "circle", x: 0, y: 0, size: 64 },
            { id: "l9c6", type: "circle", x: 0, y: 0, size: 62 },
            { id: "l9c7", type: "circle", x: 0, y: 0, size: 64 },
            { id: "l9c8", type: "circle", x: 0, y: 0, size: 62 },
            { id: "l9c9", type: "circle", x: 0, y: 0, size: 64 },
            { id: "l9t1", type: "triangle", x: 0, y: 0, size: 64 },
            { id: "l9t2", type: "triangle", x: 0, y: 0, size: 62 },
            { id: "l9s1", type: "square", x: 0, y: 0, size: 64 },
            { id: "l9s2", type: "square", x: 0, y: 0, size: 62 },
            { id: "l9s3", type: "square", x: 0, y: 0, size: 64 },
            { id: "l9s4", type: "square", x: 0, y: 0, size: 62 },
            { id: "l9s5", type: "square", x: 0, y: 0, size: 64 },
            { id: "l9p1", type: "pentagon", x: 0, y: 0, size: 64 },
            { id: "l9h1", type: "hexagon", x: 0, y: 0, size: 64 },
            { id: "l9h2", type: "hexagon", x: 0, y: 0, size: 62 },
            { id: "l9h3", type: "hexagon", x: 0, y: 0, size: 64 },
            { id: "l9h4", type: "hexagon", x: 0, y: 0, size: 62 },
            { id: "l9h5", type: "hexagon", x: 0, y: 0, size: 64 },
            { id: "l9h6", type: "hexagon", x: 0, y: 0, size: 62 },
        ],
    },
};
