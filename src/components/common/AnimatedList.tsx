"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { FaTrophy } from "react-icons/fa";

type ItemClassNameResolver<T> = (args: {
  item: T;
  index: number;
  isActive: boolean;
}) => string;

interface AnimatedListItemProps {
  index: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  index,
  delay = 0,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref} 
      data-index={index}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className={cn("mb-0", className)}
    >
      {children}
    </motion.div>
  );
};

export interface AnimatedListProps<T> {
  items?: T[];
  renderItem: (args: { item: T; index: number; isActive: boolean }) => React.ReactNode;
  getKey?: (item: T, index: number) => React.Key;
  className?: string;
  listClassName?: string;
  displayScrollbar?: boolean;
  enableArrowNavigation?: boolean;
  initialSelectedIndex?: number;
  onItemSelect?: (item: T, index: number) => void;
  itemClassName?: string | ItemClassNameResolver<T>;
  emptyState?: React.ReactNode;
  animationDelayStep?: number;
}

function resolveItemClassName<T>(
  itemClassName: AnimatedListProps<T>["itemClassName"],
  args: { item: T; index: number; isActive: boolean }
) {
  if (typeof itemClassName === "function") {
    return itemClassName(args);
  }
  return itemClassName;
}

function AnimatedList<T>({
  items = [],
  renderItem,
  getKey,
  className,
  listClassName,
  displayScrollbar = true,
  enableArrowNavigation = true,
  initialSelectedIndex = -1,
  onItemSelect,
  itemClassName,
  emptyState,
  animationDelayStep = 0.001,
}: AnimatedListProps<T>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(initialSelectedIndex);
  const keyboardNavRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  React.useEffect(() => {
    if (!keyboardNavRef.current || selectedIndex < 0 || !listRef.current) return;

    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement | null;

    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }

    keyboardNavRef.current = false;
  }, [selectedIndex]);

  React.useEffect(() => {
    if (items.length === 0) {
      setSelectedIndex(initialSelectedIndex);
      return;
    }

    setSelectedIndex((prev) => {
      if (prev < 0) return prev;
      return Math.min(prev, items.length - 1);
    });
  }, [items.length, initialSelectedIndex]);

  const handleSelect = React.useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index);
      onItemSelect?.(item, index);
    },
    [onItemSelect]
  );

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      <div
        ref={listRef}
        className={cn(
          "flex-1 overflow-y-auto space-y-1.5",
          displayScrollbar ? "custom-scrollbar" : "scrollbar-hide",
          listClassName
        )}
        style={{
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: displayScrollbar ? "#cbd5e0 transparent" : "transparent",
        }}
      >
        {items.length === 0 ? (
          emptyState ?? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <FaTrophy className="w-12 h-12 mb-2 text-[#FBBF24]" />
              <p className="text-[14px] text-[#909090] text-center">ยังไม่มีข้อมูล</p>
            </div>
          )
        ) : (
          items.map((item, index) => {
            const isActive = selectedIndex === index;
            const key = getKey ? getKey(item, index) : index;
            const resolvedClassName = resolveItemClassName(itemClassName, {
              item,
              index,
              isActive,
            });

            return (
              <AnimatedListItem
                key={key}
                index={index}
                delay={animationDelayStep * index}
                className={resolvedClassName}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(initialSelectedIndex)}
                onClick={() => handleSelect(item, index)}
              >
                {renderItem({ item, index, isActive })}
              </AnimatedListItem>
            );
          })
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
}

export default AnimatedList;
