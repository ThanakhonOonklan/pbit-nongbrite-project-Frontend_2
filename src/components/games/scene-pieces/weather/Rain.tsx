"use client";

export function Rain() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Cloud */}
            <div className="absolute" style={{ top: "7%", left: "28%", animation: "cloudDrift 6s ease-in-out infinite alternate" }}>
                <div style={{ background: "#9bb8cc", borderRadius: 999, width: 96, height: 34, position: "relative" }}>
                    <div style={{ background: "#9bb8cc", borderRadius: 999, width: 54, height: 30, position: "absolute", top: -15, left: 15 }} />
                    <div style={{ background: "#aac4d6", borderRadius: 999, width: 38, height: 24, position: "absolute", top: -11, left: 48 }} />
                </div>
            </div>
            {/* Rain drops */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${(i * 3.4) % 100}%`,
                        top: "-5%",
                        width: 1.5,
                        height: `${12 + (i % 5) * 4}px`,
                        background: "rgba(147,210,255,0.75)",
                        borderRadius: 2,
                        animation: `rainDrop ${0.5 + (i % 5) * 0.11}s linear ${(i * 0.065) % 0.6}s infinite`,
                    }}
                />
            ))}
            <style>{`
                @keyframes rainDrop  { 0%{transform:translateY(-20px);opacity:0} 8%{opacity:.75} 90%{opacity:.5} 100%{transform:translateY(420px);opacity:0} }
                @keyframes cloudDrift{ 0%{transform:translateX(0)} 100%{transform:translateX(28px)} }
            `}</style>
        </div>
    );
}
