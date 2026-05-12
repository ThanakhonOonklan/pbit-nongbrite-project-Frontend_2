"use client";

import { useState, useEffect } from "react";
import { PrimaryButton, LoadingOverlay } from "@/components/common";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlurText } from "@/components/common";
import { useTranslations } from "next-intl";
import confetti from "canvas-confetti";

export function HeroSection() {
  const router = useRouter();
  const t = useTranslations("Landing.Hero");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLearningClick = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 600));
    router.push("/courses");
  };

  const handleMascotClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
      colors: ["#38bdf8", "#fbbf24", "#ec4899", "#22c55e", "#a855f7"],
      shapes: ["circle", "square"],
      scalar: 0.8,
    });
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section
      className="flex-1 -mt-[80px] px-6 md:px-12 lg:px-16"
      style={{
        backgroundImage: "url('/images/Background/HeroSectionBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            {/* Headline */}
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight opacity-80">
                {t("headline")}
              </h1>
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-2">
                <BlurText
                  text="P'Bit"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="m-0 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#38bdf8]"
                />
                <BlurText
                  text="Nong Brite"
                  delay={180}
                  animateBy="words"
                  direction="top"
                  className="m-0 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#fbbf24]"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-sm">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start mt-4">
              <PrimaryButton
                variant="sky-blue"
                size="sm"
                className="w-full sm:w-auto min-w-[150px] px-4 py-3 text-base"
                onClick={handleStartLearningClick}
                disabled={isLoading}
              >
                {t("startLearning")}
              </PrimaryButton>
              <Link href="#features" className="w-full sm:w-auto">
                <PrimaryButton
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto min-w-[150px] px-4 py-3 text-base"
                >
                  {t("seeMore")}
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Right Side - Mascots */}
          <div className="relative flex items-center justify-center lg:justify-end ">
            <div className="relative w-full max-w-md aspect-square">
              {/* Nong Brite Mascot */}
              <div 
                className="absolute top-1/2 left-1/2 w-[85px] md:w-[115px] lg:w-[115px] h-[105px] md:h-[135px] lg:h-[135px] translate-x-[-32px] md:translate-x-[-50px] lg:translate-x-[-50px] -translate-y-[140px] md:-translate-y-[170px] lg:-translate-y-[170px] transition-transform duration-200 ease-out cursor-pointer z-0"
                style={{ transform: `translate(${mousePos.x * 1.5 - (isMobile ? 32 : 50)}px, ${mousePos.y * 1.5 - (isMobile ? 140 : 170)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="w-full h-full ">
                  <Image
                    src="/images/Nong_brite/nong-brite-01.svg"
                    alt="Nong Brite mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                  />
                </div>
              </div>
              {/* P'Bit Mascot */}
              <div 
                className="absolute top-1/2 left-1/2 w-[160px] md:w-[200px] lg:w-[200px] h-[195px] md:h-[235px] lg:h-[235px] transition-transform duration-300 ease-out cursor-pointer z-10"
                style={{ transform: `translate(${mousePos.x * 0.8 - (isMobile ? 80 : 100)}px, ${mousePos.y * 0.8 - (isMobile ? 97 : 117)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Bit/bit-02.svg"
                    alt="P'Bit mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                  />
                </div>
              </div>
              {/* P_Momo Mascot พี่วัว*/}
              <div 
                className="absolute top-1/2 left-1/2 w-[120px] md:w-[155px] lg:w-[155px] h-[155px] md:h-[195px] lg:h-[195px] transition-transform duration-500 ease-out cursor-pointer z-20"
                style={{ transform: `translate(${mousePos.x * 2 + (isMobile ? 60 : 60)}px, ${mousePos.y * 2 - (isMobile ? 50 : 70)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Momo/momo-02.svg"
                    alt="P Momo mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 85px, (max-width: 1024px) 105px, 125px"
                  />
                </div>
              </div>

              {/* P_Bobo Mascot หมี*/}
              <div 
                className="absolute top-1/2 left-1/2 w-[130px] md:w-[165px] lg:w-[165px] h-[145px] md:h-[180px] lg:h-[180px] transition-transform duration-150 ease-out cursor-pointer z-20"
                style={{ transform: `translate(${mousePos.x * 1.2 - (isMobile ? 160 : 220)}px, ${mousePos.y * 1.2 - (isMobile ? 50 : 60)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Bobo/bobo-02.svg"
                    alt="P Bobo mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px"
                  />
                </div>
              </div>

              {/* P_Coco Mascot  หมา*/}
              <div 
                className="absolute top-1/2 left-1/2 w-[90px] md:w-[120px] lg:w-[120px] h-[85px] md:h-[115px] lg:h-[115px] transition-transform duration-700 ease-out cursor-pointer z-20"
                style={{ transform: `translate(${mousePos.x * 3 + (isMobile ? 10 : 10)}px, ${mousePos.y * 3 - (isMobile ? -10 : 2)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/P_Coco/coco-05.svg"
                    alt="P Coco mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px"
                  />
                </div>
              </div>

              {/* P_PingPing Mascot เเพนกวิน*/}
              <div 
                className="absolute top-1/2 left-1/2 w-[120px] md:w-[155px] lg:w-[155px] h-[90px] md:h-[120px] lg:h-[120px] transition-transform duration-400 ease-out cursor-pointer z-20"
                style={{ transform: `translate(${mousePos.x * 1.8 - (isMobile ? 110 : 150)}px, ${mousePos.y * 1.8 - (isMobile ? -10 : 0)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/P_PingPing/pingping-01.svg"
                    alt="P PingPing mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                  />
                </div>
              </div>

              {/* P_Minnie Mascot กระต่าย*/}
              <div 
                className="absolute top-1/2 left-1/2 w-[125px] md:w-[160px] lg:w-[160px] h-[140px] md:h-[175px] lg:h-[175px] transition-transform duration-250 ease-out cursor-pointer z-20"
                style={{ transform: `translate(${mousePos.x * 2.5 - (isMobile ? 200 : 300)}px, ${mousePos.y * 2.5 - (isMobile ? 40 : 56)}px)` }}
                onClick={handleMascotClick}
              >
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Minnie/minnie-04.svg"
                    alt="P Minnie mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 85px, (max-width: 1024px) 105px, 125px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay
        isLoading={isLoading}
        message={t("loading")}
      />
    </section>
  );
}
