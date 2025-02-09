'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

import ElementComponent from './common/ElementComponent'
import { getEducations } from '../../api/getEducations'
import { deleteEducation } from '../api/educationApi'
import Image from 'next/image'
import { EducationListSkeleton } from './skeletons/ListSkeletons'
import EducationElementComponent from './common/EducationElementComponent'
import { useProfileMenuStore } from '../../store/useProfileMenuStore'
import { useToast } from '@/shared/hooks/useToast'
import NotContentsUi from './common/NotContentsUi'

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
  const { updateProfileMenu } = useProfileMenuStore()
  const toast = useToast()

  const fetchEducations = async () => {
    try {
      const data = await getEducations()
      setEducations(data.result.profileEducationItems)
      // 학력 데이터가 있으면 profileBooleanMenu 업데이트
      if (data.result.profileEducationItems.length > 0) {
        updateProfileMenu({ isProfileEducation: true })
      } else {
        updateProfileMenu({ isProfileEducation: false })
      }
    } catch (error) {
      console.error('Failed to fetch educations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEducations()
  }, [updateProfileMenu])

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return

    try {
      await deleteEducation(id)
      // 삭제 성공 후 목록 새로고침
      await fetchEducations()
      toast.success('성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('Failed to delete education:', error)
      toast.alert('삭제 중 오류가 발생했습니다.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Link href={'/profile/edit/education/new'} className="w-full">
          <Button
            animationMode="main"
            mode="main2"
            size="custom"
            className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
            추가하기
          </Button>
        </Link>
        <EducationListSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <Link href={'/profile/edit/education/new'} className="w-full">
        <Button
          animationMode="main"
          mode="main2"
          size="custom"
          className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
        >
          <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
          추가하기
        </Button>
      </Link>

      {educations.length === 0 ? (
        <div className="mt-6">
          <NotContentsUi />
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {educations.map((education) => (
            <EducationElementComponent
              key={education.profileEducationId}
              id={education.profileEducationId}
              title={education.universityName}
              subtitle={education.majorName}
              date={`${education.admissionYear} - ${education.graduationYear}`}
              editPath="/profile/edit/education/new"
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
