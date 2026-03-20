import { gamesConfig } from "@/constants/courses/gameConfig";

/**
 * คำนวณหา levelId (1-63) จาก gameId และ level (1-9)
 * @param gameId ID ของเกม (เช่น 'path-navigation', 'conditional-matching')
 * @param levelNum ด่านที่เล่น (1-9)
 * @returns levelId ที่จะส่งไป API /game/submit (1-63)
 */
export const getAbsoluteLevelId = (gameId: string, levelNum: number): number => {
  const gameIndex = gamesConfig.findIndex(g => g.id === gameId);
  if (gameIndex === -1) {
    console.error(`Game ID ${gameId} not found in gamesConfig. Use fallback levelNum.`);
    return levelNum;
  }
  
  // แต่ละเกมมี 9 ด่านเรียงกันไป
  return (gameIndex * 9) + levelNum;
};
