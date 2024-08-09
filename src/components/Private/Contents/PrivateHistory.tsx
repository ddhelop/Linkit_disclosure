'use client'

import { AntecedentResponse } from '@/lib/types'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormInputs {
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean | string
  // antecedentsDescription: string
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
      startDate: item.startDate,
      endDate: item.endDate,
      retirement: item.retirement,
      // antecedentsDescription: item.antecedentsDescription || '', // 기본값 설정
    })),
  )
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    if (editingIndex !== null) {
      const history = histories[editingIndex]
      setValue('projectName', history.projectName)
      setValue('projectRole', history.projectRole)
      setValue('startDate', history.startDate)
      setValue('endDate', history.endDate)
      setValue('retirement', history.retirement)
      // setValue('antecedentsDescription', history.antecedentsDescription)
    }
  }, [editingIndex, histories, setValue])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-base font-semibold text-grey100 sm:text-lg">경력</span>
      </div>

      {/* contents */}
      {!histories && <div className="pt-3 text-grey50">경력사항이 없습니다.</div>}

      {histories?.map((history, index) => (
        <div key={index} className="mt-3 flex flex-col rounded-[0.63rem] border border-grey30 p-5">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-grey100 sm:text-base">{history.projectRole}</span>
              <span className="pt-1 text-xs text-grey60 sm:text-sm">{history.projectName}</span>
              <span className="pt-1 text-xs text-grey50">
                {history.startDate} - {history.endDate} ({history.retirement ? '종료' : '진행중'})
              </span>
              {/* <span className="pt-1 text-sm text-grey60">{history.antecedentsDescription}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
