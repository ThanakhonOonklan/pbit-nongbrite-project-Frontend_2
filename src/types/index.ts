/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

/**
 * API Response type
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Pagination type
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Common props for components
 */
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Rank/Leaderboard types
 */
export interface RankUser {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  change?: number; // Change in rank (positive = moved up, negative = moved down)
  badge?: string; // Special badge or achievement
  gender?: string; // เพศ: "เพศชาย", "เพศหญิง", หรือ "ไม่ระบุตัวตน"
}

export interface LeaderboardData {
  topThree: RankUser[];
  topTen: RankUser[];
  myRank: RankUser | null;
  totalUsers: number;
}

/**
 * My Rank Data type for user's own rank information
 */
export interface MyRankData {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  gender?: string;
  daystate: number; // วันที่เล่นต่อเนื่อง
  joinDate?: string; // วันที่เข้าร่วม
  rankBadge?: string; // path to rank badge image
  heartCount?: number; // จำนวนหัวใจ
  fireCount?: number; // จำนวนไฟ
}
