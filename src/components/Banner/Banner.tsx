'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function Banner() {
  const slides = [
    '/common/images/banner1.png',
    '/common/images/banner2.png',
    '/common/images/banner3.png',
    '/common/images/banner4.png',
  ]
  const totalSlides = slides.length

  const [visibleSlides, setVisibleSlides] = useState([totalSlides - 1, 0, 1])

  const handleNext = useCallback(() => {
    setVisibleSlides((prev) => prev.map((index) => (index + 1) % totalSlides))
  }, [totalSlides])

  const handlePrev = useCallback(() => {
    setVisibleSlides((prev) => prev.map((index) => (index - 1 + totalSlides) % totalSlides))
  }, [totalSlides])

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [handleNext])

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="relative mx-auto h-[18.75rem] w-full">
        <div className="relative h-full w-full">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center gap-8">
              {visibleSlides.map((slideIndex) => (
                <div key={slideIndex} className="relative h-[18.75rem] w-[46.9rem] flex-shrink-0">
                  <Image
                    src={slides[slideIndex]}
                    alt={`Banner ${slideIndex + 1}`}
                    fill
                    className="rounded-[28px] object-cover"
                    priority={slideIndex === visibleSlides[1]}
                    sizes="750px"
                  />
                </div>
              ))}
            </div>

            {/* Center Slide Navigation UI */}
            <div className="absolute left-1/2 top-0 z-30 h-[18.75rem] w-[46.9rem] -translate-x-1/2">
              {/* Navigation Buttons */}
              <div className="absolute left-8 right-8 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-lg text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-lg text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>

              {/* Pagination */}
              <div className="absolute bottom-4 right-8 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                <div className="text-sm font-medium text-white">
                  {String(visibleSlides[1] + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">{/* ... existing mobile view code ... */}</div>
        </div>
      </div>
    </div>
  )
}
