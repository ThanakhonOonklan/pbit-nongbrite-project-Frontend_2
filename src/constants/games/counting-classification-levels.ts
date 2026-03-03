// Counting & Classification Game Level Configs
// นับจำนวนและจัดหมวดหมู่สิ่งของ

import { type Difficulty } from "@/lib/games/types";

export interface CountingClassificationLevelConfig {
    level: number;
    difficulty: Difficulty;
    categoryCount: number; // จำนวนหมวดหมู่
    itemCount: number; // จำนวนสิ่งของ
    // TODO: เพิ่ม config เฉพาะเกม เช่น categories, items, images
}

export const countingClassificationLevels: Record<number, CountingClassificationLevelConfig> = {
    1: { level: 1, difficulty: "easy", categoryCount: 2, itemCount: 4 },
    2: { level: 2, difficulty: "easy", categoryCount: 2, itemCount: 5 },
    3: { level: 3, difficulty: "easy", categoryCount: 2, itemCount: 6 },
    4: { level: 4, difficulty: "normal", categoryCount: 3, itemCount: 6 },
    5: { level: 5, difficulty: "normal", categoryCount: 3, itemCount: 8 },
    6: { level: 6, difficulty: "normal", categoryCount: 3, itemCount: 9 },
    7: { level: 7, difficulty: "hard", categoryCount: 4, itemCount: 10 },
    8: { level: 8, difficulty: "hard", categoryCount: 4, itemCount: 12 },
    9: { level: 9, difficulty: "hard", categoryCount: 5, itemCount: 14 },
};
