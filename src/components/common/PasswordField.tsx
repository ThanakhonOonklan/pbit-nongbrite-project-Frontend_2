import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "./Input";
import { getLabelClassName } from "@/lib/label";
import { cn } from "@/lib/utils";

export interface PasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  showErrorText?: boolean;
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
      value,
      defaultValue,
      onChange,
      showErrorText = true,
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
          <label htmlFor={inputId} className={getLabelClassName("text-[12px] leading-[18px] font-semibold text-[#334E68]")}>
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={cn(
              "h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 pr-[40px] text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all",
              hasError && "border-red-400 focus:ring-destructive",
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
              <FaEyeSlash className="w-4 h-4 text-[#829AB1]" />
            ) : (
              <FaEye className="w-4 h-4 text-[#829AB1]" />
            )}
          </button>
        </div>
        {error && showErrorText && (
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

