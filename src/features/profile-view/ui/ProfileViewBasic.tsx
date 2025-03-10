'use client'
import { useQuery } from '@tanstack/react-query'
import { getProfileDetail } from '../api/ProfileViewApi'
import Image from 'next/image'
import ProfileScrap from '@/features/profile-view/ui/ProfileScrapButton'
import ProfileMatchButton from '@/features/profile-view/ui/ProfileMatchButton'

export default function ProfileViewBasic({ emailId }: { emailId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
    staleTime: 60000,
  })

  const profileData = data?.result?.profileInformMenu

  return (
    <div className="flex flex-col justify-between gap-3 bg-[#EDF3FF] px-6 py-8 md:flex-row  md:px-[4.25rem] md:py-[4.62rem]">
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
          <button className="flex items-center gap-2 rounded-full border border-grey50 bg-white px-5 py-4 text-sm text-grey60 hover:bg-grey10">
            프로필 방문자
            <Image src="/common/icons/right_arrow_grey60.svg" alt="profile_visitor" width={24} height={24} />
          </button>
        ) : (
          <div className="flex gap-2  md:flex-col">
            <ProfileScrap isProfileScrap={profileData?.isProfileScrap ?? false} emailId={emailId} />
            <ProfileMatchButton />
          </div>
        )}
      </div>
    </div>
  )
}
