// Fruit Matching Grid Game Level Configs
// จับคู่ผลไม้ในตารางสี่เหลี่ยม

import { type Difficulty } from "@/lib/games/types";

export interface FruitMatchingGridLevelConfig {
    level: number;
    difficulty: Difficulty;
    gridSize: number; // ขนาดตาราง (เช่น 3 = 3×3)
    pairCount: number; // จำนวนคู่ที่ต้องจับ
    // TODO: เพิ่ม config เฉพาะเกม เช่น fruits, timeLimit, specialRules
}

export const fruitMatchingGridLevels: Record<number, FruitMatchingGridLevelConfig> = {
    1: { level: 1, difficulty: "easy", gridSize: 2, pairCount: 2 },
    2: { level: 2, difficulty: "easy", gridSize: 3, pairCount: 3 },
    3: { level: 3, difficulty: "easy", gridSize: 3, pairCount: 4 },
    4: { level: 4, difficulty: "normal", gridSize: 4, pairCount: 6 },
    5: { level: 5, difficulty: "normal", gridSize: 4, pairCount: 8 },
    6: { level: 6, difficulty: "normal", gridSize: 4, pairCount: 8 },
    7: { level: 7, difficulty: "hard", gridSize: 5, pairCount: 10 },
    8: { level: 8, difficulty: "hard", gridSize: 5, pairCount: 12 },
    9: { level: 9, difficulty: "hard", gridSize: 6, pairCount: 15 },
};
