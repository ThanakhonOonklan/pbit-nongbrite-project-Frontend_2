"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoadingOverlay, LoadingSpinner } from "@/components/common";
import { gamesConfig } from "@/constants/courses/gameConfig";
import { useChapterStore } from "@/store/chapter.store";
import {
  clearGameNavigation,
  getGameNavigation,
} from "@/utils/game-navigation";

const GAME_ROUTE_PATTERN = /^\/games\/([^/]+)\/([^/]+)$/;

const FullPageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
    <LoadingSpinner size="sm" />
  </div>
);

const getGameRoute = (pathname: string) => {
  const match = pathname.match(GAME_ROUTE_PATTERN);
  if (!match) return null;

  const [, gameId, levelParam] = match;
  const levelNo = Number(levelParam);

  if (!gameId || !Number.isInteger(levelNo) || levelNo < 1) {
    return null;
  }

  return { gameId, levelNo };
};

const getErrorStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== "object") return undefined;

  if ("status" in error && typeof error.status === "number") {
    return error.status;
  }

  if (
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "status" in error.response &&
    typeof error.response.status === "number"
  ) {
    return error.response.status;
  }

  return undefined;
};

export function GameAccessGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const route = React.useMemo(() => getGameRoute(pathname), [pathname]);
  const chapters = useChapterStore((state) => state.chapters);
  const isLoading = useChapterStore((state) => state.isLoading);
  const fetchChapters = useChapterStore((state) => state.fetchChapters);
  const [isCheckingAccess, setIsCheckingAccess] = React.useState(true);
  const [authorizedPath, setAuthorizedPath] = React.useState<string | null>(null);
  const clearNavigationTimerRef = React.useRef<number | null>(null);
  const { hasIntent: hasNavigationIntent, skipUnlockCheck } =
    getGameNavigation(pathname);
  const isCurrentPathAuthorized = authorizedPath === pathname;

  React.useEffect(() => {
    if (clearNavigationTimerRef.current) {
      window.clearTimeout(clearNavigationTimerRef.current);
      clearNavigationTimerRef.current = null;
    }

    setIsCheckingAccess(true);

    return () => {
      if (clearNavigationTimerRef.current) {
        window.clearTimeout(clearNavigationTimerRef.current);
        clearNavigationTimerRef.current = null;
      }
    };
  }, [pathname]);

  React.useEffect(() => {
    if (!route) {
      router.replace("/courses");
      return;
    }

    if (!hasNavigationIntent && !isCurrentPathAuthorized) {
      router.replace("/courses");
      return;
    }

    if (chapters.length > 0 || isLoading) return;

    fetchChapters().catch((error) => {
      if (getErrorStatus(error) === 401) {
        return;
      }

      router.replace("/courses");
    });
  }, [
    chapters.length,
    fetchChapters,
    hasNavigationIntent,
    isCurrentPathAuthorized,
    isLoading,
    route,
    router,
  ]);

  React.useEffect(() => {
    if (!route || chapters.length === 0) return;

    if (isCurrentPathAuthorized) {
      setIsCheckingAccess(false);
      return;
    }

    if (!hasNavigationIntent) return;

    const gameIndex = gamesConfig.findIndex((game) => game.id === route.gameId);
    if (gameIndex === -1) {
      setAuthorizedPath(null);
      router.replace("/courses");
      return;
    }

    const chapter =
      chapters.find((item) => item.chapterNo === gameIndex + 1) ??
      chapters[gameIndex];
    const level = chapter?.levels.find((item) => item.levelNo === route.levelNo);

    if (!skipUnlockCheck && !level?.isUnlocked) {
      clearGameNavigation();
      setAuthorizedPath(null);
      router.replace("/courses");
      return;
    }

    setAuthorizedPath(pathname);
    setIsCheckingAccess(false);

    clearNavigationTimerRef.current = window.setTimeout(() => {
      clearGameNavigation();
      clearNavigationTimerRef.current = null;
    }, 1_000);
  }, [
    chapters,
    hasNavigationIntent,
    isCurrentPathAuthorized,
    pathname,
    route,
    router,
    skipUnlockCheck,
  ]);

  if (
    isCheckingAccess ||
    isLoading ||
    chapters.length === 0 ||
    (!hasNavigationIntent && !isCurrentPathAuthorized)
  ) {
    return (
      <>
        <FullPageLoading />
        <LoadingOverlay isLoading message="กำลังตรวจสอบด่าน..." />
      </>
    );
  }

  return <>{children}</>;
}
