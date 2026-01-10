import { useState, useEffect } from "react";
import type { GameButtonStatus } from "@/components/common/StarGameButton";
import type { GameConfig } from "@/constants/courses/gameConfig";
import type { OuterContainerProps } from "@/components/common/OuterContainer";

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
 * Helper function to get image position - ใช้ตำแหน่งที่กำหนดไว้ใน gameConfig โดยตรง
 */
export const getImagePosition = (
  baseLeft: string,
  baseTop: string,
  isMobile: boolean,
  isTablet: boolean
): string => {
  // ใช้ตำแหน่งที่กำหนดไว้ใน gameConfig โดยตรง ไม่ต้องคำนวณใหม่
  // เพิ่ม drop-shadow ตามขนาดหน้าจอ
  if (isMobile) {
    return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]`;
  } else if (isTablet) {
    return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]`;
  }
  return `absolute ${baseLeft} ${baseTop} z-20 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]`;
};

/**
 * Helper function to parse position string to inline style object
 * แปลง position string จาก gameConfig เป็น inline style object
 */
export const parsePositionToStyle = (position: string): React.CSSProperties => {
  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
  };

  const transforms: string[] = [];

  // Parse left value: "left-[20px]" -> left: "20px"
  const leftMatch = position.match(/left-\[(\d+)px\]/);
  if (leftMatch) {
    style.left = `${leftMatch[1]}px`;
  }

  // Parse left-[50%] for center positioning
  const leftPercentMatch = position.match(/left-\[50%\]/);
  if (leftPercentMatch) {
    style.left = "50%";
    transforms.push("translateX(-50%)");
  }

  // Parse right value: "right-[20px]" -> right: "20px"
  const rightMatch = position.match(/right-\[(\d+)px\]/);
  if (rightMatch) {
    style.right = `${rightMatch[1]}px`;
  }

  // Parse top value: "top-[20px]" or "-top-[-20px]" -> top: "20px" or top: "-20px"
  const topMatch = position.match(/-?top-\[-?(\d+)px\]/);
  if (topMatch) {
    const isNegative = position.includes("-top-[-");
    style.top = isNegative ? `-${topMatch[1]}px` : `${topMatch[1]}px`;
  }

  // Parse bottom value: "bottom-[20px]" -> bottom: "20px"
  const bottomMatch = position.match(/bottom-\[(\d+)px\]/);
  if (bottomMatch) {
    style.bottom = `${bottomMatch[1]}px`;
  }

  // Combine transforms if any
  if (transforms.length > 0) {
    style.transform = transforms.join(" ");
  }

  return style;
};

/**
 * Helper function to get drop-shadow className based on screen size
 * สร้าง drop-shadow className ตามขนาดหน้าจอ
 */
const getDropShadowClassName = (isMobile: boolean, isTablet: boolean): string => {
  if (isMobile) {
    return "drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]";
  } else if (isTablet) {
    return "drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]";
  }
  return "drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]";
};

/**
 * Helper function to calculate image dimensions
 * คำนวณขนาดรูปภาพตามหน้าจอ (responsive)
 */
const getImageDimensions = (
  imageConfig: { width?: number | ((isMobile: boolean, isTablet: boolean) => number); height?: number | ((isMobile: boolean, isTablet: boolean) => number) },
  isMobile: boolean,
  isTablet: boolean
): { width: number; height: number } => {
  const width =
    typeof imageConfig.width === "function"
      ? imageConfig.width(isMobile, isTablet)
      : imageConfig.width || getImageSize(isMobile, isTablet);
  const height =
    typeof imageConfig.height === "function"
      ? imageConfig.height(isMobile, isTablet)
      : imageConfig.height || width;
  return { width, height };
};

/**
 * Helper function to process game images from gameConfig
 * ประมวลผลรูปภาพทั้งหมดจาก gameConfig และส่งคืน props ที่พร้อมใช้งาน
 */
export const processGameImages = (
  game: GameConfig,
  isMobile: boolean,
  isTablet: boolean
): Partial<OuterContainerProps> => {
  const props: Partial<OuterContainerProps> = {};

  // Process main image
  if (game.image) {
    const dims = getImageDimensions(game.image, isMobile, isTablet);
    props.imageSrc = game.image.src;
    props.imageAlt = game.image.alt;
    props.imageWidth = dims.width;
    props.imageHeight = dims.height;
    props.imageStyle = parsePositionToStyle(game.image.position);
    props.imageClassName = getDropShadowClassName(isMobile, isTablet);
    props.imageRotation = game.image.rotation || 0;
  }

  // Process image1
  if (game.image1) {
    const dims = getImageDimensions(game.image1, isMobile, isTablet);
    props.image1Src = game.image1.src;
    props.image1Alt = game.image1.alt;
    props.image1Width = dims.width;
    props.image1Height = dims.height;
    props.image1Style = parsePositionToStyle(game.image1.position);
    props.image1ClassName = getDropShadowClassName(isMobile, isTablet);
    props.image1Rotation = game.image1.rotation || 0;
  }

  // Process image2
  if (game.image2) {
    const dims = getImageDimensions(game.image2, isMobile, isTablet);
    props.image2Src = game.image2.src;
    props.image2Alt = game.image2.alt;
    props.image2Width = dims.width;
    props.image2Height = dims.height;
    props.image2Style = parsePositionToStyle(game.image2.position);
    props.image2ClassName = getDropShadowClassName(isMobile, isTablet);
    props.image2Rotation = game.image2.rotation || 0;
  }

  // Process image3
  if (game.image3) {
    const dims = getImageDimensions(game.image3, isMobile, isTablet);
    props.image3Src = game.image3.src;
    props.image3Alt = game.image3.alt;
    props.image3Width = dims.width;
    props.image3Height = dims.height;
    props.image3Style = parsePositionToStyle(game.image3.position);
    props.image3ClassName = getDropShadowClassName(isMobile, isTablet);
    props.image3Rotation = game.image3.rotation || 0;
  }

  return props;
};

