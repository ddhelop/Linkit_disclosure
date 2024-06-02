'use client'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState, educationListState } from '@/context/recoil-context'
import { PostSchoolData } from '@/lib/action'
import { useRouter } from 'next/navigation'

interface FormInputs {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number
  degreeName: string
}

export default function RegisterSchool() {
  const [educationList, setEducationList] = useRecoilState(educationListState)
  const { register, handleSubmit, reset, setValue } = useForm<FormInputs>()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const updatedData = {
      ...data,
      admissionYear: Number(data.admissionYear),
      graduationYear: Number(data.graduationYear),
    }

    if (editingIndex !== null) {
      setEducationList((prev) => prev.map((education, index) => (index === editingIndex ? updatedData : education)))
      setEditingIndex(null)
    } else {
      setEducationList((prev) => [...prev, updatedData])
    }
    reset()
  }

  const handleEdit = (index: number) => {
    const education = educationList[index]
    setValue('universityName', education.universityName)
    setValue('majorName', education.majorName)
    setValue('admissionYear', education.admissionYear)
    setValue('graduationYear', education.graduationYear)
    setValue('degreeName', education.degreeName)
    setEditingIndex(index)
  }

  const handleDelete = (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setEducationList((prev) => prev.filter((_, i) => i !== index))
      if (index === editingIndex) {
        setEditingIndex(null)
        reset()
      }
    }
  }

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const response = await PostSchoolData(accessToken, educationList)

      if (response.ok) {
        router.push('/onBoarding/person/career')
      }
    }
  }

  const onClickPrev = async () => {
    if (accessToken && educationList.length > 0) {
      if (accessToken) {
        const response = await PostSchoolData(accessToken, educationList)
        if (response.ok) {
          router.push('/onBoarding/person/role')
        }
      }
    } else {
      router.push('/onBoarding/person/role')
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-full flex-col bg-[#FCFCFD] py-[69px]">
      <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
      <div className="flex flex-grow flex-col items-center py-16">
        <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
          <span className="text-2xl font-bold">학교 이력을 등록해주세요</span>
        </div>

        {educationList.map((education, index) => (
          <div key={index} className="mt-6 flex w-[55%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6">
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
                        <option value="재학 중">재학 중</option>
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-[55%] flex-col rounded-[0.63rem] border border-grey30 px-5 py-6"
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
                  <option value="재학 중">재학 중</option>
                  <option value="졸업">졸업</option>
                </select>
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
                educationList.length > 0 ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
              }`}
              disabled={educationList.length === 0}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
