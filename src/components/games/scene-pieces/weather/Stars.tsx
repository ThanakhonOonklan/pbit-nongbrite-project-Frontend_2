"use client";

export function Stars() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Moon */}
            <div className="absolute" style={{ top: "8%", right: "10%", fontSize: 38, opacity: 0.95 }}>🌙</div>
            {/* Stars */}
            {Array.from({ length: 24 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: 1.5 + (i % 3),
                        height: 1.5 + (i % 3),
                        left: `${(i * 4.2) % 88}%`,
                        top: `${(i * 6.5 + 3) % 52}%`,
                        animation: `starBlink ${1.2 + (i % 5) * 0.4}s ease-in-out ${i * 0.12}s infinite`,
                    }}
                />
            ))}
            <style>{`
                @keyframes starBlink { 0%,100%{opacity:.1} 50%{opacity:.95} }
            `}</style>
        </div>
    );
}
