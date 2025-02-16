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
  const positions = [
    '창업가',
    '공동 창업가',
    'CEO',
    'COO',
    'CTO',
    'CMO',
    'CFO',
    'CBO',
    'CPO',
    'CRO',
    'CHO',
    'CIO',
    'CSO',
    '프론트엔드 개발자',
    '백엔드 개발자',
    '풀스택 개발자',
    'iOS 개발자',
    'Android 개발자',
    'QA 개발자',
    'DevOps 엔지니어',
    '데이터 엔지니어',
    '보안 엔지니어',
    '머신러닝 개발자',
    'AI 개발자',
    '블록체인 개발자',
    'CRM 개발자',
    '임베디드 소프트웨어 개발자',
    '게임 개발자',
    '프로덕트 디자이너',
    'UX 디자이너',
    'UI/GUI 디자이너',
    '웹 디자이너',
    'BI/BX 디자이너',
    '그래픽 디자이너',
    '제품 디자이너',
    '산업 디자이너',
    '영상 디자이너',
    '모션 디자이너',
    '편집 디자이너',
    '광고 디자이너',
    '3D 디자이너',
    '공간 디자이너',
    '캐릭터 디자이너',
    '일러스트레이터',
    '프로덕트 매니저',
    '프로젝트 매니저',
    '프로덕트 오너',
    '서비스 기획',
    '비즈니스 기획',
    '콘텐츠 기획',
    '상품 기획자',
    '제품 기획자',
    '데이터 분석 기획자',
    '콘텐츠 마케터',
    '디지털 마케터',
    '브랜드 마케터',
    '퍼포먼스 마케터',
    'SNS 마케터',
    '그로스 마케터',
    '검색광고 마케터',
    '바이럴 마케터',
    '프로모션 마케터',
    '광고 기획',
    '엔젤투자자',
    '벤처캐피탈',
    '액셀러레이터',
  ]
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
          placeholder="어떤 포지션의 공고를 찾나요?"
          className="w-full text-xs placeholder:text-grey50 focus:outline-none"
        />
      </div>

      {/* 포지션 옵션 드롭다운 */}
      <div

        className={`absolute left-0 top-[calc(100%+10px)] z-10 w-[60rem] transform overflow-hidden transition-all duration-200 ease-in-out ${

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
