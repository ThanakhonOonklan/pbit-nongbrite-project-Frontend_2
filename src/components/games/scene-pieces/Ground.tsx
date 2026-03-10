"use client";

export type GroundVariant = "grass" | "dark-grass" | "snow" | "sand" | "charred";

interface GroundProps {
    variant?: GroundVariant;
}

const groundConfig: Record<GroundVariant, {
    base: string;
    mid: string;
    wave: string;
    wave2: string;
    hillColor: string;
}> = {
    "grass": { base: "#3a6432", mid: "#4a7c3f", wave: "#5a9b4a", wave2: "#66b254", hillColor: "#3d7036" },
    "dark-grass": { base: "#1e3a18", mid: "#2d5224", wave: "#3a6b2e", wave2: "#447d35", hillColor: "#233f1c" },
    "snow": { base: "#a8ccdb", mid: "#c8dfe8", wave: "#daeaf5", wave2: "#e8f5ff", hillColor: "#b8d8e8" },
    "sand": { base: "#a07830", mid: "#c9a84c", wave: "#d4b86a", wave2: "#dfc882", hillColor: "#b08838" },
    "charred": { base: "#26120a", mid: "#3d1f0d", wave: "#4f2a10", wave2: "#5e3418", hillColor: "#2e1509" },
};

export function Ground({ variant = "grass" }: GroundProps) {
    const { base, mid, wave, wave2, hillColor } = groundConfig[variant];

    return (
        <>
            {/* ── Distant hills (parallax layer behind trees) ── */}
            <svg
                className="absolute z-[5]"
                style={{ bottom: "22%", left: 0, width: "100%", height: 48 }}
                viewBox="0 0 400 48"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,48 Q40,10 90,30 Q140,50 180,18 Q220,0 270,28 Q310,48 350,20 Q380,5 400,24 L400,48 Z"
                    fill={hillColor}
                    opacity={0.55}
                />
            </svg>

            {/* ── Main ground body ── */}
            <div
                className="absolute bottom-0 left-0 right-0 z-[8]"
                style={{
                    height: "22%",
                    background: `linear-gradient(180deg, ${mid} 0%, ${base} 100%)`,
                }}
            />

            {/* ── Wavy grass edge — top layer ── */}
            <svg
                className="absolute z-[9]"
                style={{ bottom: "22%", left: 0, width: "100%", height: 28 }}
                viewBox="0 0 400 28"
                preserveAspectRatio="none"
            >
                {/* second wave for depth */}
                <path
                    d="M0,28 Q18,8 38,16 Q58,24 80,10 Q100,4 122,16 Q144,26 164,10 Q184,4 206,18 Q228,28 250,12 Q270,4 292,16 Q312,26 334,10 Q356,4 378,16 Q395,24 400,14 L400,28 Z"
                    fill={wave2}
                    opacity={0.6}
                />
                {/* main wave */}
                <path
                    d="M0,28 Q20,4 42,14 Q62,24 84,8 Q104,2 126,16 Q148,28 168,8 Q188,2 210,18 Q232,28 254,10 Q274,2 296,16 Q318,28 340,8 Q362,2 382,14 Q396,22 400,12 L400,28 Z"
                    fill={wave}
                />
            </svg>

            {/* ── Subtle ground texture dots (grass blades) ── */}
            <svg
                className="absolute z-[10]"
                style={{ bottom: "22%", left: 0, width: "100%", height: 14 }}
                viewBox="0 0 400 14"
                preserveAspectRatio="none"
            >
                {[20, 55, 90, 135, 170, 210, 250, 285, 325, 365].map((x, i) => (
                    <line
                        key={i}
                        x1={x} y1={14}
                        x2={x + (i % 2 === 0 ? -2 : 2)} y2={4}
                        stroke={wave2} strokeWidth={1.5} strokeLinecap="round"
                        opacity={0.7}
                    />
                ))}
            </svg>
        </>
    );
}
