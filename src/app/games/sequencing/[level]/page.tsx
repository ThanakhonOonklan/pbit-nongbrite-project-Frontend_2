"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import { TutorialModal } from "@/components/games/TutorialModal";
import { sequencingTutorialSteps } from "@/components/games/tutorials";
import { type ScoreResult } from "@/utils/game-scoring";

import { sequencingLevels, SequencingPattern } from "@/constants/games/sequencing-levels";
import { SequencingGame } from "@/components/games/sequencing/SequencingGame";
import { useUserStore } from "@/store/user.store";
import { OutOfLivesModal } from "@/components/common";

export default function SequencingPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [levelNum, setLevelNum] = useState<number>(1);
  const [activePattern, setActivePattern] = useState<SequencingPattern | null>(null);

  const [isClient, setIsClient] = useState(false);
  const { user, reduceLife } = useUserStore();
  const [startTime, setStartTime] = useState(() => Date.now());

  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showWrongOverlay, setShowWrongOverlay] = useState(false);


  useEffect(() => {
    setIsClient(true);
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const parsed = parseInt(lastPart, 10);
    if (!isNaN(parsed)) {
      setLevelNum(parsed);
      if (parsed === 1) setShowIntro(true);
    }
  }, [pathname]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [levelNum]);

  const config = sequencingLevels.find((l) => l.level === levelNum);

  useEffect(() => {
    if (config && config.patterns.length > 0) {
      const randomIndex = Math.floor(Math.random() * config.patterns.length);
      setActivePattern(config.patterns[randomIndex]);
      setStartTime(Date.now());
    }
  }, [config, levelNum])

  if (!isClient) return null;

  if (!config || !activePattern) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0620]">
        <div className="flex flex-col items-center text-center gap-4">
          <Image src="/images/P_Momo/momo-03.svg" alt="Momo" width={110} height={110} className="object-contain drop-shadow-lg" />
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#7C3AED] text-white rounded-xl font-bold hover:bg-[#6D28D9] transition-colors shadow-md"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  const handleGameEnd = (result: ScoreResult, attempts: number, elapsed: number) => {
    setScoreResult(result);
    setWrongCount(attempts);
    setElapsedSeconds(elapsed);
  };

  const handleRetry = () => {
    if (config && config.patterns.length > 1) {
      // สุ่มหา Pattern ใหม่ที่ไม่ซ้ำกับของเดิม
      const availablePatterns = config.patterns.filter(p => p.theme !== activePattern?.theme);
      const randomIndex = Math.floor(Math.random() * availablePatterns.length);
      setActivePattern(availablePatterns[randomIndex]);
    }

    setScoreResult(null);
    setWrongCount(0);
    setElapsedSeconds(0);
    setStartTime(Date.now());
  };

  const handleBack = () => router.push("/courses");

  const gameKey = `${levelNum}-${startTime}`;
  const isOutOfLives = user?.life?.lifeCurrent !== undefined && user.life.lifeCurrent <= 0;
  const hasGameResult = Boolean(scoreResult);
  const canShowGameOverlay = !isOutOfLives && !hasGameResult;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0620] relative overflow-hidden  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Background/sequencingBackground.png')" }}>
      {/* Cosmic Background */}

      {/* Top Header */}
      <div className="relative z-50 w-full">
        <GameHeader
          gameTitle="เกมเรียงลำดับวงจรชีวิต"
          level={levelNum}
          onBack={handleBack}
          bgColor="#7C3AED"
          characterSrc="/images/P_Momo/momo-03.svg"
        />
      </div>


      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 relative z-10">

        <SequencingGame
          key={gameKey}
          config={config}
          pattern={activePattern}
          onGameEnd={handleGameEnd}
          onWrongAttempt={() => {
            reduceLife();
            setShowWrongOverlay(true);
          }}
          startTime={startTime}
        />

        {/* Floating Help Button */}
        <HelpButton onClick={() => setShowIntro(true)} color="#7C3AED" />
      </main>

      {/* WIN/LOSE modal */}
      {scoreResult && !isOutOfLives && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="sequencing"
          onRetry={handleRetry}
        />
      )}

      {/* ===== OUT OF LIVES MODAL ===== */}
      {isOutOfLives && <OutOfLivesModal />}

      {/* ===== INTRO TUTORIAL (Level 1 only) ===== */}
      {showIntro && (
        <TutorialModal
          steps={sequencingTutorialSteps}
          onClose={() => setShowIntro(false)}
          mascotSrc="/images/P_Momo/momo-03.svg"
          accentColor="#7C3AED"
        />
      )}


      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {canShowGameOverlay && showWrongOverlay && (
        <GameOverlay
          type="error"
          message={`ลองจัดเรียงใหม่อีกครั้งนะ`}
          imageSrc="/images/P_Momo/momo-05.svg"
          imageAlt="Momo"
          autoDismissMs={2000}
          onDismiss={() => setShowWrongOverlay(false)}
        />
      )}
    </div>
  );
}
