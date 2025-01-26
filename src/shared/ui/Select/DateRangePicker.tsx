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
  ongoingLabel = '진행 중',
  ongoingClassName = 'text-grey70 cursor-pointer',
}) => {
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)
  const [isStartDateValid, setIsStartDateValid] = useState(true)
  const [isEndDateValid, setIsEndDateValid] = useState(true)

  // props로 받은 날짜가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLocalStartDate(startDate)
    setLocalEndDate(endDate)
  }, [startDate, endDate])

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

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalStartDate(formatted)

    const isValid = validateDate(formatted)
    setIsStartDateValid(isValid)

    // 유효한 경우에만 부모 컴포넌트에 값 전달
    if (isValid && formatted.length === 7) {
      onStartDateChange(formatted)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setLocalEndDate(formatted)

    const isValid = validateDate(formatted)
    setIsEndDateValid(isValid)

    // 유효한 경우에만 부모 컴포넌트에 값 전달
    if (isValid && formatted.length === 7) {
      onEndDateChange(formatted)
    }
  }

  const handleOngoingToggle = () => {
    onToggleOngoing()
    if (!isOngoing) {
      // 진행중으로 변경될 때
      setLocalEndDate('') // 종료일 로컬 상태 초기화
      onEndDateChange('') // 부모 컴포넌트 종료일 초기화
      setIsEndDateValid(true) // 종료일 유효성 상태 초기화
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="flex w-[10.6rem]">
        기간<span className="text-main">*</span>
      </span>
      <div className="flex w-full items-center gap-2">
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
          disabled={isOngoing}
        />
      </div>
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
          <span className={ongoingClassName}>{ongoingLabel}</span>
          {ongoingLabel === '재학 중' && (
            <div className="group relative">
              <Image
                src="/common/icons/info.svg"
                alt="info"
                width={16}
                height={16}
                className="cursor-pointer text-grey80"
              />
              <div
                className="absolute left-20 top-[calc(100%+0.5rem)] hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-grey30 bg-white p-3 text-xs text-grey70 group-hover:block"
                style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
              >
                재학 중에는 휴학도 포함됩니다
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
