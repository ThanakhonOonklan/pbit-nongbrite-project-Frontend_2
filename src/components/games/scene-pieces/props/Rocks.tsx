"use client";

interface RocksProps {
    seed?: number;
}

function rng(s: number, i: number) {
    const n = Math.sin(s * 9301 + i * 4931 + 1237) * 233280;
    return n - Math.floor(n);
}

export function Rocks({ seed = 0 }: RocksProps) {
    // 3–4 rocks at random positions along the ground
    const rocks = Array.from({ length: 4 }, (_, i) => {
        const r1 = rng(seed + 10, i * 3);
        const r2 = rng(seed + 11, i * 3 + 1);
        const r3 = rng(seed + 12, i * 3 + 2);

        // avoid center (20-70%) where coco stands
        const left = i < 2
            ? 5 + r1 * 18  // left cluster  5–23%
            : 72 + r1 * 22;  // right cluster 72–94%

        const width = (14 + r2 * 20).toFixed(1); // "14.x" – "34.x"
        const height = ((parseFloat(width)) * (0.5 + r3 * 0.3)).toFixed(1);
        const gray = Math.floor(110 + r2 * 50);
        const color = `rgb(${gray},${gray - 6},${gray - 12})`;
        const shadow = `rgb(${gray - 25},${gray - 31},${gray - 37})`;

        return { left: `${left.toFixed(1)}%`, width: `${width}px`, height: `${height}px`, color, shadow };
    });

    return (
        <>
            {rocks.map((r, i) => (
                <div
                    key={i}
                    className="absolute z-[11] pointer-events-none"
                    style={{ left: r.left, bottom: "22%" }}
                >
                    <div style={{
                        width: r.width,
                        height: r.height,
                        background: `radial-gradient(ellipse at 35% 30%, ${r.color}, ${r.shadow})`,
                        borderRadius: "50% 60% 55% 50% / 50% 50% 60% 55%",
                        boxShadow: "2px 3px 6px rgba(0,0,0,0.35)",
                    }} />
                </div>
            ))}
        </>
    );
}
