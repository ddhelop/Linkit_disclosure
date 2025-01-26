'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMatching } from '@/shared/hooks/useMatching'
import MatchingModal from './MatchingModal'
import MatchingRequestModal from './MatchingRequestModal'

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
      <div className="mt-3 flex w-full items-center justify-between rounded-full bg-grey20 py-[0.38rem] pl-4 pr-[0.39rem] text-sm text-grey70">
        <div className="flex gap-5">
          <span className="">매칭 요청</span>
        </div>
        <button
          onClick={onClickMatching}
          className="flex items-center gap-2 rounded-full bg-[#D3E1FE] px-[1.38rem] py-[0.56rem] text-[#4D82F3] hover:brightness-95"
        >
          <Image src="/common/icons/send.svg" alt="scrap" width={20} height={20} />
        </button>
      </div>

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
