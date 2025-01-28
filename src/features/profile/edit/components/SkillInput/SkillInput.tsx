import { useState, useRef, useEffect } from 'react'
import Input from '@/shared/ui/Input/Input'
import { skillsData } from '@/shared/data/skillsData'
import { SkillInputProps } from '../../model/types'
import Image from 'next/image'

export const SkillInput = ({
  placeholder = '스킬을 영어로 검색해 보세요',
  className = '',
  onSkillAdd,
  onSkillRemove,
  selectedSkills = [],
}: SkillInputProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [filteredSkills, setFilteredSkills] = useState<{ id: number; name: string }[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      const filtered = skillsData.filter(
        (skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSkills.includes(skill.name),
      )
      setFilteredSkills(filtered)
      setIsDropdownVisible(true)
      setSelectedIndex(-1)
    } else {
      setFilteredSkills([])
      setIsDropdownVisible(false)
    }
  }, [searchTerm, selectedSkills])

  const handleSkillSelect = (skill: { id: number; name: string }) => {
    if (onSkillAdd) {
      onSkillAdd(skill.name)
    }
    setSearchTerm('')
    setIsDropdownVisible(false)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownVisible) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredSkills.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSkillSelect(filteredSkills[selectedIndex])
        }
        break
      case 'Escape':
        setIsDropdownVisible(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillRemove?.(skill)}
              className="flex items-center gap-2 rounded-xl border border-[#7EA5F8] bg-[#EDF3FF] px-4 py-2 text-blue-600 hover:bg-blue-100"
            >
              <span>{skill}</span>
              <span className="text-blue-400">×</span>
            </button>
          ))}
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        <div className="relative">
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
        </div>

        {isDropdownVisible && filteredSkills.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-grey30 bg-white shadow-md">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                className={`cursor-pointer px-4 py-2 ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-grey10'}`}
                onClick={() => handleSkillSelect(skill)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
