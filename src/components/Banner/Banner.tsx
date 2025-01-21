'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = ['/common/images/banner1.png', '/common/images/banner2.png', '/common/images/banner4.png']

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="relative h-[260px] w-full overflow-hidden">
        <div
          className="relative h-full w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="relative flex-shrink-0 flex-grow-0 basis-full">
                <div className="relative mx-auto h-full w-full max-w-[90rem] px-4 md:px-[7.12rem]">
                  <Image
                    src={slide}
                    alt={`Banner ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mx-auto max-w-[90rem] px-4 md:px-[7.12rem]">
          <button
            className="absolute left-8 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 md:left-[8.12rem]"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="absolute right-8 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 md:right-[8.12rem]"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className={`h-1 rounded-[2px] transition-all ${
                index === currentSlide ? 'w-[54px] bg-white' : 'w-[30px] bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
