"use client";

import Image from "next/image";
import { useEffect } from "react";

export type GameOverlayType = "error" | "hint";

interface GameOverlayProps {
    type: GameOverlayType;
    message: string;
    imageSrc?: string;
    imageAlt?: string;
    autoDismissMs?: number;
    onDismiss?: () => void;
}

const OVERLAY_STYLES: Record<GameOverlayType, string> = {
    error: "bg-black/40",
    hint: "bg-black/50",
};

const IMAGE_BORDER: Record<GameOverlayType, string> = {
    error: "",
    hint: "",
};

export function GameOverlay({
    type,
    message,
    imageSrc,
    imageAlt = "overlay image",
    autoDismissMs = 1800,
    onDismiss,
}: GameOverlayProps) {
    useEffect(() => {
        if (!autoDismissMs || !onDismiss) return;
        const t = setTimeout(onDismiss, autoDismissMs);
        return () => clearTimeout(t);
    }, [autoDismissMs, onDismiss]);

    return (
        <div
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-sm cursor-pointer select-none ${OVERLAY_STYLES[type]}`}
            onClick={onDismiss}
            style={{ animation: "fadeIn 0.2s ease-out" }}
        >
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={140}
                    height={140}
                    className={`object-contain mb-4 ${IMAGE_BORDER[type]}`}
                />
            )}
            <p className="text-white text-2xl font-extrabold text-center px-8 leading-relaxed">
                {message}
            </p>
        </div>
    );
}
