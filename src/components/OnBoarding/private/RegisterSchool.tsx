'use client'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { DeleteSchoolData, GetOnBoardingData, PostOneSchoolData, PostSchoolData } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import Link from 'next/link'

export interface SchoolFormInputs {
  id: number
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number
  degreeName: string
}

export default function RegisterSchool() {
  const [educationList, setEducationList] = useState<SchoolFormInputs[]>([])
  const { register, handleSubmit, reset, setValue } = useForm<SchoolFormInputs>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const router = useRouter()
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        console.log(data)
        const educationResponses = data.educationResponses
        if (educationResponses) {
          setEducationList(
            educationResponses.map((school: any) => ({
              id: school.id,
              universityName: school.universityName,
              majorName: school.majorName,
              admissionYear: school.admissionYear,
              graduationYear: school.graduationYear,
              degreeName: school.degreeName,
            })),
          )
        }
      })
    }
  }, [accessToken])

  const onSubmit: SubmitHandler<SchoolFormInputs> = async (data) => {
    const educationData = {
      admissionYear: Number(data.admissionYear), // 숫자로 변환
      graduationYear: Number(data.graduationYear), // 숫자로 변환
      universityName: data.universityName,
      majorName: data.majorName,
      degreeName: data.degreeName,
    }

    const response = await PostOneSchoolData(accessToken, educationData)
    if (response.ok) {
      console.log('학력 정보가 성공적으로 업데이트되었습니다.')
    } else {
      console.log('학력 정보 업데이트 중 에러가 발생했습니다.', response)
    }

    const updatedData = {
      ...data,
      admissionYear: Number(data.admissionYear),
      graduationYear: Number(data.graduationYear),
    }

    if (currentIndex !== null) {
      setEducationList((prev) => prev.map((education, index) => (index === currentIndex ? updatedData : education)))
      setEditingIndex(null)
      setCurrentIndex(null)
    } else {
      setEducationList((prev) => [...prev, updatedData])
    }
    reset()
  }

  const handleEdit = async (index: number) => {
    const education = educationList[index]
    setValue('universityName', education.universityName)
    setValue('majorName', education.majorName)
    setValue('admissionYear', education.admissionYear)
    setValue('graduationYear', education.graduationYear)
    setValue('degreeName', education.degreeName)
    setEditingIndex(index)
    setCurrentIndex(index)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      console.log('id', educationList[index].id)
      const response = await DeleteSchoolData(accessToken, educationList[index].id)
      if (response.ok) {
        setEducationList((prev) => prev.filter((_, i) => i !== index))
        if (index === editingIndex) {
          setEditingIndex(null)
          reset()
        }
      }
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-[#fff] lg:py-[69px]">
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[90%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[90%] flex-col items-start leading-9 sm:w-[55%]">
          <span className="text-2xl font-bold">나의 학력을 등록해 주세요</span>
        </div>

        {educationList.map((education, index) => (
          <div
            key={index}
            className="mt-6 flex w-[90%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6 lg:w-[55%]"
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-semibold">{education.universityName}</span>
                <span className="pt-2 text-sm text-grey60">{education.majorName}</span>
                <span className="text-xs text-grey50">
                  {education.admissionYear} - {education.graduationYear} ({education.degreeName})
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
                      학교명<span className="pl-1 text-[#2563EB]">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="ex. 대학교(원)"
                      className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                      {...register('universityName', { required: true })}
                    />
                  </div>

                  <div className="flex w-[49%] flex-col">
                    <span className="text-sm font-normal text-grey100">
                      전공명<span className="pl-1 text-[#2563EB]">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="ex. 경영학과"
                      className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                      {...register('majorName', { required: true })}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col">
                  <span className="text-sm font-normal text-grey100">
                    재학 기간<span className="pl-1 text-[#2563EB]">*</span>
                  </span>
                  <div className="flex justify-between">
                    <div className="mt-2 flex gap-4">
                      <input
                        className="h-10 w-20 rounded-[0.31rem] border border-grey40 px-5 text-sm"
                        placeholder="입학연도"
                        {...register('admissionYear', { required: true })}
                      />
                      <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
                      <input
                        className="h-10 w-20 rounded-[0.31rem] border border-grey40 px-5 text-sm"
                        placeholder="졸업연도"
                        {...register('graduationYear', { required: true })}
                      />
                      <select
                        className="w-20 rounded-md border border-grey40 text-center text-sm text-grey80"
                        {...register('degreeName', { required: true })}
                      >
                        <option value="재학">재학</option>
                        <option value="졸업">졸업</option>
                      </select>
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
                  학교명<span className="pl-1 text-[#2563EB]">*</span>
                </span>
                <input
                  type="text"
                  placeholder="ex. 대학교(원)"
                  className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                  {...register('universityName', { required: true })}
                />
              </div>

              <div className="flex w-[49%] flex-col">
                <span className="text-sm font-normal text-grey100">
                  전공명<span className="pl-1 text-[#2563EB]">*</span>
                </span>
                <input
                  type="text"
                  placeholder="ex. 경영학과"
                  className="mt-2 rounded-[0.31rem] border border-grey40 px-[0.88rem] py-2 text-sm"
                  {...register('majorName', { required: true })}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col">
              <span className="text-sm font-normal text-grey100">
                재학 기간<span className="pl-1 text-[#2563EB]">*</span>
              </span>
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div className="mt-2 flex gap-4">
                  <input
                    className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                    placeholder="입학연도"
                    {...register('admissionYear', { required: true })}
                  />
                  <Image src="/assets/icons/~.svg" width={8} height={29} alt="~" />
                  <input
                    className="h-10 w-20 rounded-[0.31rem] border border-grey40 text-center text-sm"
                    placeholder="졸업연도"
                    {...register('graduationYear', { required: true })}
                  />
                  <select
                    className="w-20 rounded-md border border-grey40 text-center text-sm text-grey80"
                    {...register('degreeName', { required: true })}
                  >
                    <option value="재학">재학</option>
                    <option value="졸업">졸업</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="cursor-pointer rounded-md bg-[#2563EB] px-[0.88rem] py-2 text-sm text-[#fff] lg:py-0"
                >
                  추가하기
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
          <div className="flex justify-center gap-4 p-2 lg:justify-end lg:pr-96">
            <Link href="/onBoarding/person/role">
              <button className="bg-blue-100 text-blue-700 rounded bg-grey20 px-16 py-2">이전</button>
            </Link>

            <Link href="/onBoarding/person/career">
              <button
                className={`rounded bg-[#2563EB] px-16 
                py-2 text-[#fff] `}
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
