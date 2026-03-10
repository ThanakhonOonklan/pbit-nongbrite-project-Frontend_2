"use client";

interface FlowersProps {
    positions?: string[]; // CSS left percentages
}

const defaultPositions = ["10%", "32%", "58%", "80%"];

export function Flowers({ positions = defaultPositions }: FlowersProps) {
    return (
        <>
            {positions.map((left, i) => (
                <div
                    key={i}
                    className="absolute select-none z-20"
                    style={{ bottom: "24%", left, fontSize: 18 }}
                >
                    {i % 2 === 0 ? "🌸" : "🌼"}
                </div>
            ))}
        </>
    );
}
