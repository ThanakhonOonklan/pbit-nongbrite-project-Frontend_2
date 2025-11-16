import * as React from "react";
import { Container } from "@/components/common/Container";
import { ProgressItem } from "./ProgressItem";
import { cn } from "@/lib/utils";

export interface ProgressItemData {
  title: string;
  current: number;
  total: number;
}

export interface ProgressListProps {
  items: ProgressItemData[];
  className?: string;
}

export const ProgressList: React.FC<ProgressListProps> = ({
  items,
  className,
}) => {
  return (
    <Container variant="white" className={cn("p-6 rounded-t-none", className)}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <ProgressItem
            key={index}
            title={item.title}
            current={item.current}
            total={item.total}
          />
        ))}
      </div>
    </Container>
  );
};

