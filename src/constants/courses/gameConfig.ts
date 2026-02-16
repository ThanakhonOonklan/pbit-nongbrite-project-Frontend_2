import * as React from "react";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";

import { levelData } from "@/constants/levelData";

/**
 * Image configuration for game cards
 */
export interface GameImageConfig {
  src: string;
  alt: string;
  width?: number | ((isMobile: boolean, isTablet: boolean) => number);
  height?: number | ((isMobile: boolean, isTablet: boolean) => number);
  position: string | ((isMobile: boolean, isTablet: boolean) => string);
  rotation?: number;
}

/**
 * Level configuration for each game button
 * เมื่อเชื่อม API จริง — แก้แค่ที่ getDefaultLevels() หรือเปลี่ยนเป็น hook
 */
export interface LevelConfig {
  level: number;
  difficulty: number;       // 1=ง่าย, 2=ปานกลาง, 3=ยาก
  difficultyText: string;
  isLocked: boolean;
  stars: number;            // 0-3 ดาวที่ได้จากการเล่น
}

export const getDefaultLevels = (): LevelConfig[] => {
  const mockStars: Record<number, number> = {
    1: 3,
    2: 1,
    3: 3,
    4: 1,
    5: 1,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
  };

  return levelData.map((ld) => ({
    level: ld.level,
    difficulty: ld.difficulty,
    difficultyText: ld.difficultyText,
    // ด่าน 1 เปิดเสมอ, ด่านถัดไปเปิดเมื่อด่านก่อนหน้าได้ดาว > 0
    isLocked: ld.level === 1 ? false : (mockStars[ld.level - 1] ?? 0) === 0,
    stars: mockStars[ld.level] ?? 0,
  }));
};

/**
 * Game configuration interface
 */
export interface GameConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  headerColor: string;
  baseColor: string;
  image: GameImageConfig;
  image1?: GameImageConfig;
  image2?: GameImageConfig;
  image3?: GameImageConfig;
  levels: LevelConfig[];
}

/**
 * Games configuration array
 */
export const gamesConfig: GameConfig[] = [
  {
    id: "path-navigation",
    title: "Path Navigation",
    icon: FaRoute,
    headerColor: "sky-blue",
    baseColor: "#1CB0F6",
    image: {
      src: "/images/P_Bit/bit-01.svg",
      alt: "P'Bit mascot",
      width: (isMobile, isTablet) => (isMobile ? 80 : isTablet ? 100 : 140),
      height: (isMobile, isTablet) => (isMobile ? 80 : isTablet ? 100 : 140),
      position: (isMobile, isTablet) => isMobile ? "left-[-10px] top-[292px]" : isTablet ? "left-[-10px] top-[285px]" : "left-[-10px] top-[296px]",
      rotation: 0,
    },
    image1: {
      src: "/images/Nong_brite/nong-brite-02.svg",
      alt: "Nong Brite",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: (isMobile, isTablet) => isMobile ? "left-[40px] bottom-[-12px]" : isTablet ? "left-[60px] bottom-[-25px]" : "left-[80px] bottom-[-32px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "counting-classification",
    title: "Counting & Classification",
    icon: FaSquare,
    headerColor: "#FB96BB",
    baseColor: "#FB96BB",
    image: {
      src: "/images/P_Minnie/minnie-01.svg",
      alt: "Minnie",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 96 : isTablet ? 120 : 160),
      position: (isMobile, isTablet) => isMobile ? "right-[20px] bottom-[-12px]" : isTablet ? "right-[20px] bottom-[-24px]" : "right-[20px] bottom-[-32px]",
      rotation: 0,
    },
    image1: {
      src: "/images/P_Minnie/minnie-05.svg",
      alt: "Minnie",
      width: (isMobile, isTablet) => (isMobile ? 50 : isTablet ? 65 : 80),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 57 : 71),
      position: (isMobile, isTablet) => isMobile ? "left-[140px] top-[-81px]" : isTablet ? "left-[20px] top-[-99.8px]" : "left-[20px] top-[-122px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "conditional-matching",
    title: "Conditional Matching",
    icon: FaLink,
    headerColor: "#FFB356",
    baseColor: "#FFB356",
    image: {
      src: "/images/P_Coco/coco-03.svg",
      alt: "Coco",
      width: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 85 : 110),
      height: (isMobile, isTablet) => (isMobile ? 62 : isTablet ? 75 : 98),
      position: (isMobile, isTablet) => isMobile ? "left-[0px] bottom-[-12px]" : isTablet ? "left-[0px] bottom-[-24px]" : "left-[0px] bottom-[-33px]",
      rotation: 0,
    },
    image1: {
      src: "/images/P_Coco/coco-01.svg",
      alt: "Coco",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 70 : 80),
      height: (isMobile, isTablet) => (isMobile ? 66 : isTablet ? 77 : 88),
      position: (isMobile, isTablet) => isMobile ? "right-[130px] top-[-100px]" : isTablet ? "right-[300px] top-[-125px]" : "right-[280px] top-[-150px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "sequencing",
    title: "Sequencing",
    icon: FaRecycle,
    headerColor: "#9956DE",
    baseColor: "#9956DE",
    image: {
      src: "/images/P_Momo/momo-02.svg",
      alt: "Momo",
      width: (isMobile, isTablet) => (isMobile ? 80 : isTablet ? 100 : 130),
      height: (isMobile, isTablet) => (isMobile ? 128 : isTablet ? 160 : 200),
      position: (isMobile, isTablet) => isMobile ? "left-[0px] bottom-[-45px]" : isTablet ? "left-[0px] bottom-[-60px]" : "left-[0px] bottom-[-80px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "step-counting",
    title: "Step Counting",
    icon: FaRuler,
    headerColor: "#6ED1CF",
    baseColor: "#6ED1CF",
    image: {
      src: "/images/P_Bobo/bobo-01.svg",
      alt: "Bobo",
      width: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 85 : 110),
      height: (isMobile, isTablet) => (isMobile ? 78 : isTablet ? 95 : 123),
      position: (isMobile, isTablet) => isMobile ? "left-[10px] bottom-[-12px]" : isTablet ? "left-[10px] bottom-[-24px]" : "left-[10px] bottom-[-32px]",
      rotation: 0,
    },
    image1: {
      src: "/images/P_Bobo/bobo-05.svg",
      alt: "Coco",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 70 : 80),
      height: (isMobile, isTablet) => (isMobile ? 66 : isTablet ? 77 : 88),
      position: (isMobile, isTablet) => isMobile ? "right-[30px] top-[-60px]" : isTablet ? "right-[160px] top-[-90px]" : "right-[130px] top-[-100px]",
      rotation: 49,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "fruit-matching-grid",
    title: "Fruit Matching Grid Game",
    icon: FaTh,
    headerColor: "#FF8B8B",
    baseColor: "#FF8B8B",
    image: {
      src: "/images/P_PingPing/pingping-05.svg",
      alt: "PingPing",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 80 : 90),
      position: (isMobile, isTablet) => isMobile ? "left-[140px] top-[-30px]" : isTablet ? "left-[300px] top-[-40px]" : "left-[300px] top-[-40px]",
      rotation: 180,
    },
    image1: {
      src: "/images/P_PingPing/pingping-01.svg",
      alt: "PingPing",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 80),
      height: (isMobile, isTablet) => (isMobile ? 72 : isTablet ? 90 : 100),
      position: (isMobile, isTablet) => isMobile ? "left-[10px] bottom-[-12px]" : isTablet ? "left-[10px] bottom-[-24px]" : "left-[10px] bottom-[-32px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
  {
    id: "grid-based-coloring",
    title: "Grid-based Coloring",
    icon: FaPalette,
    headerColor: "#AACE30",
    baseColor: "#AACE30",
    image: {
      src: "/images/Nong_brite/nong-brite-06.svg",
      alt: "P'Bit mascot",
      width: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 85 : 90),
      height: (isMobile, isTablet) => (isMobile ? 83 : isTablet ? 100 : 115),
      position: (isMobile, isTablet) => isMobile ? "left-[10px] bottom-[-12px]" : isTablet ? "left-[10px] bottom-[-24px]" : "left-[10px] bottom-[-32px]",
      rotation: 0,
    },
    image1: {
      src: "/images/Nong_brite/nong-brite-05.svg",
      alt: "Nong Brite",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: (isMobile, isTablet) => isMobile ? "right-[5px] top-[-68px]" : isTablet ? "right-[15px] top-[-97px]" : "right-[20px] top-[-117px]",
      rotation: 0,
    },
    levels: getDefaultLevels(),
  },
];
