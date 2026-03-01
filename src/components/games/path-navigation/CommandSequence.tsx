"use client";

import { useState } from "react";
import { TiltButton } from "react-tilt-button";
import { type Direction } from "@/constants/games/path-navigation-levels";
import { FaPlay, FaTimes } from "react-icons/fa";

interface CommandSequenceProps {
    commands: Direction[];
    onRemoveCommand: (index: number) => void;
    onClearAll: () => void;
    onRun?: () => void;
    onAddCommand?: (direction: Direction) => void;
}

const directionIcons: Record<Direction, React.ReactNode> = {
    up: <img src="/icons/Arrow/ArrowUp.svg" alt="บน" className="w-6 h-6" />,
    down: <img src="/icons/Arrow/ArrowDown.svg" alt="ล่าง" className="w-6 h-6" />,
    left: <img src="/icons/Arrow/ArrowLeft.svg" alt="ซ้าย" className="w-6 h-6" />,
    right: <img src="/icons/Arrow/ArrowRight.svg" alt="ขวา" className="w-6 h-6" />,
};

const VALID_DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

// Shared tile size
const TILE = 62;
const RADIUS = 14;

export function CommandSequence({
    commands,
    onRemoveCommand,
    onClearAll,
    onRun,
    onAddCommand,
}: CommandSequenceProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragOver(false);
        }
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const direction = e.dataTransfer.getData("text/plain") as Direction;
        if (VALID_DIRECTIONS.includes(direction)) {
            onAddCommand?.(direction);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-xl border-2 bg-[#37464F] p-4 flex flex-col h-[280px] transition-all duration-150 ${isDragOver ? "border-[#1CB0F6] shadow-[0_0_0_3px_#1CB0F640]" : "border-gray-300"
                }`}
        >
            <div
                className="overflow-y-auto flex-1 pt-3 pb-1 pl-1 pr-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                <div className="flex flex-wrap gap-2 content-start">

                    {/* Run button — TiltButton */}
                    <TiltButton
                        width={TILE}
                        height={TILE}
                        elevation={6}
                        pressInset={6}
                        tilt={0.89}
                        radius={RADIUS}
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
                        <FaPlay className="w-5 h-5 text-white" />
                    </TiltButton>

                    {/* Command chips */}
                    {commands.map((cmd, index) => (
                        <div key={index} className="group relative shrink-0">
                            <TiltButton
                                width={TILE}
                                height={TILE}
                                elevation={6}
                                pressInset={6}
                                tilt={0.89}
                                radius={RADIUS}
                                motion={60}
                                surfaceColor="#2D3748"
                                sideColor="#1a2535"
                                textColor="#ffffff"
                                borderColor="#3D4F66"
                                borderWidth={3}
                                glareOpacity={0}
                                glareWidth={0}
                                onClick={() => onRemoveCommand(index)}
                            >
                                {directionIcons[cmd]}
                            </TiltButton>
                            {/* Remove badge */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveCommand(index); }}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <FaTimes className="w-2.5 h-2.5" />
                            </button>
                        </div>
                    ))}

                    {/* Empty slot */}
                    <div
                        className={`shrink-0 border-2 border-dashed transition-all duration-150 ${isDragOver ? "border-[#1CB0F6] bg-[#1CB0F610]" : "border-gray-400 opacity-50"
                            }`}
                        style={{ width: TILE, height: TILE, borderRadius: RADIUS }}
                    />
                </div>
            </div>
        </div>
    );
}
