/**
 * Mock data for profile page
 */

import { RankUser } from "@/types";

export const mockMyRank: RankUser = {
  id: "5",
  rank: 5,
  name: "น้องไบร์",
  score: 5672,
  change: 0,
  badge: "ผู้เริ่มต้นที่ดี",
};

export const mockStreakDays = 0;

export const mockProgressItems = [
  { title: "เกมการนำทาง", current: 8, total: 27 },
  { title: "เกมการจับและจำแนกรุปกรง", current: 6, total: 27 },
  { title: "เกมจับคู่เชื่อมโยง", current: 18, total: 27 },
  { title: "เรียงลำดับวงจรชีวิต", current: 26, total: 27 },
];

