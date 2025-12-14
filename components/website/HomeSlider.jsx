

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [{ id: 1 }, { id: 2 }, { id: 3 }];

const HomeSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const AUTO_PLAY_DELAY = 5000; // 5 seconds

  const resetTimeout = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resetTimeout();
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimeout();
    startAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimeout();
    startAutoPlay();
  };

  const startAutoPlay = () => {
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_DELAY);
  };

  useEffect(() => {
    startAutoPlay();
    return () => resetTimeout();
  }, []);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[110px] xs:h-[120px] sm:h-[220px] md:h-[320px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={`/assets/images/${slide.id}.png`}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Prev/Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 hover:bg-white text-[#7a1cac] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <FiChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 hover:bg-white text-[#7a1cac] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <FiChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Numbered Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-7 h-7 flex items-center justify-center rounded-full border-2 font-semibold text-sm transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#7a1cac] border-[#7a1cac] text-white shadow-md"
                : "border-[#7a1cac] text-[#7a1cac] hover:bg-[#7a1cac]/10"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
