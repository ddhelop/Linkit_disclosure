'use client'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState, careerListState } from '@/context/recoil-context'
import { PostAntecedentData } from '@/lib/action'
import { useRouter } from 'next/navigation'

interface FormInputs {
  projectName: string
  projectRole: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  retirement: boolean
}

export default function RegisterCareer() {
  const [careerList, setCareerList] = useRecoilState(careerListState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

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
      setCareerList((prev) => prev.map((career, index) => (index === editingIndex ? formattedData : career)))
      setEditingIndex(null)
    } else {
      setCareerList((prev) => [...prev, formattedData])
    }
    reset()
  }

  const handleEdit = (index: number) => {
    const career = careerList[index]
    setValue('projectName', career.projectName)
    setValue('projectRole', career.projectRole)
    setValue('startYear', career.startYear)
    setValue('startMonth', career.startMonth)
    setValue('endYear', career.endYear)
    setValue('endMonth', career.endMonth)
    setValue('retirement', career.retirement)
    setEditingIndex(index)
  }

  const handleDelete = (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setCareerList((prev) => prev.filter((_, i) => i !== index))
      if (index === editingIndex) {
        setEditingIndex(null)
        reset()
      }
    }
  }

  const handleSave = async () => {
    console.log('careerList', careerList)
    if (accessToken) {
      const response = await PostAntecedentData(accessToken, careerList)

      if (response.ok) {
        router.push('/onBoarding/person/profile')
      }
    }
  }

  const onClickPrev = async () => {
    if (accessToken && careerList.length > 0) {
      if (accessToken) {
        const response = await PostAntecedentData(accessToken, careerList)
        if (response.ok) {
          router.push('/onBoarding/person/school')
        }
      }
    } else {
      router.push('/onBoarding/person/school')
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex flex-col bg-[#FCFCFD] py-[69px]">
      <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
          <span className="text-2xl font-bold">나의 경력을 등록해주세요</span>
        </div>

        {careerList.map((career, index) => (
          <div key={index} className="mt-6 flex w-[55%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">{career.projectName}</span>
                <span className="pt-2 text-sm text-grey60">{career.projectRole}</span>
                <span className="text-xs text-grey50">
                  {career.startYear}.{career.startMonth} - {career.endYear}.{career.endMonth} (
                  {career.retirement ? '퇴직' : '재직중'})
                </span>
              </div>
              <div className="flex items-center justify-end">
                <Image
                  src="/assets/icons/pencil.svg"
                  width={27}
                  height={27}
                  alt="edit"
                  className="cursor-pointer"
                  onClick={() => handleEdit(index)}
                />
                <Image
                  src="/assets/icons/delete.svg"
                  width={27}
                  height={27}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
            {editingIndex === index && (
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
                      <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
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
                    <button
                      type="submit"
                      className="cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] text-sm text-[#fff]"
                    >
                      수정하기
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        ))}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-[55%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6"
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
                <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
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
                추가하기
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
          <div className="flex justify-end p-4 pr-96">
            <button onClick={onClickPrev} className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">
              이전
            </button>

            <button
              onClick={handleSave}
              className={`mr-4 rounded px-16 py-2 ${
                careerList.length > 0 ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
              }`}
              disabled={careerList.length === 0}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
