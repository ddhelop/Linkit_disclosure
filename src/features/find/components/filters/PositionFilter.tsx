'use client'
import React from 'react'
import Image from 'next/image'

interface PositionFilterProps {
  searchText: string
  isOpen: boolean
  isFocused: boolean
  selectedItems: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (position: string) => void
  onRemove: (position: string) => void
}

export default function PositionFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: PositionFilterProps) {
  const positions = ['창업·비즈니스', '개발', '디자인', '기획', '마케팅·광고', '투자자']
  const filteredPositions = positions.filter((position) => position.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">포지션</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="어떤 포지션의 팀원이 필요하가요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      {/* 포지션 옵션 드롭다운 */}
      <div
        className={`absolute left-0 top-[calc(100%+10px)] z-10 w-[35rem] transform overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-100' : 'h-0 opacity-0'
        }`}
      >
        <div className="rounded-xl border border-grey30 bg-white p-4" onMouseDown={(e) => e.preventDefault()}>
          <div className="flex flex-wrap gap-2">
            {filteredPositions.map((position) => (
              <div
                key={position}
                onClick={() => onSelect(position)}
                className={`cursor-pointer rounded-full px-5 py-1 text-sm transition-colors ${
                  selectedItems.includes(position)
                    ? 'border border-main bg-[#D3E1FE] text-main '
                    : 'border border-grey40 bg-grey20 text-grey50'
                }`}
              >
                {position}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
