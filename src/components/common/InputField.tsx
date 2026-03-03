import * as React from "react";
import { Input } from "./Input";
import { getLabelClassName } from "@/lib/label";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  showErrorText?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
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
        <Input
          id={inputId}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            "h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all",
            hasError && "border-red-400 focus:ring-destructive",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
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
InputField.displayName = "InputField";

export { InputField };

