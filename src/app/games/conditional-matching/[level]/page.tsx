"use client";

import { use, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { conditionalMatchingTutorialSteps } from "@/components/games/tutorials";
import { condMatchLevels } from "@/constants/games/conditional-matching-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";
import { TopRowItem, BottomRowItem } from "@/components/games/conditional-matching";
import { TiltButton } from "react-tilt-button";
import { FaRedo, FaPlay } from "react-icons/fa";
import type { MatchItem, CondMatchPattern } from "@/constants/games/conditional-matching-levels";


type NodePos = { x: number; y: number };

// Components are imported from "@/components/games/conditional-matching"

export default function ConditionalMatchingGamePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = use(params);
  const levelNum = Number(level);
  const router = useRouter();
  const { user, reduceLife } = useUserStore();
  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;

  const config = condMatchLevels[levelNum];

  // ── State ─────────────────────────────────────────────────
  const [wrongCount, setWrongCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [connectedItems, setConnectedItems] = useState<Record<string, string>>({});
  const [, setTick] = useState(0);
  const [retryKey, setRetryKey] = useState(0); // bump to force re-shuffle on retry

  const [isCompleted, setIsCompleted] = useState(false);
  const [errorLines, setErrorLines] = useState<string[]>([]);
  const [correctLines, setCorrectLines] = useState<string[]>([]);

  const [shuffledLeftItems, setShuffledLeftItems] = useState<MatchItem[]>([]);
  const [shuffledRightItems, setShuffledRightItems] = useState<MatchItem[]>([]);
  const [activePattern, setActivePattern] = useState<CondMatchPattern | null>(null);

  // Ref for the error-flash timeout so we can cancel it on reset
  const errorFlashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pick random pattern & shuffle items whenever level config or retryKey changes
  useEffect(() => {
    if (!config) return;
    const shuffle = (array: MatchItem[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    if (config.patterns && config.patterns.length > 0) {
      // Randomly pick one of the 4 patterns
      const idx = Math.floor(Math.random() * config.patterns.length);
      const pattern = config.patterns[idx];
      setActivePattern(pattern);
      setShuffledLeftItems(shuffle(pattern.leftItems));
      setShuffledRightItems(shuffle(pattern.rightItems));
    } else {
      // Fallback: use level's direct items
      setActivePattern(null);
      setShuffledLeftItems(shuffle(config.leftItems ?? []));
      setShuffledRightItems(shuffle(config.rightItems ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, retryKey]);

  // Line Drawing State
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [nodePositions, setNodePositions] = useState<Record<string, NodePos>>({});
  const [activeLine, setActiveLine] = useState<{ startId: string; currentX: number; currentY: number } | null>(null);

  // Refs สำหรับ window-level pointer handlers (หลีกเลี่ยง stale closure บน touch)
  const activeLineRef = useRef<{ startId: string; currentX: number; currentY: number } | null>(null);
  const nodePositionsRef = useRef<Record<string, NodePos>>({});
  const errorLinesRef = useRef<string[]>([]);
  const correctLinesRef = useRef<string[]>([]);

  const startTimeRef = useRef<number>(Date.now());

  // force re-render for the timer display — stop when game is completed
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  // Update node positions for SVG lines
  const updateNodePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, NodePos> = {};

    Object.entries(nodeRefs.current).forEach(([id, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        newPositions[id] = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }
    });
    setNodePositions(newPositions);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateNodePositions();
    }, 150);

    window.addEventListener("resize", updateNodePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateNodePositions);
    };
  }, [updateNodePositions, config]);

  // Sync refs ให้ตรงกับ state เพื่อให้ window handlers อ่านค่าล่าสุดได้เสมอ
  useEffect(() => { activeLineRef.current = activeLine; }, [activeLine]);
  useEffect(() => { nodePositionsRef.current = nodePositions; }, [nodePositions]);
  useEffect(() => { errorLinesRef.current = errorLines; }, [errorLines]);
  useEffect(() => { correctLinesRef.current = correctLines; }, [correctLines]);

  // ── Interaction Logic ────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (!config || errorLines.length > 0 || isCompleted) return;

    // Only top-row (left) items can start a drag
    const isLeftItem = activeLeftItems.some((item) => item.id === id);
    if (!isLeftItem) return;

    const isLeftCorrect = correctLines.includes(id);
    if (isLeftCorrect) return;

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      setConnectedItems((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        Object.keys(next).forEach((k) => {
          if (next[k] === id) delete next[k];
        });
        return next;
      });

      // Snap the starting point of the dragged line to the anchor dot position
      // so the line always visually starts from the dot, not from where the user tapped
      const dotPos = nodePositionsRef.current[id];
      const startX = dotPos ? dotPos.x : e.clientX - containerRect.left;
      const startY = dotPos ? dotPos.y : e.clientY - containerRect.top;

      setActiveLine({
        startId: id,
        currentX: startX,
        currentY: startY,
      });
    }
  };

  // ── Window-level Pointer Handlers (รองรับ Touch บน Mobile) ──────────────
  // ผูก pointermove / pointerup กับ window โดยตรง เพื่อให้ลากนิ้วออกนอก container ได้
  const isDrawing = activeLine !== null;
  useEffect(() => {
    if (!isDrawing) return;

    const onMove = (e: PointerEvent) => {
      e.preventDefault(); // ป้องกัน scroll ขณะลาก
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setActiveLine((prev) =>
        prev ? { ...prev, currentX: e.clientX - rect.left, currentY: e.clientY - rect.top } : null
      );
    };

    const onUp = (e: PointerEvent) => {
      if (errorLinesRef.current.length > 0 || !config) {
        setActiveLine(null);
        return;
      }
      if (!containerRef.current) {
        setActiveLine(null);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      const startId = activeLineRef.current?.startId;
      if (!startId) return;

      const SNAP_RADIUS = 80;
      let finalDroppedId: string | null = null;

      // Dragging is always from top (left) items → always target right items
      for (const item of activeRightItems) {
        const pos = nodePositionsRef.current[item.id];
        if (pos) {
          const dx = curX - pos.x;
          const dy = curY - pos.y;
          if (Math.hypot(dx, dy) < SNAP_RADIUS) {
            finalDroppedId = item.id;
            break;
          }
        }
      }

      if (finalDroppedId) {
        const leftId = startId;
        const rightId = finalDroppedId;

        setConnectedItems((prev) => {
          const next = { ...prev };
          if (correctLinesRef.current.includes(leftId)) return prev;
          Object.keys(next).forEach((k) => {
            if (next[k] === rightId && !correctLinesRef.current.includes(k)) {
              delete next[k];
            }
          });
          next[leftId] = rightId;
          return next;
        });
      }

      setActiveLine(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawing, config]);

  // ── Win / Fail Logic ────────────────────────────────────────
  const handleSimulateWin = useCallback(() => {
    if (scoreResult || !config) return;
    setIsCompleted(true);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setElapsedSeconds(elapsed);

    const result = calculateGameScore({
      difficulty: config.difficulty || "easy",
      attempts: wrongCount,
      timeSeconds: elapsed,
    });
    setScoreResult(result);

    const { stars } = getStarRating(result.totalScore);
    const absoluteLevelId = getAbsoluteLevelId("conditional-matching", levelNum);

    gameService.submitScore({
      levelId: absoluteLevelId,
      score: result.totalScore,
      stars,
      playTime: elapsed,
    }).catch(err => console.error("Failed to submit score", err));
  }, [scoreResult, config, wrongCount, levelNum]);

  const handleSimulateFail = useCallback(() => {
    setWrongCount((prev) => prev + 1);
    reduceLife();
  }, [reduceLife]);

  const handleCheck = useCallback(() => {
    if (isCompleted || !config || errorLines.length > 0) return;

    if (Object.keys(connectedItems).length < activeLeftItems.length) {
      return;
    }

    const newErrorLines: string[] = [];
    const newCorrectLines: string[] = [];
    let isAllCorrect = true;
    activeLeftItems.forEach((item) => {
      if (connectedItems[item.id] !== item.matchId) {
        isAllCorrect = false;
        newErrorLines.push(item.id);
      } else {
        newCorrectLines.push(item.id);
      }
    });

    if (newCorrectLines.length > 0) {
      setCorrectLines((prev) => Array.from(new Set([...prev, ...newCorrectLines])));
    }

    if (isAllCorrect) {
      handleSimulateWin();
    } else {
      handleSimulateFail();
      setErrorLines(newErrorLines);

      // Flash errors then remove wrong lines so they can try again
      errorFlashTimeoutRef.current = setTimeout(() => {
        setConnectedItems((prev) => {
          const next = { ...prev };
          newErrorLines.forEach((id) => {
            delete next[id];
          });
          return next;
        });
        setErrorLines([]);
        errorFlashTimeoutRef.current = null;
      }, 1000);
    }
  }, [isCompleted, config, errorLines, connectedItems, handleSimulateWin, handleSimulateFail]);

  const handleReset = useCallback(() => {
    if (isCompleted) return;
    // Cancel any pending error-flash timeout to prevent it from deleting new connections
    if (errorFlashTimeoutRef.current) {
      clearTimeout(errorFlashTimeoutRef.current);
      errorFlashTimeoutRef.current = null;
    }
    // ลบเฉพาะ connections ที่ยังไม่ถูก lock — ไม่แตะ correctLines
    setConnectedItems((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (!correctLines.includes(k)) delete next[k];
      });
      return next;
    });
    setErrorLines([]);
  }, [isCompleted, correctLines]);

  const handleRetry = useCallback(() => {
    // Cancel any pending error-flash timeout
    if (errorFlashTimeoutRef.current) {
      clearTimeout(errorFlashTimeoutRef.current);
      errorFlashTimeoutRef.current = null;
    }
    // Clear accumulated nodeRefs from previous pattern
    nodeRefs.current = {};
    setIsCompleted(false);
    setWrongCount(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    setConnectedItems({});
    setErrorLines([]);
    setCorrectLines([]);
    startTimeRef.current = Date.now();
    // Bump retryKey to trigger re-shuffle in the useEffect
    setRetryKey((k) => k + 1);
  }, []);


  // ── Fallback ──────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex flex-col h-screen bg-[#0B1021] overflow-hidden z-50">
        <GameHeader level={level} gameTitle="Conditional Matching" characterSrc="/images/P_Coco/coco-03.svg" />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button onClick={() => router.push("/courses")} className="mt-4 px-6 py-2 bg-[#ffb356] text-white rounded-xl font-bold">
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // Derive active items from pattern or fallback to config root
  const activeLeftItems = activePattern?.leftItems ?? config.leftItems ?? [];
  const activeRightItems = activePattern?.rightItems ?? config.rightItems ?? [];


  // ── SVG Curved Line: Proper Cubic Bezier (Option A) ─────────
  const getSCurvePath = (start: NodePos, end: NodePos) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx > absDy) {
      // Horizontal layout (mobile): anchors face left / right
      // tension scales with distance so the curve always looks proportional
      const tension = Math.max(absDx * 0.5, 50);
      const cx1 = start.x + (dx > 0 ? tension : -tension);
      const cy1 = start.y;
      const cx2 = end.x - (dx > 0 ? tension : -tension);
      const cy2 = end.y;
      return `M ${start.x} ${start.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${end.x} ${end.y}`;
    }

    // Vertical layout (desktop): anchors face up / down
    const tension = Math.max(absDy * 0.5, 50);
    const cx1 = start.x;
    const cy1 = start.y + (dy > 0 ? tension : -tension);
    const cx2 = end.x;
    const cy2 = end.y - (dy > 0 ? tension : -tension);
    return `M ${start.x} ${start.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${end.x} ${end.y}`;
  };

  const isAllFilled = Object.keys(connectedItems).length === activeLeftItems.length;
  // compact = true เมื่อมี 6 items (hard level)
  const compact = activeLeftItems.length >= 6;

  // ── Render ────────────────────────────────────────────────
  return (
    <div
      className="flex flex-col min-h-screen overflow-y-auto sm:h-screen sm:overflow-hidden relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Background/conditionalmatchingBackground.png')" }}
    >
      <GameHeader level={level} gameTitle="Conditional Matching" characterSrc="/images/P_Coco/coco-03.svg" />

      {/* Global & inline custom animations */}
      <style>{`
        @keyframes flow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .line-flow { animation: flow 1.2s linear infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        @keyframes coco-bounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes sparkle-pop {
          0%   { transform: scale(0) rotate(0deg); opacity:1; }
          100% { transform: scale(1.6) rotate(30deg); opacity:0; }
        }
        @keyframes card-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-card-pop {
          animation: card-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
        }
      `}</style>


      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4 pb-4 sm:pb-6 relative z-10 select-none">

        {/* Main Game Frame */}
        <div className="flex flex-col w-full bg-[#FEF5E6] border-[8px] sm:border-[10px] border-[#FEAA50] rounded-[24px] sm:rounded-[32px] relative shadow-2xl pt-8 sm:pt-10 pb-4 sm:pb-6 px-2 sm:px-4 md:px-6 outline outline-[3px] outline-[#E7681B] ">

          {/* Subtle Background Decorations */}
          <div className="absolute inset-0 overflow-hidden rounded-[16px] sm:rounded-[22px] pointer-events-none z-0">

            {/* ── Clouds (กระจายทั่วฉาก) ── */}
            {/* Top-left */}
            <svg className="absolute top-4 left-6 w-24 h-12 sm:w-36 sm:h-18 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Top-right */}
            <svg className="absolute top-6 right-6 w-20 h-10 sm:w-28 sm:h-14 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Center-left (visible in gap area) */}
            <svg className="absolute top-[38%] left-4 w-28 h-14 sm:w-40 sm:h-20 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Center-right */}
            <svg className="absolute top-[42%] right-4 w-24 h-12 sm:w-36 sm:h-18 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Center-center */}
            <svg className="absolute top-[50%] left-1/3 w-20 h-10 sm:w-32 sm:h-16 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Bottom-left */}
            <svg className="absolute bottom-6 left-8 w-22 h-11 sm:w-32 sm:h-16 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            {/* Bottom-right */}
            <svg className="absolute bottom-8 right-10 w-24 h-12 sm:w-32 sm:h-16 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>

            {/* ── Stars (กระจายทุกส่วน) ── */}
            <svg className="absolute top-8 left-[38%] w-7 h-7 sm:w-9 sm:h-9 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[18%] left-[18%] w-5 h-5 sm:w-6 sm:h-6 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[22%] right-[20%] w-4 h-4 sm:w-6 sm:h-6 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Center stars (most visible) */}
            <svg className="absolute top-[35%] left-[12%] w-8 h-8 sm:w-10 sm:h-10 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[48%] left-[28%] w-5 h-5 sm:w-7 sm:h-7 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[55%] left-[55%] w-6 h-6 sm:w-8 sm:h-8 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute top-[40%] right-[14%] w-9 h-9 sm:w-11 sm:h-11 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {/* Bottom stars */}
            <svg className="absolute bottom-[28%] left-[42%] w-5 h-5 sm:w-6 sm:h-6 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg className="absolute bottom-[18%] right-[30%] w-4 h-4 sm:w-5 sm:h-5 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>

            {/* ── Sparkle / Cross shapes ── */}
            <svg className="absolute top-[30%] left-[44%] w-6 h-6 sm:w-8 sm:h-8 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 0 13.5 9 24 12C24 12 14.5 14 12 24C12 24 10.5 15 0 12C0 12 9.5 10 12 0Z" />
            </svg>
            <svg className="absolute top-[62%] left-[20%] w-5 h-5 sm:w-7 sm:h-7 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 0 13.5 9 24 12C24 12 14.5 14 12 24C12 24 10.5 15 0 12C0 12 9.5 10 12 0Z" />
            </svg>
            <svg className="absolute top-[45%] right-[35%] w-7 h-7 sm:w-9 sm:h-9 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 0 13.5 9 24 12C24 12 14.5 14 12 24C12 24 10.5 15 0 12C0 12 9.5 10 12 0Z" />
            </svg>
            <svg className="absolute bottom-[35%] right-[15%] w-5 h-5 sm:w-6 sm:h-6 text-[#FEAC4A] opacity-[0.15]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 0 13.5 9 24 12C24 12 14.5 14 12 24C12 24 10.5 15 0 12C0 12 9.5 10 12 0Z" />
            </svg>
          </div>

          {/* Level Badge (Top Left Border) */}
          <div className="absolute -top-3.5 sm:-top-5 left-4 sm:left-20 z-30 pointer-events-none whitespace-nowrap">
            <div
              className="px-3 sm:px-5 py-1 sm:py-1.5 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 4px 14px rgba(254,170,80,0.45), inset 0 -2px 0 rgba(231,104,27,0.18)",
                border: "2px solid #FEAA50",
              }}
            >
              <span
                className="text-xs sm:text-sm md:text-base font-bold tracking-wide"
                style={{
                  color: "#E7681B",
                  textShadow: "0 1px 0 rgba(255,255,255,1)",
                }}
              >
                LEVEL {config.level} - {config.difficulty === "easy" ? "ง่าย" : config.difficulty === "normal" ? "ปานกลาง" : "ยาก"}
              </span>
            </div>
          </div>

          {/* Game Title Badge (Centered on Top Border) */}
          <div className="absolute -top-5 sm:-top-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none whitespace-nowrap">
            <div
              className="px-6 sm:px-10 py-1.5 sm:py-2.5 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 4px 14px rgba(254,170,80,0.45), inset 0 -3px 0 rgba(231,104,27,0.18)",
                border: "3px solid #FEAA50",
              }}
            >
              <span
                className="text-base sm:text-xl md:text-2xl font-extrabold tracking-wide"
                style={{
                  color: "#E7681B",
                  textShadow: "0 1px 0 rgba(255,255,255,1)",
                }}
              >
                โยงเส้นจับคู่
              </span>
            </div>
          </div>

          {/* LINE DRAWING CONTAINER */}
          <div
            ref={containerRef}
            className="flex flex-row sm:flex-col justify-between w-full min-h-[280px] sm:min-h-[400px] md:min-h-[450px] relative"
            style={{ touchAction: activeLine ? 'none' : 'auto' }}
          >
            {/* SVG Overlay for Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>

              {/* Established Connections */}
              {Object.entries(connectedItems).map(([startId, endId]) => {
                const start = nodePositions[startId];
                const end = nodePositions[endId];
                if (!start || !end) return null;
                const isErr = errorLines.includes(startId);
                const isCorr = correctLines.includes(startId);

                // Color palette matching the orange game theme
                const glowColor = isErr ? "#ef4444" : isCorr ? "#22c55e" : "#f97316";
                const lineColor = isErr ? "#dc2626" : isCorr ? "#16a34a" : "#ea580c";
                const path = getSCurvePath(start, end);

                return (
                  <g key={`${startId}-${endId}`}>
                    {/* Wide soft glow */}
                    <path d={path} stroke={glowColor} strokeWidth="22" strokeLinecap="round"
                      fill="none" opacity="0.20" />
                    {/* Main line */}
                    <path d={path} stroke={lineColor} strokeWidth="7"
                      strokeLinecap="round" fill="none"
                      className={isCorr ? "line-flow" : ""}
                      style={isCorr ? { strokeDasharray: "12 6" } : undefined}
                    />
                    {/* White inner highlight for premium depth */}
                    <path d={path} stroke="white" strokeWidth="2"
                      strokeLinecap="round" fill="none" opacity="0.45" />
                  </g>
                );
              })}

              {/* Currently Dragging Line */}
              {activeLine && nodePositions[activeLine.startId] && (
                <g>
                  {/* Glow */}
                  <path
                    d={getSCurvePath(nodePositions[activeLine.startId], { x: activeLine.currentX, y: activeLine.currentY })}
                    stroke="#f97316" strokeWidth="22" strokeLinecap="round"
                    fill="none" opacity="0.18"
                  />
                  {/* Dashed main line while dragging */}
                  <path
                    d={getSCurvePath(nodePositions[activeLine.startId], { x: activeLine.currentX, y: activeLine.currentY })}
                    stroke="#ea580c" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray="10 5"
                    fill="none"
                    className="line-flow"
                  />
                  {/* White inner highlight */}
                  <path
                    d={getSCurvePath(nodePositions[activeLine.startId], { x: activeLine.currentX, y: activeLine.currentY })}
                    stroke="white" strokeWidth="2" strokeLinecap="round"
                    fill="none" opacity="0.5"
                  />
                </g>
              )}
            </svg>

            {/* Left Column (mobile) / Top Row (desktop): Questions */}
            <div className="flex flex-col z-20 items-center w-auto sm:w-full">
              <div className={`flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:items-end w-full
                ${compact ? "gap-1.5 sm:gap-3 md:gap-4" : "gap-2 sm:gap-6 md:gap-8"}`}>
                {shuffledLeftItems.map((item, index) => (
                  <TopRowItem
                    key={item.id}
                    item={item}
                    compact={compact}
                    index={index}
                    isConnected={Object.keys(connectedItems).includes(item.id)}
                    isCorrect={correctLines.includes(item.id)}
                    onPointerDown={(e) => handlePointerDown(e, item.id)}
                    onNodeRef={(el) => { nodeRefs.current[item.id] = el; }}
                  />
                ))}
              </div>
            </div>

            {/* Center Spacer */}
            <div className="pointer-events-none min-w-[16px] sm:min-w-0 sm:flex-1 sm:min-h-[20px] md:min-h-[40px]" />

            {/* Right Column (mobile) / Bottom Row (desktop): Answers */}
            <div className="flex flex-col z-20 items-center w-auto sm:w-full">
              <div className={`flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:items-start w-full
                ${compact ? "gap-1.5 sm:gap-3 md:gap-4" : "gap-2 sm:gap-6 md:gap-8"}`}>
                {shuffledRightItems.map((item, index) => {
                  const startId = Object.keys(connectedItems).find(k => connectedItems[k] === item.id);
                  const isError = startId ? errorLines.includes(startId) : false;
                  const isCorrect = startId ? correctLines.includes(startId) : false;

                  return (
                    <BottomRowItem
                      key={item.id}
                      item={item}
                      compact={compact}
                      index={index}
                      isConnected={!!startId}
                      isError={isError}
                      isCorrect={isCorrect}
                      onPointerDown={() => {/* bottom row: no drag initiation */ }}
                      onNodeRef={(el) => { nodeRefs.current[item.id] = el; }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Controls: Reset | Progress Bar | Submit */}
        <div className="z-20 w-full max-w-2xl mx-auto mt-3 sm:mt-4 px-2 sm:px-4">
          <div className="flex items-center gap-3">

            {/* Reset Button */}
            <div className="flex-shrink-0 w-14 sm:w-16">
              <TiltButton
                width="100%"
                height={52}
                elevation={4}
                pressInset={3}
                tilt={0.5}
                radius={12}
                motion={60}
                surfaceColor="#1E2C33"
                sideColor="#0F1A20"
                textColor="#9CA3AF"
                onClick={handleReset}
                disabled={isCompleted}
              >
                <FaRedo className="w-4 h-4" />
              </TiltButton>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 relative h-[52px] flex items-center">
              <div
                className="w-full h-full rounded-[12px] overflow-hidden relative"
                style={{
                  background: "#FEE0B0",
                  border: "3px solid #FEAA50",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                {/* Filled portion */}
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-500 ease-out rounded-l-[10px]"
                  style={{
                    width: activeLeftItems.length > 0
                      ? `${(Object.keys(connectedItems).length / activeLeftItems.length) * 100}%`
                      : "0%",
                    background: "linear-gradient(90deg, #F97316 0%, #FEAA50 100%)",
                    boxShadow: "inset 0 -3px 0 rgba(231,104,27,0.35)",
                  }}
                />
                {/* Progress text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-extrabold text-sm sm:text-base"
                    style={{
                      color: isAllFilled ? "#ffffff" : "#E7681B",
                      textShadow: isAllFilled
                        ? "0 1px 3px rgba(0,0,0,0.35)"
                        : "0 1px 0 rgba(255,255,255,0.9)",
                    }}
                  >
                    {Object.keys(connectedItems).length} / {activeLeftItems.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className={`flex-shrink-0 w-32 sm:w-40 transition-opacity ${!isAllFilled ? "opacity-40 cursor-not-allowed" : ""}`}>
              <TiltButton
                width="100%"
                height={52}
                elevation={5}
                pressInset={4}
                tilt={0.5}
                radius={12}
                motion={60}
                surfaceColor={isCompleted ? "#E5E5E5" : "#58CC02"}
                sideColor={isCompleted ? "#D1D1D1" : "#46A302"}
                textColor={isCompleted ? "#AFAFAF" : "#ffffff"}
                onClick={handleCheck}
                disabled={!isAllFilled || isCompleted}
              >
                <span className="font-bold text-base sm:text-lg flex items-center justify-center gap-2 drop-shadow-sm">
                  <FaPlay className="w-3 h-3" /> ยืนยัน!
                </span>
              </TiltButton>
            </div>

          </div>
        </div>
      </main>

      <HelpButton
        steps={[
          { emoji: "❓", text: "อ่านชื่อและดูรูปในแต่ละช่อง" },
          { emoji: "🔑", text: "ลากเส้นจากกุญแจ ไปหาแม่กุญแจที่จับคู่กัน" },
          { emoji: "✅", text: "ลากให้ครบทุกเส้น แล้วกดตรวจคำตอบ!" },
        ]}
      />

      {showIntro && (
        <TutorialModal
          steps={conditionalMatchingTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Coco/coco-03.svg"
          accentColor="#4F46E5"
        />
      )}

      {scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="conditional-matching"
          onRetry={handleRetry}
        />
      )}

      {isOutOfLives && <OutOfLivesModal />}
    </div>
  );
}
