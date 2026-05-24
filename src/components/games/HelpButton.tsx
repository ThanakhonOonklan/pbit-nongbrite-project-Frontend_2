"use client";
import { useTranslations } from "next-intl";

interface HelpButtonProps {
    onClick?: () => void;
    color?: string;
}

export function HelpButton({ onClick, color = "#1E3A5F" }: HelpButtonProps) {
    const t = useTranslations("HelpButton");
    return (
        <div className="hidden lg:flex fixed bottom-6 left-6 z-50 flex-row items-end gap-3">
            {/* ── Trigger button ── */}
            <button
                onClick={onClick}
                className="flex flex-col items-center gap-1 group focus:outline-none shrink-0"
                aria-label={t("ariaLabel")}
            >
                <div
                    className="w-16 h-16 rounded-full bg-white border-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 relative overflow-hidden"
                    style={{ borderColor: color }}
                >
                    <div
                        className="absolute inset-0 opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-200"
                        style={{ backgroundColor: color }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/icons/game/lightbulb.svg"
                        alt={t("imageAlt")}
                        className="w-10 h-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-200 drop-shadow-md"
                    />
                </div>
                <div
                    className="text-white text-xs font-bold px-3 py-1 rounded-lg shadow transition-colors duration-200"
                    style={{ backgroundColor: color }}
                >
                    {t("label")}
                </div>
            </button>
        </div>
    );
}
