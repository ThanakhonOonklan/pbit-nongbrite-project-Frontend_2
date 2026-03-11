"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface NavbarProps {
  className?: string;
}

type Language = "TH" | "EN";

type NavItem = {
  targetId: string;
  translationKey: string;
};

const NAV_ITEMS: NavItem[] = [
  { targetId: "hero", translationKey: "navbar.navItems.home" },
  { targetId: "features", translationKey: "navbar.navItems.courses" },
  { targetId: "content", translationKey: "navbar.navItems.content" },
  { targetId: "stats", translationKey: "navbar.navItems.stats" },
];

const OBSERVE_SECTIONS = ["hero", "features", "content", "stats"];

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: "TH", label: "ไทย" },
    { code: "EN", label: "English" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
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


  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    OBSERVE_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navBaseClasses = useMemo(
    () =>
      cn(
        "sticky top-0 z-50 w-full h-[80px] flex items-center",
        "px-6 md:px-12 lg:px-16",
        "transition-all duration-300 ease-out",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] border-b border-white/60"
          : "bg-[#EDF0F7]/95 backdrop-blur-md shadow-none border-b border-transparent"
      ),
    [isScrolled]
  );

  const handleNavClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      if (targetId === "hero") {

        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {

        const offsetTop = el.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  };

  const handleLoginClick = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 600));
    router.push("/login");
  };

  return (
    <>
      <nav
        className={cn(navBaseClasses, className)}
      >
        {/* Logo and Brand */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/icons/misc/new_logo.svg"
            alt="P'Bit Nong Brite Logo"
            width={200}
            height={55}
            className="object-contain"
            priority
            sizes="200px"
          />
        </Link>

        {/* Navigation Menu + Right Side */}
        <div className="ml-auto flex items-center gap-4 lg:gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => handleNavClick(item.targetId)}
                  className={cn(
                    "text-[16px] font-medium transition-colors pb-1 border-b-2",
                    isActive
                      ? "text-[#1cb0f6] border-[#1cb0f6]"
                      : "text-gray-700 border-transparent hover:text-[#1cb0f6]"
                  )}
                >
                  {t(item.translationKey)}
                </button>
              );
            })}
          </div>

          {/* Language Dropdown + Login */}
          <div className="flex items-center gap-3 md:gap-4">
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
                <span>{language}</span>
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
                        setLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-[14px] transition-colors",
                        "hover:bg-[#1cb0f6]/10",
                        language === lang.code
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

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLoginClick}
              disabled={isLoading}
              className={cn(
                "px-5 py-2 rounded-lg text-[14px] font-medium",
                "bg-[#1cb0f6] text-white",
                "hover:bg-[#17a3e3] transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {t("navbar.login")}
            </button>
          </div>
        </div>
      </nav>
      <LoadingOverlay
        isLoading={isLoading}
        message={t("navbar.loading")}
      />
    </>
  );
};

Navbar.displayName = "Navbar";
