import { useState, useRef, useEffect } from 'react'
import Input from '@/shared/ui/Input/Input'
import { logoLists } from '@/shared/data/university_logo_lists_pretty'
import Image from 'next/image'

interface UniversityInputProps {
  placeholder?: string
  className?: string
  onUniversitySelect: (university: string) => void
  selectedUniversity?: string
}

export const UniversityInput = ({
  placeholder = '학교명을 검색해 주세요',
  className = '',
  onUniversitySelect,
  selectedUniversity = '',
}: UniversityInputProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [filteredUniversities, setFilteredUniversities] = useState<typeof logoLists.logo>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedUniversityData = logoLists.logo.find((item) => item.university === selectedUniversity)

  useEffect(() => {
    if (selectedUniversity) {
      setSearchTerm('')
    }
  }, [selectedUniversity])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = logoLists.logo.filter((item) => item.university.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredUniversities(filtered)
      setIsDropdownVisible(true)
      setSelectedIndex(-1)
    } else {
      setFilteredUniversities([])
      setIsDropdownVisible(false)
    }
  }, [searchTerm])

  const handleUniversitySelect = (university: string) => {
    onUniversitySelect(university)
    setSearchTerm('')
    setIsDropdownVisible(false)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownVisible) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredUniversities.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleUniversitySelect(filteredUniversities[selectedIndex].university)
        }
        break
      case 'Escape':
        setIsDropdownVisible(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        {selectedUniversityData ? (
          <div className="relative flex items-center gap-2 rounded-xl border border-grey30 px-6 py-3">
            <span>{selectedUniversityData.university}</span>
            <button
              onClick={() => onUniversitySelect('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-grey50 hover:text-grey80"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full rounded-xl border-grey30 px-6 py-3 pr-12 ${className}`}
            />
            <Image
              src="/common/icons/search.svg"
              alt="검색"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-grey50"
            />
          </>
        )}
      </div>

      {isDropdownVisible && filteredUniversities.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-grey30 bg-white shadow-md">
          {filteredUniversities.map((item, index) => (
            <div
              key={item.id}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2 ${
                index === selectedIndex ? 'bg-blue-50' : 'hover:bg-grey10'
              }`}
              onClick={() => handleUniversitySelect(item.university)}
            >
              <span>{item.university}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
