'use client'
import { EditableContainer } from './common/EditableContainer'
import { useState } from 'react'
import Image from 'next/image'
import { useProfileView } from '@/entities/profile/model/ProfileViewContext'

export default function ProfileViewAwards() {
  const { profileData } = useProfileView()
  const isMyProfile = profileData?.isMyProfile

  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/awards"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">수상</h1>

      {/* 수상 목록 */}
      <div className="flex flex-col gap-3">
        {/* 데이터가 없을 시 */}
        {profileData?.profileAwardsItems.length === 0 && (
          <div className="flex w-full items-center text-sm text-grey60">
            수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
          </div>
        )}
        {profileData?.profileAwardsItems.map((award) => (
          <div key={award.profileAwardsId} className="flex flex-col gap-2 rounded-lg bg-grey10 px-6 py-4">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-grey80">{award.awardsName}</h1>
              {award.isAwardsVerified && <Image src="/common/cert_badge.svg" alt="certed" width={16} height={16} />}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm">{award.awardsName}</p>{' '}
              <p className="text-xs font-normal text-grey60">| {award.awardsDate}</p>
            </div>

            {/* 설명 */}
            <div className="text-xs text-grey70">
              {award.awardDescription ? (
                award.awardDescription.length > 50 ? (
                  <>
                    {expandedItems[award.awardDescription]
                      ? award.awardDescription
                      : `${award.awardDescription.slice(0, 50)}...`}
                    <button
                      onClick={() => toggleExpand(award.awardDescription.toString())}
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      {expandedItems[award.awardDescription] ? '접기' : '더보기'}
                    </button>
                  </>
                ) : (
                  award.awardDescription
                )
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
