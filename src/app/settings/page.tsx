"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/common/Container";
import { Divider } from "@/components/common/Divider";
import { PrimaryButton } from "@/components/common";

export default function SettingsPage() {
  const router = useRouter();
  const { logout, isLoading } = useAuthStore();
  const [langOn, setLangOn] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="h-full p-6">
          <Container variant="white" className="w-[875px] h-auto py-[48px] px-[64px] gap-[24px] flex flex-col items-start">
            {/* Header */}
            <div className="w-full">
              <h2 className="text-[28px] leading-[40px] font-bold text-[#3C3C3C]">ตั้งค่า</h2>
              <Divider />
            </div>

            {/* Settings Rows */}
            <div className="w-full space-y-[24px]">
              {/* Language row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[24px]">🌐</span>
                  <span className="text-[18px] font-bold text-[#3C3C3C]">Language</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLangOn(v => !v)}
                  className={`relative w-[57px] h-[24px] rounded-[12px] transition-colors ${langOn ? "bg-[#1CB0F6]" : "bg-[#E5E5E5]"}`}
                  aria-pressed={langOn}
                >
                  <span
                    className={`absolute top-[-5px] ${langOn ? "left-[25px] border-[#1CB0F6]" : "left-0 border-[#E5E5E5]"} w-[32px] h-[34px] rounded-[10px] bg-white border-[2px] border-b-[4px] transition-all`}
                  />
                </button>
              </div>

              {/* Sound row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[24px]">🔊</span>
                  <span className="text-[18px] font-bold text-[#3C3C3C]">Sound</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundOn(v => !v)}
                  className={`relative w-[57px] h-[24px] rounded-[12px] transition-colors ${soundOn ? "bg-[#1CB0F6]" : "bg-[#E5E5E5]"}`}
                  aria-pressed={soundOn}
                >
                  <span
                    className={`absolute top-[-5px] ${soundOn ? "left-[25px] border-[#1CB0F6]" : "left-0 border-[#E5E5E5]"} w-[32px] h-[34px] rounded-[10px] bg-white border-[2px] border-b-[4px] transition-all`}
                  />
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="w-full flex justify-end">
              <PrimaryButton
                size="sm"
                variant="red-outline"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "กำลังออกจากบัญชี..." : "ออกจากบัญชี"}
              </PrimaryButton>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}


