/**
 * Utility functions for level-related operations
 */

/**
 * Extract level number from levelTitle (e.g., "Level 1" -> 1)
 */
export const extractLevelNumber = (title?: string): number => {
  if (!title) return 1;
  const match = title.match(/Level\s+(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
};

/**
 * Extract number from timeLimit string (e.g., "120 วินาที" -> 120)
 */
export const extractTimeNumber = (timeStr?: string): number => {
  if (!timeStr) return 0;
  const match = timeStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

/**
 * Get difficulty badge color based on level
 */
export const getDifficultyBadgeColor = (difficulty: number): string => {
  const levelColors: Record<number, string> = {
    1: "#22C55E", // Green
    2: "#EAB308", // Yellow
    3: "#EF4444", // Red
  };
  const normalizedDifficulty = Math.max(1, Math.min(3, difficulty));
  return levelColors[normalizedDifficulty] || levelColors[1];
};

/**
 * Determine counter places based on level number
 */
export const getCounterPlaces = (levelNumber: number): number[] => {
  return levelNumber >= 10 ? [10, 1] : [1];
};

