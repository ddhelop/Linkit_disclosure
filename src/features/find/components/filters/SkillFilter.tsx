'use client'
import React from 'react'
import { skillsData } from '@/shared/data/skillsData'
import Image from 'next/image'

interface SkillFilterProps {
  searchText: string
  isOpen: boolean
  isFocused: boolean
  selectedItems: string[]
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onSelect: (skill: string) => void
  onRemove: (skill: string) => void
}

export default function SkillFilter({
  searchText,
  isOpen,
  isFocused,
  selectedItems,
  onSearchChange,
  onFocus,
  onBlur,
  onSelect,
  onRemove,
}: SkillFilterProps) {
  const filteredSkills =
    searchText.length > 0
      ? skillsData.filter((skill) => skill.name.toLowerCase().includes(searchText.toLowerCase())).slice(0, 15)
      : []

  return (
    <div className="relative">
      <div className={`rounded-xl border ${isFocused ? 'border-main' : 'border-grey30'} bg-white px-6 py-5`}>
        <h3 className="mb-2 text-sm text-grey70">보유 스킬</h3>
        <input
          value={searchText}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="어떤 보유 스킬이 필요한가요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      {/* 스킬 옵션 드롭다운 */}
      <div
        className={`absolute  left-[-7.5rem] z-10 w-[30rem] transform overflow-hidden transition-all duration-200 ease-in-out md:left-0 lg:w-[42rem] ${
          isOpen ? 'opacity-100' : 'h-0 opacity-0'
        }`}
        style={{ top: 'calc(100% + 10px)' }}
      >
        <div className="rounded-xl border border-grey30 bg-white p-4" onMouseDown={(e) => e.preventDefault()}>
          {searchText.length === 0 ? (
            <p className="text-center text-grey50">스킬을 영어로 검색해 보세요</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => onSelect(skill.name)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                    selectedItems.includes(skill.name)
                      ? 'border border-main bg-[#D3E1FE] text-main '
                      : 'border border-grey40 bg-grey20 text-grey50'
                  }`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
