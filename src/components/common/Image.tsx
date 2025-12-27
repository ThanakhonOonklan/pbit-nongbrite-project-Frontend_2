import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface ImageProps extends Omit<NextImageProps, "className"> {
  className?: string;
  containerClassName?: string;
  aspectRatio?: "square" | "video" | "auto";
}

const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill,
      className,
      containerClassName,
      aspectRatio,
      priority = false,
      loading,
      ...props
    },
    ref
  ) => {
    // ถ้าใช้ fill prop
    if (fill) {
      return (
        <div
          ref={ref}
          className={cn("relative overflow-hidden", containerClassName)}
        >
          <NextImage
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", className)}
            priority={priority}
            loading={loading || (priority ? "eager" : "lazy")}
            sizes={props.sizes || "93px"}
            {...props}
          />
        </div>
      );
    }

    // ถ้าไม่ได้ใช้ fill prop
    const aspectRatioClasses = {
      square: "aspect-square",
      video: "aspect-video",
      auto: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          aspectRatio && aspectRatioClasses[aspectRatio],
          containerClassName
        )}
        style={
          width && height
            ? { width: `${width}px`, height: `${height}px` }
            : undefined
        }
      >
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("object-cover", className)}
          priority={priority}
          loading={loading || (priority ? "eager" : "lazy")}
          sizes={props.sizes || (width ? `${width}px` : "100vw")}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };

