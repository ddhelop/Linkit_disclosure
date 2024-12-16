'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function TeamLogComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  return (
    <div>
      <div className="flex w-full flex-col rounded-xl bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/common/icons/pin.svg" width={20} height={20} alt="pin" />
            <span className="font-semibold text-grey80">제목제목제목</span>
            <span className="gap-2 text-grey50">|</span>
            <span className="text-xs text-grey60">2024-12-12</span>
          </div>
          <div className="relative">
            <div ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
              <Image src="/common/icons/more_row.svg" width={20} height={20} alt="more" />
            </div>

            {isMenuOpen && (
              <div ref={menuRef} className="absolute left-0 mt-2 w-28 rounded-lg bg-white shadow-lg">
                <div className="flex flex-col py-2 ">
                  <button className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100">수정하기</button>
                  <button className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100">
                    공개/비공개
                  </button>
                  <button className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100">
                    대표글로 설정
                  </button>
                  <button className="w-full px-4 py-2 text-left text-xs text-[#FF345F] hover:bg-gray-100">
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-grey10 p-5">
          <p className="text-sm text-grey70">내용내용내용</p>
        </div>
      </div>
    </div>
  )
}
