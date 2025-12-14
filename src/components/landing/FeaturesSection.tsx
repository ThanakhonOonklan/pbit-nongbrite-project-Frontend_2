"use client";

import { useState, useEffect } from "react";
import { CourseLoop, type LogoItem } from "./CourseLoop";
import { Image } from "@/components/common/Image";

// ข้อมูลเกมทั้ง 7 เกมในรูปแบบ LogoItem
const gameCards: LogoItem[] = [
  {
    src: "/icons/gameprofile_1.png",
    alt: "Path Navigation",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Counting & Classification",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Conditional Matching",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Sequencing",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Step Counting",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Fruit Matching Grid",
    width: 320,
    height: 400,
  },
  {
    src: "/icons/gameprofile_1.png",
    alt: "Grid-based Coloring",
    width: 320,
    height: 400,
  },
];


const GameCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative rounded-xl overflow-hidden bg-gray-100 
                  w-[280px] h-[180px]
                  sm:w-[320px] sm:h-[200px]
                  md:w-[340px] md:h-[220px]
                  lg:w-[340px] lg:h-[220px]
                  transition-all duration-300 hover:scale-105 
                  flex items-center justify-center">
    <Image
      src={src}
      alt={alt}
      width={350}
      height={230}
      className="w-full h-full object-contain transition-transform duration-300 hover:scale-100 rounded-xl"
      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
    />
  </div>
);

export function FeaturesSection() {
  const [viewportSize, setViewportSize] = useState({
    logoHeight: 240,
    gap: 40,
    speed: 50
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setViewportSize({ logoHeight: 180, gap: 24, speed: 40 });
      } else if (width < 1024) {
        // Tablet
        setViewportSize({ logoHeight: 200, gap: 32, speed: 45 });
      } else {
        // Desktop
        setViewportSize({ logoHeight: 240, gap: 40, speed: 50 });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            หลักสูตร
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            เรียนรู้ผ่านเกมสนุกๆ ทั้ง 7 เกม พัฒนาทักษะการคิดและการแก้ปัญหา
          </p>
        </div>
      </div>

      {/* Course Games Loop - Full Width */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[250px] sm:h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden">
        <CourseLoop
            logos={gameCards}
            speed={viewportSize.speed}
            direction="left"
            logoHeight={viewportSize.logoHeight}
            gap={viewportSize.gap}
            pauseOnHover={true}
            hoverSpeed={60}
            scaleOnHover={true}
            fadeOut={false}
            renderItem={(item, key) => {
              if ('src' in item) {
                return (
                  <GameCard
                    key={key}
                    src={item.src}
                    alt={item.alt || item.title || 'Game'}
                  />
                );
              }
              return null;
            }}
            ariaLabel="Course Games"
            className="py-4"
          />
      </div>
    </section>
  );
}

