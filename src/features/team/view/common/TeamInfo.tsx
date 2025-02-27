'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { deleteTeam, getTeamInfo, leaveTeam, requestTeamDelete, teamScrap } from '../../api/teamApi'
import { Button } from '@/shared/ui/Button/Button'
import { useMatching } from '@/shared/hooks/useMatching'
import MatchingModal from '@/features/profile/view/component/common/MatchingModal'
import MatchingRequestModal from '@/features/profile/view/component/common/MatchingRequestModal'
import { useToast } from '@/shared/hooks/useToast'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import AlertModal from '@/shared/ui/Modal/AlertModal'
import { useTeamStore } from '../../store/useTeamStore'
import { acceptTeamInvitation } from '../../api/teamViewApi'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/shared/store/useAuthStore'

interface TeamData {
  isMyTeam: boolean
  isTeamManager: boolean
  isTeamDeleteInProgress: boolean
  isTeamInvitationInProgress: boolean
  isTeamDeleteRequester: boolean

  teamInformMenu: {
    teamCode: string

    isTeamScrap: boolean
    isTeamMatching: boolean
    teamCurrentStates: Array<{ teamStateName: string }>
    teamName: string
    teamShortDescription: string
    teamLogoImagePath: string
    teamScaleItem: {
      teamScaleName: string
    }
    teamScrapCount: number
    regionDetail: {
      cityName: string
      divisionName: string
    }
  }
}

export default function TeamInfo({ params }: { params: { teamName: string } }) {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [isTeamScrap, setIsTeamScrap] = useState(false)
  const [isTeamMatching, setIsTeamMatching] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const toast = useToast()
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isDeleteRequestModalOpen, setIsDeleteRequestModalOpen] = useState(false)
  const [isTeamDeleteInProgress, setIsTeamDeleteInProgress] = useState(false)
  const { setIsTeamManager } = useTeamStore()
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false)
  const { isLogin } = useAuthStore()

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
    type: 'TEAM',
    id: teamData?.teamInformMenu?.teamCode || '',
  })

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamName = params.teamName as string
        const response = await getTeamInfo(teamName)
        if (response.isSuccess) {
          setTeamData(response.result)
          setIsTeamScrap(response.result.teamInformMenu.isTeamScrap)
          setIsTeamMatching(response.result.teamInformMenu.isTeamMatching)
          setIsTeamDeleteInProgress(response.result.isTeamDeleteInProgress)
          setIsTeamManager(response.result.teamInformMenu.isTeamManager)
        }
      } catch (error) {
        console.error('Failed to fetch team data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamData()
  }, [params.teamName, setIsTeamManager])

  useOnClickOutside({
    refs: [dropdownRef],
    handler: () => setIsDropdownOpen(false),
    isEnabled: isDropdownOpen,
  })

  if (isLoading) return <div>Loading...</div>
  if (!teamData) return <div>Team not found</div>

  const { teamInformMenu } = teamData

  // 팀 스크랩
  const onClickTeamScrap = async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }

    if (isScrapLoading) return

    const newScrapState = !isTeamScrap

    // 즉시 UI 업데이트
    setIsTeamScrap(newScrapState)

    try {
      setIsScrapLoading(true)
      const data = await teamScrap(params.teamName, newScrapState)

      if (data.isSuccess) {
        toast.success('스크랩 상태가 변경되었습니다.')
      } else {
        // API 실패시 원래 상태로 롤백
        setIsTeamScrap(!newScrapState)
        toast.alert(data.message || '스크랩 상태 변경에 실패했습니다.')
      }
    } catch (error) {
      // 에러 발생시 원래 상태로 롤백
      setIsTeamScrap(!newScrapState)
      console.error('Failed to update scrap:', error)
      toast.alert('스크랩 상태 변경에 실패했습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  const handleDeleteTeam = async () => {
    setIsDropdownOpen(false)
    setIsAlertModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    // 팀 삭제 로직
    const response = await deleteTeam(teamInformMenu.teamCode)
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
      const response = await requestTeamDelete(teamInformMenu.teamCode, 'ALLOW_DELETE')
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
      const response = await requestTeamDelete(teamInformMenu.teamCode, 'DENY_DELETE')
      if (response.isSuccess) {
        toast.success('팀 삭제요청이 거절되었습니다.')
        setIsTeamDeleteInProgress(false)
      }
    } catch (error) {
      console.error('Failed to deny team delete:', error)
    }
    setIsDeleteRequestModalOpen(false)
  }

  const handleLeaveTeam = async () => {
    try {
      const response = await leaveTeam(teamInformMenu.teamCode)
      if (response.isSuccess) {
        toast.success('팀 나가기가 완료되었습니다.')
      } else {
        toast.alert(response.message || '팀 나가기에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to leave team:', error)
    }
  }

  const handleInvitationResponse = async (isAccept: boolean) => {
    try {
      await acceptTeamInvitation(teamInformMenu.teamCode, isAccept)

      // 팀 데이터 상태 업데이트
      if (teamData) {
        setTeamData({
          ...teamData,
          isMyTeam: isAccept,
          isTeamInvitationInProgress: false,
        })
      }

      toast.success(isAccept ? '팀 초대를 수락했습니다.' : '팀 초대를 거절했습니다.')
      setIsInvitationModalOpen(false)

      // router.refresh()
    } catch (error) {
      console.error('Failed to respond to invitation:', error)
      toast.alert('초대 응답에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:gap-8">
        <div className="flex flex-col">
          <div className="flex gap-2">
            {teamInformMenu.teamCurrentStates.map((state, index) => (
              <span key={index} className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">
                {state.teamStateName}
              </span>
            ))}
          </div>

          <div className="mt-5 flex justify-between">
            <div className="flex items-center gap-8">
              <div className="relative aspect-square h-[90px] w-[90px] rounded-xl md:h-[8rem] md:w-[8rem]">
                <Image
                  src={teamInformMenu.teamLogoImagePath || '/common/default_profile.svg'}
                  alt="team-profile"
                  className="rounded-xl object-cover"
                  fill
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <h1 className="text-2xl font-bold text-grey90">{teamInformMenu.teamName}</h1>
                  <div className="flex gap-2">
                    <span className="text-xs text-grey70">스크랩 수 {teamInformMenu.teamScrapCount}</span>
                    {teamData.isMyTeam && (
                      <div className="relative" ref={dropdownRef}>
                        <Image
                          src="/common/icons/dropdown_icon.svg"
                          alt="menu"
                          width={16}
                          height={16}
                          className="cursor-pointer"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />

                        {isDropdownOpen && (
                          <div className="absolute left-0 top-6 z-10 w-[6rem] rounded-lg border border-grey30 bg-white py-2 shadow-lg">
                            <div
                              className="flex cursor-pointer items-center gap-2 px-3 py-1 text-xs text-[#FF345F] hover:bg-grey10"
                              onClick={handleLeaveTeam}
                            >
                              팀 나가기
                            </div>
                            <div
                              className="flex cursor-pointer items-center gap-2 px-3 py-1 text-xs text-grey80 hover:bg-grey10"
                              onClick={handleDeleteTeam}
                            >
                              팀 삭제하기
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <span className="flex gap-2 text-xs text-grey50">
                    팀원 | <span className="text-grey70">{teamInformMenu.teamScaleItem.teamScaleName}</span>
                  </span>
                  <span className="flex gap-2 text-xs text-grey50">
                    지역 |{' '}
                    <span className="text-grey70">
                      {teamInformMenu.regionDetail.cityName} {teamInformMenu.regionDetail.divisionName}
                    </span>
                  </span>

                  <span className="mt-2 text-xs text-grey70">{teamInformMenu.teamShortDescription}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {teamData.isMyTeam ? (
          // 내 팀인 경우
          teamData.isTeamManager ? (
            // 관리자인 경우
            <div className="mt-5 lg:mt-12">
              {isTeamDeleteInProgress && !teamData.isTeamDeleteRequester ? (
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
                // 일반 관리자 상태 또는 삭제 요청자인 경우
                <Button
                  onClick={() => {
                    router.push(`/team/${params.teamName}/edit/log`)
                  }}
                  animationMode="grey"
                  className="flex gap-2 rounded-full border border-grey30 bg-white px-6 py-3 text-sm text-grey60"
                  mode="custom"
                >
                  <Image src="/common/icons/pencil.svg" alt="edit" width={16} height={16} />
                  수정하기
                </Button>
              )}
            </div>
          ) : (
            // 일반 멤버인 경우
            <div className="mt-12 flex flex-col gap-5">
              <div
                onClick={onClickTeamScrap}
                className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
              >
                <Image
                  src={isTeamScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
                  alt="scrap"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-semibold text-[#4D82F3]">
                  {isTeamScrap ? '스크랩 취소' : '스크랩 하기'}
                </span>
              </div>
              <div
                onClick={onClickMatching}
                className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
              >
                <Image
                  src={isTeamMatching ? '/common/icons/send.svg' : '/common/icons/not_send.svg'}
                  alt="scrap"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-semibold text-[#4D82F3]">
                  {isTeamMatching ? '요청 전송완료' : '매칭 요청하기'}
                </span>
              </div>
            </div>
          )
        ) : // 내 팀이 아닌 경우
        teamData.isTeamInvitationInProgress ? (
          // 초대 대기중
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
        ) : (
          // 일반 외부인
          <div className="mt-6 flex flex-row gap-5 lg:mt-12 lg:flex-col">
            <div
              onClick={onClickTeamScrap}
              className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
            >
              <Image
                src={isTeamScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
                alt="scrap"
                width={20}
                height={20}
              />
              <span className="text-sm font-semibold text-[#4D82F3]">
                {isTeamScrap ? '스크랩 취소' : '스크랩 하기'}
              </span>
            </div>
            <div
              onClick={onClickMatching}
              className="flex w-[19rem] cursor-pointer justify-center gap-3 rounded-full bg-[#D3E1FE] px-[1.38rem] py-3"
            >
              <Image
                src={isTeamMatching ? '/common/icons/send.svg' : '/common/icons/not_send.svg'}
                alt="scrap"
                width={20}
                height={20}
              />
              <span className="text-sm font-semibold text-[#4D82F3]">
                {isTeamMatching ? '요청 전송완료' : '매칭 요청하기'}
              </span>
            </div>
          </div>
        )}
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
