import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-[34px] rounded-[8px] bg-[#F0F4F8] px-[8px] py-[8px] text-[12px] leading-[18px] text-foreground placeholder:text-[#829AB1] border-0 focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out hover:bg-[#E8F4FB] hover:ring-1 hover:ring-[#1cb0f6]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

