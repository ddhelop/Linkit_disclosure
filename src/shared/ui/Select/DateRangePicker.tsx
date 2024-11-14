// src/shared/ui/DateRangePicker/DateRangePicker.tsx
'use client'

import Input from '@/shared/ui/Input/Input'
import Image from 'next/image'

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
  return (
    <div className="flex flex-col gap-3">
      <span className="flex w-[10.6rem]">
        기간<span className="text-main">*</span>
      </span>
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="시작일자"
          className="w-[49%]"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
        <span>~</span>
        <Input
          placeholder="종료일자"
          className="w-[49%]"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          disabled={isOngoing} // 진행 중일 때 비활성화
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
