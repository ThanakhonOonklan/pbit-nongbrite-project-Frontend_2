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
    /** เปิด animation ตอนแสดง (default: true) */
    animated?: boolean;
}

const StarIcon: React.FC<{
    filled: boolean;
    size: number;
    activeColor: string;
    inactiveColor: string;
    animated: boolean;
    delay: number;
}> = ({ filled, size, activeColor, inactiveColor, animated, delay }) => {
    return (
        <div
            className="star-rating-item"
            style={{
                width: size,
                height: size,
                "--star-color": filled ? activeColor : inactiveColor,
                "--star-delay": `${delay}ms`,
            } as React.CSSProperties}
        >
            <div className="star-svg-container">
                {/* Outline (empty star — same shape, just gray) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn("star-svg-outline", filled && animated && "star-hide")}
                    viewBox="0 0 576 512"
                >
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                </svg>

                {/* Filled star */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                        "star-svg-filled",
                        filled && animated && "star-show-animated",
                        filled && !animated && "star-show-static"
                    )}
                    viewBox="0 0 576 512"
                >
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                </svg>

                {/* Celebrate particles */}
                {filled && animated && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="star-svg-celebrate"
                        viewBox="0 0 100 100"
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <circle key={i} r="2" cy="50" cx="50" className={`star-particle star-particle-${i + 1}`} />
                        ))}
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
    animated = true,
}) => {
    const normalizedStars = Math.max(0, Math.min(3, stars));
    const prevStarsRef = React.useRef(normalizedStars);
    const [shouldAnimate, setShouldAnimate] = React.useState(false);

    React.useEffect(() => {
        // เล่น animation เฉพาะเมื่อดาวเพิ่มขึ้น
        if (normalizedStars > prevStarsRef.current) {
            setShouldAnimate(true);
            // ปิด animation หลังจากเล่นจบ (1 วินาที)
            const timer = setTimeout(() => setShouldAnimate(false), 1000);
            prevStarsRef.current = normalizedStars;
            return () => clearTimeout(timer);
        }
        prevStarsRef.current = normalizedStars;
    }, [normalizedStars]);

    return (
        <div className={cn("star-rating-container", className)}>
            {Array.from({ length: 3 }).map((_, i) => (
                <StarIcon
                    key={i}
                    filled={i < normalizedStars}
                    size={size}
                    activeColor={activeColor}
                    inactiveColor={inactiveColor}
                    animated={animated && shouldAnimate}
                    delay={i * 150}
                />
            ))}
        </div>
    );
};

StarRating.displayName = "StarRating";
