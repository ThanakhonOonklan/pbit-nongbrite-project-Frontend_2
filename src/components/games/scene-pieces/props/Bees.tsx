"use client";

interface BeesProps {
    count?: number;
}

export function Bees({ count = 3 }: BeesProps) {
    const positions = [
        { left: "18%", top: "14%" },
        { left: "44%", top: "22%" },
        { left: "68%", top: "10%" },
        { left: "30%", top: "32%" },
    ].slice(0, count);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {positions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: pos.left,
                        top: pos.top,
                        fontSize: 20,
                        animation: `beeFly ${1.6 + i * 0.45}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                >🐝</div>
            ))}
            <style>{`
                @keyframes beeFly { 0%,100%{transform:translate(0,0)} 25%{transform:translate(10px,-8px)} 50%{transform:translate(-6px,5px)} 75%{transform:translate(8px,3px)} }
            `}</style>
        </div>
    );
}
