'use client'

import { accessTokenState } from '@/context/recoil-context'
import { DeleteSchoolData, PostOneSchoolData, PutSchoolData } from '@/lib/action'
import { EducationFormData, EducationResponse, MyResumEducationProps } from '@/lib/types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/common/Button'

import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'
import EducationForm, { SchoolFormInputs } from '@/components/common/component/onBoarding/EducationForm'

export default function MyAcademicComponent({ data }: MyResumEducationProps) {
  const [isEditing, setIsEditing] = useState<boolean | number>(false)
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [educationData, setEducationData] = useState<EducationResponse[]>(data)
  const methods = useForm<SchoolFormInputs>()

  const handleAddEducation: SubmitHandler<SchoolFormInputs> = async (formData) => {
    const newEducation: EducationFormData = {
      universityName: formData.universityName,
      majorName: formData.majorName,
      admissionYear: formData.admissionYear,
      graduationYear: formData.graduationYear || null,
      degreeName: formData.degreeName,
    }

    try {
      const response = await PostOneSchoolData(accessToken, newEducation)

      if (response.ok) {
        setEducationData([...educationData, { ...newEducation, id: Date.now() }])
        pushNotification('학력이 추가되었습니다.', 'success')
        setIsEditing(false)
        methods.reset()
      }
    } catch (error) {
      console.error('Failed to add education', error)
    }
  }

  const handleUpdateEducation: SubmitHandler<SchoolFormInputs> = async (formData) => {
    if (typeof isEditing !== 'number') return

    const updatedEducation: EducationFormData = {
      universityName: formData.universityName,
      majorName: formData.majorName,
      admissionYear: formData.admissionYear,
      graduationYear: formData.graduationYear || null,
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
        pushNotification('학력이 수정되었습니다.', 'success')
        setIsEditing(false)
        methods.reset()
      }
    } catch (error) {
      console.error('Failed to update education', error)
      pushNotification('수정 중 오류가 발생했습니다.', 'error')
    }
  }

  const handleDeleteEducation = async (educationId: number) => {
    try {
      if (!window.confirm('학력을 삭제하시겠습니까?')) return
      const response = await DeleteSchoolData(accessToken, educationId)
      if (response.ok) {
        setEducationData(educationData.filter((education) => education.id !== educationId))
      } else {
        pushNotification('삭제에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('Failed to delete education', error)
      pushNotification('삭제 중 오류가 발생했습니다.', 'error')
    }
  }

  const handleEditClick = (education: EducationResponse) => {
    setIsEditing(education.id)
    methods.setValue('universityName', education.universityName)
    methods.setValue('majorName', education.majorName)
    methods.setValue('admissionYear', education.admissionYear)
    methods.setValue('graduationYear', education.graduationYear || null)
    methods.setValue('degreeName', education.degreeName)
  }

  useEffect(() => {
    if (typeof isEditing === 'number') {
      const education = educationData.find((edu) => edu.id === isEditing)
      if (education) {
        methods.setValue('universityName', education.universityName)
        methods.setValue('majorName', education.majorName)
        methods.setValue('admissionYear', education.admissionYear)
        methods.setValue('graduationYear', education.graduationYear || null)
        methods.setValue('degreeName', education.degreeName)
      }
    }
  }, [isEditing, educationData, methods])

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">학력</span>
      </div>

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
                  onClick={() => handleEditClick(education)}
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
                    admissionYear: education.admissionYear,
                    graduationYear: education.graduationYear || null,
                    degreeName: education.degreeName,
                  }}
                  isEditMode={true}
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
              admissionYear: 0,
              graduationYear: null,
              degreeName: '졸업',
            }}
            isEditMode={false}
          />
        </FormProvider>
      )}

      {!isEditing && (
        <div className="mt-[0.94rem] flex w-full justify-end">
          <Button
            animationMode="main"
            onClick={() => {
              setIsEditing(true)
              methods.reset({
                universityName: '',
                majorName: '',
                admissionYear: 0,
                graduationYear: null,
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
