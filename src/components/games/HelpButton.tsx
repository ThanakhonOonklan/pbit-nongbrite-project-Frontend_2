"use client";

import { useState, useRef, useEffect } from "react";

export interface HelpStep {
    emoji: string;
    text: string;
}

interface HelpButtonProps {
    steps: HelpStep[];
}

export function HelpButton({ steps }: HelpButtonProps) {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const t = setTimeout(() => document.addEventListener("mousedown", handler), 0);
        return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
    }, [open]);

    return (
        <div className="hidden lg:flex fixed bottom-6 left-6 z-50 flex-row items-end gap-3" ref={panelRef}>

            {/* ── Trigger button ── */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex flex-col items-center gap-1 group focus:outline-none shrink-0"
                aria-label="วิธีเล่น"
            >
                <div className="w-16 h-16 rounded-full bg-white border-4 border-[#1E3A5F] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/P_Bit/bit-04.svg"
                        alt="Bit helper"
                        className="w-12 h-12 object-contain"
                    />
                </div>
                <div className="bg-[#1E3A5F] text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    วิธีการเล่น
                </div>
            </button>

            {/* ── Tooltip panel ── */}
            {open && (
                <div
                    className="relative w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 mb-1"
                    style={{ animation: "slideInRight 0.25s ease-out" }}
                >
                    {/* Arrow pointing LEFT */}
                    <div
                        className="absolute -left-2 bottom-6"
                        style={{
                            width: 0, height: 0,
                            borderTop: "8px solid transparent",
                            borderBottom: "8px solid transparent",
                            borderRight: "8px solid #E5E7EB",
                        }}
                    />
                    <div
                        className="absolute -left-[7px] bottom-[25px]"
                        style={{
                            width: 0, height: 0,
                            borderTop: "7px solid transparent",
                            borderBottom: "7px solid transparent",
                            borderRight: "7px solid white",
                        }}
                    />

                    {/* Steps */}
                    <div className="flex flex-col gap-3">
                        {steps.map((step, i) => (
                            <Step key={i} emoji={step.emoji} text={step.text} />
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(-10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}

function Step({ emoji, text }: { emoji: string; text: string }) {
    return (
        <div className="flex items-center gap-2.5 text-sm">
            <span className="text-lg">{emoji}</span>
            <span className="text-[#242E39] font-medium">{text}</span>
        </div>
    );
}
