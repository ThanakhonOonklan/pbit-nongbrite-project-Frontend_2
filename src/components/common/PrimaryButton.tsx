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
          "bg-[#1CB0F6] text-white shadow-[0px_4px_0px_0px_#1899D6,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#1FB5F8] hover:translate-y-[1px] hover:shadow-[0px_3px_0px_0px_#1899D6,0px_5px_10px_rgba(28,176,246,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        outline:
          "border-2 border-[#1CB0F6] bg-transparent text-[#1CB0F6] hover:bg-[#1CB0F6]/10",
        yellow:
          "bg-[#FFD300] text-[#D97706] shadow-[0px_4px_0px_0px_#E6BE00,0px_6px_12px_rgba(230,190,0,0.3)] hover:bg-[#FFDB1A] hover:translate-y-[1px] hover:shadow-[0px_3px_0px_0px_#E6BE00,0px_5px_10px_rgba(230,190,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        "red-outline":
          "border-2 border-[#FF4D4D] bg-transparent text-[#FF4D4D] hover:bg-[#FF4D4D]/10",
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

