"use client";

import Image from "next/image";

interface ScenarioCardProps {
    situationText: string;
    questionText: string;
    sceneEmoji: string;
    sceneBgFrom: string;
    sceneBgTo: string;
    /** "correct" | "wrong" | null — สำหรับ flash animation */
    answerState?: "correct" | "wrong" | null;
}

export function ScenarioCard({
    situationText,
    questionText,
    sceneEmoji,
    sceneBgFrom,
    sceneBgTo,
    answerState,
}: ScenarioCardProps) {
    const flashClass =
        answerState === "correct"
            ? "ring-4 ring-[#58CC02] ring-offset-2"
            : answerState === "wrong"
                ? "ring-4 ring-[#FF4B4B] ring-offset-2"
                : "";

    return (
        <div className="w-full max-w-lg mx-auto px-4 flex flex-col gap-3">

            {/* ── Situation banner ── */}
            <div
                className="rounded-xl px-4 py-2.5 text-center"
                style={{ background: "linear-gradient(90deg, #FF9A2E, #FFB356)" }}
            >
                <p className="text-white font-extrabold text-sm leading-snug">
                    {situationText}
                </p>
            </div>

            {/* ── Scene card ── */}
            <div
                className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ${flashClass}`}
                style={{
                    background: `linear-gradient(160deg, ${sceneBgFrom} 0%, ${sceneBgTo} 100%)`,
                    minHeight: "200px",
                }}
            >
                {/* Rain animation overlay (สำหรับฉากฝนตก) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 rounded-full opacity-40"
                            style={{
                                left: `${(i * 5.5) % 100}%`,
                                top: "-10%",
                                height: `${14 + (i % 5) * 4}px`,
                                background: "rgba(147,210,255,0.8)",
                                animation: `rainDrop ${0.7 + (i % 4) * 0.2}s linear ${(i * 0.12) % 0.8}s infinite`,
                            }}
                        />
                    ))}
                </div>

                {/* Big scene emoji */}
                <div className="absolute top-3 right-4 text-5xl opacity-60 select-none">
                    {sceneEmoji}
                </div>

                {/* Coco character */}
                <div className="flex items-end justify-center pt-6 pb-4 relative z-10">
                    <Image
                        src="/images/P_Coco/coco-03.svg"
                        alt="โคโค่"
                        width={130}
                        height={130}
                        className="object-contain drop-shadow-lg"
                        style={{
                            animation: answerState === "wrong"
                                ? "shake 0.4s ease"
                                : answerState === "correct"
                                    ? "bounceUp 0.4s ease"
                                    : "float 3s ease-in-out infinite",
                        }}
                    />
                </div>

                {/* Bit helper (มุมซ้ายล่าง) */}
                <div className="absolute bottom-2 left-3 z-10">
                    <Image
                        src="/images/P_Bit/bit-04.svg"
                        alt="พี่บิด"
                        width={44}
                        height={44}
                        className="object-contain opacity-90"
                        style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
                    />
                </div>
            </div>

            {/* ── Question text ── */}
            <div className="text-center">
                <p className="text-white font-extrabold text-base leading-snug">
                    {questionText}
                </p>
            </div>

            <style>{`
                @keyframes rainDrop {
                    0%   { transform: translateY(-10px); opacity: 0; }
                    10%  { opacity: 0.5; }
                    90%  { opacity: 0.4; }
                    100% { transform: translateY(260px); opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-7px); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%      { transform: translateX(-8px); }
                    40%      { transform: translateX(8px); }
                    60%      { transform: translateX(-6px); }
                    80%      { transform: translateX(6px); }
                }
                @keyframes bounceUp {
                    0%   { transform: translateY(0); }
                    40%  { transform: translateY(-18px); }
                    70%  { transform: translateY(-8px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
