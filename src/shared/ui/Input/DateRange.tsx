// src/shared/ui/DateRange/DateRange.tsx
'use client'

import { useState, useEffect } from 'react'
import Input from '@/shared/ui/Input/Input'

interface DateRangeProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

const DateRange: React.FC<DateRangeProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)
  const [isStartDateValid, setIsStartDateValid] = useState(true)
  const [isEndDateValid, setIsEndDateValid] = useState(true)

  useEffect(() => {
    setLocalStartDate(startDate)
    setLocalEndDate(endDate)
  }, [startDate, endDate])

  const formatDateInput = (input: string) => {
    const numbers = input.replace(/\D/g, '')
    if (numbers.length <= 4) {
      return numbers
    } else {
      return `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}`
    }
  }

  const validateDate = (date: string) => {
    if (!date) return true
    const regex = /^\d{4}\.(0[1-9]|1[0-2])$/
    if (!regex.test(date)) return false

    const [year, month] = date.split('.')
    const yearNum = parseInt(year)
    const currentYear = new Date().getFullYear()

    return yearNum >= 1900 && yearNum <= currentYear
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalStartDate(formatted)

    const isValid = validateDate(formatted)
    setIsStartDateValid(isValid)

    if (isValid && formatted.length === 7) {
      onStartDateChange(formatted)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalEndDate(formatted)

    const isValid = validateDate(formatted)
    setIsEndDateValid(isValid)

    if (isValid && formatted.length === 7) {
      onEndDateChange(formatted)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="YYYY.MM"
        className={`w-[49%] ${!isStartDateValid ? 'border-red-500' : ''}`}
        value={localStartDate}
        onChange={handleStartDateChange}
        maxLength={7}
      />
      <span>~</span>
      <Input
        placeholder="YYYY.MM"
        className={`w-[49%] ${!isEndDateValid ? 'border-red-500' : ''}`}
        value={localEndDate}
        onChange={handleEndDateChange}
        maxLength={7}
      />
    </div>
  )
}

export default DateRange
