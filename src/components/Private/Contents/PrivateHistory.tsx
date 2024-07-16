'use client'

import { AntecedentResponse } from '@/lib/types'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormInputs {
  projectName: string
  projectRole: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  retirement: boolean
  antecedentsDescription: string
}

interface MyResumAntecedentProps {
  data: AntecedentResponse[]
}

export default function PrivateHistory({ data }: MyResumAntecedentProps) {
  const { setValue } = useForm<FormInputs>()
  const [histories, setHistories] = useState<FormInputs[]>(() =>
    data?.map((item) => ({
      projectName: item.projectName,
      projectRole: item.projectRole,
      startYear: item.startYear,
      startMonth: item.startMonth,
      endYear: item.endYear,
      endMonth: item.endMonth,
      retirement: item.retirement,
      antecedentsDescription: item.antecedentsDescription || '', // 기본값 설정
    })),
  )
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    if (editingIndex !== null) {
      const history = histories[editingIndex]
      setValue('projectName', history.projectName)
      setValue('projectRole', history.projectRole)
      setValue('startYear', history.startYear)
      setValue('startMonth', history.startMonth)
      setValue('endYear', history.endYear)
      setValue('endMonth', history.endMonth)
      setValue('retirement', history.retirement)
      setValue('antecedentsDescription', history.antecedentsDescription)
    }
  }, [editingIndex, histories, setValue])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">경력</span>
      </div>

      {/* contents */}
      {!histories && <div className="pt-[0.94rem] text-grey50">경력사항이 없습니다.</div>}

      {histories?.map((history, index) => (
        <div key={index} className="mt-6 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-grey100">{history.projectRole}</span>
              <span className="pt-1 text-sm text-grey60">{history.projectName}</span>
              <span className="pt-1 text-xs text-grey50">
                {history.startYear}년 {history.startMonth}월 - {history.endYear}년 {history.endMonth}월 (
                {history.retirement ? '퇴직' : '재직중'})
              </span>
              <span className="pt-1 text-sm text-grey60">{history.antecedentsDescription}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
