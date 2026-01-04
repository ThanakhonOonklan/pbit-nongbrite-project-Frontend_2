import * as React from "react";
import { Container } from "@/components/common/Container";
import { ProgressItem, LevelData } from "./ProgressItem";
import { cn } from "@/lib/utils";
import {
  FaRoute,
  FaSquare,
  FaLink,
  FaRecycle,
  FaRuler,
  FaTh,
  FaPalette,
} from "react-icons/fa";

// Helper function to generate level data
const generateLevels = (completedLevels: number): LevelData[] => {
  return Array.from({ length: 9 }, (_, i) => {
    const level = i + 1;
    if (level <= completedLevels) {
      const stars = 3 - ((level - 1) % 3);
      return { level, stars, completed: true };
    }
    return { level, stars: 0, completed: false };
  });
};

export interface ProgressItemData {
  title: string;
  current: number;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  levels?: LevelData[];
}

export interface ProgressListProps {
  items?: ProgressItemData[];
  className?: string;
}

// Default progress items data
const defaultProgressItems: ProgressItemData[] = [
  {
    title: "Path Navigation",
    current: 1,
    total: 9,
    icon: <FaRoute className="w-5 h-5" />,
    color: "#1CB0F6",
    levels: generateLevels(1),
  },
  {
    title: "Counting & Classification",
    current: 3,
    total: 9,
    icon: <FaSquare className="w-5 h-5" />,
    color: "#FB96BB",
    levels: generateLevels(3),
  },
  {
    title: "Conditional Matching",
    current: 3,
    total: 9,
    icon: <FaLink className="w-5 h-5" />,
    color: "#FFB356",
    levels: generateLevels(3),
  },
  {
    title: "Sequencing",
    current: 3,
    total: 9,
    icon: <FaRecycle className="w-5 h-5" />,
    color: "#9956DE",
    levels: generateLevels(3),
  },
  {
    title: "Step Counting",
    current: 0,
    total: 9,
    icon: <FaRuler className="w-5 h-5" />,
    color: "#6ED1CF",
    levels: generateLevels(0),
  },
  {
    title: "Fruit Matching Grid Game",
    current: 0,
    total: 9,
    icon: <FaTh className="w-5 h-5" />,
    color: "#FF8B8B",
    levels: generateLevels(0),
  },
  {
    title: "Grid-based Coloring",
    current: 0,
    total: 9,
    icon: <FaPalette className="w-5 h-5" />,
    color: "#FFD700",
    levels: generateLevels(0),
  },
];

export const ProgressList: React.FC<ProgressListProps> = ({
  items = defaultProgressItems,
  className,
}) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container
      className={cn(
        "p-3 sm:p-4 md:p-3 lg:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Header */}
      <div className="w-full mb-4 border-b border-gray-200 pb-1">
        <h2 className="text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] leading-[28px] font-bold text-gray-800">
          ความคืบหน้า
        </h2>
      </div>
      <div
        className="space-y-4 overflow-y-auto px-1.5 py-2 -mx-1 -my-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#1cb0f6]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
        style={{
          maxHeight: "369px",
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
