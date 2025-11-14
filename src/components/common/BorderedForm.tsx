import * as React from "react";
import { cn } from "@/lib/utils";

export interface BorderedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

const BorderedForm = React.forwardRef<HTMLFormElement, BorderedFormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(
          "flex flex-col items-start py-[32px] px-[24px] gap-[14px] w-[387px] h-[591px] bg-white rounded-[12px] border border-[#E5E5E5]",
          "transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </form>
    );
  }
);

BorderedForm.displayName = "BorderedForm";

export { BorderedForm };

