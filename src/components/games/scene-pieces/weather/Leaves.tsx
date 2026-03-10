"use client";

export function Leaves() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: 14 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: `${(i * 7.2) % 92}%`,
                        top: "-5%",
                        fontSize: 14 + (i % 3) * 5,
                        animation: `leafFall ${1.4 + (i % 4) * 0.38}s linear ${i * 0.22}s infinite`,
                        opacity: 0,
                    }}
                >🍃</div>
            ))}
            <style>{`
                @keyframes leafFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:0} 10%{opacity:.72} 90%{opacity:.42} 100%{transform:translateY(420px) rotate(360deg);opacity:0} }
            `}</style>
        </div>
    );
}
