// Sequencing Game Level Configs
// เรียงลำดับขั้นตอน — ผู้เล่นต้องลากคำสั่ง/เหตุการณ์ให้ถูกลำดับ

import { type Difficulty } from "@/lib/games/types";

export interface SequencingLevelConfig {
    level: number;
    difficulty: Difficulty;
    itemCount: number; // จำนวน items ที่ต้องเรียง
    // TODO: เพิ่ม config เฉพาะเกม เช่น items, correctOrder, timeLimit
}

export const sequencingLevels: Record<number, SequencingLevelConfig> = {
    1: { level: 1, difficulty: "easy", itemCount: 3 },
    2: { level: 2, difficulty: "easy", itemCount: 3 },
    3: { level: 3, difficulty: "easy", itemCount: 4 },
    4: { level: 4, difficulty: "normal", itemCount: 4 },
    5: { level: 5, difficulty: "normal", itemCount: 5 },
    6: { level: 6, difficulty: "normal", itemCount: 5 },
    7: { level: 7, difficulty: "hard", itemCount: 6 },
    8: { level: 8, difficulty: "hard", itemCount: 6 },
    9: { level: 9, difficulty: "hard", itemCount: 7 },
};
