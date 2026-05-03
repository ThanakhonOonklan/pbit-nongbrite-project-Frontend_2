"use client";

import { useEffect, useState } from "react";
import { PathMap } from "@/components/games/path-navigation/PathMap";
import type { TutorialStep } from "../TutorialModal";

// ── Layout constants (match real game UI exactly) ──────────────
const BTN_SIZE = 60;
const BTN_GAP = 12;
const CARD_SIZE = 44;
const TILE_GAP = 8;
const PANEL_PADDING = 12;
const PANEL_HEADER_H = 24;
const PANEL_GRID_TOP = PANEL_PADDING + PANEL_HEADER_H; // 36
const CONTAINER_W = 340;
const BTNS_TOTAL_W = 4 * BTN_SIZE + 3 * BTN_GAP; // 276
const BTNS_OFFSET_LEFT = (CONTAINER_W - BTNS_TOTAL_W) / 2; // ~32
const BTNS_ROW_TOP = 120;
const FLY_START_TOP = BTNS_ROW_TOP + (64 - CARD_SIZE) / 2; // 130

const DIRS_DATA = [
    { dir: "left", icon: "/icons/Arrow/ArrowLeft.svg", idx: 0 },
    { dir: "up", icon: "/icons/Arrow/ArrowUp.svg", idx: 1 },
    { dir: "down", icon: "/icons/Arrow/ArrowDown.svg", idx: 2 },
    { dir: "right", icon: "/icons/Arrow/ArrowRight.svg", idx: 3 },
] as const;

function getBtnCenterLeft(idx: number) {
    return BTNS_OFFSET_LEFT + idx * (BTN_SIZE + BTN_GAP) + BTN_SIZE / 2;
}
function getSlotLeft(slotIdx: number) {
    return PANEL_PADDING + (slotIdx + 1) * (CARD_SIZE + TILE_GAP);
}

/* ── Step 1: Real PathMap with actual game characters ────────── */
function Step1RealMap() {
    return (
        <div className="flex flex-col items-center gap-3">
            <div style={{ width: 300, height: 300 }}>
                <PathMap
                    gridCols={3}
                    gridRows={3}
                    playerPos={{ row: 0, col: 0 }}
                    nongBritePos={{ row: 1, col: 2 }}
                    homePos={{ row: 2, col: 2 }}
                    blockedTiles={[{ row: 1, col: 1 }]}
                    hasNongBrite={false}
                />
            </div>

            {/* Legend */}
            <div className="flex gap-4 items-center">
                <span className="flex items-center gap-1 text-xs font-medium text-white/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/P_Bit/bit-02.svg" className="w-5 h-5 object-contain" alt="P_Bit" />
                    P_Bit
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-white/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/Nong_brite/nong-brite-04.svg" className="w-5 h-5 object-contain" alt="น้องไบร์ท" />
                    น้องไบร์ท
                </span>
                <span className="text-xs font-medium text-white/80">🏠 บ้าน</span>
            </div>
        </div>
    );
}

/* ── Step 2: Animated press → fly → panel demo ───────────────── */
type FlyState = {
    active: boolean;
    cardLeft: number;
    deltaX: number;
    deltaY: number;
    dir: string;
    key: number;
} | null;

function Step2Commands() {
    const [commands, setCommands] = useState<string[]>([]);
    const [pressing, setPressing] = useState<string | null>(null);
    const [fly, setFly] = useState<FlyState>(null);

    useEffect(() => {
        let alive = true;
        const seq = [
            { dir: "right", idx: 3 },
            { dir: "right", idx: 3 },
            { dir: "down", idx: 2 },
        ];
        let si = 0;
        let keyN = 0;

        const doNext = () => {
            if (!alive) return;
            if (si >= seq.length) {
                setTimeout(() => {
                    if (!alive) return;
                    setCommands([]); setFly(null); si = 0;
                    setTimeout(doNext, 600);
                }, 2000);
                return;
            }
            const { dir, idx } = seq[si];
            const slotIdx = si++;
            setPressing(dir);

            const btnCenterX = getBtnCenterLeft(idx);
            const cardLeft = btnCenterX - CARD_SIZE / 2;
            const deltaX = getSlotLeft(slotIdx) - cardLeft;
            const deltaY = PANEL_GRID_TOP - FLY_START_TOP;

            setTimeout(() => {
                if (!alive) return;
                setPressing(null);
                setFly({ active: true, cardLeft, deltaX, deltaY, dir, key: ++keyN });

                setTimeout(() => {
                    if (!alive) return;
                    setFly(f => f ? { ...f, active: false } : null);
                    setCommands(c => [...c, dir]);
                    setTimeout(doNext, 500);
                }, 450);
            }, 350);
        };

        const t = setTimeout(doNext, 800);
        return () => { alive = false; clearTimeout(t); };
    }, []);

    return (
        <div className="relative" style={{ width: CONTAINER_W, height: 210 }}>

            {/* Command panel */}
            <div
                className="absolute rounded-xl border-2 bg-[#37464F] p-3"
                style={{ top: 0, left: 0, right: 0, borderColor: "#9CA3AF" }}
            >
                <span className="text-[10px] font-semibold text-gray-400 block mb-2">
                    คำสั่ง {commands.length}/35
                </span>
                <div className="flex flex-wrap" style={{ gap: TILE_GAP }}>
                    {/* Run */}
                    <div className="flex items-center justify-center rounded-xl"
                        style={{ width: CARD_SIZE, height: CARD_SIZE, background: "#4CAF50", boxShadow: "0 4px 0 #388E3C" }}>
                        <span className="text-white text-sm font-bold">▶</span>
                    </div>
                    {/* Filled commands */}
                    {commands.map((cmd, i) => {
                        const d = DIRS_DATA.find(dd => dd.dir === cmd)!;
                        const isNew = i === commands.length - 1;
                        return (
                            <div key={i} className="flex items-center justify-center rounded-xl"
                                style={{
                                    width: CARD_SIZE, height: CARD_SIZE,
                                    background: "#2D3748", boxShadow: "0 4px 0 #1a2535",
                                    border: "2px solid #3D4F66",
                                    animation: isNew ? "pnCmdPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                                }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={d.icon} alt="" className="w-5 h-5" />
                            </div>
                        );
                    })}
                    {/* Next empty slot */}
                    <div className="rounded-xl border-2 border-dashed border-gray-500 opacity-40"
                        style={{ width: CARD_SIZE, height: CARD_SIZE }} />
                </div>
            </div>

            {/* Direction buttons */}
            <div className="absolute flex" style={{ bottom: 0, left: BTNS_OFFSET_LEFT, gap: BTN_GAP }}>
                {DIRS_DATA.map(({ dir, icon }) => {
                    const isPressed = pressing === dir;
                    return (
                        <div key={dir} className="flex items-center justify-center transition-all duration-150"
                            style={{
                                width: BTN_SIZE, height: BTN_SIZE, borderRadius: 13,
                                background: "#1491ff",
                                boxShadow: isPressed ? "0 0px 0 #1587bd" : "0 6px 0 #1587bd",
                                border: "3px solid #43a7ff",
                                transform: isPressed ? "translateY(5px) scale(0.9)" : "scale(1)",
                            }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={icon} alt="" className="w-7 h-7" />
                        </div>
                    );
                })}
            </div>

            {/* Flying card */}
            {fly?.active && (
                <div key={fly.key}
                    className="absolute flex items-center justify-center rounded-xl"
                    style={{
                        width: CARD_SIZE, height: CARD_SIZE,
                        top: FLY_START_TOP, left: fly.cardLeft, zIndex: 20,
                        background: "#1491ff", border: "3px solid #43a7ff",
                        boxShadow: "0 6px 20px rgba(20,145,255,0.55)",
                        animation: "pnFlyCard 0.45s cubic-bezier(0.4,0,0.2,1) forwards",
                        ["--pn-dx" as string]: `${fly.deltaX}px`,
                        ["--pn-dy" as string]: `${fly.deltaY}px`,
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={DIRS_DATA.find(d => d.dir === fly.dir)?.icon} alt="" className="w-5 h-5" />
                </div>
            )}

            <style>{`
                @keyframes pnCmdPop {
                    from { transform: scale(0) rotate(-8deg); opacity: 0; }
                    to   { transform: scale(1) rotate(0deg);  opacity: 1; }
                }
                @keyframes pnFlyCard {
                    0%   { transform: translate(0,0) scale(1.15); opacity: 1; }
                    45%  { transform: translate(calc(var(--pn-dx)*0.55), calc(var(--pn-dy)*0.7)) scale(1.2); opacity: 1; }
                    100% { transform: translate(var(--pn-dx), var(--pn-dy)) scale(0.75); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

/* ── Step 3: PathMap + CommandPanel running, pick up NongBrite → home ── */
const RUN_CMDS = ["right", "right", "down", "down"] as const;
const RUN_POSITIONS = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 2 }, // picks up NongBrite
    { row: 2, col: 2 }, // home!
];

function Step3RunMap() {
    const [posIdx, setPosIdx] = useState(0);
    const [cmdIdx, setCmdIdx] = useState(-1);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);

    const playerPos = RUN_POSITIONS[posIdx];
    const hasNongBrite = posIdx >= 3;

    useEffect(() => {
        let alive = true;

        const cycle = () => {
            setPosIdx(0); setCmdIdx(-1); setRunning(false); setDone(false);

            setTimeout(() => {
                if (!alive) return;
                setRunning(true);
                let step = 0;
                const tick = () => {
                    if (!alive) return;
                    if (step >= RUN_CMDS.length) {
                        setDone(true);
                        setTimeout(() => { if (alive) cycle(); }, 2800);
                        return;
                    }
                    setCmdIdx(step);
                    setPosIdx(step + 1);
                    step++;
                    setTimeout(tick, 750);
                };
                tick();
            }, 1200);
        };

        cycle();
        return () => { alive = false; };
    }, []);

    return (
        <div className="flex gap-3 items-start">
            {/* Real PathMap */}
            <div style={{ width: 190, height: 190, flexShrink: 0 }}>
                <PathMap
                    gridCols={3} gridRows={3}
                    playerPos={playerPos}
                    nongBritePos={{ row: 1, col: 2 }}
                    homePos={{ row: 2, col: 2 }}
                    blockedTiles={[{ row: 1, col: 1 }]}
                    hasNongBrite={hasNongBrite}
                    isRunning={running}
                />
            </div>

            {/* Command panel */}
            <div className="flex-1 rounded-xl border-2 bg-[#37464F] p-2.5 flex flex-col gap-2"
                style={{ borderColor: "#9CA3AF" }}>
                <span className="text-[10px] font-semibold text-gray-400">คำสั่ง 4/35</span>
                <div className="flex flex-wrap gap-1.5">
                    {/* Run button */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                            background: done ? "#22C55E" : running ? "#F97316" : "#4CAF50",
                            boxShadow: `0 4px 0 ${done ? "#16A34A" : running ? "#C2410C" : "#388E3C"}`,
                            animation: !running && !done ? "pnRunPulse 1.2s ease-in-out infinite" : "none",
                        }}>
                        <span className="text-white text-xs font-bold">
                            {done ? "✓" : running ? "⚙" : "▶"}
                        </span>
                    </div>
                    {/* Command chips */}
                    {RUN_CMDS.map((cmd, i) => {
                        const d = DIRS_DATA.find(dd => dd.dir === cmd)!;
                        const isActive = cmdIdx === i;
                        const isPast = cmdIdx > i;
                        return (
                            <div key={i}
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                                style={{
                                    background: isPast ? "#1B2E22" : "#2D3748",
                                    boxShadow: `0 4px 0 ${isPast ? "#0F1E14" : "#1a2535"}`,
                                    border: `2px solid ${isActive ? "#1CB0F6" : isPast ? "#22C55E" : "#3D4F66"}`,
                                    transform: isActive ? "scale(1.18)" : "scale(1)",
                                }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={d.icon} alt="" className="w-4 h-4" />
                            </div>
                        );
                    })}
                </div>
                {done && (
                    <p className="text-green-400 text-[10px] font-extrabold text-center animate-bounce">
                        ถึงบ้านแล้ว! 🎉
                    </p>
                )}
            </div>

            <style>{`
                @keyframes pnRunPulse {
                    0%, 100% { box-shadow: 0 4px 0 #388E3C; }
                    50% { box-shadow: 0 4px 0 #388E3C, 0 0 12px rgba(74,222,128,0.45);
                          transform: scale(1.06); }
                }
            `}</style>
        </div>
    );
}

export const pathNavigationTutorialSteps: TutorialStep[] = [
    {
        title: "จดจำเส้นทาง",
        content: <Step1RealMap />,
        hint: "จดจำเส้นทาง แล้วไปรับน้องไบร์ท พากลับบ้านด้วยนะ!",
    },
    {
        title: "กดหรือลากคำสั่ง",
        content: <Step2Commands />,
        hint: "กดปุ่มทิศทาง หรือลากไปวางในช่องคำสั่งได้เลย!",
    },
    {
        title: "กด ▶ Run แล้วดูผล!",
        content: <Step3RunMap />,
        hint: "P_Bit จะเดินตามคำสั่ง — ไปรับน้องไบร์ท แล้วพากลับบ้าน!",
    },
];
