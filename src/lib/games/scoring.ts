// Scoring system shared across all games
// เกณฑ์การให้คะแนนแบ่งตามระดับ ง่าย / ปานกลาง / ยาก

import { type Difficulty, type ScoringConfig } from "./types";

// ========================================
// เกณฑ์คะแนนพื้นฐาน (Path Navigation, Sequencing, Step Counting, Conditional Matching)
// ========================================
const BASIC_SCORING: Record<Difficulty, ScoringConfig> = {
    easy: {
        mistakeThresholds: [
            { max: 2, score: 60 },
            { max: 4, score: 40 },
            { max: 6, score: 20 },
        ],
        timeThresholds: [
            { max: 80, score: 40 },
            { max: 100, score: 25 },
            { max: 120, score: 10 },
        ],
    },
    normal: {
        mistakeThresholds: [
            { max: 2, score: 60 },
            { max: 4, score: 40 },
            { max: 6, score: 20 },
        ],
        timeThresholds: [
            { max: 90, score: 40 },
            { max: 110, score: 25 },
            { max: 130, score: 10 },
        ],
    },
    hard: {
        mistakeThresholds: [
            { max: 1, score: 60 },
            { max: 3, score: 40 },
            { max: 5, score: 20 },
        ],
        timeThresholds: [
            { max: 100, score: 40 },
            { max: 120, score: 25 },
            { max: 140, score: 10 },
        ],
    },
};

/**
 * คำนวณคะแนนจากจำนวนครั้งที่ผิดพลาด (0-60 คะแนน)
 */
export function calculateMistakeScore(
    mistakes: number,
    difficulty: Difficulty,
    scoringType: "basic" = "basic"
): number {
    const config =
        scoringType === "basic" ? BASIC_SCORING[difficulty] : BASIC_SCORING[difficulty];
    for (const t of config.mistakeThresholds) {
        if (mistakes <= t.max) return t.score;
    }
    return 0;
}

/**
 * คำนวณคะแนนจากเวลาที่ใช้ (0-40 คะแนน)
 */
export function calculateTimeScore(
    seconds: number,
    difficulty: Difficulty,
    scoringType: "basic" = "basic"
): number {
    const config =
        scoringType === "basic" ? BASIC_SCORING[difficulty] : BASIC_SCORING[difficulty];
    for (const t of config.timeThresholds) {
        if (seconds <= t.max) return t.score;
    }
    return 0;
}

/**
 * คำนวณคะแนนรวมและจำนวนดาว
 */
export function calculateTotalScore(
    mistakes: number,
    seconds: number,
    difficulty: Difficulty,
    scoringType: "basic" = "basic"
) {
    const mistakeScore = calculateMistakeScore(mistakes, difficulty, scoringType);
    const timeScore = calculateTimeScore(seconds, difficulty, scoringType);
    const total = mistakeScore + timeScore;
    const stars = total >= 80 ? 3 : total >= 50 ? 2 : total > 0 ? 1 : 0;
    return { mistakeScore, timeScore, total, stars };
}

// ========================================
// เกณฑ์คะแนนเฉพาะเกม: Counting Classification
// เกมการนับและจำแนกรูปทรงเลขาคณิต
// ========================================

/**
 * Config สำหรับแต่ละระดับ:
 * - totalCategories  = จำนวนประเภทที่ต้องตอบให้ครบ (full score)
 * - categoryScores   = ตารางคะแนนตามจำนวนประเภทที่ตอบถูก
 * - timeThresholds   = ตารางคะแนนตามเวลา
 */
interface CCCategoryScore {
    /** จำนวนประเภทที่ตอบถูกต้อง (exact match) */
    correctCategories: number;
    score: number;
}

interface CCLevelScoringConfig {
    totalCategories: number;
    categoryScores: CCCategoryScore[];
    timeThresholds: { max: number; score: number }[];
}

const CC_SCORING: Record<Difficulty, CCLevelScoringConfig> = {
    // ── ระดับง่าย: ครบ 4 ประเภท ─────────────────────────────
    easy: {
        totalCategories: 4,
        categoryScores: [
            { correctCategories: 4, score: 60 },
            { correctCategories: 3, score: 45 },
            { correctCategories: 2, score: 30 },
            { correctCategories: 1, score: 15 },
            { correctCategories: 0, score: 0 },
        ],
        timeThresholds: [
            { max: 60, score: 40 },
            { max: 80, score: 25 },
            { max: 100, score: 10 },
        ],
    },
    // ── ระดับปานกลาง: ครบ 6 ประเภท ──────────────────────────
    normal: {
        totalCategories: 6,
        categoryScores: [
            { correctCategories: 6, score: 60 },
            { correctCategories: 3, score: 45 },
            { correctCategories: 2, score: 30 },
            { correctCategories: 1, score: 15 },
            { correctCategories: 0, score: 0 },
        ],
        timeThresholds: [
            { max: 70, score: 40 },
            { max: 90, score: 25 },
            { max: 110, score: 10 },
        ],
    },
    // ── ระดับยาก: ครบ 8 ประเภท ───────────────────────────────
    hard: {
        totalCategories: 8,
        categoryScores: [
            { correctCategories: 8, score: 60 },
            { correctCategories: 3, score: 45 },
            { correctCategories: 2, score: 30 },
            { correctCategories: 1, score: 15 },
            { correctCategories: 0, score: 0 },
        ],
        timeThresholds: [
            { max: 80, score: 40 },
            { max: 100, score: 25 },
            { max: 120, score: 10 },
        ],
    },
};

/**
 * คำนวณคะแนนจากจำนวนประเภทที่ตอบถูก (0-60 คะแนน)
 * ใช้สำหรับเกม counting-classification เท่านั้น
 *
 * @param correctCategories - จำนวนประเภทที่ตอบถูกต้อง
 * @param difficulty        - ระดับความยาก
 */
export function calculateCCCategoryScore(
    correctCategories: number,
    difficulty: Difficulty
): number {
    const config = CC_SCORING[difficulty];
    // ค้นหาจากมากไปน้อย — หยุดเมื่อ correctCategories >= threshold
    for (const t of config.categoryScores) {
        if (correctCategories >= t.correctCategories) return t.score;
    }
    return 0;
}

/**
 * คำนวณคะแนนจากเวลาที่ใช้ (0-40 คะแนน)
 * ใช้สำหรับเกม counting-classification เท่านั้น
 *
 * @param seconds    - เวลาที่ใช้ (วินาที)
 * @param difficulty - ระดับความยาก
 */
export function calculateCCTimeScore(
    seconds: number,
    difficulty: Difficulty
): number {
    const { timeThresholds } = CC_SCORING[difficulty];
    for (const t of timeThresholds) {
        if (seconds <= t.max) return t.score;
    }
    return 0; // เกินเวลาทั้งหมด
}

/**
 * คำนวณคะแนนรวมและจำนวนดาวสำหรับเกม counting-classification
 *
 * @param correctCategories - จำนวนประเภทที่ตอบถูกต้อง
 * @param seconds           - เวลาที่ใช้ (วินาที)
 * @param difficulty        - ระดับความยาก (easy | normal | hard)
 *
 * @returns {{ categoryScore, timeScore, totalScore, stars, totalCategories }}
 *
 * @example
 * // ด่าน easy ตอบถูก 3 ประเภท ใช้เวลา 55 วินาที
 * calculateCCTotalScore(3, 55, "easy")
 * // → { categoryScore: 45, timeScore: 40, totalScore: 85, stars: 3, totalCategories: 4 }
 */
export function calculateCCTotalScore(
    correctCategories: number,
    seconds: number,
    difficulty: Difficulty
) {
    const categoryScore = calculateCCCategoryScore(correctCategories, difficulty);
    const timeScore = calculateCCTimeScore(seconds, difficulty);
    const totalScore = categoryScore + timeScore;
    const stars = totalScore >= 80 ? 3 : totalScore >= 50 ? 2 : totalScore > 0 ? 1 : 0;
    const totalCategories = CC_SCORING[difficulty].totalCategories;

    return { categoryScore, timeScore, totalScore, stars, totalCategories };
}

// ========================================
// เกณฑ์คะแนนเฉพาะเกม: Fruit Matching Grid
// เกมการจับคู่ผลไม้ในตาราง
// ========================================

/**
 * จำนวนช่องทั้งหมดตามระดับความยาก:
 *   easy   = 4 ช่อง  (ผิดได้ 0-4)
 *   normal = 6 ช่อง  (ผิดได้ 0-4+)
 *   hard   = 8 ช่อง  (ผิดได้ 0-4+)
 *
 * คะแนน mistake คิดจาก "จำนวนช่องที่ผิด" (0 = เต็ม, ≥4 = 0)
 */
interface FMGLevelScoringConfig {
    totalSlots: number;
    mistakeThresholds: { maxMistakes: number; score: number }[];
    timeThresholds: { max: number; score: number }[];
}

const FMG_SCORING: Record<Difficulty, FMGLevelScoringConfig> = {
    // ── ระดับง่าย: 4 ช่อง ────────────────────────────────────
    easy: {
        totalSlots: 4,
        mistakeThresholds: [
            { maxMistakes: 0, score: 60 },
            { maxMistakes: 1, score: 45 },
            { maxMistakes: 2, score: 30 },
            { maxMistakes: 3, score: 15 },
        ],
        timeThresholds: [
            { max: 70, score: 40 },
            { max: 90, score: 25 },
            { max: 110, score: 10 },
        ],
    },
    // ── ระดับปานกลาง: 6 ช่อง ─────────────────────────────────
    normal: {
        totalSlots: 6,
        mistakeThresholds: [
            { maxMistakes: 0, score: 60 },
            { maxMistakes: 1, score: 45 },
            { maxMistakes: 2, score: 30 },
            { maxMistakes: 3, score: 15 },
        ],
        timeThresholds: [
            { max: 80, score: 40 },
            { max: 100, score: 25 },
            { max: 120, score: 10 },
        ],
    },
    // ── ระดับยาก: 8 ช่อง ─────────────────────────────────────
    hard: {
        totalSlots: 8,
        mistakeThresholds: [
            { maxMistakes: 0, score: 60 },
            { maxMistakes: 1, score: 45 },
            { maxMistakes: 2, score: 30 },
            { maxMistakes: 3, score: 15 },
        ],
        timeThresholds: [
            { max: 90, score: 40 },
            { max: 110, score: 25 },
            { max: 130, score: 10 },
        ],
    },
};

/**
 * คำนวณคะแนนจากจำนวนช่องที่ตอบผิด (0-60 คะแนน)
 * ใช้สำหรับเกม fruit-matching-grid เท่านั้น
 *
 * @param mistakes   - จำนวนช่องที่ตอบผิด (0 = ไม่ผิดเลย)
 * @param difficulty - ระดับความยาก
 */
export function calculateFMGMistakeScore(
    mistakes: number,
    difficulty: Difficulty
): number {
    const { mistakeThresholds } = FMG_SCORING[difficulty];
    for (const t of mistakeThresholds) {
        if (mistakes <= t.maxMistakes) return t.score;
    }
    return 0; // ผิด ≥ 4 ช่อง
}

/**
 * คำนวณคะแนนจากเวลาที่ใช้ (0-40 คะแนน)
 * ใช้สำหรับเกม fruit-matching-grid เท่านั้น
 *
 * @param seconds    - เวลาที่ใช้ (วินาที)
 * @param difficulty - ระดับความยาก
 */
export function calculateFMGTimeScore(
    seconds: number,
    difficulty: Difficulty
): number {
    const { timeThresholds } = FMG_SCORING[difficulty];
    for (const t of timeThresholds) {
        if (seconds <= t.max) return t.score;
    }
    return 0; // เกินเวลาทั้งหมด
}

/**
 * คำนวณคะแนนรวมและจำนวนดาวสำหรับเกม fruit-matching-grid
 *
 * @param mistakes   - จำนวนช่องที่ตอบผิด
 * @param seconds    - เวลาที่ใช้ (วินาที)
 * @param difficulty - ระดับความยาก (easy | normal | hard)
 *
 * @returns {{ mistakeScore, timeScore, totalScore, stars, totalSlots }}
 *
 * @example
 * // ด่าน normal ผิด 1 ช่อง ใช้เวลา 75 วินาที
 * calculateFMGTotalScore(1, 75, "normal")
 * // → { mistakeScore: 45, timeScore: 40, totalScore: 85, stars: 3, totalSlots: 6 }
 */
export function calculateFMGTotalScore(
    mistakes: number,
    seconds: number,
    difficulty: Difficulty
) {
    const mistakeScore = calculateFMGMistakeScore(mistakes, difficulty);
    const timeScore = calculateFMGTimeScore(seconds, difficulty);
    const totalScore = mistakeScore + timeScore;
    const stars = totalScore >= 80 ? 3 : totalScore >= 50 ? 2 : totalScore > 0 ? 1 : 0;
    const totalSlots = FMG_SCORING[difficulty].totalSlots;

    return { mistakeScore, timeScore, totalScore, stars, totalSlots };
}

// ========================================
// เกณฑ์คะแนนเฉพาะเกม: Grid-Based Coloring
// เกมการระบายสีตาราง
// ========================================

/**
 * ขนาดตารางตามระดับความยาก:
 *   easy   = 4×4 (ผิดได้ 1-4 / 5-6 / >6)
 *   normal = 5×5 (ผิดได้ 1-3 / 4-5 / >5)
 *   hard   = 6×6 (ผิดได้ 1-2 / 3-4 / >4)
 *
 * คะแนน mistake คิดจาก "จำนวนช่องที่ระบายผิด"
 */
interface GBCMistakeTier {
    /** ช่วงบน (inclusive) ของจำนวนช่องที่ผิด */
    maxMistakes: number;
    score: number;
}

interface GBCLevelScoringConfig {
    gridSize: string; // เพื่อบอกขนาดตาราง เช่น "4×4"
    mistakeTiers: GBCMistakeTier[];
    timeThresholds: { max: number; score: number }[];
}

const GBC_SCORING: Record<Difficulty, GBCLevelScoringConfig> = {
    // ── ระดับง่าย: 4×4 ──────────────────────────────────────
    easy: {
        gridSize: "4×4",
        mistakeTiers: [
            { maxMistakes: 0, score: 60 },  // ถูกทุกช่อง
            { maxMistakes: 4, score: 40 },  // ผิด 1–4
            { maxMistakes: 6, score: 20 },  // ผิด 5–6
        ],
        timeThresholds: [
            { max: 100, score: 40 },
            { max: 120, score: 25 },
            { max: 140, score: 10 },
        ],
    },
    // ── ระดับปานกลาง: 5×5 ───────────────────────────────────
    normal: {
        gridSize: "5×5",
        mistakeTiers: [
            { maxMistakes: 0, score: 60 },  // ถูกทุกช่อง
            { maxMistakes: 3, score: 40 },  // ผิด 1–3
            { maxMistakes: 5, score: 20 },  // ผิด 4–5
        ],
        timeThresholds: [
            { max: 120, score: 40 },
            { max: 140, score: 25 },
            { max: 160, score: 10 },
        ],
    },
    // ── ระดับยาก: 6×6 ───────────────────────────────────────
    hard: {
        gridSize: "6×6",
        mistakeTiers: [
            { maxMistakes: 0, score: 60 },  // ถูกทุกช่อง
            { maxMistakes: 2, score: 40 },  // ผิด 1–2
            { maxMistakes: 4, score: 20 },  // ผิด 3–4
        ],
        timeThresholds: [
            { max: 140, score: 40 },
            { max: 160, score: 25 },
            { max: 180, score: 10 },
        ],
    },
};

/**
 * คำนวณคะแนนจากจำนวนช่องที่ระบายผิด (0-60 คะแนน)
 * ใช้สำหรับเกม grid-based-coloring เท่านั้น
 *
 * @param mistakes   - จำนวนช่องที่ระบายผิดสี (0 = ถูกทุกช่อง)
 * @param difficulty - ระดับความยาก
 */
export function calculateGBCMistakeScore(
    mistakes: number,
    difficulty: Difficulty
): number {
    const { mistakeTiers } = GBC_SCORING[difficulty];
    for (const tier of mistakeTiers) {
        if (mistakes <= tier.maxMistakes) return tier.score;
    }
    return 0; // เกิน threshold สูงสุด
}

/**
 * คำนวณคะแนนจากเวลาที่ใช้ (0-40 คะแนน)
 * ใช้สำหรับเกม grid-based-coloring เท่านั้น
 *
 * @param seconds    - เวลาที่ใช้ (วินาที)
 * @param difficulty - ระดับความยาก
 */
export function calculateGBCTimeScore(
    seconds: number,
    difficulty: Difficulty
): number {
    const { timeThresholds } = GBC_SCORING[difficulty];
    for (const t of timeThresholds) {
        if (seconds <= t.max) return t.score;
    }
    return 0; // เกินเวลาทั้งหมด
}

/**
 * คำนวณคะแนนรวมและจำนวนดาวสำหรับเกม grid-based-coloring
 *
 * @param mistakes   - จำนวนช่องที่ระบายผิดสี
 * @param seconds    - เวลาที่ใช้ (วินาที)
 * @param difficulty - ระดับความยาก (easy | normal | hard)
 *
 * @returns {{ mistakeScore, timeScore, totalScore, stars, gridSize }}
 *
 * @example
 * // ด่าน hard ผิด 2 ช่อง ใช้เวลา 130 วินาที
 * calculateGBCTotalScore(2, 130, "hard")
 * // → { mistakeScore: 40, timeScore: 40, totalScore: 80, stars: 3, gridSize: "6×6" }
 */
export function calculateGBCTotalScore(
    mistakes: number,
    seconds: number,
    difficulty: Difficulty
) {
    const mistakeScore = calculateGBCMistakeScore(mistakes, difficulty);
    const timeScore = calculateGBCTimeScore(seconds, difficulty);
    const totalScore = mistakeScore + timeScore;
    const stars = totalScore >= 80 ? 3 : totalScore >= 50 ? 2 : totalScore > 0 ? 1 : 0;
    const gridSize = GBC_SCORING[difficulty].gridSize;

    return { mistakeScore, timeScore, totalScore, stars, gridSize };
}
