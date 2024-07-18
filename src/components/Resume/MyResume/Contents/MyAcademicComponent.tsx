'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostSchoolData, DeleteSchoolData, PostOneSchoolData, PutSchoolData } from '@/lib/action'
import { EducationResponse } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm, SubmitHandler, UseFormSetValue } from 'react-hook-form'

interface MyResumEducationProps {
  data: EducationResponse[]
}

interface EducationFormInputs {
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  degreeName: string
}

interface EducationFormData {
  universityName: string
  majorName: string
  admissionYear: number
  graduationYear: number
  degreeName: string
}

export default function MyAcademicComponent({ data }: MyResumEducationProps) {
  const [isEditing, setIsEditing] = useState<boolean | number>(false)
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [educationData, setEducationData] = useState<EducationResponse[]>(data)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EducationFormInputs>()

  const handleAddEducation: SubmitHandler<EducationFormInputs> = async (formData) => {
    const newEducation: EducationFormData = {
      universityName: formData.universityName,
      majorName: formData.majorName,
      admissionYear: parseInt(formData.admissionYear),
      graduationYear: parseInt(formData.graduationYear),
      degreeName: formData.degreeName,
    }

    try {
      const response = await PostOneSchoolData(accessToken, newEducation)
      console.log('response', response)
      if (response.ok) {
        setEducationData([...educationData, { ...newEducation, id: Date.now() }])
        alert('학력이 추가되었습니다.')
        setIsEditing(false)
        reset()
      }
    } catch (error) {
      console.error('Failed to add education', error)
      // 에러 처리 로직을 추가합니다.
    }
  }

  const handleUpdateEducation: SubmitHandler<EducationFormInputs> = async (formData) => {
    if (typeof isEditing !== 'number') return

    const updatedEducation: EducationFormData = {
      universityName: formData.universityName,
      majorName: formData.majorName,
      admissionYear: parseInt(formData.admissionYear),
      graduationYear: parseInt(formData.graduationYear),
      degreeName: formData.degreeName,
    }

    try {
      const response = await PutSchoolData(accessToken, updatedEducation, isEditing)
      if (response.ok) {
        setEducationData(
          educationData.map((education) =>
            education.id === isEditing ? { ...updatedEducation, id: isEditing } : education,
          ),
        )
        alert('학력이 수정되었습니다.')
        setIsEditing(false)
        reset()
      }
    } catch (error) {
      console.error('Failed to update education', error)
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  // 학력 삭제
  const handleDeleteEducation = async (educationId: number) => {
    try {
      if (!window.confirm('학력을 삭제하시겠습니까?')) return
      const response = await DeleteSchoolData(accessToken, educationId)
      if (response.ok) {
        setEducationData(educationData.filter((education) => education.id !== educationId))
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Failed to delete education', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleEditClick = (education: EducationResponse, setValue: UseFormSetValue<EducationFormInputs>) => {
    setIsEditing(education.id)
    setValue('universityName', education.universityName)
    setValue('majorName', education.majorName)
    setValue('admissionYear', education.admissionYear.toString())
    setValue('graduationYear', education.graduationYear.toString())
    setValue('degreeName', education.degreeName)
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">학력</span>
      </div>

      {/* contents */}
      {educationData?.length === 0 ? (
        <div className="pt-[0.94rem] text-grey50">학력사항이 없습니다.</div>
      ) : (
        educationData?.map((education) => (
          <div key={education.id} className="mt-4 rounded-lg border border-grey20 p-[1.25rem]">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold text-grey100">{education.universityName}</div>
                <div className="py-[0.44rem] text-sm text-grey50">{education.majorName}</div>
                <div className="text-xs text-grey50">
                  {education.admissionYear}년 - {education.graduationYear}년 {education.degreeName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/pencil.svg"
                  width={27}
                  height={27}
                  alt="edit"
                  className="cursor-pointer"
                  onClick={() => handleEditClick(education, setValue)}
                />
                <Image
                  src="/assets/icons/delete.svg"
                  width={27}
                  height={27}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={() => handleDeleteEducation(education.id)}
                />
              </div>
            </div>
            {isEditing === education.id && (
              <form
                onSubmit={handleSubmit(handleUpdateEducation)}
                className="mt-4 flex flex-col gap-4 rounded-lg border border-grey40 bg-grey10 p-5"
              >
                <div className="flex gap-[0.81rem]">
                  <div className="flex flex-col">
                    <p className="text-sm font-normal text-grey100">학교명</p>
                    <input
                      type="text"
                      className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                      {...register('universityName', { required: '학교명을 입력해주세요' })}
                    />
                    {errors.universityName && <p className="text-red-500">{errors.universityName.message}</p>}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm font-normal text-grey100">전공명</p>
                    <input
                      type="text"
                      className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                      {...register('majorName', { required: '전공명을 입력해주세요' })}
                    />
                    {errors.majorName && <p className="text-red-500">{errors.majorName.message}</p>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-normal text-grey100">재학 기간</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="YYYY"
                      className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                      {...register('admissionYear', { required: '입학년도를 입력해주세요' })}
                    />
                    <p>~</p>
                    <input
                      type="text"
                      placeholder="YYYY"
                      className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                      {...register('graduationYear', { required: '졸업년도를 입력해주세요' })}
                    />
                    <select
                      className="mt-1 w-[4.8rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                      {...register('degreeName')}
                    >
                      <option value="재학">재학</option>
                      <option value="졸업">졸업</option>
                      <option value="휴학">휴학</option>
                    </select>
                  </div>
                </div>
                <div className="mt-[0.94rem] flex w-full justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                    }}
                    className="rounded bg-grey30 px-4 text-sm"
                  >
                    취소하기
                  </button>
                  <button type="submit" className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
                    수정하기
                  </button>
                </div>
              </form>
            )}
          </div>
        ))
      )}

      {/* 추가하기 모드 */}
      {isEditing === true && (
        <form
          onSubmit={handleSubmit(handleAddEducation)}
          className="mt-4 flex flex-col gap-4 rounded-lg border border-grey40 bg-grey10 p-5"
        >
          <div className="flex gap-[0.81rem]">
            <div className="flex flex-col">
              <p className="text-sm font-normal text-grey100">학교명</p>
              <input
                type="text"
                className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                {...register('universityName', { required: '학교명을 입력해주세요' })}
              />
              {errors.universityName && <p className="text-red-500">{errors.universityName.message}</p>}
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-normal text-grey100">전공명</p>
              <input
                type="text"
                className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                {...register('majorName', { required: '전공명을 입력해주세요' })}
              />
              {errors.majorName && <p className="text-red-500">{errors.majorName.message}</p>}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-normal text-grey100">재학 기간</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="YYYY"
                className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                {...register('admissionYear', { required: '입학년도를 입력해주세요' })}
              />
              <p>~</p>
              <input
                type="text"
                placeholder="YYYY"
                className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                {...register('graduationYear', { required: '졸업년도를 입력해주세요' })}
              />
              <select
                className="mt-1 w-[4.8rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                {...register('degreeName')}
              >
                <option value="재학">재학</option>
                <option value="졸업">졸업</option>
                <option value="휴학">휴학</option>
              </select>
            </div>
          </div>
          <div className="mt-[0.94rem] flex w-full justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
              }}
              className="rounded bg-grey30 px-4 text-sm"
            >
              취소하기
            </button>
            <button type="submit" className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
              추가하기
            </button>
          </div>
        </form>
      )}

      {/* button */}
      {!isEditing && (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <button
            onClick={() => {
              setIsEditing(true)
            }}
            className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]"
          >
            추가하기
          </button>
        </div>
      )}
    </div>
  )
}
