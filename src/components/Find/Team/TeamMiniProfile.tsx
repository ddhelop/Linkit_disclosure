'use client'
import TeamAnnouncementModal from '@/components/common/component/Team/TeamAnnouncementModal'
import { accessTokenState, authState } from '@/context/recoil-context'
import { DeleteSaveTeam, PostSaveTeam } from '@/lib/action'
import { FindTeamInterface } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

interface TeamMemberMiniProfileProps {
  profile: FindTeamInterface
}

export default function TeamMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaved, setIsSaved] = useState<boolean>(profile.teamMemberAnnouncementResponse?.isTeamSaved || false)
  const [isAuth, setIsAuth] = useRecoilState(authState) || false
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  const onClickSave = async () => {
    if (isAuth) {
      try {
        if (isSaved) {
          const response = await DeleteSaveTeam(accessToken, profile.teamMemberAnnouncementResponse.id)
          if (response.ok) {
            setIsSaved(false)
            alert('찜하기가 취소되었습니다.')
          } else {
            alert('찜하기 취소에 실패했습니다.')
          }
        } else {
          const response = await PostSaveTeam(accessToken, profile.teamMemberAnnouncementResponse.id)
          if (response.ok) {
            setIsSaved(true)
            alert('저장되었습니다.')
          } else {
            const responseData = await response.json()
            alert(responseData.message)
          }
        }
      } catch {
        alert('요청에 실패했습니다.')
      }
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  useEffect(() => {
    if (profile) {
      setIsSaved(profile.teamMemberAnnouncementResponse?.isTeamSaved || false)
      setDataLoaded(true)
      setLoading(false) // 데이터 로딩 완료
    }
  }, [profile])

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  if (!dataLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-[42.5rem] flex-col rounded-[0.63rem] bg-[#fff] p-5 shadow-sm">
      <Link href={`/team/${profile?.teamMiniProfileResponse.id}`}>
        <div className="flex cursor-pointer flex-col rounded-lg p-2 hover:bg-grey10">
          <div className="flex w-full items-center justify-between ">
            <div className="flex items-center gap-2">
              <Image
                src={profile.teamMiniProfileResponse?.teamLogoImageUrl || '/assets/images/DefaultProfile.png'}
                width={34}
                height={34}
                alt="TeamLogo"
                className="rounded-full"
              />

              <p className="text-sm font-semibold text-[#2563EB]">{profile.teamMiniProfileResponse?.teamName}</p>
              <p className="pl-2 text-xs text-grey50">
                분야 | {profile.teamMiniProfileResponse.sectorName} 규모 | {profile.teamMiniProfileResponse?.sizeType}
              </p>
            </div>
            <div className="flex cursor-pointer gap-2 text-xs text-grey60">
              <p>자세히 보기</p>
              <Image src="/assets/icons/gray>.svg" width={6} height={10} alt="arrow" />
            </div>
          </div>

          <div className="py-4 text-sm">{profile.teamMiniProfileResponse?.teamProfileTitle}</div>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {profile?.teamMiniProfileResponse?.teamKeywordNames?.map((keyword, index) => (
                <div
                  key={index}
                  className="rounded-[0.45rem] bg-grey30 bg-opacity-20 px-[0.57rem] py-1 text-xs text-grey60"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* 구분선 */}
      <div className="my-4 w-full border border-grey30"></div>

      {/* 모집 중인 공고 */}
      <div className="flex items-center gap-2 py-3">
        <Image src="/assets/icons/drawingPin.svg" width={14} height={14} alt="calendar" />
        <p className="text-xs font-bold text-[#2563EB]">모집 중인 공고</p>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : profile?.teamMemberAnnouncementResponse ? (
        <div className="flex w-full justify-between rounded-lg border pr-5">
          <div className="flex w-full cursor-pointer flex-col rounded-lg p-4 " onClick={handleModalOpen}>
            <div className="mb-4 flex items-center justify-between text-sm font-semibold">
              <p>{profile?.teamMemberAnnouncementResponse?.jobRoleName}</p>
            </div>

            <div className="flex gap-2">
              <div className="flex gap-2 rounded-[0.45rem] bg-grey10 px-2 py-1 text-xs text-grey60">
                {profile?.teamMemberAnnouncementResponse?.skillNames}
              </div>
            </div>
          </div>
          <Image
            src={isSaved ? '/assets/icons/filledSaveIcon.svg' : '/assets/icons/saveIcon.svg'}
            width={18}
            height={18}
            alt="arrow"
            className="cursor-pointer"
            onClick={onClickSave}
          />
        </div>
      ) : (
        <div>공고가 없습니다.</div>
      )}

      {isModalOpen && (
        <TeamAnnouncementModal onClose={handleModalClose} data={profile?.teamMemberAnnouncementResponse} />
      )}
    </div>
  )
}
