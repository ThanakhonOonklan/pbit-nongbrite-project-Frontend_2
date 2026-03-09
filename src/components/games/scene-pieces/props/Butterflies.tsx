"use client";

interface ButterfliesProps {
    count?: number;
}

const POSITIONS = [
    { left: "22%", top: "30%" },
    { left: "62%", top: "22%" },
    { left: "38%", top: "40%" },
    { left: "72%", top: "35%" },
];

export function Butterflies({ count = 2 }: ButterfliesProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {POSITIONS.slice(0, count).map((pos, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: pos.left,
                        top: pos.top,
                        fontSize: 16,
                        animation: `butterflyDrift ${3.2 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`,
                    }}
                >
                    🦋
                </div>
            ))}
            <style>{`
                @keyframes butterflyDrift {
                    0%   { transform: translate(0, 0) rotate(-5deg); }
                    25%  { transform: translate(12px, -10px) rotate(5deg); }
                    50%  { transform: translate(-8px, -18px) rotate(-3deg); }
                    75%  { transform: translate(6px, -8px) rotate(6deg); }
                    100% { transform: translate(0, 0) rotate(-5deg); }
                }
            `}</style>
        </div>
    );
}
