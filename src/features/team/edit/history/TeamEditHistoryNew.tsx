'use client'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useEffect, useState } from 'react'
import { createTeamHistory, getTeamHistory, getTeamHistoryDetail, updateTeamHistory } from '../../api/teamApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'

export default function TeamEditHistoryNew({ teamName }: { teamName: string }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const toast = useToast()

  const [originalData, setOriginalData] = useState({
    historyName: '',
    historyStartDate: '',
    historyEndDate: '',
    isHistoryInProgress: false,
    historyDescription: '',
  })

  useEffect(() => {
    const fetchHistory = async () => {
      if (id) {
        const history = await getTeamHistoryDetail(teamName, Number(id))
        const historyData = history.result
        setOriginalData({
          historyName: historyData.historyName,
          historyStartDate: historyData.historyStartDate,
          historyEndDate: historyData.historyEndDate,
          isHistoryInProgress: historyData.isHistoryInProgress,
          historyDescription: historyData.historyDescription,
        })
        setHistoryName(historyData.historyName)
        setStartDate(historyData.historyStartDate)
        setEndDate(historyData.historyEndDate)
        setIsOngoing(historyData.isHistoryInProgress)
        setDescription(historyData.historyDescription)
      }
    }
    fetchHistory()
  }, [teamName, id])

  const [historyName, setHistoryName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOngoing, setIsOngoing] = useState(false)
  const [description, setDescription] = useState('')
  const router = useRouter()

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

      if (id) {
        await updateTeamHistory(teamName, Number(id), historyData)
      } else {
        await createTeamHistory(teamName, historyData)
      }

      toast.success('연혁이 생성되었습니다.')
      router.push(`/team/${teamName}/edit/history`)
    } catch (error) {
      console.error('Failed to create team history:', error)
      // TODO: 에러 처리
    }
  }

  const isDataChanged = () => {
    if (!id) return true

    return (
      originalData.historyName !== historyName ||
      originalData.historyStartDate !== startDate ||
      originalData.historyEndDate !== endDate ||
      originalData.isHistoryInProgress !== isOngoing ||
      originalData.historyDescription !== description
    )
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
          <span className="flex gap-1 text-grey80">설명</span>

          <Textarea
            placeholder="연혁 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          mode="main2"
          animationMode="main"
          className="rounded-[0.69rem] py-2"
          onClick={handleSubmit}
          disabled={!isDataChanged()}
        >
          저장하기
        </Button>
      </div>
    </>
  )
}
