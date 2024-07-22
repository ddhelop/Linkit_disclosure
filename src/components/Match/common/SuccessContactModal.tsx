// MatchModal.tsx
'use client'

import { PostMatchContact, PostTeamMatchContact } from '@/lib/action'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MatchModalProps {
  match: {
    matchingType: string
    matchingId: number
  }
  onClose: () => void
  accessToken: string
}

const SuccessContactModal: React.FC<MatchModalProps> = ({ match, onClose, accessToken }) => {
  // 받아온 response 저장
  const [responseData, setResponseData] = useState<{ memberName: string; email: string } | null>(null)

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        if (match.matchingType === 'PROFILE') {
          const response = await PostMatchContact(accessToken, match.matchingId)
          setResponseData(response)
        } else if (match.matchingType === 'TEAM_PROFILE') {
          const response = await PostTeamMatchContact(accessToken, match.matchingId)
          setResponseData(response)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchResponse()

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [accessToken, match.matchingId, match.matchingType, onClose])

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-lg">
        <Image src="/assets/icons/check.svg" width={43} height={43} alt="success" />
        <div className="text-center">
          <div className="py-4 text-xl font-bold text-grey100">매칭이 수락되었습니다!</div>
          <div className="text-sm text-grey60">
            {responseData?.memberName}님 연락처 : {responseData?.email}
          </div>
          <div className="text-sm text-grey60">해당 연락처를 통해 팀빌딩을 진행해 보세요! 🥳</div>
          <button onClick={onClose} className="mt-4 w-full rounded bg-gray-200 px-4 py-2">
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessContactModal
