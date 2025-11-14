import * as React from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
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
          <Label htmlFor={inputId} className="text-[12px] leading-[18px] font-semibold text-[#334E68]">
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={cn(hasError && "focus:ring-destructive", className)}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
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
InputField.displayName = "InputField";

export { InputField };

