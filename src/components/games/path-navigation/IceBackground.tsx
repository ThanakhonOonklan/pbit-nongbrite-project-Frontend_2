"use client";

// ── Hardcoded snowflake positions (no Math.random — avoids hydration errors) ──
const SNOWFLAKES = [
    { id: 1,  left: "5%",  size: 3, duration: 8,  delay: 0,   drift: 12 },
    { id: 2,  left: "12%", size: 2, duration: 11, delay: 2,   drift: -8 },
    { id: 3,  left: "20%", size: 4, duration: 9,  delay: 5,   drift: 15 },
    { id: 4,  left: "28%", size: 2, duration: 13, delay: 1,   drift: -10 },
    { id: 5,  left: "37%", size: 3, duration: 10, delay: 4,   drift: 8 },
    { id: 6,  left: "45%", size: 2, duration: 12, delay: 7,   drift: -12 },
    { id: 7,  left: "54%", size: 4, duration: 8,  delay: 3,   drift: 10 },
    { id: 8,  left: "62%", size: 2, duration: 14, delay: 6,   drift: -6 },
    { id: 9,  left: "70%", size: 3, duration: 9,  delay: 0.5, drift: 14 },
    { id: 10, left: "78%", size: 2, duration: 11, delay: 3.5, drift: -9 },
    { id: 11, left: "86%", size: 3, duration: 10, delay: 2,   drift: 7 },
    { id: 12, left: "93%", size: 2, duration: 13, delay: 5,   drift: -11 },
];

export function IceBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* ── Arctic sky gradient ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to bottom, #020B18 0%, #071B30 50%, #0D2D4A 100%)",
                }}
            />

            {/* ── Snowflakes ── */}
            {SNOWFLAKES.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: flake.left,
                        top: "-10px",
                        width: flake.size,
                        height: flake.size,
                        opacity: 0.65,
                        animation: `snowfall-${flake.id} ${flake.duration}s linear ${flake.delay}s infinite`,
                    }}
                />
            ))}

            {/* ── Snow hills — back layer ── */}
            <div
                className="absolute bottom-[-4%] left-[-15%] right-[5%]"
                style={{
                    height: "22%",
                    background: "linear-gradient(to bottom, #8BB8D4, #6A9AB8)",
                    borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                    opacity: 0.7,
                }}
            />

            {/* ── Snow hills — front layer ── */}
            <div
                className="absolute bottom-[-6%] left-[8%] right-[-15%]"
                style={{
                    height: "20%",
                    background: "linear-gradient(to bottom, #E8F4FD, #C5E0EF)",
                    borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                    opacity: 0.85,
                }}
            />

            {/* ── CSS Animations ── */}
            <style>{`
                ${SNOWFLAKES.map(
                    (f) => `
                @keyframes snowfall-${f.id} {
                    0%   { transform: translateY(-10px) translateX(0px); opacity: 0; }
                    10%  { opacity: 0.65; }
                    90%  { opacity: 0.5; }
                    100% { transform: translateY(100vh) translateX(${f.drift}px); opacity: 0; }
                }`
                ).join("\n")}
            `}</style>
        </div>
    );
}
