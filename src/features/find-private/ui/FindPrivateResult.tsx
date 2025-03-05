'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import { getStaticFindPrivateData, getFindPrivateProfile } from '../api/FindPrivateApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { SearchParams } from '../FindPrivateType'

export default function FindPrivateResult() {
  const searchParams = useSearchParams()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

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
  const { data: staticProfiles, isLoading: isStaticLoading } = useQuery({
    queryKey: ['staticFindPrivateData'],
    queryFn: getStaticFindPrivateData,
    staleTime: 1000 * 60 * 5, // 5분
  })

  // 무한 스크롤을 위한 프로필 데이터 가져오기
  const {
    data: infiniteProfiles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
  } = useInfiniteQuery({
    queryKey: ['infiniteProfiles', params],
    queryFn: ({ pageParam }) => getFindPrivateProfile({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인하고, 있다면 마지막 프로필의 emailId를 cursor로 사용
      const profiles = lastPage.result.content
      if (profiles.length > 0 && lastPage.result.hasNext) {
        return profiles[profiles.length - 1].emailId
      }
      return undefined
    },
    staleTime: 1000 * 60 * 5, // 5분
  })

  // 무한 스크롤 설정
  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        { threshold: 0.1 },
      )

      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  // 모든 프로필 데이터 합치기
  const allProfiles = infiniteProfiles?.pages.flatMap((page) => page.result.content) || []

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
      {allProfiles.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">🔍 나에게 필요한 팀원을 더 찾아보세요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allProfiles.map((profile, index) => (
              <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* 로딩 중 표시 */}
      {isFetchingNextPage && (
        <div className="py-4 text-center">
          <p className="text-gray-500">더 많은 프로필을 불러오는 중...</p>
        </div>
      )}

      {/* 무한 스크롤을 위한 관찰 요소 */}
      <div ref={loadMoreRef} className="h-10" />

      {/* 필터링된 결과가 없을 때 */}
      {isFilterApplied() && allProfiles.length === 0 && !isInfiniteLoading && (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
