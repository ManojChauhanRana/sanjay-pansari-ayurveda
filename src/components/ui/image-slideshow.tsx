"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageSlideshowProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

export function ImageSlideshow({ images, intervalMs = 3000 }: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? (fade ? "opacity-100" : "opacity-0") : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Left gradient overlay — blends into the green content panel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3d24]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-[#1e3d24]/70 md:via-transparent md:to-transparent" />

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-black/30 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
