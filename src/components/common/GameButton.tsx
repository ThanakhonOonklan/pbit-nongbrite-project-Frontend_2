import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "inline-flex items-center justify-center ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default variants (beige)
        default:
          "rounded-[16px] bg-[#EDD0AE] shadow-[0px_4px_0px_0px_#D9BA94,0px_6px_12px_rgba(217,186,148,0.3)] hover:bg-[#F0D7B8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none",
        
        // Color Palette variants
        amethyst:
          "rounded-[16px] bg-[#9956DE] shadow-[0px_4px_0px_0px_#6B3D9E,0px_6px_12px_rgba(153,86,222,0.3)] hover:bg-[#8A4FC8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "slate-blue":
          "rounded-[16px] bg-[#7274ED] shadow-[0px_4px_0px_0px_#4A4C9D,0px_6px_12px_rgba(114,116,237,0.3)] hover:bg-[#6264D8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "summer-sky":
          "rounded-[16px] bg-[#1FA7E1] shadow-[0px_4px_0px_0px_#156A98,0px_6px_12px_rgba(31,167,225,0.3)] hover:bg-[#1B95CA] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        downy:
          "rounded-[16px] bg-[#6ED1CF] shadow-[0px_4px_0px_0px_#478F8D,0px_6px_12px_rgba(110,209,207,0.3)] hover:bg-[#5FB8B6] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "pastel-green":
          "rounded-[16px] bg-[#75D06A] shadow-[0px_4px_0px_0px_#4D8F45,0px_6px_12px_rgba(117,208,106,0.3)] hover:bg-[#66BB5A] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "texas-rose":
          "rounded-[16px] bg-[#FFB356] shadow-[0px_4px_0px_0px_#B37D3A,0px_6px_12px_rgba(255,179,86,0.3)] hover:bg-[#E6A04D] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "mona-lisa":
          "rounded-[16px] bg-[#FF8B8B] shadow-[0px_4px_0px_0px_#B35A5A,0px_6px_12px_rgba(255,139,139,0.3)] hover:bg-[#E67A7A] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        illusion:
          "rounded-[16px] bg-[#FB96BB] shadow-[0px_4px_0px_0px_#B0667F,0px_6px_12px_rgba(251,150,187,0.3)] hover:bg-[#E085A6] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
        "sky-blue":
          "rounded-[16px] bg-[#1CB0F6] shadow-[0px_4px_0px_0px_#1699D6,0px_6px_12px_rgba(28,176,246,0.3)] hover:bg-[#1FB5F8] hover:translate-y-[4px] hover:shadow-[0px_0px_0px_0px_transparent] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_transparent] active:transition-none text-white",
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

