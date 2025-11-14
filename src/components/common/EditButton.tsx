"use client";

import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const EditButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative inline-flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#D9D9D9] text-[#7F7F7F] shadow-[0px_2px_0px_0px_#9CA3AF,0px_3px_6px_rgba(156,163,175,0.2)] hover:bg-[#C4C4C4] active:translate-y-[1px] active:shadow-[0px_1px_0px_0px_#9CA3AF,0px_2px_4px_rgba(156,163,175,0.2)] active:transition-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9CA3AF]",
          className
        )}
        {...props}
      >
        <Pencil className="w-4 h-4" />
      </button>
    );
  }
);

EditButton.displayName = "EditButton";

export { EditButton };

