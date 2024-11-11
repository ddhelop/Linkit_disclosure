import Image from 'next/image'
import { useProfile } from '@/features/profile/edit/context/ProfileContext'
import Link from 'next/link'

export default function MiniProfileCard() {
  // ProfileProvider에서 제공하는 profileData를 받아옵니다.
  const { profileData } = useProfile()

  // 필요한 데이터 추출
  const profileState = profileData?.profileInformMenu?.profileCurrentStates[0]?.profileStateName || '상태 없음'
  const profileImagePath = profileData?.profileInformMenu?.profileImagePath || '/common/default_profile.svg'
  const memberName = profileData?.profileInformMenu?.memberName || '이름 없음'
  const majorPosition = profileData?.profileInformMenu?.majorPosition || '' // 없으면 빈 문자열
  const cityName = profileData?.profileInformMenu?.regionDetail?.cityName || '' // 없으면 빈 문자열
  const divisionName = profileData?.profileInformMenu?.regionDetail?.divisionName || '구/군 없음'

  // 블러 처리를 위한 조건
  const isIncomplete = !majorPosition || !cityName

  return (
    <div className="relative h-[14.5rem] w-[17.5rem] rounded-xl bg-[#EDF3FF] px-6 py-5">
      {/* 카드의 내용이 블러 처리되도록 조건부 클래스 적용 */}
      <div className={`relative ${isIncomplete ? 'blur-sm' : ''}`}>
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
              <p className="text-grey50">포지션 | </p> <p>{majorPosition || '직무 없음'}</p>
            </div>
            <div className="mt-1 flex gap-1 text-xs text-grey70">
              <p className="text-grey50">지역 | </p> <p>{cityName ? `${cityName} ${divisionName}` : '지역 없음'}</p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-5 border-[0.5px] border-grey40"></div>
      </div>

      {/* 미니 프로필이 완성되지 않았을 때 표시되는 오버레이 알림 */}
      {isIncomplete && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border bg-white bg-opacity-90">
          <p className="text-lg font-semibold text-gray-800">앗! 아직 미니프로필이 없어요</p>
          <p className="mt-2 text-center text-sm text-gray-600">
            정보를 입력하고 나에게 맞는
            <br />
            팀과 팀원을 찾아보세요
          </p>
          <Link href={'/profile/edit/basic'} className="mt-4 rounded-lg bg-[#4D82F3] px-4 py-2 text-white">
            정보 입력하러 가기
          </Link>
        </div>
      )}
    </div>
  )
}
