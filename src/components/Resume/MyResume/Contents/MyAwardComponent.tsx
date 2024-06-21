import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInputs {
  awardName: string
  ranking: string
  organizer: string
  year: number
  description: string
}

export default function MyAwardComponent() {
  const { register, handleSubmit, reset } = useForm<FormInputs>()
  const [isAdding, setIsAdding] = useState(false)
  const [awards, setAwards] = useState<FormInputs[]>([])

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setAwards((prev) => [...prev, data])
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
                  {...register('awardName', { required: true })}
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
              <select
                className="mt-2 w-[14%] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm text-grey60"
                {...register('year', { required: true })}
              >
                {[...Array(50).keys()].map((i) => (
                  <option key={i} value={2022 - i}>
                    {2022 - i}년
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-normal text-grey100">
                설명<span className="pl-1 text-[#2563EB]">*</span>
              </label>
              <textarea
                placeholder=""
                className="mt-2 rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-sm"
                {...register('description', { required: true })}
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
      ) : (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <button onClick={() => setIsAdding(true)} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
            추가하기
          </button>
        </div>
      )}

      {awards.length > 0 && (
        <div className="mt-6">
          {awards.map((award, index) => (
            <div key={index} className="mt-4 flex flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold">{award.awardName}</span>
                  <span className="pt-2 text-sm text-grey60">{award.organizer}</span>
                  <span className="text-xs text-grey50">{award.year}년</span>
                  <span className="pt-2 text-sm text-grey60">{award.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
