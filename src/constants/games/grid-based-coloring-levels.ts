import { type Difficulty } from "@/lib/games/types";

export interface PatternVariant {
    palette: string[];
    grid: (string | null)[][];
}

export interface GridColoringLevelConfig {
    level: number;
    difficulty: Difficulty;
    title: string;
    gridSize: number;
    patterns: PatternVariant[];
}

// ── Color constants ──────────────────────────────────────────

const BLUE = "#3B82F6";
const YELLOW = "#FACC15";
const RED = "#EF4444";
const GREEN = "#22C55E";
const PINK = "#EC4899";
const GRAY = "#6B7280";
const ORANGE = "#F97316";
const BROWN = "#8B5A2B";
const BLACK = "#111827";

const _ = null;

// ── Level Data (9 ด่าน) ──────────────────────────────────────

export const gridColoringLevels: Record<number, GridColoringLevelConfig> = {

    // ─── Level 1 — easy 5×5 ────────────────────────────────
    1: {
        level: 1, difficulty: "easy", title: "Apple",
        gridSize: 5,
        patterns: [
            // Pattern 1 — Apple 🍎
            {
                palette: [RED, GREEN],
                grid: [
                    [_, _, GREEN, _, _],
                    [_, RED, RED, RED, _],
                    [RED, RED, RED, RED, RED],
                    [RED, RED, RED, RED, RED],
                    [_, RED, RED, RED, _],
                ],
            },
            // Pattern 2 — Strawberry 🍓
            {
                palette: [PINK, GREEN],
                grid: [
                    [_, _, GREEN, _, _],
                    [_, PINK, PINK, PINK, _],
                    [PINK, GREEN, PINK, GREEN, PINK],
                    [_, PINK, GREEN, PINK, _],
                    [_, _, PINK, _, _],
                ],
            },
            // Pattern 3 — Mushroom 🍄
            {
                palette: [ORANGE, BLUE],
                grid: [
                    [_, ORANGE, ORANGE, ORANGE, _],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [_, BLUE, BLUE, BLUE, _],
                    [_, BLUE, _, BLUE, _],
                    [_, BLUE, _, BLUE, _],
                ],
            },
            // Pattern 4 — Christmas Tree 🎄
            {
                palette: [YELLOW, GREEN],
                grid: [
                    [_, _, YELLOW, _, _],
                    [_, GREEN, GREEN, GREEN, _],
                    [YELLOW, GREEN, GREEN, GREEN, YELLOW],
                    [_, _, GREEN, _, _],
                    [_, _, GREEN, _, _],
                ],
            },
        ],
    },

    // ─── Level 2 — easy 5×5 ────────────────────────────────
    2: {
        level: 2, difficulty: "easy", title: "Tree",
        gridSize: 5,
        patterns: [
            // Pattern 1 — Tree 🌲
            {
                palette: [GREEN, BROWN],
                grid: [
                    [_, GREEN, GREEN, GREEN, _],
                    [GREEN, GREEN, GREEN, GREEN, GREEN],
                    [_, GREEN, GREEN, GREEN, _],
                    [_, _, BROWN, _, _],
                    [_, _, BROWN, _, _],
                ],
            },
            // Pattern 2 — Acorn 🌰
            {
                palette: [ORANGE, BROWN],
                grid: [
                    [_, ORANGE, ORANGE, ORANGE, _],
                    [_, _, BROWN, _, _],
                    [_, BROWN, BROWN, BROWN, _],
                    [_, BROWN, BROWN, BROWN, _],
                    [_, _, BROWN, _, _],
                ],
            },
            // Pattern 3 — Turtle 🐢
            {
                palette: [PINK, YELLOW],
                grid: [
                    [_, PINK, PINK, PINK, _],
                    [PINK, YELLOW, PINK, YELLOW, PINK],
                    [PINK, PINK, PINK, PINK, PINK],
                    [_, PINK, _, PINK, _],
                    [_, PINK, _, PINK, _],
                ],
            },
            // Pattern 4 — Potted Plant 🪴
            {
                palette: [BLUE, GRAY],
                grid: [
                    [_, BLUE, BLUE, BLUE, _],
                    [BLUE, BLUE, BLUE, BLUE, BLUE],
                    [_, _, BLUE, _, _],
                    [_, GRAY, GRAY, GRAY, _],
                    [_, GRAY, GRAY, GRAY, _],
                ],
            },
        ],
    },

    // ─── Level 3 — easy 5×5 ────────────────────────────────
    3: {
        level: 3, difficulty: "easy", title: "Fish",
        gridSize: 5,
        patterns: [
            // Pattern 1 — Fish 🐟
            {
                palette: [ORANGE, BLUE],
                grid: [
                    [_, _, ORANGE, _, _],
                    [ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [ORANGE, ORANGE, BLUE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [_, _, ORANGE, _, _],
                ],
            },
            // Pattern 2 — Butterfly 🦋
            {
                palette: [PINK, YELLOW],
                grid: [
                    [PINK, _, _, _, PINK],
                    [PINK, PINK, _, PINK, PINK],
                    [_, _, YELLOW, _, _],
                    [PINK, PINK, _, PINK, PINK],
                    [PINK, _, _, _, PINK],
                ],
            },
            // Pattern 3 — Jellyfish 🪼
            {
                palette: [GREEN, RED],
                grid: [
                    [_, GREEN, GREEN, GREEN, _],
                    [GREEN, GREEN, GREEN, GREEN, GREEN],
                    [GREEN, RED, GREEN, RED, GREEN],
                    [_, GREEN, _, GREEN, _],
                    [GREEN, _, GREEN, _, GREEN],
                ],
            },
            // Pattern 4 — Shield 🛡️
            {
                palette: [RED, GRAY],
                grid: [
                    [RED, RED, RED, RED, RED],
                    [RED, GRAY, RED, GRAY, RED],
                    [RED, RED, RED, RED, RED],
                    [_, RED, RED, RED, _],
                    [_, _, RED, _, _],
                ],
            },
        ],
    },

    // ─── Level 4 — normal 6×6 ──────────────────────────────
    4: {
        level: 4, difficulty: "normal", title: "Fox",
        gridSize: 6,
        patterns: [
            // Pattern 1 — Fox 🦊
            {
                palette: [ORANGE, BLACK, YELLOW],
                grid: [
                    [ORANGE, ORANGE, YELLOW, YELLOW, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, BLACK, ORANGE, ORANGE, BLACK, ORANGE],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [_, ORANGE, BLACK, BLACK, ORANGE, _],
                    [_, _, ORANGE, ORANGE, _, _],
                ],
            },
            // Pattern 2 — Bee 🐝
            {
                palette: [YELLOW, BLACK, GREEN],
                grid: [
                    [_, GREEN, YELLOW, YELLOW, GREEN, _],
                    [_, YELLOW, YELLOW, YELLOW, YELLOW, _],
                    [YELLOW, BLACK, YELLOW, YELLOW, BLACK, YELLOW],
                    [YELLOW, YELLOW, BLACK, BLACK, YELLOW, YELLOW],
                    [_, YELLOW, YELLOW, YELLOW, YELLOW, _],
                    [_, _, YELLOW, YELLOW, _, _],
                ],
            },
            // Pattern 3 — Tiger 🐯
            {
                palette: [ORANGE, BLACK, RED],
                grid: [
                    [ORANGE, BLACK, ORANGE, ORANGE, BLACK, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, BLACK, ORANGE, ORANGE, BLACK, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [_, ORANGE, RED, RED, ORANGE, _],
                    [_, _, ORANGE, ORANGE, _, _],
                ],
            },
            // Pattern 4 — Lantern 🏮
            {
                palette: [RED, YELLOW, BLACK],
                grid: [
                    [_, _, YELLOW, YELLOW, _, _],
                    [_, YELLOW, RED, RED, YELLOW, _],
                    [YELLOW, RED, RED, RED, RED, YELLOW],
                    [YELLOW, RED, RED, RED, RED, YELLOW],
                    [_, YELLOW, RED, RED, YELLOW, _],
                    [_, _, BLACK, BLACK, _, _],
                ],
            },
        ],
    },

    // ─── Level 5 — normal 6×6 ──────────────────────────────
    5: {
        level: 5, difficulty: "normal", title: "Watermelon",
        gridSize: 6,
        patterns: [
            // Pattern 1 — Watermelon 🍉
            {
                palette: [RED, GREEN, BLACK],
                grid: [
                    [_, _, RED, RED, _, _],
                    [_, RED, RED, BLACK, RED, _],
                    [GREEN, RED, RED, RED, RED, GREEN],
                    [GREEN, BLACK, RED, RED, RED, GREEN],
                    [GREEN, GREEN, RED, BLACK, GREEN, GREEN],
                    [_, GREEN, GREEN, GREEN, GREEN, _],
                ],
            },
            // Pattern 2 — Mushroom 🍄
            {
                palette: [ORANGE, BROWN, GREEN],
                grid: [
                    [_, _, ORANGE, ORANGE, _, _],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [_, _, BROWN, BROWN, _, _],
                    [_, BROWN, BROWN, BROWN, BROWN, _],
                    [GREEN, BROWN, BROWN, BROWN, BROWN, GREEN],
                ],
            },
            // Pattern 3 — Gift Box 🎁
            {
                palette: [BLUE, YELLOW, RED],
                grid: [
                    [_, RED, YELLOW, YELLOW, RED, _],
                    [RED, BLUE, BLUE, BLUE, BLUE, RED],
                    [YELLOW, BLUE, BLUE, BLUE, BLUE, YELLOW],
                    [YELLOW, BLUE, BLUE, BLUE, BLUE, YELLOW],
                    [RED, BLUE, BLUE, BLUE, BLUE, RED],
                    [_, RED, YELLOW, YELLOW, RED, _],
                ],
            },
            // Pattern 4 — Christmas Tree 🎄
            {
                palette: [GREEN, YELLOW, BROWN],
                grid: [
                    [_, _, YELLOW, YELLOW, _, _],
                    [_, _, GREEN, GREEN, _, _],
                    [_, GREEN, GREEN, GREEN, GREEN, _],
                    [GREEN, GREEN, GREEN, GREEN, GREEN, GREEN],
                    [_, _, BROWN, BROWN, _, _],
                    [_, _, BROWN, BROWN, _, _],
                ],
            },
        ],
    },

    // ─── Level 6 — normal 6×6 ──────────────────────────────
    6: {
        level: 6, difficulty: "normal", title: "Sunflower",
        gridSize: 6,
        patterns: [
            // Pattern 1 — Sunflower 🌻
            {
                palette: [YELLOW, BROWN, GREEN],
                grid: [
                    [_, YELLOW, YELLOW, YELLOW, YELLOW, _],
                    [YELLOW, YELLOW, BROWN, BROWN, YELLOW, YELLOW],
                    [YELLOW, BROWN, GREEN, GREEN, BROWN, YELLOW],
                    [YELLOW, BROWN, GREEN, GREEN, BROWN, YELLOW],
                    [YELLOW, YELLOW, BROWN, BROWN, YELLOW, YELLOW],
                    [_, YELLOW, YELLOW, YELLOW, YELLOW, _],
                ],
            },
            // Pattern 2 — Pineapple 🍍
            {
                palette: [YELLOW, ORANGE, GREEN],
                grid: [
                    [_, _, GREEN, GREEN, _, _],
                    [_, GREEN, GREEN, GREEN, GREEN, _],
                    [_, YELLOW, ORANGE, ORANGE, YELLOW, _],
                    [YELLOW, ORANGE, YELLOW, YELLOW, ORANGE, YELLOW],
                    [YELLOW, ORANGE, YELLOW, YELLOW, ORANGE, YELLOW],
                    [_, YELLOW, ORANGE, ORANGE, YELLOW, _],
                ],
            },
            // Pattern 3 — Honey Pot 🍯
            {
                palette: [ORANGE, BROWN, YELLOW],
                grid: [
                    [_, _, ORANGE, ORANGE, _, _],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, ORANGE, BROWN, BROWN, ORANGE, ORANGE],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [_, _, YELLOW, YELLOW, _, _],
                ],
            },
            // Pattern 4 — Turtle 🐢
            {
                palette: [BLUE, GREEN, BROWN],
                grid: [
                    [_, _, BLUE, BLUE, _, _],
                    [_, BLUE, BLUE, BLUE, BLUE, _],
                    [BLUE, GREEN, BLUE, BLUE, GREEN, BLUE],
                    [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE],
                    [_, BLUE, _, _, BLUE, _],
                    [_, BROWN, _, _, BROWN, _],
                ],
            },
        ],
    },

    // ─── Level 7 — hard 7×7 ──────────────────────────────
    7: {
        level: 7, difficulty: "hard", title: "Rocket",
        gridSize: 7,
        patterns: [
            // Pattern 1 — Rocket 🚀
            {
                palette: [GRAY, RED, BLUE, YELLOW],
                grid: [
                    [_, _, _, RED, _, _, _],
                    [_, _, RED, RED, RED, _, _],
                    [_, RED, GRAY, GRAY, GRAY, RED, _],
                    [_, GRAY, GRAY, BLUE, GRAY, GRAY, _],
                    [_, GRAY, GRAY, GRAY, GRAY, GRAY, _],
                    [RED, RED, GRAY, GRAY, GRAY, RED, RED],
                    [_, RED, _, YELLOW, _, RED, _],
                ],
            },
            // Pattern 2 — Robot 🤖
            {
                palette: [GRAY, GREEN, RED, YELLOW],
                grid: [
                    [_, GRAY, GRAY, GRAY, GRAY, GRAY, _],
                    [_, GRAY, GREEN, GRAY, GREEN, GRAY, _],
                    [_, GRAY, GRAY, GRAY, GRAY, GRAY, _],
                    [_, GRAY, RED, RED, RED, GRAY, _],
                    [GRAY, GRAY, GRAY, GRAY, GRAY, GRAY, GRAY],
                    [_, _, GRAY, _, GRAY, _, _],
                    [_, _, YELLOW, _, YELLOW, _, _],
                ],
            },
            // Pattern 3 — Spaceship 🛸
            {
                palette: [BLUE, GRAY, ORANGE, GREEN],
                grid: [
                    [_, _, _, BLUE, _, _, _],
                    [_, _, BLUE, BLUE, BLUE, _, _],
                    [_, BLUE, GRAY, GRAY, GRAY, BLUE, _],
                    [BLUE, GRAY, GRAY, GREEN, GRAY, GRAY, BLUE],
                    [_, BLUE, GRAY, GRAY, GRAY, BLUE, _],
                    [_, _, ORANGE, _, ORANGE, _, _],
                    [_, ORANGE, ORANGE, _, ORANGE, ORANGE, _],
                ],
            },
            // Pattern 4 — Lighthouse 🏰
            {
                palette: [ORANGE, YELLOW, GRAY, BLUE],
                grid: [
                    [_, _, _, ORANGE, _, _, _],
                    [_, _, ORANGE, YELLOW, ORANGE, _, _],
                    [_, _, ORANGE, ORANGE, ORANGE, _, _],
                    [_, _, GRAY, GRAY, GRAY, _, _],
                    [_, GRAY, GRAY, GRAY, GRAY, GRAY, _],
                    [_, GRAY, BLUE, GRAY, BLUE, GRAY, _],
                    [GRAY, GRAY, GRAY, GRAY, GRAY, GRAY, GRAY],
                ],
            },
        ],
    },

    // ─── Level 8 — hard 7×7 ──────────────────────────────
    8: {
        level: 8, difficulty: "hard", title: "Butterfly",
        gridSize: 7,
        patterns: [
            // Pattern 1 — Butterfly 🦋
            {
                palette: [PINK, YELLOW, BLACK, BLUE],
                grid: [
                    [PINK, PINK, _, _, _, PINK, PINK],
                    [PINK, PINK, PINK, BLACK, PINK, PINK, PINK],
                    [PINK, YELLOW, PINK, BLACK, PINK, YELLOW, PINK],
                    [_, PINK, BLUE, BLACK, BLUE, PINK, _],
                    [_, PINK, PINK, BLACK, PINK, PINK, _],
                    [_, _, PINK, BLACK, PINK, _, _],
                    [_, _, _, BLACK, _, _, _],
                ],
            },
            // Pattern 2 — Cat Face 🐱
            {
                palette: [ORANGE, GREEN, BLACK, YELLOW],
                grid: [
                    [ORANGE, ORANGE, _, _, _, ORANGE, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, GREEN, ORANGE, ORANGE, ORANGE, GREEN, ORANGE],
                    [ORANGE, BLACK, ORANGE, ORANGE, ORANGE, BLACK, ORANGE],
                    [_, ORANGE, ORANGE, BLACK, ORANGE, ORANGE, _],
                    [_, _, ORANGE, ORANGE, ORANGE, _, _],
                    [_, _, YELLOW, _, YELLOW, _, _],
                ],
            },
            // Pattern 3 — Ice Cream 🍦
            {
                palette: [PINK, GREEN, YELLOW, BROWN],
                grid: [
                    [_, _, PINK, PINK, PINK, _, _],
                    [_, PINK, PINK, PINK, PINK, PINK, _],
                    [_, PINK, GREEN, PINK, GREEN, PINK, _],
                    [_, PINK, PINK, PINK, PINK, PINK, _],
                    [_, _, YELLOW, YELLOW, YELLOW, _, _],
                    [_, _, _, YELLOW, _, _, _],
                    [_, _, _, BROWN, _, _, _],
                ],
            },
            // Pattern 4 — Candy 🍬
            {
                palette: [RED, GREEN, YELLOW, BLACK],
                grid: [
                    [_, _, _, BLACK, _, _, _],
                    [_, _, BLACK, RED, BLACK, _, _],
                    [_, BLACK, RED, RED, RED, BLACK, _],
                    [BLACK, RED, RED, YELLOW, RED, RED, BLACK],
                    [_, BLACK, RED, RED, RED, BLACK, _],
                    [_, _, BLACK, GREEN, BLACK, _, _],
                    [_, _, _, BLACK, _, _, _],
                ],
            },
        ],
    },

    // ─── Level 9 — hard 7×7 ──────────────────────────────
    9: {
        level: 9, difficulty: "hard", title: "Pumpkin",
        gridSize: 7,
        patterns: [
            // Pattern 1 — Pumpkin 🎃
            {
                palette: [ORANGE, BLACK, GREEN, BROWN],
                grid: [
                    [_, _, BROWN, GREEN, _, _, _],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, _],
                    [ORANGE, BLACK, ORANGE, ORANGE, ORANGE, BLACK, ORANGE],
                    [ORANGE, BLACK, BLACK, ORANGE, BLACK, BLACK, ORANGE],
                    [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
                    [ORANGE, BLACK, ORANGE, BLACK, ORANGE, BLACK, ORANGE],
                    [_, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, _],
                ],
            },
            // Pattern 2 — Owl 🦉
            {
                palette: [BLUE, BLACK, YELLOW, BROWN],
                grid: [
                    [_, _, BLUE, BLUE, BLUE, _, _],
                    [_, BLUE, BLUE, BLUE, BLUE, BLUE, _],
                    [BLUE, BLACK, BLUE, BLUE, BLUE, BLACK, BLUE],
                    [BLUE, BLUE, BLUE, YELLOW, BLUE, BLUE, BLUE],
                    [_, BLUE, BLUE, BLUE, BLUE, BLUE, _],
                    [_, _, BLUE, _, BLUE, _, _],
                    [_, _, BROWN, _, BROWN, _, _],
                ],
            },
            // Pattern 3 — Treehouse 🌳
            {
                palette: [GREEN, BROWN, RED, YELLOW],
                grid: [
                    [_, _, _, GREEN, _, _, _],
                    [_, _, GREEN, GREEN, GREEN, _, _],
                    [_, GREEN, GREEN, YELLOW, GREEN, GREEN, _],
                    [GREEN, GREEN, GREEN, GREEN, GREEN, GREEN, GREEN],
                    [_, _, BROWN, RED, BROWN, _, _],
                    [_, _, BROWN, RED, BROWN, _, _],
                    [_, _, BROWN, BROWN, BROWN, _, _],
                ],
            },
            // Pattern 4 — Skull 💀
            {
                palette: [GRAY, RED, BLACK, BROWN],
                grid: [
                    [_, _, GRAY, GRAY, GRAY, _, _],
                    [_, GRAY, GRAY, GRAY, GRAY, GRAY, _],
                    [GRAY, RED, GRAY, GRAY, GRAY, RED, GRAY],
                    [GRAY, GRAY, GRAY, GRAY, GRAY, GRAY, GRAY],
                    [_, GRAY, BLACK, GRAY, BLACK, GRAY, _],
                    [_, _, GRAY, GRAY, GRAY, _, _],
                    [_, _, BROWN, _, BROWN, _, _],
                ],
            },
        ],
    },

};
