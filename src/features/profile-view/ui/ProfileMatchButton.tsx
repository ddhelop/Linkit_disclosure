'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMatching } from '@/shared/hooks/useMatching'
import MatchingModal from '../component/MatchingModal'
import MatchingRequestModal from '../component/MatchingRequestModal'

export default function ProfileMatchButton() {
  const params = useParams()
  const {
    isProfileModalOpen,
    isRequestModalOpen,
    matchingData,
    selectedProfile,
    onClickMatching,
    handleSelectProfile,
    handleCloseModals,
    type,
  } = useMatching({
    type: 'PROFILE',
    id: params.emailId as string,
  })

  return (
    <>
      <button
        onClick={onClickMatching}
        className="flex w-[12.5rem] justify-center gap-2 rounded-full bg-white py-4 hover:border hover:border-[#4D82F3]"
      >
        <Image src="/common/icons/not_send.svg" alt="scrap" width={20} height={20} />
        <span className="text-sm text-[#4D82F3]">요청 보내기</span>
      </button>

      <MatchingModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseModals}
        matchingData={matchingData}
        onSelectProfile={handleSelectProfile}
      />

      <MatchingRequestModal
        isOpen={isRequestModalOpen}
        onClose={handleCloseModals}
        selectedProfile={selectedProfile}
        receiverProfile={
          type === 'PROFILE' && matchingData && 'receiverProfileInformation' in matchingData
            ? matchingData.receiverProfileInformation
            : null
        }
        type="PROFILE"
      />
    </>
  )
}
