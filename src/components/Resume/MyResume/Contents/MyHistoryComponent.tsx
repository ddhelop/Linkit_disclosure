'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInputs {
  companyName: string
  position: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  retirement: boolean
}

export default function MyHistoryComponent() {
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>()
  const [histories, setHistories] = useState<FormInputs[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const formattedData = {
      ...data,
      startYear: Number(data.startYear),
      startMonth: Number(data.startMonth),
      endYear: Number(data.endYear),
      endMonth: Number(data.endMonth),
      retirement: data.retirement === true,
    }

    if (editingIndex !== null) {
      setHistories((prev) => prev.map((history, index) => (index === editingIndex ? formattedData : history)))
      setEditingIndex(null)
    } else {
      setHistories((prev) => [...prev, formattedData])
    }
    reset()
    setIsAdding(false)
  }

  const handleEdit = (index: number) => {
    const history = histories[index]
    setValue('companyName', history.companyName)
    setValue('position', history.position)
    setValue('startYear', history.startYear)
    setValue('startMonth', history.startMonth)
    setValue('endYear', history.endYear)
    setValue('endMonth', history.endMonth)
    setValue('retirement', history.retirement)
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleDelete = (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setHistories((prev) => prev.filter((_, i) => i !== index))
      if (index === editingIndex) {
        setEditingIndex(null)
        reset()
        setIsAdding(false)
      }
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">이력</span>
      </div>

      {/* contents */}
      {histories.length === 0 && !isAdding && <div className="pt-[0.94rem] text-grey50">이력이 없습니다.</div>}

      {histories.map((history, index) => (
        <div key={index} className="mt-6 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">{history.position}</span>
              <span className="pt-2 text-sm text-grey60">{history.companyName}</span>
              <span className="text-xs text-grey50">
                {history.startYear}.{history.startMonth} - {history.endYear}.{history.endMonth} (
                {history.retirement ? '퇴직' : '재직중'})
              </span>
            </div>
            <div className="flex items-center justify-end">
              <button onClick={() => handleEdit(index)} className="text-blue-500 mr-2 cursor-pointer">
                수정
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-500 cursor-pointer">
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}

      {isAdding && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6"
        >
          <div className="flex gap-3">
            <div className="flex w-[49%] flex-col">
              <span className="text-sm font-normal text-grey100">
                회사명<span className="pl-1 text-[#2563EB]">*</span>
              </span>
              <input
                type="text"
                placeholder="ex. (주)링킷"
                className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                {...register('companyName', { required: true })}
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
                {...register('position', { required: true })}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col">
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
                  <option value="1">1월</option>
                  <option value="2">2월</option>
                  <option value="3">3월</option>
                  <option value="4">4월</option>
                  <option value="5">5월</option>
                  <option value="6">6월</option>
                  <option value="7">7월</option>
                  <option value="8">8월</option>
                  <option value="9">9월</option>
                  <option value="10">10월</option>
                  <option value="11">11월</option>
                  <option value="12">12월</option>
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
                  <option value="1">1월</option>
                  <option value="2">2월</option>
                  <option value="3">3월</option>
                  <option value="4">4월</option>
                  <option value="5">5월</option>
                  <option value="6">6월</option>
                  <option value="7">7월</option>
                  <option value="8">8월</option>
                  <option value="9">9월</option>
                  <option value="10">10월</option>
                  <option value="11">11월</option>
                  <option value="12">12월</option>
                </select>

                {/* input radio 재직중 */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="current"
                    value="false"
                    className="mr-2"
                    {...register('retirement', { required: true })}
                  />
                  <label htmlFor="current" className="text-sm text-grey100">
                    재직중
                  </label>

                  {/* radio 퇴직 */}
                  <input
                    type="radio"
                    id="retired"
                    value="true"
                    className="ml-4 mr-2"
                    {...register('retirement', { required: true })}
                  />
                  <label htmlFor="retired" className="text-sm text-grey100">
                    퇴직
                  </label>
                </div>
              </div>
              <button type="submit" className="cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] text-sm text-[#fff]">
                수정완료
              </button>
            </div>
          </div>
        </form>
      )}

      {/* button */}
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
