'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface ImageGalleryModalProps {
  images: string[]
  initialImageIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageGalleryModal({ images, initialImageIndex, isOpen, onClose }: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex)
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: isOpen,
    shouldListenEscape: true,
  })

  // 모달 open/close에 따른 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
      <div ref={modalRef} className="xl relative mx-4 w-full max-w-[900px]">
        {/* 16:9 비율 컨테이너 */}
        <div className="relative w-full rounded-xl pb-[56.25%]">
          {/* Image container */}
          <div className="absolute inset-0 flex items-center justify-center rounded-xl">
            <Image
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="rounded-xl object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Navigation buttons - 항상 이미지 중앙에 위치 */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black bg-opacity-50 px-4 py-2 text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  )
}
