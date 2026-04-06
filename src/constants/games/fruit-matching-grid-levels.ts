// Fruit Matching Grid Game — Coordinate Crunch
// หาพิกัดผลไม้ในตาราง ขนาดตามระดับความยาก (3×3, 4×4, 5×5)

import { type Difficulty } from "@/lib/games/types";

// ── Item Constants (Fruits & Veggies) ────────────────────────
const APPLE       = "🍎";
const PEAR        = "🍐";
const ORANGE      = "🍊";
const GRAPE       = "🍇";
const BANANA      = "🍌";
const STRAWBERRY  = "🍓";
const KIWI        = "🥝";
const WATERMELON  = "🍉";
const PEACH       = "🍑";
const CHERRY      = "🍒";
const PINEAPPLE   = "🍍";
const BLUEBERRY   = "🫐";
const MANGO       = "🥭";
const LEMON       = "🍋";
const MELON       = "🍈";
const COCONUT     = "🥥";
const AVOCADO     = "🥑";
const TOMATO      = "🍅";

export type GameMode = "find-coordinate" | "find-fruit";

export interface FruitMatchingGridLevelConfig {
    level: number;
    difficulty: Difficulty;
    /** Grid size: 3, 4 or 5 */
    gridSize: number;
    /** NxN grid of fruit emojis */
    grid: string[][];
    /** Target fruits the player must find coordinates for */
    targets: string[];
    /** Game mode: find-coordinate (levels 1-3) | find-fruit (levels 4-9) */
    mode: GameMode;
}

// Row labels used for coordinate answers
export const ROW_LABELS = ["A", "B", "C", "D", "E"] as const;

/**
 * Given a grid and a target emoji, returns the coordinate string e.g. "A3"
 * Finds the first occurrence scanning row by row, left to right.
 * Works with any grid size.
 */
export function findCoordinate(grid: string[][], target: string): string | null {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === target) {
                return `${ROW_LABELS[r]}${c + 1}`;
            }
        }
    }
    return null;
}

// ── Level Data (9 ด่าน) ──────────────────────────────────────
// Easy (1-3): 3×3 grid, 3 targets
// Normal (4-6): 4×4 grid, 4 targets
// Hard (7-9): 5×5 grid, 5 targets

export const fruitMatchingGridLevels: Record<number, FruitMatchingGridLevelConfig> = {

    // ═══════════════════════════════════════════════════════════
    // EASY — 3×3 grid, 3 targets
    // ═══════════════════════════════════════════════════════════

    // ─── Level 1 — easy ──────────────────────────────────────
    1: {
        level: 1, difficulty: "easy", gridSize: 3, mode: "find-coordinate",
        grid: [
            [APPLE,      PINEAPPLE,   PEAR],
            [ORANGE,     GRAPE,       BANANA],
            [STRAWBERRY, KIWI,        WATERMELON],
        ],
        targets: [STRAWBERRY, PINEAPPLE, WATERMELON],
    },

    // ─── Level 2 — easy ──────────────────────────────────────
    2: {
        level: 2, difficulty: "easy", gridSize: 3, mode: "find-coordinate",
        grid: [
            [PEACH,      CHERRY,      PINEAPPLE],
            [BLUEBERRY,  MANGO,       LEMON],
            [MELON,      COCONUT,     AVOCADO],
        ],
        targets: [BLUEBERRY, MANGO, AVOCADO],
    },

    // ─── Level 3 — easy ──────────────────────────────────────
    3: {
        level: 3, difficulty: "easy", gridSize: 3, mode: "find-coordinate",
        grid: [
            [TOMATO,     COCONUT,     APPLE],
            [BANANA,     BLUEBERRY,   PEACH],
            [WATERMELON, CHERRY,      LEMON],
        ],
        targets: [COCONUT, APPLE, BANANA],
    },

    // ═══════════════════════════════════════════════════════════
    // NORMAL — 4×4 grid, 4 targets
    // ═══════════════════════════════════════════════════════════

    // ─── Level 4 — normal ────────────────────────────────────
    4: {
        level: 4, difficulty: "normal", gridSize: 4, mode: "find-fruit",
        grid: [
            [APPLE,       PEAR,        GRAPE,      ORANGE],
            [BANANA,      STRAWBERRY,  KIWI,       WATERMELON],
            [CHERRY,      PINEAPPLE,   BLUEBERRY,  MANGO],
            [LEMON,       MELON,       COCONUT,    AVOCADO],
        ],
        targets: [BLUEBERRY, MANGO, BANANA, WATERMELON],
    },

    // ─── Level 5 — normal ────────────────────────────────────
    5: {
        level: 5, difficulty: "normal", gridSize: 4, mode: "find-fruit",
        grid: [
            [COCONUT,     AVOCADO,     TOMATO,      PEAR],
            [APPLE,       GRAPE,       BANANA,      KIWI],
            [STRAWBERRY,  WATERMELON,  PEACH,       CHERRY],
            [PINEAPPLE,   MANGO,       LEMON,       MELON],
        ],
        targets: [TOMATO, PEACH, MANGO, AVOCADO],
    },

    // ─── Level 6 — normal ────────────────────────────────────
    6: {
        level: 6, difficulty: "normal", gridSize: 4, mode: "find-fruit",
        grid: [
            [MELON,       BLUEBERRY,   PEAR,        ORANGE],
            [TOMATO,      KIWI,        APPLE,       STRAWBERRY],
            [CHERRY,      MANGO,       PINEAPPLE,   AVOCADO],
            [COCONUT,     GRAPE,       WATERMELON,  PEACH],
        ],
        targets: [KIWI, PINEAPPLE, WATERMELON, MELON],
    },

    // ═══════════════════════════════════════════════════════════
    // HARD — 5x5 grid (25 slots), 5 targets
    // ═══════════════════════════════════════════════════════════

    // ─── Level 7 — hard ──────────────────────────────────────
    7: {
        level: 7, difficulty: "hard", gridSize: 5, mode: "find-fruit",
        grid: [
            [APPLE,       TOMATO,      PEAR,       ORANGE,     GRAPE],
            [BANANA,      STRAWBERRY,  KIWI,       WATERMELON, PEACH],
            [CHERRY,      PINEAPPLE,   BLUEBERRY,  MANGO,      LEMON],
            [MELON,       COCONUT,     AVOCADO,    APPLE,      TOMATO],
            [PEAR,        ORANGE,      GRAPE,      BANANA,     STRAWBERRY],
        ],
        targets: [BLUEBERRY, STRAWBERRY, CHERRY, APPLE, TOMATO],
    },

    // ─── Level 8 — hard ──────────────────────────────────────
    8: {
        level: 8, difficulty: "hard", gridSize: 5, mode: "find-fruit",
        grid: [
            [AVOCADO,     TOMATO,      MELON,      COCONUT,    APPLE],
            [LEMON,       MANGO,       BLUEBERRY,  PINEAPPLE,  PEAR],
            [CHERRY,      PEACH,       WATERMELON, KIWI,       ORANGE],
            [STRAWBERRY,  BANANA,      GRAPE,      APPLE,      TOMATO],
            [MELON,       COCONUT,     AVOCADO,    LEMON,      MANGO],
        ],
        targets: [TOMATO, MANGO, PEACH, ORANGE, AVOCADO],
    },

    // ─── Level 9 — hard ──────────────────────────────────────
    9: {
        level: 9, difficulty: "hard", gridSize: 5, mode: "find-fruit",
        grid: [
            [BLUEBERRY,   BANANA,      MELON,      APPLE,      KIWI],
            [STRAWBERRY,  MANGO,       ORANGE,     AVOCADO,    TOMATO],
            [PEAR,        WATERMELON,  LEMON,      GRAPE,      CHERRY],
            [PINEAPPLE,   PEACH,       COCONUT,    BLUEBERRY,  BANANA],
            [MELON,       APPLE,       KIWI,       STRAWBERRY, MANGO],
        ],
        targets: [WATERMELON, MANGO, LEMON, APPLE, TOMATO],
    },
};
