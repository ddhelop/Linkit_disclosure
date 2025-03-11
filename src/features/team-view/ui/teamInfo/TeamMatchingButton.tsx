'use client'
import Image from 'next/image'
import { useMatching } from '@/shared/hooks/useMatching'
import MatchingModal from '@/features/profile-view/component/MatchingModal'
import MatchingRequestModal from '@/features/profile-view/component/MatchingRequestModal'

interface TeamMatchingButtonProps {
  teamCode: string
}

export const TeamMatchingButton = ({ teamCode }: TeamMatchingButtonProps) => {
  const {
    isProfileModalOpen,
    isRequestModalOpen,
    matchingData,
    selectedProfile,
    onClickMatching,
    handleSelectProfile,
    handleCloseModals,
    type,
    isTeamMatching,
  } = useMatching({
    type: 'TEAM',
    id: teamCode,
  })

  return (
    <>
      <div
        onClick={onClickMatching}
        className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
      >
        <Image
          src={isTeamMatching ? '/common/icons/send.svg' : '/common/icons/not_send.svg'}
          alt="matching"
          width={20}
          height={20}
        />
        <span className="text-sm font-semibold text-[#4D82F3]">
          {isTeamMatching ? '요청 전송완료' : '매칭 요청하기'}
        </span>
      </div>

      <MatchingModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseModals}
        matchingData={matchingData}
        onSelectProfile={handleSelectProfile}
        type="TEAM"
      />

      <MatchingRequestModal
        isOpen={isRequestModalOpen}
        onClose={handleCloseModals}
        selectedProfile={selectedProfile}
        receiverProfile={
          type === 'TEAM' && matchingData && 'receiverTeamInformation' in matchingData
            ? matchingData.receiverTeamInformation
            : null
        }
        type="TEAM"
      />
    </>
  )
}
