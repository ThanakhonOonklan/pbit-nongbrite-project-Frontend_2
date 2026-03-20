"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TiltButton } from "react-tilt-button";
import { FaHome } from "react-icons/fa";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";

export function OutOfLivesModal() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const goHome = () => {
    setIsNavigating(true);
    router.push("/courses");
  };

  return (
    <>
      <LoadingOverlay isLoading={isNavigating} message="กำลังกลับสู่หน้าหลัก..." />
      {!isNavigating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-[360px] rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-red-200"
            style={{ animation: "modalIn 0.35s ease-out" }}
          >
            {/* Title */}
            <div className="pt-6 pb-2 text-center">
              <h2 className="text-3xl font-extrabold text-[#FF6B6B] mt-1">
                หัวใจหมดแล้ว!
              </h2>
            </div>

            {/* Images */}
            <div className="flex justify-center items-end gap-2 py-4">
              <Image
                src="/images/Nong_brite/nong-brite-02.svg" // Sad Nong brite
                alt="Nong Brite Sad"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Message */}
            <p className="text-center text-gray-500 text-sm pb-6 px-6 font-medium">
              คุณใช้หัวใจจนหมดแล้ว กรุณารอหัวใจฟื้นฟูใหม่นะครับ
            </p>

            {/* Action Buttons */}
            <div className="flex px-6 pb-6">
              <div className="flex-1 w-full">
                <TiltButton
                  width="100%"
                  height={52}
                  elevation={6}
                  pressInset={6}
                  tilt={0.5}
                  radius={14}
                  motion={60}
                  surfaceColor="#1CB0F6"
                  sideColor="#0A8ED9"
                  textColor="#ffffff"
                  borderColor="transparent"
                  borderWidth={0}
                  glareOpacity={0}
                  glareWidth={0}
                  onClick={goHome}
                >
                  <span className="flex items-center justify-center gap-2 font-bold text-sm">
                    <FaHome className="w-3.5 h-3.5" /> กลับหน้าหลัก
                  </span>
                </TiltButton>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes modalIn {
                from { opacity: 0; transform: scale(0.9) translateY(20px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
