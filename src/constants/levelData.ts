export interface LevelData {
  level: number;
  title: string;
  timeLimit: string;
  difficulty: number;
  difficultyText: string;
  isLocked: boolean;
}

export const levelData: LevelData[] = [
  // Level 1-3: Green, 120 seconds
  {
    level: 1,
    title: "Level 1",
    timeLimit: "120 วินาที",
    difficulty: 1,
    difficultyText: "ง่าย",
    isLocked: false,
  },
  {
    level: 2,
    title: "Level 2",
    timeLimit: "120 วินาที",
    difficulty: 1,
    difficultyText: "ง่าย",
    isLocked: false,
  },
  {
    level: 3,
    title: "Level 3",
    timeLimit: "120 วินาที",
    difficulty: 1,
    difficultyText: "ง่าย",
    isLocked: false,
  },
  // Level 4-6: Yellow, 130 seconds
  {
    level: 4,
    title: "Level 4",
    timeLimit: "130 วินาที",
    difficulty: 2,
    difficultyText: "ปานกลาง",
    isLocked: true,
  },
  {
    level: 5,
    title: "Level 5",
    timeLimit: "130 วินาที",
    difficulty: 2,
    difficultyText: "ปานกลาง",
    isLocked: true,
  },
  {
    level: 6,
    title: "Level 6",
    timeLimit: "130 วินาที",
    difficulty: 2,
    difficultyText: "ปานกลาง",
    isLocked: true,
  },
  // Level 7-9: Red, 140 seconds
  {
    level: 7,
    title: "Level 7",
    timeLimit: "140 วินาที",
    difficulty: 3,
    difficultyText: "ยาก",
    isLocked: true,
  },
  {
    level: 8,
    title: "Level 8",
    timeLimit: "140 วินาที",
    difficulty: 3,
    difficultyText: "ยาก",
    isLocked: true,
  },
  {
    level: 9,
    title: "Level 9",
    timeLimit: "140 วินาที",
    difficulty: 3,
    difficultyText: "ยาก",
    isLocked: true,
  },
];

export const getLevelData = (level: number): LevelData | undefined => {
  return levelData.find((data) => data.level === level);
};

