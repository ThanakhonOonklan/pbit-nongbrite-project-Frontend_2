"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TiltButton } from "react-tilt-button";
import { FaArrowRight, FaRedo, FaHome } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { type ScoreResult, getStarRating } from "@/utils/game-scoring";
import { StarRating } from "@/components/common/StarRating";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { createGamePath, markGameNavigation } from "@/utils/game-navigation";

interface GameResultModalProps {
  levelNum: number;
  score: ScoreResult;
  attempts: number;
  timeSeconds: number;
  totalLevels?: number;
  gamePath?: string;
  onRetry: () => void;
  type?: "win" | "lose";
}

export function GameResultModal({
  levelNum,
  score,
  attempts,
  timeSeconds,
  totalLevels = 9,
  gamePath = "path-navigation",
  onRetry,
  type = "win",
}: GameResultModalProps) {
  const router = useRouter();
  const t = useTranslations("GameResultModal");
  const hasNextLevel = levelNum < totalLevels;
  const { stars } = getStarRating(score.totalScore);
  const [isNavigating, setIsNavigating] = useState(false);

  const goHome = () => {
    setIsNavigating(true);
    router.push("/courses");
  };

  const goNextLevel = () => {
    const nextGamePath = createGamePath(gamePath, levelNum + 1);

    markGameNavigation(nextGamePath, { skipUnlockCheck: true });
    setIsNavigating(true);
    router.push(nextGamePath);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 
      ? `${t("minuteUnit", { m })} ${t("secondUnit", { s })}` 
      : t("secondUnit", { s });
  };

  const effectiveType = type === "win" && stars === 0 ? "lose" : type;

  // Fire confetti and play randomized audio
  useEffect(() => {
    let winAudio: HTMLAudioElement | null = null;
    let praiseAudio: HTMLAudioElement | null = null;
    let loseAudio: HTMLAudioElement | null = null;
    let timer: NodeJS.Timeout;

    if (effectiveType === "win") {
      import('canvas-confetti').then(mod => {
        mod.default({ particleCount: 80, spread: 70, origin: { y: 0.6 }, ticks: 120, gravity: 0.9, decay: 0.9 });
      });

      // สุ่มเสียงเพลงชนะ (win_1.mp3 หรือ win_2.mp3)
      const winNum = Math.random() < 0.5 ? 1 : 2;
      winAudio = new Audio(`/audio/sfx/win_${winNum}.mp3`);
      winAudio.volume = 0.6; // ลดความดังเล็กน้อยเพื่อให้เสียงพูดเด่นชัดขึ้น
      winAudio.play().catch(() => {});

      // สุ่มเสียงพูดชมเชย (praise_1.wav หรือ praise_2.wav)
      const praiseNum = Math.random() < 0.5 ? 1 : 2;
      praiseAudio = new Audio(`/audio/sfx/praise_${praiseNum}.wav`);
      praiseAudio.volume = 1.0;
      // เล่นหลังจากเล่นเพลงสั้นน้อยๆ เพื่อให้เสียงเข้ากันได้นุ่มนวล
      timer = setTimeout(() => {
        if (praiseAudio) {
          praiseAudio.play().catch(() => {});
        }
      }, 150);
    } else if (effectiveType === "lose") {
      // สุ่มเสียงแพ้ / ลองใหม่ (tryagain_1.wav หรือ tryagain_2.wav)
      const loseNum = Math.random() < 0.5 ? 1 : 2;
      loseAudio = new Audio(`/audio/sfx/tryagain_${loseNum}.wav`);
      loseAudio.volume = 1.0;
      loseAudio.play().catch(() => {});
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (winAudio) {
        winAudio.pause();
        winAudio.currentTime = 0;
      }
      if (praiseAudio) {
        praiseAudio.pause();
        praiseAudio.currentTime = 0;
      }
      if (loseAudio) {
        loseAudio.pause();
        loseAudio.currentTime = 0;
      }
    };
  }, [effectiveType]);

  return (
    <>
      <LoadingOverlay isLoading={isNavigating} message={t("loading")} />
      {!isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-[360px] rounded-3xl overflow-hidden shadow-2xl bg-white border-2"
            style={{ animation: "modalIn 0.35s ease-out" }}
          >
            {/* Title */}
            <div className="pt-6 pb-2 text-center">
              {effectiveType === "win" ? (
                <>
                  <p className="text-gray-800 text-sm font-bold">Level {levelNum}</p>
                  <h2 className="text-3xl font-extrabold text-[#1CB0F6] mt-1">
                    {t("success")}
                  </h2>
                </>
              ) : (
                <>
                  <p className="text-gray-800 text-sm font-bold">Level {levelNum}</p>
                  <h2 className="text-3xl font-extrabold text-[#FF4B4B] mt-1">
                    {t("failed")}
                  </h2>
                </>
              )}
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center pb-1">
              <StarRating stars={stars} size={44} animated={effectiveType === "win"} className="modal-stars" />
            </div>

            {/* Image */}
            <div className="flex justify-center py-4">
              <Image
                src={effectiveType === "win" ? "/images/Nong_brite/nong-brite-01.svg" : "/images/Nong_brite/nong-brite-02.svg"}
                alt="Nong Brite"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Time info (small) */}
            <p className="text-center text-gray-400 text-xs pb-4">
              {t("timeUsed", { time: formatTime(timeSeconds) })}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 px-6 pb-6">
              {effectiveType === "win" ? (
                <>
                  {/* Left button */}
                  <div className="flex-1">
                    <TiltButton
                      width="100%"
                      height={52}
                      elevation={6}
                      pressInset={6}
                      tilt={0.5}
                      radius={14}
                      motion={60}
                      surfaceColor="#E5E7EB"
                      sideColor="#D1D5DB"
                      textColor="#374151"
                      borderColor="transparent"
                      borderWidth={0}
                      glareOpacity={0}
                      glareWidth={0}
                      onClick={onRetry}
                    >
                      <span className="flex items-center justify-center gap-2 font-bold text-sm">
                        <FaRedo className="w-3 h-3" /> {t("playAgain")}
                      </span>
                    </TiltButton>
                  </div>
                  {/* Right button */}
                  <div className="flex-1">
                    <TiltButton
                      width="100%"
                      height={52}
                      elevation={6}
                      pressInset={6}
                      tilt={0.5}
                      radius={14}
                      motion={60}
                      surfaceColor="#1CB0F6"
                      sideColor="#0A8ED9"
                      textColor="#ffffff"
                      borderColor="transparent"
                      borderWidth={0}
                      glareOpacity={0}
                      glareWidth={0}
                      onClick={hasNextLevel
                        ? goNextLevel
                        : goHome
                      }
                    >
                      <span className="flex items-center justify-center gap-2 font-bold text-sm">
                        {hasNextLevel ? (
                          <>{t("nextLevel")} <FaArrowRight className="w-3.5 h-3.5" /></>
                        ) : (
                          <><FaHome className="w-3.5 h-3.5" /> {t("home")}</>
                        )}
                      </span>
                    </TiltButton>
                  </div>
                </>
              ) : (
                <div className="flex-1 w-full">
                  <TiltButton
                    width="100%"
                    height={52}
                    elevation={6}
                    pressInset={6}
                    tilt={0.5}
                    radius={14}
                    motion={60}
                    surfaceColor="#1CB0F6"
                    sideColor="#0A8ED9"
                    textColor="#ffffff"
                    borderColor="transparent"
                    borderWidth={0}
                    glareOpacity={0}
                    glareWidth={0}
                    onClick={onRetry}
                  >
                    <span className="flex items-center justify-center gap-2 font-bold text-sm">
                      <FaRedo className="w-3.5 h-3.5" /> {t("tryAgain")}
                    </span>
                  </TiltButton>
                </div>
              )}
            </div>
          </div>

          <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-stars .star-rating-item:nth-child(2) {
                    transform: scale(1.4) translateY(-4px);
                }
            `}</style>
        </div>
      )}
    </>
  );
}
