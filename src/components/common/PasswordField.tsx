import * as React from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { Input } from "./Input";
import { getLabelClassName } from "@/lib/label";
import { cn } from "@/lib/utils";

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;

    return (
      <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
        {label && (
          <label htmlFor={inputId} className={getLabelClassName("text-[10px] leading-[18px] font-semibold text-[#334E68]")}>
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "pr-[32px]",
              hasError && "focus:ring-destructive",
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[8px] top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlash className="w-4 h-4 text-[#829AB1]" />
            ) : (
              <Eye className="w-4 h-4 text-[#829AB1]" />
            )}
          </button>
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-[10px] leading-[18px] text-red-500"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="text-[10px] leading-[18px] text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordField };

