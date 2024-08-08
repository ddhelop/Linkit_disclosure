import Image from 'next/image'
import { useState, useEffect } from 'react'

interface SkillModalProps {
  show: boolean
  onClose: () => void
  selectedFilters: string[]
  handleFilterChange: (skills: string[]) => void
  skillOptions: string[]
}

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
  const [showLimitError, setShowLimitError] = useState<boolean>(false) // State to manage error message visibility

  const itemsPerPage = 15
  const filteredOptions = skillOptions.filter(
    (skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()) && !tempSelectedFilters.includes(skill),
  )
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(0)
    setShowLimitError(false) // Reset the error message on search term change
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
    if (tempSelectedFilters.includes(skill)) {
      setTempSelectedFilters(tempSelectedFilters.filter((item) => item !== skill))
      setShowLimitError(false)
    } else if (tempSelectedFilters.length < 10) {
      setTempSelectedFilters([...tempSelectedFilters, skill])
      setShowLimitError(false)
    } else {
      setShowLimitError(true) // Set error state to true when limit is reached
    }
  }

  const applyChanges = () => {
    handleFilterChange(tempSelectedFilters)
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#000] bg-opacity-50" onClick={onClose}>
      <div
        className="relative flex h-[530px] w-[90%] max-w-[700px] flex-col overflow-hidden rounded-lg bg-[#fff] p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-auto">
          <input
            type="text"
            placeholder="기술 검색"
            className="mb-4 w-full rounded border border-grey40 px-2 py-2 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mb-4 flex flex-wrap gap-1">
            {tempSelectedFilters.map((skill, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center rounded-[0.31rem] border border-[#2563EB] bg-blue-100 px-2 py-1 text-xs text-[#2563EB]"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
                <span className="ml-2">×</span>
              </div>
            ))}
          </div>
          {showLimitError && <p className="text-xs text-red-500">최대 10개의 기술만 선택할 수 있습니다.</p>}
          <div className="flex flex-wrap items-start gap-2 overflow-auto">
            {filteredOptions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((skill, index) => (
              <div
                key={index}
                onClick={() => toggleSkill(skill)}
                className="cursor-pointer rounded-[0.31rem] border bg-[#fff] px-2 py-1 text-xs text-grey50 hover:bg-grey10"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-4">
          <button
            className={`rounded px-3 py-1 text-xs text-white ${currentPage > 0 ? 'bg-blue-500' : 'bg-grey30'}`}
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
          >
            이전
          </button>
          <span className="text-xs text-black">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            className={`rounded px-3 py-1 text-xs text-white ${currentPage < totalPages - 1 ? 'bg-blue-500' : 'bg-grey30'}`}
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
          >
            다음
          </button>
        </div>
        <div className="absolute bottom-5 right-5 mt-4 flex justify-end gap-4">
          <button onClick={onClose} className="rounded bg-grey20 px-4 py-1 text-xs">
            취소
          </button>
          <button onClick={applyChanges} className="rounded bg-[#2563EB] px-4 py-1 text-xs text-[#fff]">
            적용
          </button>
        </div>
      </div>
    </div>
  )
}
