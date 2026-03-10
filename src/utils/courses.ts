import type { CarouselItem } from "@/components/courses/CourseCarousel";

/**
 * Color mapping for header color variants
 */
const HEADER_COLOR_MAP: Record<string, string> = {
  "sky-blue": "#1CB0F6",
};

/**
 * Convert header color variant to hex color
 * @param headerColor - Header color (variant name or hex color)
 * @returns Hex color string or undefined
 */
export const convertHeaderColorToHex = (headerColor?: string): string | undefined => {
  if (!headerColor) return undefined;
  
  // Check if it's a variant name
  if (HEADER_COLOR_MAP[headerColor]) {
    return HEADER_COLOR_MAP[headerColor];
  }
  
  // Return as-is if it's already a hex color
  return headerColor;
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
 * Mapping between gameId and icon profile name
 * Map gameId ไปยัง icon profile name สำหรับใช้ใน Carousel
 */
const GAME_ICON_MAP: Record<string, string> = {
  "path-navigation": "icon_P_Bit",
  "counting-classification": "icon_P_Minnie",
  "conditional-matching": "icon_P_Coco",
  "sequencing": "icon_P_Momo",
  "step-counting": "icon_P_Bobo",
  "fruit-matching-grid": "icon_P_Pingping",
  "grid-based-coloring": "icon_Nong_Brite",
};

/**
 * Helper function to generate carousel items for a specific game
 * สร้าง carousel items ตาม gameId โดยใช้ icon-Profile
 */
export const getCarouselItemsForGame = (gameId: string): CarouselItem[] => {
  // หา icon name จาก mapping
  const iconName = GAME_ICON_MAP[gameId];
  
  // ใช้ icon path จาก mapping
  const iconPath = `/icons/icon-Profile/${iconName}.png`;
  
  // สร้าง 4 items ต่อเกม โดยใช้ icon เดียวกันทั้ง 4 รูป
  return Array.from({ length: 4 }, (_, index) => ({
    id: `${gameId}-${index + 1}`,
    imageSrc: iconPath,
    imageAlt: `${iconName} carousel image ${index + 1} for ${gameId}`,
  }));
};

