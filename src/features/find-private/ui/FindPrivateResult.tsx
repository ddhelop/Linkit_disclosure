'use client'

import { useSearchParams } from 'next/navigation'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import { getStaticFindPrivateData, getFindPrivateProfile } from '../api/FindPrivateApi'
import { useQueries, useQuery } from '@tanstack/react-query'
import { SearchParams } from '../FindPrivateType'

export default function FindPrivateResult() {
  const searchParams = useSearchParams()

  // URL 파라미터에서 검색 조건 추출
  const params: SearchParams = {
    subPosition: searchParams.getAll('subPosition'),
    cityName: searchParams.getAll('cityName'),
    profileStateName: searchParams.getAll('profileStateName'),
    skillName: searchParams.getAll('skillName'),
    size: 20,
  }

  // 필터 적용 여부 확인
  const isFilterApplied = () => {
    return (
      params.subPosition.length > 0 ||
      params.skillName.length > 0 ||
      params.cityName.length > 0 ||
      params.profileStateName.length > 0
    )
  }

  // 정적 프로필 데이터 가져오기
  const [
    { data: staticProfiles, isLoading: isStaticLoading },
    { data: filteredProfiles, isLoading: isFilteredLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['staticFindPrivateData'],
        queryFn: getStaticFindPrivateData,
      },
      {
        queryKey: ['filteredProfiles', params],
        queryFn: () => getFindPrivateProfile(params),
      },
    ],
  })

  return (
    <div className="flex flex-col gap-16 md:px-12">
      {/* 완성도 높은 팀원 (필터가 없을 때만 표시) */}
      {!isFilterApplied() && staticProfiles && staticProfiles?.result?.topCompletionProfiles?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">🔥 프로필 완성도가 가장 높은 팀원이에요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {staticProfiles.result.topCompletionProfiles.map((profile, index) => (
              <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* 필터링된 프로필 리스트 */}
      {filteredProfiles && filteredProfiles?.result?.content?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">검색 결과</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles?.result?.content?.map((profile, index) => (
              <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* 필터링된 결과가 없을 때 */}
      {isFilterApplied() &&
        (!filteredProfiles?.result?.content || filteredProfiles.result.content.length === 0) &&
        !isFilteredLoading && (
          <div className="py-10 text-center">
            <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
    </div>
  )
}
