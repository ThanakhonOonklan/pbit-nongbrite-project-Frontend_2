"use client";

interface MushroomsProps {
    seed?: number;
}

function rng(s: number, i: number) {
    const n = Math.sin(s * 7331 + i * 3917 + 841) * 233280;
    return n - Math.floor(n);
}

const caps = ["🍄", "🍄‍🟫"];

export function Mushrooms({ seed = 0 }: MushroomsProps) {
    const spots = Array.from({ length: 4 }, (_, i) => {
        const r1 = rng(seed + 20, i * 2);
        const r2 = rng(seed + 21, i * 2 + 1);

        const left = i < 2
            ? 8 + r1 * 15  // left side  8–23%
            : 74 + r1 * 18; // right side 74–92%

        const size = 14 + r2 * 10; // 14–24px
        return { left: `${left.toFixed(1)}%`, size, cap: caps[i % caps.length] };
    });

    return (
        <>
            {spots.map((s, i) => (
                <div
                    key={i}
                    className="absolute z-[12] pointer-events-none select-none"
                    style={{ left: s.left, bottom: "22%", fontSize: s.size }}
                >
                    {s.cap}
                </div>
            ))}
        </>
    );
}
