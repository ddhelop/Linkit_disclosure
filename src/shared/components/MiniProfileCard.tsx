import Image from 'next/image'
import { useProfile } from '@/features/profile/edit/context/ProfileContext'

export default function MiniProfileCard() {
  // ProfileProvider에서 제공하는 profileData를 받아옵니다.
  const { profileData } = useProfile()

  // 필요한 데이터 추출
  const profileState = profileData?.profileInformMenu?.profileCurrentStates[0]?.profileStateName || '상태 없음'
  const profileImagePath = profileData?.profileInformMenu?.profileImagePath || '/common/default_profile.svg'
  const memberName = profileData?.profileInformMenu?.memberName || '이름 없음'
  const majorPosition = profileData?.profileInformMenu?.majorPosition || '직무 없음'
  const cityName = profileData?.profileInformMenu?.regionDetail?.cityName || '도시 없음'
  const divisionName = profileData?.profileInformMenu?.regionDetail?.divisionName || '구/군 없음'

  return (
    <div className="h-[14.5rem] w-[17.5rem] rounded-xl bg-[#EDF3FF] px-6 py-5">
      {/* 뱃지 */}
      <div className="flex gap-2">
        <div className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">{profileState}</div>
      </div>

      {/* 프로필(개인) */}
      <div className="mt-5 flex gap-3">
        <Image src={profileImagePath} width={80} height={80} alt="profile" />

        <div className="flex flex-col">
          <p className="text-lg font-bold">{memberName}</p>
          <div className="mt-2 flex gap-1 text-xs text-grey70">
            <p className="text-grey50">포지션 | </p> <p>{majorPosition}</p>
          </div>
          <div className="mt-1 flex gap-1 text-xs text-grey70">
            <p className="text-grey50">지역 | </p>{' '}
            <p>
              {cityName} {divisionName}
            </p>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mt-5 border-[0.5px] border-grey40"></div>
    </div>
  )
}
