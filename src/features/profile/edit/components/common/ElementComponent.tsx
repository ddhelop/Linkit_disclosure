'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ElementComponentProps {
  id: number
  title: string
  subtitle?: string
  date?: string
  endDate?: string | null
  editPath: string
  onDelete?: (id: number) => void
}

export default function ElementComponent({
  id,
  title,
  subtitle,
  date,
  endDate,
  editPath,
  onDelete,
}: ElementComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
  }

  return (
    <div className="relative flex items-center justify-between gap-1 rounded-lg px-6 py-5 hover:bg-grey10">
      <div className="gap-2">
        <Link
          href={{
            pathname: editPath,
            query: { id },
          }}
        >
          <span className="cursor-pointer font-semibold text-grey80">{title}</span>
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
          <div className="absolute left-0 mt-2 w-[6rem] rounded-lg border border-grey30 bg-white shadow-lg">
            <ul className="py-2 text-xs">
              <li className="cursor-pointer px-4 py-1 text-grey70 hover:bg-grey10">
                <Link
                  href={{
                    pathname: editPath,
                    query: { id },
                  }}
                >
                  수정하기
                </Link>
              </li>
              <li className="cursor-pointer px-4 py-1 text-red-500 hover:bg-grey10" onClick={handleDelete}>
                삭제하기
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
