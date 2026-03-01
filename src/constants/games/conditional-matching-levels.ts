// Conditional Matching Game Level Configs
// จับคู่ตามเงื่อนไข — ผู้เล่นเลือกสิ่งของที่ตรงกับเงื่อนไข if-then

import { type Difficulty } from "@/lib/games/types";

export interface ConditionalMatchingLevelConfig {
    level: number;
    difficulty: Difficulty;
    conditionCount: number; // จำนวนเงื่อนไข
    optionCount: number; // จำนวนตัวเลือก
    // TODO: เพิ่ม config เฉพาะเกม เช่น conditions, items, correctAnswers
}

export const conditionalMatchingLevels: Record<number, ConditionalMatchingLevelConfig> = {
    1: { level: 1, difficulty: "easy", conditionCount: 1, optionCount: 3 },
    2: { level: 2, difficulty: "easy", conditionCount: 1, optionCount: 4 },
    3: { level: 3, difficulty: "easy", conditionCount: 2, optionCount: 4 },
    4: { level: 4, difficulty: "normal", conditionCount: 2, optionCount: 5 },
    5: { level: 5, difficulty: "normal", conditionCount: 3, optionCount: 5 },
    6: { level: 6, difficulty: "normal", conditionCount: 3, optionCount: 6 },
    7: { level: 7, difficulty: "hard", conditionCount: 4, optionCount: 6 },
    8: { level: 8, difficulty: "hard", conditionCount: 4, optionCount: 7 },
    9: { level: 9, difficulty: "hard", conditionCount: 5, optionCount: 8 },
};
