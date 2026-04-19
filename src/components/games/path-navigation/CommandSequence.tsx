"use client";

import { useState, useRef, useEffect } from "react";
import { TiltButton } from "react-tilt-button";
import { type Direction } from "@/constants/games/path-navigation-levels";
import { FaPlay, FaTimes, FaTrash } from "react-icons/fa";
import { useDroppable } from "@dnd-kit/core";

interface CommandSequenceProps {
    commands: Direction[];
    onRemoveCommand: (index: number) => void;
    onClearAll: () => void;
    onRun?: () => void;
    onAddCommand?: (direction: Direction) => void;
    activeCommandIndex?: number | null;
    disabled?: boolean;
    /** Called whenever the computed max-command capacity changes */
    onMaxCommandsChange?: (max: number) => void;
}

const directionIcons: Record<Direction, React.ReactNode> = {
    up: <img src="/icons/Arrow/ArrowUp.svg" alt="บน" className="w-5 h-5" />,
    down: <img src="/icons/Arrow/ArrowDown.svg" alt="ล่าง" className="w-5 h-5" />,
    left: <img src="/icons/Arrow/ArrowLeft.svg" alt="ซ้าย" className="w-5 h-5" />,
    right: <img src="/icons/Arrow/ArrowRight.svg" alt="ขวา" className="w-5 h-5" />,
};

const VALID_DIRECTIONS: Direction[] = ["up", "down", "left", "right"];
const GAP = 8;
const MAX_COMMANDS = 27; // fixed across all screen sizes

export function CommandSequence({
    commands,
    onRemoveCommand,
    onClearAll,
    onRun,
    onAddCommand,
    activeCommandIndex,
    disabled = false,
    onMaxCommandsChange,
}: CommandSequenceProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [maxCommands] = useState(MAX_COMMANDS);
    const [tileSize, setTileSize] = useState(58);

    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!innerRef.current) return;
        // Notify parent of fixed capacity immediately
        onMaxCommandsChange?.(MAX_COMMANDS);

        const ro = new ResizeObserver(([entry]) => {
            const { width } = entry.contentRect;
            // Target ~5 tiles per row; clamp tile between 44px (mobile) and 66px (desktop)
            const targetCols = 5;
            const byWidth = Math.floor((width + GAP) / targetCols) - GAP;
            const tile = Math.min(66, Math.max(44, byWidth));
            setTileSize(tile);
        });
        ro.observe(innerRef.current);
        return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tileRadius = Math.round(tileSize * 0.21); // proportional border-radius

    const { setNodeRef, isOver } = useDroppable({
        id: "command-sequence",
    });

    return (
        <div
            ref={setNodeRef}
            className={`rounded-xl border-2 bg-[#37464F] p-3 lg:p-4 flex flex-col h-[274px] lg:h-[374px] transition-all duration-150 ${
                isOver ? "border-[#1CB0F6] shadow-[0_0_0_3px_#1CB0F640]" : "border-gray-300"
            }`}
        >
            {/* Header row: command count + Clear All button */}
            <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-semibold text-gray-400">
                    คำสั่ง {commands.length}/{maxCommands}
                </span>
                {commands.length > 0 && !disabled && (
                    <button
                        onClick={onClearAll}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors font-semibold"
                        title="ล้างทั้งหมด"
                    >
                        <FaTrash className="w-3 h-3" />
                        ล้าง
                    </button>
                )}
            </div>

            {/* Inner area: overflow-hidden so tiles never escape the box */}
            <div
                ref={innerRef}
                className="overflow-y-auto flex-1 pb-1 pl-1 pr-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex flex-wrap content-start" style={{ gap: GAP }}>

                    {/* Run button — always first */}
                    <TiltButton
                        width={tileSize}
                        height={tileSize}
                        elevation={6}
                        pressInset={6}
                        tilt={0.89}
                        radius={tileRadius}
                        motion={60}
                        surfaceColor="#4CAF50"
                        sideColor="#388E3C"
                        textColor="#ffffff"
                        borderColor="transparent"
                        borderWidth={0}
                        glareOpacity={0}
                        glareWidth={0}
                        disabled={commands.length === 0}
                        onClick={onRun}
                    >
                        <FaPlay className="w-4 h-4 text-white" />
                    </TiltButton>

                    {/* Filled command chips */}
                    {commands.map((cmd, index) => (
                        <div key={index} className="group relative shrink-0">
                            <TiltButton
                                width={tileSize}
                                height={tileSize}
                                elevation={6}
                                pressInset={6}
                                tilt={0.89}
                                radius={tileRadius}
                                motion={60}
                                surfaceColor="#2D3748"
                                sideColor="#1a2535"
                                textColor="#ffffff"
                                borderColor={activeCommandIndex === index ? "#1CB0F6" : "#3D4F66"}
                                borderWidth={activeCommandIndex === index ? 4 : 3}
                                glareOpacity={0}
                                glareWidth={0}
                                onClick={() => !disabled && onRemoveCommand(index)}
                            >
                                {directionIcons[cmd]}
                            </TiltButton>
                            {/* Remove badge */}
                            {!disabled && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRemoveCommand(index); }}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <FaTimes className="w-2 h-2" />
                                </button>
                            )}
                        </div>
                    ))}

                    {/* 1 trailing empty slot */}
                    {commands.length < maxCommands && (
                        <div
                            className={`shrink-0 border-2 border-dashed transition-all duration-150 ${
                                isOver
                                    ? "border-[#1CB0F6] bg-[#1CB0F610]"
                                    : "border-gray-400 opacity-50"
                            }`}
                            style={{ width: tileSize, height: tileSize, borderRadius: tileRadius }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
