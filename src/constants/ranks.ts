export interface RankConfig {
  id: number;
  name: string;
  label: string;
  minScore: number;
  maxScore: number;
  scoreRequired: number;
  iconPath: string;
}

export const RANKS: RankConfig[] = [
  {
    id: 1,
    name: "Newbie",
    label: "มือใหม่",
    minScore: 0,
    maxScore: 499,
    scoreRequired: 500,
    iconPath: "/icons/rank/beginner-dark.png"
  },
  {
    id: 2,
    name: "Junior",
    label: "จูเนียร์",
    minScore: 500,
    maxScore: 1499,
    scoreRequired: 1000,
    iconPath: "/icons/rank/explorer-dark.png"
  },
  {
    id: 3,
    name: "Smart",
    label: "สมาร์ท",
    minScore: 1500,
    maxScore: 2499,
    scoreRequired: 1000,
    iconPath: "/icons/rank/thinker-dark.png"
  },
  {
    id: 4,
    name: "Hero",
    label: "ฮีโร่",
    minScore: 2500,
    maxScore: 3499,
    scoreRequired: 1000,
    iconPath: "/icons/rank/solver-dark.png"
  },
  {
    id: 5,
    name: "Super",
    label: "ซูเปอร์",
    minScore: 3500,
    maxScore: 4499,
    scoreRequired: 1000,
    iconPath: "/icons/rank/strategist-dark.png"
  },
  {
    id: 6,
    name: "Master",
    label: "มาสเตอร์",
    minScore: 4500,
    maxScore: 6299,
    scoreRequired: 1800,
    iconPath: "/icons/rank/master-dark.png"
  },
  {
    id: 7,
    name: "Legend",
    label: "เลเจนด์",
    minScore: 6300,
    maxScore: Infinity,
    scoreRequired: Infinity,
    iconPath: "/icons/rank/legend-dark.png"
  }
];

// Helper function: หา rank จากคะแนน
export const getRankByScore = (score: number): RankConfig => {
  // เรียงจากสูงไปต่ำ เพื่อหา rank ที่เหมาะสม
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (score >= RANKS[i].minScore) {
      return RANKS[i];
    }
  }
  return RANKS[0]; // fallback
};

// Helper function: หา rank badge image path
export const getRankBadgeImage = (score: number): string => {
  const rank = getRankByScore(score);
  return rank.iconPath;
};

// Helper function: หา rank info สำหรับคำนวณ progress
export const getRankBadgeInfo = (score: number) => {
  const currentRank = getRankByScore(score);
  const nextRankIndex = RANKS.findIndex(r => r.minScore > score);
  const nextRank = nextRankIndex !== -1 ? RANKS[nextRankIndex] : null;

  // แปลง Infinity เป็นค่าสูงสุดสำหรับการคำนวณ progress
  const maxScore = currentRank.maxScore === Infinity ? 999999 : currentRank.maxScore;

  return {
    name: currentRank.name,
    label: currentRank.label,
    minScore: currentRank.minScore,
    maxScore: maxScore,
    nextRank: nextRank,
    scoreNeeded: nextRank ? nextRank.minScore - score : 0
  };
};

// Helper function: หา rank badge image path จาก rank id
export const getRankBadgeImageByRankId = (rankId: number): string => {
  const rank = RANKS.find(r => r.id === rankId);
  return rank?.iconPath || RANKS[0].iconPath;
};
