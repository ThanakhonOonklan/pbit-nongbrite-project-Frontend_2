// Grid-based Coloring Game — Pixel Pattern
// ระบายสีตามแพตเทิร์นในตาราง

import { type Difficulty } from "@/lib/games/types";

export interface GridColoringLevelConfig {
    level: number;
    difficulty: Difficulty;
    title: string;
    gridSize: number;
    /** Available colors (HEX) */
    palette: string[];
    /** Reference pattern — null = white/empty cell */
    pattern: (string | null)[][];
}

// ── Color constants ──────────────────────────────────────────

const BLUE = "#3B82F6";
const YELLOW = "#FACC15";
const RED = "#EF4444";
const GREEN = "#22C55E";
const PINK = "#EC4899";
const GRAY = "#6B7280";

const _ = null;

// ── Level Data (9 ด่าน) ──────────────────────────────────────

export const gridColoringLevels: Record<number, GridColoringLevelConfig> = {

    // ─── Level 1 — easy 5×5 — Apple ─────────────────────────
    1: {
        level: 1, difficulty: "easy", title: "Apple",
        gridSize: 5,
        palette: ["#EF4444", "#22C55E"], // Red, Green
        pattern: [
            [_, _, "#22C55E", _, _],
            [_, "#EF4444", "#EF4444", "#EF4444", _],
            ["#EF4444", "#EF4444", "#EF4444", "#EF4444", "#EF4444"],
            ["#EF4444", "#EF4444", "#EF4444", "#EF4444", "#EF4444"],
            [_, "#EF4444", "#EF4444", "#EF4444", _],
        ],
    },

    // ─── Level 2 — easy 5×5 — Simple Tree ─────────────────────────
    2: {
        level: 2, difficulty: "easy", title: "Tree",
        gridSize: 5,
        palette: ["#22C55E", "#8B5A2B"], // Green, Brown
        pattern: [
            [_, "#22C55E", "#22C55E", "#22C55E", _],
            ["#22C55E", "#22C55E", "#22C55E", "#22C55E", "#22C55E"],
            [_, "#22C55E", "#22C55E", "#22C55E", _],
            [_, _, "#8B5A2B", _, _],
            [_, _, "#8B5A2B", _, _],
        ],
    },

    // ─── Level 3 — easy 5×5 — Fish ─────────────────────────
    3: {
        level: 3, difficulty: "easy", title: "Fish",
        gridSize: 5,
        palette: ["#F97316", "#3B82F6"], // Orange, Blue
        pattern: [
            [_, _, "#F97316", _, _],
            ["#F97316", "#F97316", "#F97316", "#F97316", _],
            ["#F97316", "#F97316", "#3B82F6", "#F97316", "#F97316"],
            ["#F97316", "#F97316", "#F97316", "#F97316", _],
            [_, _, "#F97316", _, _],
        ],
    },

    // ─── Level 4 — normal 6×6 — Owl ────────────────────────
    4: {
        level: 4, difficulty: "normal", title: "Owl",
        gridSize: 6,
        palette: ["#8B5A2B", "#D2B48C", "#FFFFFF", "#111827", "#FACC15"], // Brown, Tan, White, Black, Yellow
        pattern: [
            ["#8B5A2B", _, _, _, _, "#8B5A2B"],
            ["#8B5A2B", "#D2B48C", "#D2B48C", "#D2B48C", "#D2B48C", "#8B5A2B"],
            ["#8B5A2B", "#FFFFFF", "#111827", "#111827", "#FFFFFF", "#8B5A2B"],
            ["#8B5A2B", "#D2B48C", "#FACC15", "#FACC15", "#D2B48C", "#8B5A2B"],
            ["#8B5A2B", "#D2B48C", "#D2B48C", "#D2B48C", "#D2B48C", "#8B5A2B"],
            [_, "#D2B48C", _, _, "#D2B48C", _],
        ],
    },

    // ─── Level 5 — normal 6×6 — Cat Face ───────────────────────
    5: {
        level: 5, difficulty: "normal", title: "Cat",
        gridSize: 6,
        palette: ["#F97316", "#FFFFFF", "#111827", "#FCA5A5"], // Orange, White, Black, Pink
        pattern: [
            ["#F97316", _, _, _, _, "#F97316"],
            ["#F97316", "#F97316", "#F97316", "#F97316", "#F97316", "#F97316"],
            ["#F97316", "#111827", "#F97316", "#F97316", "#111827", "#F97316"],
            ["#FFFFFF", "#F97316", "#FCA5A5", "#FCA5A5", "#F97316", "#FFFFFF"],
            ["#FFFFFF", "#F97316", "#F97316", "#F97316", "#F97316", "#FFFFFF"],
            [_, "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", _],
        ],
    },

    // ─── Level 6 — normal 6×6 — Sheep Face ───────────────────────
    6: {
        level: 6, difficulty: "normal", title: "Sheep",
        gridSize: 6,
        palette: ["#FFFFFF", "#D4A373", "#111827", "#FCA5A5"], // White, Tan/Brown, Black, Pink
        pattern: [
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#D4A373", "#D4A373", "#D4A373", "#D4A373", "#D4A373", "#D4A373"],
            ["#111827", "#FFFFFF", "#D4A373", "#D4A373", "#FFFFFF", "#111827"],
            ["#D4A373", "#D4A373", "#D4A373", "#D4A373", "#D4A373", "#D4A373"],
            ["#FFFFFF", "#D4A373", "#FCA5A5", "#FCA5A5", "#D4A373", "#FFFFFF"],
            ["#FFFFFF", "#D4A373", "#FCA5A5", "#FCA5A5", "#D4A373", "#FFFFFF"],
        ],
    },

    // ─── Level 7 — hard 7×7 — Strawberry ────────────────────────
    7: {
        level: 7, difficulty: "hard", title: "Strawberry",
        gridSize: 7,
        palette: [RED, GREEN, YELLOW],
        pattern: [
            [_, _, GREEN, GREEN, GREEN, _, _],
            [_, GREEN, GREEN, GREEN, GREEN, GREEN, _],
            [RED, RED, RED, RED, RED, RED, RED],
            [RED, YELLOW, RED, YELLOW, RED, YELLOW, RED],
            [_, RED, RED, YELLOW, RED, RED, _],
            [_, _, RED, RED, RED, _, _],
            [_, _, _, RED, _, _, _],
        ],
    },

    // ─── Level 8 — hard 7×7 — Smiley Face ───────────────────────
    8: {
        level: 8, difficulty: "hard", title: "Smiley Face",
        gridSize: 7,
        palette: [YELLOW, "#111827", PINK], // Yellow, Black, Pink
        pattern: [
            [_, _, YELLOW, YELLOW, YELLOW, _, _],
            [_, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, _],
            [YELLOW, YELLOW, "#111827", YELLOW, "#111827", YELLOW, YELLOW],
            [YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW],
            [YELLOW, PINK, "#111827", "#111827", "#111827", PINK, YELLOW],
            [_, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, _],
            [_, _, YELLOW, YELLOW, YELLOW, _, _],
        ],
    },

    // ─── Level 9 — hard 7×7 — Car ───────────────────────
    9: {
        level: 9, difficulty: "hard", title: "Car",
        gridSize: 7,
        palette: [BLUE, "#111827", YELLOW, GRAY, "#FFFFFF"],
        pattern: [
            [_, _, _, _, _, _, _],
            [_, _, BLUE, BLUE, BLUE, _, _],
            [_, BLUE, "#FFFFFF", "#FFFFFF", "#FFFFFF", BLUE, _],
            [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE],
            [BLUE, YELLOW, BLUE, BLUE, BLUE, YELLOW, BLUE],
            [_, "#111827", GRAY, _, "#111827", GRAY, _],
            [_, _, _, _, _, _, _],
        ],
    },

};
