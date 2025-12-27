import * as React from "react";
import { Container } from "@/components/common/Container";
import { ProgressItem, LevelData } from "./ProgressItem";
import { cn } from "@/lib/utils";

export interface ProgressItemData {
  title: string;
  current: number;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  levels?: LevelData[];
}

export interface ProgressListProps {
  items: ProgressItemData[];
  className?: string;
}

export const ProgressList: React.FC<ProgressListProps> = ({
  items,
  className,
}) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container
      className={cn(
        "p-4 sm:p-5 md:p-4 lg:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div 
        className="space-y-4 overflow-y-auto px-1 py-2 -mx-1 -my-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        style={{ 
          maxHeight: '400px', 
        }}
      >
        {items.map((item, index) => (
          <ProgressItem
            key={index}
            title={item.title}
            current={item.current}
            total={item.total}
            icon={item.icon}
            color={item.color}
            levels={item.levels}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </Container>
  );
};

