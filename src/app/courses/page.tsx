"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CourseRightPanel } from "@/components/courses/CourseRightPanel";
import { BackgroundSquaresWithColor } from "@/components/common/BackgroundSquaresWithColor";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  StarGameButton,
  ScrollStack,
  ScrollStackItem,
  PrimaryButton,
} from "@/components/common";
import type { GameButtonStatus } from "@/components/common/StarGameButton";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";
import { useChapterStore } from "@/store/chapter.store";
import { useAuthStore } from "@/store/auth.store";
import type { Level } from "@/services/chapter.service";

// Game configuration mapping
const GAME_CONFIG = [
  {
    id: "path-navigation",
    title: { en: "Path Navigation", th: "เกมการนำทาง" },
    icon: FaRoute,
    color: "#1CB0F6",
    imageSrc: "/images/P_Bit/bit-01.svg",
    image1Src: "/images/Nong_brite/nong-brite-02.svg",
  },
  {
    id: "counting-classification",
    title: { en: "Counting & Classification", th: "นับและจัดหมวดหมู่" },
    icon: FaSquare,
    color: "#FB96BB",
    imageSrc: "/images/P_Minnie/minnie-01.svg",
    image1Src: "/images/P_Minnie/minnie-05.svg",
  },
  {
    id: "conditional-matching",
    title: { en: "Conditional Matching", th: "การจับคู่แบบมีเงื่อนไข" },
    icon: FaLink,
    color: "#FFB356",
    imageSrc: "/images/P_Coco/coco-03.svg",
    image1Src: "/images/Nong_brite/nong-brite-05.svg",
  },
  {
    id: "sequencing",
    title: { en: "Sequencing", th: "การเรียงลำดับ" },
    icon: FaRecycle,
    color: "#9956DE",
    imageSrc: "/images/P_Momo/momo-03.svg",
    image1Src: "",
  },
  {
    id: "step-counting",
    title: { en: "Step Counting", th: "นับขั้นตอน" },
    icon: FaRuler,
    color: "#6ED1CF",
    imageSrc: "/images/P_Bobo/bobo-05.svg",
    image1Src: "",
  },
  {
    id: "fruit-matching-grid",
    title: { en: "Fruit Matching Grid Game", th: "เกมจับคู่ผลไม้" },
    icon: FaTh,
    color: "#FF8B8B",
    imageSrc: "/images/P_PingPing/pingping-05.svg",
    image1Src: "/images/P_PingPing/pingping-05.svg",
  },
  {
    id: "grid-based-coloring",
    title: { en: "Grid-based Coloring", th: "ระบายสีตามตาราง" },
    icon: FaPalette,
    color: "#FFD700",
    imageSrc: "/images/P_Bit/bit-05.svg",
    image1Src: "/images/Nong_brite/nong-brite-01.svg",
  },
];

// Helper function to determine button status based on isUnlocked and earnedStars
const getButtonStatus = (level: Level): GameButtonStatus => {
  // Handle case where isUnlocked might be a string "true"/"false" instead of boolean
  const isUnlocked = typeof level.isUnlocked === 'string' 
    ? level.isUnlocked === 'true' 
    : Boolean(level.isUnlocked);
  
  // Handle case where earnedStars might be undefined, string, or number
  const earnedStars = level.earnedStars !== undefined && level.earnedStars !== null
    ? (typeof level.earnedStars === 'string'
        ? parseInt(level.earnedStars, 10)
        : Number(level.earnedStars))
    : 0;
  
  if (!isUnlocked) {
    return "locked";
  }
  // If unlocked and has earned stars, it's completed
  if (earnedStars > 0) {
    return "completed";
  }
  // If unlocked but no stars, it's available
  return "available";
};

// Helper function to get stars for completed levels
const getStarsForLevel = (level: Level): number => {
  // Handle case where earnedStars might be undefined, string, or number
  if (level.earnedStars === undefined || level.earnedStars === null) {
    return 0;
  }
  
  const earnedStars = typeof level.earnedStars === 'string'
    ? parseInt(level.earnedStars, 10)
    : Number(level.earnedStars);
  
  return isNaN(earnedStars) ? 0 : earnedStars;
};

// Component for custom tooltip content for completed levels
const CompletedTooltipContent: React.FC<{ level: Level; gameId: string }> = ({ level, gameId }) => {
  const router = useRouter();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayAgain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    router.push(`/games/${gameId}/${level.number}`);
  };

  const levelTitle = language === 'TH' ? level.title.th : level.title.en;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">
        {levelTitle}
      </h3>
      <p className="text-sm text-gray-600">
        คุณได้ผ่านด่านนี้แล้ว สามารถเล่นอีกครั้งเพื่อปรับปรุงคะแนน
      </p>
      <PrimaryButton
        className="w-full py-1.5 px-3 text-sm pointer-events-auto"
        variant="default"
        size="sm"
        onClick={handlePlayAgain}
        disabled={isLoading}
      >
        {isLoading ? "กำลังโหลด..." : "เล่นอีกครั้ง"}
      </PrimaryButton>
    </div>
  );
};

// Helper function to lighten a color
const lightenColor = (color: string, percent: number = 50): string => {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const R = (num >> 16) & 255;
  const G = (num >> 8) & 255;
  const B = num & 255;
  const factor = percent / 100;
  const newR = Math.round(R + (255 - R) * factor);
  const newG = Math.round(G + (255 - G) * factor);
  const newB = Math.round(B + (255 - B) * factor);
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export default function CoursesPage() {
  const selectedLevel = 1;
  const levelData = getLevelData(selectedLevel);
  const scrollStackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { language } = useLanguage();
  
  // Use chapter store
  const { chapters, isLoading, error, fetchChapters, clearError } = useChapterStore();
  
  // Debug: Log chapters from store
  console.log("Chapters from store:", {
    chaptersLength: chapters.length,
    chapters: chapters,
    firstChapter: chapters[0],
    firstLevel: chapters[0]?.levels?.[0],
    chaptersIds: chapters.map(ch => ({ id: ch.id, orderIndex: ch.orderIndex })),
    firstChapterLevelsIds: chapters[0]?.levels?.map(l => ({ id: l.id, number: l.number }))
  });
  
  // Use auth store to check authentication
  const { isAuthenticated } = useAuthStore();
  
  // Use context to track current header color
  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  const [currentGameTitle, setCurrentGameTitle] = useState<string>("Path Navigation");
  const [currentGameIconIndex, setCurrentGameIconIndex] = useState<number>(0);
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Screen size check - must be called before any early returns
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch chapters on mount (always fetch for realtime data)
  useEffect(() => {
    console.log("Fetch chapters useEffect:", {
      isAuthenticated,
      shouldFetch: isAuthenticated
    });
    
    if (isAuthenticated) {
      console.log("Calling fetchChapters for realtime data...");
      fetchChapters();
    } else {
      console.log("Skipping fetchChapters - not authenticated");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Callback when section changes - use useCallback to ensure stable reference
  // MUST be called before any early returns (useCallback is a hook)
  const handleSectionChange = useCallback((index: number, headerColor?: string) => {
    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      const defaultConfig = GAME_CONFIG[0];
      const defaultTitle = language === 'TH' ? defaultConfig.title.th : defaultConfig.title.en;
      setCurrentGameTitle(defaultTitle);
      setCurrentGameIconIndex(0);
      return;
    }
    
    if (index >= 0 && index < chapters.length && index < GAME_CONFIG.length) {
      const config = GAME_CONFIG[index];
      const title = language === 'TH' ? config.title.th : config.title.en;
      setCurrentGameTitle(title);
      setCurrentGameIconIndex(index);
    }
    
    let colorToUse = headerColor;
    if (headerColor === "sky-blue") {
      colorToUse = "#1CB0F6";
    }
    setCurrentHeaderColor(colorToUse);
    const lightenedColor = colorToUse ? lightenColor(colorToUse, 60) : undefined;
    setHeaderColor(lightenedColor);
  }, [language, chapters.length, setHeaderColor]);

  // Don't render anything if not authenticated (after all hooks)
  if (!isAuthenticated) {
    return null;
  }

  // Calculate responsive values for ScrollStack
  const itemDistance = isMobile ? 600 : isTablet ? 700 : 800;
  const stackPosition = isMobile ? "10%" : isTablet ? "12%" : "15%";
  
  // Helper functions for responsive values
  const getWidthClassName = () => {
    if (isMobile) {
      return "max-w-[850px] w-full mx-2 rounded-[20px] p-1.5 border-[2px] border-[#DB9148]";
    } else if (isTablet) {
      return "max-w-[850px] w-full mx-4 rounded-[25px] p-2 border-[2.5px] border-[#DB9148]";
    }
    return "max-w-[850px] rounded-[30px] p-2 border-[3px] border-[#DB9148]";
  };
  
  const getHeightClassName = () => {
    if (isMobile) {
      return "min-h-[280px]";
    } else if (isTablet) {
      return "min-h-[320px]";
    }
    return "min-h-[350px]";
  };
  
  const getImageSize = () => {
    if (isMobile) return 80;
    if (isTablet) return 100;
    return 140;
  };
  
  const getImage1Size = () => {
    if (isMobile) return 40;
    if (isTablet) return 50;
    return 60;
  };
  
  const getImagePosition = (baseLeft: string, baseTop: string) => {
    const leftMatch = baseLeft.match(/\[(\d+)px\]/);
    const topMatch = baseTop.match(/\[-?(\d+)px\]/);
    
    if (!leftMatch || !topMatch) {
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
  
  // Get game config for chapter index
  const getGameConfig = (index: number) => {
    return GAME_CONFIG[index] || GAME_CONFIG[0];
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700">กำลังโหลด...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600 mb-4">{error}</div>
          <PrimaryButton onClick={() => { clearError(); fetchChapters(); }}>
            ลองอีกครั้ง
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700">ไม่มีข้อมูลบทเรียน</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen ">
      <BackgroundSquaresWithColor />
      <Sidebar />

      <main className="flex-1 relative overflow-hidden" ref={scrollStackRef}>
        <div className="pt-[4px] h-full pb-[70px] lg:pb-0">
          <ScrollStack
            className="w-full h-full"
            itemDistance={itemDistance}
            itemStackDistance={0}
            stackPosition={stackPosition}
            baseScale={1}
            itemScale={0.001}
            useWindowScroll={false}
            onSectionChange={handleSectionChange}
          >
            {chapters.map((chapter, chapterIndex) => {
              const gameConfig = getGameConfig(chapterIndex);
              const GameIcon = gameConfig.icon;
              const chapterTitle = language === 'TH' ? chapter.title.th : chapter.title.en;
              
              return (
                <ScrollStackItem
                  key={chapter.id}
                  useOuterContainer={true}
                  itemClassName="scroll-stack-card"
                  outerContainerProps={{
                    widthClassName: getWidthClassName(),
                    heightClassName: getHeightClassName(),
                    headerText: (
                      <span className="flex items-center gap-2">
                        <GameIcon className="w-5 h-5" />
                        {chapterTitle}
                      </span>
                    ),
                    headerColor: gameConfig.color,
                    imageSrc: gameConfig.imageSrc,
                    imageAlt: chapterTitle,
                    imageWidth: getImageSize(),
                    imageHeight: getImageSize(),
                    imagePosition: getImagePosition("left-[20px]", "-top-[-308px]"),
                    imageRotation: 0,
                    image1Src: gameConfig.image1Src,
                    image1Alt: chapterTitle,
                    image1Width: getImage1Size(),
                    image1Height: isMobile ? 44 : isTablet ? 55 : 66,
                    image1Position: getImagePosition("left-[110px]", "-top-[-382px]"),
                    image1Rotation: 0,
                  }}
                >
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6 w-full h-full items-center justify-center">
                    {chapter.levels.map((level) => {
                      const status = getButtonStatus(level);
                      // Always get stars from level, not just for completed status
                      const stars = getStarsForLevel(level);
                      
                      return (
                        <div
                          key={level.id}
                          className="flex items-center justify-center"
                        >
                          <StarGameButton 
                            level={level.number} 
                            status={status}
                            baseColor={gameConfig.color}
                            stars={stars}
                            tooltipContent={
                              status === "completed"
                                ? <CompletedTooltipContent level={level} gameId={gameConfig.id} />
                                : undefined
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </main>

      <div className="hidden lg:block">
        <CourseRightPanel
          levelTitle={levelData?.title || "Level 1: Splitting Parts"}
          difficulty={levelData?.difficulty || 1}
          difficultyText={levelData?.difficultyText || "ง่าย"}
          gameTitle={currentGameTitle}
          gameIcon={GAME_CONFIG[currentGameIconIndex]?.icon}
          headerColor={currentHeaderColor}
        />
      </div>
    </div>
  );
}
