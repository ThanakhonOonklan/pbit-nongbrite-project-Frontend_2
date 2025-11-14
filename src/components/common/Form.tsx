import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(
          "flex flex-col items-start py-[32px] px-[24px] gap-[14px] w-[387px] h-[591px] bg-white rounded-[12px]",
          "transition-all duration-300 ease-in-out",
          className
        )}
        style={{
          boxShadow:
            "0px -12px 16px -4px rgba(16, 24, 40, 0.08), 0px -4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        }}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

export { Form };

