// src/shared/ui/DateRangePicker/DateRangePicker.tsx
'use client'

import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface DateRangePickerProps {
  startDate: string
  endDate: string
  isOngoing: boolean
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onToggleOngoing: () => void
  ongoingLabel?: string // "진행 중" 텍스트 변경을 위한 props
  ongoingClassName?: string // "진행 중" 부분의 스타일을 커스터마이징할 수 있는 props
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  isOngoing,
  onStartDateChange,
  onEndDateChange,
  onToggleOngoing,
  ongoingLabel = '진행 중', // 기본값을 "진행 중"으로 설정
  ongoingClassName = 'text-grey70', // 기본 스타일
}) => {
  // 입력 중인 값을 관리하기 위한 로컬 상태
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)

  useEffect(() => {
    setLocalStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setLocalEndDate(endDate)
  }, [endDate])

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
    const regex = /^\d{4}\.(0[1-9]|1[0-2])$/
    if (!regex.test(date)) return false

    const [year, month] = date.split('.')
    const yearNum = parseInt(year)
    const currentYear = new Date().getFullYear()

    // 연도는 1900부터 현재 연도까지만 허용
    return yearNum >= 1900 && yearNum <= currentYear
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalStartDate(formatted)

    // 형식이 완성되고 유효한 경우에만 부모 컴포넌트에 알림
    if (formatted.length === 7 && validateDate(formatted)) {
      onStartDateChange(formatted)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalEndDate(formatted)

    // 형식이 완성되고 유효한 경우에만 부모 컴포넌트에 알림
    if (formatted.length === 7 && validateDate(formatted)) {
      onEndDateChange(formatted)
    }
  }

  const handleBlur = (date: string, onChange: (date: string) => void) => {
    if (date && !validateDate(date)) {
      onChange('') // 유효하지 않은 날짜는 초기화
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="flex w-[10.6rem]">
        기간<span className="text-main">*</span>
      </span>
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="YYYY.MM"
          className="w-[49%]"
          value={localStartDate}
          onChange={handleStartDateChange}
          onBlur={() => handleBlur(localStartDate, onStartDateChange)}
          maxLength={7}
        />
        <span>~</span>
        <Input
          placeholder="YYYY.MM"
          className="w-[49%]"
          value={localEndDate}
          onChange={handleEndDateChange}
          onBlur={() => handleBlur(localEndDate, onEndDateChange)}
          maxLength={7}
          disabled={isOngoing}
        />
      </div>
      <div className="flex cursor-pointer gap-2" onClick={onToggleOngoing}>
        <div
          className={`rounded-[0.32rem] border p-[0.32rem] ${isOngoing ? 'bg-[#D3E1FE]' : 'border-grey40 bg-grey20'}`}
        >
          <Image
            src={`/common/icons/${isOngoing ? 'btn_blue_check.svg' : 'btn_check.svg'}`}
            width={13}
            height={13}
            alt="check-icon"
          />
        </div>
        <span className={ongoingClassName}>{ongoingLabel}</span>
      </div>
    </div>
  )
}

export default DateRangePicker
