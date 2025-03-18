'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { acceptTeamInvitation } from '../../../team/api/teamViewApi'
import { useToast } from '@/shared/hooks/useToast'
import AlertModal from '@/shared/ui/Modal/AlertModal'

interface TeamInvitationActionsProps {
  teamCode: string
}

export const TeamInvitationActions = ({ teamCode }: TeamInvitationActionsProps) => {
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false)
  const toast = useToast()

  const handleInvitationResponse = async (isAccept: boolean) => {
    try {
      await acceptTeamInvitation(teamCode, isAccept)
      toast.success(isAccept ? '팀 초대를 수락했습니다.' : '팀 초대를 거절했습니다.')
      setIsInvitationModalOpen(false)
    } catch (error) {
      console.error('Failed to respond to invitation:', error)
      toast.alert('초대 응답에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="mt-12 flex">
        <div className="relative w-full">
          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/common/images/Team_Invitation_Balloon.svg"
              alt="invitation"
              width={210}
              height={34}
              className="absolute right-[7rem] top-1 h-auto w-[210px]"
              style={{ maxWidth: 'none' }}
            />
          </motion.div>

          <button
            onClick={() => setIsInvitationModalOpen(true)}
            className="cursor-pointer rounded-full bg-[#3774F4] px-6 py-3 text-sm font-semibold text-white transition-all duration-100 hover:bg-main"
          >
            응답하기
          </button>
        </div>
      </div>

      <AlertModal
        isOpen={isInvitationModalOpen}
        title="초대를 수락할까요?"
        description="초대를 수락하면 팀 구성원으로서 소속될 수 있어요"
        cancelText="거절하기"
        confirmText="수락하기"
        cancelButtonStyle="bg-grey20 text-grey90 hover:bg-grey30"
        confirmButtonStyle="bg-main text-white hover:bg-[#3774F4]"
        onCancel={() => setIsInvitationModalOpen(false)}
        onCancelAction={() => handleInvitationResponse(false)}
        onConfirm={() => handleInvitationResponse(true)}
      />
    </>
  )
}
