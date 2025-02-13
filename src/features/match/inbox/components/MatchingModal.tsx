'use client'

import Image from 'next/image'
import { MatchingMessage } from '../../types/MatchTypes'
import Link from 'next/link'

interface MatchingModalProps {
  message: MatchingMessage
  onClose: () => void
  onAccept: () => void
  onReject: () => void
  modalRef: React.RefObject<HTMLDivElement>
}

export default function MatchingModal({ message, onClose, onAccept, onReject, modalRef }: MatchingModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="w-[42rem] rounded-xl bg-white p-8 px-[2.75rem] py-6">
        <div className="flex justify-center">
          <h2 className="text-sm font-semibold text-grey90">상대방의 매칭 요청</h2>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="mt-3 flex gap-5">
            <div className="relative h-[54px] w-[54px] rounded-[0.63rem]">
              <Image
                src={
                  message.senderType === 'TEAM'
                    ? message.senderTeamInformation.teamLogoImagePath || '/common/default_profile.svg'
                    : message.senderProfileInformation.profileImagePath || '/common/default_profile.svg'
                }
                alt="profile"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-semibold text-grey90">
                {message.senderType === 'TEAM'
                  ? message.senderTeamInformation.teamName
                  : message.senderProfileInformation.memberName}
              </p>
              <div className="flex gap-1">
                <p className="text-xs text-grey60">
                  {message.senderType === 'TEAM'
                    ? message.senderTeamInformation.teamScaleItem.teamScaleName
                    : `${message.senderProfileInformation.profilePositionDetail.majorPosition} · ${message.senderProfileInformation.profilePositionDetail.subPosition}`}
                </p>
              </div>
            </div>
          </div>
          <div>
            <Link
              href={
                message.senderType === 'TEAM'
                  ? `/team/${message.senderTeamInformation.teamCode}/log`
                  : `/${message.senderProfileInformation.emailId}`
              }
              className="rounded-full bg-[#D3E1FE] px-4 py-2 text-sm text-grey70"
            >
              {message.senderType === 'TEAM' ? '팀 보러가기 >' : '프로필 보러가기 >'}
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-grey20 px-7 py-5">
          <p className="whitespace-pre-wrap text-sm text-grey90">{message.requestMessage}</p>
        </div>

        <div className="mt-5 flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onReject()
            }}
            className="flex-1 rounded-lg border border-grey30 py-3 text-grey70 hover:bg-grey10"
          >
            거절하기
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAccept()
            }}
            className="flex-1 rounded-lg bg-main py-3 text-white hover:bg-blue-600"
          >
            수락하기
          </button>
        </div>
      </div>
    </div>
  )
}
