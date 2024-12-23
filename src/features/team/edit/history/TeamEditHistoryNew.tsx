'use client'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useState } from 'react'
import { createTeamHistory } from '../../api/teamApi'
import { useParams } from 'next/navigation'

export default function TeamEditHistoryNew() {
  const { teamName } = useParams() as { teamName: string }
  const [historyName, setHistoryName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [description, setDescription] = useState('')

  const handleStartDateChange = (date: string) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: string) => {
    setEndDate(date)
  }

  const handleToggleOngoing = () => {
    setIsOngoing(!isOngoing)
  }

  const handleSubmit = async () => {
    try {
      const historyData = {
        historyName,
        historyStartDate: startDate,
        historyEndDate: isOngoing ? null : endDate,
        isHistoryInProgress: isOngoing,
        historyDescription: description,
      }

      await createTeamHistory(teamName, historyData)
      // TODO: 성공 시 처리 (예: 알림, 페이지 이동 등)
    } catch (error) {
      console.error('Failed to create team history:', error)
      // TODO: 에러 처리
    }
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
          <Input
            placeholder="연혁명을 입력해주세요"
            value={historyName}
            onChange={(e) => setHistoryName(e.target.value)}
          />
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

          <Textarea
            placeholder="연혁 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button mode="main2" animationMode="main" className="rounded-[0.69rem] py-2" onClick={handleSubmit}>
          저장하기
        </Button>
      </div>
    </>
  )
}
