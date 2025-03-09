'use client'

import { useQuery } from '@tanstack/react-query'
import { EditableContainer } from '../component/EditableContainer'
import Image from 'next/image'
import { useState } from 'react'
import { getProfileDetail } from '@/features/profile-view/api/ProfileViewApi'

export default function ProfileViewHistory({ emailId }: { emailId: string }) {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  const { data, isLoading } = useQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000, // 1분 동안 캐싱 유지
  })

  const historyItems = data?.result?.profileActivityItems || []

  // 확장 아이템 토글
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <EditableContainer
      isEditable={data?.result?.isMyProfile}
      editPath="/profile/edit/history"
      className="flex w-full flex-col gap-5 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border"
    >
      <h1 className="font-semibold">이력</h1>

      <div className="flex flex-col gap-3">
        {/* 데이터가 없을 시 */}
        {historyItems.length === 0 &&
          (data?.result?.isMyProfile ? (
            <div className="flex w-full items-center text-sm text-grey60">
              수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
            </div>
          ) : (
            <div className="flex w-full items-center text-sm text-grey60">아직 추가하지 않았어요</div>
          ))}
        {historyItems.map((history) => (
          <div key={history.profileActivityId} className="flex flex-col gap-2 rounded-lg bg-grey10 px-6 py-4">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-grey80">{history.activityName}</h1>
              {history.isActivityVerified && <Image src="/common/cert_badge.svg" alt="certed" width={16} height={16} />}
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm text-grey80">{history.activityRole}</p>
              <p className="text-grey50">|</p>
              <p className="text-xs text-grey50">
                {history.activityStartDate}~{history.activityEndDate}
              </p>
            </div>
            <div className="whitespace-pre-line text-xs text-grey70">
              {history.activityDescription ? (
                history.activityDescription.length > 50 ? (
                  <>
                    {expandedItems[history.profileActivityId]
                      ? history.activityDescription
                      : `${history.activityDescription.slice(0, 50)}...`}
                    <button
                      onClick={() => toggleExpand(history.profileActivityId.toString())}
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      {expandedItems[history.profileActivityId] ? '접기' : '더보기'}
                    </button>
                  </>
                ) : (
                  history.activityDescription
                )
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
