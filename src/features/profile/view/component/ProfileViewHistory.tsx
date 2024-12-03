import { useProfile } from '@/entities/profile/model/ProfileContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'
import { useState } from 'react'

export default function ProfileViewHistory() {
  const { profileData } = useProfile()
  const historyItems = profileData?.profileActivityItems || []
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
      editPath="/profile/edit/history"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">이력</h1>

      <div className="flex flex-col gap-3">
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
            <div className="text-xs text-grey70">
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
