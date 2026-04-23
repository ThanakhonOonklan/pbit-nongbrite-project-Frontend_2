"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ExitConfirmModal } from "@/components/games/ExitConfirmModal";
import { GameHearts } from "@/components/games/GameHearts";

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
    const [showExitModal, setShowExitModal] = useState(false);

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
                    <span className="hidden sm:inline">กลับ</span>
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
                    <span className="text-xs text-white/40 shrink-0 hidden sm:inline">· ด่าน {level}</span>
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
