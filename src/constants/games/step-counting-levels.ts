// Step Counting Game — Loop + Proportional Reasoning Edition
// เด็กตั้งค่าจำนวน loop ให้ได้ผลลัพธ์ตามเป้าหมาย

import { type Difficulty } from "@/lib/games/types";

export type LoopTheme = "orange" | "watermelon" | "pineapple" | "apple";

// ── Per-juice task ─────────────────────────────────────────────
export interface LoopTask {
  theme: LoopTheme;
  inputEmoji: string;
  inputUnit: string;
  outputUnit: string;
  yieldsPerAction: number;
  yieldLabel: string;
  targetAmount: number;
  correctAnswer: number;
  maxStepper: number;
}

// ── Level config (1–N tasks) ───────────────────────────────────
export interface LoopLevelConfig {
  level: number;
  difficulty: Difficulty;
  theme: LoopTheme;
  tasks: LoopTask[];
  description: string;
}

// ── Task factories ─────────────────────────────────────────────
function orangeTask(target: number, maxStepper: number): LoopTask {
  return {
    theme: "orange",
    inputEmoji: "🍊",
    inputUnit: "ส้ม",
    outputUnit: "แก้ว",
    yieldsPerAction: 0.5,
    yieldLabel: "ครึ่งแก้ว",
    targetAmount: target,
    correctAnswer: target / 0.5,
    maxStepper,
  };
}

function watermelonTask(target: number, maxStepper: number): LoopTask {
  return {
    theme: "watermelon",
    inputEmoji: "🍉",
    inputUnit: "แตงโม",
    outputUnit: "แก้ว",
    yieldsPerAction: 2,
    yieldLabel: "2 แก้ว",
    targetAmount: target,
    correctAnswer: target / 2,
    maxStepper,
  };
}

function pineappleTask(target: number, maxStepper: number): LoopTask {
  return {
    theme: "pineapple",
    inputEmoji: "🍍",
    inputUnit: "สับปะรด",
    outputUnit: "แก้ว",
    yieldsPerAction: 1,
    yieldLabel: "1 แก้ว",
    targetAmount: target,
    correctAnswer: target / 1,
    maxStepper,
  };
}

function appleTask(target: number, maxStepper: number): LoopTask {
  return {
    theme: "apple",
    inputEmoji: "🍏",
    inputUnit: "แอปเปิ้ล",
    outputUnit: "แก้ว",
    yieldsPerAction: 0.5,
    yieldLabel: "ครึ่งแก้ว",
    targetAmount: target,
    correctAnswer: target / 0.5,
    maxStepper,
  };
}

// ── Level builders ─────────────────────────────────────────────
function single(level: number, difficulty: Difficulty, task: LoopTask, desc: string): LoopLevelConfig {
  return { level, difficulty, theme: task.theme, tasks: [task], description: desc };
}

function multi(level: number, difficulty: Difficulty, tasks: LoopTask[], desc: string): LoopLevelConfig {
  return { level, difficulty, theme: tasks[0].theme, tasks, description: desc };
}

// ── 9 Levels ───────────────────────────────────────────────────
// ตอบ: 🍊÷0.5  🍉÷2  🍍÷1  🍏÷0.5
export const stepCountingLevels: Record<number, LoopLevelConfig> = {
  // ─── Easy (Level 1–3) ─────────────────────────────────────────
  // L1: ส้ม 4 แก้ว → ใช้ 8 ลูก
  1: single(1, "easy", orangeTask(4, 15), "น้ำส้ม: 1 ลูก → ½ แก้ว"),
  // L2: สับปะรด 5 แก้ว → ใช้ 5 ลูก
  2: single(2, "easy", pineappleTask(5, 10), "น้ำสับปะรด: 1 ลูก → 1 แก้ว"),
  // L3: แตงโม 4 แก้ว (2 ลูก) + แอปเปิ้ล 4 แก้ว (8 ลูก)
  3: multi(3, "easy", [watermelonTask(4, 8), appleTask(4, 15)], "น้ำแตงโม + น้ำแอปเปิ้ล"),

  // ─── Normal (Level 4–6) ───────────────────────────────────────
  // L4: ส้ม 3 แก้ว (6 ลูก) + สับปะรด 4 แก้ว (4 ลูก)
  4: multi(4, "normal", [orangeTask(3, 15), pineappleTask(4, 10)], "น้ำส้ม + น้ำสับปะรด"),
  // L5: แอปเปิ้ล 3 แก้ว (6 ลูก) + สับปะรด 4 แก้ว (4 ลูก)
  5: multi(5, "normal", [appleTask(3, 12), pineappleTask(4, 10)], "น้ำแอปเปิ้ล + น้ำสับปะรด"),
  // L6: ส้ม 2 แก้ว (4 ลูก) + แตงโม 6 แก้ว (3 ลูก)
  6: multi(6, "normal", [orangeTask(2, 12), watermelonTask(6, 8)], "น้ำส้ม + น้ำแตงโม"),

  // ─── Hard (Level 7–9) ────────────────────────────────────────
  // L7: ส้ม 2 (4) + สับปะรด 4 (4) + แอปเปิ้ล 3 (6) ลูก
  7: multi(7, "hard", [orangeTask(2, 10), pineappleTask(4, 10), appleTask(3, 15)], "น้ำส้ม + น้ำสับปะรด + น้ำแอปเปิ้ล"),
  // L8: แตงโม 4 (2) + สับปะรด 4 (4) + แอปเปิ้ล 3 (6) ลูก
  8: multi(8, "hard", [watermelonTask(4, 8), pineappleTask(4, 10), appleTask(3, 15)], "น้ำแตงโม + น้ำสับปะรด + น้ำแอปเปิ้ล"),
  // L9: ส้ม 3 (6) + แตงโม 4 (2) + สับปะรด 4 (4) + แอปเปิ้ล 3 (6) ลูก
  9: multi(9, "hard", [orangeTask(3, 15), watermelonTask(4, 8), pineappleTask(4, 10), appleTask(3, 15)], "4 น้ำผสม"),
};
