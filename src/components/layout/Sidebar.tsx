"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { House, Trophy, UserCircle, Gear } from "phosphor-react";

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "เรียนรู้",
      path: "/courses",
      icon: <House className="w-5 h-5" weight="fill" />,
    },
    {
      label: "แรงค์",
      path: "/rank",
      icon: <Trophy className="w-5 h-5" weight="fill" />,
    },
    {
      label: "โปรไฟล์",
      path: "/profile",
      icon: <UserCircle className="w-5 h-5" weight="fill" />,
    },
    {
      label: "ตั้งค่า",
      path: "/settings",
      icon: <Gear className="w-5 h-5" weight="fill" />,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen w-[254px] flex flex-col border-neutral-200 shadow-[0_0px_5px_rgba(0,0,0,0.12)]",
        "bg-white",
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
      <nav className="flex flex-col gap-[10px] px-[16px] mt-7">
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
              {/* Icon */}
              <div
                className={cn(
                  "w-[44px] h-[44px] mr-[4px] flex items-center justify-center rounded-[12px] transition-colors",
                  isActive ? "text-[#1cb0f6]" : "text-[#1c1c1c]"
                )}
              >
                {item.icon}
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

      {/* User footer */}
      <div className="mt-auto px-4 py-5 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="relative w-[42px] h-[42px]">
            <Image
              src="/icons/logo.png"
              alt="User Avatar"
              fill
              containerClassName="w-[42px] h-[42px] rounded-full bg-[#EAF8FF]"
              className="object-cover"
              sizes="42px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-[#242E39] leading-tight">
              Thanakhon OonkIan
            </span>
            <button className="text-[14px] font-medium text-[#1a73e8] hover:underline text-left">
              sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };

