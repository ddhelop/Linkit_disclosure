'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ElementComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex items-center justify-between gap-1 rounded-lg px-6 py-5 hover:bg-grey10">
      <div className="gap-2">
        <span className="cursor-pointer font-semibold text-grey80">리에종</span>
        <div className="flex gap-4 text-xs">
          <span className="text-grey80">Frontend Developer</span>
          <span className="text-grey60">2022.06. ~ 2026.06</span>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <Image
          src="/common/icons/more_row.svg"
          width={22}
          height={22}
          alt="more options"
          className="cursor-pointer"
          onClick={handleToggleMenu}
        />

        {isMenuOpen && (
          <div className="absolute left-0 mt-2 w-[6rem] rounded-lg border border-grey30 bg-white shadow-lg">
            <ul className="py-2 text-xs">
              <li
                className="cursor-pointer px-4 py-1 text-grey70 hover:bg-grey10"
                onClick={() => alert('수정하기 클릭됨')}
              >
                수정하기
              </li>
              <li
                className="cursor-pointer px-4 py-1 text-red-500 hover:bg-grey10"
                onClick={() => alert('삭제하기 클릭됨')}
              >
                삭제하기
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
