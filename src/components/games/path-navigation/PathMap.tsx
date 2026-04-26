"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { type PathTile, type Direction } from "@/constants/games/path-navigation-levels";

interface PathMapProps {
    gridCols: number;
    gridRows: number;
    playerPos: PathTile;
    nongBritePos: PathTile;
    homePos: PathTile;
    blockedTiles?: PathTile[];
    hasNongBrite?: boolean;
    /** 'fall' = hit boundary, 'stumble' = hit rock, 'none' = normal */
    failType?: "none" | "fall" | "stumble";
    fallDir?: Direction | null;
    isRunning?: boolean;
}

function samePos(a: PathTile, b: PathTile) {
    return a.row === b.row && a.col === b.col;
}

export function PathMap({
    gridCols,
    gridRows,
    playerPos,
    nongBritePos,
    homePos,
    blockedTiles = [],
    hasNongBrite = false,
    failType = "none",
    fallDir = null,
    isRunning = false,
}: PathMapProps) {
    const isBlocked = (row: number, col: number) =>
        blockedTiles.some(t => t.row === row && t.col === col);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    useEffect(() => {
        if (!wrapperRef.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setContainerSize({ w: width, h: height });
        });
        ro.observe(wrapperRef.current);
        return () => ro.disconnect();
    }, []);

    const cellPx = (() => {
        if (containerSize.w === 0) {
            const maxDim = Math.max(gridCols, gridRows);
            if (maxDim <= 4) return 80;
            if (maxDim <= 5) return 68;
            if (maxDim <= 6) return 56;
            if (maxDim <= 7) return 48;
            return 42;
        }
        // Use 85% of container width, cap at 80px per cell on mobile
        const byWidth = Math.floor((containerSize.w * 0.85) / gridCols);
        // Only constrain by height on desktop (fixed-height layout, h > 320)
        if (containerSize.h > 320) {
            const byHeight = Math.floor((containerSize.h * 0.85) / gridRows);
            return Math.min(Math.max(Math.min(byWidth, byHeight), 40), 90);
        }
        // Mobile: width-only
        return Math.min(Math.max(byWidth, 40), 80);
    })();

    const playerLeft = playerPos.col * cellPx;
    const playerTop = playerPos.row * cellPx;
    const nongBriteLeft = nongBritePos.col * cellPx;
    const nongBriteTop = nongBritePos.row * cellPx;
    const homeLeft = homePos.col * cellPx;
    const homeTop = homePos.row * cellPx;

    const showNongBriteOnTile = !hasNongBrite && !samePos(playerPos, nongBritePos);
    const isPlayerAtHome = samePos(playerPos, homePos);

    const isFalling = failType === "fall";
    const isStumbling = failType === "stumble";

    // Player wrapper style — fall shrinks+fades, stumble uses CSS animation
    const playerDivStyle: React.CSSProperties = {
        width: cellPx,
        height: cellPx,
        left: playerLeft,
        top: playerTop,
        zIndex: 20,
        ...(isFalling
            ? {
                transition:
                    "left 0.45s ease-in, top 0.45s ease-in, transform 0.5s ease-in, opacity 0.4s ease-in",
                transform: "scale(0.05) rotate(360deg)",
                opacity: 0,
            }
            : isRunning
                ? {
                    transition: "left 0.3s ease-in-out, top 0.3s ease-in-out",
                }
                : {}),
    };

    void fallDir; // used only to trigger fall direction via playerPos offset in page

    return (
        <div ref={wrapperRef} className="flex items-center justify-center w-full h-full">
            <div
                className="relative"
                style={{ width: gridCols * cellPx, height: gridRows * cellPx }}
            >
                {/* ── Tiles ─────────── */}
                {Array.from({ length: gridRows }, (_, row) =>
                    Array.from({ length: gridCols }, (_, col) => {
                        const key = `${row}-${col}`;
                        const isNBTile = samePos({ row, col }, nongBritePos) && !hasNongBrite;
                        const blocked = isBlocked(row, col);
                        return (
                            <div
                                key={key}
                                className="absolute bg-white border border-gray-100"
                                style={{ width: cellPx, height: cellPx, left: col * cellPx, top: row * cellPx }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 4,
                                        borderRadius: 5,
                                        backgroundColor: blocked
                                            ? "#C8B89A"
                                            : isNBTile ? "#9FC8E8" : "#DCF0FC",
                                    }}
                                />
                                {blocked && (
                                    <Image
                                        src="/icons/game/rock.svg"
                                        alt="Rock"
                                        width={Math.round(cellPx * 0.72)}
                                        height={Math.round(cellPx * 0.72)}
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
                                        style={{ zIndex: 3 }}
                                    />
                                )}
                            </div>
                        );
                    })
                )}

                {/* ── Home ─────────────────────────────── */}
                <div
                    className={`absolute flex items-center justify-center pointer-events-none ${isPlayerAtHome ? "home-shake" : ""}`}
                    style={{ width: cellPx, height: cellPx, left: homeLeft, top: homeTop, zIndex: 5 }}
                >
                    <Image
                        src="/icons/game/Home.svg"
                        alt="Home"
                        width={Math.round(cellPx * 1.0)}
                        height={Math.round(cellPx * 1.0)}
                        className="object-contain"
                    />
                </div>

                {/* ── Nong-Brite (waiting) ── */}
                {showNongBriteOnTile && (
                    <div
                        className="absolute pointer-events-none"
                        style={{ width: cellPx, height: cellPx, left: nongBriteLeft, top: nongBriteTop, zIndex: 15 }}
                    >
                        <Image
                            src="/images/Nong_brite/nong-brite-04.svg"
                            alt="Nong Brite"
                            width={Math.round(cellPx * 0.6)}
                            height={Math.round(cellPx * 0.6)}
                            className="absolute left-1/2 -translate-x-1/2 object-contain drop-shadow-md"
                            style={{ bottom: "10%" }}
                        />
                    </div>
                )}

                {/* ── Player (Bit) ─────────── */}
                <div
                    className={`absolute pointer-events-none ${isStumbling ? "player-stumble" : ""}`}
                    style={playerDivStyle}
                >
                    <Image
                        src={hasNongBrite ? "/images/P_Bit/bit-05.svg" : "/images/P_Bit/bit-02.svg"}
                        alt="Bit"
                        width={Math.round(cellPx * 1.35)}
                        height={Math.round(cellPx * 1.35)}
                        className="absolute left-1/2 -translate-x-1/2 object-contain drop-shadow-md"
                        style={{ bottom: "10%" }}
                    />
                    {hasNongBrite && !isPlayerAtHome && (
                        <Image
                            src="/images/Nong_brite/nong-brite-01.svg"
                            alt="Nong Brite (with Bit)"
                            width={Math.round(cellPx * 0.5)}
                            height={Math.round(cellPx * 0.5)}
                            className="absolute bottom-0.5 right-0.5 object-contain"
                            style={{ zIndex: 21 }}
                        />
                    )}
                </div>
            </div>

            <style>{`
                @keyframes homeShake {
                    0%, 100% { transform: rotate(0deg); }
                    20% { transform: rotate(-8deg); }
                    40% { transform: rotate(8deg); }
                    60% { transform: rotate(-5deg); }
                    80% { transform: rotate(5deg); }
                }
                .home-shake { animation: homeShake 0.5s ease-in-out; }

                @keyframes playerStumble {
                    0%   { transform: rotate(0deg)  translateY(0px)  scale(1);    }
                    15%  { transform: rotate(-20deg) translateY(-4px) scale(1.05); }
                    40%  { transform: rotate(30deg)  translateY(4px)  scale(0.9);  }
                    65%  { transform: rotate(70deg)  translateY(10px) scale(0.8);  }
                    85%  { transform: rotate(85deg)  translateY(15px) scale(0.72); }
                    100% { transform: rotate(90deg)  translateY(18px) scale(0.7);  }
                }
                .player-stumble { animation: playerStumble 0.65s ease-in forwards; }
            `}</style>
        </div>
    );
}
