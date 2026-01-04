"use client";

import * as React from "react";
import {
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
  type MotionValue,
  type Transition,
} from "motion/react";
import Image from "next/image";

export interface CarouselItem {
  id: number | string;
  title?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 1,
    imageSrc: "/icons/game/gameprofile.png",
  },
  {
    id: 2,
    imageSrc: "/icons/game/gameprofile.png",
  },
  {
    id: 3,
    imageSrc: "/icons/game/gameprofile.png",
  },
  {
    id: 4,
    imageSrc: "/icons/game/gameprofile.png",
  },
];

const DRAG_BUFFER = 0; // ค่า threshold สำหรับการลาก
const VELOCITY_THRESHOLD = 500; // ความเร็วขั้นต่ำสำหรับการเลื่อนอัตโนมัติ
const GAP = 16; // ระยะห่างระหว่าง items
const SPRING_OPTIONS: Transition = { type: "spring", stiffness: 300, damping: 30 }; 

interface CarouselCardProps {
  item: CarouselItem;
  index: number;
  x: MotionValue<number>;
  trackItemOffset: number;
  itemWidth: number;
  round?: boolean;
  transition: Transition;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  x,
  trackItemOffset,
  itemWidth,
  round,
  transition,
}) => {
  // คำนวณมุมการหมุน 3D ตามตำแหน่ง x
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90]; // มุมการหมุน (องศา)
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  const cardRadius = round ? "9999px" : "20px";
  const cardHeight = round ? itemWidth : itemWidth * 0.7;

  return (
    <motion.div
      className={`relative shrink-0 overflow-hidden cursor-grab active:cursor-grabbing ${
        round ? "flex items-center justify-center bg-[#060010]" : "flex flex-col bg-white"
      }`}
      style={{
        width: itemWidth,
        height: cardHeight,
        rotateY,
        borderRadius: cardRadius,
      }}
      transition={transition}
    >   
      <Image
        src={item.imageSrc}
        alt={item.imageAlt || item.title || "Carousel image"}
        fill
        sizes={`${itemWidth}px`}
        className={`object-cover pointer-events-none ${round ? "opacity-100" : ""}`}
        loading={index === 0 ? "eager" : "lazy"}
        priority={index === 0}
      />

      {!round && (
        <div className="relative z-10 mt-auto p-4 bg-gradient-to-t from-black via-transparent to-transparent text-black">
          <div className="text-sm font-semibold">{item.title}</div>
          <p className="text-xs opacity-90">{item.description}</p>
        </div>
      )}
    </motion.div>
  );
};

const Carousel: React.FC<CarouselProps> = ({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) => {
  const containerPadding = 16; 
  const itemWidth = baseWidth - containerPadding * 2; 
  const trackItemOffset = itemWidth + GAP;
  const carouselItems = loop ? [...items, items[0]] : items; 
  const [currentIndex, setCurrentIndex] = React.useState(0); 
  const x = useMotionValue(0); 
  const [isHovered, setIsHovered] = React.useState(false); 
  const [isResetting, setIsResetting] = React.useState(false); 
  const containerRef = React.useRef<HTMLDivElement>(null);

  // จัดการ hover event สำหรับ pause autoplay
  React.useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // จัดการ autoplay
  React.useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && !isResetting) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          // ถ้า loop mode และอยู่ที่ item สุดท้าย ให้ไปที่ duplicate item
          if (loop && prev === items.length - 1) {
            return prev + 1;
          }
          // ถ้าอยู่ที่ duplicate item (carouselItems.length - 1) ให้ reset กลับไปที่ 0
          if (prev === carouselItems.length - 1) {
            return 0;
          }
          // เลื่อนไปหน้าถัดไป
          return prev + 1;
        });
      }, autoplayDelay);

      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover, isResetting]);

  // ใช้ transition แบบไม่มี animation เมื่อ reset
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  // จัดการเมื่อ animation เสร็จสิ้น (สำหรับ loop mode)
  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      // Reset กลับไปที่ index 0 โดยไม่แสดง animation
      setIsResetting(true);
      // ใช้ requestAnimationFrame เพื่อให้ reset เกิดขึ้นหลังจาก render เสร็จ
      requestAnimationFrame(() => {
        x.set(0);
        setCurrentIndex(0);
        // รอให้ state update เสร็จก่อนจึงจะปิด reset flag
        requestAnimationFrame(() => {
          setIsResetting(false);
        });
      });
    }
  };

  // จัดการเมื่อลากเสร็จ (drag end)
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x; // ระยะทางที่ลาก
    const velocity = info.velocity.x; // ความเร็วในการลาก

    // ลากไปทางซ้าย (เลื่อนไปหน้าถัดไป)
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } 
    // ลากไปทางขวา (เลื่อนกลับไปหน้าก่อนหน้า)
    else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // ตั้งค่า drag constraints (ขอบเขตการลาก)
  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  // คำนวณความกว้างของ track
  const trackWidth = carouselItems.length * trackItemOffset;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4  ${round ? "rounded-full" : "rounded-[24px]"}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        drag="x"
        {...dragProps}
        style={{
          width: `${trackWidth}px`,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselCard
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            x={x}
            trackItemOffset={trackItemOffset}
            itemWidth={itemWidth}
            round={round}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {items.length > 0 && (
        <div
          className={`flex w-full justify-center ${
            round ? "absolute bottom-12 left-1/2 -translate-x-1/2 z-10" : ""
          }`}
        >
          <div className="mt-4 flex w-[140px] justify-between px-8">
            {items.map((_, index) => {
              const isActive = currentIndex % items.length === index;
              return (
                <motion.div
                  key={index}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? round
                        ? "bg-white"
                        : "bg-[#333333]"
                      : round
                        ? "bg-[#666666]"
                        : "bg-[#666666]"
                  }`}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  onClick={() => setCurrentIndex(index)}
                  transition={{ duration: 0.2 }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;