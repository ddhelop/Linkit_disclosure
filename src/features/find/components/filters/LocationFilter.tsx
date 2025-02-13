'use client'
import React from 'react'
import { addressData } from '@/shared/data/addressSelectData'
import Image from 'next/image'

interface LocationFilterProps {
  searchText: string
  isOpen: boolean
  isFocused: boolean
  selectedItems: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (location: string) => void
  onRemove: (location: string) => void
}

export default function LocationFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: LocationFilterProps) {
  const locations = addressData.map((item) => item.name)
  const filteredLocations = locations.filter((location) => location.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">활동 지역</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="주로 어디서 활동하나요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      {/* 지역 옵션 드롭다운 */}
      <div
        className={`absolute left-[-12rem] z-10 w-[30rem] transform overflow-hidden transition-all duration-200 ease-in-out lg:left-0 lg:w-[31rem] ${
          isOpen ? 'opacity-100' : 'h-0 opacity-0'
        }`}
        style={{ top: 'calc(100% + 10px)' }}
      >
        <div className="rounded-xl border border-grey30 bg-white p-4" onMouseDown={(e) => e.preventDefault()}>
          <div className="flex flex-wrap gap-2">
            {filteredLocations.map((location) => (
              <div
                key={location}
                onClick={() => onSelect(location)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedItems.includes(location)
                    ? 'border border-main bg-[#D3E1FE] text-main '
                    : 'border border-grey40 bg-grey20 text-grey50'
                }`}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
