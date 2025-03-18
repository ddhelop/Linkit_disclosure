'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteTeam, requestTeamDelete } from '../../../team/api/teamApi'
import { Button } from '@/shared/ui/Button/Button'
import { useToast } from '@/shared/hooks/useToast'
import AlertModal from '@/shared/ui/Modal/AlertModal'
import { TeamVisitorModal } from './modal/TeamVisitorModal'

interface TeamDeleteActionsProps {
  teamCode: string
  isTeamDeleteInProgress: boolean
  isTeamDeleteRequester: boolean
  teamName: string
}

export const TeamDeleteActions = ({
  teamCode,
  teamName,
  isTeamDeleteInProgress,
  isTeamDeleteRequester,
}: TeamDeleteActionsProps) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isDeleteRequestModalOpen, setIsDeleteRequestModalOpen] = useState(false)
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleDeleteTeam = async () => {
    setIsAlertModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    // 팀 삭제 로직
    const response = await deleteTeam(teamCode)
    if (response.isSuccess) {
      toast.success('팀 삭제가 요청되었습니다.')
    } else {
      toast.alert(response.message || '팀 삭제에 실패했습니다.')
    }

    setIsAlertModalOpen(false)
  }

  const handleDeleteRequest = () => {
    setIsDeleteRequestModalOpen(true)
  }

  const handleConfirmDeleteRequest = async () => {
    try {
      const response = await requestTeamDelete(teamCode, 'ALLOW_DELETE')
      if (response.isSuccess) {
        if (response.result.isTeamLastDeleteRequester) {
          toast.success('팀 삭제가 완료 되었습니다.')
          router.push('/team/select')
        } else {
          toast.success('팀 삭제요청이 수락되었습니다.')
        }
      }
    } catch (error) {
      console.error('Failed to delete team:', error)
    }
    setIsDeleteRequestModalOpen(false)
  }

  const handleDenyDeleteRequest = async () => {
    try {
      const response = await requestTeamDelete(teamCode, 'DENY_DELETE')
      if (response.isSuccess) {
        toast.success('팀 삭제요청이 거절되었습니다.')
      }
    } catch (error) {
      console.error('Failed to deny team delete:', error)
    }
    setIsDeleteRequestModalOpen(false)
  }

  return (
    <>
      {isTeamDeleteInProgress && !isTeamDeleteRequester ? (
        // 팀 삭제 진행중이고 삭제 요청자가 아닌 경우
        <div className="flex gap-3">
          <Image src="/common/icons/delete_messgae.svg" alt="delete" width={206} height={20} />
          <Button
            animationMode="main"
            className="rounded-full bg-[#3774F4] px-6 py-3 text-sm font-semibold text-white"
            onClick={handleDeleteRequest}
          >
            응답하기
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setIsVisitorModalOpen(true)}
          className="flex items-center gap-2 rounded-full border border-grey50 bg-white px-5 py-4 text-sm text-grey60 hover:bg-grey10"
        >
          프로필 방문자
          <Image src="/common/icons/right_arrow_grey60.svg" alt="profile_visitor" width={24} height={24} />
        </button>
      )}

      <AlertModal
        isOpen={isAlertModalOpen}
        title="정말 삭제할까요?"
        description={'팀을 삭제하면 복구할 수 없어요\n팀을 완전히 삭제할까요?'}
        cancelText="삭제 안 함"
        confirmText="삭제하기"
        onCancel={() => setIsAlertModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <AlertModal
        isOpen={isDeleteRequestModalOpen}
        title="팀을 삭제할까요?"
        description={'팀 관리자가 모두 수락하면 팀이 삭제되고\n되돌릴 수 없어요'}
        cancelText="삭제 거절"
        confirmText="삭제 수락"
        onCancel={() => setIsDeleteRequestModalOpen(false)}
        onCancelAction={handleDenyDeleteRequest}
        onConfirm={handleConfirmDeleteRequest}
      />

      <TeamVisitorModal isOpen={isVisitorModalOpen} onClose={() => setIsVisitorModalOpen(false)} teamName={teamName} />
    </>
  )
}
