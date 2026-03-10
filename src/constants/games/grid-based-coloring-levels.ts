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
const TEAL = "#14B8A6";
const ORANGE = "#F97316";
const PINK = "#EC4899";
const PURPLE = "#A855F7";
const GRAY = "#6B7280";

const _ = null; // shorthand for empty cell

// ── Level Data (9 ด่าน) ──────────────────────────────────────

export const gridColoringLevels: Record<number, GridColoringLevelConfig> = {

    // ─── Level 1 — easy 5×5 — Cross ─────────────────────────
    1: {
        level: 1, difficulty: "easy", title: "Cross",
        gridSize: 5,
        palette: [BLUE],
        pattern: [
            [_, _, BLUE, _, _],
            [_, _, BLUE, _, _],
            [BLUE, BLUE, BLUE, BLUE, BLUE],
            [_, _, BLUE, _, _],
            [_, _, BLUE, _, _],
        ],
    },

    // ─── Level 2 — easy 5×5 — Square Frame ──────────────────
    2: {
        level: 2, difficulty: "easy", title: "Square Frame",
        gridSize: 5,
        palette: [RED, BLUE],
        pattern: [
            [RED, RED, RED, RED, RED],
            [RED, _, _, _, RED],
            [RED, _, BLUE, _, RED],
            [RED, _, _, _, RED],
            [RED, RED, RED, RED, RED],
        ],
    },

    // ─── Level 3 — easy 5×5 — Arrow ─────────────────────────
    3: {
        level: 3, difficulty: "easy", title: "Arrow",
        gridSize: 5,
        palette: [GREEN, YELLOW],
        pattern: [
            [_, _, GREEN, _, _],
            [_, GREEN, GREEN, GREEN, _],
            [GREEN, _, GREEN, _, GREEN],
            [_, _, GREEN, _, _],
            [_, _, YELLOW, _, _],
        ],
    },

    // ─── Level 4 — normal 6×6 — Heart ───────────────────────
    4: {
        level: 4, difficulty: "normal", title: "Heart",
        gridSize: 6,
        palette: [RED, PINK],
        pattern: [
            [_, RED, _, _, RED, _],
            [RED, PINK, RED, RED, PINK, RED],
            [RED, PINK, PINK, PINK, PINK, RED],
            [_, RED, PINK, PINK, RED, _],
            [_, _, RED, RED, _, _],
            [_, _, _, _, _, _],
        ],
    },

    // ─── Level 5 — normal 6×6 — House ───────────────────────
    5: {
        level: 5, difficulty: "normal", title: "House",
        gridSize: 6,
        palette: [RED, YELLOW, BLUE],
        pattern: [
            [_, _, RED, RED, _, _],
            [_, RED, RED, RED, RED, _],
            [RED, RED, RED, RED, RED, RED],
            [YELLOW, YELLOW, YELLOW, YELLOW, YELLOW, YELLOW],
            [YELLOW, BLUE, YELLOW, YELLOW, BLUE, YELLOW],
            [YELLOW, BLUE, YELLOW, YELLOW, BLUE, YELLOW],
        ],
    },

    // ─── Level 6 — normal 6×6 — Star ────────────────────────
    6: {
        level: 6, difficulty: "normal", title: "Star",
        gridSize: 6,
        palette: [YELLOW, ORANGE, RED],
        pattern: [
            [_, _, YELLOW, YELLOW, _, _],
            [YELLOW, YELLOW, ORANGE, ORANGE, YELLOW, YELLOW],
            [_, ORANGE, RED, RED, ORANGE, _],
            [_, ORANGE, RED, RED, ORANGE, _],
            [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
            [ORANGE, _, _, _, _, ORANGE],
        ],
    },

    // ─── Level 7 — hard 7×7 — Flower ────────────────────────
    7: {
        level: 7, difficulty: "hard", title: "Flower",
        gridSize: 7,
        palette: [RED, PINK, GREEN, YELLOW],
        pattern: [
            [_, _, RED, _, RED, _, _],
            [_, RED, PINK, RED, PINK, RED, _],
            [_, _, RED, YELLOW, RED, _, _],
            [_, _, _, GREEN, _, _, _],
            [_, _, GREEN, GREEN, GREEN, _, _],
            [_, GREEN, _, GREEN, _, GREEN, _],
            [GREEN, _, _, GREEN, _, _, GREEN],
        ],
    },

    // ─── Level 8 — hard 7×7 — Rainbow ───────────────────────
    8: {
        level: 8, difficulty: "hard", title: "Rainbow",
        gridSize: 7,
        palette: [RED, ORANGE, YELLOW, GREEN, BLUE],
        pattern: [
            [_, _, RED, RED, RED, _, _],
            [_, RED, ORANGE, ORANGE, ORANGE, RED, _],
            [RED, ORANGE, YELLOW, YELLOW, YELLOW, ORANGE, RED],
            [RED, ORANGE, YELLOW, GREEN, YELLOW, ORANGE, RED],
            [_, _, YELLOW, GREEN, YELLOW, _, _],
            [_, _, _, GREEN, _, _, _],
            [_, _, BLUE, BLUE, BLUE, _, _],
        ],
    },

    // ─── Level 9 — hard 7×7 — Tree ──────────────────────────
    9: {
        level: 9, difficulty: "hard", title: "Tree",
        gridSize: 7,
        palette: [GREEN, TEAL, ORANGE, RED, YELLOW],
        pattern: [
            [_, _, _, YELLOW, _, _, _],
            [_, _, GREEN, GREEN, GREEN, _, _],
            [_, GREEN, TEAL, GREEN, TEAL, GREEN, _],
            [GREEN, TEAL, GREEN, TEAL, GREEN, TEAL, GREEN],
            [_, _, _, ORANGE, _, _, _],
            [_, _, _, ORANGE, _, _, _],
            [_, _, RED, ORANGE, RED, _, _],
        ],
    },
};
