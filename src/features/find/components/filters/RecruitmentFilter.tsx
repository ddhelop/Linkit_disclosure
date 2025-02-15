'use client'
import React from 'react'

interface RecruitmentFilterProps {
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

export default function RecruitmentFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: RecruitmentFilterProps) {
  const recruitmentList = ['현재 모집 중', '현재 모집 없음']
  const filteredRecruitment = recruitmentList.filter((status) =>
    status.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">모집 상태</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="현재 모집 중인 팀을 찾고 있나요?"
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
            {filteredRecruitment.map((status) => (
              <div
                key={status}
                onClick={() => onSelect(status)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedItems.includes(status)
                    ? 'border border-main bg-[#D3E1FE] text-main'
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
