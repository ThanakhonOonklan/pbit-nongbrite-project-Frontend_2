"use client";

import { useState } from "react";
import { TiltButton } from "react-tilt-button";
import { type Direction } from "@/constants/games/path-navigation-levels";

interface DirectionControlsProps {
    onAddCommand: (direction: Direction) => void;
    disabled?: boolean;
}

const BUTTONS: { direction: Direction; icon: React.ReactNode; label: string }[] = [
    { direction: "left", icon: <img src="/icons/Arrow/ArrowLeft.svg" alt="ซ้าย" className="w-7 h-7" />, label: "ซ้าย" },
    { direction: "up", icon: <img src="/icons/Arrow/ArrowUp.svg" alt="บน" className="w-7 h-7" />, label: "บน" },
    { direction: "down", icon: <img src="/icons/Arrow/ArrowDown.svg" alt="ล่าง" className="w-7 h-7" />, label: "ล่าง" },
    { direction: "right", icon: <img src="/icons/Arrow/ArrowRight.svg" alt="ขวา" className="w-7 h-7" />, label: "ขวา" },
];

function DirectionButton({
    direction,
    icon,
    label,
    disabled,
    onAddCommand,
}: {
    direction: Direction;
    icon: React.ReactNode;
    label: string;
    disabled: boolean;
    onAddCommand: (d: Direction) => void;
}) {
    const [dragging, setDragging] = useState(false);

    return (
        /* Wrap with draggable div — TiltButton doesn't expose native drag events */
        <div
            draggable={!disabled}
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", direction);
                e.dataTransfer.effectAllowed = "copy";
                setDragging(true);
            }}
            onDragEnd={() => setDragging(false)}
            className={`select-none ${dragging ? "opacity-40 scale-95" : ""} transition-opacity duration-150`}
            title={label}
        >
            <TiltButton
                width={77}
                height={77}
                elevation={8}
                pressInset={8}
                tilt={0.89}
                radius={17}
                motion={60}
                surfaceColor={disabled ? "#6B7280" : "#1491ff"}
                sideColor={disabled ? "#4B5563" : "#1587bd"}
                textColor="#ffffff"
                borderColor={disabled ? "#9CA3AF" : "#43a7ff"}
                borderWidth={3}
                glareColor="#ffffff"
                glareOpacity={0}
                glareWidth={0}
                disabled={disabled}
                onClick={() => !disabled && onAddCommand(direction)}
            >
                {icon}
            </TiltButton>
        </div>
    );
}

export function DirectionControls({
    onAddCommand,
    disabled = false,
}: DirectionControlsProps) {
    return (
        <div>
            <p className="text-sm font-semibold text-[#F1F7FB] mb-3">
                กดหรือลากคำสั่ง
            </p>
            <div className="flex gap-3">
                {BUTTONS.map((btn) => (
                    <DirectionButton
                        key={btn.direction}
                        direction={btn.direction}
                        icon={btn.icon}
                        label={btn.label}
                        disabled={disabled}
                        onAddCommand={onAddCommand}
                    />
                ))}
            </div>
        </div>
    );
}
