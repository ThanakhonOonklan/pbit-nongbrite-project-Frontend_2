"use client";

export type TreeVariant = "pine" | "tropical" | "bare" | "dark-pine" | "snow-pine";
export type TreeSide = "both" | "left" | "right";

interface TreesProps {
    variant?: TreeVariant;
    count?: number;
    side?: TreeSide;
    seed?: number;
}

const leafColors: Record<TreeVariant, string[]> = {
    "pine": ["#3c8a35", "#4da33e"],
    "tropical": ["#2c9e48", "#39c45c"],
    "bare": ["#5c3d1e", "#5c3d1e"],
    "dark-pine": ["#1e3a5a", "#20425f"],
    "snow-pine": ["#5e9ab8", "#7ab8d4"],
};

const trunkColors: Record<TreeVariant, string> = {
    "pine": "#7a5230",
    "tropical": "#8b6914",
    "bare": "#5c3d1e",
    "dark-pine": "#1a2a3a",
    "snow-pine": "#6a8a9a",
};

// snow cap for snow-pine
const hasSnowCap: Record<TreeVariant, boolean> = {
    "pine": false, "tropical": false, "bare": false, "dark-pine": false, "snow-pine": true,
};

/** Deterministic pseudo-random 0..1 from seed + index */
function rng(seed: number, idx: number): number {
    const n = Math.sin(seed * 9301 + idx * 49297 + 233280) * 233280;
    return n - Math.floor(n);
}

function SingleTree({ variant, scale }: { variant: TreeVariant; scale: number }) {
    const [leaf, leafLight] = leafColors[variant];
    const trunk = trunkColors[variant];
    const isBare = variant === "bare";
    const snowCap = hasSnowCap[variant];
    const waveDur = (2.5 + scale * 1.2).toFixed(2);

    return (
        <div
            style={{
                position: "relative",
                display: "inline-block",
                transformOrigin: "bottom center",
                transform: `scale(${scale})`,
                animation: `treeWave ${waveDur}s ease-in-out infinite`,
            }}
        >
            {/* ── Trunk ── */}
            <div style={{
                width: 10, height: isBare ? 60 : 38,
                background: `linear-gradient(to right, ${trunk}, ${trunk}cc)`,
                margin: "0 auto",
                borderRadius: "3px 3px 2px 2px",
                boxShadow: `inset -2px 0 4px rgba(0,0,0,0.3)`,
            }} />

            {!isBare && (<>
                {/* layer 1 – base */}
                <div style={{
                    position: "absolute", bottom: 28, left: -26,
                    width: 0, height: 0,
                    borderLeft: "30px solid transparent",
                    borderRight: "30px solid transparent",
                    borderBottom: `48px solid ${leaf}`,
                    filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
                }} />
                {/* layer 2 */}
                <div style={{
                    position: "absolute", bottom: 50, left: -21,
                    width: 0, height: 0,
                    borderLeft: "24px solid transparent",
                    borderRight: "24px solid transparent",
                    borderBottom: `42px solid ${leafLight}`,
                }} />
                {/* layer 3 – top */}
                <div style={{
                    position: "absolute", bottom: 72, left: -14,
                    width: 0, height: 0,
                    borderLeft: "16px solid transparent",
                    borderRight: "16px solid transparent",
                    borderBottom: `34px solid ${leaf}`,
                }} />
                {/* snow cap */}
                {snowCap && (
                    <div style={{
                        position: "absolute", bottom: 94, left: -8,
                        width: 0, height: 0,
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderBottom: "18px solid #e8f4fb",
                    }} />
                )}
            </>)}

            {isBare && (<>
                <div style={{ width: 5, height: 30, background: trunk, position: "absolute", bottom: 48, left: -8, transform: "rotate(-28deg)", transformOrigin: "bottom left", borderRadius: 3 }} />
                <div style={{ width: 5, height: 24, background: trunk, position: "absolute", bottom: 54, left: 8, transform: "rotate(22deg)", transformOrigin: "bottom right", borderRadius: 3 }} />
                <div style={{ width: 4, height: 18, background: trunk, position: "absolute", bottom: 65, left: -4, transform: "rotate(-16deg)", transformOrigin: "bottom left", borderRadius: 3 }} />
                <div style={{ width: 4, height: 14, background: trunk, position: "absolute", bottom: 68, left: 5, transform: "rotate(14deg)", transformOrigin: "bottom right", borderRadius: 3 }} />
            </>)}
        </div>
    );
}

export function Trees({ variant = "pine", count = 4, side = "both", seed = 0 }: TreesProps) {
    /**
     * ตำแหน่ง bottom ตรึงที่ GROUND_TOP เพื่อไม่ลอย
     * สุ่มเฉพาะ left% และ scale
     */
    const GROUND_TOP = "22%"; // must match Ground component

    function makeSlots(sideName: "left" | "right", n: number) {
        return Array.from({ length: n }, (_, i) => {
            const base = sideName === "right" ? 200 : 0;
            const r1 = rng(seed + 1, i * 3 + base);
            const r2 = rng(seed + 2, i * 3 + 1 + base);

            const leftPct = sideName === "left"
                ? 1 + r1 * 20   // 1% – 21%
                : 72 + r1 * 22;  // 72% – 94%

            // deeper = smaller scale, closer = bigger
            const scale = 0.60 + r2 * 0.55; // 0.60 – 1.15

            return { left: `${leftPct.toFixed(1)}%`, scale };
        });
    }

    let positions: { left: string; scale: number }[] = [];
    if (side === "both") {
        positions = [
            ...makeSlots("left", Math.ceil(count / 2)),
            ...makeSlots("right", Math.floor(count / 2)),
        ];
    } else if (side === "left") {
        positions = makeSlots("left", count);
    } else {
        positions = makeSlots("right", count);
    }

    return (
        <>
            {positions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute z-10"
                    style={{
                        left: pos.left,
                        bottom: GROUND_TOP,   // ← ตรึงที่ระดับพื้น
                        lineHeight: 0,        // ← ป้องกัน line-height gap
                    }}
                >
                    <SingleTree variant={variant} scale={pos.scale} />
                </div>
            ))}
            <style>{`
                @keyframes treeWave {
                    0%,100% { transform: rotate(-0.8deg) scale(var(--ts,1)); }
                    50%      { transform: rotate(0.8deg)  scale(var(--ts,1)); }
                }
            `}</style>
        </>
    );
}
