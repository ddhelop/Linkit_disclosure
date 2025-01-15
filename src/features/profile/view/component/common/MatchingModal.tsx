'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { createPortal } from 'react-dom'
import { MatchingProfileMenuResponse, TeamInformation } from '@/features/match/types/MatchTypes'

interface MatchingModalProps {
  isOpen: boolean
  onClose: () => void
  matchingData: MatchingProfileMenuResponse | null
  onSelectProfile: (profile: TeamInformation) => void
}

export default function MatchingModal({ isOpen, onClose, matchingData, onSelectProfile }: MatchingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [modalRef],
    handler: onClose,
    isEnabled: isOpen,
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !matchingData) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="relative flex w-[18.375rem] flex-col items-center rounded-xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-grey90">어떤 프로필로 매칭 요청을 보낼까요?</h2>
        </div>

        <div
          onClick={() => {
            onSelectProfile({
              teamCode: 'personal',
              teamName: matchingData.senderProfileInformation.memberName,
              teamLogoImagePath: matchingData.senderProfileInformation.profileImagePath,
              teamScaleItem: { teamScaleName: '개인' },
              emailId: matchingData.senderProfileInformation.emailId,
            })
            onClose()
          }}
          className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-grey30 px-[1.88rem] py-4 hover:bg-grey20"
        >
          <div className="h-[50px] w-[50px] flex-shrink-0">
            <Image
              src={matchingData.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
              alt="profile"
              width={50}
              height={50}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-grey90">{matchingData.senderProfileInformation.memberName}</span>
          </div>
        </div>

        <div className="mt-3 flex w-full flex-col gap-3">
          {matchingData.senderTeamInformation.map((team) => (
            <div
              key={team.teamCode}
              onClick={() => {
                onSelectProfile(team)
                onClose()
              }}
              className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-grey30 px-[1.88rem] py-4 hover:bg-grey20"
            >
              <div className="h-[50px] w-[50px] flex-shrink-0">
                <Image
                  src={team.teamLogoImagePath || '/common/default_profile.svg'}
                  alt="team"
                  width={50}
                  height={50}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-grey90">{team.teamName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
