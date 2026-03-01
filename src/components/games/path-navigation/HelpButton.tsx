"use client";

import { useState, useRef, useEffect } from "react";

export function HelpButton() {
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
        /* Fixed at bottom-left — button on left, tooltip slides out to the right */
        <div className="fixed bottom-6 left-6 z-50 flex flex-row items-end gap-3" ref={panelRef}>

            {/* ── Trigger button ── */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex flex-col items-center gap-1 group focus:outline-none shrink-0"
                aria-label="วิธีเล่น"
            >
                {/* Circle avatar */}
                <div className="w-16 h-16 rounded-full bg-white border-4 border-[#1E3A5F] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/P_Bit/bit-04.svg"
                        alt="Bit helper"
                        className="w-12 h-12 object-contain"
                    />
                </div>
                {/* Label */}
                <div className="bg-[#1E3A5F] text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    วิธีการเล่น
                </div>
            </button>

            {/* ── Tooltip panel (appears to the RIGHT of the button) ── */}
            {open && (
                <div
                    className="relative w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-visible mb-1"
                    style={{ animation: "slideInRight 0.25s ease-out" }}
                >
                    {/* Arrow pointing LEFT (toward the button) */}
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

                    {/* Header */}
                    <div className="bg-[#1E3A5F] px-4 py-3 flex items-center gap-2 rounded-t-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/P_Bit/bit-04.svg"
                            alt="Bit"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-white font-bold text-sm">เดี๋ยวพี่บิด! สอนเล่น</span>
                    </div>

                    {/* Steps */}
                    <div className="p-4 flex flex-col gap-3 text-[#242E39]">
                        <Step num={1} text="กด ปุ่มทิศทาง เพื่อเพิ่มคำสั่งเดิน" />
                        <Step num={2} text="พา Bit ไปรับ Nong-Brite" />
                        <Step num={3} text="พาทั้งคู่กลับบ้าน ให้ครบ" />
                        <Step num={4} text='กด "Run" เพื่อให้ตัวละครเดิน' />
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

function Step({ num, text }: { num: number; text: string }) {
    return (
        <div className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-[#1E3A5F] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {num}
            </span>
            <span>{text}</span>
        </div>
    );
}
