// Step Counting Game Level Configs
// นับจำนวนก้าวเดิน — ผู้เล่นต้องนับว่าต้องเดินกี่ก้าวถึงจะถึงเป้าหมาย

import { type Difficulty } from "@/lib/games/types";

export type ObstacleType = "log" | "rock" | "bush";

export interface Obstacle {
    position: number;
    type: ObstacleType;
}

export interface StepCountingLevelConfig {
    level: number;
    difficulty: Difficulty;
    totalCells: number;         // จำนวนช่องบน Number Line (เช่น 6 = ช่อง 0–5)
    startPosition: number;      // ช่องเริ่มต้นของตัวละคร
    steps: number;              // จำนวนก้าวที่ต้องเดิน (= คำตอบที่ถูกต้อง)
    choices: number[];          // ตัวเลือก 4 ตัว (จำนวนก้าว, รวมคำตอบถูก)
    obstacles: Obstacle[];      // สิ่งกีดขวางบน number line (แสดงผลเท่านั้น)
    flagPosition: number;       // ตำแหน่งธง (เป้าหมาย)
    description: string;        // ชื่อด่าน
}

export const stepCountingLevels: Record<number, StepCountingLevelConfig> = {
    // ─── Easy (Level 1–3) ────────────────────────────────
    1: {
        level: 1,
        difficulty: "easy",
        totalCells: 6,
        startPosition: 0,
        steps: 2,
        choices: [2, 5, 3, 4],
        obstacles: [{ position: 1, type: "log" }],
        flagPosition: 2,
        description: "ข้ามท่อนไม้",
    },
    2: {
        level: 2,
        difficulty: "easy",
        totalCells: 6,
        startPosition: 0,
        steps: 3,
        choices: [2, 3, 1, 5],
        obstacles: [{ position: 2, type: "rock" }],
        flagPosition: 3,
        description: "ข้ามก้อนหิน",
    },
    3: {
        level: 3,
        difficulty: "easy",
        totalCells: 7,
        startPosition: 1,
        steps: 4,
        choices: [4, 5, 3, 6],
        obstacles: [
            { position: 3, type: "log" },
        ],
        flagPosition: 5,
        description: "เดินหลายก้าว",
    },

    // ─── Normal (Level 4–6) ──────────────────────────────
    4: {
        level: 4,
        difficulty: "normal",
        totalCells: 8,
        startPosition: 0,
        steps: 5,
        choices: [4, 5, 6, 3],
        obstacles: [
            { position: 2, type: "log" },
            { position: 4, type: "rock" },
        ],
        flagPosition: 5,
        description: "สิ่งกีดขวางคู่",
    },
    5: {
        level: 5,
        difficulty: "normal",
        totalCells: 8,
        startPosition: 2,
        steps: 4,
        choices: [3, 5, 4, 6],
        obstacles: [
            { position: 3, type: "bush" },
            { position: 5, type: "log" },
        ],
        flagPosition: 6,
        description: "เริ่มจากตรงกลาง",
    },
    6: {
        level: 6,
        difficulty: "normal",
        totalCells: 9,
        startPosition: 1,
        steps: 6,
        choices: [5, 6, 7, 4],
        obstacles: [
            { position: 3, type: "rock" },
            { position: 5, type: "bush" },
        ],
        flagPosition: 7,
        description: "เส้นทางยาว",
    },

    // ─── Hard (Level 7–9) ────────────────────────────────
    7: {
        level: 7,
        difficulty: "hard",
        totalCells: 10,
        startPosition: 0,
        steps: 7,
        choices: [6, 8, 7, 5],
        obstacles: [
            { position: 2, type: "log" },
            { position: 4, type: "rock" },
            { position: 6, type: "bush" },
        ],
        flagPosition: 7,
        description: "สามสิ่งกีดขวาง",
    },
    8: {
        level: 8,
        difficulty: "hard",
        totalCells: 10,
        startPosition: 3,
        steps: 5,
        choices: [4, 6, 5, 3],
        obstacles: [
            { position: 4, type: "rock" },
            { position: 6, type: "log" },
            { position: 7, type: "bush" },
        ],
        flagPosition: 8,
        description: "จุดเริ่มสูง",
    },
    9: {
        level: 9,
        difficulty: "hard",
        totalCells: 12,
        startPosition: 1,
        steps: 9,
        choices: [8, 10, 9, 7],
        obstacles: [
            { position: 3, type: "log" },
            { position: 5, type: "rock" },
            { position: 7, type: "bush" },
            { position: 9, type: "rock" },
        ],
        flagPosition: 10,
        description: "เส้นทางสุดท้าย",
    },
};
