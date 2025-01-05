'use client'
import React from 'react'
import Image from 'next/image'

interface ScaleFilterProps {
  searchText: string
  isOpen: boolean
  isFocused: boolean
  selectedItems: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (scale: string) => void
  onRemove: (scale: string) => void
}

export default function ScaleFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: ScaleFilterProps) {
  const scaleList = ['1인', '2~5인', '5~10인', '10인 이상']
  const filteredScales = scaleList.filter((scale) => scale.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">규모</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="팀의 규모가 어떻게 되나요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      <div
        className={`absolute left-0 z-10 w-[40.5rem] transform overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-100' : 'h-0 opacity-0'
        }`}
        style={{ top: 'calc(100% + 10px)' }}
      >
        <div className="rounded-xl border border-grey30 bg-white p-4" onMouseDown={(e) => e.preventDefault()}>
          <div className="flex flex-wrap gap-2">
            {filteredScales.map((scale) => (
              <div
                key={scale}
                onClick={() => onSelect(scale)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedItems.includes(scale)
                    ? 'border border-main bg-[#D3E1FE] text-main'
                    : 'border border-grey40 bg-grey20 text-grey50'
                }`}
              >
                {scale}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
