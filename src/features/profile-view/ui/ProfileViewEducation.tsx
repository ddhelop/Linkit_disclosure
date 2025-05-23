'use client'
import { EditableContainer } from '../component/EditableContainer'
import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProfileDetail } from '@/features/profile-view/api/ProfileViewApi'
import ProfileViewEducationSkeleton from './skeleton/ProfileViewEducationSkeleton'
import { logoLists } from '@/shared/data/university_logo_lists_pretty'

export default function ProfileViewEducation({ emailId }: { emailId: string }) {
  // 모든 훅은 여기에 선언해야 합니다 - 조건문 이전에
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const { data, isLoading } = useQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000, // 1분 동안 캐싱 유지
  })

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return <ProfileViewEducationSkeleton />
  }

  const isMyProfile = data?.result?.isMyProfile
  const educationItems = data?.result?.profileEducationItems || []

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/education"
      className="flex w-full flex-col gap-5 border-y border-grey20 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border"
    >
      <h1 className="font-semibold">학력</h1>

      {/* 학력 항목 */}
      <div className="flex flex-col gap-5">
        {/* 데이터가 없을 시 */}
        {educationItems.length === 0 &&
          (isMyProfile ? (
            <div className="flex w-full items-center text-sm text-grey60">
              수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
            </div>
          ) : (
            <div className="flex w-full items-center text-sm text-grey60">아직 추가하지 않았어요</div>
          ))}
        {educationItems.map((education) => (
          <div key={education.profileEducationId} className="flex items-center gap-4 rounded-lg bg-grey10 px-6 py-4">
            {/* 이미지 */}
            {(() => {
              const logoUrl = logoLists.logo.find((logo) => logo.university === education.universityName)?.logoUrl
              return logoUrl ? <Image src={logoUrl} alt="university" width={40} height={40} /> : null
            })()}
            {/* 학교 정보 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-grey80">{education.universityName}</h1>
                {education.isEducationVerified && (
                  <Image src="/common/cert_badge.svg" alt="certed" width={16} height={16} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm">{education.majorName}</p>{' '}
                <p className="text-xs font-normal text-grey60">
                  | {education.admissionYear} ~ {education.graduationYear ? education.graduationYear : '재학중'}
                </p>
              </div>

              {/* 설명 */}
              <div className="text-xs text-grey70">
                {education.educationDescription ? (
                  education.educationDescription.length > 50 ? (
                    <>
                      {expandedItems[education.educationDescription]
                        ? education.educationDescription
                        : `${education.educationDescription.slice(0, 50)}...`}
                      <button
                        onClick={() => toggleExpand(education.educationDescription.toString())}
                        className="ml-1 text-blue-500 hover:underline"
                      >
                        {expandedItems[education.educationDescription] ? '접기' : '더보기'}
                      </button>
                    </>
                  ) : (
                    education.educationDescription
                  )
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
