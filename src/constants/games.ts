/**
 * Game information constants
 */

export interface GameInfo {
  part: number;
  title: string;
  color: string;
  shadowColor: string;
}

export const GAMES: GameInfo[] = [
  {
    part: 4,
    title: "Sequencing",
    color: "#9B59B6",
    shadowColor: "#7D3C98",
  },
  {
    part: 3,
    title: "Conditional Matching",
    color: "#FF9500",
    shadowColor: "#E68600",
  },
  {
    part: 2,
    title: "Counting & Classification",
    color: "#19C371",
    shadowColor: "#14A35E",
  },
  {
    part: 1,
    title: "Path Navigation",
    color: "#1CB0F6",
    shadowColor: "#1899D6",
  },
];

