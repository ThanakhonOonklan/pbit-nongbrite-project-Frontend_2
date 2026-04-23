"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import "./StarRating.css";

export interface StarRatingProps {
    /** จำนวนดาวที่ได้ (0-3) */
    stars: number;
    /** ขนาดดาว (default: 48px) */
    size?: number;
    /** สีดาวที่ได้ */
    activeColor?: string;
    /** สีดาวที่ยังไม่ได้ */
    inactiveColor?: string;
    /** className เพิ่มเติม */
    className?: string;
    /** (Legacy) เปิด animation ตอนแสดง - ไม่ถูกนำมาใช้แล้ว */
    animated?: boolean;
}

const StarIcon: React.FC<{
    filled: boolean;
    size: number;
    activeColor: string;
    inactiveColor: string;
}> = ({ filled, size, activeColor, inactiveColor }) => {
    return (
        <div
            className="star-rating-item"
            style={{
                width: size,
                height: size,
                "--star-color": filled ? activeColor : inactiveColor,
            } as React.CSSProperties}
        >
            <div className="star-svg-container">
                {/* Outline (empty star — same shape, just gray) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="star-svg-outline"
                    viewBox="0 0 576 512"
                >
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                </svg>

                {/* Filled star */}
                {filled && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="star-svg-filled star-show-static"
                        viewBox="0 0 576 512"
                    >
                        <path
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export const StarRating: React.FC<StarRatingProps> = ({
    stars = 0,
    size = 48,
    activeColor = "#FED301",
    inactiveColor = "#C4C4C4",
    className,
}) => {
    const normalizedStars = Math.max(0, Math.min(3, stars));

    return (
        <div className={cn("star-rating-container", className)}>
            {Array.from({ length: 3 }).map((_, i) => (
                <StarIcon
                    key={i}
                    filled={i < normalizedStars}
                    size={size}
                    activeColor={activeColor}
                    inactiveColor={inactiveColor}
                />
            ))}
        </div>
    );
};

StarRating.displayName = "StarRating";
