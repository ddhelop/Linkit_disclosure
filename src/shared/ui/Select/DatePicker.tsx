'use client'

import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface DatePickerProps {
  date: string
  onDateChange: (date: string) => void
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  isOngoing?: boolean
  onOngoingChange?: (isOngoing: boolean) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  placeholder = 'YYYY.MM',
  label = '날짜',
  required = false,
  className = '',
  isOngoing = false,
  onOngoingChange,
}) => {
  const [localDate, setLocalDate] = useState(date)
  const [isDateValid, setIsDateValid] = useState(true)

  // props로 받은 날짜가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLocalDate(date)
  }, [date])

  const formatDateInput = (input: string) => {
    // 숫자만 추출
    const numbers = input.replace(/\D/g, '')

    if (numbers.length <= 4) {
      // YYYY
      return numbers
    } else {
      // YYYY.MM
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalDate(formatted)

    const isValid = validateDate(formatted)
    setIsDateValid(isValid)

    // 유효한 경우에만 부모 컴포넌트에 값 전달
    if (isValid && formatted.length === 7) {
      onDateChange(formatted)
    }
  }

  const handleOngoingToggle = () => {
    onOngoingChange?.(!isOngoing)
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <span className="flex">
          {label}
          {required && <span className="text-main">*</span>}
        </span>
      )}
      <Input
        placeholder={placeholder}
        className={`${className} ${!isDateValid ? 'border-red-500' : ''}`}
        value={localDate}
        onChange={handleDateChange}
        maxLength={7}
      />
      {isOngoing !== undefined && (
        <div className="flex w-full gap-2" onClick={handleOngoingToggle}>
          <div className="flex w-full items-center gap-2">
            <div
              className={`cursor-pointer rounded-[0.32rem] border p-[0.32rem] ${
                isOngoing ? 'bg-[#D3E1FE]' : 'border-grey40 bg-grey20'
              }`}
            >
              <Image
                src={`/common/icons/${isOngoing ? 'btn_blue_check.svg' : 'btn_check.svg'}`}
                width={13}
                height={13}
                alt="check-icon"
              />
            </div>
            <span>진행 중</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
