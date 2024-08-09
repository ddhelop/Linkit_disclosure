// RegisterSchool.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import { DeleteSchoolData, GetOnBoardingData, PostOneSchoolData } from '@/lib/action'
import { accessTokenState } from '@/context/recoil-context'
import OnBoardingHeader from '../OnBoardingHeader'
import { EducationForm, SchoolFormInputs } from '@/components/common/component/onBoarding/EducationForm'
import { EducationItem } from '@/components/common/component/onBoarding/EducationItem'
import { SubmitHandler } from 'react-hook-form'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

export default function RegisterSchool() {
  const [educationList, setEducationList] = useState<SchoolFormInputs[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const accessToken = useRecoilValue(accessTokenState) || ''

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 온보딩 데이터 fetch
  useEffect(() => {
    if (accessToken) {
      GetOnBoardingData(accessToken).then((data) => {
        const educationResponses = data.educationResponses
        if (educationResponses) {
          setEducationList(
            educationResponses.map((school: any) => ({
              id: school.id,
              universityName: school.universityName,
              majorName: school.majorName,
              admissionYear: school.admissionYear,
              graduationYear: school.graduationYear ?? null,
              degreeName: school.degreeName,
            })),
          )
        }
      })
    }
  }, [accessToken])

  const handleFormSubmit: SubmitHandler<SchoolFormInputs> = async (data) => {
    const educationData = {
      admissionYear: Number(data.admissionYear),
      graduationYear: Number(data.graduationYear),
      universityName: data.universityName,
      majorName: data.majorName,
      degreeName: data.degreeName,
    }

    const response = await PostOneSchoolData(accessToken, educationData)
    if (response.ok) {
      pushNotification('학력 정보가 성공적으로 등록되었습니다.', 'success')
    } else {
      pushNotification('학력 정보 등록에 실패했습니다.', 'error')
    }

    const updatedData = {
      ...data,
      admissionYear: Number(data.admissionYear),
      graduationYear: data.degreeName === '재학' ? null : Number(data.graduationYear),
    }

    if (currentIndex !== null) {
      setEducationList((prev) => prev.map((education, index) => (index === currentIndex ? updatedData : education)))
      setEditingIndex(null)
      setCurrentIndex(null)
    } else {
      setEducationList((prev) => [...prev, updatedData])
    }
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setCurrentIndex(index)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await DeleteSchoolData(accessToken, educationList[index].id!)
      if (response.ok) {
        setEducationList((prev) => prev.filter((_, i) => i !== index))
        if (index === editingIndex) {
          setEditingIndex(null)
        }
        pushNotification('학력 정보가 성공적으로 삭제되었습니다.', 'success')
      }
    }
  }

  const handleCancel = () => {
    // Logic to close the form when cancel is clicked
    setEditingIndex(null)
    setCurrentIndex(null)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-screen flex-col bg-[#fff] pt-6 lg:py-[69px]">
      <OnBoardingHeader percentage={55} />
      <div className="flex flex-grow flex-col items-center px-4 py-16">
        <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60 md:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-full flex-col items-start leading-9 md:w-[55%]">
          <span className="text-2xl font-bold">나의 학력을 등록해 주세요</span>
        </div>

        {educationList.map((education, index) => (
          <div key={index} className="flex w-full flex-col items-center">
            <EducationItem
              education={education}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
              isEditing={editingIndex === index}
            />
            {editingIndex === index && (
              <EducationForm
                defaultValues={education}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
                isEditMode={true}
                className="md:w-[55%]" // Pass the className prop correctly
              />
            )}
          </div>
        ))}

        {editingIndex === null && (
          <EducationForm
            defaultValues={{
              universityName: '',
              majorName: '',
              admissionYear: new Date().getFullYear(),
              graduationYear: null,
              degreeName: '졸업',
            }}
            onSubmit={handleFormSubmit}
            onCancel={() => {}}
            isEditMode={false}
            className="md:w-[55%]" // Ensure className is passed here as well
          />
        )}

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-soft-shadow">
          <div className="flex justify-center gap-4 p-2 lg:justify-end lg:pr-96">
            <Link href="/onBoarding/person/role">
              <button className="rounded bg-grey20 px-16 py-2 text-blue-700">이전</button>
            </Link>

            <Link href="/onBoarding/person/career">
              <button className="rounded bg-[#2563EB] px-16 py-2 text-[#fff]">다음</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
