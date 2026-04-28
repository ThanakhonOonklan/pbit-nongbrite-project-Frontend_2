"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "motion/react";
import { useUserStore } from "@/store/user.store";

export function GameHearts() {
    const lifeDetails = useUserStore((state) => state.lifeDetails);
    const user = useUserStore((state) => state.user);
    const fetchProfile = useUserStore((state) => state.fetchProfile);
    const fetchLifeDetails = useUserStore((state) => state.fetchLifeDetails);

    // fetch ถ้าข้อมูลหายหลัง F5
    useEffect(() => {
        if (!user) fetchProfile();
        if (!lifeDetails) fetchLifeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ใช้ user.life.lifeCurrent ก่อน เพราะ reduceLife() อัปเดตที่นี่
    // lifeDetails.current อัปเดตเฉพาะตอน fetchLifeDetails() จึงใช้เป็น fallback เท่านั้น
    const lifeCurrent = user?.life?.lifeCurrent ?? lifeDetails?.current ?? 5;
    const lifeMax = lifeDetails?.max ?? 5;

    const controls = useAnimation();
    // null = ยังไม่มีข้อมูลจริง (หลัง F5) ป้องกัน shake ผิด
    const prevLifeRef = useRef<number | null>(null);

    useEffect(() => {
        // ยังไม่มี user → ข้อมูลยังเป็น fallback ไม่ track
        if (!user) return;

        if (prevLifeRef.current !== null && lifeCurrent < prevLifeRef.current) {
            // ชีวิตลดจริง → shake
            controls.start({
                x: [0, -5, 5, -4, 4, -2, 0],
                scale: [1, 0.92, 1.08, 0.96, 1.04, 1, 1],
                transition: { duration: 0.45, ease: "easeInOut" },
            });
        }
        prevLifeRef.current = lifeCurrent;
    }, [lifeCurrent, controls, user]);

    return (
        <motion.div
            animate={controls}
            className="flex items-center gap-0.5 sm:gap-1"
        >
            {Array.from({ length: lifeMax }).map((_, i) => (
                <Image
                    key={i}
                    src="/icons/Heart.svg"
                    alt="Heart"
                    width={20}
                    height={20}
                    className={`w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm transition-all duration-300 ${
                        i >= lifeCurrent ? "opacity-30 grayscale" : ""
                    }`}
                />
            ))}
        </motion.div>
    );
}
