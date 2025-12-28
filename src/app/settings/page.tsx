"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Divider, PrimaryButton, LoadingOverlay, BackgroundSquares, Container, LanguageDropdown, SoundToggle } from "@/components/common";
import { IoLanguage, IoVolumeHigh, IoLogOut } from "react-icons/io5";

export default function SettingsPage() {
  const router = useRouter();
  const { logout, isLoading } = useAuthStore();
  const [selectedLanguage, setSelectedLanguage] = React.useState<"th" | "en">("th");
  const [soundOn, setSoundOn] = React.useState(true);

  const languages = [
    { code: "th", label: "ไทย", flag: "/icons/language/th.svg" },
    { code: "en", label: "English", flag: "/icons/language/us.svg" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="flex h-screen "
      style={{
        background: "linear-gradient(135deg, #E3F2FD 0%, #F0F7FF 50%, #E8F4F8 100%)",
      }}
    >
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="min-h-full p-4 sm:p-5 md:p-6 pb-[90px] lg:pb-6 relative">
          <BackgroundSquares />

          {/* การ์ดหลักสไตล์เดียวกับ Login */}
          <Container
            variant="card"
            className="relative w-full max-w-[880px] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 z-10"
          >
            {/* Header */}
            <div className="w-full mb-4">
              <h2 className="text-[26px] md:text-[28px] leading-[36px] font-bold text-gray-800">
                ตั้งค่า
              </h2>
              <div className="mt-3 mb-6">
                <Divider />
              </div>
            </div>

            {/* กลุ่ม Settings */}
            <div className="w-full space-y-6">
              {/* ภาษา */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <IoLanguage className="w-6 h-6 text-[#1cb0f6]" />
                    <span className="text-[18px] font-semibold text-gray-800">
                      ภาษา
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-gray-500 ml-[32px]">
                    ตั้งค่าภาษาที่ใช้ภายในแอป
                  </p>
                </div>
                <LanguageDropdown
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={(code) => setSelectedLanguage(code as "th" | "en")}
                />
              </div>

              {/* เสียง */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <IoVolumeHigh className="w-6 h-6 text-[#1cb0f6]" />
                    <span className="text-[18px] font-semibold text-gray-800">
                      เสียง
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-gray-500 ml-[32px]">
                    เปิดหรือปิดเสียงเอฟเฟกต์ภายในเกม
                  </p>
                </div>
                <SoundToggle
                  isOn={soundOn}
                  onToggle={setSoundOn}
                />
              </div>
            </div>

            {/* ปุ่มออกจากบัญชี */}
            <div className="w-full flex justify-end mt-8">
              <PrimaryButton
                size="sm"
                variant="red-outline"
                className="flex items-center gap-2 hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <IoLogOut className="w-5 h-5" />
                <span>{isLoading ? "กำลังออกจากระบบ..." : "ออกจากบัญชี"}</span>
              </PrimaryButton>
            </div>
          </Container>
        </div>
      </main>
      
      <LoadingOverlay isLoading={isLoading} message="กำลังออกจากระบบ..." />
    </div>
  );
}
