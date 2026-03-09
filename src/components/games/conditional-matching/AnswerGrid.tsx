"use client";

import type { CondMatchAnswer } from "@/constants/games/conditional-matching-levels";

interface AnswerGridProps {
    answers: CondMatchAnswer[];
    answerState: "correct" | "wrong" | null;
    lastPickedId: string | null;
    onAnswer: (answer: CondMatchAnswer) => void;
    disabled?: boolean;
}

export function AnswerGrid({
    answers,
    answerState,
    lastPickedId,
    onAnswer,
    disabled,
}: AnswerGridProps) {
    return (
        <div className="w-full px-2 grid grid-cols-3 gap-3">
            {answers.map((ans) => {
                const isPicked = ans.id === lastPickedId;
                const isCorrectPicked = isPicked && answerState === "correct";
                const isWrongPicked = isPicked && answerState === "wrong";

                let bgColor = "rgba(255,255,255,0.07)";
                let borderColor = "rgba(255,255,255,0.18)";
                let textColor = "#F1F7FB";
                let animClass = "";

                if (isCorrectPicked) {
                    bgColor = "rgba(88,204,2,0.25)";
                    borderColor = "#58CC02";
                    textColor = "#58CC02";
                    animClass = "scale-105";
                } else if (isWrongPicked) {
                    bgColor = "rgba(255,75,75,0.20)";
                    borderColor = "#FF4B4B";
                    textColor = "#FF4B4B";
                    animClass = "ans-shake";
                }

                return (
                    <button
                        key={ans.id}
                        onClick={() => !disabled && onAnswer(ans)}
                        disabled={disabled}
                        className={`
                            flex flex-row items-center justify-start gap-3
                            rounded-2xl border-2 py-4 px-4
                            font-bold text-base text-left leading-tight
                            transition-all duration-200
                            ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-[1.04] active:scale-95 hover:bg-white/10"}
                            ${animClass}
                        `}
                        style={{
                            background: bgColor,
                            borderColor,
                            color: textColor,
                        }}
                    >
                        <span className="text-3xl leading-none shrink-0">{ans.emoji}</span>
                        <span>{ans.text}</span>
                    </button>
                );
            })}

            <style>{`
                @keyframes ansShake {
                    0%, 100% { transform: translateX(0); }
                    20%      { transform: translateX(-6px); }
                    40%      { transform: translateX(6px); }
                    60%      { transform: translateX(-4px); }
                    80%      { transform: translateX(4px); }
                }
                .ans-shake { animation: ansShake 0.35s ease; }
            `}</style>
        </div>
    );
}
