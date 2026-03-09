"use client";

interface EmbersProps {
    count?: number;
}

export function Embers({ count = 10 }: EmbersProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: `${(i * 9 + 8) % 80}%`,
                        bottom: "22%",
                        fontSize: 10 + (i % 3) * 5,
                        animation: `emberRise ${1.1 + (i % 4) * 0.38}s ease-out ${i * 0.18}s infinite`,
                    }}
                >🔥</div>
            ))}
            <style>{`
                @keyframes emberRise { 0%{transform:translateY(0);opacity:.85} 100%{transform:translateY(-90px);opacity:0} }
            `}</style>
        </div>
    );
}
