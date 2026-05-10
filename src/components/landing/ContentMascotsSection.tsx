"use client";

import { useState } from "react";
import { PrimaryButton, LoadingOverlay } from "@/components/common";
import { Image } from "@/components/common/Image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type ContentBlock = {
  imageSrc: string;
  imageAlt: string;
  imageOnLeft: boolean;
  accentColor: string;
  buttonVariant:
  | "sky-blue"
  | "illusion"
  | "pastel-green"
  | "yellow"
  | "outline";
  ctaHref: string;
};

const contentBlocks: ContentBlock[] = [
  {
    imageSrc: "/images/P_Bit/bit-01.svg",
    imageAlt: "P'Bit character",
    imageOnLeft: true,
    accentColor: "#1cb0f6",
    buttonVariant: "sky-blue",
    ctaHref: "/login",
  },
  {
    imageSrc: "/images/P_Minnie/minnie-01.svg",
    imageAlt: "Nong Brite character",
    imageOnLeft: false,
    accentColor: "#ec4899",
    buttonVariant: "illusion",
    ctaHref: "/login",
  },
  {
    imageSrc: "/images/P_Momo/momo-01.svg",
    imageAlt: "P'Bit character",
    imageOnLeft: true,
    accentColor: "#22c55e",
    buttonVariant: "pastel-green",
    ctaHref: "/login",
  },
];

export function ContentMascotsSection() {
  const router = useRouter();
  const t = useTranslations("Landing.Content");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async (href: string) => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 600));
    router.push(href);
  };

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-10 lg:px-16 bg-[#F5F7FF]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
          {contentBlocks.map((block, index) => (
            // use padStart to present 01 / 02 / 03 on each frame
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14 p-2 md:p-4"
            >
              {/* Image */}
              <div
                className={`flex justify-center ${block.imageOnLeft ? "md:order-0" : "md:order-2"
                  }`}
              >
                <div className="relative w-[280px] md:w-[360px] min-h-[240px] md:min-h-[300px] flex items-center justify-center overflow-hidden rounded-2xl">

                  {/* ── Path-Navigation decorations (purely visual) ───────── */}
                  <div className="absolute inset-0 pointer-events-none select-none">

                    {/* ArrowUp — large, top-left */}
                    <div className="path-float-a absolute flex items-center justify-center"
                      style={{ top: 10, left: 8, width: 40, height: 40, borderRadius: 12, backgroundColor: "#1491ff", border: "2.5px solid #43a7ff", boxShadow: "0 5px 0 #0f65b3" }}>
                      <img src="/icons/Arrow/ArrowUp.svg" alt="" style={{ width: 23, height: 23 }} draggable={false} />
                    </div>

                    {/* ArrowRight — small, top-right */}
                    <div className="path-float-b absolute flex items-center justify-center"
                      style={{ top: 16, right: 10, width: 22, height: 22, borderRadius: 7, backgroundColor: "#1CB0F6", border: "2px solid #43a7ff", boxShadow: "0 3px 0 #1587bd" }}>
                      <img src="/icons/Arrow/ArrowRight.svg" alt="" style={{ width: 12, height: 12 }} draggable={false} />
                    </div>

                    {/* ArrowLeft — medium, left-center */}
                    <div className="path-float-c absolute flex items-center justify-center"
                      style={{ top: "42%", left: 4, width: 32, height: 32, borderRadius: 10, backgroundColor: "#1491ff", border: "2.5px solid #43a7ff", boxShadow: "0 4px 0 #0f65b3" }}>
                      <img src="/icons/Arrow/ArrowLeft.svg" alt="" style={{ width: 18, height: 18 }} draggable={false} />
                    </div>

                    {/* Command block → — medium, right-center */}
                    <div className="path-float-a absolute flex items-center justify-center"
                      style={{ top: "36%", right: 5, width: 38, height: 30, borderRadius: 9, backgroundColor: "#1CB0F6", border: "2px solid rgba(255,255,255,0.4)", boxShadow: "0 3.5px 0 #1587bd", animationDelay: "0.5s" }}>
                      <img src="/icons/Arrow/ArrowRight.svg" alt="" style={{ width: 16, height: 16 }} draggable={false} />
                    </div>

                    {/* ArrowDown — large, bottom-right */}
                    <div className="path-float-b absolute flex items-center justify-center"
                      style={{ bottom: 10, right: 8, width: 38, height: 38, borderRadius: 11, backgroundColor: "#1491ff", border: "2.5px solid #43a7ff", boxShadow: "0 5px 0 #0f65b3", animationDelay: "0.35s" }}>
                      <img src="/icons/Arrow/ArrowDown.svg" alt="" style={{ width: 22, height: 22 }} draggable={false} />
                    </div>

                    {/* Command block ↑ — small, bottom-left */}
                    <div className="path-float-c absolute flex items-center justify-center"
                      style={{ bottom: 16, left: 10, width: 30, height: 24, borderRadius: 8, backgroundColor: "#1CB0F6", border: "2px solid rgba(255,255,255,0.38)", boxShadow: "0 3px 0 #1587bd", animationDelay: "0.8s" }}>
                      <img src="/icons/Arrow/ArrowUp.svg" alt="" style={{ width: 13, height: 13 }} draggable={false} />
                    </div>

                    {/* Home icon — bottom-center-right, medium */}
                    <div className="path-float-a absolute" style={{ bottom: 8, right: 52, opacity: 0.78, animationDelay: "1s" }}>
                      <img src="/icons/game/Home.svg" alt="" style={{ width: 32, height: 32 }} draggable={false} className="drop-shadow-sm" />
                    </div>

                  </div>
                  {/* ─────────────────────────────────────────────────────── */}

                  <div className="relative z-10 w-[180px] h-[180px] md:w-[240px] md:h-[240px]">
                    <Image
                      src={block.imageSrc}
                      alt={block.imageAlt}
                      fill
                      containerClassName="w-full h-full"
                      className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`flex flex-col gap-3 ${block.imageOnLeft ? "md:order-2" : "md:order-1"
                  } items-center md:items-start text-center md:text-left max-w-xl mx-auto`}
              >
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: block.accentColor }}
                >
                  {t(`blocks.${index}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {t(`blocks.${index}.description` as Parameters<typeof t>[0])}
                </p>
                <div className="mt-2">
                  <PrimaryButton
                    variant={block.buttonVariant}
                    size="sm"
                    className="w-full md:w-auto"
                    onClick={() => handleButtonClick(block.ctaHref)}
                    disabled={isLoading}
                  >
                    {t(`blocks.${index}.ctaText` as Parameters<typeof t>[0])}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <LoadingOverlay
        isLoading={isLoading}
        message={t("loading")}
      />
      <style>{`
        @keyframes pathFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes pathFloatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(-7px) rotate(4deg); }
          80%       { transform: translateY(-3px) rotate(-2deg); }
        }
        @keyframes pathFloatC {
          0%, 100% { transform: translateY(0px) scale(1); }
          33%       { transform: translateY(-5px) scale(1.04); }
          66%       { transform: translateY(-11px) scale(0.97); }
        }
        .path-float-a { animation: pathFloatA 2.6s ease-in-out infinite; }
        .path-float-b { animation: pathFloatB 3.3s ease-in-out infinite; }
        .path-float-c { animation: pathFloatC 2.9s ease-in-out infinite; }
      `}</style>
    </>
  );
}

