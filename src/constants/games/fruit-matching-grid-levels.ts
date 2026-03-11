// Fruit Matching Grid Game — Coordinate Crunch
// หาพิกัดผลไม้ในตาราง ขนาดตามระดับความยาก (3×3, 4×4, 5×5)

import { type Difficulty } from "@/lib/games/types";

export interface FruitMatchingGridLevelConfig {
    level: number;
    difficulty: Difficulty;
    /** Grid size: 3, 4 or 5 */
    gridSize: number;
    /** NxN grid of fruit emojis */
    grid: string[][];
    /** Target fruits the player must find coordinates for */
    targets: string[];
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
        level: 1, difficulty: "easy", gridSize: 3,
        grid: [
            ["🍎", "🍊", "🍇"],
            ["🍌", "🍓", "🥝"],
            ["🍉", "🍑", "🍒"],
        ],
        targets: ["🍓", "🍉", "🍊"],
    },

    // ─── Level 2 — easy ──────────────────────────────────────
    2: {
        level: 2, difficulty: "easy", gridSize: 3,
        grid: [
            ["🍍", "🫐", "🥭"],
            ["🍋", "🍈", "🍎"],
            ["🥥", "🍇", "🍌"],
        ],
        targets: ["🫐", "🍈", "🥥"],
    },

    // ─── Level 3 — easy ──────────────────────────────────────
    3: {
        level: 3, difficulty: "easy", gridSize: 3,
        grid: [
            ["🍒", "🍑", "🍓"],
            ["🥝", "🍊", "🍍"],
            ["🍇", "🍎", "🍋"],
        ],
        targets: ["🍑", "🍊", "🍎"],
    },

    // ═══════════════════════════════════════════════════════════
    // NORMAL — 4×4 grid, 4 targets
    // ═══════════════════════════════════════════════════════════

    // ─── Level 4 — normal ────────────────────────────────────
    4: {
        level: 4, difficulty: "normal", gridSize: 4,
        grid: [
            ["🍎", "🍓", "🍒", "🍊"],
            ["🍇", "🍌", "🍑", "🍋"],
            ["🥝", "🫐", "🥭", "🍍"],
            ["🍉", "🥥", "🍈", "🍇"],
        ],
        targets: ["🫐", "🥭", "🍌", "🍉"],
    },

    // ─── Level 5 — normal ────────────────────────────────────
    5: {
        level: 5, difficulty: "normal", gridSize: 4,
        grid: [
            ["🥕", "🧅", "🌽", "🥒"],
            ["🥦", "🍆", "🧄", "🫑"],
            ["🍎", "🍓", "🍊", "🍋"],
            ["🍌", "🍇", "🥝", "🍑"],
        ],
        targets: ["🧄", "🍓", "🍇", "🌽"],
    },

    // ─── Level 6 — normal ────────────────────────────────────
    6: {
        level: 6, difficulty: "normal", gridSize: 4,
        grid: [
            ["🍊", "🍋", "🍌", "🍈"],
            ["🍑", "🥝", "🍎", "🍓"],
            ["🍒", "🥭", "🍍", "🫐"],
            ["🥥", "🍇", "🍉", "🍊"],
        ],
        targets: ["🥝", "🍍", "🍉", "🍈"],
    },

    // ═══════════════════════════════════════════════════════════
    // HARD — 5×5 grid, 5 targets
    // ═══════════════════════════════════════════════════════════

    // ─── Level 7 — hard ──────────────────────────────────────
    7: {
        level: 7, difficulty: "hard", gridSize: 5,
        grid: [
            ["🍎", "🍎", "🍓", "🍒", "🍎"],
            ["🍒", "🍓", "🍎", "🍎", "🍓"],
            ["🍎", "🍒", "🍎", "🍓", "🍒"],
            ["🍓", "🍎", "🍒", "🫐", "🍎"],
            ["🍎", "🍓", "🍎", "🍒", "🍓"],
        ],
        targets: ["🫐", "🍓", "🍒", "🍎", "🍎"],
    },

    // ─── Level 8 — hard ──────────────────────────────────────
    8: {
        level: 8, difficulty: "hard", gridSize: 5,
        grid: [
            ["🥒", "🫑", "🥦", "🥒", "🌽"],
            ["🥦", "🌽", "🫑", "🧅", "🥒"],
            ["🌽", "🥒", "🧄", "🫑", "🥦"],
            ["🧅", "🥦", "🥒", "🌽", "🫑"],
            ["🫑", "🧄", "🥦", "🥒", "🌽"],
        ],
        targets: ["🧄", "🧅", "🌽", "🫑", "🥦"],
    },

    // ─── Level 9 — hard ──────────────────────────────────────
    9: {
        level: 9, difficulty: "hard", gridSize: 5,
        grid: [
            ["🍊", "🍊", "🥭", "🍋", "🍊"],
            ["🍋", "🍊", "🍊", "🍈", "🍋"],
            ["🍊", "🥭", "🍋", "🍊", "🥭"],
            ["🍈", "🍋", "🍊", "🥭", "🍋"],
            ["🍋", "🍊", "🍈", "🍋", "🍊"],
        ],
        targets: ["🍈", "🥭", "🍋", "🍊", "🍊"],
    },
};
