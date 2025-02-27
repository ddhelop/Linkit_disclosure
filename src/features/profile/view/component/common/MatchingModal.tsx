'use client'

import Image from 'next/image'
import { MatchingProfileMenuResponse, TeamInformation } from '@/features/match/types/MatchTypes'
import Modal from '@/shared/ui/Modal/Modal'

interface TeamMatchingResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    isTeamInformationExists: boolean
    senderProfileInformation: {
      profileImagePath: string
      memberName: string
      emailId: string
      profilePositionDetail: {
        majorPosition: string
        subPosition: string
      }
    }
    senderTeamInformation: TeamInformation[]
    receiverTeamInformation: TeamInformation
  }
}

interface MatchingModalProps {
  isOpen: boolean
  onClose: () => void
  matchingData: (MatchingProfileMenuResponse | TeamMatchingResponse['result']) | null
  onSelectProfile: (profile: TeamInformation) => void
  type?: 'PROFILE' | 'TEAM'
}

export default function MatchingModal({
  isOpen,
  onClose,
  matchingData,
  onSelectProfile,
  type = 'PROFILE',
}: MatchingModalProps) {
  if (!isOpen || !matchingData) return null

  const handleProfileSelect = (profile: TeamInformation) => {
    onSelectProfile(profile)
  }

  const renderContent = () => {
    if (type === 'TEAM') {
      const teamData = matchingData as TeamMatchingResponse['result']
      return (
        <>
          {/* 개인 프로필 선택 옵션 */}
          <div
            onClick={() =>
              handleProfileSelect({
                teamCode: 'personal',
                teamName: teamData.senderProfileInformation.memberName,
                teamLogoImagePath: teamData.senderProfileInformation.profileImagePath,
                teamScaleItem: {
                  teamScaleName: teamData.senderProfileInformation.profilePositionDetail.majorPosition,
                },
                emailId: teamData.senderProfileInformation.emailId,
              })
            }
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-grey30 px-[1.88rem] py-4 hover:bg-grey20"
          >
            <div className="h-[50px] w-[50px] flex-shrink-0">
              <Image
                src={teamData.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
                alt="profile"
                width={50}
                height={50}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-grey90">{teamData.senderProfileInformation.memberName}</span>
              <span className="text-sm text-grey70">
                {teamData.senderProfileInformation.profilePositionDetail.majorPosition} ·{' '}
                {teamData.senderProfileInformation.profilePositionDetail.subPosition}
              </span>
            </div>
          </div>

          {/* 팀 프로필 목록 */}
          <div className="mt-3 flex w-full flex-col gap-3">
            {teamData.senderTeamInformation.map((team) => (
              <div
                key={team.teamCode}
                onClick={() => handleProfileSelect(team)}
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
                  <span className="text-sm text-grey70">{team.teamScaleItem.teamScaleName}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    } else {
      // 기존 PROFILE 타입 렌더링 로직
      const profileData = matchingData as MatchingProfileMenuResponse
      return (
        <>
          {profileData.senderProfileInformation && (
            <div
              onClick={() =>
                handleProfileSelect({
                  teamCode: 'personal',
                  teamName: profileData.senderProfileInformation.memberName,
                  teamLogoImagePath: profileData.senderProfileInformation.profileImagePath,
                  teamScaleItem: {
                    teamScaleName: profileData.senderProfileInformation.profilePositionDetail.majorPosition,
                  },
                  emailId: profileData.senderProfileInformation.emailId,
                })
              }
              className="flex w-full  cursor-pointer items-center gap-4 rounded-xl border border-grey30 px-[1.88rem] py-4 hover:bg-grey20"
            >
              <div className="h-[50px] w-[50px] flex-shrink-0">
                <Image
                  src={profileData.senderProfileInformation.profileImagePath || '/common/default_profile.svg'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-grey90">{profileData.senderProfileInformation.memberName}</span>
              </div>
            </div>
          )}
          <div className="mt-3 flex w-full flex-col gap-3">
            {profileData.senderTeamInformation?.map((team) => (
              <div
                key={team.teamCode}
                onClick={() => handleProfileSelect(team)}
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
        </>
      )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="z-[110] flex w-full flex-col items-center rounded-xl bg-white p-8 md:w-[18.375rem]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-grey90">어떤 프로필로 매칭 요청을 보낼까요?</h2>
        </div>
        {renderContent()}
      </div>
    </Modal>
  )
}
