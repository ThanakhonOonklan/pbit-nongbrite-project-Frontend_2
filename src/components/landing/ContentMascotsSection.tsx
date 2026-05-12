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
  | "amethyst"
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
    imageAlt: "P'Momo character",
    imageOnLeft: true,
    accentColor: "#9956DE",
    buttonVariant: "amethyst",
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
                <div className="relative group w-[280px] md:w-[360px] min-h-[240px] md:min-h-[300px] flex items-center justify-center">
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0 opacity-20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500"
                    style={{ backgroundColor: block.accentColor }}
                  />
                  
                  <div className="relative z-10 w-[180px] h-[180px] md:w-[240px] md:h-[240px] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
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
    </>
  );
}

