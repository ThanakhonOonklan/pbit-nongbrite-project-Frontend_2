"use client";

import { type PathTile } from "@/constants/games/path-navigation-levels";

interface PathMapProps {
    path: PathTile[];
    gridCols: number;
    gridRows: number;
    playerIndex: number;
    /** index along path where nong-brite waits to be picked up */
    nongBriteIndex?: number;
    /** true once Bit has reached nong-brite (they walk together to the house) */
    hasNongBrite?: boolean;
}

export function PathMap({
    path,
    gridCols,
    gridRows,
    playerIndex,
    nongBriteIndex,
    hasNongBrite = false,
}: PathMapProps) {
    // Default: place nong-brite roughly in the middle of the path
    const resolvedNongBriteIndex =
        nongBriteIndex !== undefined
            ? nongBriteIndex
            : Math.floor(path.length / 2);

    // Last tile index = home / destination
    const homeIndex = path.length - 1;

    // Build a lookup map: "row-col" => tile data + path index
    const tileMap = new Map<string, PathTile & { pathIndex: number }>();
    path.forEach((tile, index) => {
        tileMap.set(`${tile.row}-${tile.col}`, { ...tile, pathIndex: index });
    });

    // Responsive cell size based on grid width
    const cellPx =
        gridCols <= 4 ? 80
            : gridCols <= 5 ? 64
                : gridCols <= 6 ? 56
                    : 48;

    return (
        <div className="flex items-center justify-center w-full h-full">
            {/* gap-0: no spacing between tiles */}
            <div
                className="inline-grid"
                style={{
                    gridTemplateColumns: `repeat(${gridCols}, ${cellPx}px)`,
                    gridTemplateRows: `repeat(${gridRows}, ${cellPx}px)`,
                    gap: 0,
                }}
            >
                {Array.from({ length: gridRows * gridCols }, (_, i) => {
                    const row = Math.floor(i / gridCols);
                    const col = i % gridCols;
                    const key = `${row}-${col}`;
                    const tile = tileMap.get(key);

                    if (!tile) {
                        // Empty cell — no background
                        return (
                            <div
                                key={key}
                                style={{ width: cellPx, height: cellPx }}
                            />
                        );
                    }

                    const idx = tile.pathIndex;
                    const isPlayer = idx === playerIndex;
                    const isNongBrite = idx === resolvedNongBriteIndex && !hasNongBrite;
                    const isHome = idx === homeIndex;

                    // NongBrite tile gets a darker blue bg
                    const bg = isNongBrite
                        ? "bg-[#9FC8E8]"
                        : "bg-[#DCF0FC]";

                    return (
                        <div
                            key={key}
                            className={`${bg} border-4 border-white transition-all duration-200 relative`}
                            style={{ width: cellPx, height: cellPx }}
                        >
                            {/* Home icon at the last tile */}
                            {isHome && !isPlayer && (
                                <span className="absolute inset-0 flex items-center justify-center select-none">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/icons/game/Home.svg" alt="Home" style={{ width: cellPx * 0.85, height: cellPx * 0.85 }} className="object-contain" />
                                </span>
                            )}

                            {/* Nong-Brite — overflows above the tile */}
                            {isNongBrite && !isPlayer && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src="/images/Nong_brite/nong-brite-04.svg"
                                    alt="Nong Brite"
                                    className="absolute left-1/2 -translate-x-1/2 object-contain drop-shadow-md z-20"
                                    style={{
                                        width: cellPx * 1.1,
                                        height: cellPx * 1.1,
                                        bottom: "10%",
                                    }}
                                />
                            )}

                            {/* Bit — overflows above the tile */}
                            {isPlayer && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src="/images/P_Bit/bit-03.svg"
                                    alt="Bit"
                                    className="absolute left-1/2 -translate-x-1/2 object-contain drop-shadow-md z-20"
                                    style={{
                                        width: cellPx * 1.35,
                                        height: cellPx * 1.35,
                                        bottom: "10%",
                                    }}
                                />
                            )}

                            {/* House behind Bit when on home tile */}
                            {isPlayer && isHome && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src="/icons/game/Home.svg" alt="Home" className="absolute bottom-0.5 right-1 object-contain opacity-70" style={{ width: cellPx * 0.4, height: cellPx * 0.4 }} />
                            )}

                            {/* Nong-Brite small icon when Bit carries her */}
                            {isPlayer && !isHome && hasNongBrite && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src="/images/Nong_brite/nong-brite-01.svg"
                                    alt="Nong Brite (with Bit)"
                                    className="absolute bottom-0.5 right-0.5 object-contain z-20"
                                    style={{ width: cellPx * 0.5, height: cellPx * 0.5 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
