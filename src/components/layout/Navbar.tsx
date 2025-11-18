"use client";

import * as React from "react";
import { Image } from "@/components/common/Image";
import { PrimaryButton } from "@/components/common";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav
      className={cn(
        "w-full h-[80px] flex items-center justify-between px-6 md:px-12",
        "bg-white border-b border-neutral-200 shadow-sm",
        className
      )}
    >
      {/* Logo and Brand */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
        <div>
          <p className="text-[18px] leading-[28px] font-bold whitespace-nowrap">
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Login Button - Yellow */}
        <Link href="/login">
          <PrimaryButton variant="yellow" size="full">
            Login
          </PrimaryButton>
        </Link>

        {/* Start Button - Blue */}
        <Link href="/courses">
          <PrimaryButton size="full">
            Start
          </PrimaryButton>
        </Link>
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";
