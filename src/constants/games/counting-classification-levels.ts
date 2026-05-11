import { type Difficulty } from "@/lib/games/types";

export type ShapeType = "circle" | "triangle" | "square" | "pentagon" | "hexagon";

export const SHAPE_COLORS: Record<ShapeType, string> = {
    circle: "#FF6B6B",
    triangle: "#FFB347",
    square: "#4ECDC4",
    pentagon: "#A78BFA",
    hexagon: "#34D399",
};

export const SHAPE_LABELS: Record<ShapeType, string> = {
    circle: "วงกลม",
    triangle: "สามเหลี่ยม",
    square: "สี่เหลี่ยม",
    pentagon: "ห้าเหลี่ยม",
    hexagon: "หกเหลี่ยม",
};

export interface ShapePlacement {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    size: number;
}

export interface CountingClassificationLevelConfig {
    level: number;
    difficulty: Difficulty;
    shapes: ShapePlacement[];
    shapeTypes: ShapeType[];
}


export interface LevelSpec {
    difficulty: Difficulty;
    shapeTypes: ShapeType[];
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

