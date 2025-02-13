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
  isEducationVerified?: boolean
  onDelete?: (id: number) => void
}

export default function EducationElementComponent({
  id,
  title,
  subtitle,
  date,
  endDate,
  editPath,
  isEducationVerified,
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
      href={`${editPath}?id=${id}`}
      className="flex cursor-pointer items-center gap-5 rounded-lg border border-transparent bg-white px-10 py-5 hover:border-main"
    >
      <Image src={`/common/icons/universityLogo/${title}.svg`} alt="education" width={52} height={52} />
      <div className="relative flex w-full items-center justify-between gap-1 ">
        <div className="gap-2">
          <Link
            href={{
              pathname: editPath,
              query: { id },
            }}
            className="flex gap-2"
          >
            <span className="cursor-pointer font-semibold text-grey80">{title}</span>
            {isEducationVerified && <Image src="/common/cert_badge.svg" alt="check" width={16} height={16} />}
          </Link>
          {(subtitle || date) && (
            <div className="flex gap-4 text-xs">
              {subtitle && <span className="text-grey80">{subtitle}</span>}
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
      </div>
    </Link>
  )
}
