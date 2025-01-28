'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ElementComponentProps {
  id: number
  title: string
  subtitle?: string
  date?: string
  endDate?: string | null
  editPath: string
  isActivityVerified?: boolean
  onDelete?: (id: number) => void
}

export default function ElementComponent({
  id,
  title,
  subtitle,
  date,
  endDate,
  editPath,
  isActivityVerified,
  onDelete,
}: ElementComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isMenuOpen])

  const handleToggleMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsMenuOpen((prev) => !prev)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
  }

  return (
    <Link
      href={{
        pathname: editPath,
        query: { id },
      }}
      className="relative flex cursor-pointer items-center justify-between gap-1 rounded-lg border border-transparent bg-white px-10 py-5 hover:border-main"
    >
      <div className="gap-2">
        <div>
          <span className="flex cursor-pointer gap-3 font-semibold text-grey80">
            {title}
            {isActivityVerified && <Image src="/common/cert_badge.svg" width={20} height={20} alt="cert_badge" />}
          </span>
        </div>
        {(subtitle || date) && (
          <div className="flex gap-2 text-xs">
            {subtitle && <span className="text-grey80">{subtitle}</span>}
            <span className="text-xs text-grey60">|</span>
            {date && (
              <span className="text-grey60">
                {date} {endDate && `~ ${endDate === 'null' ? '진행 중' : endDate}`}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <Image
          src="/common/icons/more_row.svg"
          width={22}
          height={22}
          alt="more options"
          className="cursor-pointer"
          onClick={handleToggleMenu}
        />

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 z-50 mt-2 w-[7rem] rounded-lg border border-grey30 bg-white shadow-lg"
          >
            <ul className="py-2 text-sm">
              <li className="cursor-pointer px-4 py-2 text-grey70 hover:bg-grey10">
                <Link
                  href={{
                    pathname: editPath,
                    query: { id },
                  }}
                >
                  수정하기
                </Link>
              </li>
              <li className="cursor-pointer px-4 py-2 text-red-500 hover:bg-grey10" onClick={handleDelete}>
                삭제하기
              </li>
            </ul>
          </div>
        )}
      </div>
    </Link>
  )
}
