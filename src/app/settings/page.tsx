"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useSettingsStore } from "@/store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Divider, PrimaryButton, LoadingOverlay, BackgroundSquares, Container, LanguageDropdown, SoundToggle } from "@/components/common";
import { IoLanguage, IoVolumeHigh, IoLogOut } from "react-icons/io5";
import { useTranslations, useLocale } from "next-intl";
import { setUserLocale } from "@/actions/locale";

export default function SettingsPage() {
  const router = useRouter();
  const { logout, isLoading } = useAuthStore();
  const { soundOn, setSoundOn } = useSettingsStore();
  const currentLocale = useLocale() as "th" | "en";
  const [selectedLanguage, setSelectedLanguage] = React.useState<"th" | "en">(currentLocale);
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslations("Settings");

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
                {t("title")}
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
                      {t("languageTitle")}
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-gray-500 ml-[32px]">
                    {t("languageDesc")}
                  </p>
                </div>
                <LanguageDropdown
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={async (code) => {
                    const newLocale = code as "th" | "en";
                    setSelectedLanguage(newLocale);
                    await setUserLocale(newLocale);
                    router.refresh();
                  }}
                />
              </div>

              {/* เสียง */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <IoVolumeHigh className="w-6 h-6 text-[#1cb0f6]" />
                    <span className="text-[18px] font-semibold text-gray-800">
                      {t("soundTitle")}
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-gray-500 ml-[32px]">
                    {t("soundDesc")}
                  </p>
                </div>
                <SoundToggle
                  isOn={mounted ? soundOn : true}
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
                <span>{isLoading ? t("logoutLoading") : t("logoutBtn")}</span>
              </PrimaryButton>
            </div>
          </Container>
        </div>
      </main>

      <LoadingOverlay isLoading={isLoading} message={t("logoutLoading")} />
    </div>
  );
}
