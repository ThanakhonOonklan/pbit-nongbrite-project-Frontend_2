import { cn } from "./utils";

/**
 * Utility function to get label className
 * Use this instead of Label component for simple styling
 */
export const getLabelClassName = (className?: string): string => {
  return cn(
    "block text-sm font-medium text-foreground mb-1",
    className
  );
};

