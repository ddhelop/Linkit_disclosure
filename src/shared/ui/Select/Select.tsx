// src/shared/ui/Select/Select.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = '선택',
  onChange,
  className = '',
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border-[1.5px] border-grey30 px-6 py-3 text-left focus:border-main focus:outline-none"
      >
        <span className={`${selectedValue ? 'text-black' : 'text-gray-400'}`}>
          {selectedValue ? options.find((option) => option.value === selectedValue)?.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-grey30 bg-white shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="cursor-pointer px-6 py-3 hover:bg-grey10 "
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
