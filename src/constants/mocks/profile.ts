/**
 * Mock data for profile page
 */

import { RankUser } from "@/types";
import type { DayData } from "@/components/profile";

export const mockMyRank: RankUser = {
  id: "5",
  rank: 5,
  name: "น้องไบร์",
  score: 5672,
  change: 0,
  badge: "ผู้เริ่มต้นที่ดี",
};

export const mockStreakDays: DayData[] = [
  { day: "S", date: 18, status: "missed" },
  { day: "M", date: 19, status: "completed" },
  { day: "T", date: 20, status: "completed" },
  { day: "W", date: 21, status: "missed" },
  { day: "T", date: 22, status: "missed" },
  { day: "F", date: 23, status: "missed" },
  { day: "S", date: 24, status: "missed" },
];

export const mockProgressItems = [
  { title: "เกมการนำทาง", current: 8, total: 27 },
  { title: "เกมการจับและจำแนกรุปกรง", current: 6, total: 27 },
  { title: "เกมจับคู่เชื่อมโยง", current: 18, total: 27 },
  { title: "เรียงลำดับวงจรชีวิต", current: 26, total: 27 },
];

