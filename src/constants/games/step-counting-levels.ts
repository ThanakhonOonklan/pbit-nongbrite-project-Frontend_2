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

// ── Per-variant (theme + tasks + description) ──────────────────
export interface LoopVariant {
  theme: LoopTheme;
  tasks: LoopTask[];
  description: string;
}

// ── Level config (1–N variants, one randomly selected per game) ─
export interface LoopLevelConfig {
  level: number;
  difficulty: Difficulty;
  variants: LoopVariant[];
}

// ── Resolved config (after picking a variant) — used by components ─
export interface ResolvedLoopConfig {
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

// ── Variant builders ──────────────────────────────────────────
function singleV(task: LoopTask, desc: string): LoopVariant {
  return { theme: task.theme, tasks: [task], description: desc };
}

function multiV(tasks: LoopTask[], desc: string): LoopVariant {
  return { theme: tasks[0].theme, tasks, description: desc };
}

// ── 9 Levels × 4 variants each ─────────────────────────────────
// ตอบ: 🍊÷0.5  🍉÷2  🍍÷1  🍏÷0.5
export const stepCountingLevels: Record<number, LoopLevelConfig> = {

  // ─── Easy (Level 1–3) ─────────────────────────────────────────

  // L1: single task
  1: { level: 1, difficulty: "easy", variants: [
    singleV(orangeTask(4, 15), "น้ำส้ม: 1 ลูก → ½ แก้ว"),
    singleV(pineappleTask(6, 10), "น้ำสับปะรด: 1 ลูก → 1 แก้ว"),
    singleV(watermelonTask(6, 8), "น้ำแตงโม: 1 ลูก → 2 แก้ว"),
    singleV(appleTask(3, 12), "น้ำแอปเปิ้ล: 1 ลูก → ½ แก้ว"),
  ]},

  // L2: single task
  2: { level: 2, difficulty: "easy", variants: [
    singleV(pineappleTask(5, 10), "น้ำสับปะรด: 1 ลูก → 1 แก้ว"),
    singleV(orangeTask(3, 12), "น้ำส้ม: 1 ลูก → ½ แก้ว"),
    singleV(watermelonTask(4, 8), "น้ำแตงโม: 1 ลูก → 2 แก้ว"),
    singleV(appleTask(4, 15), "น้ำแอปเปิ้ล: 1 ลูก → ½ แก้ว"),
  ]},

  // L3: 2 tasks
  3: { level: 3, difficulty: "easy", variants: [
    multiV([watermelonTask(4, 8), appleTask(4, 15)], "น้ำแตงโม + น้ำแอปเปิ้ล"),
    multiV([orangeTask(3, 12), pineappleTask(5, 10)], "น้ำส้ม + น้ำสับปะรด"),
    multiV([pineappleTask(4, 10), watermelonTask(6, 8)], "น้ำสับปะรด + น้ำแตงโม"),
    multiV([appleTask(2, 10), orangeTask(4, 15)], "น้ำแอปเปิ้ล + น้ำส้ม"),
  ]},

  // ─── Normal (Level 4–6) ───────────────────────────────────────

  // L4: 2 tasks
  4: { level: 4, difficulty: "normal", variants: [
    multiV([orangeTask(3, 15), pineappleTask(4, 10)], "น้ำส้ม + น้ำสับปะรด"),
    multiV([watermelonTask(4, 8), appleTask(3, 12)], "น้ำแตงโม + น้ำแอปเปิ้ล"),
    multiV([pineappleTask(3, 10), orangeTask(2, 10)], "น้ำสับปะรด + น้ำส้ม"),
    multiV([appleTask(4, 15), watermelonTask(6, 8)], "น้ำแอปเปิ้ล + น้ำแตงโม"),
  ]},

  // L5: 2 tasks
  5: { level: 5, difficulty: "normal", variants: [
    multiV([appleTask(3, 12), pineappleTask(4, 10)], "น้ำแอปเปิ้ล + น้ำสับปะรด"),
    multiV([orangeTask(4, 15), watermelonTask(4, 8)], "น้ำส้ม + น้ำแตงโม"),
    multiV([pineappleTask(5, 10), appleTask(2, 10)], "น้ำสับปะรด + น้ำแอปเปิ้ล"),
    multiV([watermelonTask(6, 8), orangeTask(3, 12)], "น้ำแตงโม + น้ำส้ม"),
  ]},

  // L6: 2 tasks
  6: { level: 6, difficulty: "normal", variants: [
    multiV([orangeTask(2, 12), watermelonTask(6, 8)], "น้ำส้ม + น้ำแตงโม"),
    multiV([pineappleTask(4, 10), appleTask(3, 12)], "น้ำสับปะรด + น้ำแอปเปิ้ล"),
    multiV([watermelonTask(4, 8), orangeTask(3, 15)], "น้ำแตงโม + น้ำส้ม"),
    multiV([appleTask(4, 15), pineappleTask(3, 10)], "น้ำแอปเปิ้ล + น้ำสับปะรด"),
  ]},

  // ─── Hard (Level 7–9) ────────────────────────────────────────

  // L7: 3 tasks
  7: { level: 7, difficulty: "hard", variants: [
    multiV([orangeTask(2, 10), pineappleTask(4, 10), appleTask(3, 15)], "น้ำส้ม + น้ำสับปะรด + น้ำแอปเปิ้ล"),
    multiV([watermelonTask(4, 8), orangeTask(3, 12), pineappleTask(3, 10)], "น้ำแตงโม + น้ำส้ม + น้ำสับปะรด"),
    multiV([pineappleTask(5, 10), appleTask(2, 10), watermelonTask(4, 8)], "น้ำสับปะรด + น้ำแอปเปิ้ล + น้ำแตงโม"),
    multiV([appleTask(3, 12), watermelonTask(6, 8), orangeTask(2, 10)], "น้ำแอปเปิ้ล + น้ำแตงโม + น้ำส้ม"),
  ]},

  // L8: 3 tasks
  8: { level: 8, difficulty: "hard", variants: [
    multiV([watermelonTask(4, 8), pineappleTask(4, 10), appleTask(3, 15)], "น้ำแตงโม + น้ำสับปะรด + น้ำแอปเปิ้ล"),
    multiV([orangeTask(3, 12), watermelonTask(6, 8), pineappleTask(3, 10)], "น้ำส้ม + น้ำแตงโม + น้ำสับปะรด"),
    multiV([appleTask(4, 15), orangeTask(2, 10), watermelonTask(4, 8)], "น้ำแอปเปิ้ล + น้ำส้ม + น้ำแตงโม"),
    multiV([pineappleTask(5, 10), appleTask(2, 10), orangeTask(3, 12)], "น้ำสับปะรด + น้ำแอปเปิ้ล + น้ำส้ม"),
  ]},

  // L9: 4 tasks
  9: { level: 9, difficulty: "hard", variants: [
    multiV([orangeTask(3, 15), watermelonTask(4, 8), pineappleTask(4, 10), appleTask(3, 15)], "4 น้ำผสม"),
    multiV([pineappleTask(5, 10), appleTask(2, 10), watermelonTask(6, 8), orangeTask(2, 10)], "4 น้ำผสม"),
    multiV([watermelonTask(4, 8), orangeTask(4, 15), appleTask(3, 12), pineappleTask(3, 10)], "4 น้ำผสม"),
    multiV([appleTask(4, 15), pineappleTask(4, 10), orangeTask(3, 12), watermelonTask(4, 8)], "4 น้ำผสม"),
  ]},
};
