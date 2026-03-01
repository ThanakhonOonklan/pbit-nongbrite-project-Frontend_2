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
