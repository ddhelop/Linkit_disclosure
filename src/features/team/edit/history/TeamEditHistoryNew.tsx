'use client'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState } from 'react'

export default function TeamEditHistoryNew() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)

  const handleStartDateChange = (date: string) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: string) => {
    setEndDate(date)
  }

  const handleToggleOngoing = () => {
    setIsOngoing(!isOngoing)
  }
  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.87rem] py-10">
        {/* 연혁명 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <div className="flex justify-between ">
            <span className="flex gap-1 text-grey80">
              연혁명<p className="text-main">*</p>
            </span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>
          <Input placeholder="연혁명을 입력해주세요" />
        </div>

        {/* 기간 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            isOngoing={isOngoing}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onToggleOngoing={handleToggleOngoing}
          />
        </div>

        {/* 설명 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex gap-1 text-grey80">
            설명<p className="text-main">*</p>
          </span>

          <Textarea placeholder="연혁 설명을 입력해주세요" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button mode="main2" animationMode="main" className="rounded-[0.69rem] py-2">
          저장하기
        </Button>
      </div>
    </>
  )
}
