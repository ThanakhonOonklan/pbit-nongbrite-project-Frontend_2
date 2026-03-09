"use client";

interface BirdsProps {
    count?: number;
}

export function Birds({ count = 3 }: BirdsProps) {
    // Birds fly from left to right at different heights and speeds
    const birds = Array.from({ length: count }, (_, i) => ({
        top: `${8 + i * 7}%`,
        duration: `${7 + i * 2.5}s`,
        delay: `${i * 2.2}s`,
        size: i === 0 ? 18 : 14,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
            {birds.map((b, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        top: b.top,
                        left: 0,
                        fontSize: b.size,
                        animation: `birdFly ${b.duration} linear ${b.delay} infinite`,
                    }}
                >
                    🐦
                </div>
            ))}
            <style>{`
                @keyframes birdFly {
                    0%   { transform: translateX(-40px); opacity: 0; }
                    5%   { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateX(calc(100vw + 60px)); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
