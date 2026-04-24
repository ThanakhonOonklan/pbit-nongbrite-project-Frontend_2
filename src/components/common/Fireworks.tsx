"use client";

import React from "react";

const COLORS = [
    "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
    "#ff922b", "#cc5de8", "#20c997", "#ff6b9d",
    "#1cb0f6", "#ffd300", "#ff4757", "#2ed573",
];

interface Particle {
    id: number;
    color: string;
    size: number;
    duration: number;
    delay: number;
    tx: number;
    ty: number;
}

interface FireworkBurst {
    id: number;
    x: number;
    y: number;
    particles: Particle[];
}

const Fireworks: React.FC = () => {
    const [bursts, setBursts] = React.useState<FireworkBurst[]>([]);
    const burstIdRef = React.useRef(0);

    React.useEffect(() => {
        const createBurst = () => {
            const id = burstIdRef.current++;
            const x = 15 + Math.random() * 70;
            const y = 10 + Math.random() * 50;
            const particleCount = 12 + Math.floor(Math.random() * 8);

            const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
                const angle = ((360 / particleCount) * i + (Math.random() * 20 - 10)) * (Math.PI / 180);
                const distance = 35 + Math.random() * 55;
                return {
                    id: i,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    size: 3 + Math.random() * 5,
                    duration: 0.7 + Math.random() * 0.8,
                    delay: Math.random() * 0.15,
                    tx: Math.cos(angle) * distance,
                    ty: Math.sin(angle) * distance,
                };
            });

            setBursts((prev) => [...prev, { id, x, y, particles }]);
            setTimeout(() => {
                setBursts((prev) => prev.filter((b) => b.id !== id));
            }, 2200);
        };

        // Initial 3 quick bursts
        createBurst();
        const t1 = setTimeout(createBurst, 250);
        const t2 = setTimeout(createBurst, 550);

        // Recurring bursts
        const interval = setInterval(() => {
            createBurst();
        }, 1000 + Math.random() * 700);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* Inject keyframes once */}
            <style>{`
        @keyframes fw-burst {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          60%  { opacity: 0.85; }
          100% { transform: translate(var(--fw-tx), var(--fw-ty)) scale(0); opacity: 0; }
        }
      `}</style>

            <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
                {bursts.map((burst) => (
                    <div
                        key={burst.id}
                        className="absolute"
                        style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
                    >
                        {burst.particles.map((p) => (
                            <span
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    backgroundColor: p.color,
                                    boxShadow: `0 0 ${p.size * 2}px ${p.color}80`,
                                    "--fw-tx": `${p.tx}px`,
                                    "--fw-ty": `${p.ty}px`,
                                    animation: `fw-burst ${p.duration}s ease-out ${p.delay}s forwards`,
                                    opacity: 0,
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

Fireworks.displayName = "Fireworks";
export { Fireworks };
