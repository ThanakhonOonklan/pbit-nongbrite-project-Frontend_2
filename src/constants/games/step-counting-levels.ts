// Step Counting Game — Loop + Proportional Reasoning Edition
// เด็กตั้งค่าจำนวน loop ให้ได้ผลลัพธ์ตามเป้าหมาย

import { type Difficulty } from "@/lib/games/types";

export type LoopTheme = "juice" | "candle" | "garden";

export interface LoopLevelConfig {
  level: number;
  difficulty: Difficulty;
  theme: LoopTheme;

  // Ratio (คงที่ต่อ theme)
  inputEmoji: string;       // "🍊", "🔥", "🌱"
  inputImage?: string;      // Optional SVG image path
  inputUnit: string;        // "ลูกส้ม", "ก้านเทียน", "เมล็ดพันธุ์"
  outputEmoji: string;      // "🥛", "🕯️", "🌸"
  outputImage?: string;     // Optional SVG output image path
  outputUnit: string;       // "แก้ว", "ดวง", "ต้น"
  yieldsPerAction: number;  // 0.5, 2, 1
  yieldLabel: string;       // "ครึ่งแก้ว", "2 ดวง", "1 ต้น"

  // Target
  targetAmount: number;     // เป้าหมาย
  correctAnswer: number;    // targetAmount / yieldsPerAction
  maxStepper: number;       // ค่าสูงสุดใน stepper

  // Text
  sceneTitle: string;       // "ทำน้ำส้มคั้น 4 แก้ว"
  loopLabel: string;        // "คั้นส้มซ้ำ"
  actionLabel: string;      // "คั้นส้ม 1 ลูก"
  ratioText: string;        // "ส้ม 1 ลูก"

  description: string;
}

/** ตรวจคำตอบ */
export function checkAnswer(config: LoopLevelConfig, loopCount: number): boolean {
  return loopCount === config.correctAnswer;
}

// ── Juice theme helper ─────────────────────────────────────────
function juiceLevel(
  level: number,
  difficulty: Difficulty,
  target: number,
  maxStepper: number,
): LoopLevelConfig {
  return {
    level,
    difficulty,
    theme: "juice",
    inputEmoji: "🍊",
    inputImage: "/images/step-counting/orange.svg",
    inputUnit: "ส้ม",
    outputEmoji: "🥛",
    outputImage: "/images/step-counting/glass-half.svg",
    outputUnit: "แก้ว",
    yieldsPerAction: 0.5,
    yieldLabel: "ครึ่งแก้ว",
    targetAmount: target,
    correctAnswer: target / 0.5,
    maxStepper,
    sceneTitle: `ทำน้ำส้มคั้น ${target} แก้ว`,
    loopLabel: "คั้นส้มซ้ำ",
    actionLabel: "คั้นส้ม 1 ลูก",
    ratioText: "ส้ม 1 ลูก",
    description: `น้ำส้มคั้น: เป้า ${target} แก้ว`,
  };
}

// ── Candle theme helper ────────────────────────────────────────
function candleLevel(
  level: number,
  difficulty: Difficulty,
  target: number,
  maxStepper: number,
): LoopLevelConfig {
  return {
    level,
    difficulty,
    theme: "candle",
    inputEmoji: "🔥",
    inputUnit: "ก้าน",
    outputEmoji: "🕯️",
    outputUnit: "ดวง",
    yieldsPerAction: 2,
    yieldLabel: "2 ดวง",
    targetAmount: target,
    correctAnswer: target / 2,
    maxStepper,
    sceneTitle: `จุดเทียน ${target} ดวง`,
    loopLabel: "ใช้ไม้ขีดซ้ำ",
    actionLabel: "จุดไม้ขีด 1 ก้าน",
    ratioText: "ไม้ขีด 1 ก้าน",
    description: `จุดเทียน: เป้า ${target} ดวง`,
  };
}

// ── Garden theme helper ────────────────────────────────────────
function gardenLevel(
  level: number,
  difficulty: Difficulty,
  target: number,
  maxStepper: number,
): LoopLevelConfig {
  return {
    level,
    difficulty,
    theme: "garden",
    inputEmoji: "🌱",
    inputUnit: "เมล็ด",
    outputEmoji: "🌸",
    outputUnit: "ต้น",
    yieldsPerAction: 1,
    yieldLabel: "1 ต้น",
    targetAmount: target,
    correctAnswer: target / 1,
    maxStepper,
    sceneTitle: `ปลูกดอกไม้ ${target} ต้น`,
    loopLabel: "หว่านเมล็ดซ้ำ",
    actionLabel: "หว่านเมล็ด 1 เมล็ด",
    ratioText: "เมล็ด 1 เมล็ด",
    description: `ปลูกดอกไม้: เป้า ${target} ต้น`,
  };
}

// ── 9 Levels ───────────────────────────────────────────────────
export const stepCountingLevels: Record<number, LoopLevelConfig> = {
  // ─── Easy (Level 1–3) ────────────────────────────────────────
  1: juiceLevel(1, "easy", 2, 10),    // 1 ลูก = ½ แก้ว → 4 ลูก
  2: candleLevel(2, "easy", 4, 10),   // 1 ก้าน = 2 ดวง → 2 ก้าน
  3: gardenLevel(3, "easy", 3, 10),   // 1 เมล็ด = 1 ต้น → 3 เมล็ด

  // ─── Normal (Level 4–6) ──────────────────────────────────────
  4: juiceLevel(4, "normal", 3, 15),  // → 6 ลูก
  5: candleLevel(5, "normal", 6, 15), // → 3 ก้าน
  6: gardenLevel(6, "normal", 5, 15), // → 5 เมล็ด

  // ─── Hard (Level 7–9) ────────────────────────────────────────
  7: juiceLevel(7, "hard", 5, 20),    // → 10 ลูก
  8: candleLevel(8, "hard", 10, 20),  // → 5 ก้าน
  9: gardenLevel(9, "hard", 8, 20),   // → 8 เมล็ด
};
