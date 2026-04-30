"use client";

import React from "react";

/** SkyBackground — ท้องฟ้าสีฟ้า + ก้อนเมฆปุย 5 ก้อน (ไม่มี animation) */
export const SkyBackground = React.memo(function SkyBackground() {
    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* ── Sky Gradient ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, #87CEEB 0%, #B8E4F5 60%, #C9EEF8 100%)",
                }}
            />

            {/* ── Puffy Clouds (static) ── */}
            {/* Cloud 1 — top left large */}
            <div className="absolute" style={{ left: "2%", top: "6%", width: 170, opacity: 0.90 }}>
                <PuffyCloud />
            </div>
            {/* Cloud 2 — top center */}
            <div className="absolute" style={{ left: "30%", top: "4%", width: 120, opacity: 0.82 }}>
                <PuffyCloud />
            </div>
            {/* Cloud 3 — top right large */}
            <div className="absolute" style={{ left: "60%", top: "7%", width: 190, opacity: 0.88 }}>
                <PuffyCloud />
            </div>
            {/* Cloud 4 — mid right small */}
            <div className="absolute" style={{ left: "82%", top: "20%", width: 100, opacity: 0.75 }}>
                <PuffyCloud />
            </div>
            {/* Cloud 5 — mid left small */}
            <div className="absolute" style={{ left: "16%", top: "24%", width: 90, opacity: 0.70 }}>
                <PuffyCloud />
            </div>
        </div>
    );
});

/** ก้อนเมฆ Cute Puffy (SVG) */
function PuffyCloud() {
    return (
        <svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <ellipse cx="82" cy="78" rx="60" ry="10" fill="#C8E8F5" opacity="0.40" />
            <circle cx="55" cy="58" r="28" fill="white" />
            <circle cx="85" cy="50" r="32" fill="white" />
            <circle cx="115" cy="58" r="24" fill="white" />
            <rect x="30" y="58" width="110" height="22" fill="white" />
            <circle cx="72" cy="38" r="14" fill="white" opacity="0.55" />
        </svg>
    );
}
