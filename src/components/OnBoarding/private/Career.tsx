// RegisterCareer.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import {
  DeleteAntecedentData,
  GetOnBoardingData,
  PostAntecedentData,
  PostOneAntecedentData,
  PutAntecedentData,
} from '@/lib/action'
import { useRouter } from 'next/navigation'
import { OnBoardingCareer, OnBoardingCareerFormInputs } from '@/lib/types'
import { accessTokenState } from '@/context/recoil-context'
import OnBoardingHeader from '../OnBoardingHeader'

import { SubmitHandler } from 'react-hook-form'
import CareerItem from '@/components/common/component/onBoarding/CareerItem'
import CareerForm from '@/components/common/component/onBoarding/CareerForm'

export default function RegisterCareer() {
  const [careerList, setCareerList] = useState<OnBoardingCareer[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch previously entered career data
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

  const handleFormSubmit: SubmitHandler<OnBoardingCareerFormInputs> = async (data) => {
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
  }

  const formatDate = (date: string): string => {
    const [year, month] = date.split('.')
    return `${year}.${month.padStart(2, '0')}`
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
  }

  const handleDelete = async (index: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await DeleteAntecedentData(accessToken, careerList[index].id)
      if (response.ok) {
        setCareerList((prev) => prev.filter((_, i) => i !== index))
        if (index === editingIndex) {
          setEditingIndex(null)
        }
      }
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
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
    <div className="flex h-screen flex-col bg-[#fff] pt-6 lg:py-[69px]">
      <OnBoardingHeader percentage={66} />
      <div className="flex flex-grow flex-col items-center px-4 py-16">
        <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60 md:w-[55%]">
          <span>내 이력서 가이드</span>
        </div>
        <div className="flex w-full flex-col items-start leading-9 md:w-[55%]">
          <span className="text-2xl font-bold">나의 경력을 등록해주세요</span>
        </div>

        {careerList.map((career, index) => (
          <div key={index} className="flex w-full flex-col items-center">
            <CareerItem career={career} onEdit={() => handleEdit(index)} onDelete={() => handleDelete(index)} />
            {editingIndex === index && (
              <CareerForm
                defaultValues={career}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
                isEditingMode={true}
              />
            )}
          </div>
        ))}

        {editingIndex === null && (
          <CareerForm
            defaultValues={{
              id: 0, // Temporary ID for new entries
              projectName: '',
              projectRole: '',
              startDate: '',
              endDate: '',
              retirement: false,
            }}
            onSubmit={handleFormSubmit}
            onCancel={() => {}}
            isEditingMode={false}
          />
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
