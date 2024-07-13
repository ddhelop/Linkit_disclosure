// SkillModal.tsx
'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface SkillModalProps {
  show: boolean
  onClose: () => void
  selectedFilters: string[]
  handleFilterChange: (skills: string[]) => void
  skillOptions: string[]
}

// Modal Component
export default function SkillModal({
  show,
  onClose,
  selectedFilters,
  handleFilterChange,
  skillOptions,
}: SkillModalProps) {
  const [tempSelectedFilters, setTempSelectedFilters] = useState<string[]>(selectedFilters)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const itemsPerPage = 55
  const filteredOptions = skillOptions.filter(
    (skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()) && !tempSelectedFilters.includes(skill),
  )
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(0)
  }, [searchTerm])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const toggleSkill = (skill: string) => {
    setTempSelectedFilters((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill)
      } else {
        return [...prev, skill]
      }
    })
  }

  const applyChanges = () => {
    handleFilterChange(tempSelectedFilters)
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#000] bg-opacity-50" onClick={onClose}>
      <div
        className="relative flex h-[730px] w-[90%] max-w-[800px] flex-col rounded-lg bg-[#fff] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between pb-4">
          <h2 className="text-lg font-semibold">기술</h2>
        </div>
        <input
          type="text"
          placeholder="기술 검색"
          className="mb-4 w-full rounded border border-grey40 px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {tempSelectedFilters.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-100 flex h-8 cursor-pointer items-center rounded-[0.31rem] border border-[#2563EB] px-3 py-1 text-[#2563EB]"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
              <span className="ml-2">×</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-start gap-3 overflow-auto">
          {filteredOptions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((skill, index) => (
            <div
              key={index}
              onClick={() => toggleSkill(skill)}
              className="h-8 cursor-pointer rounded-[0.31rem] border bg-[#fff] px-3 py-1 text-sm text-grey50 hover:bg-grey10"
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className={`h-8 rounded px-3 py-1 ${currentPage === 0 ? 'text-grey30' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === 0}
          >
            이전
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className={`h-8 rounded px-3 py-1 ${currentPage === totalPages - 1 ? 'text-grey30' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </button>
        </div>
        <div className="absolute bottom-5 right-5 mt-4 flex justify-end gap-4">
          <button onClick={onClose} className="h-8 rounded bg-grey20 px-4 py-1">
            취소
          </button>
          <button onClick={applyChanges} className="h-8 rounded bg-[#2563EB] px-4 py-1 text-[#fff]">
            적용
          </button>
        </div>
      </div>
    </div>
  )
}
