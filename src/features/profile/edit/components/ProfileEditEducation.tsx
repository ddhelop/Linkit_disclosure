'use client'
import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'

import { useState } from 'react'

export default function ProfileEditEducation() {
  const [startDate, setStartDate] = useState('') // 시작 날짜 입력 값
  const [endDate, setEndDate] = useState('') // 종료 날짜 입력 값
  const [isOngoing, setIsOngoing] = useState(false) // 진행 중 상태 관리

  const handleOngoingToggle = () => {
    setIsOngoing((prev) => !prev)
    setEndDate('') // "진행 중"을 선택할 때 종료 날짜 초기화
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        {/* 학교명 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex text-grey80">
              학교명<span className="text-main">*</span>
            </span>
            <span className="text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input placeholder="학교명을 입력해 주세요" className="text-sm " />
        </div>

        {/* 전공 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">
            전공<span className="text-main">*</span>
          </span>
          <Input placeholder="전공을 입력해 주세요" className="text-sm " />
        </div>

        {/* 기간 */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          isOngoing={isOngoing}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onToggleOngoing={handleOngoingToggle}
          ongoingLabel="재학중"
        />

        {/* 설명 */}
        <div className="flex flex-col gap-3">
          <span className="flex text-grey80">설명</span>

          <Input placeholder="설명을 입력해주세요." className="text-sm " />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button mode="main" animationMode="main" className=" rounded-xl font-semibold">
          저장하기
        </Button>
      </div>
    </>
  )
}
