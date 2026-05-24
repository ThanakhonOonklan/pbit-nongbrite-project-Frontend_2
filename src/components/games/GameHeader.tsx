"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ExitConfirmModal } from "@/components/games/ExitConfirmModal";
import { GameHearts } from "@/components/games/GameHearts";
import { useTranslations } from "next-intl";

interface GameHeaderProps {
    level: string | number;
    gameTitle: string;
    characterSrc?: string;
    bgColor?: string;
    onBack?: () => void;
}

export function GameHeader({
    level,
    gameTitle,
    characterSrc = "/images/P_Bit/bit-04.svg",
    bgColor = "#131F24",
    onBack,
}: GameHeaderProps) {
    const router = useRouter();
    const t = useTranslations("GameHeader");
    const [showExitModal, setShowExitModal] = useState(false);

    // เล่นเสียงเตือนสุ่ม (thing_1.wav หรือ thing_2.wav) เมื่ออยู่ในเกมนี้นานเกิน 1 นาที
    useEffect(() => {
        let thingAudio: HTMLAudioElement | null = null;
        
        const timer = setTimeout(() => {
            const randomNum = Math.random() < 0.5 ? 1 : 2;
            thingAudio = new Audio(`/audio/sfx/thing_${randomNum}.wav`);
            thingAudio.volume = 1.0;
            thingAudio.play().catch(() => {});
        }, 60000); // 60,000 มิลลิวินาที = 1 นาที

        return () => {
            clearTimeout(timer);
            if (thingAudio) {
                thingAudio.pause();
                thingAudio.currentTime = 0;
            }
        };
    }, []);

    const handleConfirmExit = () => {
        setShowExitModal(false);
        if (onBack) {
            onBack();
        } else {
            router.push("/courses");
        }
    };

    return (
        <>
            <header
                className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 shrink-0"
                style={{ backgroundColor: bgColor }}
            >
                {/* ← ปุ่มกลับ */}
                <button
                    onClick={() => setShowExitModal(true)}
                    className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mr-2 sm:mr-4"
                >
                    <FaArrowLeft className="w-3 h-3" />
                    <span className="hidden sm:inline">{t("back")}</span>
                </button>
                <div className="h-4 w-px bg-white/20 mr-2 sm:mr-4" />

                {/* ชื่อเกม + ด่าน */}
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={characterSrc}
                        alt="character"
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
                        style={{ filter: "brightness(0) invert(1) opacity(0.7)" }}
                    />
                    <span className="text-xs sm:text-sm font-bold text-white/90 truncate max-w-[120px] sm:max-w-none">{gameTitle}</span>
                    <span className="text-xs text-white/40 shrink-0 hidden sm:inline">· {t("level", { level })}</span>
                </div>

                {/* ❤️ Hearts — ชิดขวา */}
                <div className="ml-auto pl-2">
                    <GameHearts />
                </div>
            </header>

            {showExitModal && (
                <ExitConfirmModal
                    onConfirm={handleConfirmExit}
                    onCancel={() => setShowExitModal(false)}
                />
            )}
        </>
    );
}
