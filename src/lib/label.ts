import { cn } from "./utils";

export const getLabelClassName = (className?: string): string => {
  return cn(
    "block text-sm font-medium text-foreground mb-1",
    className
  );
};

