'use client'
import { useQuery } from '@tanstack/react-query'
import { getProfileDetail } from '../api/ProfileViewApi'
import Image from 'next/image'
import ProfileScrap from '@/features/profile/view/component/common/ProfileScrap'
import ProfileMatchButton from '@/features/profile/view/component/common/ProfileMatchButton'

export default function ProfileViewBasic({ emailId }: { emailId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['profile', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000, // 1분 동안 캐싱 유지
  })

  const profileData = data?.result?.profileInformMenu

  return (
    <div className="flex justify-between bg-[#EDF3FF] px-[4.25rem] py-[4.62rem]">
      {/* 왼쪽 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {profileData?.profileCurrentStates && profileData.profileCurrentStates.length > 0 && (
            <>
              {profileData.profileCurrentStates.slice(0, 2).map((state) => (
                <div
                  key={state.profileStateName}
                  className="flex items-center gap-2 rounded-[0.38rem] bg-[#4D82F3] px-2 py-1"
                >
                  <p className="text-xs text-[#FCFCFD]">{state.profileStateName}</p>
                </div>
              ))}
              {profileData.profileCurrentStates.length > 2 && (
                <div className="flex items-center gap-2 rounded-full bg-[#D3E1FE] px-2 py-1">
                  <p className="text-xs text-[#4D82F3]">+{profileData.profileCurrentStates.length - 2}</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-5">
          <div className="relative h-[5rem] w-[5rem] rounded-lg">
            <Image
              src={profileData?.profileImagePath || '/common/default_profile.svg'}
              alt="profile"
              fill
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-3">
              <span className="text-xl font-semibold text-grey90">{profileData?.memberName}</span>
              <span className="text-sm text-grey70">스크랩 수 {profileData?.profileScrapCount}</span>
            </div>
            <div className="flex gap-2 text-xs text-grey70">
              {profileData?.majorPosition} | {profileData?.regionDetail?.cityName}{' '}
              {profileData?.regionDetail?.divisionName}
            </div>
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          {profileData?.profileTeamInforms && profileData?.profileTeamInforms.length > 0 ? (
            <>
              {profileData?.profileTeamInforms.map((team) => (
                <div key={team.teamName} className="relative h-[2.5rem] w-[2.5rem] rounded-lg">
                  <Image
                    src={team.teamLogoImagePath || '/common/default_profile.svg'}
                    alt="team"
                    fill
                    className="rounded-lg"
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="text-sm text-grey60">아직 소속팀이 등록되지 않았어요</div>
          )}
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex flex-col gap-3">
        {data?.result?.isMyProfile ? (
          <div className="flex gap-2">내 프로필</div>
        ) : (
          <div className="flex flex-col gap-2">
            <ProfileScrap isProfileScrap={profileData?.isProfileScrap ?? false} emailId={emailId} />
            <ProfileMatchButton />
          </div>
        )}
      </div>
    </div>
  )
}
