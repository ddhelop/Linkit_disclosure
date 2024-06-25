'use client'
import { PostProfileAward } from '@/lib/action'
import { AwardFormInputs, AwardResponse } from '@/lib/types'
import { selectStyle } from '@/style/toggleStyle'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface MyResumAwardProps {
  data: AwardResponse[]
}

export default function MyAwardComponent({ data }: MyResumAwardProps) {
  const { register, handleSubmit, reset } = useForm<AwardFormInputs>()
  const [isAdding, setIsAdding] = useState(false)
  const [awards, setAwards] = useState<AwardFormInputs[]>([])

  // select style
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = selectStyle
    document.head.append(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // 초기 데이터 설정
  useEffect(() => {
    if (data && data.length > 0) {
      setAwards(data)
    }
  }, [data])

  const onSubmit: SubmitHandler<AwardFormInputs> = async (formData) => {
    const accessToken = localStorage.getItem('accessToken') || ''
    setAwards((prev) => {
      const newAwards = [...prev, formData]

      const response = PostProfileAward(accessToken, newAwards)
      console.log(response)
      return newAwards
    })
    reset()
    setIsAdding(false)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">수상</span>
      </div>

      {/* contents */}
      {awards.length === 0 && !isAdding && <div className="pt-[0.94rem] text-grey50">수상이력이 없습니다.</div>}

      {isAdding ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex w-[49%] flex-col">
                <label className="text-sm font-normal text-grey100">
                  수상내역<span className="pl-1 text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍익대학교 창업경진대회"
                  className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                  {...register('awardsName', { required: true })}
                />
              </div>
              <div className="flex w-[49%] flex-col">
                <label className="text-sm font-normal text-grey100">
                  예: 대상<span className="pl-1 text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 대상"
                  className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                  {...register('ranking', { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <label className="text-sm font-normal text-grey100">
                주관 기관<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 홍익대학교"
                className="mt-2 w-[49%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                {...register('organizer', { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal text-grey100">
                시기<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <div className="flex gap-3">
                <select
                  className="select-with-padding-right mt-2 w-[17%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm text-grey60"
                  {...register('awardsYear', { required: true, valueAsNumber: true })}
                >
                  {[...Array(50).keys()].map((i) => (
                    <option key={i} value={2022 - i}>
                      {2022 - i}년
                    </option>
                  ))}
                </select>
                <select
                  className="select-with-padding-right mt-2 w-[13%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm text-grey60"
                  {...register('awardsMonth', { required: true, valueAsNumber: true })}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}월
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal text-grey100">
                설명<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <textarea
                placeholder=""
                className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                {...register('awardsDescription', { required: true })}
              />
            </div>
            <div className="mt-[0.94rem] flex w-full justify-end gap-2">
              <button
                type="button"
                className="bg-gray-500 h-10 rounded px-4 text-sm text-[#fff]"
                onClick={() => setIsAdding(false)}
              >
                취소
              </button>
              <button type="submit" className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
                저장하기
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {awards.length > 0 && (
        <div className="mt-6">
          {awards.map((award, index) => (
            <div key={index} className="mt-4 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold">{award.awardsName}</span>
                  <span className="pt-2 text-sm text-grey60">{award.organizer}</span>
                  <span className="text-xs text-grey50">
                    {award.awardsYear}년 {award.awardsMonth}월
                  </span>
                  <span className="pt-2 text-sm text-grey60">{award.awardsDescription}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex w-full justify-end">
        <button onClick={() => setIsAdding(true)} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
          추가하기
        </button>
      </div>
    </div>
  )
}
