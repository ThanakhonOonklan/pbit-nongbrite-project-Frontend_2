"use client";

import * as React from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = "กำลังโหลด..." 
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className=" rounded-lg p-8 flex flex-col items-center gap-4 ">
        <LoadingSpinner size="sm" />
        <p className="text-[#ffffff] font-medium">{message}</p>
      </div>
    </div>
  );
};

