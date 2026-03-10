"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import type { ComponentType } from "react";
import { ExitConfirmModal } from "@/components/games/ExitConfirmModal";

interface GameHeaderProps {
    level: string | number;
    gameTitle: string;
    characterSrc?: string;
    icon?: ComponentType<{ className?: string }>;
    iconColor?: string;
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
                className="flex items-center px-4 py-2 shrink-0"
                style={{ backgroundColor: bgColor }}
            >
                <button
                    onClick={() => setShowExitModal(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mr-4"
                >
                    <FaArrowLeft className="w-3 h-3" />
                    <span>กลับ</span>
                </button>
                <div className="h-4 w-px bg-white/20 mr-4" />
                <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={characterSrc}
                        alt="character"
                        className="w-5 h-5 object-contain"
                        style={{ filter: "brightness(0) invert(1) opacity(0.7)" }}
                    />
                    <span className="text-sm font-bold text-white/90">{gameTitle}</span>
                    <span className="text-xs text-white/40">· ด่าน {level}</span>
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
