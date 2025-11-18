import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "inline-flex items-center justify-center ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default variants (beige)
        default:
          "rounded-[16px] bg-[#EDD0AE] shadow-[0px_4px_0px_0px_#D9BA94,0px_6px_12px_rgba(217,186,148,0.3)] hover:bg-[#F0D7B8] hover:translate-y-[1px] hover:shadow-[0px_3px_0px_0px_#D9BA94,0px_5px_10px_rgba(217,186,148,0.3)] active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        locked:
          "rounded-[16px] bg-[#EDD0AE] shadow-[0px_4px_0px_0px_#D9BA94,0px_6px_12px_rgba(217,186,148,0.3)] opacity-50 hover:opacity-60 active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none cursor-pointer",
        
        // Blue variants
        blue:
          "rounded-[16px] bg-[#1CB0F6] shadow-[0px_4px_0px_0px_#1899D6,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#1FB5F8] hover:translate-y-[1px] hover:shadow-[0px_3px_0px_0px_#1899D6,0px_5px_10px_rgba(28,176,246,0.3)] active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "blue-locked":
          "rounded-[16px] bg-[#1CB0F6] shadow-[0px_4px_0px_0px_#1899D6,0px_6px_12px_rgba(28,176,246,0.3)] opacity-50 hover:opacity-60 active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none cursor-pointer text-white",
        
        // Green variants
        green:
          "rounded-[16px] bg-[#19C371] shadow-[0px_4px_0px_0px_#14A35E,0px_6px_12px_rgba(25,195,113,0.3)] hover:bg-[#1ACF78] hover:translate-y-[1px] hover:shadow-[0px_3px_0px_0px_#14A35E,0px_5px_10px_rgba(25,195,113,0.3)] active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "green-locked":
          "rounded-[16px] bg-[#19C371] shadow-[0px_4px_0px_0px_#14A35E,0px_6px_12px_rgba(25,195,113,0.3)] opacity-50 hover:opacity-60 active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none cursor-pointer text-white",
      },
      size: {
        default: "min-w-[90px] h-[60px] px-[20px]",
        sm: "min-w-[86px] h-[48px] px-[18px]",
        lg: "min-w-[134px] h-[72px] px-[30px]",
      },
    },
    defaultVariants: {  
      variant: "default",
      size: "default",
    },
  }
);

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, asChild = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(gameButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon || children}
      </Comp>
    );
  }
);
GameButton.displayName = "GameButton";

export { GameButton, gameButtonVariants };

