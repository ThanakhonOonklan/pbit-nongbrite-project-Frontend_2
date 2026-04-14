import * as React from "react";
import { Container } from "@/components/common/Container";
import { ProgressItem, LevelData } from "./ProgressItem";
import { cn } from "@/lib/utils";
import { useChapterStore } from "@/store/chapter.store";
import { useTranslations, useLocale } from "next-intl";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";
import type { Chapter, Level } from "@/services/chapter.service";

// Game config mapping (ต้อง match กับ orderIndex ของ chapters)
const GAME_CONFIG = [
  { icon: FaRoute, color: "#1CB0F6" },
  { icon: FaSquare, color: "#FB96BB" },
  { icon: FaLink, color: "#FFB356" },
  { icon: FaRecycle, color: "#9956DE" },
  { icon: FaRuler, color: "#6ED1CF" },
  { icon: FaTh, color: "#FF8B8B" },
  { icon: FaPalette, color: "#FFD700" },
];

export interface ProgressItemData {
  title: string;
  current: number;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  levels?: LevelData[];
}

// Helper function to convert Level to LevelData
const convertLevelToLevelData = (level: Level): LevelData => {
  // Handle case where earnedStars might be string or number
  const earnedStars = typeof level.earnedStars === 'string'
    ? parseInt(level.earnedStars, 10)
    : Number(level.earnedStars) || 0;
  
  // Handle case where isUnlocked might be string or boolean
  const isUnlocked = typeof level.isUnlocked === 'string'
    ? level.isUnlocked === 'true'
    : Boolean(level.isUnlocked);
  
  return {
    level: level.levelNo,
    stars: Math.min(Math.max(earnedStars, 0), 3), // Clamp between 0-3
    completed: isUnlocked && earnedStars > 0,
  };
};

// Helper function to convert Chapter to ProgressItemData
const convertChapterToProgressItem = (
  chapter: Chapter,
  gameConfig: { icon: React.ComponentType<{ className?: string }>; color: string },
  locale: string
): ProgressItemData => {
  const levels = chapter.levels.map(convertLevelToLevelData);
  const completedLevels = levels.filter(l => l.completed).length;
  
  return {
    title: locale === 'th' ? chapter.title.th : chapter.title.en,
    current: completedLevels,
    total: chapter.levels.length,
    icon: React.createElement(gameConfig.icon, { className: "w-5 h-5" }),
    color: gameConfig.color,
    levels: levels,
  };
};

export interface ProgressListProps {
  className?: string;
}

export const ProgressList: React.FC<ProgressListProps> = ({ className }) => {
  const chapters = useChapterStore((state) => state.chapters);
  const isLoading = useChapterStore((state) => state.isLoading);
  const locale = useLocale();
  const t = useTranslations("Profile.progress");
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  // Convert chapters to progress items
  const progressItems = React.useMemo(() => {
    if (!chapters || chapters.length === 0) {
      return [];
    }

    return chapters.map((chapter, index) => {
      const gameConfig = GAME_CONFIG[index] || GAME_CONFIG[0];
      return convertChapterToProgressItem(chapter, gameConfig, locale);
    });
  }, [chapters, locale]);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <Container
        className={cn(
          "p-3 sm:p-4 md:p-3 lg:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <div className="text-center py-8 text-gray-600">{t("loading")}</div>
      </Container>
    );
  }

  if (progressItems.length === 0) {
    return (
      <Container
        className={cn(
          "p-3 sm:p-4 md:p-3 lg:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <div className="text-center py-8 text-gray-600">{t("empty")}</div>
      </Container>
    );
  }

  return (
    <Container
      className={cn(
        "p-3 sm:p-4 md:p-3 lg:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Header */}
      <div className="w-full mb-4 border-b border-gray-200 pb-1">
        <h2 className="text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] leading-[28px] font-bold text-gray-800">
          {t("title")}
        </h2>
      </div>
      <div
        className="space-y-4 overflow-y-auto px-1.5 py-2 -mx-1 -my-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        style={{
          maxHeight: "369px",
        }}
      >
        {progressItems.map((item, index) => (
          <ProgressItem
            key={index}
            title={item.title}
            current={item.current}
            total={item.total}
            icon={item.icon}
            color={item.color}
            levels={item.levels}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </Container>
  );
};
