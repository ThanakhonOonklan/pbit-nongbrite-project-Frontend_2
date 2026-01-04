import { useState, useEffect } from "react";
import type { GameButtonStatus } from "@/components/common/StarGameButton";

/**
 * Custom hook for responsive breakpoints
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile, isTablet };
};

/**
 * Helper function to determine button status and stars
 * ด่าน 1-3: completed (มีดาว), ด่าน 4: available (สีตามเกม), ด่าน 5-9: locked
 */
export const getButtonStatus = (levelNumber: number): GameButtonStatus => {
  if (levelNumber <= 3) {
    return "completed"; // ด่าน 1-3: เล่นผ่านแล้ว (สีทอง)
  } else if (levelNumber === 4) {
    return "available"; // ด่าน 4: ยังไม่ได้เล่น (สีตามเกม) - มีเพียงอันเดียว
  } else {
    return "locked"; // ด่าน 5-9: ล็อค (สีเทา)
  }
};

/**
 * Helper function to get stars for completed levels (mock data)
 */
export const getStarsForLevel = (levelNumber: number): number => {
  // Mock: ด่าน 1 ได้ 3 ดาว, ด่าน 2 ได้ 2 ดาว, ด่าน 3 ได้ 1 ดาว
  if (levelNumber === 1) return 3;
  if (levelNumber === 2) return 2;
  if (levelNumber === 3) return 1;
  return 0;
};

/**
 * Helper function to lighten a color (make it lighter/pastel)
 */
export const lightenColor = (color: string, percent: number = 50): string => {
  // Remove # if present
  const hex = color.replace("#", "");

  // Parse RGB
  const num = parseInt(hex, 16);
  const R = (num >> 16) & 255;
  const G = (num >> 8) & 255;
  const B = num & 255;

  // Lighten by blending with white
  // percent = 0 means no change, percent = 100 means pure white
  const factor = percent / 100;
  const newR = Math.round(R + (255 - R) * factor);
  const newG = Math.round(G + (255 - G) * factor);
  const newB = Math.round(B + (255 - B) * factor);

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

/**
 * Helper function to get width className based on screen size
 */
export const getWidthClassName = (isMobile: boolean, isTablet: boolean): string => {
  if (isMobile) {
    return "max-w-[850px] w-full mx-2 rounded-[20px] p-1.5 border-[2px] border-[#DB9148]";
  } else if (isTablet) {
    return "max-w-[850px] w-full mx-4 rounded-[25px] p-2 border-[2.5px] border-[#DB9148]";
  }
  return "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]";
};

/**
 * Helper function to get height className based on screen size
 */
export const getHeightClassName = (isMobile: boolean, isTablet: boolean): string => {
  if (isMobile) {
    return "min-h-[280px]";
  } else if (isTablet) {
    return "min-h-[320px]";
  }
  return "min-h-[350px]";
};

/**
 * Helper function to get image size based on screen size
 */
export const getImageSize = (isMobile: boolean, isTablet: boolean): number => {
  if (isMobile) return 80;
  if (isTablet) return 100;
  return 140;
};

/**
 * Helper function to get image position with responsive adjustments
 */
export const getImagePosition = (
  baseLeft: string,
  baseTop: string,
  isMobile: boolean,
  isTablet: boolean
): string => {
  // Extract numeric values from strings like "left-[20px]" and "-top-[-308px]"
  const leftMatch = baseLeft.match(/\[(\d+)px\]/);
  const topMatch = baseTop.match(/\[-?(\d+)px\]/);

  if (!leftMatch || !topMatch) {
    // Fallback to original if parsing fails
    return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]`;
  }

  const baseLeftValue = parseInt(leftMatch[1]);
  const baseTopValue = parseInt(topMatch[1]);

  if (isMobile) {
    const left = Math.round(baseLeftValue * 0.5);
    const top = Math.round(baseTopValue * 0.65);
    return `absolute left-[${left}px] -top-[-${top}px] z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]`;
  } else if (isTablet) {
    const left = Math.round(baseLeftValue * 0.7);
    const top = Math.round(baseTopValue * 0.8);
    return `absolute left-[${left}px] -top-[-${top}px] z-20 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]`;
  }
  return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]`;
};

