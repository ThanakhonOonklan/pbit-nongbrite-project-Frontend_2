import React from "react";
import { motion } from "motion/react";
import { BOBO_IMAGES } from "./constants";

interface BoboMascotProps {
  boboState: "idle" | "squeeze" | "celebrate" | "bounce";
  chipText: string;
  hintBorderColor: string;
  ratioTextColor: string;
}

export function BoboMascot({
  boboState,
  chipText,
  hintBorderColor,
  ratioTextColor,
}: BoboMascotProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "40px", marginRight: "30%" }}>
      <motion.img
        src={BOBO_IMAGES[boboState] || BOBO_IMAGES.idle}
        alt="Bobo"
        width={100}
        height={100}
        variants={{
          idle: { scaleX: 1, scaleY: 1, rotate: 0, y: 0 },
          squeeze: {
            scaleX: [1, 1.18, 0.96, 1],
            scaleY: [1, 0.78, 1.06, 1],
            transition: { duration: 0.38, ease: "easeInOut" }
          },
          celebrate: {
            rotate: [0, -14, 14, 0],
            y: [0, -4, -4, 0],
            transition: { duration: 0.55, ease: "easeInOut", repeat: Infinity }
          },
          bounce: {
            rotate: [0, -8, 8, 0],
            transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity }
          }
        }}
        initial="idle"
        animate={boboState}
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
          transformOrigin: "bottom center",
        }}
      />
      {/* Chip message bubble */}
      <div
        style={{
          background: "#fff",
          border: `3px solid ${hintBorderColor}`,
          borderRadius: 24,
          padding: "12px 20px",
          fontSize: 16,
          color: ratioTextColor,
          fontWeight: 700,
          maxWidth: 240,
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* Subtle speech bubble tail */}
        <div style={{
          position: "absolute",
          left: -8,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
          width: 14,
          height: 14,
          background: "#fff",
          borderBottom: `3px solid ${hintBorderColor}`,
          borderLeft: `3px solid ${hintBorderColor}`,
        }} />
        <span style={{ position: "relative", zIndex: 1 }}>{chipText}</span>
      </div>
    </div>
  );
}
