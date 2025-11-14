"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/common/Container";
import { Divider } from "@/components/common/Divider";

import { GlossyGreenButton } from "@/components/common/GlossyGreenButton";

export default function SettingsPage() {
  const [langOn, setLangOn] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(true);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F6F7FB] overflow-auto flex items-start justify-start pl-12 pt-12">
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
            <GlossyGreenButton 
              size="sm"
              onClick={handleLogout}
              className="!bg-[#FF4D4D] !shadow-[0px_4px_0px_0px_#E63939,0px_6px_12px_rgba(255,77,77,0.3)] hover:!bg-[#FF5C5C] active:!shadow-[0px_2px_0px_0px_#E63939,0px_4px_8px_rgba(255,77,77,0.3)] !h-[35px] !px-[30px] !text-[14px]"
            >
              ออกจากบัญชี
            </GlossyGreenButton>
          </div>
        </Container>
      </main>
    </div>
  );
}


