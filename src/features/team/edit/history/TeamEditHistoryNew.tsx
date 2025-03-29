'use client'

import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/shared/hooks/useToast'
import { getTeamSingleHistory } from '../../api/teamHistoryApi'
import { useQuery } from '@tanstack/react-query'
import { createTeamHistory, updateTeamHistory } from '../../api/teamApi'
import { TeamHistory } from '../../types/teamHistory.types'
import { ApiResponse } from '@/shared/types/ApiResponse'
import DatePicker from '@/shared/ui/Select/DatePicker'
import { useEffect } from 'react'

export default function TeamEditHistoryNew({ teamName }: { teamName: string }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<TeamHistory>({
    defaultValues: {
      historyName: '',
      historyStartDate: '',
      historyEndDate: '',
      historyDescription: '',
      isHistoryInProgress: false,
    },
  })

  // 연혁 단일 조회
  const { data: history } = useQuery<ApiResponse<TeamHistory>, Error>({
    queryKey: ['teamEditHistory', teamName, id],
    queryFn: () => getTeamSingleHistory(teamName, Number(id)),
    enabled: !!id,
  })

  // history 데이터 로드되면 reset으로 초기화
  useEffect(() => {
    if (history) {
      const result = history.result
      reset({
        historyName: result.historyName,
        historyStartDate: result.historyStartDate,
        historyEndDate: result.historyEndDate,
        isHistoryInProgress: result.isHistoryInProgress,
        historyDescription: result.historyDescription,
      })
    }
  }, [history, reset])

  const onSubmit = async (data: TeamHistory) => {
    try {
      const payload = {
        historyName: data.historyName,
        historyStartDate: data.historyStartDate,
        historyEndDate: data.isHistoryInProgress ? null : data.historyEndDate,
        isHistoryInProgress: data.isHistoryInProgress,
        historyDescription: data.historyDescription,
      }

      if (id) {
        await updateTeamHistory(teamName, Number(id), payload)
      } else {
        await createTeamHistory(teamName, payload)
      }

      toast.success('연혁이 생성되었습니다.')
      router.push(`/team/${teamName}/edit/history`)
    } catch (error) {
      console.error('Failed to create team history:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-10 rounded-xl bg-white p-5 md:px-[2.87rem] md:py-10">
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
            placeholder="연혁명을 입력해 주세요 (50자 이내)"
            {...register('historyName', { required: true, maxLength: 50 })}
          />
        </div>

        {/* 기간 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <DatePicker
            date={watch('historyStartDate')}
            onDateChange={(date) => setValue('historyStartDate', date, { shouldDirty: true })}
            placeholder="YYYY.MM"
            label="날짜"
            required
            className="w-full"
            isOngoing={watch('isHistoryInProgress')}
            onOngoingChange={(isOngoing) => setValue('isHistoryInProgress', isOngoing, { shouldDirty: true })}
          />
        </div>

        {/* 설명 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex gap-1 text-grey80">설명</span>
          <Textarea
            placeholder="설명을 입력해 주세요 (300자 이내)"
            {...register('historyDescription', { maxLength: 300 })}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Button mode="main2" animationMode="main" className="rounded-[0.69rem] py-2" type="submit" disabled={!isDirty}>
          저장하기
        </Button>
      </div>
    </form>
  )
}
