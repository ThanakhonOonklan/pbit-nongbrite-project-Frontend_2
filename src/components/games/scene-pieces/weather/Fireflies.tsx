"use client";

interface FirefliesProps {
    count?: number;
}

const SPOTS = [
    { left: "15%", top: "45%" },
    { left: "35%", top: "30%" },
    { left: "55%", top: "50%" },
    { left: "70%", top: "38%" },
    { left: "80%", top: "55%" },
    { left: "28%", top: "58%" },
    { left: "48%", top: "42%" },
    { left: "88%", top: "32%" },
];

export function Fireflies({ count = 6 }: FirefliesProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[7]">
            {SPOTS.slice(0, count).map((pos, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: pos.left,
                        top: pos.top,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#ffe066",
                        boxShadow: `0 0 6px 3px #ffe06688, 0 0 14px 6px #ffe06644`,
                        animation: `fireflyBlink ${1.4 + i * 0.37}s ease-in-out ${i * 0.28}s infinite,
                                    fireflyDrift  ${3.0 + i * 0.5}s ease-in-out ${i * 0.5}s infinite`,
                    }}
                />
            ))}
            <style>{`
                @keyframes fireflyBlink {
                    0%,100% { opacity: 0.15; transform: scale(0.7); }
                    50%     { opacity: 1;    transform: scale(1.2); }
                }
                @keyframes fireflyDrift {
                    0%,100% { margin-left: 0;   margin-top: 0; }
                    33%     { margin-left: 8px;  margin-top: -6px; }
                    66%     { margin-left: -5px; margin-top: 5px; }
                }
            `}</style>
        </div>
    );
}
