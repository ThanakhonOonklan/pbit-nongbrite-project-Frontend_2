// Fruit Matching Grid Game — Coordinate Crunch
// หาพิกัดผลไม้ในตาราง ขนาดตามระดับความยาก (3×3, 4×4, 5×5)

import { type Difficulty } from "@/lib/games/types";

export interface FruitMatchingGridLevelConfig {
    level: number;
    difficulty: Difficulty;
    /** Grid size: 3, 4 or 5 */
    gridSize: number;
    /** Number of random targets the player must answer */
    targetCount: number;
}

// Row labels used for coordinate answers
export const ROW_LABELS = ["A", "B", "C", "D", "E"] as const;

// ── Fruit name map (shared across components) ────────────────
export const FRUIT_NAMES: Record<string, string> = {
    "🍎": "แอปเปิล", "🍊": "ส้ม", "🍇": "องุ่น", "🍌": "กล้วย",
    "🍓": "สตรอว์เบอร์รี", "🥝": "กีวี", "🍉": "แตงโม", "🍑": "พีช",
    "🍒": "เชอร์รี", "🍍": "สับปะรด", "🫐": "บลูเบอร์รี", "🥭": "มะม่วง",
    "🍋": "เลมอน", "🍈": "เมลอน", "🥥": "มะพร้าว",
    "🍐": "ลูกแพร์", "🥑": "อะโวคาโด", "🍅": "มะเขือเทศ",
    "🥕": "แครอท", "🧅": "หอมใหญ่", "🥔": "มันฝรั่ง", "🌽": "ข้าวโพด",
    "🥦": "บรอกโคลี", "🍄": "เห็ด", "🌶️": "พริก", "🥒": "แตงกวา",
    "🍆": "มะเขือยาว", "🥬": "ผักกาด"
};

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
    1: { level: 1, difficulty: "easy", gridSize: 3, targetCount: 3 },
    2: { level: 2, difficulty: "easy", gridSize: 3, targetCount: 3 },
    3: { level: 3, difficulty: "easy", gridSize: 3, targetCount: 3 },

    4: { level: 4, difficulty: "normal", gridSize: 4, targetCount: 4 },
    5: { level: 5, difficulty: "normal", gridSize: 4, targetCount: 4 },
    6: { level: 6, difficulty: "normal", gridSize: 4, targetCount: 4 },

    7: { level: 7, difficulty: "hard", gridSize: 5, targetCount: 5 },
    8: { level: 8, difficulty: "hard", gridSize: 5, targetCount: 5 },
    9: { level: 9, difficulty: "hard", gridSize: 5, targetCount: 5 },
};
