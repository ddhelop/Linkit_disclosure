'use client'
import React from 'react'
import Image from 'next/image'

interface StatusFilterProps {
  searchText: string
  isOpen: boolean
  isFocused: boolean
  selectedItems: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (status: string) => void
  onRemove: (status: string) => void
}

export default function StatusFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: StatusFilterProps) {
  const statusList = [
    '팀 찾는 중',
    '팀원 찾는 중',
    '대회 준비 중',
    '공모전 준비 중',
    '포폴 쌓는 중',
    '둘러보는 중',
    '프로젝트 진행 중',
    '아이디어 찾는 중',
    '투자 유치 중',
  ]

  const filteredStatus = statusList.filter((status) => status.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">현재 상태</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="현재 어떤 상태인가요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      {/* 상태 옵션 드롭다운 */}
      <div
        className={`absolute right-0 z-10 w-[40.5rem] transform overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-100' : 'h-0 opacity-0'
        }`}
        style={{ top: 'calc(100% + 10px)' }}
      >
        <div className="rounded-xl border border-grey30 bg-white p-4" onMouseDown={(e) => e.preventDefault()}>
          <div className="flex flex-wrap gap-2">
            {filteredStatus.map((status) => (
              <div
                key={status}
                onClick={() => onSelect(status)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedItems.includes(status)
                    ? 'border border-main bg-[#D3E1FE] text-main '
                    : 'border border-grey40 bg-grey20 text-grey50'
                }`}
              >
                {status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
