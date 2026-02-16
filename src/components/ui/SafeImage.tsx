"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { imagePath } from "@/constants/imagePath";

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
}

const SafeImage = ({
  src,
  alt = "",
  className,
  fallbackSrc = imagePath.noImage,
  priority = false,
  quality = 75,
  ...props
}: SafeImageProps) => {
  const initialSrc =
    !src || src === "" || src === "null" || src === undefined
      ? fallbackSrc
      : src;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.remove("opacity-0");
  };

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      quality={quality}
      priority={priority}
      className={clsx(
        className,
        "transition-opacity duration-700 opacity-0 will-change-transform"
      )}
      onLoad={handleImageLoad}
    />
  );
};

export default SafeImage;
