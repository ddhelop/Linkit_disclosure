'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { motion } from 'framer-motion'

export default function Banner() {
  const { emailId } = useAuthStore()

  const originalSlides = [
    {
      image: '/common/images/banner1.svg',
      link: `/${emailId}`,
      alt: '팀 모집 배너',
    },
    {
      image: '/common/images/banner2.svg',
      link: '/team/select',
      alt: '프로필 배너',
    },
    {
      image: '/common/images/banner3.svg',
      link: 'https://bit.ly/42wFLAU',
      alt: '채팅 배너',
    },
    {
      image: '/common/images/banner4.svg',
      link: 'https://open.kakao.com/o/gee0u5kg',
      alt: '커뮤니티 배너',
    },
  ]

  // 원본 슬라이드를 3회 복제하여 총 12개 인덱스
  const [slideIndices, setSlideIndices] = useState(() => Array.from({ length: 12 }, (_, i) => i + 1))

  // 페이지네이션 (1 ~ 4)
  const [currentPage, setCurrentPage] = useState(1)

  const slideWidth = 46.9 * 16 + 32
  // 항상 중앙에 5번 인덱스(실제 원본 배열의 첫 번째 슬라이드)가 보이도록 기본 위치 설정
  const basePosition = -slideWidth * 4

  // 애니메이션 이동량과 진행 여부
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animatingRef = useRef(false)

  // 자동 이동 타이머
  const timerRef = useRef<NodeJS.Timeout>()

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const timer = setInterval(() => {
      if (!animatingRef.current) {
        // 자동 이동 시, 페이지네이션은 즉시 증가
        setCurrentPage((prev) => (prev % originalSlides.length) + 1)
        setOffset(-slideWidth)
        setIsAnimating(true)
        animatingRef.current = true
      }
    }, 5000)
    return timer
  }, [slideWidth, originalSlides.length])

  useEffect(() => {
    timerRef.current = resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  // 다음 버튼: 애니메이션 진행 중이면 무시하고, 그렇지 않으면 페이지네이션을 바로 업데이트 후 애니메이션 시작
  const handleNext = useCallback(() => {
    if (animatingRef.current) return
    setCurrentPage((prev) => (prev % originalSlides.length) + 1)
    setOffset(-slideWidth)
    setIsAnimating(true)
    animatingRef.current = true
    clearInterval(timerRef.current)
    timerRef.current = resetTimer()
  }, [slideWidth, originalSlides.length, resetTimer])

  // 이전 버튼: 애니메이션 진행 중이면 무시하고, 그렇지 않으면 페이지네이션을 바로 업데이트 후 애니메이션 시작
  const handlePrev = useCallback(() => {
    if (animatingRef.current) return
    setCurrentPage((prev) => (prev - 1 < 1 ? originalSlides.length : prev - 1))
    setOffset(slideWidth)
    setIsAnimating(true)
    animatingRef.current = true
    clearInterval(timerRef.current)
    timerRef.current = resetTimer()
  }, [slideWidth, originalSlides.length, resetTimer])

  // 애니메이션 완료 후, 배열을 회전시키고 offset을 0으로 복원하며 애니메이션 상태 해제
  const handleAnimationComplete = useCallback(() => {
    if (offset === 0) return

    if (offset < 0) {
      // 다음 버튼: 배열의 첫 요소를 뒤로 이동
      setSlideIndices((prev) => {
        const [first, ...rest] = prev
        return [...rest, first]
      })
    } else if (offset > 0) {
      // 이전 버튼: 배열의 마지막 요소를 앞으로 이동
      setSlideIndices((prev) => {
        const last = prev[prev.length - 1]
        return [last, ...prev.slice(0, prev.length - 1)]
      })
    }
    setOffset(0)
    setIsAnimating(false)
    animatingRef.current = false
  }, [offset])

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="relative mx-auto h-[18.75rem] w-full">
        <div className="relative h-full w-full">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="relative h-[18.75rem] w-[145rem] overflow-visible">
                <motion.div
                  className="absolute flex h-full gap-8"
                  animate={{ x: basePosition + offset }}
                  transition={offset !== 0 ? { type: 'spring', stiffness: 150, damping: 25 } : { duration: 0 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {slideIndices.map((slideIndex, arrayIndex) => {
                    const actualIndex = (slideIndex - 1) % originalSlides.length
                    const slide = originalSlides[actualIndex]
                    return (
                      <div
                        key={`${slideIndex}-${arrayIndex}`}
                        className="relative h-[18.75rem] w-[46.9rem] flex-shrink-0"
                      >
                        <Link
                          href={slide.link}
                          target={slide.link.startsWith('http') ? '_blank' : undefined}
                          className="block h-full w-full"
                        >
                          <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="rounded-[28px] object-cover"
                            priority={arrayIndex >= 4 && arrayIndex < 7}
                            sizes="750px"
                          />
                        </Link>
                      </div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Overlay - 양쪽 배너 노출 */}
              <div className="pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 gap-8">
                <div className="scale-85 relative h-[18.75rem] w-[46.9rem] translate-x-[25rem] opacity-50" />
                <div className="relative h-[18.75rem] w-[46.9rem]" />
                <div className="scale-85 relative h-[18.75rem] w-[46.9rem] -translate-x-[25rem] opacity-50" />
              </div>

              {/* Navigation Controls */}
              <div className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2">
                <div className="relative h-[18.75rem] w-[46.9rem]">
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    <button
                      className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-lg text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                    >
                      ‹
                    </button>
                    <button
                      className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-lg text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                      onClick={handleNext}
                      aria-label="Next slide"
                    >
                      ›
                    </button>
                  </div>
                  {/* Pagination */}
                  <div className="absolute bottom-4 right-8 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <div className="text-sm font-medium text-white">
                      {String(currentPage).padStart(2, '0')}/{String(originalSlides.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">{/* ... 기존 모바일 뷰 코드 ... */}</div>
        </div>
      </div>
    </div>
  )
}
