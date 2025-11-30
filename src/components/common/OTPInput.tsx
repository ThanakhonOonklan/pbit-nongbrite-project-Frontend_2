import * as React from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  onComplete?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  hasError?: boolean;
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 6, value, onChange, onComplete, className, inputClassName, hasError = false }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(0);

    // Initialize value array if empty
    React.useEffect(() => {
      if (value.length === 0) {
        onChange(new Array(length).fill(""));
      }
    }, [length, value.length, onChange]);

    const handleChange = (index: number, char: string) => {
      // Only allow single digit
      if (char.length > 1) {
        char = char.charAt(char.length - 1);
      }
      
      // Only allow numbers
      if (char && !/^\d$/.test(char)) {
        return;
      }

      const newValue = [...value];
      newValue[index] = char;
      onChange(newValue);

      // Auto-focus next input
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }

      // Call onComplete when all fields are filled
      if (char && index === length - 1) {
        const otp = newValue.join("");
        if (otp.length === length && onComplete) {
          onComplete(otp);
        }
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
      
      if (/^\d+$/.test(pastedData)) {
        const newValue = [...value];
        pastedData.split("").forEach((char, i) => {
          if (i < length) {
            newValue[i] = char;
          }
        });
        onChange(newValue);
        
        // Focus on the next empty input or the last one
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
        setFocusedIndex(nextIndex);
      }
    };

    const handleFocus = (index: number) => {
      setFocusedIndex(index);
      inputRefs.current[index]?.select();
    };

    return (
      <div ref={ref} className={cn("flex gap-[10px] items-center justify-center", className)}>
        {Array.from({ length }).map((_, index) => {
          const isFocused = focusedIndex === index;
          
          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              className={cn(
                "w-[56px] h-[60px] rounded-[8px] border border-solid text-center text-[20px] font-bold leading-[18px]",
                "font-['Inter']",
                "focus:outline-none focus:ring-0 transition-colors",
                hasError && "border-[rgba(239,68,68,0.5)] shadow-[0px_2px_0px_0px_rgba(185,28,28,0.3)] text-[#DC2626]",
                !hasError && "bg-white border-[rgba(208,213,221,0.5)] shadow-[0px_2px_0px_0px_rgba(156,163,175,0.3)] text-[#344054]",
                isFocused && !hasError && "bg-[#eaf8ff] border-[rgba(28,176,246,0.5)] shadow-[0px_2px_0px_0px_rgba(14,165,233,0.3)] text-[#1CB0F6]",
                inputClassName
              )}
              aria-label={`OTP digit ${index + 1}`}
            />
          );
        })}
      </div>
    );
  }
);

OTPInput.displayName = "OTPInput";

export { OTPInput };

