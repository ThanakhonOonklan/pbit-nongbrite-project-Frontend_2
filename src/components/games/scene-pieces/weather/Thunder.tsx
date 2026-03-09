"use client";

export function Thunder() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Dark cloud */}
            <div className="absolute" style={{ top: "5%", left: "22%", animation: "cloudDrift 5s ease-in-out infinite alternate" }}>
                <div style={{ background: "#445", borderRadius: 999, width: 116, height: 38, position: "relative" }}>
                    <div style={{ background: "#445", borderRadius: 999, width: 62, height: 34, position: "absolute", top: -18, left: 18 }} />
                    <div style={{ background: "#334", borderRadius: 999, width: 44, height: 28, position: "absolute", top: -13, left: 60 }} />
                </div>
            </div>
            {/* Lightning bolt */}
            <div className="absolute" style={{ top: "22%", left: "46%", fontSize: 30, animation: "lightning 2.2s linear infinite" }}>⚡</div>
            {/* Heavy rain */}
            {Array.from({ length: 32 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${(i * 3.2) % 100}%`,
                        top: "-5%",
                        width: 1.5,
                        height: `${14 + (i % 4) * 4}px`,
                        background: "rgba(100,140,200,0.65)",
                        borderRadius: 2,
                        animation: `rainDrop ${0.4 + (i % 4) * 0.09}s linear ${(i * 0.055) % 0.5}s infinite`,
                    }}
                />
            ))}
            <style>{`
                @keyframes rainDrop  { 0%{transform:translateY(-20px);opacity:0} 8%{opacity:.75} 90%{opacity:.5} 100%{transform:translateY(420px);opacity:0} }
                @keyframes cloudDrift{ 0%{transform:translateX(0)} 100%{transform:translateX(24px)} }
                @keyframes lightning { 0%,88%,100%{opacity:0} 90%,94%{opacity:.7} }
            `}</style>
        </div>
    );
}
