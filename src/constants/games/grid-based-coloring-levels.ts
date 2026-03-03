// Grid-based Coloring Game Level Configs
// ระบายสีตามตารางพิกัด

import { type Difficulty } from "@/lib/games/types";

export interface GridBasedColoringLevelConfig {
    level: number;
    difficulty: Difficulty;
    gridSize: number; // ขนาดตาราง
    colorCount: number; // จำนวนสีที่ใช้
    targetCells: number; // จำนวนช่องที่ต้องระบาย
    // TODO: เพิ่ม config เฉพาะเกม เช่น pattern, colors, coordinates
}

export const gridBasedColoringLevels: Record<number, GridBasedColoringLevelConfig> = {
    1: { level: 1, difficulty: "easy", gridSize: 3, colorCount: 2, targetCells: 3 },
    2: { level: 2, difficulty: "easy", gridSize: 3, colorCount: 2, targetCells: 4 },
    3: { level: 3, difficulty: "easy", gridSize: 4, colorCount: 3, targetCells: 5 },
    4: { level: 4, difficulty: "normal", gridSize: 4, colorCount: 3, targetCells: 7 },
    5: { level: 5, difficulty: "normal", gridSize: 5, colorCount: 4, targetCells: 8 },
    6: { level: 6, difficulty: "normal", gridSize: 5, colorCount: 4, targetCells: 10 },
    7: { level: 7, difficulty: "hard", gridSize: 6, colorCount: 5, targetCells: 12 },
    8: { level: 8, difficulty: "hard", gridSize: 6, colorCount: 5, targetCells: 14 },
    9: { level: 9, difficulty: "hard", gridSize: 7, colorCount: 6, targetCells: 16 },
};
