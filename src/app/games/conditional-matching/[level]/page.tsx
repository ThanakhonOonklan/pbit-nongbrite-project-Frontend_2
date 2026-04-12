"use client";

import { use, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import { condMatchLevels } from "@/constants/games/conditional-matching-levels";
import { calculateGameScore, getStarRating, type ScoreResult } from "@/utils/game-scoring";
import { getAbsoluteLevelId } from "@/utils/level-mapper";
import { gameService } from "@/services/game.service";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";
import { LeftColItem, RightColItem } from "@/components/games/conditional-matching";
import { GameControls } from "@/components/games/sequencing/GameControls";


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

  const config = condMatchLevels[levelNum];

  // ── State ─────────────────────────────────────────────────
  const [wrongCount, setWrongCount] = useState(0);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(levelNum === 1);
  const [connectedItems, setConnectedItems] = useState<Record<string, string>>({});
  const [, setTick] = useState(0);

  const [isCompleted, setIsCompleted] = useState(false);
  const [errorLines, setErrorLines] = useState<string[]>([]);
  const [correctLines, setCorrectLines] = useState<string[]>([]);

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

  // force re-render for the timer display
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

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
    if (correctLines.includes(id)) return; // Prevent unlocking already correct lines
    const isLeftItem = config.leftItems.some((item) => item.id === id);
    if (!isLeftItem) return;

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      setConnectedItems((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setActiveLine({
        startId: id,
        currentX: e.clientX - containerRect.left,
        currentY: e.clientY - containerRect.top,
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

      let droppedRightId: string | null = null;
      const SNAP_RADIUS = 80; // เพิ่มจาก 60 → 80 เพื่อให้ง่ายขึ้นสำหรับนิ้ว

      for (const item of config.rightItems) {
        const pos = nodePositionsRef.current[item.id];
        if (pos) {
          const dx = curX - pos.x;
          const dy = curY - pos.y;
          if (Math.hypot(dx, dy) < SNAP_RADIUS) {
            droppedRightId = item.id;
            break;
          }
        }
      }

      if (droppedRightId) {
        const startId = activeLineRef.current?.startId;
        const finalDropped = droppedRightId;
        if (startId) {
          setConnectedItems((prev) => {
            const next = { ...prev };
            // ห้ามแทนที่ right item ที่ถูก lock ถูกต้องแล้ว
            const existingLeft = Object.keys(next).find((k) => next[k] === finalDropped);
            if (existingLeft && correctLinesRef.current.includes(existingLeft)) {
              return prev;
            }
            // Ensure one-to-one connection (ไม่ลบ correct connections)
            Object.keys(next).forEach((k) => {
              if (next[k] === finalDropped && !correctLinesRef.current.includes(k)) {
                delete next[k];
              }
            });
            next[startId] = finalDropped;
            return next;
          });
        }
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
    if (isCompleted || !config) return;

    if (Object.keys(connectedItems).length < config.leftItems.length) {
      return;
    }

    const newErrorLines: string[] = [];
    const newCorrectLines: string[] = [];
    let isAllCorrect = true;
    config.leftItems.forEach((item) => {
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
      setTimeout(() => {
        setConnectedItems((prev) => {
          const next = { ...prev };
          newErrorLines.forEach((id) => {
            delete next[id];
          });
          return next;
        });
        setErrorLines([]);
      }, 1000);
    }
  }, [isCompleted, config, connectedItems, handleSimulateWin, handleSimulateFail]);

  const handleReset = useCallback(() => {
    if (isCompleted) return;
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
    setIsCompleted(false);
    setWrongCount(0);
    setScoreResult(null);
    setElapsedSeconds(0);
    setConnectedItems({});
    setErrorLines([]);
    setCorrectLines([]);
    startTimeRef.current = Date.now();
  }, []);


  // ── Fallback ──────────────────────────────────────────────
  if (!config) {
    return (
      <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">
        <GameHeader level={level} gameTitle="Conditional Matching" characterSrc="/images/P_Coco/coco-03.svg" />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-white text-xl">ไม่พบด่านนี้</p>
          <button onClick={() => router.push("/courses")} className="mt-4 px-6 py-2 bg-[#1CB0F6] text-white rounded-xl font-bold">
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // ── SVG Curved Line Function ──────────────────────────────
  const getSCurvePath = (start: NodePos, end: NodePos) => {
    const cpOffset = Math.abs(end.x - start.x) / 2;
    return `M ${start.x} ${start.y} C ${start.x + cpOffset} ${start.y}, ${end.x - cpOffset} ${end.y}, ${end.x} ${end.y}`;
  };

  const isAllFilled = Object.keys(connectedItems).length === config.leftItems.length;
  // compact = true เมื่อมี 6 items (hard level) ให้ขนาด card เล็กลงเพื่อไม่ scroll บนมือถือ
  const compact = config.leftItems.length >= 6;

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-[#131F24] overflow-hidden">
      <GameHeader level={level} gameTitle="Conditional Matching" characterSrc="/images/P_Coco/coco-03.svg" />

      {/* Global & inline custom animations */}
      <style>{`
        @keyframes flow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .line-flow {
          animation: flow 1.2s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
      `}</style>


      <div className="flex-1 overflow-x-hidden rounded-t-3xl mt-1 sm:mt-2 flex flex-col pt-2 sm:pt-3 md:pt-4 pb-1 sm:pb-2 w-full mx-auto relative">

        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#ffb356] text-center mb-0 sm:mb-1 md:mb-2 uppercase tracking-wide shrink-0 z-20">
          {config.title}
        </h2>

        {/* LINE DRAWING CONTAINER */}
        <div
          ref={containerRef}
          className="flex flex-row justify-between flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 relative touch-none py-1 sm:py-2"
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

              return (
                <path
                  key={`${startId}-${endId}`}
                  d={getSCurvePath(start, end)}
                  stroke={isErr ? "#ef4444" : isCorr ? "#4ade80" : "#ffb356"}
                  strokeWidth={isErr ? "8" : "6"}
                  strokeLinecap="round"
                  strokeDasharray="12 12"
                  fill="none"
                  className={isErr ? "" : "line-flow"}
                />
              );
            })}

            {/* Currently Dragging Line */}
            {activeLine && nodePositions[activeLine.startId] && (
              <path
                d={getSCurvePath(nodePositions[activeLine.startId], { x: activeLine.currentX, y: activeLine.currentY })}
                stroke="#ffb356"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="12 12"
                fill="none"
              />
            )}
          </svg>

          {/* Left Column: Questions */}
          <div className={`flex flex-col justify-center z-20
            ${compact ? "gap-1.5 sm:gap-2 md:gap-3 w-[82px] sm:w-[108px] md:w-[136px] lg:w-[165px]"
                       : "gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 w-[106px] sm:w-[132px] md:w-[156px] lg:w-[185px]"}`}>
            {config.leftItems.map((item) => (
              <LeftColItem
                key={item.id}
                item={item}
                compact={compact}
                isConnected={Object.keys(connectedItems).includes(item.id)}
                isCorrect={correctLines.includes(item.id)}
                onPointerDown={(e) => handlePointerDown(e, item.id)}
                onNodeRef={(el) => { nodeRefs.current[item.id] = el; }}
              />
            ))}
          </div>

          <div className="flex-1" /> {/* Flexible center area for drawing lines */}

          {/* Right Column: Answers */}
          <div className={`flex flex-col justify-center z-20
            ${compact ? "gap-1.5 sm:gap-2 md:gap-3 w-[82px] sm:w-[108px] md:w-[136px] lg:w-[165px]"
                       : "gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 w-[106px] sm:w-[132px] md:w-[156px] lg:w-[185px]"}`}>
            {config.rightItems.map((item) => {
              const startId = Object.keys(connectedItems).find(k => connectedItems[k] === item.id);
              const isError = startId ? errorLines.includes(startId) : false;
              const isCorrect = startId ? correctLines.includes(startId) : false;

              return (
                <RightColItem
                  key={item.id}
                  item={item}
                  compact={compact}
                  isConnected={!!startId}
                  isError={isError}
                  isCorrect={isCorrect}
                  onNodeRef={(el) => { nodeRefs.current[item.id] = el; }}
                />
              );
            })}
          </div>
        </div>

        {/* Check & Reset Controls */}
        <div className="z-20 w-fit mx-auto">
          <GameControls
            onCheck={handleCheck}
            onReset={handleReset}
            isAllFilled={isAllFilled}
            isCompleted={isCompleted}
          />
        </div>

      </div>

      <HelpButton
        steps={[
          { emoji: "❓", text: "อ่านชื่อและดูรูปในแต่ละช่อง" },
          { emoji: "🔑", text: "ลากเส้นจากกุญแจ ไปหาแม่กุญแจที่จับคู่กัน" },
          { emoji: "✅", text: "ลากให้ครบทุกเส้น แล้วกดตรวจคำตอบ!" },
        ]}
      />

      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              มาฝึกโยงเส้นเงื่อนไขกันเถอะ!<br />
              สิ่งที่เกิดขึ้นด้านซ้าย จะส่งผลให้เกิดอะไรขึ้นในด้านขวา?
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Coco/coco-03.svg"
          imageAlt="Coco"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="conditional-matching"
          onRetry={handleRetry}
        />
      )}

      {(user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0) && <OutOfLivesModal />}
    </div>
  );
}
