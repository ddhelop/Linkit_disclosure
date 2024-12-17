'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = ['/banner1.png', '/banner2.png', '/banner3.png']

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
    <div className="relative h-[400px] w-full overflow-hidden bg-[#4263EB]">
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
            <div key={index} className="flex-shrink-0 flex-grow-0 basis-full">
              <div className="relative h-full w-full">
                <Image src={slide} alt={`Banner ${index + 1}`} fill className="object-cover" priority={index === 0} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>

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
  )
}
