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
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  

  const userGender = "เพศชาย"; 
  
  // Get gender color based on gender value
  const getGenderColor = (gender: string) => {
    if (gender === "เพศชาย") return "text-[#1CB0F6]"; 
    if (gender === "เพศหญิง") return "text-[#EC4899]";
    return "text-[#344054]"; 
  };

  const navItems = [
    {
      label: "เรียนรู้",
      path: "/courses",
      icon: (
        <Image
          src="/icons/game/courses.svg"
          alt="Courses"
          width={32}
          height={32}
          className="object-contain"
         
        />
      ),
    },
    {
      label: "แรงค์",
      path: "/rank",
      icon: (
        <Image
          src="/icons/game/rank.svg"
          alt="Rank"
          width={32}
          height={32}
          className="object-contain"
   
        
        />
      ),
    },
    {
      label: "โปรไฟล์",
      path: "/profile",
      icon: (
        <Image
          src="/icons/game/profile.svg"
          alt="Profile"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
    },
    {
      label: "ตั้งค่า",
      path: "/settings",
      icon: (
        <Image
          src="/icons/game/settings.svg"  
          alt="Settings"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex h-screen flex-col border-neutral-200 shadow-[0_0px_5px_rgba(0,0,0,0.12)]",
          "bg-white  overflow-x-visible overflow-y-hidden ",
          isCollapsed ? "w-[80px]" : "w-[254px]",
          className
        )}
      >
      {/* Brand Section */}
      <div
        className={cn(
          "relative h-[100px] flex items-end justify-center ",
          isCollapsed ? "px-2" : "px-[18px]"
        )}
      >
        <Image
          src="/icons/misc/new_logo.svg"
          alt="P'Bit Nong Brite Logo"
          width={isCollapsed ? 70 : 220}
          height={isCollapsed ? 70 : 65}
          className="object-contain"
          sizes={isCollapsed ? "70px" : "220px"}
        />
      </div>

      {/* Navigation Links */}
      <nav
        className={cn(
          "flex flex-col gap-[10px] mt-7 ",
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
              <span className={cn("text-[14px] font-medium", getGenderColor(userGender))}>
                {userGender}
              </span>
            </div>
          )}
        </div>
      </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 h-[70px] flex flex-row items-center justify-around",
          "bg-white border-t border-neutral-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50",
          className
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
                "relative flex flex-col items-center justify-center py-3 px-4 rounded-[12px] transition-all duration-200 flex-1 max-w-[90px]",
                isActive
                  ? "text-[#1cb0f6] bg-[#EAF8FF]"
                  : "text-[#616161] hover:bg-[#F4F9FF]"
              )}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-[#1cb0f6]" />
              )}
              <div className={cn(
                "w-[28px] h-[28px] flex items-center justify-center transition-transform",
                isActive && "scale-110"
              )}>
                {item.icon}
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

Sidebar.displayName = "Sidebar";

export { Sidebar };
