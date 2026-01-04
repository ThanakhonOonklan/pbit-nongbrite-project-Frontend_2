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

/**
 * Image configuration for game cards
 */
export interface GameImageConfig {
  src: string;
  alt: string;
  width?: number | ((isMobile: boolean, isTablet: boolean) => number);
  height?: number | ((isMobile: boolean, isTablet: boolean) => number);
  position: string; // e.g., "left-[20px]", "-top-[-308px]"
  rotation?: number;
}

/**
 * Game configuration interface
 */
export interface GameConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  headerColor: string; // hex color or "sky-blue"
  baseColor: string; // hex color for buttons
  image: GameImageConfig;
  image1?: GameImageConfig;
  image2?: GameImageConfig;
  image3?: GameImageConfig;
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
      position: "left-[20px] -top-[-308px]",
      rotation: 0,
    },
    image1: {
      src: "/images/Nong_brite/nong-brite-02.svg",
      alt: "Nong Brite",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: "left-[110px] -top-[-382px]",
      rotation: 0,
    },
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
      position: "left-[720px] -top-[-288px]",
      rotation: 0,
    },
    image1: {
      src: "/images/P_Minnie/minnie-05.svg",
      alt: "Minnie",
      width: (isMobile, isTablet) => (isMobile ? 50 : isTablet ? 65 : 80),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 57 : 71),
      position: "left-[50px] -top-[73px]",
      rotation: 0,
    },
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
      position: "left-[20px] -top-[-350px]",
      rotation: 0,
    },
    image1: {
      src: "/images/Nong_brite/nong-brite-05.svg",
      alt: "Coco",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: "left-[750px] -top-[-12px]",
      rotation: 180,
    },
  },
  {
    id: "sequencing",
    title: "Sequencing",
    icon: FaRecycle,
    headerColor: "#9956DE",
    baseColor: "#9956DE",
    image: {
      src: "/images/P_Momo/momo-03.svg",
      alt: "Momo",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 96 : isTablet ? 120 : 160),
      position: "left-[30px] -top-[-288px]",
      rotation: 0,
    },
    image1: {
      src: "",
      alt: "Nong Brite",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: "left-[110px] -top-[-360px]",
      rotation: 0,
    },
  },
  {
    id: "step-counting",
    title: "Step Counting",
    icon: FaRuler,
    headerColor: "#6ED1CF",
    baseColor: "#6ED1CF",
    image: {
      src: "/images/P_Bobo/bobo-05.svg",
      alt: "Bobo",
      width: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 85 : 110),
      height: (isMobile, isTablet) => (isMobile ? 78 : isTablet ? 95 : 123),
      position: "left-[30px] -top-[-324px]",
      rotation: 0,
    },
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
      height: (isMobile, isTablet) => (isMobile ? 72 : isTablet ? 90 : 120),
      position: "left-[530px] -top-[80px]",
      rotation: 0,
    },
    image1: {
      src: "/images/P_PingPing/pingping-05.svg",
      alt: "PingPing",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 72 : isTablet ? 90 : 120),
      position: "left-[710px] -top-[-350px]",
      rotation: 0,
    },
  },
  {
    id: "grid-based-coloring",
    title: "Grid-based Coloring",
    icon: FaPalette,
    headerColor: "#FFD700",
    baseColor: "#FFD700",
    image: {
      src: "/images/P_Bit/bit-05.svg",
      alt: "P'Bit mascot",
      width: (isMobile, isTablet) => (isMobile ? 70 : isTablet ? 85 : 110),
      height: (isMobile, isTablet) => (isMobile ? 83 : isTablet ? 100 : 130),
      position: "left-[10px] -top-[-320px]",
      rotation: 0,
    },
    image1: {
      src: "/images/Nong_brite/nong-brite-01.svg",
      alt: "Nong Brite",
      width: (isMobile, isTablet) => (isMobile ? 40 : isTablet ? 50 : 60),
      height: (isMobile, isTablet) => (isMobile ? 44 : isTablet ? 55 : 66),
      position: "left-[150px] -top-[-12px]",
      rotation: 180,
    },
    image2: {
      src: "/images/P_Momo/momo-03.svg",
      alt: "Momo",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 96 : isTablet ? 120 : 160),
      position: "left-[720px] -top-[-288px]",
      rotation: 0,
    },
    image3: {
      src: "/images/P_Minnie/minnie-04.svg",
      alt: "Coco",
      width: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      height: (isMobile, isTablet) => (isMobile ? 60 : isTablet ? 75 : 100),
      position: "left-[700px] -top-[100px]",
      rotation: 0,
    },
  },
];

