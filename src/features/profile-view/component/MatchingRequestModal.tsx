'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ProfileInformation, TeamInformation } from '@/features/match/types/MatchTypes'
import { sendMatchingRequest } from '@/features/match/api/MatchApi'
import { useToast } from '@/shared/hooks/useToast'
import Modal from '@/shared/ui/Modal/Modal'

interface MatchingRequestModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProfile: TeamInformation | null
  receiverProfile: (TeamInformation | ProfileInformation) | null
  type?: 'PROFILE' | 'TEAM'
  receiverAnnouncementId?: number
}

export default function MatchingRequestModal({
  isOpen,
  onClose,
  selectedProfile,
  receiverProfile,
  type = 'PROFILE',
  receiverAnnouncementId,
}: MatchingRequestModalProps) {
  const [requestMessage, setRequestMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (!isOpen) {
      setRequestMessage('')
    }
  }, [isOpen])

  const handleSendRequest = async () => {
    if (!selectedProfile || !receiverProfile || !requestMessage.trim()) return

    try {
      setIsLoading(true)

      const requestData = {
        senderType: selectedProfile.teamCode === 'personal' ? ('PROFILE' as const) : ('TEAM' as const),
        receiverType: type,
        ...(selectedProfile.teamCode === 'personal'
          ? { senderEmailId: selectedProfile.emailId }
          : { senderTeamCode: selectedProfile.teamCode }),
        ...(type === 'TEAM'
          ? { receiverTeamCode: (receiverProfile as TeamInformation).teamCode }
          : { receiverEmailId: (receiverProfile as ProfileInformation).emailId }),
        ...(receiverAnnouncementId && { receiverAnnouncementId }),
        requestMessage: requestMessage.trim(),
      }

      await sendMatchingRequest(requestData)
      toast.success('매칭 요청이 성공적으로 전송되었습니다.')
      onClose()
    } catch (error) {
      toast.alert('매칭 요청 전송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderReceiverProfile = () => {
    if (type === 'TEAM') {
      const teamProfile = receiverProfile as TeamInformation
      return (
        <>
          <span className="text-sm font-semibold text-grey90">{teamProfile.teamName}</span>
          <span className="text-xs text-grey60">{teamProfile.teamScaleItem?.teamScaleName}</span>
        </>
      )
    } else {
      const profileInfo = receiverProfile as ProfileInformation
      return (
        <>
          <span className="text-sm font-semibold text-grey90">{profileInfo.memberName}</span>
          <div className="flex gap-1 text-xs text-grey60">
            <span>{profileInfo.profilePositionDetail.majorPosition}</span>
            <span>·</span>
            <span>{profileInfo.profilePositionDetail.subPosition}</span>
          </div>
        </>
      )
    }
  }

  if (!selectedProfile || !receiverProfile) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full w-full flex-col px-4 py-8 md:h-auto md:w-[42.25rem] md:px-10">
        <div className="mb-6 flex justify-center">
          <h2 className="text-sm font-semibold text-grey90">상대방에게 매칭 요청 보내기</h2>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="hidden w-full items-center gap-4 rounded-xl border border-grey30 px-5 py-3 md:flex md:w-[15rem]">
            <div className="h-[50px] w-[50px] flex-shrink-0">
              <Image
                src={selectedProfile?.teamLogoImagePath || '/common/default_profile.svg'}
                alt="sender"
                width={50}
                height={50}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-grey90">{selectedProfile?.teamName}</span>
              <span className="text-xs text-grey60">{selectedProfile?.teamScaleItem?.teamScaleName}</span>
            </div>
          </div>

          <Image src="/common/icons/gradient_arrow.svg" alt="arrow" width={40} height={16} className="hidden md:flex" />

          <div className="flex w-full items-center gap-4 rounded-xl border border-grey30 px-5 py-3 md:w-[15rem]">
            <div className="h-[50px] w-[50px] flex-shrink-0">
              <Image
                src={
                  type === 'TEAM'
                    ? (receiverProfile as TeamInformation)?.teamLogoImagePath || '/common/default_profile.svg'
                    : (receiverProfile as ProfileInformation)?.profileImagePath || '/common/default_profile.svg'
                }
                alt="receiver"
                width={50}
                height={50}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col">{renderReceiverProfile()}</div>
          </div>
        </div>

        <div className="mt-4 flex-1 rounded-xl">
          <textarea
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            className="h-[calc(100vh-300px)] w-full resize-none rounded-xl border border-grey40 bg-grey20 px-7 py-5 text-sm text-grey90 placeholder:whitespace-pre-line placeholder:text-grey50 focus:outline-none md:h-[200px]"
            placeholder={`나를 어필할 수 있는 내용을 입력해 주세요\n페이지를 떠나면 내용이 저장되지 않으니 미리 복사해 두었다가 붙여넣어 사용할 수 있어요`}
          />
          <p className="mt-1 text-xs text-grey50">필요한 자료들은 내 프로필에 업로드 해주세요</p>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="md: flex hidden flex-1 rounded-lg bg-grey30 py-3 text-grey70 hover:bg-grey40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              취소
            </button>
            <button
              onClick={handleSendRequest}
              disabled={isLoading || !requestMessage.trim()}
              className="flex-1 rounded-lg bg-main py-3 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? '요청 중...' : '매칭 요청 보내기'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
