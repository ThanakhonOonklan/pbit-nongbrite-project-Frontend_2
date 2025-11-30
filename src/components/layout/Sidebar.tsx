"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaHome,
  FaTrophy,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems = [
    {
      label: "เรียนรู้",
      path: "/courses",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      label: "แรงค์",
      path: "/rank",
      icon: <FaTrophy className="w-5 h-5" />,
    },
    {
      label: "โปรไฟล์",
      path: "/profile",
      icon: <FaUserCircle className="w-5 h-5" />,
    },
    {
      label: "ตั้งค่า",
      path: "/settings",
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen flex flex-col border-neutral-200 shadow-[0_0px_5px_rgba(0,0,0,0.12)]",
        "bg-white transition-all duration-300 ease-in-out overflow-x-visible overflow-y-hidden",
        isCollapsed ? "w-[80px]" : "w-[254px]",
        className
      )}
    >
      {/* Brand Section */}
      <div
        className={cn(
          "relative h-[100px] flex items-center transition-all duration-300",
          isCollapsed ? "px-2 justify-center" : "px-[18px] justify-start"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "relative flex-shrink-0 rounded-full transition-transform duration-300",
            isCollapsed ? "w-[42px] h-[42px]" : "w-[49px] h-[49px] translate-y-[2px]"
          )}
        >
          <Image
            src="/icons/logo.png"
            alt="Logo"
            fill
            containerClassName="w-full h-full rounded-full"
            className="object-cover"
            priority
            sizes="49px"
          />
        </div>

        {/* Brand Name */}
        {!isCollapsed && (
          <div className="ml-[12px] flex items-center flex-1 min-w-0">
            <p className="text-[18px] leading-[28px] font-bold whitespace-nowrap">
              <span className="text-[#1cb0f6]">P&apos;Bit </span>
              <span className="text-[#ffd300]">Nong Brite</span>
            </p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav
        className={cn(
          "flex flex-col gap-[10px] mt-7 transition-all duration-300",
          isCollapsed ? "px-2" : "px-[16px]"
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              prefetch={true}
              className={cn(
                // Card-like nav item
                "relative h-[52px] rounded-[14px] flex items-center transition-all duration-200 border-2",
                isCollapsed
                  ? "w-full justify-center px-0"
                  : "w-[222px] px-[14px]",
                isActive
                  ? "bg-[#EAF8FF] border-[#84d8ff] shadow-sm"
                  : "border-transparent hover:bg-[#F4F9FF] hover:border-[#E0F2FF] hover:shadow-[0_2px_6px_rgba(28,176,246,0.08)] active:bg-[#EAF8FF] active:border-[#CCE9FF]"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active left indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[6px] h-[70%] rounded-r-[6px] bg-[#1cb0f6]" />
              )}
              {/* Icon */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-[12px] transition-colors",
                  isCollapsed
                    ? "w-[44px] h-[44px]"
                    : "w-[44px] h-[44px] mr-[4px]",
                  isActive ? "text-[#1cb0f6]" : "text-[#1c1c1c]"
                )}
              >
                {item.icon}
              </div>

              {/* Label */}
              {!isCollapsed && (
                <span
                  className={cn(
                    "ml-[10px] text-[14px] leading-[25px] font-bold tracking-[0.8px] uppercase whitespace-nowrap",
                    isActive ? "text-[#1cb0f6]" : "text-[#616161]"
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div
        className={cn(
          "mt-auto border-t border-[#E2E8F0] transition-all duration-300",
          isCollapsed ? "px-2 py-4" : "px-4 py-5"
        )}
      >
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <div className="relative w-[42px] h-[42px] flex-shrink-0">
            <Image
              src="/icons/logo.png"
              alt="User Avatar"
              fill
              containerClassName="w-[42px] h-[42px] rounded-full bg-[#EAF8FF]"
              className="object-cover"
              sizes="42px"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold text-[#242E39] leading-tight truncate">
                Thanakhon OonkIan
              </span>
              <button className="text-[14px] font-medium text-[#1a73e8] hover:underline text-left">
                sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };
