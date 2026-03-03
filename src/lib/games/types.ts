// Shared game types used across all 7 games

export type Difficulty = "easy" | "normal" | "hard";

export interface GameResult {
    mistakes: number;
    timeUsed: number; // seconds
    mistakeScore: number; // 0-60
    timeScore: number; // 0-40
    totalScore: number; // 0-100
    stars: number; // 0-3
}

export interface BaseLevelConfig {
    level: number;
    difficulty: Difficulty;
    maxCommands?: number;
}

// Scoring config structure (used in scoring.ts)
export interface ScoringThreshold {
    max: number;
    score: number;
}

export interface ScoringConfig {
    mistakeThresholds: ScoringThreshold[];
    timeThresholds: ScoringThreshold[];
}
