'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostAntecedentData, PutAntecedentData } from '@/lib/action'
import { AntecedentResponse } from '@/lib/types'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

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

export default function MyHistoryComponent({ data }: MyResumAntecedentProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormInputs>()
  const [histories, setHistories] = useState<FormInputs[]>(() =>
    data?.map((item) => ({
      id: item.id,
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
  const [isAdding, setIsAdding] = useState(false)
  const accessToken = useRecoilValue(accessTokenState) || ''

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

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const formattedData = {
      ...formData,
      startYear: Number(formData.startYear),
      startMonth: Number(formData.startMonth),
      endYear: Number(formData.endYear),
      endMonth: Number(formData.endMonth),
      retirement: formData.retirement === true,
    }

    if (editingIndex !== null) {
      const antecedentId = data[editingIndex].id
      const response = await PutAntecedentData(accessToken, formattedData, antecedentId) // 수정 API 호출
      if (response.ok) {
        const updatedHistories = histories.map((history, index) => (index === editingIndex ? formattedData : history))
        setHistories(updatedHistories)
        setEditingIndex(null)
        reset()
        setIsAdding(false)
        alert('수정이 완료되었습니다.')
      }
    } else {
      const updatedHistories = [...histories, formattedData]
      const response = await PostAntecedentData(accessToken, updatedHistories) // 추가 API 호출
      if (response.ok) {
        setHistories(updatedHistories)
        reset()
        setIsAdding(false)
        alert('추가가 완료되었습니다.')
      }
    }
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const updatedHistories = histories.filter((_, i) => i !== index)
      setHistories(updatedHistories)
      const response = await PostAntecedentData(accessToken, updatedHistories) // 업데이트된 배열을 서버에 전달
      if (response.ok) {
        alert('삭제가 완료되었습니다.')
      }
      if (index === editingIndex) {
        setEditingIndex(null)
        reset()
        setIsAdding(false)
      }
    }
  }

  const retirementValue = watch('retirement')

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">경력</span>
      </div>

      {/* contents */}
      {histories?.length === 0 && !isAdding && <div className="pt-[0.94rem] text-grey50">이력사항이 없습니다.</div>}

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
            <div className="flex items-center justify-end">
              <Image
                onClick={() => handleEdit(index)}
                src="/assets/icons/pencil.svg"
                width={27}
                height={27}
                alt="edit"
                className="cursor-pointer"
              />
              <Image
                onClick={() => handleDelete(index)}
                src="/assets/icons/delete.svg"
                width={27}
                height={27}
                alt="delete"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}

      {isAdding && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6"
        >
          <div className="flex gap-3">
            <div className="flex w-[49%] flex-col">
              <span className="text-sm font-normal text-grey100">
                회사/프로젝트명<span className="pl-1 text-[#2563EB]">*</span>
              </span>
              <input
                type="text"
                placeholder="ex. (주)링킷"
                className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                {...register('projectName', { required: true })}
              />
            </div>

            <div className="flex w-[49%] flex-col">
              <span className="text-sm font-normal text-grey100">
                포지션<span className="pl-1 text-[#2563EB]">*</span>
              </span>
              <input
                type="text"
                placeholder="ex. Product Manager"
                className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                {...register('projectRole', { required: true })}
              />
            </div>
          </div>

          <div className="mt-[0.81rem] flex flex-col">
            <span className="text-sm font-normal text-grey100">
              기간<span className="pl-1 text-[#2563EB]">*</span>
            </span>
            <div className="flex justify-between">
              <div className="mt-2 flex gap-2">
                <input
                  className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                  placeholder="시작연도"
                  {...register('startYear', { required: true })}
                />
                <select
                  className="w-20 rounded-md border border-grey40 text-center text-sm text-grey80"
                  {...register('startMonth', { required: true })}
                >
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}월
                    </option>
                  ))}
                </select>
                <span>~</span>
                <input
                  className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                  placeholder="종료연도"
                  {...register('endYear', { required: true })}
                />
                <select
                  className="w-20 rounded-md border border-grey40 text-center text-sm text-grey80"
                  {...register('endMonth', { required: true })}
                >
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}월
                    </option>
                  ))}
                </select>

                {/* input radio 재직중 */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="current"
                    value="false"
                    {...register('retirement')}
                    checked={retirementValue === false}
                  />
                  <label htmlFor="current" className="text-sm text-grey100">
                    재직중
                  </label>

                  {/* radio 퇴직 */}
                  <input
                    type="radio"
                    id="retired"
                    value="true"
                    {...register('retirement')}
                    checked={retirementValue === true}
                  />
                  <label htmlFor="retired" className="text-sm text-grey100">
                    퇴직
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-[0.81rem] flex flex-col">
              <span className="text-sm font-normal text-grey100">
                설명<span className="pl-1 text-[#2563EB]">*</span>
              </span>
              <textarea
                className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                placeholder="경력 설명"
                {...register('antecedentsDescription', { required: true })}
              />
            </div>
            <button
              type="submit"
              className="mt-4 cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] py-2 text-sm text-[#fff]"
            >
              수정완료
            </button>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <button onClick={() => setIsAdding(true)} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
            추가하기
          </button>
        </div>
      )}
    </div>
  )
}
