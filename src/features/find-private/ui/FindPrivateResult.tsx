'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'

import { Profile } from '../../find/types/FindTypes'
import { getStaticFindPrivateData } from '../api/FindPrivateApi'
import { useQuery } from '@tanstack/react-query'

export default function FindPrivateResult() {
  const searchParams = useSearchParams()
  const [topCompletionProfiles, setTopCompletionProfiles] = useState<Profile[]>([])

  // 정적 프로필 데이터 가져오기
  const {
    data: staticProfiles,
    isLoading: isStaticLoading,
    error: staticError,
  } = useQuery({
    queryKey: ['staticFindPrivateData'],
    queryFn: getStaticFindPrivateData,
  })
  console.log(staticProfiles?.result.topCompletionProfiles.length)
  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     setIsLoading(true)
  //     setError(null)

  //     try {
  //       // URL 파라미터에서 검색 조건 추출
  //       const params: SearchParams = {
  //         subPosition: searchParams.getAll('subPosition'),
  //         cityName: searchParams.getAll('cityName'),
  //         profileStateName: searchParams.getAll('profileStateName'),
  //         size: 20,
  //       }

  //       // API 호출
  //       const response = await getFindPrivateProfile(params)

  //       if (response.isSuccess && response.code === '1000') {
  //         setProfiles(response.result.defaultProfiles.content)
  //         setTopCompletionProfiles(response.result.topCompletionProfiles)
  //       } else {
  //         setError(response.message)
  //       }
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : '프로필을 불러오는데 실패했습니다.')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchProfiles()
  // }, [searchParams])

  // 필터 적용 여부를 확인하는 함수 추가
  const isFilterApplied = () => {
    return (
      searchParams.getAll('subPosition').length > 0 ||
      searchParams.getAll('skillName').length > 0 ||
      searchParams.has('cityName') ||
      searchParams.has('profileStateName')
    )
  }

  return (
    <div className="flex flex-col gap-16  md:px-12">
      {/* 완성도 높은 팀원 */}
      {staticProfiles &&
        staticProfiles.result &&
        staticProfiles.result.topCompletionProfiles &&
        staticProfiles.result.topCompletionProfiles.length > 0 && (
          <div>
            <div className="text-lg font-semibold text-black">🔥 프로필 완성도가 가장 높은 팀원이에요!</div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {staticProfiles.result.topCompletionProfiles?.map((profile, index) => (
                <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
              ))}
            </div>
          </div>
        )}

      {/* 프로필 리스트 */}
      {/* {profiles?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">
            {isFilterApplied() ? '검색 결과' : '🔍 나에게 필요한 팀원을 더 찾아보세요!'}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {profiles?.map((profile, index) => (
              <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
            ))}
          </div>
        </div>
      )} */}
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
