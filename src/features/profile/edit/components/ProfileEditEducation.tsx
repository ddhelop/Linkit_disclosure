'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

import ElementComponent from './common/ElementComponent'
import { getEducations } from '../../api/getEducations'
import Image from 'next/image'
import { EducationListSkeleton } from './skeletons/ListSkeletons'

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
    return (
      <div className="flex flex-col">
        <Link href={'/profile/edit/education/new'} className="w-full">
          <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2 text-sm">
            + 추가하기
          </Button>
        </Link>
        <EducationListSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Link href={'/profile/edit/education/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2 text-sm">
          + 추가하기
        </Button>
      </Link>

      {educations.length === 0 ? (
        <div className="mt-5 flex w-full justify-center">
          <Image
            src={'/common/images/not-contents-ui.png'}
            alt="empty"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      ) : (
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
      )}
    </div>
  )
}
