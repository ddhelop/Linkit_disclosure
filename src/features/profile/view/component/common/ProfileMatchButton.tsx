'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { getMatchingProfileMenu } from '@/features/match/api/MatchApi'
import Image from 'next/image'
import MatchingModal from './MatchingModal'
import MatchingRequestModal from './MatchingRequestModal'
import { MatchingProfileMenuResponse, TeamInformation } from '@/features/match/types/MatchTypes'

export default function ProfileMatchButton() {
  const { profileData } = useProfileView()
  const params = useParams()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [matchingData, setMatchingData] = useState<MatchingProfileMenuResponse | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<TeamInformation | null>(null)

  const onClickMatching = async () => {
    try {
      const emailId = params.emailId as string
      const data = await getMatchingProfileMenu(emailId)

      setMatchingData(data)
      setIsProfileModalOpen(true)
    } catch (error) {
      console.error('Error fetching matching data:', error)
    }
  }

  const handleSelectProfile = (profile: TeamInformation) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(false)
    setIsRequestModalOpen(true)
  }

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
        onClose={() => setIsProfileModalOpen(false)}
        matchingData={matchingData}
        onSelectProfile={handleSelectProfile}
      />

      <MatchingRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedProfile={selectedProfile}
        receiverProfile={matchingData?.receiverProfileInformation || null}
      />
    </>
  )
}
