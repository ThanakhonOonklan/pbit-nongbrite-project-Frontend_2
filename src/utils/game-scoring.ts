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

// ── Fruit Matching specific scoring ─────────────────────────

const FRUIT_MATCHING_WRONG_TABLE: ScoreTable = [
    [0, 60],
    [1, 45],
    [2, 30],
    [3, 15],
];

const FRUIT_MATCHING_TIME_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [70, 40],
        [90, 25],
        [110, 10],
    ],
    normal: [
        [80, 40],
        [100, 25],
        [120, 10],
    ],
    hard: [
        [90, 40],
        [110, 25],
        [130, 10],
    ],
};

export function calculateFruitMatchingScore(input: ScoreInput): ScoreResult {
    const attemptScore = lookup(FRUIT_MATCHING_WRONG_TABLE, input.attempts);
    const timeScore = lookup(FRUIT_MATCHING_TIME_TABLES[input.difficulty], input.timeSeconds);

    return {
        attemptScore,
        timeScore,
        totalScore: attemptScore + timeScore,
    };
}

// ── Grid Coloring specific scoring ──────────────────────────

const GRID_COLORING_WRONG_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [0, 60],
        [4, 40],
        [6, 20],
    ],
    normal: [
        [0, 60],
        [3, 40],
        [5, 20],
    ],
    hard: [
        [0, 60],
        [2, 40],
        [4, 20],
    ],
};

const GRID_COLORING_TIME_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [100, 40],
        [120, 25],
        [140, 10],
    ],
    normal: [
        [120, 40],
        [140, 25],
        [160, 10],
    ],
    hard: [
        [140, 40],
        [160, 25],
        [180, 10],
    ],
};

export function calculateGridColoringScore(input: ScoreInput): ScoreResult {
    const attemptScore = lookup(GRID_COLORING_WRONG_TABLES[input.difficulty], input.attempts);
    const timeScore = lookup(GRID_COLORING_TIME_TABLES[input.difficulty], input.timeSeconds);

    return {
        attemptScore,
        timeScore,
        totalScore: attemptScore + timeScore,
    };
}

// ── Counting Classification specific scoring ─────────────────

// Mistakes = input.attempts - 1
const COUNTING_WRONG_TABLE: ScoreTable = [
    [1, 60], // 1 attempt = 0 mistakes
    [2, 45], // 2 attempts = 1 mistake
    [3, 30], // 3 attempts = 2 mistakes
    [4, 15], // 4 attempts = 3 mistakes
];

const COUNTING_TIME_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [60, 40],
        [80, 25],
        [100, 10],
    ],
    normal: [
        [70, 40],
        [90, 25],
        [110, 10],
    ],
    hard: [
        [80, 40],
        [100, 25],
        [120, 10],
    ],
};

export function calculateCountingClassificationScore(input: ScoreInput): ScoreResult {
    const attemptScore = lookup(COUNTING_WRONG_TABLE, input.attempts);
    const timeScore = lookup(COUNTING_TIME_TABLES[input.difficulty], input.timeSeconds);

    return {
        attemptScore,
        timeScore,
        totalScore: attemptScore + timeScore,
    };
}

// ── Step Counting specific scoring ──────────────────────────

const STEP_COUNTING_PENALTY_TABLE: ScoreTable = [
    [0, 60],
    [2, 40],
    [4, 20],
];

const STEP_COUNTING_TIME_TABLES: Record<Difficulty, ScoreTable> = {
    easy: [
        [90, 40],
        [120, 25],
        [150, 10],
    ],
    normal: [
        [120, 40],
        [150, 25],
        [180, 10],
    ],
    hard: [
        [150, 40],
        [180, 25],
        [210, 10],
    ],
};

export function calculateStepCountingScore(input: {
    difficulty: Difficulty;
    penaltyCount: number;
    timeSeconds: number;
}): ScoreResult {
    const penaltyScore = lookup(STEP_COUNTING_PENALTY_TABLE, input.penaltyCount);
    const timeScore = lookup(STEP_COUNTING_TIME_TABLES[input.difficulty], input.timeSeconds);

    return {
        attemptScore: penaltyScore,
        timeScore,
        totalScore: Math.max(0, penaltyScore + timeScore),
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
