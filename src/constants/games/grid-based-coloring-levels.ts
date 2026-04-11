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

const BLUE       = "#3B82F6";
const YELLOW     = "#FACC15";
const RED        = "#EF4444";
const GREEN      = "#22C55E";
const DARK_GREEN = "#15803D";
const PINK       = "#EC4899";
const GRAY       = "#6B7280";
const ORANGE     = "#F97316";
const BROWN      = "#8B5A2B";
const BLACK      = "#111827";

const _ = null;

// ── Level Data (9 ด่าน) ──────────────────────────────────────

export const gridColoringLevels: Record<number, GridColoringLevelConfig> = {

    // ─── Level 1 — easy 5×5 — Apple ─────────────────────────
    1: {
        level: 1, difficulty: "easy", title: "Apple",
        gridSize: 5,
        palette: [RED, GREEN],
        pattern: [
            [_,   _,   GREEN, _,   _  ],
            [_,   RED,  RED,  RED,  _  ],
            [RED, RED,  RED,  RED,  RED],
            [RED, RED,  RED,  RED,  RED],
            [_,   RED,  RED,  RED,  _  ],
        ],
    },

    // ─── Level 2 — easy 5×5 — Tree ──────────────────────────
    2: {
        level: 2, difficulty: "easy", title: "Tree",
        gridSize: 5,
        palette: [GREEN, BROWN],
        pattern: [
            [_,     GREEN, GREEN, GREEN, _    ],
            [GREEN, GREEN, GREEN, GREEN, GREEN],
            [_,     GREEN, GREEN, GREEN, _    ],
            [_,     _,     BROWN, _,     _    ],
            [_,     _,     BROWN, _,     _    ],
        ],
    },

    // ─── Level 3 — easy 5×5 — Fish ──────────────────────────
    3: {
        level: 3, difficulty: "easy", title: "Fish",
        gridSize: 5,
        palette: [ORANGE, BLUE],
        pattern: [
            [_,      _,      ORANGE, _,      _     ],
            [ORANGE, ORANGE, ORANGE, ORANGE, _     ],
            [ORANGE, ORANGE, BLUE,   ORANGE, ORANGE],
            [ORANGE, ORANGE, ORANGE, ORANGE, _     ],
            [_,      _,      ORANGE, _,      _     ],
        ],
    },

    // ─── Level 4 — normal 6×6 — Fox Face 🦊 ─────────────────────
    4: {
        level: 4, difficulty: "normal", title: "Fox",
        gridSize: 6,
        palette: [ORANGE, BLACK, YELLOW],
        pattern: [
            [ORANGE, ORANGE, YELLOW, YELLOW, ORANGE, ORANGE],  // yellow inner ears
            [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
            [ORANGE, BLACK,  ORANGE, ORANGE, BLACK,  ORANGE],
            [_,      ORANGE, ORANGE, ORANGE, ORANGE, _     ],
            [_,      ORANGE, BLACK,  BLACK,  ORANGE, _     ],
            [_,      _,      ORANGE, ORANGE, _,      _     ],
        ],
    },

    // ─── Level 5 — normal 6×6 — Watermelon 🍉 ───────────────
    5: {
        level: 5, difficulty: "normal", title: "Watermelon",
        gridSize: 6,
        palette: [RED, GREEN, BLACK],
        pattern: [
            [_,     _,      RED,   RED,   _,      _    ],
            [_,     RED,    RED,   BLACK, RED,    _    ],
            [GREEN, RED,    RED,   RED,   RED,    GREEN],
            [GREEN, BLACK,  RED,   RED,   RED,    GREEN],
            [GREEN, GREEN,  RED,   BLACK, GREEN,  GREEN],
            [_,     GREEN,  GREEN, GREEN, GREEN,  _    ],
        ],
    },

    // ─── Level 6 — normal 6×6 — Sunflower 🌻 ────────────────
    6: {
        level: 6, difficulty: "normal", title: "Sunflower",
        gridSize: 6,
        palette: [YELLOW, BROWN, GREEN],
        pattern: [
            [_,      YELLOW, YELLOW, YELLOW, YELLOW, _     ],
            [YELLOW, YELLOW, BROWN,  BROWN,  YELLOW, YELLOW],
            [YELLOW, BROWN,  GREEN,  GREEN,  BROWN,  YELLOW],  // green seeds in center
            [YELLOW, BROWN,  GREEN,  GREEN,  BROWN,  YELLOW],  // green seeds in center
            [YELLOW, YELLOW, BROWN,  BROWN,  YELLOW, YELLOW],
            [_,      YELLOW, YELLOW, YELLOW, YELLOW, _     ],
        ],
    },

    // ─── Level 7 — hard 7×7 — Rocket 🚀 ─────────────────────
    7: {
        level: 7, difficulty: "hard", title: "Rocket",
        gridSize: 7,
        palette: [GRAY, RED, BLUE, YELLOW],
        pattern: [
            [_,    _,    _,    RED,  _,    _,    _   ],
            [_,    _,    RED,  RED,  RED,  _,    _   ],
            [_,    RED,  GRAY, GRAY, GRAY, RED,  _   ],
            [_,    GRAY, GRAY, BLUE, GRAY, GRAY, _   ],
            [_,    GRAY, GRAY, GRAY, GRAY, GRAY, _   ],
            [RED,  RED,  GRAY, GRAY, GRAY, RED,  RED ],
            [_,    RED,  _,    YELLOW,_,   RED,  _   ], // Yellow exhaust
        ],
    },

    // ─── Level 8 — hard 7×7 — Butterfly 🦋 ──────────────────
    8: {
        level: 8, difficulty: "hard", title: "Butterfly",
        gridSize: 7,
        palette: [PINK, YELLOW, BLACK, BLUE],
        pattern: [
            [PINK, PINK, _,    _,     _,    PINK, PINK],
            [PINK, PINK, PINK, BLACK, PINK, PINK, PINK],
            [PINK, YELLOW, PINK, BLACK, PINK, YELLOW, PINK],
            [_,    PINK, BLUE, BLACK, BLUE, PINK, _   ], // Blue spots on wings
            [_,    PINK, PINK, BLACK, PINK, PINK, _   ],
            [_,    _,    PINK, BLACK, PINK, _,    _   ],
            [_,    _,    _,    BLACK, _,    _,    _   ],
        ],
    },

    // ─── Level 9 — hard 7×7 — Pumpkin 🎃 ───────────────────
    9: {
        level: 9, difficulty: "hard", title: "Pumpkin",
        gridSize: 7,
        palette: [ORANGE, BLACK, GREEN, BROWN],
        pattern: [
            [_,      _,      BROWN,  GREEN,  _,      _,      _     ], // Brown stem, Green leaf
            [_,      ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, _     ],
            [ORANGE, BLACK,  ORANGE, ORANGE, ORANGE, BLACK,  ORANGE],
            [ORANGE, BLACK,  BLACK,  ORANGE, BLACK,  BLACK,  ORANGE],
            [ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
            [ORANGE, BLACK,  ORANGE, BLACK,  ORANGE, BLACK,  ORANGE],
            [_,      ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, _     ],
        ],
    },

};
