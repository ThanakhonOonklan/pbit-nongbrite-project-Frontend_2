"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

type Language = "TH" | "EN";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>("TH");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: "TH", label: "ไทย" },
    { code: "EN", label: "English" },
  ];

  const menuItems = [
    { label: "เกี่ยวกับ", href: "/about", enLabel: "About" },
    { label: "หลักสูตร", href: "/courses", enLabel: "Courses" },
    { label: "วิธีใช้", href: "/how-it-works", enLabel: "How it works" },
    { label: "ช่วยเหลือ", href: "/help", enLabel: "Help" },
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  return (
    <nav
      className={cn(
        "w-full h-[80px] flex items-center justify-between px-6 md:px-12 lg:px-16",
        "bg-white/80 backdrop-blur-sm border-b border-neutral-100/50",
        "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {/* Logo and Brand */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
        <div className="relative w-[49px] h-[49px] transition-transform group-hover:scale-105">
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
        <div>
          <p className="text-[18px] leading-[28px] font-bold whitespace-nowrap">
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>
        </div>
      </Link>

      {/* Navigation Menu - Center */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[16px] font-medium text-gray-700 hover:text-[#1cb0f6] transition-colors"
          >
            {selectedLanguage === "TH" ? item.label : item.enLabel}
          </Link>
        ))}
      </div>

      {/* Right Side - Language Dropdown + Login Button */}
      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg",
              "text-[14px] font-medium text-gray-700",
              "border border-neutral-200 bg-white",
              "hover:bg-neutral-50 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2"
            )}
          >
            <span>{selectedLanguage}</span>
            <svg
              className={cn(
                "w-4 h-4 transition-transform",
                isLanguageDropdownOpen && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-[14px] transition-colors",
                    "hover:bg-[#1cb0f6]/10",
                    selectedLanguage === lang.code
                      ? "text-[#1cb0f6] font-medium bg-[#1cb0f6]/5"
                      : "text-gray-700"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Login Button - Simple */}
        <Link href="/login">
          <button
            type="button"
            className={cn(
              "px-6 py-2 rounded-lg text-[14px] font-medium",
              "bg-[#1cb0f6] text-white",
              "hover:bg-[#17a3e3] transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2"
            )}
          >
            {selectedLanguage === "TH" ? "เข้าสู่ระบบ" : "Login"}
          </button>
        </Link>
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";
