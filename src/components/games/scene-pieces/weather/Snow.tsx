"use client";

export function Snow() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: 22 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: `${(i * 4.7) % 96}%`,
                        top: "-5%",
                        fontSize: 10 + (i % 4) * 4,
                        animation: `snowFlake ${2.2 + (i % 5) * 0.5}s linear ${i * 0.17}s infinite`,
                        opacity: 0,
                    }}
                >❄️</div>
            ))}
            <style>{`
                @keyframes snowFlake { 0%{transform:translateY(-10px) rotate(0deg);opacity:0} 10%{opacity:.75} 90%{opacity:.4} 100%{transform:translateY(400px) rotate(180deg);opacity:0} }
            `}</style>
        </div>
    );
}
