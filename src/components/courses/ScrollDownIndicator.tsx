"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollDownIndicatorProps {
    visible?: boolean;
    className?: string;
}

export const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
    visible = true,
    className,
}) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={cn(
                        "fixed bottom-28 lg:bottom-6 inset-x-0 lg:pl-[160px] lg:pr-[300px]  flex flex-col items-center gap-2 pointer-events-none",
                        className
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Mouse outline */}
                    <div className="relative w-[28px] h-[44px] rounded-full border-2 border-gray-400/70 flex items-start justify-center pt-2">
                        {/* Scroll wheel dot - bouncing animation */}
                        <motion.div
                            className="w-[4px] h-[8px] rounded-full bg-gray-400/70"
                            animate={{
                                y: [0, 12, 0],
                                opacity: [1, 0.3, 1],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* "Scroll" text */}
                    <motion.span
                        className="text-[11px] font-medium text-gray-400/70 tracking-wider uppercase select-none"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        เลื่อนลงไปเกมถัดไป
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ScrollDownIndicator.displayName = "ScrollDownIndicator";
