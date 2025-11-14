import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glossyGreenButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-white font-bold ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-[#19C371] shadow-[0px_4px_0px_0px_#14A35E,0px_6px_12px_rgba(25,195,113,0.3)] hover:bg-[#1ACF78] active:translate-y-[2px] active:shadow-[0px_2px_0px_0px_#14A35E,0px_4px_8px_rgba(25,195,113,0.3)] active:transition-none",
        outline:
          "border-2 border-[#19C371] bg-transparent text-[#19C371] hover:bg-[#19C371]/10",
      },
      size: {
        default: "h-[50px] px-[60px] text-[18px] rounded-[25px]",
        sm: "h-[40px] px-[40px] text-[16px] rounded-[20px]",
        lg: "h-[60px] px-[80px] text-[20px] rounded-[30px]",
        full: "h-[50px] w-full px-[60px] text-[18px] rounded-[25px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GlossyGreenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glossyGreenButtonVariants> {
  asChild?: boolean;
  hideGlossy?: boolean;
}

const GlossyGreenButton = React.forwardRef<HTMLButtonElement, GlossyGreenButtonProps>(
  ({ className, variant, size, asChild = false, hideGlossy = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(glossyGreenButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Glossy overlay effect - only for default variant */}
        {!hideGlossy && variant === "default" && (
          <span className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
            {/* Small highlight dots on top-left */}
            <span className="absolute top-[12%] left-[5%] w-[10px] h-[7px] bg-white/80 rounded-full blur-[1px]" />
            <span className="absolute top-[18%] left-[3.5%] w-[6px] h-[5px] bg-white/70 rounded-full blur-[1px]" />
            
            {/* Large curved highlight on bottom-right */}
            <span className="absolute bottom-[8%] right-[6%] w-[35%] h-[40%] bg-gradient-to-tl from-white/35 via-white/20 to-transparent rounded-full blur-[6px]" />
            
            {/* Optional: subtle top shine */}
            <span className="absolute top-0 left-[15%] right-[15%] h-[30%] bg-gradient-to-b from-white/15 to-transparent rounded-[inherit]" />
          </span>
        )}

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </Comp>
    );
  }
);

GlossyGreenButton.displayName = "GlossyGreenButton";

export { GlossyGreenButton, glossyGreenButtonVariants };

