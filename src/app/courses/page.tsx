"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useState, useRef, useEffect, lazy, Suspense, useMemo, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CourseRightPanel = lazy(() => import("@/components/courses/CourseRightPanel").then(module => ({ default: module.CourseRightPanel })));
const BackgroundSquaresWithColor = lazy(() => import("@/components/common/BackgroundSquaresWithColor").then(module => ({ default: module.BackgroundSquaresWithColor })));
import { getLevelData } from "@/constants/levelData";
import { useHeaderColor } from "@/contexts/HeaderColorContext";
import { ScrollStack, BackgroundSquares } from "@/components/common";
import type { ScrollStackRef } from "@/components/common";
import { GameCard } from "@/components/courses/GameCard";
import { GameStepper } from "@/components/courses/GameStepper";
import { ResourceBars } from "@/components/courses/ResourceBars";
import { ScrollDownIndicator } from "@/components/courses/ScrollDownIndicator";
import { gamesConfig, mapApiLevelToConfig } from "@/constants/courses/gameConfig";
import { convertHeaderColorToHex, lightenColor } from "@/utils/courses";
import { mockMyRankData } from "@/constants/mocks/userData";
import { useChapterStore } from "@/store/chapter.store";
import { useUserStore } from "@/store/user.store";

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const levelData = getLevelData(selectedLevel);

  const { setHeaderColor } = useHeaderColor();
  const [currentHeaderColor, setCurrentHeaderColor] = useState<string | undefined>(undefined);
  const [currentGameTitle, setCurrentGameTitle] = useState<string>(
    gamesConfig[0]?.title
  );
  const [currentGameIconIndex, setCurrentGameIconIndex] = useState<number>(0);
  const [currentGameId, setCurrentGameId] = useState<string | undefined>(gamesConfig[0]?.id);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialCallRef = useRef(true);

  const scrollStackRef = useRef<ScrollStackRef>(null);

  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  const chapters = useChapterStore((state) => state.chapters);
  const fetchChapters = useChapterStore((state) => state.fetchChapters);
  // use user store global state
  const user = useUserStore((state) => state.user);
  const lifeDetails = useUserStore((state) => state.lifeDetails);
  const streakDetails = useUserStore((state) => state.streakDetails);
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const fetchLifeDetails = useUserStore((state) => state.fetchLifeDetails);
  const fetchAndUpdateStreak = useUserStore((state) => state.fetchAndUpdateStreak);

  const displayHeartCount = lifeDetails?.current ?? 0;
  const displayMaxHeartCount = lifeDetails?.max ?? 5;
  const displayLastResetAt = lifeDetails?.lastResetAt;
  const displayScoreCount = user?.stats?.totalScore ?? 0;
  const displayFireCount = streakDetails?.current ?? user?.streaks?.current ?? 0;

  useEffect(() => {
    fetchChapters();
    fetchProfile();
    fetchLifeDetails();
    fetchAndUpdateStreak();
  }, [fetchChapters, fetchProfile, fetchLifeDetails, fetchAndUpdateStreak]);

  // Merge API data with visual game config
  const mergedGames = useMemo(() => {
    if (!chapters.length) return gamesConfig;
    return gamesConfig.map((game, index) => {
      const apiChapter = chapters[index];
      if (!apiChapter) return game;
      return {
        ...game,
        levels: apiChapter.levels.map(mapApiLevelToConfig),
      };
    });
  }, [chapters]);

  // Fix #3: Keep mergedGames in a ref so handleSectionChange can read the latest
  // value without having mergedGames in its useCallback dependency array
  const mergedGamesRef = useRef(mergedGames);
  useEffect(() => {
    mergedGamesRef.current = mergedGames;
  }, [mergedGames]);

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 640 && width < 1024);
    };

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkTablet, 100);
    };

    checkTablet();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const handleSectionChange = useCallback((index: number, headerColor?: string) => {

    if (isInitialCallRef.current) {
      isInitialCallRef.current = false;
    } else {
      setShowScrollIndicator(false);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setShowScrollIndicator(true);
      }, 3000);
    }

    if (index === -1) {
      setCurrentHeaderColor(undefined);
      setHeaderColor(undefined);
      // Fix #3: Read from ref — no stale closure, no mergedGames dependency
      setCurrentGameTitle(mergedGamesRef.current[0]?.title);
      setCurrentGameIconIndex(0);
      setCurrentGameId(mergedGamesRef.current[0]?.id);
      setCurrentGameIndex(0);
      setSelectedLevel(1);
      return;
    }

    if (index >= 0 && index < mergedGamesRef.current.length) {
      const game = mergedGamesRef.current[index];
      if (!game) return;
      setCurrentGameTitle(game.title);
      setCurrentGameIconIndex(index);
      setCurrentGameId(game.id);
      setCurrentGameIndex(index);
      setSelectedLevel(1);

      const colorToUse = convertHeaderColorToHex(headerColor);
      setCurrentHeaderColor(colorToUse);

      const lightenedColor = colorToUse ? lightenColor(colorToUse, 60) : undefined;
      setHeaderColor(lightenedColor);
    }
  // Fix #3: mergedGames removed — read via mergedGamesRef instead
  }, [setHeaderColor]);

  const handleStepClick = (index: number) => {
    if (scrollStackRef.current) {
      scrollStackRef.current.scrollToIndex(index);
    }
  };

  // Fix #3: Stable callback — prevents every GameCard from re-rendering when parent re-renders
  const handleLevelSelect = useCallback((level: number) => {
    setSelectedLevel(level);
  }, []);

  const { itemDistance, stackPosition } = useMemo(() => ({
    itemDistance: isMobile ? 400 : isTablet ? 400 : 230,
    stackPosition: isMobile ? "10%" : isTablet ? "12%" : "15%",
  }), [isMobile, isTablet]);

  return (
    <div
      className="flex h-screen"
      style={{
        background: "linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 50%, #E8F4F8 100%)",
      }}
    >
      <Sidebar />

      {/* ResourceBars - Mobile only (navbar style) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <ResourceBars
          heartCount={displayHeartCount}
          maxHeartCount={displayMaxHeartCount}
          lastResetAt={displayLastResetAt}
          scoreCount={displayScoreCount}
          daystate={displayFireCount}
          className="py-2 px-4"
          showDivider={false}
        />
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        <BackgroundSquares />

        {/* Center Area - ScrollStack */}
        <main className="flex-1 relative overflow-hidden max-w-[900px] mx-auto z-10">
        {/* ScrollStack with padding-top */}
        <div className="pt-[80px] lg:pt-[4px] h-full pb-[70px] lg:pb-0">
          <ScrollStack
            ref={scrollStackRef}
            className="w-full h-full"
            itemDistance={itemDistance}
            itemStackDistance={0}
            stackPosition={stackPosition}
            baseScale={1}
            itemScale={0}
            useWindowScroll={false}
            onSectionChange={handleSectionChange}
          >
            {/* GameStepper as first child */}
            <GameStepper
              games={gamesConfig}
              currentIndex={currentGameIndex}
              onStepClick={handleStepClick}
            />
            {mergedGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                selectedLevel={selectedLevel}
                onLevelSelect={handleLevelSelect}
                isTablet={isTablet}
              />
            ))}
          </ScrollStack>
        </div>
      </main>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator
        visible={showScrollIndicator}
      />

      <div className="hidden lg:block relative z-10">
        <Suspense fallback={<div className="w-[300px]" />}>
          <CourseRightPanel
            level={selectedLevel}
            difficulty={levelData?.difficulty}
            difficultyText={levelData?.difficultyText}
            gameTitle={currentGameTitle}
            gameIcon={mergedGames[currentGameIconIndex]?.icon}
            headerColor={currentHeaderColor}
            gameId={currentGameId}
            heartCount={displayHeartCount}
            maxHeartCount={displayMaxHeartCount}
            lastResetAt={displayLastResetAt}
            scoreCount={displayScoreCount}
            fireCount={displayFireCount}
          />
        </Suspense>
      </div>
      </div>
    </div>
  );
}
