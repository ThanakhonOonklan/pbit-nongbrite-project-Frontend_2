"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface TutorialStep {
    title: string;
    content: React.ReactNode;
    hint: string;
    /** Optional audio file path, e.g. "/audio/games/path-navigation/PathNavigation_step1.wav" */
    audio?: string;
}

interface TutorialModalProps {
    steps: TutorialStep[];
    onClose: () => void;
    mascotSrc?: string;
    accentColor?: string;
}

const COOLDOWN_MS = 3000;

export function TutorialModal({
    steps,
    onClose,
    accentColor,
}: TutorialModalProps) {
    const [step, setStep] = useState(0);
    const [ready, setReady] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const isLast = step === steps.length - 1;
    const current = steps[step];
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Tracks whether step-0 audio is still pending (blocked by autoplay policy)
    const pendingStep0Ref = useRef(false);

    /** Stop and discard the currently playing audio */
    const stopAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
    }, []);

    /** Play an audio file immediately — must be called inside a user-gesture handler
     *  OR on mount (step 0 attempt). */
    const playAudio = useCallback((src: string | undefined) => {
        stopAudio();
        if (!src) return;
        const audio = new Audio(src);
        audioRef.current = audio;
        audio.play().catch(() => {
            // Browser blocked autoplay — will retry on first user interaction
            pendingStep0Ref.current = true;
        });
    }, [stopAudio]);

    // Reset 3-second cooldown whenever the step changes
    useEffect(() => {
        setReady(false);
        setCountdown(3);

        const interval = setInterval(() => {
            setCountdown(c => Math.max(0, c - 1));
        }, 1000);

        const timer = setTimeout(() => {
            setReady(true);
            clearInterval(interval);
        }, COOLDOWN_MS);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [step]);

    // Play step-0 audio on mount (autoplay may be blocked)
    useEffect(() => {
        playAudio(steps[0]?.audio);
        return () => stopAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOverlayClick = useCallback(() => {
        // If step-0 audio was blocked by autoplay, retry it on first user click
        if (pendingStep0Ref.current) {
            pendingStep0Ref.current = false;
            playAudio(steps[0]?.audio);
        }

        if (!ready) return;

        if (isLast) {
            stopAudio();
            onClose();
        } else {
            const nextStep = step + 1;
            // Play INSIDE the click handler = user-gesture context = never blocked
            playAudio(steps[nextStep]?.audio);
            setStep(nextStep);
        }
    }, [ready, isLast, onClose, step, steps, playAudio, stopAudio]);

    return (
        <div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer select-none"
            onClick={handleOverlayClick}
            style={{ animation: "fadeIn 0.2s ease-out" }}
        >
            {/* Skip button — always available */}
            <button
                onClick={(e) => { e.stopPropagation(); stopAudio(); onClose(); }}
                className="absolute top-5 right-5 text-white/40 hover:text-white/80 text-sm font-bold transition-colors px-3 py-1.5 rounded-xl hover:bg-white/10"
                aria-label="ข้าม tutorial"
            >
                ข้าม ✕
            </button>

            {/* Animated content — key forces remount on step change */}
            <div
                key={`content-${step}`}
                className="mb-6 pointer-events-none flex justify-center"
                style={{ animation: "bounceIn 0.45s ease-out", minWidth: "min(90vw, 420px)" }}
            >
                {current.content}
            </div>

            {/* Hint */}
            <p className="text-white/70 text-base text-center px-10 mb-6 font-medium">
                {current.hint}
            </p>

            {/* Step dots */}
            <div className="flex gap-2.5 mb-5">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: i === step ? 26 : 10,
                            height: 10,
                            background: i === step
                                ? (accentColor ?? "white")
                                : "rgba(255,255,255,0.3)",
                        }}
                    />
                ))}
            </div>

            {/* Tap prompt / countdown */}
            {ready ? (
                <p className="text-white/60 text-sm animate-pulse">
                    {isLast ? "แตะที่ว่างเพื่อเริ่มเล่น!" : "แตะที่ว่างเพื่อถัดไป"}
                </p>
            ) : (
                <p className="text-white/35 text-sm">
                    รอ {countdown} วิ...
                </p>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes bounceIn {
                    0%   { opacity: 0; transform: scale(0.5) translateY(20px); }
                    60%  { transform: scale(1.05) translateY(-5px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}
