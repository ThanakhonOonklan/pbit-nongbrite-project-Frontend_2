// ============================================================
// Shared Game Scoring System
// ใช้ร่วมกับเกม: Path Navigation, Sequencing, Step Counting, Conditional Matching
// ============================================================

export type Difficulty = "easy" | "normal" | "hard";

export interface ScoreInput {
    difficulty: Difficulty;
    /** จำนวนครั้งที่กด Run / ตอบ (ครั้งที่ตอบถูก = attempts ครั้งสุดท้าย) */
    attempts: number;
    /** เวลาที่ใช้ทั้งหมด (วินาที) */
    timeSeconds: number;
}

export interface ScoreResult {
    attemptScore: number;   // 0–60
    timeScore: number;      // 0–40
    totalScore: number;     // 0–100
}

type ScoreTable = [number, number][];

const ATTEMPT_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [2, 60],
        [4, 40],
        [6, 20],
    ],
    normal: [
        [2, 60],
        [4, 40],
        [6, 20],
    ],
    hard: [
        [1, 60],
        [3, 40],
        [5, 20],
    ],
};

// ── Time scoring tables ─────────────────────────────────────
// Each entry: [maxSeconds, score]

const TIME_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [80, 40],
        [100, 25],
        [120, 10],
    ],
    normal: [
        [90, 40],
        [110, 25],
        [130, 10],
    ],
    hard: [
        [100, 40],
        [120, 25],
        [140, 10],
    ],
};

// ── Helper ──────────────────────────────────────────────────

function lookup(table: ScoreTable, value: number): number {
    for (const [max, score] of table) {
        if (value <= max) return score;
    }
    return 0; // เกินทุกช่วง = 0 คะแนน
}

// ── Main function ───────────────────────────────────────────

export function calculateGameScore(input: ScoreInput): ScoreResult {
    const attemptScore = lookup(ATTEMPT_TABLES[input.difficulty], input.attempts);
    const timeScore = lookup(TIME_TABLES[input.difficulty], input.timeSeconds);

    return {
        attemptScore,
        timeScore,
        totalScore: attemptScore + timeScore,
    };
}

// ── Star rating ─────────────────────────────────────────────

export interface StarResult {
    stars: number;   // 0–3
    passed: boolean; // ผ่านด่านหรือไม่
}

/**
 * แปลงคะแนนรวม (0–100) เป็นระดับดาว
 * - ≥ 90 = 3 ดาว
 * - 60–89 = 2 ดาว
 * - 30–59 = 1 ดาว
 * - < 30  = 0 ดาว (ไม่ผ่าน)
 */
export function getStarRating(totalScore: number): StarResult {
    if (totalScore >= 90) return { stars: 3, passed: true };
    if (totalScore >= 60) return { stars: 2, passed: true };
    if (totalScore >= 30) return { stars: 1, passed: true };
    return { stars: 0, passed: false };
}
