import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const socialButtonVariants = cva(
  "inline-flex items-center justify-center gap-[3px] whitespace-nowrap rounded-[8px] text-[12px] leading-[18px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-[#D0D5DD] text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50",
        selected:
          "bg-[#EAF8FF] border border-[#1CB0F6] text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]",
        female:
          "bg-[#FCE7F3] border border-[#F8BBD0] text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]",
        "not-specified":
          "bg-[#F3F4F6] border border-[#D1D5DB] text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SocialButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onClick" | "onSelect"
    >,
    VariantProps<typeof socialButtonVariants> {
  asChild?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  (
    { className, variant, selected = false, onSelect, onClick, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isSelected = selected && !variant;
    const currentVariant = variant || (isSelected ? "selected" : "default");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSelect) {
        onSelect(!selected);
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Comp
        className={cn(socialButtonVariants({ variant: currentVariant, className }))}
        ref={ref}
        style={{
          width: "130px",
          height: "38px",
          padding: "10px 16px",
        }}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

SocialButton.displayName = "SocialButton";

export { SocialButton, socialButtonVariants };

  