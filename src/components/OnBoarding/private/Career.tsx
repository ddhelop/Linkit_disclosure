'use client'
import Image from 'next/image'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import {
  DeleteAntecedentData,
  GetOnBoardingData,
  PostAntecedentData,
  PostOneAntecedentData,
  PutAntecedentData,
} from '@/lib/action'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import OnBoardingHeader from '../OnBoardingHeader'
import { OnBoardingCareer, OnBoardingCareerFormInputs } from '@/lib/types'
import { accessTokenState } from '@/context/recoil-context'

export default function RegisterCareer() {
  const [careerList, setCareerList] = useState<OnBoardingCareer[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''
  const { register, handleSubmit, reset, setValue, watch, control } = useForm<OnBoardingCareerFormInputs>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const retirement = useWatch({ control, name: 'retirement' })

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
              retirement: career.retirement,
            })),
          )
        }
      })
    }
  }, [accessToken])

  const onSubmit: SubmitHandler<OnBoardingCareerFormInputs> = async (data) => {
    const antecedentData = {
      projectName: data.projectName,
      projectRole: data.projectRole,
      startDate: formatDate(data.startDate),
      endDate: data.retirement === false ? formatDate(data.endDate) : '',
      retirement: data.retirement === false,
    }

    let response
    if (editingIndex !== null) {
      const id = careerList[editingIndex].id
      response = await PutAntecedentData(accessToken, antecedentData, id)
      if (response.ok) {
        setCareerList((prev) =>
          prev.map((career, index) => (index === editingIndex ? { ...antecedentData, id: career.id } : career)),
        )
        setEditingIndex(null)
      }
    } else {
      response = await PostOneAntecedentData(accessToken, antecedentData)
      if (response.ok) {
        setCareerList((prev) => [...prev, { ...antecedentData, id: Date.now() }])
      }
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
    setValue('endDate', career.endDate || '')
    setValue('retirement', career.retirement ? true : false)
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
    }
  }

  const handleSave = async () => {
    if (accessToken && careerList.length > 0) {
      const formattedCareerList = careerList.map((career) => ({
        ...career,
        startDate: formatDate(career.startDate),
        endDate: career.retirement === 'true' ? formatDate(career.endDate || '') : '',
        retirement: career.retirement === 'true',
      }))
      const response = await PostAntecedentData(accessToken, formattedCareerList)

      if (response.ok) {
        router.push('/onBoarding/person/profile')
      }
    } else {
      router.push('/onBoarding/person/profile')
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
                  {career.startDate} - {career.endDate || '현재'} ({career.retirement ? '종료' : '재직중'})
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
                      placeholder="(주)링킷"
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
                      placeholder="Product Manager"
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
                        {...register('endDate', { required: retirement !== false })}
                        disabled={retirement === 'false'}
                      />

                      {/* Select 박스 재직중/종료 */}

                      <div className="flex items-center ">
                        <select
                          {...register('retirement', { required: true })}
                          className=" h-10 rounded-[0.31rem] border border-grey40 px-[0.88rem] text-sm"
                        >
                          <option value="true">종료</option>
                          <option value="false">재직중</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-end justify-end gap-2">
                      <button
                        type="button"
                        className="h-10 cursor-pointer rounded-md bg-grey20 px-[0.88rem] text-sm text-grey100"
                        onClick={() => {
                          setEditingIndex(null)
                          reset()
                        }}
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="h-10 cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] text-sm text-[#fff]"
                      >
                        수정하기
                      </button>
                    </div>
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
                  placeholder="(주)링킷"
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
                  placeholder="Product Manager"
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
                      {...register('endDate', { required: retirement !== 'false' })}
                      disabled={retirement === 'false'}
                    />
                  </div>

                  {/* Select 박스 재직중/종료 */}
                  <div className="items-center pt-3 lg:flex lg:pt-0">
                    <div className="flex items-center">
                      <select
                        {...register('retirement', { required: true })}
                        className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                      >
                        <option value="true">종료</option>
                        <option value="false">진행중</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] py-2 text-sm text-[#fff] lg:mt-0"
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
              <button onClick={handleSave} className={`rounded bg-[#2563EB] px-16 py-2 text-[#fff]`}>
                다음
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
