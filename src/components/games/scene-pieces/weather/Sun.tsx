"use client";

export function Sun() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Sun orb */}
            <div
                className="absolute"
                style={{ top: "9%", right: "9%", animation: "sunPulse 3s ease-in-out infinite" }}
            >
                <div style={{
                    width: 54, height: 54, borderRadius: "50%",
                    background: "radial-gradient(circle, #FFE566 40%, #FFB300 100%)",
                    boxShadow: "0 0 28px 10px rgba(255,200,0,0.4)",
                }} />
            </div>
            {/* Rays */}
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        width: "2px",
                        height: `${22 + (i % 3) * 8}px`,
                        background: "rgba(255,210,50,0.4)",
                        right: `${(11 + Math.sin((i * 36) * Math.PI / 180) * 5).toFixed(2)}%`,
                        top: `${(13 + Math.cos((i * 36) * Math.PI / 180) * 5).toFixed(2)}%`,
                        transform: `rotate(${i * 36}deg)`,
                        transformOrigin: "top center",
                        animation: `sunRay ${(1.8 + i * 0.25).toFixed(2)}s ease-in-out ${(i * 0.18).toFixed(2)}s infinite`,
                    }}
                />
            ))}
            {/* Small cloud */}
            <div className="absolute" style={{ top: "12%", left: "6%", animation: "cloudDrift 7s ease-in-out infinite alternate" }}>
                <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 999, width: 74, height: 26, position: "relative" }}>
                    <div style={{ background: "rgba(255,255,255,0.85)", borderRadius: 999, width: 42, height: 24, position: "absolute", top: -13, left: 14 }} />
                </div>
            </div>
            <style>{`
                @keyframes sunPulse { 0%,100%{opacity:.9;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
                @keyframes sunRay   { 0%,100%{opacity:.3} 50%{opacity:.65} }
                @keyframes cloudDrift{ 0%{transform:translateX(0)} 100%{transform:translateX(28px)} }
            `}</style>
        </div>
    );
}
