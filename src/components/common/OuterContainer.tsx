"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Image } from "./Image";

// Color mapping for header variants
const headerColorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
  "sky-blue": {
    bg: "bg-[#1CB0F6]",
    text: "text-white",
    border: "border-2 border-[#1699D6]",
    shadow: "shadow-[0px_4px_0px_0px_#1280B5]",
  },
  default: {
    bg: "bg-[#1CB0F6]",
    text: "text-white",
    border: "border-2 border-[#1699D6]",
    shadow: "shadow-[0px_4px_0px_0px_#1280B5]",
  },
};

// Function to get header styles from color
const getHeaderStyles = (headerColor?: string): { className: string; style?: React.CSSProperties } => {
  if (!headerColor) {
    const defaultStyles = headerColorMap["default"];
    return {
      className: `${defaultStyles.bg} ${defaultStyles.text} ${defaultStyles.border} ${defaultStyles.shadow}`,
    };
  }

  // Check if it's a variant name
  if (headerColorMap[headerColor]) {
    const styles = headerColorMap[headerColor];
    return {
      className: `${styles.bg} ${styles.text} ${styles.border} ${styles.shadow}`,
    };
  }

  // If it's a hex color, use inline styles
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  };

  const rgb = hexToRgb(headerColor);
  if (rgb) {
    // Calculate darker shade for border (reduce by ~15%)
    const darkerR = Math.max(0, Math.floor(rgb.r * 0.85));
    const darkerG = Math.max(0, Math.floor(rgb.g * 0.85));
    const darkerB = Math.max(0, Math.floor(rgb.b * 0.85));
    const darkerHex = `#${darkerR.toString(16).padStart(2, "0")}${darkerG.toString(16).padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;

    // Even darker for shadow (reduce by ~25% from original)
    const shadowR = Math.max(0, Math.floor(rgb.r * 0.75));
    const shadowG = Math.max(0, Math.floor(rgb.g * 0.75));
    const shadowB = Math.max(0, Math.floor(rgb.b * 0.75));
    const shadowHex = `#${shadowR.toString(16).padStart(2, "0")}${shadowG.toString(16).padStart(2, "0")}${shadowB.toString(16).padStart(2, "0")}`;

    return {
      className: "text-white border-2",
      style: {
        backgroundColor: headerColor,
        borderColor: darkerHex,
        boxShadow: `0px 4px 0px 0px ${shadowHex}`,
      },
    };
  }

  // Fallback to default
  const defaultStyles = headerColorMap["default"];
  return {
    className: `${defaultStyles.bg} ${defaultStyles.text} ${defaultStyles.border} ${defaultStyles.shadow}`,
  };
};

export interface OuterContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  widthClassName?: string;
  heightClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  imageRotation?: number;
  // Image 1 props
  image1Src?: string;
  image1Alt?: string;
  image1Width?: number;
  image1Height?: number;
  image1ClassName?: string;
  image1Style?: React.CSSProperties;
  image1Rotation?: number;
  // Image 2 props
  image2Src?: string;
  image2Alt?: string;
  image2Width?: number;
  image2Height?: number;
  image2ClassName?: string;
  image2Style?: React.CSSProperties;
  image2Rotation?: number;
  // Image 3 props
  image3Src?: string;
  image3Alt?: string;
  image3Width?: number;
  image3Height?: number;
  image3ClassName?: string;
  image3Style?: React.CSSProperties;
  image3Rotation?: number;
  // Image 4 props
  image4Src?: string;
  image4Alt?: string;
  image4Width?: number;
  image4Height?: number;
  image4ClassName?: string;
  image4Style?: React.CSSProperties;
  image4Rotation?: number;
  // Header props
  headerText?: string | React.ReactNode;
  headerColor?: string;
  headerClassName?: string;
}

export const OuterContainer: React.FC<OuterContainerProps> = ({
  className,
  widthClassName = "max-w-3xl",
  heightClassName = "min-h-[360px]",
  children,
  imageSrc,
  imageAlt,
  imageWidth = 140,
  imageHeight = 140,
  imageClassName,
  imageStyle,
  imageRotation = 0,
  // Image 1 props
  image1Src,
  image1Alt,
  image1Width = 140,
  image1Height = 140,
  image1ClassName,
  image1Style,
  image1Rotation = 0,
  // Image 2 props
  image2Src,
  image2Alt,
  image2Width = 140,
  image2Height = 140,
  image2ClassName,
  image2Style,
  image2Rotation = 0,
  // Image 3 props
  image3Src,
  image3Alt,
  image3Width = 140,
  image3Height = 140,
  image3ClassName,
  image3Style,
  image3Rotation = 0,
  // Image 4 props
  image4Src,
  image4Alt,
  image4Width = 140,
  image4Height = 140,
  image4ClassName,
  image4Style,
  image4Rotation = 0,
  // Header props
  headerText,
  headerColor,
  headerClassName,
  ...props
}) => {
  const headerStyles = getHeaderStyles(headerColor);
  return (
    <div
      className={cn("relative flex w-full justify-center", className)}
      data-header-color={headerColor}
      {...props}
    >
      {headerText && (
        <div className="pointer-events-none absolute inset-x-0 z-30 flex justify-center">
          <div
            className={cn(
              "inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-[8px] sm:rounded-[10px]",
              "px-8 sm:px-10 md:px-12 lg:px-16",
              "py-1.5 sm:py-2 md:py-2.5",
              "text-sm sm:text-base md:text-lg font-bold",
              headerStyles.className,
              headerClassName
            )}
            style={headerStyles.style}
          >
            {headerText}
          </div>
        </div>
      )}
      <div
        className={cn(
          "relative w-full rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] bg-[#FDC369]",
          "p-2 sm:p-3 md:p-3",
          headerText && "mt-4 sm:mt-5 md:mt-6",
          widthClassName
        )}
      >
        <div className="absolute inset-[-3px] -z-10 rounded-[22px] sm:rounded-[26px] md:rounded-[30px] lg:rounded-[34px] bg-gradient-to-br from-[#f5b75a] to-[#fdd086]" />
        <div className="relative rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[26px] border-[2px] sm:border-[3px] md:border-[3.5px] lg:border-[4px] border-[#DB9148] bg-[#016A66] p-3 sm:p-5 md:p-6 lg:p-8 shadow-[inset_0_3px_8px_rgba(0,0,0,0.2)]">
          <div
            className={cn(
              "relative w-full rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[18px] bg-[#016A66]/0",
              heightClassName
            )}
          >
            {/* Render all images inside the content area */}
            {imageSrc && (
              <div
                className={cn(imageClassName)}
                style={{
                  ...imageStyle,
                  transform: imageStyle?.transform
                    ? `${imageStyle.transform} rotate(${imageRotation}deg)`
                    : `rotate(${imageRotation}deg)`,
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt || "Image"}
                  width={imageWidth}
                  height={imageHeight}
                  className="h-auto"
                />
              </div>
            )}
            {image1Src && (
              <div
                className={cn(image1ClassName)}
                style={{
                  ...image1Style,
                  transform: image1Style?.transform
                    ? `${image1Style.transform} rotate(${image1Rotation}deg)`
                    : `rotate(${image1Rotation}deg)`,
                }}
              >
                <Image
                  src={image1Src}
                  alt={image1Alt || "Image 1"}
                  width={image1Width}
                  height={image1Height}
                  className="h-auto"
                />
              </div>
            )}
            {image2Src && (
              <div
                className={cn(image2ClassName)}
                style={{
                  ...image2Style,
                  transform: image2Style?.transform
                    ? `${image2Style.transform} rotate(${image2Rotation}deg)`
                    : `rotate(${image2Rotation}deg)`,
                }}
              >
                <Image
                  src={image2Src}
                  alt={image2Alt || "Image 2"}
                  width={image2Width}
                  height={image2Height}
                  className="h-auto"
                />
              </div>
            )}
            {image3Src && (
              <div
                className={cn(image3ClassName)}
                style={{
                  ...image3Style,
                  transform: image3Style?.transform
                    ? `${image3Style.transform} rotate(${image3Rotation}deg)`
                    : `rotate(${image3Rotation}deg)`,
                }}
              >
                <Image
                  src={image3Src}
                  alt={image3Alt || "Image 3"}
                  width={image3Width}
                  height={image3Height}
                  className="h-auto"
                />
              </div>
            )}
            {image4Src && (
              <div
                className={cn(image4ClassName)}
                style={{
                  ...image4Style,
                  transform: image4Style?.transform
                    ? `${image4Style.transform} rotate(${image4Rotation}deg)`
                    : `rotate(${image4Rotation}deg)`,
                }}
              >
                <Image
                  src={image4Src}
                  alt={image4Alt || "Image 4"}
                  width={image4Width}
                  height={image4Height}
                  className="h-auto"
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

OuterContainer.displayName = "OuterContainer";
