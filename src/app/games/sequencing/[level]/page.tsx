"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GameHeader } from "@/components/games/GameHeader";
import { GameResultModal } from "@/components/games/GameResultModal";
import { HelpButton } from "@/components/games/HelpButton";
import { type ScoreResult } from "@/utils/game-scoring";

import { sequencingLevels } from "@/constants/games/sequencing-levels";
import { SequencingGame } from "@/components/games/sequencing/SequencingGame";

export default function SequencingPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [levelNum, setLevelNum] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Win/Lose condition stats
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Handle URL changes to set level number
  useEffect(() => {
    setIsClient(true);
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const parsed = parseInt(lastPart, 10);
    if (!isNaN(parsed)) {
      setLevelNum(parsed);
    }
  }, [pathname]);

  // Handle Start Timer Reset
  useEffect(() => {
    setStartTime(Date.now());
  }, [levelNum]);

  // Get current logic configuration
  const config = sequencingLevels.find((l) => l.level === levelNum) || sequencingLevels[0];

  const handleGameEnd = (result: ScoreResult, attempts: number, elapsed: number) => {
    // Determine win vs lose based on whether attempts exceeded bounds (attempts includes hints now)
    // If the check was incorrect, wrongCount was incremented before this call
    if (attempts > 0 && result.totalScore < 100) {
      // Using an arbitrary condition for now: If we submitted wrong, GridColorGame uses wrongCount logic.
      // We will define specific "lose" trigger for sequencing as trying Check with inaccurate items.
    }

    // In our SequencingGame, handleCheck sends 'wrongCount + 1' if not a match, or 'wrongCount' if matches
    // But since attempts contains both hints and real wrongs, we need to track if we failed the check
    const isWin = result.totalScore > 0; // Or better condition

    setScoreResult(result);
    setWrongCount(attempts);
    setElapsedSeconds(elapsed);
  };

  const handleRetry = () => {
    setScoreResult(null);
    setWrongCount(0);
    setElapsedSeconds(0);
    setStartTime(Date.now());
    // In NextJS 14 app router, could also router.refresh() if truly stateless, 
    // but React states in SequencingGame depends on config prop updates, so it won't reset.
    // Instead we can unmount/remount
  };

  const handleBack = () => router.push("/courses");

  // A tiny hack to force component remount on retry since we stay on same page
  const gameKey = `${levelNum}-${startTime}`;

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] to-[#FAF5FF] ">
      {/* Top Header */}
      <GameHeader
        gameTitle="เกมเรียงลำดับวงจรชีวิต"
        level={levelNum}
        onBack={handleBack}
        bgColor="#9956DE"
      />

      <main className="max-w-7xl mx-auto px-6 py-6 pb-24 relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">

        <SequencingGame
          key={gameKey}
          config={config}
          onGameEnd={handleGameEnd}
          startTime={startTime}
        />

        {/* Floating Help Button */}
        <HelpButton
          steps={[
            { emoji: "1", text: "ดูหัวข้อด้านบนว่าคือวงจรชีวิตของอะไร (เช่น กบ, ต้นไม้)" },
            { emoji: "2", text: "แตะที่ภาพด้านล่างเพื่อเลือกจัดวางในช่องด้านบน" },
            { emoji: "3", text: "คุณสามารถยกเลิกการวางได้ด้วยการกดปุ่มกากบาท (x) สีแดง" },
            { emoji: "4", text: "เมื่อจัดเรียงวงจรชีวิตครบทุกช่องแล้ว กดปุ่ม ตรวจสอบ (Check)!" },
            { emoji: "💡", text: "ถ้าคิดไม่ออก กดปุ่ม คำใบ้ (Hint) ได้เลยนะ" },
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
    </div>
  );
}