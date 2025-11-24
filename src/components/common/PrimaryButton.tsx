import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const primaryButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#F0FAFB] text-[#149384] border-2 border-[#69D4CE] shadow-[0px_4px_0px_0px_#55B8B4] hover:bg-[#E8F7F8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        outline:
          "border-2 border-[#1CB0F6] bg-transparent text-[#1CB0F6] hover:bg-[#1CB0F6]/10",
        yellow:
          "bg-[#FFD300] text-[#D97706] shadow-[0px_4px_0px_0px_#E6BE00,0px_6px_12px_rgba(230,190,0,0.3)] hover:bg-[#FFDB1A] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "red-outline":
          "border-2 border-[#FF4D4D] bg-transparent text-[#FF4D4D] hover:bg-[#FF4D4D]/10",
        amethyst:
          "bg-[#9956DE] text-white border-2 border-[#7A45B0] shadow-[0px_4px_0px_0px_#6B3D9E] hover:bg-[#8A4FC8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "slate-blue":
          "bg-[#7274ED] text-white border-2 border-[#5A5CBD] shadow-[0px_4px_0px_0px_#4A4C9D] hover:bg-[#6264D8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "summer-sky":
          "bg-[#1FA7E1] text-white border-2 border-[#1886B8] shadow-[0px_4px_0px_0px_#156A98] hover:bg-[#1B95CA] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        downy:
          "bg-[#6ED1CF] text-white border-2 border-[#57A8A6] shadow-[0px_4px_0px_0px_#478F8D] hover:bg-[#5FB8B6] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "pastel-green":
          "bg-[#75D06A] text-white border-2 border-[#5DA854] shadow-[0px_4px_0px_0px_#4D8F45] hover:bg-[#66BB5A] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "texas-rose":
          "bg-[#FFB356] text-white border-2 border-[#CC9044] shadow-[0px_4px_0px_0px_#B37D3A] hover:bg-[#E6A04D] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "mona-lisa":
          "bg-[#FF8B8B] text-white border-2 border-[#CC6F6F] shadow-[0px_4px_0px_0px_#B35A5A] hover:bg-[#E67A7A] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        illusion:
          "bg-[#FB96BB] text-white border-2 border-[#C97895] shadow-[0px_4px_0px_0px_#B0667F] hover:bg-[#E085A6] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "sky-blue":
          "bg-[#1CB0F6] text-white border-2 border-[#1699D6] shadow-[0px_4px_0px_0px_#1280B5] hover:bg-[#1FB5F8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
      },
      size: {
        default: "px-8 py-3 text-lg rounded-[30px]",
        sm: "px-6 py-2 text-base rounded-[10px]",
        lg: "px-10 py-4 text-xl rounded-[14px]",
        full: "px-8 py-3 text-lg w-full rounded-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof primaryButtonVariants> {
  asChild?: boolean;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(primaryButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton, primaryButtonVariants };

