'use client'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import {
  DeleteAntecedentData,
  DeleteSchoolData,
  GetOnBoardingData,
  PostAntecedentData,
  PostOneAntecedentData,
} from '@/lib/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OnBoardingHeader from '../OnBoardingHeader'

interface FormInputs {
  id: number
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean
}

interface Career {
  id: number
  projectName: string
  projectRole: string
  startDate: string
  endDate: string
  retirement: boolean
}

export default function RegisterCareer() {
  const [careerList, setCareerList] = useState<Career[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 이전에 입력한 경력 데이터 불러오기
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        const antecedentsResponses = data.antecedentsResponses
        if (antecedentsResponses) {
          setCareerList(
            antecedentsResponses.map((career: any) => ({
              id: career.id,
              projectName: career.projectName,
              projectRole: career.projectRole,
              startDate: career.startDate,
              endDate: career.endDate,
              // antecedentsDescription: career.antecedentsDescription,
            })),
          )
        }
      })
    }
  }, [accessToken])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const antecedentData = {
      projectName: data.projectName,
      projectRole: data.projectRole,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      retirement: data.retirement === true,
      // antecedentsDescription: '경력 설명입니다.',
    }

    const response = await PostOneAntecedentData(accessToken, antecedentData)

    if (response.ok) {
    } else {
    }

    const updatedData = {
      ...data,
      startDate: data.startDate,
      endDate: data.endDate,
      retirement: data.retirement === true,
      // antecedentsDescription: '경력 설명입니다.',
    }

    if (editingIndex !== null) {
      setCareerList((prev) => prev.map((career, index) => (index === editingIndex ? updatedData : career)))
      setEditingIndex(null)
    } else {
      setCareerList((prev) => [...prev, updatedData])
    }
    reset()
  }

  const formatDate = (date: string): string => {
    const [year, month] = date.split('.')
    return `${year}.${month.padStart(2, '0')}`
  }

  const handleEdit = (index: number) => {
    const career = careerList[index]
    setValue('projectName', career.projectName)
    setValue('projectRole', career.projectRole)
    setValue('startDate', career.startDate)
    setValue('endDate', career.endDate)
    setValue('retirement', career.retirement)
    setEditingIndex(index)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await DeleteAntecedentData(accessToken, careerList[index].id)
      if (response.ok) {
        setCareerList((prev) => prev.filter((_, i) => i !== index))
        if (index === editingIndex) {
          setEditingIndex(null)
          reset()
        }
      }

      setCareerList((prev) => prev.filter((_, i) => i !== index))
      if (index === editingIndex) {
        setEditingIndex(null)
        reset()
      }
    }
  }

  const handleSave = async () => {
    if (accessToken && careerList.length > 0) {
      const formattedCareerList = careerList.map((career) => ({
        ...career,
        startDate: formatDate(career.startDate),
        endDate: formatDate(career.endDate),
      }))
      const response = await PostAntecedentData(accessToken, formattedCareerList)

      if (response.ok) {
        router.push('/onBoarding/person/profile')
      }
    } else {
      router.push('/onBoarding/person/profile')
    }
  }

  const onClickPrev = async () => {
    if (accessToken && careerList.length > 0) {
      const formattedCareerList = careerList.map((career) => ({
        ...career,
        startDate: formatDate(career.startDate),
        endDate: formatDate(career.endDate),
      }))
      const response = await PostAntecedentData(accessToken, formattedCareerList)
      if (response.ok) {
        router.push('/onBoarding/person/school')
      } else {
        alert('에러가 발생했습니다.')
      }
    } else {
      router.push('/onBoarding/person/school')
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-[#fff] lg:py-[69px]">
      <OnBoardingHeader percentage={66} />
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 lg:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[90%] flex-col items-start leading-9 lg:w-[55%]">
          <span className="text-2xl font-bold">나의 경력을 등록해주세요</span>
        </div>

        {careerList.map((career, index) => (
          <div
            key={index}
            className="mt-6 flex w-[90%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6 lg:w-[55%]"
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">{career.projectName}</span>
                <span className="pt-2 text-sm text-grey60">{career.projectRole}</span>
                <span className="text-xs text-grey50">
                  {career.startDate} - {career.endDate} ({career.retirement ? '퇴직' : '재직중'})
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
                  <div className="flex flex-col justify-between lg:flex-row">
                    <div className="mt-2 flex gap-2 ">
                      <input
                        className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                        placeholder="YYYY.MM"
                        {...register('startDate', { required: true })}
                      />

                      <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
                      <input
                        className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                        placeholder="YYYY.MM"
                        {...register('endDate', { required: true })}
                      />

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

        {editingIndex === null && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex w-[90%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6 lg:w-[55%]"
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
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div className="mt-2 flex gap-2">
                    <input
                      className="h-10 w-28 rounded-[0.31rem] border border-grey40 text-center text-sm"
                      placeholder="YYYY.MM"
                      {...register('startDate', { required: true })}
                    />

                    <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
                    <input
                      className="h-10 w-28 rounded-[0.31rem] border border-grey40 text-center text-sm"
                      placeholder="YYYY.MM"
                      {...register('endDate', { required: true })}
                    />
                  </div>

                  {/* input radio 재직중 */}
                  <div className="lg: flex items-center pt-3 lg:pt-0">
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
                  className="mt-3 cursor-pointer  rounded-md bg-[#2563EB] px-[0.88rem] py-2 text-sm text-[#fff] lg:mt-0"
                >
                  추가하기
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-soft-shadow">
          <div className="flex justify-center gap-4 p-2 lg:justify-end lg:pr-96">
            <Link href="/onBoarding/person/school">
              <button className="rounded bg-grey20 px-16 py-2 text-blue-700">이전</button>
            </Link>

            <Link href="/onBoarding/person/profile">
              <button
                onClick={handleSave}
                className={` 
                rounded bg-[#2563EB] px-16 py-2 text-[#fff]`}
              >
                다음
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
