// Step Counting Game Level Configs
// นับจำนวนก้าวเดิน — ผู้เล่นต้องคำนวณจำนวนก้าวที่ต้องเดิน

import { type Difficulty } from "@/lib/games/types";

export interface StepCountingLevelConfig {
    level: number;
    difficulty: Difficulty;
    gridSize: number; // ขนาดตาราง
    // TODO: เพิ่ม config เฉพาะเกม เช่น start/end positions, obstacles
}

export const stepCountingLevels: Record<number, StepCountingLevelConfig> = {
    1: { level: 1, difficulty: "easy", gridSize: 3 },
    2: { level: 2, difficulty: "easy", gridSize: 3 },
    3: { level: 3, difficulty: "easy", gridSize: 4 },
    4: { level: 4, difficulty: "normal", gridSize: 4 },
    5: { level: 5, difficulty: "normal", gridSize: 5 },
    6: { level: 6, difficulty: "normal", gridSize: 5 },
    7: { level: 7, difficulty: "hard", gridSize: 6 },
    8: { level: 8, difficulty: "hard", gridSize: 6 },
    9: { level: 9, difficulty: "hard", gridSize: 7 },
};
