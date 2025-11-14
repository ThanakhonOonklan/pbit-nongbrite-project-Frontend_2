"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "หน้าหลัก",
      path: "/courses",
      emoji: "🏠",
    },
    {
      label: "แรงค์",
      path: "/rank",
      emoji: "🏆",
    },
    {
      label: "โปรไฟล์",
      path: "/profile",
      emoji: "👤",
    },
    {
      label: "ตั้งค่า",
      path: "/settings",
      emoji: "⚙️",
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen w-[254px] flex flex-col border-r-2 border-neutral-200",
        // Soft kid-friendly gradient background
        "bg-gradient-to-b from-[#F9FBFF] via-[#F6FAFF] to-[#F4F8FF]",
        className
      )}
    >
      {/* Brand Section */}
      <div className="relative h-[100px] flex items-center px-[21px]">
        {/* Logo */}
        <div className="relative w-[49px] h-[49px]">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-[49px] h-[49px] rounded-full"
            className="object-cover"
            priority
            sizes="49px"
          />
        </div>

        {/* Brand Name */}
        <div className="ml-[8px]">
          <p className="text-[18px] leading-[28px] font-bold whitespace-nowrap">
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-[10px] px-[16px] mt-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              prefetch={true}
              className={cn(
                // Card-like nav item
                "relative h-[52px] w-[222px] rounded-[14px] flex items-center px-[14px] transition-all duration-200 border-2",
                isActive
                  ? "bg-[#EAF8FF] border-[#84d8ff] shadow-sm"
                  : "border-transparent hover:bg-[#F4F9FF] hover:border-[#E0F2FF] hover:shadow-[0_2px_6px_rgba(28,176,246,0.08)] active:bg-[#EAF8FF] active:border-[#CCE9FF]"
              )}
            >
              {/* Active left indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[70%] rounded-r-[6px] bg-[#1cb0f6]" />
              )}
              {/* Emoji */}
              <div
                className={cn(
                  "w-[36px] h-[36px] mr-[4px] flex items-center justify-center text-[22px] rounded-[10px] transition-colors"
                )}
              >
                {item.emoji}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "ml-[10px] text-[14px] leading-[25px] font-bold tracking-[0.8px] uppercase whitespace-nowrap",
                  isActive ? "text-[#1cb0f6]" : "text-[#616161]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Friendly footer card */}
      <div className="mt-auto p-4">
        <div className="w-full rounded-[14px] bg-white border border-[#EAF0F6] shadow-[0_4px_10px_rgba(0,0,0,0.04)] p-3 flex items-center gap-3">
          <div className="relative w-[36px] h-[36px]">
            <Image
              src="/icons/logo.png"
              alt="Mascot"
              fill
              containerClassName="w-[36px] h-[36px] rounded-full"
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] text-[#7f7f7f]">พร้อมเรียนรู้ไหม?</span>
            <span className="text-[13px] font-bold text-[#1cb0f6]">
              ไปต่อกันเลย!
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };

