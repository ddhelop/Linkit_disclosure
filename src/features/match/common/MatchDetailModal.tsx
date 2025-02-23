'use client'
import Modal from '@/shared/ui/Modal/Modal'

import { MatchingMessage } from '../types/MatchTypes'

interface MatchDetailModalProps {
  isOpen: boolean
  onClose: () => void
  message: MatchingMessage
}

export default function MatchDetailModal({ isOpen, onClose, message }: MatchDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col gap-6 p-8 md:w-[600px]">
        <div className="flex w-full flex-col gap-3">
          <h3 className="text-sm font-semibold text-grey90">
            {message.receiverType === 'ANNOUNCEMENT' ? '공고 지원 메시지' : '매칭 요청 메시지'}
          </h3>

          <p className="max-h-[calc(100vh-8rem)] w-full overflow-y-auto whitespace-pre-line rounded-xl bg-grey10 p-6 text-grey70 md:max-h-[26rem] ">
            {message.requestMessage}
          </p>
        </div>

        {message.matchingStatusType === 'DENIED' && (
          <p className="mt-auto text-center text-sm text-grey60">
            {message.receiverType === 'ANNOUNCEMENT' ? '거절된 공고 지원입니다.' : '거절된 매칭 요청입니다.'}
          </p>
        )}
      </div>
    </Modal>
  )
}
