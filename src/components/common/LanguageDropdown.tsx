"use client";

import * as React from "react";
import { Image } from "./Image";
import { cn } from "@/lib/utils";

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

export interface LanguageDropdownProps {
  languages: LanguageOption[];
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  className?: string;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl",
          "text-[14px] font-medium text-gray-700",
          "border border-neutral-200 bg-white",
          "hover:bg-neutral-50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2",
          "min-w-[140px] justify-between"
        )}
      >
        <div className="flex items-center gap-2">
          {selectedLang && (
            <>
              <Image
                src={selectedLang.flag}
                alt={selectedLang.label}
                width={28}
                height={28}
                className="object-contain"
              />
              <span>{selectedLang.label}</span>
            </>
          )}
        </div>
        <svg
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
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
      {isOpen && (
        <div
          className={cn(
            "absolute top-full right-0 mt-2 w-full min-w-[140px]",
            "bg-white border border-neutral-200 rounded-xl shadow-lg",
            "z-50 py-2"
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-3 text-[14px] transition-colors",
                "hover:bg-[#1cb0f6]/10",
                selectedLanguage === lang.code
                  ? "text-[#1cb0f6] font-medium bg-[#1cb0f6]/5"
                  : "text-gray-700"
              )}
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={28}
                height={28}
                className="object-contain"
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

LanguageDropdown.displayName = "LanguageDropdown";

