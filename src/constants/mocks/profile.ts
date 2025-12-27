/**
 * Mock data for profile page
 */

import { RankUser } from "@/types";
import type { DayData } from "@/components/profile";
import { 
  FaRoute, FaSquare, FaLink, FaRecycle, 
  FaRuler, FaTh, FaPalette 
} from "react-icons/fa";
import React from "react";
import type { LevelData } from "@/components/profile/ProgressItem";

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

// Helper function to generate level data
const generateLevels = (completedLevels: number): LevelData[] => {
  return Array.from({ length: 9 }, (_, i) => {
    const level = i + 1;
    if (level <= completedLevels) {
      // Mock: ด่าน 1 = 3 ดาว, ด่าน 2 = 2 ดาว, ด่าน 3 = 1 ดาว, cycle pattern
      const stars = 3 - ((level - 1) % 3);
      return { level, stars, completed: true };
    }
    return { level, stars: 0, completed: false };
  });
};

export const mockProgressItems = [
  { 
    title: "Path Navigation", 
    current: 3, 
    total: 9,
    icon: React.createElement(FaRoute, { className: "w-5 h-5" }),
    color: "#1CB0F6",
    levels: generateLevels(3)
  },
  { 
    title: "Counting & Classification", 
    current: 3, 
    total: 9,
    icon: React.createElement(FaSquare, { className: "w-5 h-5" }),
    color: "#FB96BB",
    levels: generateLevels(3)
  },
  { 
    title: "Conditional Matching", 
    current: 3, 
    total: 9,
    icon: React.createElement(FaLink, { className: "w-5 h-5" }),
    color: "#FFB356",
    levels: generateLevels(3)
  },
  { 
    title: "Sequencing", 
    current: 3, 
    total: 9,
    icon: React.createElement(FaRecycle, { className: "w-5 h-5" }),
    color: "#9956DE",
    levels: generateLevels(3)
  },
  { 
    title: "Step Counting", 
    current: 0, 
    total: 9,
    icon: React.createElement(FaRuler, { className: "w-5 h-5" }),
    color: "#6ED1CF",
    levels: generateLevels(0)
  },
  { 
    title: "Fruit Matching Grid Game", 
    current: 0, 
    total: 9,
    icon: React.createElement(FaTh, { className: "w-5 h-5" }),
    color: "#FF8B8B",
    levels: generateLevels(0)
  },
  { 
    title: "Grid-based Coloring", 
    current: 0, 
    total: 9,
    icon: React.createElement(FaPalette, { className: "w-5 h-5" }),
    color: "#FFD700",
    levels: generateLevels(0)
  },
];

