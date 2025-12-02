/**
 * Mock data for game information
 */

export interface GameData {
  id: string;
  title: string;
}

export const gameData: GameData[] = [
  {
    id: "path-navigation",
    title: "Path Navigation",
  },
  {
    id: "counting-classification",
    title: "Counting & Classification",
  },
  {
    id: "conditional-matching",
    title: "Conditional Matching",
  },
  {
    id: "sequencing",
    title: "Sequencing",
  },
  {
    id: "step-counting",
    title: "Step Counting",
  },
  {
    id: "fruit-matching-grid",
    title: "Fruit Matching Grid Game",
  },
  {
    id: "grid-based-coloring",
    title: "Grid-based Coloring",
  },
];

/**
 * Get game data by title
 * @param title - Game title to search for
 * @returns GameData if found, undefined otherwise
 */
export const getGameData = (title: string): GameData | undefined => {
  return gameData.find((game) => game.title === title);
};

