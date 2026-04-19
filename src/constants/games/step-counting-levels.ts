// Step Counting Game — Fill-in-the-Path Edition
// เด็กสร้างบล็อคตัวเลขแล้วลากวางในช่องบนเส้นทาง

import { type Difficulty } from "@/lib/games/types";

export interface StepCountingLevelConfig {
  level: number;
  difficulty: Difficulty;
  startValue: number;   // ตัวเลขตั้งต้น เช่น 2
  operators: string[];  // operator แต่ละขั้ว เช่น ["+3", "-1"]
  description: string;
}

/** คำนวณคำตอบที่ถูกต้องของแต่ละช่อง */
export function getCorrectAnswers(config: StepCountingLevelConfig): number[] {
  const answers: number[] = [];
  let cur = config.startValue;
  for (const op of config.operators) {
    const sign = op[0] === "+" ? 1 : -1;
    const num = parseInt(op.slice(1), 10);
    cur += sign * num;
    answers.push(cur);
  }
  return answers;
}

export const stepCountingLevels: Record<number, StepCountingLevelConfig> = {
  // ─── Easy (Level 1–3) : 4 operators ───────────────────────────────
  1: {
    level: 1,
    difficulty: "easy",
    startValue: 2,
    operators: ["+1", "+2", "-1", "+3"],
    description: "ระดับง่าย: 4 ขั้น",
  },
  2: {
    level: 2,
    difficulty: "easy",
    startValue: 3,
    operators: ["+2", "-1", "+2", "+1"],
    description: "ระดับง่าย: 4 ขั้น",
  },
  3: {
    level: 3,
    difficulty: "easy",
    startValue: 5,
    operators: ["-2", "+3", "-1", "+2"],
    description: "ระดับง่าย: 4 ขั้น",
  },
  // ─── Normal (Level 4–6) : 5-7 operators ─────────────────────────────
  4: {
    level: 4,
    difficulty: "normal",
    startValue: 4,
    operators: ["+2", "-1", "+3", "-2", "+1"],
    description: "ระดับปานกลาง: 5 ขั้น",
  },
  5: {
    level: 5,
    difficulty: "normal",
    startValue: 6,
    operators: ["-2", "+3", "-1", "+2", "-3", "+4"],
    description: "ระดับปานกลาง: 6 ขั้น",
  },
  6: {
    level: 6,
    difficulty: "normal",
    startValue: 3,
    operators: ["+2", "+1", "-2", "+3", "-1", "+2", "-3"],
    description: "ระดับปานกลาง: 7 ขั้น",
  },
  // ─── Hard (Level 7–9) : 8-9 operators ───────────────────────────────
  7: {
    level: 7,
    difficulty: "hard",
    startValue: 10,
    operators: ["-2", "+3", "-4", "+5", "-2", "+1", "-3", "+2"],
    description: "ระดับยาก: 8 ขั้น",
  },
  8: {
    level: 8,
    difficulty: "hard",
    startValue: 7,
    operators: ["+3", "-2", "+4", "-5", "+2", "+1", "-3", "+4", "-2"],
    description: "ระดับยาก: 9 ขั้น",
  },
  9: {
    level: 9,
    difficulty: "hard",
    startValue: 5,
    operators: ["+2", "-1", "+4", "-3", "+5", "-2", "+3", "-4", "+1"],
    description: "ระดับยาก: 9 ขั้น",
  },
};
