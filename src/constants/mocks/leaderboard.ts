/**
 * Mock data for leaderboard/rank page
 */

import { LeaderboardData } from "@/types";

export const mockLeaderboardData: LeaderboardData = {
  topThree: [
    {
      id: "1",
      rank: 1,
      name: "น้องมิ้นท์",
      avatar: "/icons/misc/logo.png",
      score: 15420,
      change: 0,
      badge: "นักเรียนยอดเยี่ยม",
    },
    {
      id: "2",
      rank: 2,
      name: "น้องปิ๊ก",
      avatar: "/icons/misc/logo.png",
      score: 14280,
      change: 1,
    },
    {
      id: "3",
      rank: 3,
      name: "น้องแบงค์",
      avatar: "/icons/misc/logo.png",
      score: 13150,
      change: -1,
    },
  ],
  topTen: [
    {
      id: "1",
      rank: 1,
      name: "น้องมิ้นท์",
      avatar: "/icons/misc/logo.png",
      score: 15420,
      change: 0,
      badge: "นักเรียนยอดเยี่ยม",
    },
    {
      id: "2",
      rank: 2,
      name: "น้องปิ๊ก",
      avatar: "/icons/misc/logo.png",
      score: 14280,
      change: 1,
    },
    {
      id: "3",
      rank: 3,
      name: "น้องแบงค์",
      avatar: "/icons/misc/logo.png",
      score: 13150,
      change: -1,
    },
    {
      id: "4",
      rank: 4,
      name: "น้องพลอย",
      score: 12890,
      change: 2,
    },
    {
      id: "5",
      rank: 5,
      name: "น้องไบร์",
      score: 11750,
      change: 0,
      badge: "นักคิดเลข",
    },
    {
      id: "6",
      rank: 6,
      name: "น้องกิ๊ฟ",
      score: 10980,
      change: -2,
    },
    {
      id: "7",
      rank: 7,
      name: "น้องโอ๊ต",
      score: 10450,
      change: 1,
    },
    {
      id: "8",
      rank: 8,
      name: "น้องเฟิร์น",
      score: 9820,
      change: 3,
    },
    {
      id: "9",
      rank: 9,
      name: "น้องบีม",
      score: 9350,
      change: -1,
    },
    {
      id: "10",
      rank: 10,
      name: "น้องแพม",
      score: 8900,
      change: -2,
    },
  ],
  myRank: {
    id: "5",
    rank: 5,
    name: "น้องไบร์",
    score: 2000,
    change: 0,
    badge: "นักคิดเลข",
  },
  totalUsers: 1547,
};

