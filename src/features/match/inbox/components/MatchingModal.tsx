'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'

interface MatchingModalProps {
  message: MatchingMessage
  onClose: () => void
  onAccept: () => void
  onReject: () => void
}

export default function MatchingModal({ message, onClose, onAccept, onReject }: MatchingModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[31.25rem] rounded-xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">매칭 요청</h2>
          <button onClick={onClose}>
            <Image src="/common/icons/close.svg" alt="close" width={24} height={24} />
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
              alt="profile"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">{message.senderProfileInformation.memberName}</p>
              <p className="text-sm text-grey70">{message.senderTeamInformation.teamName}</p>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-sm text-grey80">{message.requestMessage}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onReject}
            className="flex-1 rounded-lg border border-grey30 py-3 text-grey70 hover:bg-grey10"
          >
            거절하기
          </button>
          <button onClick={onAccept} className="flex-1 rounded-lg bg-main py-3 text-white hover:bg-blue-600">
            수락하기
          </button>
        </div>
      </div>
    </div>
  )
}
