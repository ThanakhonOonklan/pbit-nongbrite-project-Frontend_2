"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { GameOverlay } from "@/components/games/GameOverlay";
import { type ScoreResult } from "@/utils/game-scoring";

import { sequencingLevels } from "@/constants/games/sequencing-levels";
import { SequencingGame } from "@/components/games/sequencing/SequencingGame";

export default function SequencingPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [levelNum, setLevelNum] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

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

  if (!isClient) return null;

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#131F24]">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-end justify-center gap-2">
            <Image
              src="/images/P_Momo/momo-03.svg"
              alt="Momo"
              width={110}
              height={110}
              className="object-contain"
            />
          </div>
          <p className="text-white text-xl font-bold">ไม่พบด่านนี้</p>
          <button
            onClick={() => router.push("/courses")}
            className="mt-2 px-6 py-2 bg-[#9956DE] text-white rounded-xl font-bold hover:bg-[#7A45B2] transition-colors shadow-md"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  const handleGameEnd = (result: ScoreResult, attempts: number, elapsed: number) => {
    if (attempts > 0 && result.totalScore < 100) {
      // Handled visually in the game itself or here
    }

    const isWin = result.totalScore > 0;

    setScoreResult(result);
    setWrongCount(attempts);
    setElapsedSeconds(elapsed);
  };

  const handleRetry = () => {
    setScoreResult(null);
    setWrongCount(0);
    setElapsedSeconds(0);
    setStartTime(Date.now());

  };

  const handleBack = () => router.push("/courses");

  const gameKey = `${levelNum}-${startTime}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F3E8FF] to-[#FAF5FF]">
      {/* Top Header */}
      <GameHeader
        gameTitle="เกมเรียงลำดับวงจรชีวิต"
        level={levelNum}
        onBack={handleBack}
        bgColor="#9956DE"
        characterSrc="/images/P_Momo/momo-03.svg"
      />

      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 pb-24 relative">

        <SequencingGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
          onWrongAttempt={() => setShowWrongOverlay(true)}
          startTime={startTime}
        />

        {/* Floating Help Button */}
        <HelpButton
          steps={[
            { emoji: "1", text: "ดูที่ชื่อเรื่องด้านบนนะ ว่ารูปภาพคือเรื่องราวของอะไร" },
            { emoji: "2", text: "แตะที่ภาพด้านล่างเพื่อเลือกวางในกล่องด้านบน" },
            { emoji: "3", text: "ถ้าจะเปลี่ยนใจ ให้กดปุ่มกากบาท (x) สีแดงได้เลย" },
            { emoji: "4", text: "เมื่อเรียงเสร็จครบทุกช่องแล้ว กดปุ่ม ตรวจสอบ!" },
          ]}
        />
      </main>

      {/* WIN/LOSE modal */}
      {scoreResult && (
        <GameResultModal
          levelNum={levelNum}
          score={scoreResult}
          attempts={wrongCount}
          timeSeconds={elapsedSeconds}
          gamePath="sequencing"
          onRetry={handleRetry}
        />
      )}

      {/* ===== INTRO OVERLAY (Level 1 only) ===== */}
      {showIntro && (
        <GameOverlay
          type="hint"
          message={
            <>
              มาช่วยน้องไบร์ทเรียงลำดับ<br />วงจรชีวิตให้ถูกต้องกันเถอะ!
            </>
          }
          subtitle="แตะเพื่อเริ่มเล่น"
          imageSrc="/images/P_Momo/momo-03.svg"
          imageAlt="Nong Brite"
          autoDismissMs={0}
          onDismiss={() => setShowIntro(false)}
        />
      )}

      {/* ===== WRONG ANSWER OVERLAY ===== */}
      {showWrongOverlay && (
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