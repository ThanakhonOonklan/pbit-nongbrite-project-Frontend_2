// Conditional Matching Game — โคโค่ผจญภัยในป่า
// รูปแบบ: ทีละคำถาม (one question at a time)

import { type Difficulty } from "@/lib/games/types";

// ── Types ────────────────────────────────────────────────────

export interface CondMatchAnswer {
    id: string;
    emoji: string;
    text: string;
    isCorrect: boolean;
}

export interface CondMatchLevelConfig {
    level: number;
    difficulty: Difficulty;
    /** ข้อความด้านบน: สถานการณ์ที่โคโค่เจอ */
    situationText: string;
    /** คำถามที่ผู้เล่นต้องตอบ */
    questionText: string;
    /** emoji ประกอบฉาก เช่น 🌧️ */
    sceneEmoji: string;
    /** CSS gradient สำหรับ scene card */
    sceneBgFrom: string;
    sceneBgTo: string;
    /** ตัวเลือกคำตอบ */
    answers: CondMatchAnswer[];
}

// ── Level Data ───────────────────────────────────────────────

export const condMatchLevels: Record<number, CondMatchLevelConfig> = {

    // ─── Level 1 — ฝนตก (easy) ──────────────────────────────
    1: {
        level: 1,
        difficulty: "easy",
        situationText: "โคโค่เดินทางในป่า เจอฝนตกกลางทาง...",
        questionText: "ถ้าฝนตก โคโค่ควรทำอะไร?",
        sceneEmoji: "🌧️",
        sceneBgFrom: "#1E3A5F",
        sceneBgTo: "#2C5282",
        answers: [
            { id: "play", emoji: "☀️", text: "ออกไปเล่นต่อ", isCorrect: false },
            { id: "umbrella", emoji: "☂️", text: "หยิบร่มกัน", isCorrect: true },
            { id: "swim", emoji: "🏊", text: "ว่ายน้ำเลย", isCorrect: false },
        ],
    },
};
