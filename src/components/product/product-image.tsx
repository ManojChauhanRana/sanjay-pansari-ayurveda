"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ src, alt, className = "", priority = false }: ProductImageProps) {
  const [error, setError] = useState(false);
  
  // Detection for external or local optimized URLs
  const isExternal = src?.startsWith('http') || src?.includes('_next/image');

  if (error || !src || isExternal) {
    return (
      <img 
        src={src || "/images/placeholder.png"} 
        alt={alt} 
        className={`${className} h-full w-full object-contain`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      onError={() => setError(true)}
      sizes="(max-width: 1024px) 100vw, 58vw"
    />
  );
}
