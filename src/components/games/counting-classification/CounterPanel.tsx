"use client";

import { type ShapeType } from "@/constants/games/counting-classification-levels";
import { CounterRow } from "./CounterRow";
import { FaPlay } from "react-icons/fa";
import { TiltButton } from "react-tilt-button";
import { useTranslations } from "next-intl";

interface CounterPanelProps {
    shapeTypes: ShapeType[];
    counts: Record<ShapeType, number>;
    maxPerShape?: number;
    onCountChange: (type: ShapeType, newValue: number) => void;
    onSubmit: () => void;
    onReset?: () => void;
    disabled?: boolean;
}

export function CounterPanel({
    shapeTypes,
    counts,
    maxPerShape = 30,
    onCountChange,
    onSubmit,
    onReset,
    disabled = false,
}: CounterPanelProps) {
    const t = useTranslations("CountingClassification");

    return (
        <div className="flex flex-col gap-3 h-full">

            {/* Header */}
            <div className="flex items-center justify-center gap-2 py-2">
                <span
                    className="text-lg sm:text-2xl font-black tracking-wide"
                    style={{
                        color: "#4DB6AC", // Teal
                        textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 6px rgba(0,0,0,0.05)"
                    }}
                >
                    {t.rich("panelTitle", {
                        highlight: (chunks) => <span style={{ color: "#F06292" }}>{chunks}</span>
                    })}
                </span>
            </div>

            {/* Counter rows */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1 pb-1">
                {shapeTypes.map((type) => (
                    <CounterRow
                        key={type}
                        type={type}
                        value={counts[type] ?? 0}
                        maxValue={maxPerShape}
                        onIncrement={() => onCountChange(type, (counts[type] ?? 0) + 1)}
                        onDecrement={() => onCountChange(type, Math.max(0, (counts[type] ?? 0) - 1))}
                        disabled={disabled}
                    />
                ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2" style={{ flexShrink: 0 }}>
                <div className="flex-[2]">
                    <TiltButton
                        variant="solid"
                        width="100%"
                        height={60}
                        elevation={7}
                        pressInset={7}
                        tilt={0.85}
                        radius={28}
                        motion={40}
                        surfaceColor={disabled ? "#E0E0E0" : "#22C55E"}
                        sideColor={disabled ? "#BDBDBD" : "#15803D"}
                        textColor={disabled ? "#9E9E9E" : "#ffffff"}
                        glareOpacity={0}
                        glareWidth={0}
                        disabled={disabled}
                        onClick={onSubmit}
                    >
                        <span style={{ fontSize: 22, fontWeight: 900, display: "flex", alignItems: "center", gap: 10 }}>
                            <FaPlay className="w-5 h-5" /> {t("confirm")}
                        </span>
                    </TiltButton>
                </div>
                {onReset && (
                    <div className="flex-[1]">
                        <TiltButton
                            variant="solid"
                            width="100%"
                            height={60}
                            elevation={7}
                            pressInset={7}
                            tilt={0.85}
                            radius={28}
                            motion={40}
                            surfaceColor={disabled ? "#E0E0E0" : "#ffffff"}
                            sideColor={disabled ? "#BDBDBD" : "#D1D5DB"}
                            textColor={disabled ? "#9E9E9E" : "#131F24"}
                            glareOpacity={0}
                            glareWidth={0}
                            disabled={disabled}
                            onClick={onReset}
                        >
                            <span style={{ fontSize: 18, fontWeight: 900 }}>{t("reset")}</span>
                        </TiltButton>
                    </div>
                )}
            </div>

        </div>
    );
}
