'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

import ElementComponent from './common/ElementComponent'
import { getEducations } from '../../api/getEducations'

interface Education {
  profileEducationId: number
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  isEducationVerified: boolean
}

export default function ProfileEditEducation() {
  const [educations, setEducations] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const data = await getEducations()
        setEducations(data.result.profileEducationItems)
      } catch (error) {
        console.error('Failed to fetch educations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEducations()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (educations.length === 0) {
    return (
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Link href={'/profile/edit/education/new'} className="w-full">
          <Button mode="main2" animationMode="main" className="w-full">
            학력 추가하기
          </Button>
        </Link>
        <div className="mt-4 text-grey60">학력 내역이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
      <Link href={'/profile/edit/education/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full">
          학력 추가하기
        </Button>
      </Link>

      <div className="mt-4">
        {educations.map((education) => (
          <ElementComponent
            key={education.profileEducationId}
            id={education.profileEducationId}
            title={education.universityName}
            subtitle={education.majorName}
            date={`${education.admissionYear} - ${education.graduationYear}`}
            editPath="/profile/edit/education/new"
          />
        ))}
      </div>
    </div>
  )
}
