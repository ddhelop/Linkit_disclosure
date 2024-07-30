'use client'

import { accessTokenState } from '@/context/recoil-context'
import { DeleteSchoolData, PostOneSchoolData, PutSchoolData } from '@/lib/action'
import { EducationFormData, EducationFormInputs, EducationResponse, MyResumEducationProps } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm, FormProvider, UseFormSetValue, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/common/Button'
import { EducationForm } from '../Component/EducationForm'

export default function MyAcademicComponent({ data }: MyResumEducationProps) {
  const [isEditing, setIsEditing] = useState<boolean | number>(false)
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [educationData, setEducationData] = useState<EducationResponse[]>(data)
  const methods = useForm<EducationFormInputs>()

  const handleAddEducation: SubmitHandler<EducationFormInputs> = async (formData) => {
    const newEducation: EducationFormData = {
      universityName: formData.universityName,
      majorName: formData.majorName,
      admissionYear: parseInt(formData.admissionYear),
      graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : null,
      degreeName: formData.degreeName,
    }

    try {
      const response = await PostOneSchoolData(accessToken, newEducation)

      if (response.ok) {
        setEducationData([...educationData, { ...newEducation, id: Date.now() }])
        alert('학력이 추가되었습니다.')
        setIsEditing(false)
        methods.reset()
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
      graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : null,
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
        methods.reset()
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
    setValue('graduationYear', education.graduationYear ? education.graduationYear.toString() : '')
    setValue('degreeName', education.degreeName)
  }

  useEffect(() => {
    if (typeof isEditing === 'number') {
      const education = educationData.find((edu) => edu.id === isEditing)
      if (education) {
        methods.setValue('universityName', education.universityName)
        methods.setValue('majorName', education.majorName)
        methods.setValue('admissionYear', education.admissionYear.toString())
        methods.setValue('graduationYear', education.graduationYear ? education.graduationYear.toString() : '')
        methods.setValue('degreeName', education.degreeName)
      }
    }
  }, [isEditing, educationData, methods])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">학력</span>
      </div>

      {/* contents */}
      {!educationData ? (
        <div className="pt-[0.94rem] text-grey50">학력사항이 없습니다.</div>
      ) : (
        educationData?.map((education) => (
          <div key={education.id} className="mt-4 rounded-lg border border-grey20 p-[1.25rem]">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold text-grey100">{education.universityName}</div>
                <div className="py-[0.44rem] text-sm text-grey50">{education.majorName}</div>
                <div className="text-xs text-grey50">
                  {education.admissionYear}년 - {education.graduationYear ? `${education.graduationYear}년` : ''}{' '}
                  {education.degreeName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/pencil.svg"
                  width={27}
                  height={27}
                  alt="edit"
                  className="cursor-pointer"
                  onClick={() => handleEditClick(education, methods.setValue)}
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
              <FormProvider {...methods}>
                <EducationForm
                  onSubmit={handleUpdateEducation}
                  onCancel={() => {
                    setIsEditing(false)
                    methods.reset()
                  }}
                  defaultValues={{
                    universityName: education.universityName,
                    majorName: education.majorName,
                    admissionYear: education.admissionYear.toString(),
                    graduationYear: education.graduationYear ? education.graduationYear.toString() : '',
                    degreeName: education.degreeName,
                  }}
                  isEditing={true}
                />
              </FormProvider>
            )}
          </div>
        ))
      )}

      {isEditing === true && (
        <FormProvider {...methods}>
          <EducationForm
            onSubmit={handleAddEducation}
            onCancel={() => {
              setIsEditing(false)
              methods.reset()
            }}
            defaultValues={{
              universityName: '',
              majorName: '',
              admissionYear: '',
              graduationYear: '',
              degreeName: '',
            }}
            isEditing={false}
          />
        </FormProvider>
      )}

      {/* button */}
      {!isEditing && (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <Button
            animationMode="main"
            onClick={() => {
              setIsEditing(true)
              methods.reset({
                universityName: '',
                majorName: '',
                admissionYear: '',
                graduationYear: '',
                degreeName: '졸업',
              })
            }}
          >
            추가하기
          </Button>
        </div>
      )}
    </div>
  )
}
